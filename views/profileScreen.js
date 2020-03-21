import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Modal,
  TouchableHighlight
} from "react-native";
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Button,
  Icon,
  View,
  Item
} from "native-base";
import { Image } from "react-native";
import { AsyncStorage } from "react-native";
import PropTypes from "prop-types";
import { fetchGETAll } from "../hooks/APIHooks";
import { Dimensions } from "react-native";
import { mediaURL } from "../constants/urlConst";
import { AuthContext } from "../contexts/context";
import EditProfile from "./editProfile";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

// the screen for showing the user info 
const ProfileScreen = props => {
  const [ModalVisible, setModalVisible] = useState(false);
 
  const [user, setUser] = useState({
    userdata: {},
    avatar: "https://"
  });
  const { signOut } = React.useContext(AuthContext);
  const userToState = async () => {
    try {
      const userFromStorage = await AsyncStorage.getItem("user");
      const userToken = await AsyncStorage.getItem("userToken");
      const uData = JSON.parse(userFromStorage);
      uData.token= userToken;
      const avatarPic = await fetchGETAll("tags", "avatar_" + uData.user_id);
      console.log("avpic", avatarPic);
      let avPic = "";
      if (avatarPic.length === 0) {
        // if avatar is not set
        avPic = "https://placekitten.com/1024/1024";
      } else {
        const newArray = avatarPic.reverse();
        avPic = mediaURL + newArray[0].filename;
      }
      setUser(user => ({
        userdata: uData,
        avatar: avPic
      }));
    } catch (e) {
      console.log("Profile error: ", e.message);
    }
  };

  useEffect(() => {
    userToState();
  },[]);

  const signOutAsync = async () => {
    await AsyncStorage.clear();
    signOut();
  };

  console.log("ava", mediaURL + user.avatar);
  return (
    <Container>
      <ImageBackground
        source={require("../images/prof.png")}
        style={styles.backgroundImage}
      >
        <Content style={{ width: deviceWidth }}>
          <Item
            style={{
              width: deviceHeight / 4,
              alignSelf: "center",
              alignItems:'center',
              justifyContent:'center',
              backgroundColor: "transparent",
              borderColor: "transparent",
              marginBottom:100

            }}
          >
            <Image  
             onPress={() => setModalVisible(true)}
              style={{
                width: deviceHeight / 5,
                height: deviceHeight / 5,
                borderRadius: 110,
                alignSelf:'center',
                borderWidth: 3,
                borderColor: "black",
                marginTop: 55
              }}
              source={{ uri: user.avatar }}
            />
          </Item>
          <Card
            style={{
              width: deviceWidth / 1.2,
              alignSelf: "center",
              borderRadius: 19,
              elevation: 5,
              borderColor: "transparent",
              marginTop: 29
            }}
          >
            <CardItem style={{ alignSelf: "center" }}>
              <Icon name="person" />
              <Text style={{ fontWeight: "600", fontSize: 25 }}>
                Username: {user.userdata.username}
              </Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text
                  style={{ alignSelf: "center", fontWeight: "600" }}
                  numberOfLines={1}
                >
                  email: {user.userdata.email}
                </Text>
              </Body>
            </CardItem>

            <CardItem>
              <Body>
                <Button
                  full
                  style={{ backgroundColor: "#0053BF", borderRadius: 6 }}
                  onPress={() => setModalVisible(true)}
                >
                  <Text>Edit</Text>
                </Button>
              </Body>
            </CardItem>

            <CardItem>
              <Body>
                <Button
                  full
                  style={{ backgroundColor: "#28BFCC", borderRadius: 6 }}
                  onPress={signOutAsync}
                >
                  <Text>Logout</Text>
                </Button>
              </Body>
            </CardItem>
          </Card>
          <Modal
            animationType="slide"
            transparent={true}
            visible={ModalVisible}
            onDismiss={()=>userToState()}
            
            
          
          >
           <View style={{ marginTop: 172, flex:1}}>
              <View>
                 <Button block
                iconLeft
                light
                style={{backgroundColor:'white',borderRadius:5 }}
                onPress={() => setModalVisible(false)}
              >
                <Icon name="arrow-back" style={{color:'green'}}/>
                <Icon name="arrow-back" style={{color:'green'}}/>
                <Icon name="arrow-back" style={{color:'green'}}/>
                <Text>Back</Text>
              </Button>
                </View> 
               
            <EditProfile user={user} />
            </View> 
            
          </Modal>
        </Content>
      </ImageBackground>
    </Container>
  );
};

ProfileScreen.propTypes = {
  navigation: PropTypes.object
};

export default ProfileScreen;

let styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    height: deviceHeight,
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  }
});
