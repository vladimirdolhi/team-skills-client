const UPLOAD_PRESET = "skill-managment-system";
const API_URL = "https://api.cloudinary.com/v1_1/dpbgcpnbx/image/upload";

export const uploadToCloudinary = async (picture) => {
  if (picture) {
    const data = new FormData();
    data.append("file", picture);
    data.append("upload_preset", UPLOAD_PRESET);
    data.append("cloud_name", "dpbgcpnbx");

    const res = await fetch(API_URL, {
      method: "post",
      body: data,
    });

    const fileData = await res.json();
    console.log("url : ", fileData);
    return fileData.url;
  } else {
    console.log("error");
  }
};
