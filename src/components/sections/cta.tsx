"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ShineButton } from "@/components/ui/shine-button";

export function CTA() {
    return (
        <section className="py-32 bg-black relative overflow-hidden">
            {/* Radial glow background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/20 via-black to-black" />

            <ScrollReveal className="container mx-auto px-6 text-center relative z-10" scale={true}>
                <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-violet-200 to-white bg-clip-text text-transparent">
                    Ready to Transform Your Business?
                </h2>
                <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                    Join hundreds of companies already scaling with AI-powered automation and insights.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <ShineButton variant="primary">
                        📞 Book A Free Call Now
                    </ShineButton>
                    <ShineButton variant="secondary">
                        Contact Sales Now
                    </ShineButton>
                </div>
            </ScrollReveal>
        </section>
    );
}
