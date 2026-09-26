export type Offer = {
  name: string;
  price: string;
  perClass?: string;
  details: string[];
  promo?: string;
  cta: string;
};

export const introOffers: Offer[] = [
  {
    name: "INTRO OFFER",
    price: "59€",
    details: ["3 classes", "expires after 15 days"],
    cta: "SIGN ME UP",
  },
  {
    name: "2 WEEKS UNLIMITED",
    price: "129€",
    details: ["INTRO OFFER.", "Expires in 15 days"],
    cta: "SIGN ME UP",
  },
];

export const classPacks: Offer[] = [
  {
    name: "SINGLE CLASS",
    price: "29€",
    details: ["expires after 15 days"],
    cta: "I WANT THIS ONE",
  },
  {
    name: "5 PACK CLASS",
    price: "119€",
    perClass: "24€/class",
    details: ["expires after 30 days"],
    promo: "USE CODE STRONGSEPTEMBER FOR 15% OFF",
    cta: "I WANT THIS ONE",
  },
  {
    name: "8 PACK CLASS",
    price: "179€",
    perClass: "22€ / class",
    details: ["expires after 45 days"],
    promo: "USE CODE STRONGSEPTEMBER FOR 15% OFF",
    cta: "I WANT THIS ONE",
  },
  {
    name: "12 PACK CLASS",
    price: "259€",
    perClass: "21.5€/class",
    details: ["expires after 60 days"],
    cta: "I WANT THIS ONE",
  },
];

export const memberships: Offer[] = [
  {
    name: "4 CLASSES / MONTH",
    price: "96€",
    perClass: "24€/class",
    details: ["*minimum 3 months"],
    promo: "USE CODE STRONGSEPTEMBER10 FOR 10% OFF",
    cta: "I WANT THIS ONE",
  },
  {
    name: "8 CLASSES / MONTH",
    price: "169€",
    perClass: "21€ / class",
    details: ["*minimum 3 months"],
    promo: "USE CODE STRONGSEPTEMBER10 FOR 10% OFF",
    cta: "I WANT THIS ONE",
  },
  {
    name: "12 CLASSES/MONTH",
    price: "249€",
    perClass: "20.5€/class",
    details: [],
    cta: "I WANT THIS ONE",
  },
  {
    name: "UNLIMITED",
    price: "329€",
    perClass: "16.5€/class",
    details: [],
    cta: "I WANT THIS ONE",
  },
];

export type ClassItem = {
  id: string;
  time: string;
  name: string;
  subtitle: string;
  instructor: string;
  duration: number;
  spots: number;
  capacity: number;
};

const FOCUS: Record<number, { name: string; subtitle: string }> = {
  0: { name: "Full Body", subtitle: "Complete sculpt" },
  1: { name: "Lower Body", subtitle: "Glutes, legs & core" },
  2: { name: "Upper Body", subtitle: "Arms, back & core" },
  3: { name: "Full Body", subtitle: "Leg Wrap & Arm Wrap" },
  4: { name: "Lower Body", subtitle: "Glutes, legs & core" },
  5: { name: "Upper Body", subtitle: "Arms, back & core" },
  6: { name: "Full Body", subtitle: "Leg Wrap & Arm Wrap" },
};

const WEEKDAY_TIMES = ["07:00", "08:15", "09:30", "12:00", "13:15", "17:15", "18:30", "19:45"];
const SAT_TIMES = ["09:00", "10:15", "11:30", "13:00"];
const SUN_TIMES = ["10:00", "11:15"];
const INSTRUCTORS = ["Paula Fernández", "Paola Villafuerte"];

function hash(input: string) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function getDates(count = 14) {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

export function getFocusForDate(date: Date) {
  return FOCUS[date.getDay()];
}

export function getClassesForDate(date: Date): ClassItem[] {
  const day = date.getDay();
  const times = day === 0 ? SUN_TIMES : day === 6 ? SAT_TIMES : WEEKDAY_TIMES;
  const focus = FOCUS[day];
  const key = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");

  return times.map((time, i) => {
    const h = hash(key + time);
    const remaining = h % 9;
    return {
      id: `${key}-${time}`,
      time,
      name: focus.name,
      subtitle: focus.subtitle,
      instructor: INSTRUCTORS[i % INSTRUCTORS.length],
      duration: 50,
      spots: remaining,
      capacity: 8,
    };
  });
}

export const studio = {
  address: "Carrer d'Alfons XII 10",
  city: "08006 Barcelona",
  phone: "+34 670 87 36 30",
  instagram: "https://www.instagram.com/corehaus_es/",
  instagramHandle: "@corehaus_es",
  maps: "https://maps.google.com/?q=Carrer%20d%27Alfons%20XII%2010%2C%20Barcelona",
};
