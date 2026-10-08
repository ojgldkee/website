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
    "SAME-DAY SHIPPING ON ORDERS BEFORE 2 PM PST",
    "THIRD-PARTY LAB TESTED"
  ]
};

window.PRODUCTS = [
  {
    slug:"hgh-kit",
    name:"HGH Kit — 10 Vials",
    category:"Kits",
    price:115,
    badge:"KIT",
    image:"public/images/products/hgh/10iu.PNG",
    gallery:["public/images/products/hgh/10iu.PNG","public/images/products/hgh/24iu.PNG","public/images/products/hgh/36iu.PNG","public/images/products/hgh/100iu.PNG"],
    subtitle:"10-vial kit with selectable IU strength.",
    description:"HGH kit with ten vials. Choose the strength to view its corresponding product image.",
    specs:[["Format","10-vial kit"],["Available strengths","10 IU · 24 IU · 36 IU · 100 IU"],["Volume","3 mL"]],
    variants:[
      {label:"10 IU / 3 mL",amount:10,price:115},
      {label:"24 IU / 3 mL",amount:24,price:185},
      {label:"36 IU / 3 mL",amount:36,price:250},
      {label:"100 IU / 3 mL",amount:100,price:500}
    ],
    document:"Product documentation"
  },

  {
    slug:"retatrutide-kit",
    name:"RETATRUTIDE Kit — 10 Vials",
    category:"Kits",
    price:150,
    compareAt:null,
    badge:"KIT",
    image:"public/images/products/retatrutide/10mg.PNG",
    gallery:["public/images/products/retatrutide/10mg.PNG"],
    subtitle:"10-vial kit.",
    description:"RETATRUTIDE kit with ten 10 mg vials, presented as one complete kit.",
    specs:[["Format","10-vial kit"],["Strength","10 mg per vial"],["Fulfillment","Florida, USA"]],
    variants:[{label:"10 mg × 10 vials",amount:10,price:150}],
    document:"Batch documentation"
  },
  {
    slug:"tesamorelin-kit",
    name:"TESAMORELIN Kit — 10 Vials",
    category:"Kits",
    price:180,
    compareAt:null,
    badge:"KIT",
    image:"public/images/products/tesamorelin/10mg.PNG",
    gallery:["public/images/products/tesamorelin/10mg.PNG"],
    subtitle:"10-vial kit.",
    description:"TESAMORELIN kit with ten 10 mg vials in one complete kit.",
    specs:[["Format","10-vial kit"],["Strength","10 mg per vial"],["Fulfillment","Florida, USA"]],
    variants:[{label:"10 mg × 10 vials",amount:10,price:180}],
    document:"Batch documentation"
  },
  {
    slug:"igf-1-lr3-kit",
    name:"IGF-1 LR3 Kit — 10 Vials",
    category:"Kits",
    price:200,
    compareAt:null,
    badge:"KIT",
    image:"public/images/products/igf-1-lr3/1mg.PNG",
    gallery:["public/images/products/igf-1-lr3/1mg.PNG"],
    subtitle:"10-vial kit.",
    description:"IGF-1 LR3 kit with ten 1 mg vials in one complete kit.",
    specs:[["Format","10-vial kit"],["Strength","1 mg per vial"],["Fulfillment","Florida, USA"]],
    variants:[{label:"1 mg × 10 vials",amount:1,price:200}],
    document:"Batch documentation"
  },
  {
    slug:"ghk-cu-kit",
    name:"GHK-CU Kit — 10 Vials",
    category:"Kits",
    price:null,
    compareAt:null,
    badge:"KIT",
    image:"public/images/products/ghk-cu/50mg.PNG",
    gallery:["public/images/products/ghk-cu/50mg.PNG","public/images/products/ghk-cu/100mg.PNG"],
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
    slug:"wolverine-blend-kit",
    name:"Wolverine Blend Kit — 10 Vials",
    category:"Kits",
    price:115,
    compareAt:null,
    badge:"KIT",
    image:"public/images/products/wolverine-blend/10mg.PNG",
    gallery:["public/images/products/wolverine-blend/10mg.PNG"],
    subtitle:"10-vial kit.",
    description:"Wolverine Blend kit with ten 10 mg vials in one complete kit.",
    specs:[["Format","10-vial kit"],["Strength","10 mg per vial"],["Fulfillment","Florida, USA"]],
    variants:[{label:"10 mg × 10 vials",amount:10,price:115}],
    document:"Batch documentation"
  },
  {
    slug:"aqualyx-kit",
    name:"AQUALYX Kit — 10 Vials",
    category:"Kits",
    price:115,
    compareAt:140,
    badge:"SALE",
    image:"public/images/products/aqualyx/8ml.PNG",
    gallery:["public/images/products/aqualyx/8ml.PNG"],
    subtitle:"10-vial kit.",
    description:"AQUALYX kit listing with the complete 10-vial format shown as one product.",
    specs:[["Format","10-vial kit"],["Vial size","8 mL"],["Fulfillment","Florida, USA"]],
    variants:[{label:"8 mL × 10 vials",amount:8,price:115,compareAt:140}],
    document:"Product documentation"
  },
  {
    slug:"kpv-kit",
    name:"KPV Kit — 10 Vials",
    category:"Kits",
    price:180,
    compareAt:220,
    badge:"SALE",
    image:"public/images/products/kpv/10mg.PNG",
    gallery:["public/images/products/kpv/10mg.PNG"],
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
    image:"public/images/products/nad-plus/1000mg.PNG",
    gallery:["public/images/products/nad-plus/1000mg.PNG"],
    subtitle:"10-vial kit.",
    description:"NAD+ kit sold as a complete 10-vial listing.",
    specs:[["Format","10-vial kit"],["Strength","1000 mg per vial"],["Fulfillment","Florida, USA"]],
    variants:[{label:"1000 mg × 10 vials",amount:1000,price:180,compareAt:225}],
    document:"Batch documentation"
  }
];