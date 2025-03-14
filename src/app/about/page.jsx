import { getAboutData } from "../../sanity/lib/query";
import React from "react";
import AboutPage from "./client";

const Page = async () => {
  try {
    const aboutData = await getAboutData();
    return <AboutPage {...aboutData} />;
  } catch (error) {
    console.error("Error fetching about data:", error);
    return <div className="emptyPage">Error loading about page</div>;
  }
};

export default Page;
