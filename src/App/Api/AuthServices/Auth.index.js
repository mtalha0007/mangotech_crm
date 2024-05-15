import { AuthRoutes } from "./Auth.route";
import { post, get } from "../index";

const AuthService = {
  login: async (obj) => {
    let result = await post(AuthRoutes.login, obj);
    return result;
  },
};

export default AuthService;
