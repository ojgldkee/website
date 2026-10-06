// Draft editorial placeholders, not legal advice. Replace after business-specific legal review.
export const policies: Record<
  string,
  { title: string; intro: string; sections: { title: string; body: string }[] }
> = {
  privacy: {
    title: "Privacy policy",
    intro: "How information may be handled when the store launches.",
    sections: [
      {
        title: "Current preview",
        body: "This preview stores cart selections in your browser. Contact, newsletter, checkout and order lookup services are not connected. Personal details entered in preview forms are not submitted by this application; hosting services may process routine request metadata.",
      },
      {
        title: "Information and purposes",
        body: "Before launch, identify the business responsible for personal information, contact details, information collected, purposes of use, retention periods and the services that process it.",
      },
      {
        title: "Choices and requests",
        body: "Publish an appropriate process for privacy requests and cookie choices based on the actual services used and applicable requirements. Clear your browser site data to remove the locally stored preview cart.",
      },
      {
        title: "Service providers",
        body: "List the actual payment, hosting, order, analytics and email providers before collecting customer information. Cross-border processing and any applicable rights require review.",
      },
    ],
  },
  terms: {
    title: "Terms of service",
    intro: "The framework for using the store and placing an order.",
    sections: [
      {
        title: "Preview status",
        body: "This site is a demonstration. Products, prices, shipping estimates and policies are placeholders. No purchase agreement is formed through this preview, and no payment is accepted.",
      },
      {
        title: "Business and order terms",
        body: "Before launch, insert the legal business name, contact details, eligibility requirements, order acceptance process, payment terms, inventory rules and pricing correction process.",
      },
      {
        title: "Product information",
        body: "Final listings must accurately state identity, intended use, limitations and available supporting documentation. Do not interpret illustrative packaging as a verified product specification.",
      },
      {
        title: "Applicable terms",
        body: "Any governing law, dispute process, liability terms or jurisdiction-specific provisions must be supplied and reviewed for the actual business. None are asserted by this draft.",
      },
    ],
  },
  shipping: {
    title: "Shipping policy",
    intro: "Delivery details, clearly explained.",
    sections: [
      {
        title: "Illustrative shipping options",
        body: "The preview shows example standard and priority rates and a configurable free standard shipping threshold. These are interface examples, not a delivery commitment.",
      },
      {
        title: "Before launch",
        body: "Confirm fulfillment locations, eligible destinations, carriers, handling times, shipping rates, free-shipping exclusions, order cutoffs, customs responsibilities and any product restrictions.",
      },
      {
        title: "Tracking and delivery",
        body: "Once connected, shipped orders should include a carrier tracking number and link when provided by fulfillment. An order status is not a guarantee of carrier delivery.",
      },
      {
        title: "Delivery issues",
        body: "Publish a monitored support channel and procedures for delayed, lost, returned or damaged shipments before accepting orders.",
      },
    ],
  },
  returns: {
    title: "Returns & refunds",
    intro: "A clear process, from the start.",
    sections: [
      {
        title: "Draft policy",
        body: "Return eligibility and refund terms have not been finalized. This preview accepts no orders and makes no refund or satisfaction guarantee.",
      },
      {
        title: "Eligibility and timelines",
        body: "Before launch, specify eligible products, condition requirements, exclusions, applicable timeframes and how customers request authorization. Review any restrictions against applicable requirements.",
      },
      {
        title: "Return shipping and refunds",
        body: "Identify who covers return shipping, the return destination process, inspection criteria and refund timing. For crypto payments, define a provider-supported refund method and valuation policy without collecting private keys.",
      },
      {
        title: "Incorrect or damaged items",
        body: "Establish a support process and reasonable documentation requirements for reporting an incorrect or damaged shipment.",
      },
    ],
  },
  disclaimer: {
    title: "Disclaimer",
    intro: "Context for this preview and its sample content.",
    sections: [
      {
        title: "Illustrative content",
        body: "Product names, packaging artwork, prices and specifications are sample content for evaluating this storefront. They are not offers to sell a verified product.",
      },
      {
        title: "No health or regulatory claims",
        body: "This preview provides no medical advice and makes no claims of treatment, health benefits, regulatory approval, certification, laboratory testing or verified purity.",
      },
      {
        title: "Final product review",
        body: "Determine accurate intended-use language, customer eligibility and relevant product-specific disclosures before publishing the final catalog. A disclaimer does not replace compliance with applicable requirements.",
      },
      {
        title: "Launch review",
        body: "Confirm the legal business identity, final product catalog, actual services and all linked policies before enabling sales.",
      },
    ],
  },
};
