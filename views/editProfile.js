import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Image, Dimensions, ImageBackground } from "react-native";
import {
  Container,
  Content,
  Form,
  Button,
  Text,
  Item,
  Toast,

} from "native-base";

import FormTextInput from "../components/formTextInputs";

import { AsyncStorage } from "react-native";
import { fetchPUT, getUserData } from "../hooks/APIHooks";
import useSignUpForm from "../hooks/addLoginHooks";
import useUploadForm from "../hooks/profilePicUploadHook";
import * as ImagePicker from 'expo-image-picker';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;



const EditProFile = ({user}) => {
    const ss = user.avatar;
    console.log('imadd',ss);
    
  const [image, setImage] = useState(ss);
  const [uploadImage, setUploadImage] = useState({});
  const backgroundSource = require("../images/home.png");
  const [send, setSend] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

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

  const {
    handleUpload,
  } = useUploadForm();

  const validationProperties = {
    username: { username: inputs.username },
    email: { email: inputs.email },
    password: { password: inputs.password },
    confirmPassword: {
      password: inputs.password,
      confirmPassword: inputs.confirmPassword
    }
  };
  useEffect(() => {
    setImage(user.avatar);
  }, []);

  const updateAsync = async () => {
    const regValid = validateOnSend(validationProperties);
    console.log("reg field errors", errors);
    if (!regValid) {
      return;
    }

    try {
      const userInp = inputs;
      delete userInp.confirmPassword;
      const result = await fetchPUT("users", userInp,user.userdata.token);
      const userInfo = await getUserData('users',user.userdata.user_id,user.userdata.token)
      await AsyncStorage.setItem("user", JSON.stringify(userInfo));
      Toast.show({
        text: "profile succesfully updated!",
        buttonText: "Okay",
        duration: 3000
      })
      console.log("update", userInfo);
    } catch (e) {
      console.log("update error: ", e.message);
      setErrors(errors => ({
        ...errors,
        fetch: e.message
      }));
    }
  };
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3,
      exif: true,
    });
    
    if (!result.cancelled) {
      console.log('from picker',result.uri);
        setUploadImage(result);
        setImage(result.uri);
        setImageLoaded(true);
      }
}
const upload = () => {
   if(imageLoaded)
    handleUpload(uploadImage);
   else{
       console.log('image not loaded');
       
   } 
  };
 

  return (
    <Container >
      <ImageBackground source={backgroundSource} style={styles.backgroundImage}>
        <Content
          style={{ width: 350, marginTop: 30 }}
          showsVerticalScrollIndicator={false}
        >
          <Item
            style={{
              width: "100%",
              alignSelf: "center",
              backgroundColor:"transparent",
           
              justifyContent:"space-around",
              borderColor: "transparent"
            }}
          >
              
                  <Image
              style={{
                width: deviceHeight / 6.5,
                height: deviceHeight / 6.5,
                alignSelf: "center",
                borderRadius: 90,
                borderWidth: 8,
                borderColor: "white",
               
              }}
              source={{uri:image}}
            />    
             
           
           <Item style={{flexDirection:'column',height:"80%",borderColor:'transparent'}}>
           <Button primary style={{backgroundColor:'#0053BF'}} onPress={pickImage}><Text> Choose </Text></Button>
           <Button primary style={{marginTop:20, backgroundColor:'#28BFCC'}} onPress={()=>upload()}><Text> Upload </Text></Button>
           </Item>


          </Item>
          <Form>
            <FormTextInput
              autoCapitalize="none"
              value={inputs.username}
              lable={("current user name", user.userdata.username)}
              onChangeText={handleUsernameChange}
              onEndEditing={() => {
                console.log(user.username);
                
                if(user.userdata.username != inputs.username){
                  checkAvail(); 
                }
               
                validateField(validationProperties.username);
              }}
              error={errors.username}
            />

            <FormTextInput
              autoCapitalize="none"
              value={inputs.email}
              lable={user.userdata.email}
              onChangeText={handleEmailChange}
              onEndEditing={() => {
                validateField(validationProperties.email);
              }}
              error={errors.email}
            />

            <FormTextInput
              autoCapitalize="none"
              value={inputs.password}
              lable="Password"
              secureTextEntry={true}
              onChangeText={handlePasswordChange}
              onEndEditing={() => {
                validateField(validationProperties.password);
              }}
              error={errors.password}
            />

            <FormTextInput
              autoCapitalize="none"
              value={inputs.confirmPassword}
              lable="confirm Password"
              secureTextEntry={true}
              onChangeText={handleConfirmPasswordChange}
              onEndEditing={() => {
                validateField(validationProperties.confirmPassword);
              }}
              error={errors.confirmPassword}
            />

            <Button
              block
              style={{ backgroundColor: "#28BFCC" }}
              onPress={updateAsync}
            >
              <Text>Save</Text>
            </Button>
          </Form>
        </Content>
      </ImageBackground>
    </Container>
  );
};

let styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default EditProFile;
