import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  ImageBackground
} from "react-native";

import {
  Container,
  Body,
  Content,
  Form,
  Button,
  Text,
  Item,
  Card,
  Left,
  Icon,
} from "native-base";
//import FormTextInput from "../components/FormTextInput";
import useSuppMedicineForm from "../hooks/addSupplimentHook";
import FormTextInput from "../components/formTextInputs";
import Listt from "../components/list";
import Algo from "../components/algo";
import Home from "./Home";


// a screen whiche shows has the upload for suppliments 
const SupplimentUpload = ({nav ,file}) => {
   
    
  const {
    handleSupplimentNameChange,
    handleStartingTimeChange,
    handleHowmanyTimesChange,
    handleTimeGapChange,
    handleUpload,
    supplimentInputs,
    validateField,
    setSupplimentInputs,
    validateOnSend,
    errors,
    setErrors
  } = useSuppMedicineForm();

  const validationProperties = {
    supplimentName: { supplimentName: supplimentInputs.supplimentName },
    startingTime: { startingTime: supplimentInputs.startingTime },
    howmanyTimes: { howmanyTimes: supplimentInputs.howmanyTimes },
    timeGap: { timeGap: supplimentInputs.timeGap }
  };

   const screenWidth = Dimensions.get("window").width;

  const handleSuppNameChange = text => {
    handleSupplimentNameChange(text);
  };

  const uploadSupp = async () => {
    const fileUri = await file();
    const suppInputvalidation = validateOnSend(validationProperties);
    console.log('result',suppInputvalidation);
    
    if (!suppInputvalidation) {
      return;
    }

    try {
      let newsuppInput = await Algo(supplimentInputs);
     
      await handleUpload(newsuppInput,fileUri);
      reset();
      nav.navigate("Home");
    } catch (e) {
      console.log("error from uploadsuppliment", e);
    }
  };

  const reset = () => {
    setErrors({});
    setSupplimentInputs({});
  };

  const image = { uri: "../image" };
 
  return (
    <Container>
     <ImageBackground
        source={require("../images/feed.png")}
        style={styles.backgroundImage}
      >
        <Content style={{ width: screenWidth, zIndex: 4 }}>
          
        <Card
            style={{
              marginTop:100,
              marginLeft: 30,
              marginRight: 30,
              padding: 17,
              borderRadius: 10,
              backgroundColor: "#0DA6B4"
            }}
          >
            <Item style={{ borderBottomColor: "transparent" }}>
              <Left style={{ flex: 0.3 }}>
                <Button
                  style={{ backgroundColor: "#FF9501" }}
                >
                  <Icon active name="md-body" />
                </Button>
              </Left>
              <Body
                style={{
                  marginLeft: 0,
                  paddingLeft: 0,
                  flex: 0.7,
                  alignItems: "clear"
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  Add Suppliments
                </Text>
              </Body>
            </Item>
              </Card>  
         
          
            <Form style={{ marginLeft: 30, marginRight: 30 }}>
              <FormTextInput
                lable="Enter the Medicine Name "
                maxLength={18}
                value={supplimentInputs.supplimentName}
                onChangeText={handleSuppNameChange}
                onEndEditing={() => {
                  validateField(validationProperties.supplimentName);
                }}
                error={errors.supplimentName}
              />
              <FormTextInput
                lable="Starting Time in 24 hour format"
                maxLength={2}
                keyboardType="numeric"
                value={supplimentInputs.startingTime}
                onChangeText={handleStartingTimeChange}
                onEndEditing={() => {
                  validateField(validationProperties.startingTime);
                }}
                error={errors.startingTime}
              />
              <FormTextInput
                lable="How many times per day"
                maxLength={1}
                keyboardType="numeric"
                value={supplimentInputs.howmanyTimes}
                onChangeText={handleHowmanyTimesChange}
                onEndEditing={() => {
                  validateField(validationProperties.howmanyTimes);
                }}
                error={errors.howmanyTimes}
              />
              <FormTextInput
                lable="Time Interval"
                maxLength={2}
                keyboardType="numeric"
                value={supplimentInputs.timeGap}
                onChangeText={handleTimeGapChange}
                onEndEditing={() => {
                  validateField(validationProperties.timeGap);
                }}
                error={errors.timeGap}
              />

              <Button
                light
                style={{ justifyContent: "center" }}
                onPress={() => uploadSupp()}
              >
                <Text>ADD</Text>
              </Button>
            </Form>
        
         
        </Content>
      </ImageBackground> 

    </Container>
  );
};

export default SupplimentUpload;
let styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
