import { blockContentType, blockContentType2, blockContentType3 } from "./blockContentType";
import { categoryType } from "./categoryType";
import { postType } from "./postType";
import { authorType } from "./authorType";
import { aboutType } from "./about";
import { projectsType } from "./projects";

export const schema = {
  types: [blockContentType, blockContentType3, blockContentType2, categoryType, postType, authorType, aboutType, projectsType],
};
