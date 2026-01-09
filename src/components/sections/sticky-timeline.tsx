"use client";

import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Code2, Cpu, Globe, Rocket, Zap } from "lucide-react";

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
        icon: <Zap className="w-6 h-6" />,
        tech: ["Vision", "Strategy", "Foundation"],
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200",
        color: "from-violet-500 to-indigo-500",
    },
    {
        id: 2,
        year: "Q2 2024",
        title: "Project Nexus: Enterprise Cloud",
        description: "Built a distributed cloud architecture for a Fortune 500 fintech firm, handling 1M+ transactions per second with zero downtime.",
        icon: <Cloud className="w-6 h-6" />,
        tech: ["Kubernetes", "AWS", "Go"],
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
        color: "from-blue-500 to-cyan-500",
    },
    {
        id: 3,
        year: "Q3 2024",
        title: "Titan AI Integration",
        description: "Deployed a custom LLM-based automation system for international logistics, reducing operational overhead by 40% in the first quarter.",
        icon: <Cpu className="w-6 h-6" />,
        tech: ["Python", "PyTorch", "OpenAI"],
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200",
        color: "from-purple-500 to-pink-500",
    },
    {
        id: 4,
        year: "Q4 2024",
        title: "Global Expansion",
        description: "Expanded our operations to three continents, serving clients in London, Tokyo, and San Francisco with round-the-clock engineering support.",
        icon: <Globe className="w-6 h-6" />,
        tech: ["Scale", "Infrastructure", "Global"],
        image: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=1200",
        color: "from-emerald-500 to-teal-500",
    },
];

function Cloud(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M17.5 19c3.037 0 5.5-2.463 5.5-5.5 0-2.799-2.083-5.11-4.793-5.457A7.502 7.502 0 0 0 3.5 11c0 .15.005.298.014.445A4.505 4.505 0 0 0 0 16c0 2.485 2.015 4.5 4.5 4.5" />
        </svg>
    );
}

const TimelineCard = ({ item, index, scrollYProgress }: { item: TimelineItem; index: number; scrollYProgress: MotionValue<number> }) => {
    const range = [index * 0.25, (index + 1) * 0.25];
    const targetScale = 1 - (timelineData.length - index) * 0.05;

    const scale = useTransform(scrollYProgress, range, [1, targetScale]);
    const opacity = useTransform(scrollYProgress, range, [1, 0.8]);
    const y = useTransform(scrollYProgress, range, [0, -50]);

    return (
        <div className="h-screen sticky top-0 flex items-center justify-center">
            <motion.div
                style={{
                    scale,
                    opacity,
                    y,
                    top: `calc(-10% + ${index * 25}px)`,
                }}
                className={cn(
                    "relative w-full max-w-5xl h-[70vh] rounded-[40px] overflow-hidden border border-white/10 shadow-2xl bg-[#0a0a0a]",
                )}
            >
                <div className="absolute inset-0 z-0">
                    <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
                </div>

                <div className="relative z-10 h-full p-8 md:p-16 flex flex-col justify-end">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-4"
                    >
                        <div className={cn("inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6")}>
                            <span className={cn("w-2 h-2 rounded-full bg-gradient-to-r", item.color)} />
                            <span className="text-sm font-bold tracking-widest uppercase text-white/80">{item.year}</span>
                        </div>
                    </motion.div>

                    <h3 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                        {item.title}
                    </h3>

                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8 leading-relaxed">
                        {item.description}
                    </p>

                    <div className="flex flex-wrap gap-3">
                        {item.tech.map((t) => (
                            <span
                                key={t}
                                className="px-4 py-1.5 rounded-lg bg-white/5 border border-white/5 text-sm font-medium text-gray-400"
                            >
                                {t}
                            </span>
                        ))}
                    </div>

                    <div className="absolute top-12 right-12 text-white/10">
                        {React.isValidElement(item.icon) && React.cloneElement(item.icon as React.ReactElement<any>, { className: "w-32 h-32" })}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export function StickyTimeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <section ref={containerRef} className="relative bg-black pt-20">
            <div className="sticky top-0 h-screen flex flex-col items-center justify-start pt-32 pointer-events-none z-0">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center px-6"
                >
                    <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-violet-500 mb-4">Our Journey</h2>
                    <p className="text-4xl md:text-5xl font-bold text-white">Softman Milestones</p>
                </motion.div>
            </div>

            <div className="relative z-10">
                {timelineData.map((item, index) => (
                    <TimelineCard
                        key={item.id}
                        item={item}
                        index={index}
                        scrollYProgress={scrollYProgress}
                    />
                ))}
            </div>

            {/* Background Decorative Elements */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
            </div>
        </section>
    );
}
