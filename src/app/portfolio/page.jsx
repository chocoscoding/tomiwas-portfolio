import React from "react";
import Portfolio from "./Client";
import { getAllProjects } from "../../sanity/lib/query";
const Page = async () => {
  try {
    const projectsData = await getAllProjects();
    return <Portfolio projects={projectsData} />;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return <div className="emptyPage">Error loading projects</div>;
  }
};

export default Page;
