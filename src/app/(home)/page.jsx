import { getFeaturedProjects } from "../../sanity/lib/query";
import Client from "./Client";
const Page = async () => {
  const featured = await getFeaturedProjects();
  return <Client featured={featured} />;
};

export default Page;
