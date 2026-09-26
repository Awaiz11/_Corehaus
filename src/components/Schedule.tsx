import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { fadeUp, stagger, staggerFast, easeOut } from "../lib/motion";
import { getClassesForDate, getDates, getFocusForDate } from "../data";
import type { ClassItem } from "../data";

const dayFmt = new Intl.DateTimeFormat("en-GB", { weekday: "short" });
const monthFmt = new Intl.DateTimeFormat("en-GB", { month: "short" });

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function ClassRow({ item, index }: { item: ClassItem; index: number }) {
  const full = item.spots === 0;
  const low = item.spots > 0 && item.spots <= 2;

  return (
    <motion.a
      href="#packages"
      variants={{
        hidden: { opacity: 0, y: 18 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, delay: index * 0.05, ease: easeOut },
        },
      }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col gap-4 border-b border-white/10 px-2 py-5 transition-[transform,box-shadow,background-color] duration-500 hover:bg-white/[0.035] hover:shadow-[0_20px_60px_-24px_rgba(201,168,130,0.7)] sm:flex-row sm:items-center sm:gap-6 sm:px-4"
    >
      <span className="absolute left-0 top-1/2 h-0 w-px -translate-y-1/2 bg-gold transition-all duration-500 group-hover:h-12" />
      <div className="flex min-w-[92px] items-baseline gap-2">
        <span className="font-serif text-3xl font-light text-cream">{item.time}</span>
      </div>
      <div className="flex-1">
        <p className="text-sm tracking-[0.18em] uppercase text-cream">{item.name}</p>
        <p className="mt-1 text-sm text-dust">
          {item.subtitle} · {item.duration} min · {item.instructor}
        </p>
      </div>
      <div className="flex items-center justify-between gap-6 sm:justify-end">
        <span
          className={`text-[11px] tracking-[0.16em] uppercase ${
            full ? "text-spice" : low ? "text-gold" : "text-cream/50"
          }`}
        >
          {full ? "Waitlist" : `${item.spots} spots`}
        </span>
        <span className="text-[11px] tracking-[0.28em] uppercase text-gold transition-transform duration-500 group-hover:translate-x-1">
          {full ? "Join waitlist" : "Book"} →
        </span>
      </div>
    </motion.a>
  );
}

export default function Schedule() {
  const dates = useMemo(() => getDates(14), []);
  const today = dates[0];
  const [selected, setSelected] = useState(today);
  const [direction, setDirection] = useState(1);
  const scroller = useRef<HTMLDivElement>(null);
  const classes = getClassesForDate(selected);
  const focus = getFocusForDate(selected);

  const selectDate = (date: Date) => {
    setDirection(date.getTime() >= selected.getTime() ? 1 : -1);
    setSelected(date);
  };

  useEffect(() => {
    const container = scroller.current;
    const activeEl = container?.querySelector<HTMLElement>("[data-active='true']");
    if (!container || !activeEl) return;
    const left = activeEl.offsetLeft - container.clientWidth / 2 + activeEl.clientWidth / 2;
    container.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [selected]);

  return (
    <section id="schedule" className="relative scroll-mt-24 bg-burgundy py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid gap-8 lg:grid-cols-12 lg:items-end"
        >
          <div className="lg:col-span-7">
            <motion.p variants={fadeUp} className="text-[10px] tracking-[0.4em] uppercase text-gold">
              Monthly
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-3 font-serif text-5xl font-light leading-[0.9] text-cream md:text-7xl lg:text-8xl"
            >
              Calendar
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            className="max-w-xl text-sm leading-relaxed text-cream/70 md:text-base lg:col-span-5 lg:justify-self-end"
          >
            Each day of the week we alternate between different muscle groups for the lower and
            upper body to allow your body to recover between days while sufficiently bringing
            specific muscle groups to failure every time you come!
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeUp}
          className="mt-12 md:mt-16"
        >
          <div
            ref={scroller}
            className="no-scrollbar flex gap-2 overflow-x-auto pb-2 md:gap-3 [mask-image:linear-gradient(to_right,transparent,black_16px,black_calc(100%-16px),transparent)]"
          >
            {dates.map((date) => {
              const active = isSameDay(date, selected);
              const isToday = isSameDay(date, today);
              const f = getFocusForDate(date);
              return (
                <button
                  key={date.toISOString()}
                  type="button"
                  onClick={() => selectDate(date)}
                  data-active={active}
                  className="relative min-w-[78px] shrink-0 px-3 py-4 text-left md:min-w-[92px]"
                >
                  {active && (
                    <motion.span
                      layoutId="date-pill"
                      className="absolute inset-0 bg-cream"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  )}
                  <span className="relative z-10 flex flex-col">
                    <span
                      className={`text-[10px] tracking-[0.22em] uppercase ${
                        active ? "text-burgundy/70" : "text-dust"
                      }`}
                    >
                      {isToday ? "Today" : dayFmt.format(date)}
                    </span>
                    <span
                      className={`mt-1 font-serif text-3xl leading-none ${
                        active ? "text-burgundy" : "text-cream"
                      }`}
                    >
                      {date.getDate()}
                    </span>
                    <span
                      className={`mt-2 text-[9px] tracking-[0.16em] uppercase ${
                        active ? "text-burgundy/60" : "text-cream/40"
                      }`}
                    >
                      {monthFmt.format(date)}
                    </span>
                    <span
                      className={`mt-2 hidden text-[9px] tracking-[0.12em] uppercase md:block ${
                        active ? "text-burgundy/70" : "text-gold/70"
                      }`}
                    >
                      {f.name}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        <div className="mt-8 flex items-end justify-between border-b border-white/10 pb-4">
          <div>
            <p className="text-[10px] tracking-[0.32em] uppercase text-gold">Today’s focus</p>
            <p className="mt-1 font-serif text-2xl italic text-cream md:text-3xl">{focus.name}</p>
          </div>
          <p className="text-sm text-dust">{classes.length} classes · 50 min</p>
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={selected.toDateString()}
            custom={direction}
            initial={{ opacity: 0, x: direction * 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -28 }}
            transition={{ duration: 0.4, ease: easeOut }}
            className="mt-2"
          >
            <motion.div initial="hidden" animate="show" variants={staggerFast}>
              {classes.map((item, i) => (
                <ClassRow key={item.id} item={item} index={i} />
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
