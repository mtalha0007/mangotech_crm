import { FileUploadRoutes } from "./FileUpload.route";
import { post, get } from "../index";

const FileServices = {
    FileUpload: async (obj) => {
    let result = await post(FileUploadRoutes.FileUpload , obj);
    return result;
  },
};

export default FileServices;
