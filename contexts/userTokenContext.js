/* eslint-disable max-len */

/* import React, { useState } from "react";
import { AsyncStorage } from "react-native";
import PropTypes from "prop-types";

const TokenContext = React.createContext([{}, () => {}]);
const GetToken = async () => {
  const userToken = await AsyncStorage.getItem("userToken");
  console.log("token", userToken);
  return userToken;
};

const TokenProvider = props => {
  const token = GetToken();
  const [userToken, setUserToken] = useState(token);
  useEffect(() => {
    GetToken();
  }, []);
  return (
    <TokenContext.Provider value={[userToken, setUserToken]}>
      {props.children}
    </TokenContext.Provider>
  );
};

export { TokenContext, TokenProvider };
 */