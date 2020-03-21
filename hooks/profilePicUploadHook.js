import { useState } from "react";
import { AsyncStorage } from "react-native";
import { fetchFormData, createTag } from "./APIHooks";

// a hook for updating the user profile pic 
const PicUploadForm = () => {
  const [imageinputs, setImageInputs] = useState({});
  const [imageErrors, setImageErrors] = useState({});
  const [loading, setLoading] = useState(false);

// upload the profile pic 
  const handleUpload = async file => {
    console.log(file);

    const filename = file.uri.split("/").pop();
    const match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    // fix jpg mimetype
    if (type === "image/jpg") {
      type = "image/jpeg";
    }

    const fd = new FormData();

    fd.append("file", { uri: file.uri, name: filename, type });

    console.log("FD:", fd);

    try {
      const token = await AsyncStorage.getItem("userToken");
      const user = JSON.parse(await AsyncStorage.getItem("user"));

      const response = await fetchFormData("media", fd, token);
      console.log("is the pic uploaded", response);
      if (response.message) {
        const file_id = response.file_id;
        const data = {
          file_id: file_id,
          tag: "avatar_" + user.user_id
        };
        const tag = await createTag("tags", data, token);
        console.log("tag response", tag);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return {
    handleUpload,
    imageinputs,
    imageErrors,
    loading,
    setImageErrors,
    setImageInputs
  };
};

export default PicUploadForm;
