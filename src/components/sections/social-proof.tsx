"use client";

import { motion } from "framer-motion";

export function SocialProof() {
    const brands = [
        "Opal",
        "Dune",
        "Asterisk",
        "Oasis",
        "Eooks",
        "Opal",
        "Dune",
        "Asterisk",
    ];

    return (
        <section className="py-20 bg-black border-y border-white/5 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="relative">
                    <motion.div
                        animate={{
                            x: [0, -1000],
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 30,
                                ease: "linear",
                            },
                        }}
                        className="flex gap-12 items-center"
                    >
                        {[...brands, ...brands].map((brand, index) => (
                            <div
                                key={`${brand}-${index}`}
                                className="flex-shrink-0 text-2xl md:text-3xl font-semibold text-gray-600 hover:text-violet-400 transition-colors cursor-pointer"
                            >
                                {brand === "Asterisk" && "✱ "}
                                {brand === "Opal" && "◎ "}
                                {brand}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
