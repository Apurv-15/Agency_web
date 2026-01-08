"use client";

import React, { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface WordRevealProps {
    children: ReactNode;
    className?: string;
    baseOpacity?: number;
    baseRotation?: number;
    blurStrength?: number;
    staggerDelay?: number;
}

/**
 * WordReveal component that applies scroll-triggered word-by-word reveal animation
 * Works with gradient text and preserves all existing styles
 */
export const WordReveal: React.FC<WordRevealProps> = ({
    children,
    className = '',
    baseOpacity = 0.1,
    baseRotation = 3,
    blurStrength = 8,
    staggerDelay = 0.05
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Get all text nodes and wrap words
        const processTextNode = (node: Node) => {
            if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
                const text = node.textContent;
                const words = text.split(/(\s+)/);

                const fragment = document.createDocumentFragment();
                words.forEach((word) => {
                    if (word.match(/^\s+$/)) {
                        fragment.appendChild(document.createTextNode(word));
                    } else if (word.trim()) {
                        const span = document.createElement('span');
                        span.className = 'word-reveal-item';
                        span.style.display = 'inline-block';
                        span.textContent = word;
                        fragment.appendChild(span);
                    }
                });

                node.parentNode?.replaceChild(fragment, node);
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                // Don't process if already has word-reveal-item class
                if (!(node as Element).classList.contains('word-reveal-item')) {
                    Array.from(node.childNodes).forEach(processTextNode);
                }
            }
        };

        // Process all child nodes
        Array.from(container.childNodes).forEach(processTextNode);

        // Apply animations to word spans
        const wordElements = container.querySelectorAll<HTMLElement>('.word-reveal-item');

        if (wordElements.length === 0) return;

        // Set initial state
        gsap.set(wordElements, {
            opacity: baseOpacity,
            filter: `blur(${blurStrength}px)`,
            willChange: 'opacity, filter'
        });

        // Animate on scroll
        gsap.to(wordElements, {
            opacity: 1,
            filter: 'blur(0px)',
            stagger: staggerDelay,
            ease: 'none',
            scrollTrigger: {
                trigger: container,
                start: 'top bottom-=20%',
                end: 'bottom center',
                scrub: true
            }
        });

        // Rotation animation for the whole container
        gsap.fromTo(
            container,
            {
                transformOrigin: '0% 50%',
                rotateX: baseRotation
            },
            {
                rotateX: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: container,
                    start: 'top bottom',
                    end: 'bottom center',
                    scrub: true
                }
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.vars.trigger === container) {
                    trigger.kill();
                }
            });
        };
    }, [baseOpacity, baseRotation, blurStrength, staggerDelay]);

    return (
        <div ref={containerRef} className={className} style={{ perspective: '1000px' }}>
            {children}
        </div>
    );
};
