"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { GlowCard } from "@/components/ui/animated-components";
import Image from "next/image";

export function Projects() {
    const projects = [
        { name: "ElevenLabs", year: "2025" },
        { name: "MedAssist AI", year: "2024" },
        { name: "AutoTag Pro", year: "2023" },
    ];

    return (
        <section className="py-32 bg-black relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[128px]" />

            <div className="container mx-auto px-6 relative z-10">
                <ScrollReveal className="mb-12">
                    <div className="inline-block px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 mb-4">
                        <span className="text-violet-400 text-sm font-medium">✦ PROJECTS</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        Our Latest Projects
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl">
                        See how we turn bold ideas into automated AI solutions carefully crafted to
                        optimize, scale, and deliver measurable results.
                    </p>
                </ScrollReveal>

                <div className="grid md:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
                    {/* Project Timeline */}
                    <ScrollReveal className="space-y-4" stagger={0.1} direction="left">
                        {projects.map((project) => (
                            <GlowCard
                                key={project.name}
                                glowColor="violet"
                                className="group cursor-pointer"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-lg text-white group-hover:text-violet-400 transition-colors">
                                        {project.name}
                                    </span>
                                    <span className="text-gray-500">{project.year}</span>
                                </div>
                            </GlowCard>
                        ))}
                    </ScrollReveal>

                    {/* Featured Project */}
                    <ScrollReveal direction="right">
                        <GlowCard glowColor="purple" className="overflow-hidden bg-gradient-to-br from-slate-900/80 to-black/60">
                            <div className="relative h-64 -mx-6 -mt-6 mb-6 overflow-hidden">
                                <Image
                                    src="/images/robotic-arm.png"
                                    alt="Sales Workflow Optimization"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-white">Sales Workflow Optimization</h3>
                            <p className="text-gray-400">
                                We automated lead follow-ups and CRM tasks, reducing manual work by 70%
                                and boosting qualified lead conversion rates.
                            </p>
                        </GlowCard>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
