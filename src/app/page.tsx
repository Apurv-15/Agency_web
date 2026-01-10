"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/ui/navbar";
import { LaserHeroV2 } from "@/components/sections/laser-hero-v2";
import InfiniteHero from "@/components/sections/infinite-hero";
// import { Services } from "@/components/sections/services";
// import { Projects } from "@/components/sections/projects";
import { SocialProof } from "@/components/sections/social-proof";
import { CTA } from "@/components/sections/cta";
import { LazyLoader } from "@/components/ui/lazy-loader";
import { FullscreenFeature } from "@/components/sections/fullscreen-feature";
import { WhyUs } from "@/components/sections/why-us";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { BeamTimeline } from "@/components/sections/beam-timeline";

import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [showBeam, setShowBeam] = useState(true);
  const [showText, setShowText] = useState(false);

  // No delay needed, let it mount behind the loader immediately


  const handleLoadComplete = () => {
    setIsLoaded(true);

    // Navbar appears subtlely as the transition starts
    setTimeout(() => {
      setShowNavbar(true);
    }, 200);

    // Text reveal follows after the scene is set
    setTimeout(() => {
      setShowText(true);
    }, 1200);
  };

  return (
    <>
      <LazyLoader onLoadComplete={handleLoadComplete} loadingDuration={3500} />

      <motion.div
        className="min-h-screen bg-black text-white selection:bg-white/20"
        style={{
          willChange: 'transform',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          perspective: 1000
        }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          ease: "easeOut"
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showNavbar ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <Navbar />
        </motion.div>

        {/* Laser Hero with Stage Props */}
        <LaserHeroV2 showBeam={showBeam} showText={showText} />

        {/* Other sections stagger in after text starts or along with it */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showText ? 1 : 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          {/* <InfiniteHero /> */}
          <SocialProof />
          <WhyUs />
          <WhyChooseUs />
          <BeamTimeline />
          {/* <Services /> */}
          {/* <Projects /> */}
          <CTA />
        </motion.div>
      </motion.div>
    </>
  );
}
