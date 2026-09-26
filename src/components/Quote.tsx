import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { images } from "../assets/media";
import { fadeUp, stagger } from "../lib/motion";

export default function Quote() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-burgundy py-28 md:py-36">
      <motion.img
        src={images.machine}
        alt=""
        style={{ y }}
        className="absolute inset-0 h-[130%] w-full object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-burgundy via-burgundy/70 to-burgundy" />
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="relative z-10 mx-auto max-w-5xl px-5 text-center md:px-10"
      >
        <motion.p variants={fadeUp} className="text-[10px] tracking-[0.42em] uppercase text-gold">
          High intensity · Low impact
        </motion.p>
        <motion.blockquote
          variants={fadeUp}
          className="mt-8 font-serif text-3xl font-light italic leading-tight text-cream md:text-5xl lg:text-6xl"
        >
          Get ready to sweat, shake, and keep coming back for more.
        </motion.blockquote>
      </motion.div>
    </section>
  );
}
