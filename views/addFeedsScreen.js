import React, { useState, useContext, useEffect } from "react";
import { StyleSheet } from "react-native";

import { Container, Tab, Tabs } from "native-base";
import MedUpload from "./medUploadView";
import SupplimentUpload from "./supplimentUploadView";
import { Asset } from "expo-asset";

//the screen component for add medication Tb 
const AddFeedScreen = ({ navigation }) => {
  const test = async () => {
    const imageURI = await Expo.Asset.fromModule(require("../assets/lo.jpg"));

    if (!imageURI.localUri) {
      await Asset.loadAsync(require("../assets/lo.jpg")).then(() => {
        imageURI = Asset.fromModule(require("../assets/lo.jpg"));
      });
    }
    const imageUrii = await imageURI.localUri;

    return await imageUrii;
  };
  useEffect(() => {
    let finalUri;
    try {
      finalUri = test();
      console.log("this is from finaluri", finalUri);
    } catch (e) {
      console.log("this is e ", e);
    }
  });
  // returns two tab components medication and suppliment
  return (
    <Container>
      <Tabs>
        <Tab
          heading="Medication"
          tabStyle={{ backgroundColor: "#A0C770" }}
          activeTabStyle={{ backgroundColor: "#A0C770" }}
        >
          <MedUpload nav={navigation} file={test} />
        </Tab>
        <Tab
          heading="Suppliment"
          tabStyle={{ backgroundColor: "#A0C770" }}
          activeTabStyle={{ backgroundColor: "#A0C770" }}
        >
          <SupplimentUpload nav={navigation} file={test} />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default AddFeedScreen;
let styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
