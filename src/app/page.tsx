"use client";

import { useState } from "react";
import { Navbar } from "@/components/ui/navbar";
import { LaserHeroV2 } from "@/components/sections/laser-hero-v2";
import InfiniteHero from "@/components/sections/infinite-hero";
import { Services } from "@/components/sections/services";
import { Projects } from "@/components/sections/projects";
import { SocialProof } from "@/components/sections/social-proof";
import { CTA } from "@/components/sections/cta";
import { LazyLoader } from "@/components/ui/lazy-loader";
import { FullscreenFeature } from "@/components/sections/fullscreen-feature";
import { WhyUs } from "@/components/sections/why-us";
import { WhyChooseUs } from "@/components/sections/why-choose-us";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {/* Loader overlay - shows on top while loading */}
      <LazyLoader onLoadComplete={() => setIsLoaded(true)} loadingDuration={3500} />

      {/* Main content - loads immediately but hidden behind loader */}
      <div
        className="min-h-screen transition-opacity duration-600 bg-black text-white selection:bg-white/20"
        style={{
          opacity: isLoaded ? 1 : 0,
          visibility: isLoaded ? 'visible' : 'hidden'
        }}
      >
        <Navbar />

        {/* New Laser Hero at the top */}
        <LaserHeroV2 />

        {/* Previous Hero moved below */}
        <InfiniteHero />

        <SocialProof />

        <WhyUs />
        <WhyChooseUs />

        <Services />
        {/* <FullscreenFeature /> */}
        <Projects />
        <CTA />
      </div>
    </>
  );
}
