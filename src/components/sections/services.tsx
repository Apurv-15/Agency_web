"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { GlowCard } from "@/components/ui/animated-components";
import Image from "next/image";

export function Services() {
    return (
        <section className="py-32 bg-black relative overflow-hidden">
            {/* Background glow effects */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[128px]" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[128px]" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Strategy & Content Creation Section */}
                <ScrollReveal className="text-center mb-16">
                    <div className="inline-block mb-4">
                        <div className="h-px w-24 bg-gradient-to-r from-transparent via-violet-500 to-transparent inline-block mr-4" />
                        <h2 className="text-4xl md:text-5xl font-bold inline-block bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                            Strategy & Content Creation
                        </h2>
                        <div className="h-px w-24 bg-gradient-to-r from-transparent via-violet-500 to-transparent inline-block ml-4" />
                    </div>
                </ScrollReveal>

                <ScrollReveal className="grid md:grid-cols-2 gap-6 mb-32 max-w-6xl mx-auto" stagger={0.2}>
                    {/* AI Consulting Card */}
                    <GlowCard glowColor="violet">
                        <h3 className="text-2xl font-bold mb-3 text-white">AI Consulting & Strategies</h3>
                        <p className="text-gray-400 mb-6">
                            We design custom AI strategies that drives growth.
                        </p>
                        <div className="relative h-64">
                            <Image
                                src="/images/ai-consulting.png"
                                alt="AI Consulting Chart"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </GlowCard>

                    {/* Social Media Content Card */}
                    <GlowCard glowColor="blue">
                        <h3 className="text-2xl font-bold mb-3 text-white">Social Media Content Creation</h3>
                        <p className="text-gray-400 mb-6">
                            Leverage AI to create engaging, personalized content.
                        </p>
                        <div className="relative h-64">
                            <Image
                                src="/images/social-media.png"
                                alt="Social Media Content"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </GlowCard>
                </ScrollReveal>

                {/* AI Automation Services - Bento Grid */}
                <ScrollReveal className="mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        AI Automation Services
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4 mb-8">
                        <div className="flex items-start space-x-3 text-gray-300">
                            <span className="text-violet-500 text-xl">✦</span>
                            <div>
                                <span className="font-semibold text-white">Make Business Ease:</span>
                                <span className="text-gray-400"> Simplify your process with automation.</span>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3 text-gray-300">
                            <span className="text-violet-500 text-xl">✦</span>
                            <div>
                                <span className="font-semibold text-white">Insights Drive Growth:</span>
                                <span className="text-gray-400"> Leverage actionable data to scale with AI.</span>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Bento Grid Layout */}
                <ScrollReveal className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto mb-16" stagger={0.15}>
                    {/* Data-driven */}
                    <GlowCard glowColor="violet" className="h-full">
                        <div className="text-violet-500 text-3xl mb-4">📊</div>
                        <h3 className="text-xl font-bold mb-2 text-white">Data-driven</h3>
                        <p className="text-sm text-gray-400">
                            Turn raw data into actionable insights that smarter decisions and measurable growth.
                        </p>
                    </GlowCard>

                    {/* Efficient Growth */}
                    <GlowCard glowColor="blue" className="h-full">
                        <div className="text-blue-500 text-3xl mb-4">📈</div>
                        <h3 className="text-xl font-bold mb-2 text-white">Efficient Growth</h3>
                        <p className="text-sm text-gray-400">
                            Work smarter, not harder. Unlock faster results and lower costs with AI-powered efficiency.
                        </p>
                    </GlowCard>

                    {/* Workflow Automation - Spans 2 rows */}
                    <GlowCard glowColor="purple" className="h-full bg-gradient-to-br from-violet-950/50 to-black/40 md:row-span-2">
                        <h3 className="text-xl font-bold mb-2 text-white">Workflow Automation & Optimization</h3>
                        <p className="text-sm text-gray-400 mb-6">
                            Streamline repetitive tasks & Keep your business running on autopilot.
                        </p>
                        <div className="relative h-64">
                            <Image
                                src="/images/workflow.png"
                                alt="Workflow Automation"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </GlowCard>

                    {/* Custom AI Model Development */}
                    <GlowCard glowColor="violet" className="md:col-span-2">
                        <h3 className="text-2xl font-bold mb-3 text-white">Custom AI Model Development</h3>
                        <p className="text-gray-400 mb-6">
                            Get AI solutions built around your unique needs.
                        </p>
                        <div className="relative h-64">
                            <Image
                                src="/images/ai-code.png"
                                alt="AI Development Code"
                                fill
                                className="object-cover rounded-lg"
                            />
                        </div>
                    </GlowCard>
                </ScrollReveal>

                {/* Chatbots Section */}
                <ScrollReveal>
                    <GlowCard glowColor="blue" className="max-w-4xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h3 className="text-2xl font-bold mb-3 text-white">Chatbots & Virtual Assistants</h3>
                                <p className="text-gray-400">
                                    Engage customers 24/7 with intelligent Virtual assistants.
                                </p>
                            </div>
                            <div className="relative h-64">
                                <Image
                                    src="/images/chatbot.png"
                                    alt="Chatbot Interface"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    </GlowCard>
                </ScrollReveal>
            </div>
        </section>
    );
}
