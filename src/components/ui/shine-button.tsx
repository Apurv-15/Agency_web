"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ShineButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: "primary" | "secondary";
}

export function ShineButton({
    children,
    className,
    variant = "primary",
    ...props
}: ShineButtonProps) {
    return (
        <button
            className={cn(
                "group relative overflow-hidden rounded-lg px-6 py-3 text-sm font-medium transition-all duration-300",
                variant === "primary" && [
                    "bg-gradient-to-r from-violet-600 to-indigo-600",
                    "text-white shadow-lg shadow-violet-500/50",
                    "hover:shadow-xl hover:shadow-violet-500/60",
                    "hover:scale-105",
                ],
                variant === "secondary" && [
                    "border border-white/20 bg-white/5 text-white",
                    "backdrop-blur-sm",
                    "hover:bg-white/10 hover:border-white/30",
                ],
                className
            )}
            {...props}
        >
            {/* Shine effect */}
            <span className="absolute inset-0 overflow-hidden">
                <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
            </span>

            {/* Content */}
            <span className="relative z-10">{children}</span>
        </button>
    );
}
