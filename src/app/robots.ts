import { env } from "@/lib/env";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio", "/admin", "/api/"],
    },
    sitemap: `${env.SITE_URL}/sitemap.xml`,
  };
}
