import { client } from "./client";

export const getAboutData = async () => {
  return await client.fetch(
    `*[_type == "about"][0]{
      title,
      "mainImageUrl": mainImage.asset->url,
      "secondaryImageUrl": secondaryImage.asset->url,
      about,
      cv,
      education
    }`,
    {},
    { cache: "no-cache" }
  );
};

export const getContactInfo = async () => {
  return await client.fetch(
    `*[_type == "about"][0]{
      mail,
      linkedin,
      instagram,
      x
    }`,
    {},
    { cache: "no-cache" }
  );
};

export const getAllProjects = async () => {
  return await client.fetch(
    `*[_type == "projects"] | order(order asc){
      "slug": slug.current,
      "img": mainImage.asset->url,
      "name":title,
      size
    }`,
    {},
    { cache: "no-store" }
  );
};

export const getProjectBySlug = async (slug) => {
  return await client.fetch(
    `*[_type == "projects" && slug.current == $slug][0]{
      textTwo,
      textOne,
      textThree,
      title,
      link,
      dateRange,
      publishedAt,
      "mainImageUrl": mainImage.asset->url,
      "imagesOneUrls": coalesce(imagesOne[].asset->url, []),
      "imagesTwoUrls": coalesce(imagesTwo[].asset->url, []),
      "imagesThreeUrls": coalesce(imagesThree[].asset->url, [])
    }`,
    { slug },
    { cache: "no-store" }
  );
};

export const getFeaturedProjects = async () => {
  return await client.fetch(
    `*[_type == "projects" && featured == true]{
      title,
      'slug': slug.current,
      "image": mainImage.asset->url
    }`,
    {},
    { cache: "no-store" }
  );
};

export const getAllSlugs = async () => {
  return await client.fetch(
    `*[_type == "projects"]{
      "slug": slug.current
    }`,
    {},
    { cache: "no-store" }
  );
};

export const getNextProjectSlug = async (currentSlug) => {
  const projects = await client.fetch(
    `*[_type == "projects"] | order(order asc){
      "slug": slug.current,
      title
    }`,
    {},
    { cache: "no-store" }
  );
  const currentIndex = projects.findIndex((project) => project.slug === currentSlug, {}, { cache: "no-store" });
  const nextIndex = (currentIndex + 1) % projects.length;
  return projects[nextIndex];
};
