window.STORE = {
  name: "Forma Research",
  shortName: "FORMA",
  subName: "RESEARCH",
  currency: "USD",
  shippingThreshold: 250,
  cartReservationMinutes: 10,
  sameDayShipping: { enabled: true, cutoff: "2 PM" },
  shippingOrigin: "Florida",
  moneyBackDays: 30,
  promo: {
    enabled: false,
    label: "",
    endsAt: "",
    cta: "",
    href: "collections.html"
  },
  announcements: [
    "FREE SHIPPING ON ORDERS $250+",
    "PRODUCT DOCUMENTATION ON EVERY LISTING",
    "TRACKED DELIVERY",
    "SUPPORT WHEN YOU NEED IT"
  ]
};

window.PRODUCTS = [
  {
    slug: "product-one",
    name: "Product One",
    category: "Peptides",
    price: 49.99,
    compareAt: 59.99,
    badge: "BEST SELLER",
    image: "public/images/products/product-1.svg",
    gallery: ["public/images/products/product-1.svg","public/images/products/detail.svg"],
    subtitle: "Research reference · premium presentation",
    description: "A clean product template with room for final specifications, documentation, batch information, and fulfillment details.",
    specs: [["Format","Reference material"],["Availability","In stock"],["Documentation","Listing ready"],["Storage","See final documentation"]],
    variants: [{label:"5 mg",amount:5,price:49.99,compareAt:59.99},{label:"10 mg",amount:10,price:79.99,compareAt:89.99},{label:"20 mg",amount:20,price:119.99,compareAt:139.99}],
    document: "Documentation placeholder"
  },
  {
    slug: "product-two",
    name: "Product Two",
    category: "Peptides",
    price: 59.99,
    compareAt: null,
    badge: "NEW",
    image: "public/images/products/product-2.svg",
    gallery: ["public/images/products/product-2.svg","public/images/products/detail.svg"],
    subtitle: "New arrival · clear specifications",
    description: "A flexible product page example designed for variants, product notes, shipping information, and documentation links.",
    specs: [["Format","Reference material"],["Availability","In stock"],["Documentation","Listing ready"],["Shipping","Tracked"]],
    variants: [{label:"10 mg",amount:10,price:59.99},{label:"20 mg",amount:20,price:89.99},{label:"30 mg",amount:30,price:129.99}],
    document: "Documentation placeholder"
  },
  {
    slug: "product-three",
    name: "Product Three",
    category: "HGH",
    price: 44.99,
    compareAt: 54.99,
    badge: "POPULAR",
    image: "public/images/products/product-3.svg",
    gallery: ["public/images/products/product-3.svg","public/images/products/detail.svg"],
    subtitle: "Popular pick · streamlined ordering",
    description: "A product template with a strong information hierarchy, compact purchase controls, and room for final product-specific details.",
    specs: [["Format","Reference material"],["Availability","In stock"],["Documentation","Listing ready"],["Shipping","Tracked"]],
    variants: [{label:"5 mg",amount:5,price:44.99},{label:"10 mg",amount:10,price:69.99},{label:"20 mg",amount:20,price:104.99}],
    document: "Documentation placeholder"
  },
  {
    slug: "product-four",
    name: "Product Four",
    category: "Kits",
    price: 39.99,
    compareAt: null,
    badge: "",
    image: "public/images/products/product-4.svg",
    gallery: ["public/images/products/product-4.svg","public/images/products/detail.svg"],
    subtitle: "Essential · straightforward presentation",
    description: "A simple listing example for products that need less explanation while keeping the same polished purchase flow.",
    specs: [["Format","Essential"],["Availability","In stock"],["Documentation","Listing ready"],["Shipping","Tracked"]],
    variants: [{label:"10 mg",amount:10,price:39.99},{label:"20 mg",amount:20,price:64.99}],
    document: "Documentation placeholder"
  },
  {
    slug: "product-five",
    name: "Product Five",
    category: "HGH",
    price: 64.99,
    compareAt: 74.99,
    badge: "LIMITED",
    image: "public/images/products/product-5.svg",
    gallery: ["public/images/products/product-5.svg","public/images/products/detail.svg"],
    subtitle: "Reference series · limited release",
    description: "A higher-tier listing example with space for comparison pricing and expanded documentation.",
    specs: [["Format","Reference material"],["Availability","Limited"],["Documentation","Listing ready"],["Shipping","Tracked"]],
    variants: [{label:"5 mg",amount:5,price:64.99,compareAt:74.99},{label:"10 mg",amount:10,price:94.99,compareAt:109.99},{label:"20 mg",amount:20,price:139.99,compareAt:159.99}],
    document: "Documentation placeholder"
  },
  {
    slug: "product-six",
    name: "Product Six",
    category: "Kits",
    price: 24.99,
    compareAt: null,
    badge: "",
    image: "public/images/products/product-6.svg",
    gallery: ["public/images/products/product-6.svg","public/images/products/detail.svg"],
    subtitle: "Accessory · complete the setup",
    description: "A compact accessory listing that can be paired with related products and collections.",
    specs: [["Category","Accessory"],["Availability","In stock"],["Documentation","Not required"],["Shipping","Tracked"]],
    variants: [{label:"Single",amount:1,price:24.99}],
    document: "Documentation placeholder"
  }
];