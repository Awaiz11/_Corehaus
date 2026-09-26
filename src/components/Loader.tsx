import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { images } from "../assets/media";
import { easeOut } from "../lib/motion";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const hide = window.setTimeout(() => setVisible(false), 2100);
    const done = window.setTimeout(() => {
      document.body.style.overflow = prev;
      onComplete();
    }, 2800);
    return () => {
      window.clearTimeout(hide);
      window.clearTimeout(done);
      document.body.style.overflow = prev;
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-burgundy"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: easeOut }}
        >
          <div className="flex flex-col items-center gap-8">
            <motion.img
              src={images.logo}
              alt="Corehaus"
              className="h-8 w-auto md:h-10"
              initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: easeOut }}
            />
            <motion.div
              className="h-px w-28 origin-center bg-gold"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, delay: 0.35, ease: easeOut }}
            />
            <motion.p
              className="text-[10px] tracking-[0.45em] uppercase text-gold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              Barcelona
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
