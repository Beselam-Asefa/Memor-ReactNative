import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Navigator from "./Navigation/navigation";
import { MedicProvider } from "./contexts/medicContext";
import { SuppProvider } from "./contexts/suppContext";

export default App = () => {


  return (
    <MedicProvider>
      <SuppProvider>
        
          <Navigator />
       
      </SuppProvider>
    </MedicProvider>
  );
};


