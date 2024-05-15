import { ProjectRoutes } from "./Project.route";
import { post, get, put } from "../index";

const ProjectServices = {
  createProject: async (obj) => {
    let result = await post(ProjectRoutes.createProject, obj);
    return result;
  },
  getProject: async (page , limit , name ,assignedUser) => {
    let result = get(ProjectRoutes.getProject +`?page=${page}&limit=${limit}&name=${name}&assignedUser=${assignedUser}`);
    return result;
  },
  assignProject: async (id ,obj) => {
    let result = put(ProjectRoutes.assignProject + `/${id}` ,obj);
    return result;
  },
};

export default ProjectServices;
