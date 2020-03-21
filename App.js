import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Navigator from "./Navigation/navigation";
import { MedicProvider } from "./contexts/medicContext";
import { SuppProvider } from "./contexts/suppContext";
//import * as Expo from "expo";
//import * as Font from "expo-font";
/* import { Asset } from "expo-asset";
const test = async () => {
  const [fileUri, setFileUri] = useState(FileContext);
  const imageURI = await Expo.Asset.fromModule(require("./assets/lo.jpg"));
  
  if (!imageURI.localUri) {
    await Asset.loadAsync(require("./assets/lo.jpg")).then(() => {
      imageURI = Asset.fromModule(require("./assets/lo.jpg"));

      console.log(imageURI.localUri);
    });
  }
 setFileUri(imageURI);
  console.log("the imageUriii", imageURI);

  console.log("log from app.js", imageURI.localUri);
  return imageURI.localUri;
};

*/


export default App = () => {


  return (
    <MedicProvider>
      <SuppProvider>
        
          <Navigator />
       
      </SuppProvider>
    </MedicProvider>
  );
};

/*
export default App = () => {

  const test= async ()=>{
    const imageURI = await Expo.Asset.fromModule(require('./assets/lo.jpg'));
  
    if (!imageURI.localUri) {
      Asset.loadAsync(require('./assets/lo.jpg')).then(() => {
        imageURI = Asset.fromModule(require('./assets/lo.jpg'))
       
      })
    }
  
  
    console.log('the imageUriii',imageURI);
    
     console.log('log from app.js',imageURI.localUri);
     return imageURI.localUri;
    } 


  const [fontReady, setFontReady] = useState(false);
  const loadFonts = async () => {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    setFontReady(true);
  };
  useEffect(() => {
    test();
    loadFonts();
  }, []);

  if (!fontReady) {
    console.log("Waiting for fonts...");
    return <Expo.AppLoading />;
  }
  return (
    <MedicProvider>
      <SuppProvider>
        <Navigator />
      </SuppProvider>
    </MedicProvider>
  );
}; */
