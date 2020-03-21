import React from "react";

import {
  List as BaseList,
  Button,
  ListItem,
  Text,
  Item,
  Card,
  Left,
  Right,
  Icon,
  View
} from "native-base";

// a single suppliment card 
const SuppListItemm = props => {
  const fileId = props.singleMedia.fileId;

  //calculate the progresss bar 
  const barWidth = () => {
    let barWidthh = props.singleMedia.barWidth;
    console.log(barWidthh);

    return barWidthh;
  };
// return a listItem of each suppliment 
  return (
    <ListItem
      style={{ backgroundColor: "transparent" }}
      onPress={() => {
        props.navigation.navigate("single", { file: props.singleMedia });
      }}
    >
      <Card
        style={{
          flex: 1,
          borderRadius: 10,
          paddingTop: 20,
          paddingBottom: 20
        }}
      >
        <Item
          style={{
            borderBottomColor: "transparent",
            alignContent: "center",
            justifyContent: "center"
          }}
        >
          <Left style={{ flex: 0.5 }}>
            <Text style={{ fontWeight: "bold" }}>
              {props.singleMedia.supplimentName}
            </Text>
          </Left>
          <Right style={{ flex: 0 }}>
            <Button small style={{ backgroundColor: "#00AEEF" }}>
              <Text style={{ fontWeight: "600" }}>
                {props.singleMedia.left} Left
              </Text>
            </Button>
          </Right>
        </Item>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "center"
          }}
        >
          <View
            style={{
              height: 40,
              width: 40,

              borderRadius: 20
            }}
          >
            <Icon style={{}} active name="md-body" />
          </View>
          <View style={{ flex: 0.8, flexDirection: "row" }}>
            <View
              style={{
                flex: 1,
                height: 17,
                backgroundColor: "#EAEAEA",
                borderRadius: 13,
                margin: 10,

                flexDirection: "row"
              }}
            >
              <View
                style={{
                  flex: barWidth(),
                  height: 17,
                  borderRadius: 13,
                  backgroundColor: "#00AEEF"
                }}
              ></View>
            </View>
          </View>
        </View>
      </Card>
    </ListItem>
  );
};

export default SuppListItemm;
