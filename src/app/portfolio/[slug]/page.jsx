import React from "react";
import Portfolio from "./Client";
import { getAllSlugs, getNextProjectSlug, getProjectBySlug } from "../../../sanity/lib/query";

const Page = async ({ params }) => {
  const { slug } = await params;
  try {
    const [projectsData, nextProject] = await Promise.all([getProjectBySlug(slug), getNextProjectSlug(slug)]);
    if (projectsData === null) {
      return (
        <div className="emptyPage">
          <p>Project not found</p>
          <p>🥺</p>
        </div>
      );
    }
    return <Portfolio {...{ ...projectsData, nextProject }} />;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return <div className="emptyPage">Error loading project</div>;
  }
};

export async function generateStaticParams() {
  const slugs = await getAllSlugs();

  return slugs.map((project) => ({
    slug: project.slug,
  }));
}

export default Page;
