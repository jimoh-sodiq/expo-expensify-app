import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "@/constants";
import { ResponseType } from "@/types";
import axios from "axios";

const CLOUDINARY_API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

export async function uploadFileToCloudinary(
  file: { uri?: string } | string,
  folderName: string
): Promise<ResponseType> {
  try {
    if (typeof file == "string") {
      return { success: true, data: file };
    }
    if (file && file.uri) {
      const formData = new FormData();

      formData.append("file", {
        uri: file?.uri,
        type: "image/jpeg",
        name: file.uri.split("/").pop() || "file.jpg",
      } as any);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      formData.append("folder", folderName);

      const response = await axios.post(CLOUDINARY_API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("upload image result", response.data);

      return { success: true, data: response.data?.secure_url };
    }
    return { success: true };
  } catch (error: any) {
    console.log("Error uploading file", error);
    return { success: false, msg: error.message || "could not upload file" };
  }
}

export function getProfileImage(file: any) {
  if (file && typeof file == "string") return file;
  if (file && typeof file == "object") return file.url;

  return require("../assets/images/defaultAvatar.png");
}
