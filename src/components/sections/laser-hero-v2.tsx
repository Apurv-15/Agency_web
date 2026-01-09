"use client";

import dynamic from 'next/dynamic';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import { motion } from 'framer-motion';
import heroImg from '@/components/video/images/hero-illustration.7100a376.jpg';

const inter = Inter({ subsets: ['latin'] });

const LaserFlow = dynamic(() => import("@/components/ui/LaserFlow"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center bg-[#060010]">
            <div className="w-16 h-16 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
        </div>
    )
});

// Simple Typewriter component
const Typewriter = ({ text, delay = 0, duration = 0.05, onComplete }: { text: string; delay?: number; duration?: number; onComplete?: () => void }) => {
    return (
        <motion.span
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 1 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: duration,
                        delayChildren: delay,
                    }
                }
            }}
            onAnimationComplete={onComplete}
        >
            {text.split("").map((char, i) => (
                <motion.span
                    key={i}
                    variants={{
                        hidden: { opacity: 0, display: "none" },
                        visible: { opacity: 1, display: "inline" }
                    }}
                >
                    {char}
                </motion.span>
            ))}
        </motion.span>
    );
};

export function LaserHeroV2({
    showBeam = true,
    showText = true
}: {
    showBeam?: boolean;
    showText?: boolean;
}) {
    const [mounted, setMounted] = useState(false);
    const revealImgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const el = revealImgRef.current;
        if (el) {
            el.style.setProperty('--mx', `${x}px`);
            el.style.setProperty('--my', `${y + rect.height * 0.5}px`);
        }
    };

    const handleMouseLeave = () => {
        const el = revealImgRef.current;
        if (el) {
            el.style.setProperty('--mx', '-9999px');
            el.style.setProperty('--my', '-9999px');
        }
    };

    return (
        <section
            className={`relative h-[120vh] w-full overflow-hidden ${inter.className}`}
            style={{
                backgroundColor: '#060010',
                willChange: 'transform',
                transform: 'translateZ(0)',
                isolation: 'isolate'
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Laser Flow Background */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: showBeam && mounted ? 1 : 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
            >
                {mounted && (
                    <LaserFlow
                        horizontalBeamOffset={0.1}
                        verticalBeamOffset={0.0}
                        color="#8B5CF6"
                        fogIntensity={0.5}
                        wispDensity={1.2}
                    />
                )}
            </motion.div>

            {/* Heading Content - Kept from V2 */}
            <div className="absolute top-0 left-0 right-0 z-20 px-6 md:px-12 lg:px-20 pt-32">
                <div className="max-w-7xl w-full mx-auto">
                    <div className="flex flex-col items-start text-left max-w-xl lg:max-w-2xl">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-white mb-4 md:mb-6">
                            {showText ? (
                                <>
                                    <Typewriter text="Softman Engineering" duration={0.04} />
                                    <br />
                                    <Typewriter text="Excellence" delay={0.8} duration={0.04} />
                                </>
                            ) : null}
                        </h1>
                        <div className="text-base md:text-lg lg:text-xl text-gray-400 max-w-md lg:max-w-lg mb-6 md:mb-8 font-light leading-relaxed">
                            {showText ? (
                                <Typewriter
                                    text="We build scalable, high-performance software solutions tailored to your business needs."
                                    delay={1.5}
                                    duration={0.02}
                                />
                            ) : null}
                        </div>

                        <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: showText ? 1 : 0, scale: showText ? 1 : 0.9 }}
                            transition={{ delay: 3, duration: 0.5 }}
                            type="button"
                            className="group relative overflow-hidden bg-white hover:bg-white/90 px-8 py-3.5 text-sm font-bold text-black rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_35px_rgba(255,255,255,0.5)] flex items-center gap-2"
                        >
                            SEE IN ACTION
                            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Content Box - From /laser page styling */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: showBeam ? 0.9 : 0, y: showBeam ? 0 : 40 }}
                transition={{ duration: 0.8 }}
                className="absolute left-1/2 -translate-x-1/2 z-10"
                style={{
                    top: '50%',
                    width: '86%',
                    height: '60%',
                }}
            >
                <div
                    className="w-full h-full rounded-3xl flex items-center justify-center relative overflow-hidden"
                    style={{
                        backgroundColor: '#060010',
                        border: '2px solid rgba(139, 92, 246, 0.5)',
                        boxShadow: '0 0 40px rgba(139, 92, 246, 0.3), inset 0 0 40px rgba(139, 92, 246, 0.1)'
                    }}
                >
                    <Image
                        src={heroImg}
                        alt="Hero Illustration"
                        fill
                        className="object-cover object-top opacity-90 hover:opacity-100 transition-opacity duration-500"
                        priority
                    />
                    {/* Inner Gradient Overlay for Depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060010]/80 via-transparent to-transparent pointer-events-none" />
                </div>
            </motion.div>

            {/* Interactive Reveal Image Overlay - From /laser page styling */}
            <div
                ref={revealImgRef}
                className="absolute w-full pointer-events-none z-5"
                style={{
                    top: '-50%',
                    mixBlendMode: 'lighten',
                    opacity: 0.3,
                    // @ts-ignore
                    '--mx': '-9999px',
                    '--my': '-9999px',
                    WebkitMaskImage: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)',
                    maskImage: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat'
                }}
            >
            </div>
        </section>
    );
}
