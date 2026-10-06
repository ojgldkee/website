// Edit this ONE file to rename the store, change the full palette, or adjust store-wide settings.
export const store = {
  name: "Forma Research", // Working name — replace when your brand is finalized.
  monogram: "fr",
  description:
    "A considered approach to research essentials. Explore the collection, product details, and documentation.",
  currency: "USD",
  locale: "en-US",
  colors: {
    forest: "#153C2F",
    dark: "#0D2C22",
    sage: "#DCE7DF",
    cream: "#F5F2E9",
    ink: "#15201B",
    muted: "#6C756F",
    white: "#FFFFFF",
  },
  announcement: {
    enabled: true,
    text: "A new perspective on research essentials",
    href: "/collections",
    linkText: "Explore the collection",
  },
  ticker: {
    enabled: false,
    items: [
      "Explore the collection",
      "Read product documentation",
      "Get in touch",
    ],
  },
  freeShippingThreshold: 15000, // All money values are integer cents.
  shipping: [
    {
      id: "standard",
      name: "Standard",
      description: "Estimated 4–7 business days",
      amount: 795,
    },
    {
      id: "priority",
      name: "Priority",
      description: "Estimated 2–3 business days",
      amount: 1495,
    },
  ],
  supportEmail: "", // Add a real monitored support email before launch.
  supportGuidance:
    "Support hours and response times will be published before launch.",
  socialLinks: [] as { label: string; href: string }[],
  images: {
    hero: "/images/site/hero.svg",
    standards: "/images/site/standards.svg",
    about: "/images/site/standards.svg",
  }, // Replace with hero.jpg, standards.jpg, about.jpg.
  demoMode: true, // Keep true until catalog, policies, inventory and ALL services are ready.
  footer: {
    about:
      "Research, thoughtfully considered. A focused collection. A clearer perspective.",
    secureText: "Secure checkout · coming at launch",
  },
};
export const footerGroups = [
  {
    title: "Shop",
    links: [
      ["All products", "/collections"],
      ["Featured", "/collections?filter=featured"],
      ["New arrivals", "/collections?filter=new"],
      ["Collections", "/collections#categories"],
    ],
  },
  {
    title: "Support",
    links: [
      ["Contact us", "/contact"],
      ["Track order", "/track-order"],
      ["FAQ", "/faq"],
      ["Shipping", "/shipping"],
      ["Returns & refunds", "/returns"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About", "/about"],
      ["Our standards", "/standards"],
      ["Quality & documentation", "/documentation"],
      ["Contact", "/contact"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Privacy policy", "/privacy"],
      ["Terms of service", "/terms"],
      ["Shipping policy", "/shipping"],
      ["Refund policy", "/returns"],
      ["Disclaimer", "/disclaimer"],
    ],
  },
];
