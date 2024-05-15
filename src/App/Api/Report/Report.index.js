import { ReportRoutes } from "./Report.route";
import { post, get, put } from "../index";

const ReportServices = {
  getStats: async () => {
    let result = get(ReportRoutes.getStats);
    return result;
  },
};

export default ReportServices;
