import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { images } from "../assets/media";
import { fadeUp, stagger } from "../lib/motion";
import { studio } from "../data";
import Button from "./Button";

export default function Visit() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={ref} className="relative min-h-[80svh] overflow-hidden bg-burgundy">
      <motion.img
        src={images.studio}
        alt="Corehaus studio in Barcelona"
        style={{ y }}
        className="absolute inset-0 h-[120%] w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-burgundy via-burgundy/55 to-ink/30" />

      <div className="relative z-10 mx-auto flex min-h-[80svh] max-w-[1600px] flex-col justify-end px-5 py-20 md:px-10 md:py-24 lg:px-14">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid gap-10 lg:grid-cols-12 lg:items-end"
        >
          <div className="lg:col-span-7">
            <motion.p variants={fadeUp} className="text-[10px] tracking-[0.4em] uppercase text-gold">
              The studio
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-3 font-serif text-5xl font-light leading-[0.92] text-cream md:text-7xl"
            >
              Visit us in
              <span className="mt-1 block italic text-gold-bright">Barcelona</span>
            </motion.h2>
          </div>

          <motion.div variants={fadeUp} className="space-y-5 lg:col-span-5">
            <p className="font-serif text-2xl italic text-cream md:text-3xl">{studio.address}</p>
            <p className="text-dust">{studio.city}</p>
            <p className="text-cream/80">{studio.phone}</p>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Button href={studio.maps} target="_blank" rel="noreferrer">
                Get directions
              </Button>
              <Button href={studio.instagram} variant="outline" target="_blank" rel="noreferrer">
                {studio.instagramHandle}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
