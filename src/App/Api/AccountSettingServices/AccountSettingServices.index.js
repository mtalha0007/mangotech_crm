import { AccountSettingServicesUpdate } from "./AccountSettingServices.route";
import { put } from "../index";

const AccountSettingServices = {
    updatePassword: async (obj) => {
    let result = await put(AccountSettingServicesUpdate.updatePassword, obj);
    return result;
  },
};

export default AccountSettingServices;  
