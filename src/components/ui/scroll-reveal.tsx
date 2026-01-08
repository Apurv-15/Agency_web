"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactNode, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "down" | "left" | "right" | "fade";
    duration?: number;
    stagger?: number;
}

export function ScrollReveal({
    children,
    className = "",
    delay = 0,
    direction = "up",
    duration = 1,
    stagger = 0,
}: ScrollRevealProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!containerRef.current) return;

            const elements = containerRef.current.children;
            if (elements.length === 0) return;

            // Set initial state based on direction
            const initialState: gsap.TweenVars = {
                opacity: 0,
            };

            switch (direction) {
                case "up":
                    initialState.y = 60;
                    break;
                case "down":
                    initialState.y = -60;
                    break;
                case "left":
                    initialState.x = 60;
                    break;
                case "right":
                    initialState.x = -60;
                    break;
                case "fade":
                    // Only opacity, no movement
                    break;
            }

            gsap.set(elements, initialState);

            // Animate on scroll
            ScrollTrigger.batch(elements, {
                onEnter: (batch) => {
                    gsap.to(batch, {
                        opacity: 1,
                        y: 0,
                        x: 0,
                        duration,
                        delay,
                        stagger,
                        ease: "power3.out",
                        overwrite: true,
                    });
                },
                start: "top 85%",
                once: true,
            });
        },
        { scope: containerRef }
    );

    return (
        <div ref={containerRef} className={className}>
            {children}
        </div>
    );
}

interface ScrollRevealSectionProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    scale?: boolean;
}

export function ScrollRevealSection({
    children,
    className = "",
    delay = 0,
    scale = false,
}: ScrollRevealSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            if (!sectionRef.current) return;

            const initialState: gsap.TweenVars = {
                opacity: 0,
                y: 50,
            };

            if (scale) {
                initialState.scale = 0.95;
            }

            gsap.set(sectionRef.current, initialState);

            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top 80%",
                once: true,
                onEnter: () => {
                    gsap.to(sectionRef.current, {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 1.2,
                        delay,
                        ease: "power3.out",
                    });
                },
            });
        },
        { scope: sectionRef }
    );

    return (
        <section ref={sectionRef} className={className}>
            {children}
        </section>
    );
}

interface ParallaxElementProps {
    children: ReactNode;
    className?: string;
    speed?: number;
}

export function ParallaxElement({
    children,
    className = "",
    speed = 0.5,
}: ParallaxElementProps) {
    const elementRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!elementRef.current) return;

            gsap.to(elementRef.current, {
                y: () => window.innerHeight * speed,
                ease: "none",
                scrollTrigger: {
                    trigger: elementRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });
        },
        { scope: elementRef }
    );

    return (
        <div ref={elementRef} className={className}>
            {children}
        </div>
    );
}
