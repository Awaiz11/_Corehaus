import { motion } from "framer-motion";
import { fadeUp } from "../lib/motion";

export default function Promo() {
  return (
    <section className="relative border-y border-white/10 bg-ink">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        variants={fadeUp}
        className="mx-auto grid max-w-[1600px] gap-8 px-5 py-10 md:grid-cols-[0.9fr_1.4fr_1fr] md:items-end md:px-10 md:py-14 lg:px-14"
      >
        <div>
          <p className="text-[10px] tracking-[0.4em] uppercase text-gold">Limited</p>
          <h2 className="mt-3 font-serif text-4xl italic leading-none text-cream md:text-5xl">
            SUMMER PROMO
          </h2>
        </div>

        <div className="space-y-4 text-sm leading-relaxed text-cream/80 md:text-[15px]">
          <p>
            <span className="text-cream">15% OFF 5 & 8 Class Packs</span>
            <span className="mx-3 text-gold/70">/</span>
            Code: <span className="tracking-[0.18em] text-gold">STRONGSEPTEMBER</span>
          </p>
          <p>
            <span className="text-cream">10% OFF 4 & 8 classes/month Membership</span>
            <span className="mx-3 text-gold/70">/</span>
            Code: <span className="tracking-[0.18em] text-gold">STRONGSEPTEMBER10</span>
          </p>
        </div>

        <p className="max-w-sm text-sm leading-relaxed text-dust md:justify-self-end">
          Get yours now. Start to give yourself the work and love you deserve with us in September!
          🌶️
        </p>
      </motion.div>
    </section>
  );
}
