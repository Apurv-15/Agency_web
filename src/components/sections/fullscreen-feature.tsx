"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function FullscreenFeature() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const subheadingRef = useRef<HTMLParagraphElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!sectionRef.current) return;

            // Set initial states
            gsap.set([badgeRef.current, headingRef.current, subheadingRef.current, statsRef.current], {
                opacity: 0,
                y: 30,
            });

            // Create scroll trigger animation
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top 60%",
                once: true,
                onEnter: () => {
                    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

                    tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.8 })
                        .to(headingRef.current, { opacity: 1, y: 0, duration: 1 }, "-=0.4")
                        .to(subheadingRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
                        .to(statsRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.4");
                },
            });
        },
        { scope: sectionRef }
    );

    return (
        <section
            ref={sectionRef}
            className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black"
        >
            {/* Video background */}
            <div className="absolute inset-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src="/video/Minimalist_Glowing_Wave_Video_Generation.mp4" type="video/mp4" />
                </video>

                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 text-center">
                {/* Badge */}
                <div ref={badgeRef} className="inline-block mb-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                        </span>
                        <span className="text-violet-300 text-sm font-medium">Powered by AI</span>
                    </div>
                </div>

                {/* Main heading */}
                <h2
                    ref={headingRef}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[1.1]"
                >
                    <span className="bg-gradient-to-r from-white via-violet-200 to-white bg-clip-text text-transparent">
                        Intelligence
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
                        Meets Innovation
                    </span>
                </h2>

                {/* Subheading */}
                <p
                    ref={subheadingRef}
                    className="text-lg md:text-xl lg:text-2xl text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed"
                >
                    We transform complex challenges into elegant solutions through
                    cutting-edge AI automation and strategic insights.
                </p>

                {/* Stats row */}
                <div
                    ref={statsRef}
                    className="flex flex-wrap justify-center gap-8 md:gap-12"
                >
                    {[
                        { value: "10x", label: "Faster Processing" },
                        { value: "99%", label: "Accuracy Rate" },
                        { value: "24/7", label: "Automation" },
                    ].map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent mb-2">
                                {stat.value}
                            </div>
                            <div className="text-sm text-gray-500 uppercase tracking-wider">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
        </section>
    );
}
