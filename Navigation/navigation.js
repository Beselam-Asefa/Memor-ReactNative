import * as React from "react";
import { AsyncStorage } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../views/Home";
import AddFeedScreen from "../views/addFeedsScreen";
import ProfileScreen from "../views/profileScreen";
import { Ionicons } from "@expo/vector-icons";
import WelcomeScreen from "../views/welcomeScreen";
import Login from "../views/loginScreen";
import MySpinner from "../views/spinnerLo";
import { AuthContext } from "../contexts/context";
import SingleMedView from "../views/singleMedicineView";

const MainStack = createStackNavigator();
const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();

// stack navifation for the welcome screen and login screen 
const stack = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerShown: false
        }}
      />
      <AuthStack.Screen
        name="LoginScr"
        component={Login}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: "#A0C770"
          }
        }}
      />
    </AuthStack.Navigator>
  );
};

// tab navigation between the botton tab components 
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "ios-home" : "ios-home";
          } else if (route.name === "Add") {
            iconName = focused
              ? "md-add-circle-outline"
              : "md-add-circle-outline";
          } else if (route.name === "Share") {
            iconName = focused ? "ios-people" : "ios-people";
          } else {
            iconName = focused ? "md-person" : "md-person";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        }
      })}
      tabBarOptions={{
        activeTintColor: "#72A82F",
        inactiveTintColor: "gray"
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Add" component={AddFeedScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// the main stack navigation which switch between the authentication screen and the Home screen which has a tab
// navigation 
const mainStackNav = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="tab" component={TabNavigator}   options={{
          title: "",
          headerStyle: {
            backgroundColor: "#A0C770",
            borderColor:'#A0C770',
            
          }
        }} />
      <MainStack.Screen name="single" component={SingleMedView}  options={{
          title: "Medication",
          headerStyle: {
            backgroundColor: "#A0C770",
            borderColor:'#A0C770'
            
          }
        }} />
    </MainStack.Navigator>
  );
};



const Navigator =  () => {
  const [isLoading, setLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState("");

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
        setUserToken(userToken);
      } catch (e) {
        // Restoring token failed
      }
    };

    bootstrapAsync();
    setLoading(false);
  }, []);


 
  // the value for the navigation context 
  const authContext =  React.useMemo( () => {
    
    return  {
      
      signIn: (userTokenn) => {
        setLoading(false);
        setUserToken(userTokenn);
      },
      signOut: () => {
        setLoading(false);
        setUserToken(null);
      }
    };
  }, []);

  if (isLoading) {
    return <MySpinner/>;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {userToken ? mainStackNav() : stack()}
      </NavigationContainer>
    </AuthContext.Provider>
  ); 
  }

export default Navigator;
