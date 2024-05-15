import { UserRoutes } from "./User.route";
import { post, get, put } from "../index";

const UserServices = {
  createUser: async (obj) => {
    let result = await post(UserRoutes.createUser, obj);
    return result;
  },
  getUser: async (page , limit,search) => {
    let result = get(UserRoutes.getUser +`?page=${page}&limit=${limit}&search=${search}`);
    return result;
  },
  updateUser: async (id ,obj) => {
    let result = put(UserRoutes.updateUser + `/${id}`,obj);
    console.log(id)
    return result;
  },
};

export default UserServices;
