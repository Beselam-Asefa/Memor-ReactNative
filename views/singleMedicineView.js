import React, { useContext, useState ,useEffect} from "react";
import { Alert } from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  Icon,
  CardItem,
  Button,
  Text,
  Body,
  Left,
  Right
} from "native-base";
import {
  deleteMedicine,
  getUserMed,
  updateMedicineInfo,
  getUserSuppliment
} from "../hooks/APIHooks";
import { MedicContext } from "../contexts/medicContext";
import {SuppContext} from "../contexts/suppContext";

// a screen for showing a medicine or suppliment detail 

const SingleMedView = ({ route, navigation }) => {

  const [medicine, setMedicine] = useContext(MedicContext);
  const [suppliment, setSuppliment] = useContext(SuppContext);
  const { file } = route.params;
console.log(file);

  
  const deleteMed = async () => {
    try {
      const respose = await deleteMedicine(file.fileId);
      if(file.medicineName){
        const userMedList = await getUserMed(); 
        await setMedicine(userMedList);
      }
      else{
      const usersuppList = await getUserSuppliment();
      await setSuppliment(usersuppList)
      };
      await navigation.navigate('Home')
    } catch (e) {
      console.log("from deleteThisMedicine", e);
    }
  };

  const showDeleteAlert = () => {
    Alert.alert(
      "Are you sure you want to delete this medication",
      "",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => deleteMed() }
      ],
      { cancelable: false }
    );
  };

  const updateMed = async () => {
    let newFile = file;
    if (newFile.left > 0) {
      newFile.left -= 1;
      newFile.barWidth +=newFile.barSection;
      console.log("this is the file ", newFile);

      try {
        const respose = await updateMedicineInfo(newFile.fileId, newFile);
        if(newFile.medicineName){
          const userMedList = await getUserMed(); 
          await setMedicine(userMedList);
        }
        else{
        const usersuppList = await getUserSuppliment();
        await setSuppliment(usersuppList)
        }
        await navigation.navigate('Home')
      } catch (e) {
        console.log("from deleteThisMedicine", e);
      }
    }
  };
  const showAlert = () => {
    Alert.alert(
      "Are you sure you have taken this medicine",
      "",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => updateMed() }
      ],
      { cancelable: false }
    );
  };
  return (
    <Container>{file.medicineName &&
      <Content padder style={{ marginTop: 50 }}>
          <Card style={{alignItems:'center',padding:10,backgroundColor:'#A0C770',borderRadius:10}}>
              <CardItem style={{backgroundColor:'#A0C770'}}><Text style={{fontWeight:'800',fontSize:20,color:'white'}}>Medicine Details</Text></CardItem>
          </Card>
        <Card>
          <CardItem header bordered>
            <Text>Madicine Name : {file.medicineName}</Text>
          </CardItem>
          <CardItem header bordered>
            <Text>Starting Time : {file.startingTime}</Text>
          </CardItem>
          <CardItem header bordered>
            <Text>Howmany Times a Day : {file.howmanyTimes}</Text>
          </CardItem>

          <CardItem header bordered>
            <Text>Next Medication Time : {}</Text>
          </CardItem>
        </Card>
        <Card>
          <CardItem header bordered style={{}}>
            
              <Text style={{  fontWeight: "600" }}>
                Howmany Medicine Left{"   "}
              </Text>
              <Button style={{marginRight:21,marginLeft:10}} ><Text style={{ color: "white", fontSize: 30 }}>{file.left}</Text></Button>
             
           
          
              <Button primary style={{ backgroundColor: "#FFBA00" }}>
                <Text style={{ fontWeight: "700" }} onPress={showAlert}>
                  {" "}
                  <Icon
                    type="Entypo"
                    name="minus"
                    style={{ color: "white" }}
                  />{" "}
                </Text>
              </Button>
        
          </CardItem>
        </Card>

        <Card>
          <CardItem header bordered style={{}}>
            <Left>
              <Text style={{ color:'red', fontWeight: "600" }}>
                {" "}
                Delete Medicine{" "}
              </Text>
            </Left>
            <Right style={{ flex: 0.4 }}>
              <Button
                style={{ backgroundColor: "#FF6969" }}
                onPress={showDeleteAlert}
              >
                <Text style={{ fontWeight: "700" }}>
                  {" "}
                  <Icon
                    type="MaterialIcons"
                    name="delete"
                    style={{ color: "white" }}
                  />{" "}
                </Text>
              </Button>
            </Right>
          </CardItem>
        </Card>
      </Content>} 
      {file.supplimentName &&
      <Content padder style={{ marginTop: 50 }}>
          <Card style={{alignItems:'center',padding:10,backgroundColor:'#A0C770',borderRadius:10}}>
              <CardItem style={{backgroundColor:'#A0C770'}}><Text style={{fontWeight:'800',fontSize:20,color:'white'}}>Suppliment Details</Text></CardItem>
          </Card>
        <Card>
          <CardItem header bordered>
            <Text>Suppliment Name : {file.supplimentName}</Text>
          </CardItem>
          <CardItem header bordered>
            <Text>Starting Time : {file.startingTime}</Text>
          </CardItem>
          <CardItem header bordered>
            <Text>Howmany Times a Day : {file.howmanyTimes}</Text>
          </CardItem>

          <CardItem header bordered>
            <Text>Next Medication Time : {}</Text>
          </CardItem>
        </Card>
        <Card>
          <CardItem header bordered style={{}}>
            
              <Text style={{  fontWeight: "600" }}>
                Howmany Medicine Left{"   "}
              </Text>
              <Button style={{marginRight:21,marginLeft:10}} ><Text style={{ color: "white", fontSize: 30 }}>{file.left}</Text></Button>
             
           
          
              <Button primary style={{ backgroundColor: "#FFBA00" }}>
                <Text style={{ fontWeight: "700" }} onPress={showAlert}>
                  {" "}
                  <Icon
                    type="Entypo"
                    name="minus"
                    style={{ color: "white" }}
                  />{" "}
                </Text>
              </Button>
        
          </CardItem>
        </Card>

        <Card>
          <CardItem header bordered style={{}}>
            <Left>
              <Text style={{ color:'red', fontWeight: "600" }}>
                {" "}
                Delete Suppliment{" "}
              </Text>
            </Left>
            <Right style={{ flex: 0.4 }}>
              <Button
                style={{ backgroundColor: "#FF6969" }}
                onPress={showDeleteAlert}
              >
                <Text style={{ fontWeight: "700" }}>
                  {" "}
                  <Icon
                    type="MaterialIcons"
                    name="delete"
                    style={{ color: "white" }}
                  />{" "}
                </Text>
              </Button>
            </Right>
          </CardItem>
        </Card>
      </Content>} 
    </Container>
  );
};
export default SingleMedView;
