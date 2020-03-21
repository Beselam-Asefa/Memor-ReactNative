import { useState, useContext, useEffect } from "react";

import { AsyncStorage } from "react-native";
import { fetchFormData, fetchGET, getUserMed } from "./APIHooks";
import { Asset } from "expo-asset";
import { MedicContext } from "../contexts/medicContext";
import Login from "../views/loginScreen";
import validate from "validate.js";
import { uploadMedConstraints } from "../constants/validationConst";

const imageUri =
  "file:///var/mobile/Containers/Data/Application/2B966CE5-FD9B-44F7-9DC3-34B8B3AE510F/Library/Caches/ExponentExperienceData/%2540anonymous%252Fwekeme_up-c9f1cb48-6322-49a5-b906-7b692863c092/ExponentAsset-b65b0a8530d72ad04a47f23871975a64.jpg";


// a hook for user medication
const useAddMedicineForm = () => {
  const [medicineinputs, setMedicineInputs] = useState({});
  const [errors, setErrors] = useState({});
  const [medicine, setMedicine] = useContext(MedicContext);

  const handleMedicineNameChange = text => {
    console.log(text);
    setMedicineInputs(medicineInputs => ({
      ...medicineInputs,
      medicineName: text
    }));
  };

  const handleStartingTimeChange = text => {
    setMedicineInputs(medicineInputs => ({
      ...medicineInputs,
      startingTime: text
    }));
  };

  const handleHowmanyTimesChange = text => {
    setMedicineInputs(medicineInputs => ({
      ...medicineInputs,
      howmanyTimes: text
    }));
  };

  const handleTimeGapChange = text => {
    setMedicineInputs(medicineinputs => ({
      ...medicineinputs,
      timeGap: text
    }));
  };

  // upload the user medication for to the server
  const handleUpload = async (neww, fileUri) => {
    const type = "image/jpeg";
    const medication = JSON.stringify(neww);
    const fd = new FormData();
    fd.append("title", "medication");
    fd.append("description", medication);
    fd.append("file", { uri: fileUri, name: "lo", type });
    console.log(neww);

    try {
      const token = await AsyncStorage.getItem("userToken");
      const resp = await fetchFormData("media", fd, token);

      if (resp.message) {
        const userMedicine = await getUserMed();
        setMedicine(userMedicine.reverse());
        Login();
      }
    } catch (e) {
      console.log("from handleupload", e.message);
    }
  };

  // validate the fields
  const validateField = attr => {
    console.log("attr", attr);

    const attrName = Object.keys(attr).pop(); // get the only or last item from array
    console.log("attrName", attrName);

    const valResult = validate(attr, uploadMedConstraints);
    console.log("valresult", valResult);

    let valid = undefined;
    if (valResult[attrName]) {
      valid = valResult[attrName][0]; // get just the first message
      console.log("valid", valid);
    }
    setErrors(errors => ({
      ...errors,
      [attrName]: valid,
      fetch: undefined
    }));
    console.log("the error", errors);
  };

// validate each fields when the user press the send button 
  const validateOnSend = fields => {
    setErrors("");
    console.log("the fileld", fields);

    for (const [key, value] of Object.entries(fields)) {
      //  console.log(key, value);
      console.log("valueee", value);

      validateField(value);
    }
    console.log("mmmmm", errors.howmanyTimes);

    return (
      errors.medicineName === undefined &&
      errors.startingTime === undefined &&
      errors.howmanyTimes === undefined &&
      errors.timeGap === undefined
    );
  };

  return {
    handleMedicineNameChange,
    handleStartingTimeChange,
    handleHowmanyTimesChange,
    handleTimeGapChange,
    validateOnSend,
    handleUpload,
    medicineinputs,
    validateField,
    setMedicineInputs,
    errors,
    setErrors
  };
};

export default useAddMedicineForm;
