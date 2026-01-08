"use client";

import React, { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GlobalScrollRevealProps {
    children: ReactNode;
    enableBlur?: boolean;
    baseOpacity?: number;
    baseRotation?: number;
    blurStrength?: number;
    rotationEnd?: string;
    wordAnimationEnd?: string;
    selector?: string; // CSS selector for elements to animate
}

export const GlobalScrollReveal: React.FC<GlobalScrollRevealProps> = ({
    children,
    enableBlur = true,
    baseOpacity = 0.1,
    baseRotation = 3,
    blurStrength = 4,
    rotationEnd = 'bottom bottom',
    wordAnimationEnd = 'bottom bottom',
    selector = 'h1, h2, h3, h4, h5, h6, p, span, a, li, button' // Default selectors
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Find all text elements based on selector
        const textElements = container.querySelectorAll(selector);

        textElements.forEach((element) => {
            // Skip if already processed
            if (element.hasAttribute('data-scroll-reveal-processed')) return;
            element.setAttribute('data-scroll-reveal-processed', 'true');

            const textContent = element.textContent || '';
            if (!textContent.trim()) return;

            // Split text into words
            const words = textContent.split(/(\s+)/);
            const wordSpans = words.map((word, index) => {
                if (word.match(/^\s+$/)) return word;
                return `<span class="word-reveal" style="display: inline-block;">${word}</span>`;
            }).join('');

            // Replace element content with word spans
            element.innerHTML = wordSpans;

            // Animate rotation of entire element
            gsap.fromTo(
                element,
                { transformOrigin: '0% 50%', rotate: baseRotation },
                {
                    ease: 'none',
                    rotate: 0,
                    scrollTrigger: {
                        trigger: element,
                        start: 'top bottom',
                        end: rotationEnd,
                        scrub: true
                    }
                }
            );

            // Animate individual words
            const wordElements = element.querySelectorAll<HTMLElement>('.word-reveal');

            gsap.fromTo(
                wordElements,
                { opacity: baseOpacity, willChange: 'opacity' },
                {
                    ease: 'none',
                    opacity: 1,
                    stagger: 0.05,
                    scrollTrigger: {
                        trigger: element,
                        start: 'top bottom-=20%',
                        end: wordAnimationEnd,
                        scrub: true
                    }
                }
            );

            if (enableBlur) {
                gsap.fromTo(
                    wordElements,
                    { filter: `blur(${blurStrength}px)` },
                    {
                        ease: 'none',
                        filter: 'blur(0px)',
                        stagger: 0.05,
                        scrollTrigger: {
                            trigger: element,
                            start: 'top bottom-=20%',
                            end: wordAnimationEnd,
                            scrub: true
                        }
                    }
                );
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength, selector]);

    return (
        <div ref={containerRef}>
            {children}
        </div>
    );
};
