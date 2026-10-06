import type { MetadataRoute } from "next";
import { store } from "@/data/store";
export default function robots(): MetadataRoute.Robots {
  const url = process.env.NEXT_PUBLIC_SITE_URL;
  return {
    rules: {
      userAgent: "*",
      ...(store.demoMode
        ? { disallow: "/" }
        : {
            allow: "/",
            disallow: ["/checkout", "/cart", "/api/", "/track-order"],
          }),
    },
    ...(url && !store.demoMode ? { sitemap: `${url}/sitemap.xml` } : {}),
  };
}
