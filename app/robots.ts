import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/team/", "/admin/"], // Sembunyikan halaman internal
    },
    sitemap: "https://lombanasional.com/sitemap.xml",
  };
}
