import { motion } from "framer-motion";
import { images } from "../assets/media";
import { fadeUp, stagger } from "../lib/motion";
import { studio } from "../data";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        variants={stagger}
        className="mx-auto grid max-w-[1600px] gap-12 px-5 py-16 md:grid-cols-3 md:px-10 md:py-20 lg:px-14"
      >
        <motion.div variants={fadeUp}>
          <img src={images.logo} alt="Corehaus" className="h-6 w-auto" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-dust">
            A 50‑minute, high‑intensity, low‑impact workout that will sculpt, tone, and strengthen
            every muscle of your body.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="space-y-3 text-sm text-cream/75">
          <p className="text-[10px] tracking-[0.32em] uppercase text-gold">Studio</p>
          <p>{studio.address}</p>
          <p>{studio.city}</p>
          <a href={`tel:${studio.phone.replace(/\s/g, "")}`} className="block hover:text-gold">
            {studio.phone}
          </a>
        </motion.div>

        <motion.div variants={fadeUp} className="space-y-3 text-sm">
          <p className="text-[10px] tracking-[0.32em] uppercase text-gold">Navigate</p>
          <div className="flex flex-col gap-2 text-cream/75">
            <a href="#about" className="hover:text-gold">
              About
            </a>
            <a href="#schedule" className="hover:text-gold">
              Schedule
            </a>
            <a href="#packages" className="hover:text-gold">
              Packages
            </a>
            <a href="/login-portal" className="hover:text-gold">
              Log In
            </a>
            <a href={studio.instagram} target="_blank" rel="noreferrer" className="hover:text-gold">
              Instagram
            </a>
          </div>
        </motion.div>
      </motion.div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-3 px-5 py-6 text-[11px] tracking-[0.18em] uppercase text-dust md:flex-row md:items-center md:justify-between md:px-10 lg:px-14">
          <p>© {new Date().getFullYear()} Corehaus</p>
          <p>Create the strongest version of yourself</p>
        </div>
      </div>
    </footer>
  );
}
