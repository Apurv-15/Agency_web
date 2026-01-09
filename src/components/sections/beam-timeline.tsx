"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Zap, Cloud, Cpu, Globe } from "lucide-react";

interface TimelineItem {
    id: number;
    year: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    tech: string[];
    image: string;
    color: string;
}

const timelineData: TimelineItem[] = [
    {
        id: 1,
        year: "Q1 2024",
        title: "The Genesis of Softman",
        description: "Founded with a mission to bridge the gap between complex engineering and elegant user experiences. We started with a small team of elite developers and a big vision.",
        icon: <Zap className="w-5 h-5" />,
        tech: ["Vision", "Strategy", "Foundation"],
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200",
        color: "from-violet-500 to-indigo-500",
    },
    {
        id: 2,
        year: "Q2 2024",
        title: "Project Nexus",
        description: "Built a distributed cloud architecture for a Fortune 500 fintech firm, handling 1M+ transactions per second with zero downtime.",
        icon: <Cloud className="w-5 h-5" />,
        tech: ["Kubernetes", "AWS", "Go"],
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
        color: "from-blue-500 to-cyan-500",
    },
    {
        id: 3,
        year: "Q3 2024",
        title: "Titan AI Integration",
        description: "Deployed a custom LLM-based automation system for international logistics, reducing operational overhead by 40% in the first quarter.",
        icon: <Cpu className="w-5 h-5" />,
        tech: ["Python", "PyTorch", "OpenAI"],
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200",
        color: "from-purple-500 to-pink-500",
    },
    {
        id: 4,
        year: "Q4 2024",
        title: "Global Expansion",
        description: "Expanded our operations to three continents, serving clients in London, Tokyo, and San Francisco with round-the-clock engineering support.",
        icon: <Globe className="w-5 h-5" />,
        tech: ["Scale", "Infrastructure", "Global"],
        image: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=1200",
        color: "from-emerald-500 to-teal-500",
    },
];

export function BeamTimeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeId, setActiveId] = useState(1);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section ref={containerRef} className="relative bg-black py-32">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                    {/* Left Column: Text & Beam */}
                    <div className="relative">
                        {/* The Vertical Beam Line Container */}
                        <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-white/10 hidden lg:block">
                            <motion.div
                                className="absolute top-0 left-0 w-full bg-gradient-to-b from-violet-500 via-indigo-500 to-blue-500 origin-top"
                                style={{ scaleY, height: "100%" }}
                            />
                        </div>

                        <div className="space-y-32 relative z-10 pb-32">
                            {timelineData.map((item, index) => (
                                <TimelineBlock
                                    key={item.id}
                                    item={item}
                                    index={index}
                                    setActiveId={setActiveId}
                                    isActive={activeId === item.id}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Sticky Image */}
                    <div className="hidden lg:block relative h-full">
                        <div className="sticky top-1/4 h-[500px] w-full rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-[#0a0a0a]">
                            {timelineData.map((item) => (
                                <motion.div
                                    key={item.id}
                                    className="absolute inset-0"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: activeId === item.id ? 1 : 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                                    {/* Content Overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 backdrop-blur-md mb-4">
                                            <span className={cn("w-2 h-2 rounded-full bg-gradient-to-r", item.color)} />
                                            <span className="text-xs font-bold tracking-widest uppercase text-white/90">{item.year}</span>
                                        </div>
                                        <h3 className="text-3xl font-bold text-white mb-2">{item.title}</h3>
                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {item.tech.map((t) => (
                                                <span key={t} className="px-3 py-1 bg-black/50 border border-white/10 rounded-full text-xs text-gray-300 backdrop-blur-sm">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function TimelineBlock({ item, index, setActiveId, isActive }: { item: TimelineItem; index: number; setActiveId: (id: number) => void; isActive: boolean }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useTransform(
        useScroll({
            target: ref,
            offset: ["start center", "end center"]
        }).scrollYProgress,
        [0, 1],
        [0, 1]
    );

    // Update active ID when this block is in view
    // We use a simple effect to detect when this component is roughly in the center
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setActiveId(item.id);
                }
            },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [item.id, setActiveId]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className={cn("pl-0 lg:pl-24 relative group", isActive ? "opacity-100" : "opacity-40 blur-[1px] transition-all duration-500")}
        >
            {/* Mobile Icon / Dot */}
            <div className={cn(
                "absolute left-6 lg:left-6 top-0 -translate-x-1/2 w-4 h-4 rounded-full border-2 transition-colors duration-500 z-20 hidden lg:block",
                isActive ? "bg-black border-violet-500 scale-125" : "bg-black border-gray-700"
            )}>
                {isActive && <div className="absolute inset-0 bg-violet-500 rounded-full animate-ping opacity-75" />}
            </div>

            <span className="text-sm font-mono text-violet-400 mb-2 block">{item.year}</span>
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">{item.title}</h3>
            <p className="text-lg text-gray-400 leading-relaxed max-w-lg mb-6">
                {item.description}
            </p>

            {/* Mobile Image (Visible only on small screens) */}
            <div className="block lg:hidden w-full h-64 relative rounded-xl overflow-hidden my-6 border border-white/10">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                    <div className="flex gap-2">
                        {item.tech.map((t) => (
                            <span key={t} className="px-2 py-1 bg-black/60 rounded text-[10px] text-gray-300 backdrop-blur-md">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tech Tags (Desktop) */}
            <div className="hidden lg:flex flex-wrap gap-2">
                {item.tech.map((t) => (
                    <span
                        key={t}
                        className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-400 group-hover:border-violet-500/30 transition-colors"
                    >
                        {t}
                    </span>
                ))}
            </div>
        </motion.div>
    );
}
