import type { Product } from "@/types";
// SAMPLE CATALOG ONLY: replace names, prices, specifications, stock and documentation before launch.
// Multiple images supported: add { src: '/images/products/your-image.jpg', alt: 'Descriptive view' }.
export const categories = [
  {
    name: "Research essentials",
    description: "A focused starting point.",
    image: "/images/collections/essentials.svg",
  },
  {
    name: "Reference collection",
    description: "Details worth a closer look.",
    image: "/images/collections/reference.svg",
  },
  {
    name: "Lab accessories",
    description: "The supporting essentials.",
    image: "/images/collections/accessories.svg",
  },
];
export const products: Product[] = [
  {
    id: "sample-01",
    slug: "reference-01",
    name: "Reference No. 01",
    category: "Research essentials",
    subtitle: "The foundational collection",
    price: 4900,
    badge: "Featured",
  },
  {
    id: "sample-02",
    slug: "reference-02",
    name: "Reference No. 02",
    category: "Reference collection",
    subtitle: "A considered addition",
    price: 6900,
    badge: "New",
  },
  {
    id: "sample-03",
    slug: "reference-03",
    name: "Reference No. 03",
    category: "Research essentials",
    subtitle: "Essential by design",
    price: 5900,
    compareAt: 7500,
    badge: "Sale",
  },
  {
    id: "sample-04",
    slug: "specimen-set",
    name: "Specimen Set",
    category: "Lab accessories",
    subtitle: "Made for the details",
    price: 2900,
    badge: "New",
  },
  {
    id: "sample-05",
    slug: "reference-05",
    name: "Reference No. 05",
    category: "Reference collection",
    subtitle: "Explore a new perspective",
    price: 8900,
    badge: "Featured",
  },
  {
    id: "sample-06",
    slug: "storage-set",
    name: "Storage Set",
    category: "Lab accessories",
    subtitle: "A place for every essential",
    price: 3900,
    badge: "Featured",
  },
].map((p, i) => ({
  ...p,
  description:
    "A sample listing from our forthcoming collection. This page demonstrates the product experience; final product identity, specifications, availability and supporting documentation will be added before launch.",
  images: [
    {
      src: `/images/products/product-${i + 1}.svg`,
      alt: `${p.name} illustrative packaging placeholder`,
    },
    {
      src: "/images/products/detail.svg",
      alt: "Illustrative packaging detail placeholder",
    },
  ],
  variants: [
    { id: "single", label: "Single", price: p.price },
    { id: "pair", label: "Set of two", price: p.price * 2 },
  ],
  specifications: [
    { label: "Catalog reference", value: p.id.toUpperCase() },
    { label: "Collection", value: p.category },
    { label: "Product status", value: "Sample listing — not for sale" },
    { label: "Documentation", value: "Pending final catalog" },
  ],
  resources: [{ label: "Documentation center", href: "/documentation" }],
})) as Product[];
const hgh: Product = {
  id: "hgh-kit",
  slug: "hgh-kit",
  name: "HGH Kit — 10 Vials",
  category: "Research essentials",
  subtitle: "Choose your IU strength · 10 vials per kit",
  price: 11500,
  description: "HGH kit listing with four selectable strengths. Product imagery and documentation are provided separately.",
  images: [
    { src: "/images/products/hgh/10iu.PNG", alt: "HGH kit 10 IU / 3 mL" },
    { src: "/images/products/hgh/24iu.PNG", alt: "HGH kit 24 IU / 3 mL" },
    { src: "/images/products/hgh/36iu.PNG", alt: "HGH kit 36 IU / 3 mL" },
    { src: "/images/products/hgh/100iu.PNG", alt: "HGH kit 100 IU / 3 mL" },
  ],
  variants: [
    { id: "10iu", label: "10 IU / 3 mL", price: 11500 },
    { id: "24iu", label: "24 IU / 3 mL", price: 18500 },
    { id: "36iu", label: "36 IU / 3 mL", price: 25000 },
    { id: "100iu", label: "100 IU / 3 mL", price: 50000 },
  ],
  specifications: [
    { label: "Kit size", value: "10 vials" },
    { label: "Strength", value: "10, 24, 36, or 100 IU / 3 mL per vial" },
    { label: "Documentation", value: "Pending verification" },
  ],
  resources: [{ label: "Documentation center", href: "/documentation" }],
};
products.unshift(hgh);
export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);
