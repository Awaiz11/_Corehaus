import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { images } from "../assets/media";
import { easeOut } from "../lib/motion";
import Button from "./Button";

const links = [
  { label: "About", href: "#about" },
  { label: "Schedule", href: "#schedule" },
  { label: "Packages", href: "#packages" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.1, ease: easeOut }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || open
            ? "border-b border-white/10 bg-burgundy/80 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto grid max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center px-5 py-4 md:px-10 lg:px-14">
          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[11px] tracking-[0.28em] uppercase text-cream/80 transition-colors hover:text-gold"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <span className="lg:hidden" />

          <a href="#top" className="justify-self-center">
            <img src={images.logo} alt="Corehaus" className="h-6 w-auto md:h-7" />
          </a>

          <div className="hidden items-center justify-end gap-6 lg:flex">
            <a
              href="https://momence.com/sign-in?hostId=47062"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] tracking-[0.28em] uppercase text-cream/80 transition-colors hover:text-gold"
            >
              Log In
            </a>
            <Button href="#schedule">Book your class</Button>
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="relative z-50 justify-self-end lg:hidden flex h-10 w-10 items-center justify-center"
          >
            <span className="sr-only">Menu</span>
            <span className="flex w-6 flex-col gap-1.5">
              <motion.span
                animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="h-px w-full bg-cream"
              />
              <motion.span
                animate={open ? { opacity: 0 } : { opacity: 1 }}
                className="h-px w-full bg-cream"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="h-px w-full bg-cream"
              />
            </span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-burgundy lg:hidden"
          >
            <div className="flex h-full flex-col justify-between px-6 pb-10 pt-24">
              <motion.nav
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.08 } } }}
                className="flex flex-col gap-2"
              >
                {[...links, { label: "Log In", href: "https://momence.com/sign-in?hostId=47062", target: "_blank", rel: "noopener noreferrer" }].map((link: any) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    target={link.target}
                    rel={link.rel}
                    onClick={() => setOpen(false)}
                    variants={{
                      hidden: { opacity: 0, y: 24 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
                    }}
                    className="font-serif text-5xl italic leading-tight text-cream"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </motion.nav>
              <Button href="#schedule" onClick={() => setOpen(false)} className="w-full">
                Book your class
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
