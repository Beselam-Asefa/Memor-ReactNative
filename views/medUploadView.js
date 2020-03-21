import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Dimensions, ImageBackground } from "react-native";

import {
  Container,
  Body,
  Content,
  Form,
  Button,
  Text,
  Item,
  H2,
  Card,
  Left,
  Right,
  Icon
} from "native-base";
//import FormTextInput from "../components/FormTextInput";
import useAddMedicineForm from "../hooks/addMedicineHook";
import FormTextInput from "../components/formTextInputs";
import Listt from "../components/list";
import Algo from "../components/algo";
import Home from "./Home";

// a screen for medcicine upload form
const MedUpload = ({ nav, file }) => {
  const {
    handleMedicineNameChange,
    handleStartingTimeChange,
    handleHowmanyTimesChange,
    handleTimeGapChange,
    handleUpload,
    medicineinputs,
    validateField,
    setMedicineInputs,
    validateOnSend,
    errors,
    setErrors
  } = useAddMedicineForm();

  const validationProperties = {
    medicineName: { medicineName: medicineinputs.medicineName },
    startingTime: { startingTime: medicineinputs.startingTime },
    howmanyTimes: { howmanyTimes: medicineinputs.howmanyTimes },
    timeGap: { timeGap: medicineinputs.timeGap }
  };

  const screenWidth = Dimensions.get("window").width;

  const uploadMedicine = async () => {
    /*   console.log('mm'); */

    const fileUri = await file();
    console.log("ffffffffff", fileUri);

    const medInputvalidation = validateOnSend(validationProperties);
    console.log("result", medInputvalidation);

    if (!medInputvalidation) {
      return;
    }

    try {
      let newMedInput = await Algo(medicineinputs);
      await handleUpload(newMedInput, fileUri);
      reset();
      nav.navigate("Home");
    } catch (e) {
      console.log("error from uploadmedicine", e);
    }
  };

  const reset = () => {
    setErrors({});
    setMedicineInputs({});
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
              marginLeft: 30,
              marginRight: 30,
              padding: 17,
              borderRadius: 10,
              backgroundColor: "#A0C770",
              marginTop: 100
            }}
          >
            <Item style={{ borderBottomColor: "transparent" }}>
              <Left style={{ flex: 0.3 }}>
                <Button style={{ backgroundColor: "#FF9501" }}>
                  <Icon active name="medkit" />
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
                  Add Medication
                </Text>
              </Body>
            </Item>
          </Card>

          <Form style={{ marginLeft: 30, marginRight: 30 }}>
            <FormTextInput
              lable="Enter the Medicine Name "
              maxLength={18}
              value={medicineinputs.medicineName}
              onChangeText={handleMedicineNameChange}
              onEndEditing={() => {
                validateField(validationProperties.medicineName);
              }}
              error={errors.medicineName}
            />
            <FormTextInput
              lable="Starting Time in 24 hour format"
              maxLength={2}
              keyboardType="numeric"
              value={medicineinputs.startingTime}
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
              value={medicineinputs.howmanyTimes}
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
              value={medicineinputs.timeGap}
              onChangeText={handleTimeGapChange}
              onEndEditing={() => {
                validateField(validationProperties.timeGap);
              }}
              error={errors.timeGap}
            />

            <Button
              light
              style={{ justifyContent: "center" }}
              onPress={() => uploadMedicine()}
            >
              <Text>ADD</Text>
            </Button>
          </Form>
        </Content>
      </ImageBackground>
    </Container>
  );
};

export default MedUpload;
let styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
