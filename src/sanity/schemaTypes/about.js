import { FaceHappyIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const aboutType = defineType({
  name: "about",
  title: "About Me",
  type: "document",
  icon: FaceHappyIcon,
  fields: [
    defineField({
      name: "title",
      title: "title",
      type: "string",
    }),
    defineField({
      name: "mainImage",
      type: "image",
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
        }),
      ],
    }),
    defineField({
      name: "secondaryImage",
      type: "image",
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
        }),
      ],
    }),
    defineField({
      name: "about",
      type: "blockContent2",
      title: "About me",
    }),
    defineField({
      name: "cv",
      type: "array",
      title: "CV",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "name",
              type: "string",
              title: "Position",
            }),
            defineField({
              name: "year",
              type: "string",
              title: "Year",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "education",
      type: "array",
      title: "Education",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "name",
              type: "string",
              title: "Position",
            }),
            defineField({
              name: "year",
              type: "string",
              title: "Year",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "mail",
      title: "E-Mail Address",
      type: "email",
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn",
      type: "url",
    }),
    defineField({
      name: "instagram",
      title: "Instagram",
      type: "url",
    }),
    defineField({
      name: "x",
      title: "X",
      type: "url",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});
