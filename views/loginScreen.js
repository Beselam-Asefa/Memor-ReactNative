import React, { useState,useContext } from "react";
import { StyleSheet, Image, Dimensions, ImageBackground } from "react-native";
import {
  Container,
  Content,
  Form,
  Button,
  Text,
  Item,
  Icon,
} from "native-base";

import FormTextInput from "../components/formTextInputs";


import { AsyncStorage } from "react-native";
import { fetchPOST, fetchGET } from "../hooks/APIHooks";
import useSignUpForm from "../hooks/addLoginHooks";
import {AuthContext} from '../contexts/context'
import {MedicContext} from "../contexts/medicContext";

// login screen which toggle between the login and registration page 

const Login = props => {
  const backgroundSource = require("../images/lback.jpg");
  const [toggleForm, setToggleForm] = useState(true);
  const { signIn } = React.useContext(AuthContext);
  const [medicine, setMedicine] = useContext(MedicContext);



  const {
    handleUsernameChange,
    handlePasswordChange,
    handleEmailChange,
    handleFullnameChange,
    handleConfirmPasswordChange,
    validateField,
    validateOnSend,
    checkAvail,
    inputs,
    errors,
    setErrors
  } = useSignUpForm();

  const validationProperties = {
    username: { username: inputs.username },
    email: { email: inputs.email },
    full_name: { full_name: inputs.full_name },
    password: { password: inputs.password },
    confirmPassword: {
      password: inputs.password,
      confirmPassword: inputs.confirmPassword
    }
  };


  //sign in 
  const signInAsync = async () => {
    const errorMessage = 'Authentication failed due to bad credentials '
    try {
      const user = await fetchPOST("login", inputs);
      console.log("Login", user);
      await AsyncStorage.setItem("userToken", user.token);
      await AsyncStorage.setItem("user", JSON.stringify(user.user));
     
      const medicationList =  await fetchGET("media",user.user_id,user.token);
      console.log('the new user list',medicationList);
      
      await setMedicine(medicationList);
     await signIn(user.token);
    } catch (e) {
      console.log("signInAsync error: " + e.message);
      setErrors(errors => ({
        ...errors,
        fetch: errorMessage
        
      }));
      console.log('hereee');
      
      console.log(errors.fetch);
      
    }
     
  };
  // register user 
  const registerAsync = async () => {
    const regValid = validateOnSend(validationProperties);
    console.log("reg field errors", errors);
    if (!regValid) {
      return;
    }

    try {
      console.log("sen inputs", inputs);
      const user = inputs;
      delete user.confirmPassword;
      const result = await fetchPOST("users", user);
      console.log("register", result);
      setMedicine(null);
      signInAsync();
    } catch (e) {
      console.log("registerAsync error: ", e.message);
      setErrors(errors => ({
        ...errors,
        fetch: e.message
      }));
    
    } 
     console.log('hereee');
      
      console.log(errors);
      
  };

  return (
    <Container>
      <ImageBackground
        source={backgroundSource}
        style={styles.backgroundImage}
      >
        <Content
          style={{ width: 350, marginTop: 0 }}
          showsVerticalScrollIndicator={false}
        >
          {/*Login from*/}
          {toggleForm && (
            <Form style={{ paddingTop: 150 }}>
              <Item
                style={{
                  justifyContent: "center",
                  borderColor: "transparent",
                  paddingBottom: 20,
                  paddingTop: 50
                }}
              >
                <Text style={{ fontWeight: "bold" }}>LOGIN</Text>
              </Item>
              <FormTextInput
                autoCapitalize="none"
                lable="Username"
                value={inputs.username}
      
                onChangeText={handleUsernameChange}
                error={errors.fetch}

              />
              <FormTextInput
                autoCapitalize="none"
                lable="Password"
                value={inputs.password}
                secureTextEntry={true}
                onChangeText={handlePasswordChange}
                error={errors.fetch}
              />

              <Button
                block
                style={{ backgroundColor: "#28BFCC" }}
                onPress={signInAsync}
              >
                <Text>LOGIN</Text>
              </Button>

              <Button
                iconRight
                style={{
                  justifyContent: "center",
                  backgroundColor: "#28BFCC",
                  marginTop: 10
                }}
                onPress={() => setToggleForm(false)}
              >
                <Text>REGISTER</Text>
                <Icon name="arrow-forward" />
              </Button>
            </Form>
          )}

          {/*register from*/}

          {!toggleForm && (
            <Form>
              <Item
                style={{
                  justifyContent: "center",
                  borderColor: "transparent",
                  paddingBottom: 20,
                  marginTop: 150
                }}
              >
                <Text style={{ fontWeight: "bold" }}>REGISTER</Text>
              </Item>
       
            <FormTextInput
              autoCapitalize='none'
              value={inputs.username}
              lable='username'
              onChangeText={handleUsernameChange}
              onEndEditing={() => {
                checkAvail();
                validateField(validationProperties.username);
              }}
              
              error={errors.username}
            />
          
          
            <FormTextInput
              autoCapitalize='none'
              value={inputs.email}
              lable='email'
              onChangeText={handleEmailChange}
              onEndEditing={() => {
                validateField(validationProperties.email);
              }}
              error={errors.email}
            />
         
            <FormTextInput
              autoCapitalize='none'
              value={inputs.full_name}
              lable='fullname'
              onChangeText={handleFullnameChange}
              onEndEditing={() => {
                validateField(validationProperties.full_name);
              }}
              error={errors.full_name}
            />
          
            <FormTextInput
              autoCapitalize='none'
              value={inputs.password}
              lable='password'
              secureTextEntry={true}
              onChangeText={handlePasswordChange}
              onEndEditing={() => {
                validateField(validationProperties.password);
              }}
              error={errors.password}
            />
         
            <FormTextInput
              autoCapitalize='none'
              value={inputs.confirmPassword}
              lable='confirm password'
              secureTextEntry={true}
              onChangeText={handleConfirmPasswordChange}
              onEndEditing={() => {
                validateField(validationProperties.confirmPassword);
              }}
              error={errors.confirmPassword}
            />
          

              <Button block style={{ backgroundColor: "#28BFCC" }}  onPress={registerAsync}>
                <Text>REGISTER</Text>
              </Button>

              <Button
                iconLeft
                light
                style={{ width: 100, marginLeft: 250, marginTop: 10 }}
                onPress={() => setToggleForm(true)}
              >
                <Icon name="arrow-back" />
                <Text>Back</Text>
              </Button>
            </Form>
          )}
        </Content>
      </ImageBackground>
    </Container>
  );
};

export default Login;
let styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
