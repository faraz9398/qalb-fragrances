import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Site Title",
      type: "string",
      initialValue: "The Qalb Fragrances",
    }),
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "string",
      initialValue: "The Essence of Distinction",
    }),
    defineField({
      name: "heroSubtext",
      title: "Hero Subtext",
      type: "text",
      rows: 2,
      initialValue:
        "Premium inspired perfumery crafted for those who seek the extraordinary. Discover scents that tell your story.",
    }),
    defineField({
      name: "brandStoryTitle",
      title: "Brand Story Title",
      type: "string",
      initialValue: "Fine Fragrances. Familiar Souls.",
    }),
    defineField({
      name: "brandStoryText",
      title: "Brand Story Text",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "newsletterTitle",
      title: "Newsletter Title",
      type: "string",
      initialValue: "Join the Inner Circle",
    }),
    defineField({
      name: "newsletterSubtext",
      title: "Newsletter Subtext",
      type: "string",
      initialValue:
        "Be the first to know about new drops, exclusive offers, and fragrance stories.",
    }),
    defineField({
      name: "footerText",
      title: "Footer Text",
      type: "text",
      rows: 2,
      initialValue:
        "Fine Fragrances. Familiar Souls. Premium inspired perfumery crafted for those who seek distinction.",
    }),
  ],
});
