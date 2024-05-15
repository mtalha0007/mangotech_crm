import { CompanyRoutes } from "./Company.route";
import { post, get } from "../index";

const CompanyServices = {
  createCompany: async (obj) => {
    let result = await post(CompanyRoutes.createCompany, obj);
    return result;
  },
  getCompany: async (page , limit , name) => {
    let result = get(CompanyRoutes.getCompany +`?page=${page}&limit=${limit}&name=${name}`);
    return result;
  },
  
};

export default CompanyServices;
