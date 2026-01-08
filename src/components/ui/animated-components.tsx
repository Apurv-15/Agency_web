"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export function AnimatedSection({
    children,
    className,
    delay = 0
}: AnimatedSectionProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
            className={cn(className)}
        >
            {children}
        </motion.div>
    );
}

interface GlowCardProps {
    children: ReactNode;
    className?: string;
    glowColor?: string;
}

export function GlowCard({
    children,
    className,
    glowColor = "violet"
}: GlowCardProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.2 }}
            className={cn(
                "group relative overflow-hidden rounded-2xl",
                "border border-white/10 bg-black/40 backdrop-blur-sm",
                "p-6 transition-all duration-300",
                "hover:border-white/20 hover:bg-black/60",
                className
            )}
        >
            {/* Glow effect */}
            <div
                className={cn(
                    "absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl",
                    glowColor === "violet" && "bg-gradient-to-r from-violet-600/20 to-indigo-600/20",
                    glowColor === "blue" && "bg-gradient-to-r from-blue-600/20 to-cyan-600/20",
                    glowColor === "purple" && "bg-gradient-to-r from-purple-600/20 to-pink-600/20"
                )}
            />

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
}
