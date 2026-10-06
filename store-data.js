window.STORE = {
  name: "Forma Research",
  shortName: "FORMA",
  subName: "RESEARCH",
  currency: "USD",
  shippingThreshold: 150,
  promo: {
    enabled: true,
    label: "LAUNCH WEEK ENDS",
    endsAt: "2026-10-12T23:59:59-07:00",
    cta: "SHOP THE COLLECTION",
    href: "collections.html"
  },
  announcements: [
    "COMPLIMENTARY SHIPPING ON ORDERS $150+",
    "PRODUCT DOCUMENTATION ON EVERY LISTING",
    "TRACKED DELIVERY",
    "SUPPORT WHEN YOU NEED IT"
  ]
};

window.PRODUCTS = [
  {
    slug: "product-one",
    name: "Product One",
    category: "Featured",
    price: 49.99,
    compareAt: 59.99,
    badge: "BEST SELLER",
    image: "public/images/products/product-1.svg",
    gallery: ["public/images/products/product-1.svg","public/images/products/detail.svg"],
    subtitle: "Research reference · premium presentation",
    description: "A clean product template with room for final specifications, documentation, batch information, and fulfillment details.",
    specs: [["Format","Reference material"],["Availability","In stock"],["Documentation","Listing ready"],["Storage","See final documentation"]],
    variants: ["Standard","Extended"],
    document: "Documentation placeholder"
  },
  {
    slug: "product-two",
    name: "Product Two",
    category: "New arrival",
    price: 59.99,
    compareAt: null,
    badge: "NEW",
    image: "public/images/products/product-2.svg",
    gallery: ["public/images/products/product-2.svg","public/images/products/detail.svg"],
    subtitle: "New arrival · clear specifications",
    description: "A flexible product page example designed for variants, product notes, shipping information, and documentation links.",
    specs: [["Format","Reference material"],["Availability","In stock"],["Documentation","Listing ready"],["Shipping","Tracked"]],
    variants: ["Standard","Plus"],
    document: "Documentation placeholder"
  },
  {
    slug: "product-three",
    name: "Product Three",
    category: "Featured",
    price: 44.99,
    compareAt: 54.99,
    badge: "POPULAR",
    image: "public/images/products/product-3.svg",
    gallery: ["public/images/products/product-3.svg","public/images/products/detail.svg"],
    subtitle: "Popular pick · streamlined ordering",
    description: "A product template with a strong information hierarchy, compact purchase controls, and room for final product-specific details.",
    specs: [["Format","Reference material"],["Availability","In stock"],["Documentation","Listing ready"],["Shipping","Tracked"]],
    variants: ["Standard"],
    document: "Documentation placeholder"
  },
  {
    slug: "product-four",
    name: "Product Four",
    category: "Essentials",
    price: 39.99,
    compareAt: null,
    badge: "",
    image: "public/images/products/product-4.svg",
    gallery: ["public/images/products/product-4.svg","public/images/products/detail.svg"],
    subtitle: "Essential · straightforward presentation",
    description: "A simple listing example for products that need less explanation while keeping the same polished purchase flow.",
    specs: [["Format","Essential"],["Availability","In stock"],["Documentation","Listing ready"],["Shipping","Tracked"]],
    variants: ["Standard"],
    document: "Documentation placeholder"
  },
  {
    slug: "product-five",
    name: "Product Five",
    category: "Reference",
    price: 64.99,
    compareAt: 74.99,
    badge: "LIMITED",
    image: "public/images/products/product-5.svg",
    gallery: ["public/images/products/product-5.svg","public/images/products/detail.svg"],
    subtitle: "Reference series · limited release",
    description: "A higher-tier listing example with space for comparison pricing and expanded documentation.",
    specs: [["Format","Reference material"],["Availability","Limited"],["Documentation","Listing ready"],["Shipping","Tracked"]],
    variants: ["Standard","Extended"],
    document: "Documentation placeholder"
  },
  {
    slug: "product-six",
    name: "Product Six",
    category: "Accessories",
    price: 24.99,
    compareAt: null,
    badge: "",
    image: "public/images/products/product-6.svg",
    gallery: ["public/images/products/product-6.svg","public/images/products/detail.svg"],
    subtitle: "Accessory · complete the setup",
    description: "A compact accessory listing that can be paired with related products and collections.",
    specs: [["Category","Accessory"],["Availability","In stock"],["Documentation","Not required"],["Shipping","Tracked"]],
    variants: ["Single"],
    document: "Documentation placeholder"
  }
];