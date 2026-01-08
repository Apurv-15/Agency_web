"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EncryptedText } from "@/components/ui/encrypted-text";

interface LazyLoaderProps {
    onLoadComplete?: () => void;
    loadingDuration?: number;
}

export const LazyLoader: React.FC<LazyLoaderProps> = ({
    onLoadComplete,
    loadingDuration = 3000,
}) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
            onLoadComplete?.();
        }, loadingDuration);

        return () => clearTimeout(timer);
    }, [loadingDuration, onLoadComplete]);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key="loader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black"
                >
                    <style jsx global>{`
                        @import url('https://fonts.googleapis.com/css2?family=Anonymous+Pro:ital,wght@0,400;0,700;1,400;1,700&display=swap');
                    `}</style>

                    <div className="flex flex-col items-center justify-center">
                        {/* Main Loading Text - Centered */}
                        <div className="text-center">
                            <h1 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "'Anonymous Pro', monospace" }}>
                                <EncryptedText
                                    text="Welcome to Softman"
                                    encryptedClassName="text-neutral-700"
                                    revealedClassName="text-white"
                                    revealDelayMs={80}
                                    flipDelayMs={60}
                                />
                            </h1>
                        </div>
                    </div>

                    {/* Animated Background Grid */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
