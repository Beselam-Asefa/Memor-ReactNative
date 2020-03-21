import React, { useState,useEffect } from "react";

import {
  StyleSheet,
  Dimensions,
  ImageBackground
} from "react-native";

import {
  Container,
  Content,

} from "native-base";
import Listt from '../components/list'
import SuppList from "../components/supList";

const screenWidth = Dimensions.get("window").width;

//home page with two list components , list for the medicine and list for suppliments
const Home = ({ navigation }) => {

  return (
    <Container>
      <ImageBackground
        source={require("../images/home.png")}
        style={styles.backgroundImage}
      >
        <Content style={{ width: screenWidth }}>
      <Listt navigation={navigation}/>
      <SuppList navigation={navigation}/>
      
        </Content>
      </ImageBackground>
    </Container>
  );
};
export default Home;
let styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});



