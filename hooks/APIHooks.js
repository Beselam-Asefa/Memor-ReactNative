import { apiUrl } from "../constants/urlConst";

import { AsyncStorage } from "react-native";
// a componenet for all the API calls

//get user uploads
const fetchGET = async (endpoint = "", params = "", token = "") => {
  const fetchOptions = {
    headers: {
      "x-access-token": token
    }
  };
  const response = await fetch(apiUrl + endpoint + "/" + params, fetchOptions);
  if (!response.ok) {
    throw new Error("fetchGET error: " + response.status);
  }
  const responsee = await response.json();

  const userFeed = await getUserFeeds(responsee);

  return userFeed;
};

// get all the user tags
const fetchGETAll = async (endpoint = "", params = "", token = "") => {
  const fetchOptions = {
    headers: {
      "x-access-token": token
    }
  };
  const response = await fetch(apiUrl + endpoint + "/" + params, fetchOptions);
  if (!response.ok) {
    throw new Error("fetchGET error: " + response.status);
  }
  return await response.json();
};

//make a post request to upload
const fetchPOST = async (endpoint = "", data = {}, token = "") => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token
    },
    body: JSON.stringify(data)
  };
  const response = await fetch(apiUrl + endpoint, fetchOptions);
  const json = await response.json();

  if (response.status === 400 || response.status === 401) {
    const message = Object.values(json).join();
    throw new Error(message);
  } else if (response.status > 299) {
    throw new Error("fetchPOST error: " + response.status);
  }
  return json;
};

// update user medicaton and suppliment
const fetchPUT = async (endpoint = "", data = {}, token = "") => {
  const fetchOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token
    },
    body: JSON.stringify(data)
  };
  const response = await fetch(apiUrl + endpoint, fetchOptions);
  const json = await response.json();

  if (response.status === 400 || response.status === 401) {
    const message = Object.values(json).join();
    throw new Error(message);
  } else if (response.status > 299) {
    throw new Error("fetchPOST error: " + response.status);
  }
  return json;
};
// upload
const fetchFormData = async (
  endpoint = "",
  data = new FormData(),
  token = ""
) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "x-access-token": token
    },
    body: data
  };
  //console.log('the request in api hooks',fetchOptions);

  const response = await fetch(
    "http://media.mw.metropolia.fi/wbma/media",
    fetchOptions
  );
  const json = await response.json();
  console.log("the json response", json);
  if (response.status === 400 || response.status === 401) {
    const message = Object.values(json).join();
    throw new Error(message);
  } else if (response.status > 299) {
    throw new Error("fetchPOST error: " + response.status);
  }

  return json;
};

const getUserFeeds = async userData => {
  const userFeed = [];
  const userSuppFeed = [];
  const feed = { userFeed, userSuppFeed };
  if (userData) {
    userData.forEach(item => {
      if (item.title == "medication") {
        const fileId = item.file_id;
        const description = JSON.parse(item.description);
        description.fileId = fileId;
        userFeed.push(description);
      } else if (item.title == "suppliment") {
        const fileId = item.file_id;
        const description = JSON.parse(item.description);
        description.fileId = fileId;
        userSuppFeed.push(description);
      }
    });
  }

  return feed;
};

const getAllMedia = async () => {
  const json = await fetchGET("media/all");
  const result = await Promise.all(
    json.files.map(async item => {
      return await fetchGET("media", item.file_id);
    })
  );
  return result;
};

const getUserMed = async () => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    const userFeeds = await fetchGET("media", "user", token);

    const userMed = userFeeds.userFeed;

    return userMed;
  } catch (e) {
    console.log("error from getUser", e.message);
  }
};
getUserMed();
const getUserSuppliment = async () => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    const userFeed = await fetchGET("media", "user", token);
    const userSuppliment = userFeed.userSuppFeed;
    return userSuppliment;
  } catch (e) {
    console.log("error from getUser", e.message);
  }
};

const removeMedicine = async (endpoint = "", id, token = "") => {
  const fetchOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token
    },
    body: ""
  };
  const response = await fetch(apiUrl + endpoint + "/" + id, fetchOptions);
  const json = await response.json();
  console.log(json);
  if (response.status === 400 || response.status === 401) {
    const message = Object.values(json).join();
    throw new Error(message);
  } else if (response.status > 299) {
    throw new Error("fetchPOST error: " + response.status);
  }
  return json;
};

const deleteMedicine = async id => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    const response = await removeMedicine("media", id, token);
    return await response;
  } catch (e) {
    console.log("error from getUser", e.message);
  }
};

const updateUserMedDescription = async (
  endpoint = "",
  id,
  data,
  token = ""
) => {
  const fetchOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token
    },
    body: JSON.stringify(data)
  };
  const response = await fetch(apiUrl + endpoint + "/" + id, fetchOptions);
  const json = await response.json();
  console.log(json);
  if (response.status === 400 || response.status === 401) {
    const message = Object.values(json).join();
    throw new Error(message);
  } else if (response.status > 299) {
    throw new Error("fetchPOST error: " + response.status);
  }
  return json;
};

const updateMedicineInfo = async (id, data) => {
  const dis = JSON.stringify(data);
  const discription = { description: dis };

  try {
    const token = await AsyncStorage.getItem("userToken");
    const response = await updateUserMedDescription(
      "media",
      id,
      discription,
      token
    );
    return await response;
  } catch (e) {
    console.log("error from getUser", e.message);
  }
};

const getUserData = async (endpoint = "", params = "", token = "") => {
  const fetchOptions = {
    headers: {
      "x-access-token": token
    }
  };
  const response = await fetch(apiUrl + endpoint + "/" + params, fetchOptions);
  if (!response.ok) {
    throw new Error("fetchGET error: " + response.status);
  }
  return await response.json();
};
// get the user upladed file and create a tag
const createTag = async (endpoint = "", data, token = "") => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token
    },
    body: JSON.stringify(data)
  };
  const response = await fetch(apiUrl + endpoint, fetchOptions);
  const json = await response.json();
  console.log(json);
  if (response.status === 400 || response.status === 401) {
    const message = Object.values(json).join();
    throw new Error(message);
  } else if (response.status > 299) {
    throw new Error("fetchPOST error: " + response.status);
  }
  return json;
};

export {
  getAllMedia,
  createTag,
  getUserSuppliment,
  fetchGET,
  fetchGETAll,
  fetchPUT,
  getUserData,
  fetchPOST,
  fetchFormData,
  getUserMed,
  deleteMedicine,
  updateMedicineInfo
};
