import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { classPacks, introOffers, memberships } from "../data";
import type { Offer } from "../data";
import { fadeUp, stagger, easeOut } from "../lib/motion";

const tabs = [
  { id: "intro", label: "Intro Offers", items: introOffers },
  { id: "packs", label: "Packages", items: classPacks },
  { id: "members", label: "Memberships", items: memberships },
] as const;

function OfferRow({ offer, index }: { offer: Offer; index: number }) {
  return (
    <motion.a
      href="#schedule"
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, delay: index * 0.08, ease: easeOut },
        },
      }}
      whileHover={{ y: -3 }}
      className="group grid grid-cols-1 items-end gap-4 border-t border-white/10 py-8 transition-colors duration-500 last:border-b hover:bg-white/[0.02] md:grid-cols-[1.4fr_0.8fr_auto] md:gap-8 md:py-10"
    >
      <div>
        <h3 className="text-sm tracking-[0.28em] uppercase text-cream md:text-[15px]">
          {offer.name}
        </h3>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-dust">
          {offer.details.map((d) => (
            <span key={d}>{d}</span>
          ))}
          {offer.perClass && <span className="text-cream/60">{offer.perClass}</span>}
        </div>
        {offer.promo && (
          <p className="mt-3 text-[11px] tracking-[0.14em] uppercase text-gold">{offer.promo}</p>
        )}
      </div>

      <p className="font-serif text-5xl font-light leading-none text-cream transition-colors duration-500 group-hover:text-gold md:justify-self-end md:text-6xl">
        {offer.price}
      </p>

      <span className="inline-flex items-center gap-3 text-[11px] tracking-[0.28em] uppercase text-gold md:justify-self-end">
        {offer.cta}
        <span className="transition-transform duration-500 group-hover:translate-x-1.5">→</span>
      </span>
    </motion.a>
  );
}

export default function Packages() {
  const [active, setActive] = useState<(typeof tabs)[number]["id"]>("intro");
  const current = tabs.find((t) => t.id === active)!;

  return (
    <section id="packages" className="relative scroll-mt-24 bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid gap-10 lg:grid-cols-12"
        >
          <div className="lg:col-span-7">
            <motion.p variants={fadeUp} className="text-[10px] tracking-[0.4em] uppercase text-gold">
              Invest in yourself
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-3 font-serif text-5xl font-light leading-[0.9] text-cream md:text-7xl"
            >
              Packages
              <span className="mt-1 block italic text-gold-bright">& Memberships</span>
            </motion.h2>
          </div>
          <motion.div
            variants={fadeUp}
            className="max-w-md space-y-4 text-sm leading-relaxed text-cream/70 md:text-base lg:col-span-5 lg:pt-10"
          >
            <p>Choose between class packages or monthly memberships.</p>
            <p>Our memberships come with exclusive perks designed to elevate your Corehaus experience.</p>
          </motion.div>
        </motion.div>

        <div className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-b border-white/10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              className="relative pb-4 text-[11px] tracking-[0.28em] uppercase"
            >
              <span className={tab.id === active ? "text-cream" : "text-dust hover:text-cream"}>
                {tab.label}
              </span>
              {tab.id === active && (
                <motion.span
                  layoutId="pkg-tab"
                  className="absolute inset-x-0 bottom-0 h-px bg-gold"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: 12, transition: { duration: 0.25 } }}
            variants={stagger}
            className="mt-2"
          >
            {current.items.map((offer, i) => (
              <OfferRow key={offer.name} offer={offer} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
