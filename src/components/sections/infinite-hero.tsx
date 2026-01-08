"use client";

import { useGSAP } from "@gsap/react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useMemo, useRef } from "react";
import * as THREE from "three";

gsap.registerPlugin(SplitText);

interface ShaderPlaneProps {
    vertexShader: string;
    fragmentShader: string;
    uniforms: { [key: string]: { value: unknown } };
}

function ShaderPlane({
    vertexShader,
    fragmentShader,
    uniforms,
}: ShaderPlaneProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const { size } = useThree();

    useFrame((state) => {
        if (meshRef.current) {
            const material = meshRef.current.material as THREE.ShaderMaterial;
            material.uniforms.u_time.value = state.clock.elapsedTime * 0.5;
            material.uniforms.u_resolution.value.set(size.width, size.height, 1.0);
        }
    });

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                side={THREE.DoubleSide}
                depthTest={false}
                depthWrite={false}
            />
        </mesh>
    );
}

interface ShaderBackgroundProps {
    vertexShader?: string;
    fragmentShader?: string;
    uniforms?: { [key: string]: { value: unknown } };
    className?: string;
}

function ShaderBackground({
    vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
    gl_Position = vec4(position, 1.0);
    }
  `,
    fragmentShader = `
    precision highp float;

    varying vec2 vUv;
    uniform float u_time;
    uniform vec3 u_resolution;
    uniform sampler2D iChannel0;

    #define STEP 256
    #define EPS .001

    float smin( float a, float b, float k )
    {
        float h = clamp( 0.5+0.5*(b-a)/k, 0.0, 1.0 );
        return mix( b, a, h ) - k*h*(1.0-h);
    }

    const mat2 m = mat2(.8,.6,-.6,.8);

    float noise( in vec2 x )
    {
      return sin(1.5*x.x)*sin(1.5*x.y);
    }

    float fbm6( vec2 p )
    {
        float f = 0.0;
        f += 0.500000*(0.5+0.5*noise( p )); p = m*p*2.02;
        f += 0.250000*(0.5+0.5*noise( p )); p = m*p*2.03;
        f += 0.125000*(0.5+0.5*noise( p )); p = m*p*2.01;
        f += 0.062500*(0.5+0.5*noise( p )); p = m*p*2.04;
        //f += 0.031250*(0.5+0.5*noise( p )); p = m*p*2.01;
        f += 0.015625*(0.5+0.5*noise( p ));
        return f/0.96875;
    }


    mat2 getRot(float a)
    {
        float sa = sin(a), ca = cos(a);
        return mat2(ca,-sa,sa,ca);
    }


    vec3 _position;

    float sphere(vec3 center, float radius)
    {
        return distance(_position,center) - radius;
    }

    float swingPlane(float height)
    {
        vec3 pos = _position + vec3(0.,0.,u_time * 5.5);
        float def =  fbm6(pos.xz * .25) * 0.5;
        
        float way = pow(abs(pos.x) * 34. ,2.5) *.0000125;
        def *= way;
        
        float ch = height + def;
        return max(pos.y - ch,0.);
    }

    float map(vec3 pos)
    {
        _position = pos;
        
        float dist;
        dist = swingPlane(0.);
        
        float sminFactor = 5.25;
        dist = smin(dist,sphere(vec3(0.,-15.,80.),60.),sminFactor);
        return dist;
    }


    vec3 getNormal(vec3 pos)
    {
        vec3 nor = vec3(0.);
        vec3 vv = vec3(0.,1.,-1.)*.01;
        nor.x = map(pos + vv.zxx) - map(pos + vv.yxx);
        nor.y = map(pos + vv.xzx) - map(pos + vv.xyx);
        nor.z = map(pos + vv.xxz) - map(pos + vv.xxy);
        nor /= 2.;
        return normalize(nor);
    }

    void mainImage( out vec4 fragColor, in vec2 fragCoord )
    {
      vec2 uv = (fragCoord.xy-.5*u_resolution.xy)/u_resolution.y;
        
        vec3 rayOrigin = vec3(uv + vec2(0.,6.), -1. );
        
        vec3 rayDir = normalize(vec3(uv , 1.));
        
        rayDir.zy = getRot(.15) * rayDir.zy;
        
        vec3 position = rayOrigin;
        
        
        float curDist;
        int nbStep = 0;
        
        for(; nbStep < STEP;++nbStep)
        {
            curDist = map(position + (texture(iChannel0, position.xz) - .5).xyz * .005);
            
            if(curDist < EPS)
                break;
            position += rayDir * curDist * .5;
        }
        
        float f;
                
        float dist = distance(rayOrigin,position);
        f = dist /(98.);
        f = float(nbStep) / float(STEP);
        
        f *= .9;
        vec3 col = vec3(f);
                
        fragColor = vec4(col,1.0);
    }
    void main() {
      vec4 fragColor;
      vec2 fragCoord = vUv * u_resolution.xy;
      mainImage(fragColor, fragCoord);
      gl_FragColor = fragColor;
    }
  `,
    uniforms = {},
    className = "w-full h-full",
}: ShaderBackgroundProps) {
    const shaderUniforms = useMemo(
        () => ({
            u_time: { value: 0 },
            u_resolution: { value: new THREE.Vector3(1, 1, 1) },
            ...uniforms,
        }),
        [uniforms],
    );

    return (
        <div className={className}>
            <Canvas className={className}>
                <ShaderPlane
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    uniforms={shaderUniforms}
                />
            </Canvas>
        </div>
    );
}

export default function InfiniteHero() {
    const rootRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const h1Ref = useRef<HTMLHeadingElement>(null);
    const pRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const ctas = ctaRef.current ? Array.from(ctaRef.current.children) : [];

            const h1Split = new SplitText(h1Ref.current, { type: "lines" });
            const pSplit = new SplitText(pRef.current, { type: "lines" });

            gsap.set(bgRef.current, { filter: "blur(28px)" });
            gsap.set(h1Split.lines, {
                opacity: 0,
                y: 24,
                filter: "blur(8px)",
            });
            gsap.set(pSplit.lines, {
                opacity: 0,
                y: 16,
                filter: "blur(6px)",
            });
            if (ctas.length) gsap.set(ctas, { opacity: 0, y: 16 });

            const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
            tl.to(bgRef.current, { filter: "blur(0px)", duration: 1.2 }, 0)
                .to(
                    h1Split.lines,
                    {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        duration: 0.8,
                        stagger: 0.1,
                    },
                    0.3,
                )
                .to(
                    pSplit.lines,
                    {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        duration: 0.6,
                        stagger: 0.08,
                    },
                    "-=0.3",
                )
                .to(ctas, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, "-=0.2");

            return () => {
                h1Split.revert();
                pSplit.revert();
            };
        },
        { scope: rootRef },
    );

    return (
        <div
            ref={rootRef}
            className="relative h-svh w-full overflow-hidden text-white"
            style={{ backgroundColor: '#0a0e27' }}
        >
            <div className="absolute inset-0" ref={bgRef}>
                <ShaderBackground className="h-full w-full" />
            </div>

            <div className="pointer-events-none absolute inset-0 [background:radial-gradient(120%_80%_at_50%_50%,_transparent_40%,_black_100%)]" />

            <div className="relative z-10 flex h-svh w-full items-center justify-center px-6">
                <div className="text-center">
                    <h1
                        ref={h1Ref}
                        className="mx-auto max-w-2xl lg:max-w-4xl text-[clamp(2.25rem,6vw,4rem)] font-extralight leading-[0.95] tracking-tight"
                    >
                        Make Sense of Everything You Know.
                    </h1>
                    <p
                        ref={pRef}
                        className="mx-auto mt-4 max-w-2xl md:text-balance text-sm/6 md:text-base/7 font-light tracking-tight text-white/70"
                    >
                        Lucid connects your notes, documents, links, and ideas into a living knowledge map.
                        It reveals meaning, patterns, and how your thinking has evolved over time.
                    </p>

                    <div
                        ref={ctaRef}
                        className="mt-8 flex flex-row items-center justify-center gap-4"
                    >
                        <button
                            type="button"
                            className="group relative overflow-hidden bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 text-sm rounded-lg font-medium text-white shadow-lg shadow-violet-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/60 hover:scale-105 cursor-pointer"
                        >
                            <span className="absolute inset-0 overflow-hidden">
                                <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-[shine_1s_ease-in-out] transition-transform duration-1000" />
                            </span>
                            <span className="relative z-10">Start Searching →</span>
                        </button>

                        <button
                            type="button"
                            className="group relative px-6 py-3 text-sm font-medium border border-white/20 bg-white/5 text-white backdrop-blur-sm rounded-lg transition-all duration-300 hover:bg-white/10 hover:border-white/30 cursor-pointer"
                        >
                            ⊙ See How It Works
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats - positioned at bottom */}
            <div className="absolute bottom-12 left-0 right-0 z-20 flex justify-center gap-8 md:gap-16">
                <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-1">11K+</div>
                    <div className="text-xs md:text-sm text-slate-400 uppercase tracking-wide">Files Indexed Daily</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-1">400+</div>
                    <div className="text-xs md:text-sm text-slate-400 uppercase tracking-wide">Teams Onboarded</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-1">42%</div>
                    <div className="text-xs md:text-sm text-slate-400 uppercase tracking-wide">Faster Retrieval</div>
                </div>
            </div>
        </div>
    );
}
