import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/hero-bg.png"
                    alt="Hero Background"
                    fill
                    className="object-cover opacity-90"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 py-32 text-center">
                <div className="max-w-4xl mx-auto">
                    {/* Eyebrow */}
                    <p className="text-sm uppercase tracking-wider text-slate-300 mb-6">
                        Your Personal Knowledge Companion
                    </p>

                    {/* Headline */}
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                        Make Sense of{" "}
                        <span className="italic text-slate-200">Everything</span> You Know.
                    </h1>

                    {/* Subheadline */}
                    <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Lucid connects your notes, documents, links, and ideas into a living knowledge map.
                        It reveals meaning, patterns, and how your thinking has evolved over time.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                        <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 px-8">
                            Start Searching →
                        </Button>
                        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                            ⊙ See How It Works
                        </Button>
                    </div>

                    {/* Note */}
                    <p className="text-sm text-slate-400">
                        • No setup needed. Works with your existing tools.
                    </p>
                </div>

                {/* Stats */}
                <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-8 md:gap-16">
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-white mb-1">11K+</div>
                        <div className="text-xs md:text-sm text-slate-400 uppercase tracking-wide">Files Indexed Daily</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-white mb-1">400+</div>
                        <div className="text-xs md:text-sm text-slate-400 uppercase tracking-wide">Teams Onboarded</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-white mb-1">42%</div>
                        <div className="text-xs md:text-sm text-slate-400 uppercase tracking-wide">Faster Retrieval</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
