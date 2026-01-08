import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-violet-500/50">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <span className="font-bold text-xl text-white">LUCID</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#product" className="text-sm font-medium text-gray-400 hover:text-violet-400 transition-colors">
              Product
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium text-gray-400 hover:text-violet-400 transition-colors">
              How It Works
            </Link>
            <Link href="#stories" className="text-sm font-medium text-gray-400 hover:text-violet-400 transition-colors">
              Stories
            </Link>
            <Link href="#research" className="text-sm font-medium text-gray-400 hover:text-violet-400 transition-colors">
              Research
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-white/5">
              Log In
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-lg shadow-violet-500/50">
              START FREE
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
