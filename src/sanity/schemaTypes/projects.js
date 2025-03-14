import { ProjectsIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const projectsType = defineType({
  name: "projects",
  title: "Projects",
  type: "document",
  icon: ProjectsIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "size",
      type: "string",
      title: "Size",
      description: "Size for the layout in the portfolio's page",
      options: {
        list: [
          { title: "Small", value: "sm" },
          { title: "Large", value: "lg" },
        ],
        layout: "radio",
      },
      initialValue: "sm",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      type: "boolean",
      title: "Featured project",
    }),
    defineField({
      name: "order",
      description: "The ordering/desired position of this project on the portfolio page",
      type: "number",
      title: "Order",
      validation: (Rule) => Rule.required().min(0).integer().warning("Order should be a non-negative number"),
    }),
    defineField({
      name: "dateRange",
      type: "string",
      placeholder: "2022 - 2090",
      title: "Date Range",
      validation: (Rule) => Rule.max(11).warning("Text should be 15 characters or less"),
    }),
    defineField({
      name: "mainImage",
      type: "image",
      validation: (Rule) => Rule.required(),
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
      type: "blockContent3",
      title: "Text One",
      validation: (Rule) => Rule.required(),
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
      type: "blockContent3",
      title: "Text Two",
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
      type: "blockContent3",
      title: "Text Three",
    }),
    defineField({
      name: "imagesThree",
      type: "array",
      title: "Images Three",
      of: [{ type: "image" }],
      validation: (Rule) => Rule.min(1).max(2).warning("You should have between 1 and 2 images"),
    }),
    defineField({
      name: "link",
      type: "url",
      title: "URL",
    }),
  ],
});
