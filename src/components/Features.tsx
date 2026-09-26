import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { images } from "../assets/media";
import { fadeUp, stagger, easeOut } from "../lib/motion";

function ParallaxImage({
  src,
  alt,
  className,
  reverse = false,
}: {
  src: string;
  alt: string;
  className?: string;
  reverse?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reverse ? [-56, 56] : [70, -70]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`}>
      <motion.img src={src} alt={alt} style={{ y, scale }} className="h-[120%] w-full object-cover" />
    </div>
  );
}

function EditorialBlock({
  index,
  title,
  body,
  image,
  alt,
  reverse,
}: {
  index: string;
  title: string;
  body: string;
  image: string;
  alt: string;
  reverse?: boolean;
}) {
  return (
    <motion.article
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger}
      className="grid items-center gap-8 py-16 md:gap-12 md:py-24 lg:grid-cols-12 lg:gap-8"
    >
      <div
        className={`relative lg:col-span-6 ${
          reverse ? "lg:col-start-7 lg:row-start-1" : "lg:col-start-1"
        }`}
      >
        <ParallaxImage
          src={image}
          alt={alt}
          reverse={reverse}
          className={`aspect-[4/5] w-full md:aspect-[5/6] ${
            reverse ? "lg:ml-auto lg:w-[88%]" : "lg:w-[88%]"
          }`}
        />
        <motion.span
          variants={fadeUp}
          className="absolute -top-6 left-0 font-serif text-6xl italic text-gold/40 md:-left-4 md:text-8xl"
        >
          {index}
        </motion.span>
      </div>

      <div
        className={`lg:col-span-5 ${
          reverse ? "lg:col-start-1 lg:row-start-1 lg:pr-8" : "lg:col-start-8"
        }`}
      >
        <motion.p
          variants={fadeUp}
          className="text-[10px] tracking-[0.38em] uppercase text-gold"
        >
          The method
        </motion.p>
        <motion.h3
          variants={fadeUp}
          className="mt-4 font-serif text-4xl font-light leading-[1.05] text-cream md:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h3>
        <motion.div
          variants={{
            hidden: { scaleX: 0 },
            show: { scaleX: 1, transition: { duration: 0.9, ease: easeOut } },
          }}
          className="mt-6 h-px w-16 origin-left bg-gold/70"
        />
        <motion.p variants={fadeUp} className="mt-6 max-w-md text-base leading-relaxed text-cream/70">
          {body}
        </motion.p>
      </div>
    </motion.article>
  );
}

export default function Features() {
  return (
    <section id="about" className="relative scroll-mt-24 overflow-hidden bg-burgundy">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
        <div className="grid items-end gap-10 pb-8 pt-24 md:pt-32 lg:grid-cols-12 lg:gap-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="relative lg:col-span-8"
          >
            <motion.p
              variants={fadeUp}
              className="mb-6 text-[10px] tracking-[0.4em] uppercase text-gold"
            >
              Strengthen, Tone & Sculpt
            </motion.p>
            <div className="relative">
              <ParallaxImage
                src={images.sculpt}
                alt="The strongest version of yourself"
                className="aspect-[16/11] w-full md:aspect-[16/9] lg:w-[78%]"
              />
              <div className="absolute -right-2 top-10 hidden w-[28%] overflow-hidden border border-white/10 shadow-2xl lg:block">
                <ParallaxImage
                  src={images.class}
                  alt="Instructor leading a Corehaus class"
                  reverse
                  className="aspect-[3/4] w-full"
                />
              </div>
              <h2 className="pointer-events-none mt-6 font-serif text-[14vw] font-light leading-[0.82] text-cream md:absolute md:-bottom-10 md:right-0 md:mt-0 md:max-w-[9ch] md:text-right md:text-[7.2vw] lg:-bottom-14 lg:text-[6.4vw]">
                <span className="block overflow-hidden">
                  <motion.span variants={fadeUp} className="block">
                    Strengthen,
                  </motion.span>
                </span>
                <span className="block overflow-hidden italic text-gold-bright">
                  <motion.span variants={fadeUp} className="block">
                    Tone & Sculpt
                  </motion.span>
                </span>
              </h2>
            </div>
          </motion.div>

          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="max-w-md text-base leading-relaxed text-cream/70 lg:col-span-4 lg:mb-16 lg:justify-self-end"
          >
            Corehaus is a 50-minute high-intensity, low-impact resistance workout on our custom
            machines.
          </motion.p>
        </div>

        <EditorialBlock
          index="01"
          title="STRENGTH TRAINING"
          body="The best of pilates, weight training, and resistance training to build strength, a leaner physique, and toned muscles"
          image={images.strength}
          alt="Strength training on a Corehaus machine"
        />
        <EditorialBlock
          index="02"
          title="TIME UNDER TENSION"
          body="Slow and controlled movements that specifically target key muscle groups, all while ensuring minimal strain on the organs and joints."
          image={images.tension}
          alt="Time under tension training"
          reverse
        />
        <EditorialBlock
          index="03"
          title="A ONE-OF-A-KIND EXPERIENCE"
          body="Paired with DJ‑curated playlists and instructors fueling your “yes, I can” mindset, you’ll leave motivated, supported, and seeing results immediately."
          image={images.experience}
          alt="A one-of-a-kind Corehaus class experience"
        />
      </div>
    </section>
  );
}
