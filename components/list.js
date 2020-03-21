/* eslint-disable max-len */

// the list componnent for medication 
import React, { useContext, useEffect, useState } from "react";
import { Switch } from "react-native";

import {
  List as BaseList,
  Body,
  Button,
  ListItem,
  Text,
  Left,
  Right,
  List,
  Icon
} from "native-base";
import ListItemm from "./listItem";
import { MedicContext } from "../contexts/medicContext";
import { getUserMed } from "../hooks/APIHooks";

const Listt = ({ navigation }) => {
  const [isSwitchEnabled, setSwitch] = useState(true);
  const [medicine, setMedicine] = useContext(MedicContext);
  
  //get user medication
  const getMedicine = async () => {
    try {
      const data = await getUserMed();
      setMedicine(data.reverse());
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    getMedicine();
  }, []);
 //return a list of medication cards 
  return (
    <List style={{ backgroundColor: "transparent" }}>
      <ListItem itemDivider>
        <Left style={{ flex: 0.3 }}>
          <Button style={{ backgroundColor: "#FF9501" }}>
            <Icon active name="medkit" />
          </Button>
        </Left>
        <Body style={{ marginLeft: 0, paddingLeft: 0 }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>Medication</Text>
        </Body>
        <Right>
          <Switch
            value={isSwitchEnabled}
            trackColor={{ true: "#72A82F" }}
            onValueChange={value => setSwitch(value)}
          />
        </Right>
      </ListItem>
      {isSwitchEnabled && (
        <BaseList
          dataArray={medicine}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ListItemm singleMedia={item} navigation={navigation} />
          )}
        />
      )}
    </List>
  );
};

export default Listt;
