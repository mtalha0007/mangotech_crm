import { ImageUploadRoutes } from "./ImageService.route";
import { post, get } from "../index";

const ImageService = {
    imageUpload: async (obj) => {
    let result = await post(ImageUploadRoutes.imageUpload , obj);
    return result;
  },
};

export default ImageService;
