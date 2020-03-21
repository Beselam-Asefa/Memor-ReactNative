import { useState, useContext } from "react";

import { AsyncStorage } from "react-native";
import {
  fetchFormData,
  fetchGET,
  getUserMed,
  getUserSuppliment
} from "./APIHooks";
import { Asset } from "expo-asset";

import Login from "../views/loginScreen";
import validate from "validate.js";
import { uploadSuppConstraints } from "../constants/validationConst";
import { SuppContext } from "../contexts/suppContext";

const imageUri =
  "file:///var/mobile/Containers/Data/Application/2B966CE5-FD9B-44F7-9DC3-34B8B3AE510F/Library/Caches/ExponentExperienceData/%2540anonymous%252Fwekeme_up-c9f1cb48-6322-49a5-b906-7b692863c092/ExponentAsset-b65b0a8530d72ad04a47f23871975a64.jpg";

// hook component for uploading suppliments
const useSuppliemtnForm = () => {
  const [supplimentInputs, setSupplimentInputs] = useState({});
  const [errors, setErrors] = useState({});
  const [suppliment, setSuppliment] = useContext(SuppContext);

  const handleSupplimentNameChange = text => {
    setSupplimentInputs(supplimentInputs => ({
      ...supplimentInputs,
      supplimentName: text
    }));
  };

  const handleStartingTimeChange = text => {
    setSupplimentInputs(supplimentInputs => ({
      ...supplimentInputs,
      startingTime: text
    }));
  };

  const handleHowmanyTimesChange = text => {
    setSupplimentInputs(supplimentInputs => ({
      ...supplimentInputs,
      howmanyTimes: text
    }));
  };

  const handleTimeGapChange = text => {
    setSupplimentInputs(supplimentInputs => ({
      ...supplimentInputs,
      timeGap: text
    }));
  };

  const handleUpload = async (neww,fileUri) => {
    const type = "image/jpeg";
    const suppliment = JSON.stringify(neww);
    const fd = new FormData();
    fd.append("title", "suppliment");
    fd.append("description", suppliment);
    fd.append("file", { uri: fileUri, name: "lo", type });

    try {
      const token = await AsyncStorage.getItem("userToken");
      const resp = await fetchFormData("media", fd, token);
      //const user = await getUser();

      if (resp.message) {
        //const userId = user.user_id;
        const userSupp = await getUserSuppliment();
        setSuppliment(userSupp.reverse());
        Login();
      }
    } catch (e) {
      console.log("from handleupload", e.message);
    }
  };

  const validateField = attr => {
    // eslint-disable-next-line max-len
    //  console.log('attr',attr);

    const attrName = Object.keys(attr).pop(); // get the only or last item from array
    console.log("the name", attrName);

    const valResult = validate(attr, uploadSuppConstraints);
    console.log("valresult", valResult);
    let valid = undefined;
    if (valResult[attrName]) {
      valid = valResult[attrName][0]; // get just the first message
    }
    setErrors(errors => ({
      ...errors,
      [attrName]: valid,
      fetch: undefined
    }));
    //  console.log('the error',errors);
  };

  const validateOnSend = fields => {
    setErrors('');
    console.log("the fileld", fields);

    for (const [key, value] of Object.entries(fields)) {
      //  console.log(key, value);
      console.log("valueee", value);

      validateField(value);
    }
    console.log("mmmmm", errors.howmanyTimes);

    return (
      errors.supplimentName === undefined &&
      errors.startingTime === undefined &&
      errors.howmanyTimes === undefined &&
      errors.timeGap === undefined
    );
  };

  return {
    handleSupplimentNameChange,
    handleStartingTimeChange,
    handleHowmanyTimesChange,
    handleTimeGapChange,
    validateOnSend,
    handleUpload,
    supplimentInputs,
    validateField,
    setSupplimentInputs,
    errors,
    setErrors
  };
};

export default useSuppliemtnForm;
