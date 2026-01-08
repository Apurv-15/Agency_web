import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface FloatingCardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
}

export function FloatingCard({ children, className, hover = true }: FloatingCardProps) {
    return (
        <div
            className={cn(
                "bg-white rounded-2xl shadow-lg p-6 transition-all duration-300",
                hover && "hover:shadow-xl hover:-translate-y-1",
                className
            )}
        >
            {children}
        </div>
    );
}
