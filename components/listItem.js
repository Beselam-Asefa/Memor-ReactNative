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
// this componnent  is a card for a single medication
// return a list Item
const ListItemm = props => {
  const fileId = props.singleMedia.fileId;
  // calculate the progress bar width
  const barWidth = () => {
    let barWidthh = props.singleMedia.barWidth;
    return barWidthh;
  };

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
              {props.singleMedia.medicineName}
            </Text>
          </Left>
          <Right style={{ flex: 0 }}>
            <Button small style={{ backgroundColor: "#FF9501" }}>
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
            <Icon style={{}} active name="medkit" />
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
                  backgroundColor: "#FFBA00"
                }}
              ></View>
            </View>
          </View>
        </View>
      </Card>
    </ListItem>
  );
};

export default ListItemm;
