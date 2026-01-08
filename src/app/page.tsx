"use client";
import { useState } from "react";
import { Navbar } from "@/components/ui/navbar";
import InfiniteHero from "@/components/sections/infinite-hero";
import { FullscreenFeature } from "@/components/sections/fullscreen-feature";
import { Services } from "@/components/sections/services";
import { Projects } from "@/components/sections/projects";
import { SocialProof } from "@/components/sections/social-proof";
import { CTA } from "@/components/sections/cta";
import { LazyLoader } from "@/components/ui/lazy-loader";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {/* Loader overlay - shows on top while loading */}
      <LazyLoader onLoadComplete={() => setIsLoaded(true)} loadingDuration={3500} />

      {/* Main content - loads immediately but hidden behind loader */}
      <div
        className="min-h-screen transition-opacity duration-600"
        style={{
          opacity: isLoaded ? 1 : 0,
          visibility: isLoaded ? 'visible' : 'hidden'
        }}
      >
        <Navbar />
        <InfiniteHero />
        <FullscreenFeature />
        <Services />
        <Projects />
        <SocialProof />
        <CTA />
      </div>
    </>
  );
}
