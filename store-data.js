window.STORE = {
  name: "Aspen Labs",
  shortName: "ASPEN LABS",
  subName: "",
  currency: "USD",
  shippingThreshold: 250,
  cartReservationMinutes: 10,
  sameDayShipping: { enabled: true, cutoff: "2 PM" },
  shippingOrigin: "Florida",
  moneyBackDays: 30,
  promo: { enabled: false, label: "", endsAt: "", cta: "", href: "collections.html" },
  announcements: [
    "FREE SHIPPING ON ORDERS $250+",
    "KITS-ONLY CATALOG",
    "TRACKED DELIVERY",
    "SUPPORT WHEN YOU NEED IT"
  ]
};

window.PRODUCTS = [
  {
    slug:"retatrutide-kit",
    name:"RETATRUTIDE Kit — 10 Vials",
    category:"Kits",
    price:null,
    compareAt:null,
    badge:"KIT",
    image:"public/images/products/product-1.svg",
    gallery:["public/images/products/product-1.svg","public/images/products/detail.svg"],
    subtitle:"10-vial research kit with multiple strength options.",
    description:"RETATRUTIDE kit listing organized by vial strength so the selected option is clear before checkout.",
    specs:[["Format","10-vial kit"],["Available strengths","10 mg · 20 mg · 30 mg · 60 mg"],["Fulfillment","Florida, USA"]],
    variants:[
      {label:"10 mg × 10 vials",amount:10,price:null},
      {label:"20 mg × 10 vials",amount:20,price:null},
      {label:"30 mg × 10 vials",amount:30,price:null},
      {label:"60 mg × 10 vials",amount:60,price:null}
    ],
    document:"Batch documentation",
    pricingPending:true
  },
  {
    slug:"tesamorelin-kit",
    name:"TESAMORELIN Kit — 10 Vials",
    category:"Kits",
    price:325,
    compareAt:400,
    badge:"SALE",
    image:"public/images/products/product-2.svg",
    gallery:["public/images/products/product-2.svg","public/images/products/detail.svg"],
    subtitle:"10-vial kit with selectable strength.",
    description:"TESAMORELIN kit with strength selected on the product page before adding to cart.",
    specs:[["Format","10-vial kit"],["Available strengths","10 mg · 20 mg"],["Fulfillment","Florida, USA"]],
    variants:[
      {label:"10 mg × 10 vials",amount:10,price:325,compareAt:400},
      {label:"20 mg × 10 vials",amount:20,price:null}
    ],
    document:"Batch documentation"
  },
  {
    slug:"igf-1-lr3-kit",
    name:"IGF-1 LR3 Kit — 10 Vials",
    category:"Kits",
    price:null,
    compareAt:null,
    badge:"KIT",
    image:"public/images/products/product-3.svg",
    gallery:["public/images/products/product-3.svg","public/images/products/detail.svg"],
    subtitle:"10-vial kit.",
    description:"IGF-1 LR3 kit presented as a single kit product rather than a single-vial listing.",
    specs:[["Format","10-vial kit"],["Strength","1 mg per vial"],["Fulfillment","Florida, USA"]],
    variants:[{label:"1 mg × 10 vials",amount:1,price:null}],
    document:"Batch documentation",
    pricingPending:true
  },
  {
    slug:"ghk-cu-kit",
    name:"GHK-CU Kit — 10 Vials",
    category:"Kits",
    price:null,
    compareAt:null,
    badge:"KIT",
    image:"public/images/products/product-4.svg",
    gallery:["public/images/products/product-4.svg","public/images/products/detail.svg"],
    subtitle:"10-vial kit with 50 mg and 100 mg options.",
    description:"GHK-CU kit with selectable vial strength so one product page handles both kit variants.",
    specs:[["Format","10-vial kit"],["Available strengths","50 mg · 100 mg"],["Fulfillment","Florida, USA"]],
    variants:[
      {label:"50 mg × 10 vials",amount:50,price:null},
      {label:"100 mg × 10 vials",amount:100,price:null}
    ],
    document:"Batch documentation",
    pricingPending:true
  },
  {
    slug:"aqualyx-kit",
    name:"AQUALYX Kit — 10 Vials",
    category:"Kits",
    price:115,
    compareAt:140,
    badge:"SALE",
    image:"public/images/products/product-5.svg",
    gallery:["public/images/products/product-5.svg","public/images/products/detail.svg"],
    subtitle:"10-vial kit.",
    description:"AQUALYX kit listing with the complete 10-vial format shown as one product.",
    specs:[["Format","10-vial kit"],["Vial size","8 mL"],["Fulfillment","Florida, USA"]],
    variants:[{label:"8 mL × 10 vials",amount:8,price:115,compareAt:140}],
    document:"Product documentation"
  },
  {
    slug:"bpc-157-kit",
    name:"BPC-157 Kit — 10 Vials",
    category:"Kits",
    price:265,
    compareAt:280,
    badge:"SALE",
    image:"public/images/products/product-6.svg",
    gallery:["public/images/products/product-6.svg","public/images/products/detail.svg"],
    subtitle:"10-vial kit.",
    description:"BPC-157 kit sold as a complete 10-vial listing.",
    specs:[["Format","10-vial kit"],["Strength","10 mg per vial"],["Fulfillment","Florida, USA"]],
    variants:[{label:"10 mg × 10 vials",amount:10,price:265,compareAt:280}],
    document:"Batch documentation"
  },
  {
    slug:"kpv-kit",
    name:"KPV Kit — 10 Vials",
    category:"Kits",
    price:180,
    compareAt:220,
    badge:"SALE",
    image:"public/images/products/product-2.svg",
    gallery:["public/images/products/product-2.svg","public/images/products/detail.svg"],
    subtitle:"10-vial kit.",
    description:"KPV kit sold as a complete 10-vial listing.",
    specs:[["Format","10-vial kit"],["Strength","10 mg per vial"],["Fulfillment","Florida, USA"]],
    variants:[{label:"10 mg × 10 vials",amount:10,price:180,compareAt:220}],
    document:"Batch documentation"
  },
  {
    slug:"nad-plus-kit",
    name:"NAD+ Kit — 10 Vials",
    category:"Kits",
    price:180,
    compareAt:225,
    badge:"SALE",
    image:"public/images/products/product-5.svg",
    gallery:["public/images/products/product-5.svg","public/images/products/detail.svg"],
    subtitle:"10-vial kit.",
    description:"NAD+ kit sold as a complete 10-vial listing.",
    specs:[["Format","10-vial kit"],["Strength","1000 mg per vial"],["Fulfillment","Florida, USA"]],
    variants:[{label:"1000 mg × 10 vials",amount:1000,price:180,compareAt:225}],
    document:"Batch documentation"
  }
];