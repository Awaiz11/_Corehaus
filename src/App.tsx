import { useCallback, useState } from "react";
import { motion, useScroll } from "framer-motion";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Promo from "./components/Promo";
import Features from "./components/Features";
import Marquee from "./components/Marquee";
import Schedule from "./components/Schedule";
import Packages from "./components/Packages";
import Quote from "./components/Quote";
import Visit from "./components/Visit";
import Footer from "./components/Footer";

export default function App() {
  const [ready, setReady] = useState(false);
  const { scrollYProgress } = useScroll();
  const onComplete = useCallback(() => setReady(true), []);

  return (
    <div className="relative min-h-screen bg-burgundy font-sans text-cream antialiased">
      <div className="grain" aria-hidden="true" />
      <motion.div
        className="fixed left-0 right-0 top-0 z-[70] h-[1.5px] origin-left bg-gold"
        style={{ scaleX: scrollYProgress }}
      />
      <Loader onComplete={onComplete} />
      <Navbar />
      <main>
        <Hero ready={ready} />
        <Promo />
        <Features />
        <Marquee />
        <Quote />
        <Schedule />
        <Packages />
        <Visit />
      </main>
      <Footer />
    </div>
  );
}
