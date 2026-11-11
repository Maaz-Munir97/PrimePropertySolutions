/**
 * All site copy and data in one place.
 * Descriptions come from the original concept copy.
 * Gallery captions, the four process steps and the value statements were written
 * for this concept — confirm them with the client before going live.
 */

export const site = {
  name: "MaxOne Solutions",
  email: "maxone@info.com",
  phone: "+1 123 456",
  phoneHref: "tel:+1123456",
  offices: [{ name: "Office", address: "Australia" }],
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const g = (n: number) => `/images/gallery/g${n}.webp`;

export const heroTrust = ["Dulux Accredited", "Master Builders Member", "5-Year Guarantee"];

export const sectors = [
  "Residential",
  "Commercial",
  "Strata",
  "Insurance Repairs",
  "Painting & Decorating",
  "Catastrophic Events",
];

export const intro = {
  lead: "We're more than just trades; we're committed to building lasting relationships with our clients.",
  body: [
    "Whether you need work done on your home, business, or strata property, we're here to simplify your project and provide the peace of mind that comes from knowing your property is in expert hands.",
    "With over 30 years of experience across residential, commercial, insurance, and catastrophic events, we've mastered the art of clear communication and transparency. You'll feel confident and informed throughout the entire process, from the first consultation to the final reveal.",
  ],
};

export const stats = [
  { value: 30, suffix: "+", label: "Years of industry experience" },
  { value: 5, suffix: "", label: "Year workmanship guarantee" },
  { value: 3, suffix: "", label: "Specialist sectors — residential, commercial & insurance" },
  { value: 100, suffix: "%", label: "Commitment to every client" },
];

export const transformations = [
  {
    id: "commercial",
    title: "Commercial / Strata",
    before: "/images/before-after/1-before.webp",
    after: "/images/before-after/1-after.webp",
  },
  {
    id: "residential",
    title: "Residential",
    before: "/images/before-after/2-before.webp",
    after: "/images/before-after/2-after.webp",
  },
  {
    id: "insurance",
    title: "Insurance Repairs",
    before: "/images/before-after/3-before.webp",
    after: "/images/before-after/3-after.webp",
  },
];

export const services = [
  {
    slug: "commercial-strata",
    number: "01",
    title: "Commercial & Strata",
    tagline: "Minimal disruption",
    description:
      "Our highly experienced team understands the importance of exceeding expectations. We work closely with committees, owners, and tenants to ensure minimal disruption to daily life while delivering exceptional results.",
    points: [
      "Strata & body corporate projects",
      "Committee, owner & tenant liaison",
      "Works staged around daily life",
      "Commercial interiors & ceilings",
    ],
    image: g(6),
    imageAlt: "Completed commercial interior ceiling works",
    transformation: 0,
  },
  {
    slug: "residential",
    number: "02",
    title: "Residential",
    tagline: "Complete decorating",
    description:
      "Our team offers more than expert painting services. We provide a complete decorating solution. Our team of trades can handle every aspect of your project, from colour consultation to the final coat of paint. We deliver high-quality results that exceed expectations at competitive prices.",
    points: [
      "Interior & exterior painting",
      "Colour consultation",
      "Coordinated trades for every stage",
      "Quality finishes, competitive prices",
    ],
    image: g(5),
    imageAlt: "Bright, freshly finished living room",
    transformation: 1,
  },
  {
    slug: "insurance-repairs",
    number: "03",
    title: "Insurance Repairs",
    tagline: "Stress-free restoration",
    description:
      "Dealing with insurance repairs can be stressful. Our experienced team specialises in making the process as smooth and hassle-free as possible. From assessment to completion, we'll work closely with your insurance provider and handle every detail with care and expertise, ensuring your property is restored to its pre-loss condition.",
    points: [
      "Assessment through to completion",
      "We work directly with your insurer",
      "Catastrophic event experience",
      "Restored to pre-loss condition",
    ],
    image: g(7),
    imageAlt: "Open-plan living area with water views",
    transformation: 2,
  },
];

export const process = [
  {
    title: "Consultation",
    text: "We listen, inspect the property and make sure we understand exactly what you need.",
  },
  {
    title: "Transparent quote",
    text: "A clear, detailed quote so you know the scope, the timing and the cost up front.",
  },
  {
    title: "Coordinated delivery",
    text: "Your project coordinator keeps trades, managers and you in sync with regular updates.",
  },
  {
    title: "The final reveal",
    text: "A thorough final inspection and walkthrough, backed by our 5-year workmanship guarantee.",
  },
];

export type GalleryCategory = "Residential" | "Commercial & Strata";

export type GalleryItem = {
  src: string;
  title: string;
  category: GalleryCategory;
};

export const gallery: GalleryItem[] = [
  { src: g(4), title: "Two-storey home & pool area", category: "Residential" },
  { src: g(6), title: "Commercial interior ceilings", category: "Commercial & Strata" },
  { src: g(7), title: "Waterfront open-plan living", category: "Residential" },
  { src: g(1), title: "Balustrades & exterior joinery", category: "Commercial & Strata" },
  { src: g(5), title: "Living room refresh", category: "Residential" },
  { src: g(3), title: "Commercial fit-out in progress", category: "Commercial & Strata" },
  { src: g(8), title: "Kitchen & dining", category: "Residential" },
  { src: g(2), title: "Interior protected for painting", category: "Residential" },
  { src: g(9), title: "Kitchen & utility space", category: "Residential" },
];

export const accreditations = [
  { icon: "dulux", title: "Dulux Accredited", detail: "Accredited painting contractor" },
  { icon: "mbq", title: "Master Builders Member", detail: "Proud member of Master Builders Queensland" },
  { icon: "guarantee", title: "5 Year Workmanship Guarantee", detail: "Quality you can rely on, long after the reveal" },
] as const;

export const values = [
  {
    title: "Clear communication",
    text: "You'll feel confident and informed throughout the entire process, with updates at every stage.",
  },
  {
    title: "Transparency",
    text: "Detailed quotes and no surprises — from the initial quote to the final inspection.",
  },
  {
    title: "Integrity",
    text: "Client satisfaction and integrity set the standard for every decision we make.",
  },
  {
    title: "Lasting quality",
    text: "High-quality workmanship, backed by our 5-year workmanship guarantee.",
  },
];
