const items = [
  "SWEAT",
  "SHAKE",
  "SCULPT",
  "STRENGTHEN",
  "TONE",
  "CREATE THE STRONGEST VERSION OF YOURSELF",
];

export default function Marquee() {
  const sequence = [...items, ...items, ...items, ...items];

  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-ink py-7 md:py-9">
      <div className="marquee-track flex w-max items-center gap-8">
        {sequence.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-8">
            <span className="font-serif text-3xl italic text-cream/90 md:text-5xl">{item}</span>
            <span className="text-gold">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
