import { useState } from "react";
import validate from "validate.js";
import { fetchGETAll } from "./APIHooks";
import { registerConstraints } from "../constants/validationConst";

// a hook for user login  and registration
const useSignUpForm = () => {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});

  const handleUsernameChange = text => {
    setInputs(inputs => ({
      ...inputs,
      username: text
    }));
  };

  const handlePasswordChange = text => {
    setInputs(inputs => ({
      ...inputs,
      password: text
    }));
  };

  const handleConfirmPasswordChange = text => {
    setInputs(inputs => ({
      ...inputs,
      confirmPassword: text
    }));
  };

  const handleEmailChange = text => {
    setInputs(inputs => ({
      ...inputs,
      email: text
    }));
    console.log(text);
  };
  const handleFullnameChange = text => {
    setInputs(inputs => ({
      ...inputs,
      full_name: text
    }));
  };

  // validate user inputs
  const validateField = attr => {
    console.log("for email", attr);

    // eslint-disable-next-line max-len
    const attrName = Object.keys(attr).pop(); // get the only or last item from array
    const valResult = validate(attr, registerConstraints);
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
  };

  //check is the user name is already  avilable
  const checkAvail = async () => {
    const text = inputs.username;
    try {
      const result = await fetchGETAll("users/username", text);
      console.log(result);
      if (!result.available) {
        setErrors(errors => ({
          ...errors,
          username: "Username available."
        }));
      }
    } catch (e) {
      setErrors(errors => ({
        ...errors,
        fetch: e.message
      }));
    }
  };

  // validate each components white the user press the login or register button
  const validateOnSend = fields => {
    checkAvail();

    for (const [key, value] of Object.entries(fields)) {
      console.log(key, value);
      validateField(value);
    }

    return (
      errors.username === undefined ||
      errors.email === undefined ||
      errors.password === undefined ||
      errors.confirmPassword === undefined
    );
  };

  return {
    handleUsernameChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleEmailChange,
    handleFullnameChange,
    checkAvail,
    validateField,
    validateOnSend,
    inputs,
    errors,
    setErrors
  };
};

export default useSignUpForm;
