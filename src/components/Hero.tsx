import { motion } from "framer-motion";
import { images } from "../assets/media";
import { easeOut } from "../lib/motion";
import Button from "./Button";

const lines = [
  { text: "CREATE", italic: false },
  { text: "THE STRONGEST", italic: true },
  { text: "VERSION OF", italic: false },
  { text: "YOURSELF", italic: false },
];

export default function Hero({ ready }: { ready: boolean }) {
  return (
    <section id="top" className="relative h-svh min-h-[680px] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={images.hero}
          alt="Athlete training on a Corehaus machine"
          className="kenburns h-full w-full object-cover object-[center_20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-burgundy/35 to-burgundy" />
        <div className="absolute inset-0 bg-gradient-to-r from-burgundy/80 via-burgundy/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-burgundy via-transparent to-ink/30" />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-end px-5 pb-10 md:px-10 md:pb-14 lg:px-14 lg:pb-16">
        <div className="mb-6 flex items-center gap-4">
          <motion.span
            initial={{ scaleX: 0 }}
            animate={ready ? { scaleX: 1 } : {}}
            transition={{ duration: 0.9, ease: easeOut }}
            className="h-px w-10 origin-left bg-gold"
          />
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: easeOut }}
            className="text-[10px] tracking-[0.42em] uppercase text-gold"
          >
            Barcelona · 50 minutes
          </motion.p>
        </div>

        <h1 className="max-w-[18ch] font-serif text-[14vw] font-light leading-[0.86] text-cream md:text-[8.4vw] lg:text-[7.2vw]">
          {lines.map((line, i) => (
            <span key={line.text} className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%", rotate: 4 }}
                animate={ready ? { y: "0%", rotate: 0 } : {}}
                transition={{ duration: 1.05, delay: 0.12 + i * 0.12, ease: easeOut }}
                className={`block ${line.italic ? "italic text-gold-bright" : ""} ${
                  i === 3 ? "text-cream" : ""
                }`}
              >
                {line.text}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-8 flex flex-col gap-8 lg:mt-10 lg:flex-row lg:items-end lg:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.75, ease: easeOut }}
            className="max-w-xl text-sm leading-relaxed text-cream/75 md:text-base"
          >
            A 50‑minute, high‑intensity, low‑impact workout that will{" "}
            <span className="text-cream">sculpt, tone, and strengthen</span> every muscle of your
            body. Get ready to sweat, shake, and keep coming back for more.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.9, ease: easeOut }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <Button href="#schedule">Book my class</Button>
            <Button href="#packages" variant="outline">
              Buy a class / package
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 right-6 hidden flex-col items-center gap-3 md:right-10 md:flex lg:right-14"
      >
        <span className="text-[9px] tracking-[0.4em] uppercase text-cream/50">Scroll</span>
        <span className="scroll-line h-12 w-px bg-gold" />
      </motion.div>
    </section>
  );
}
