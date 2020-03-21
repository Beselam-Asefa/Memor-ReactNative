/* eslint-disable max-len */
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
import SuppListItemm from "./supListItem";
import { SuppContext } from "../contexts/suppContext";
import { getUserSuppliment } from "../hooks/APIHooks";

// a componnent for suppliment list 
const SuppList = ({ navigation }) => {
  const [isSwitchEnabled, setSwitch] = useState(true);
  const [suppliment, setSuppliment] = useContext(SuppContext);

  // make an API call and get a user Suppliment
  const getSuppliment = async () => {
    try {
      const data = await getUserSuppliment();
      setSuppliment(data.reverse());
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    getSuppliment();
  }, []);

  return (
    <List style={{ backgroundColor: "transparent" }}>
      <ListItem itemDivider>
        <Left style={{ flex: 0.3 }}>
          <Button style={{ backgroundColor: "#00AEEF" }}>
            <Icon active name="md-body" />
          </Button>
        </Left>
        <Body style={{ marginLeft: 0, paddingLeft: 0 }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>Suppliment</Text>
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
          dataArray={suppliment}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <SuppListItemm singleMedia={item} navigation={navigation} />
          )}
        />
      )}
    </List>
  );
};

export default SuppList;
