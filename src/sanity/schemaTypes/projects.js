import { ProjectsIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const postType = defineType({
  name: "projects",
  title: "Projects",
  type: "document",
  icon: ProjectsIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
    }),
    defineField({
      name: "mainImage",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
        }),
      ],
    }),
    defineField({
      name: "textOne",
      type: "text",
      title: "Text One",
      validation: (Rule) => Rule.max(300).warning("Text should be 300 characters or less"),
    }),
    defineField({
      name: "imagesOne",
      type: "array",
      title: "Images One",
      of: [{ type: "image" }],
      validation: (Rule) => Rule.min(1).max(2).warning("You should have between 1 and 2 images"),
    }),
    defineField({
      name: "textTwo",
      type: "text",
      title: "Text Two",
      validation: (Rule) => Rule.max(300).warning("Text should be 300 characters or less"),
    }),
    defineField({
      name: "imagesTwo",
      type: "array",
      title: "Images Two",
      of: [{ type: "image" }],
      validation: (Rule) => Rule.min(1).max(2).warning("You should have between 1 and 2 images"),
    }),
    defineField({
      name: "textThree",
      type: "text",
      title: "Text Three",
      validation: (Rule) => Rule.max(300).warning("Text should be 300 characters or less"),
    }),
    defineField({
      name: "imagesThree",
      type: "array",
      title: "Images Three",
      of: [{ type: "image" }],
      validation: (Rule) => Rule.min(1).max(2).warning("You should have between 1 and 2 images"),
    }),
    defineField({
      name: "featured",
      type: "boolean",
      title: "Featured project",
    }),
    defineField({
      name: "dateRange",
      type: "text",
      title: "Date Range",
      validation: (Rule) => Rule.max(15).warning("Text should be 15 characters or less"),
    }),
  ],
});
