export const env = {
  SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
};
