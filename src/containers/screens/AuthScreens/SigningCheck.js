import { Spinner } from "native-base";
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { primaryShade1 } from "../../../theme/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import { useDispatch } from "react-redux";
import {
  loginActionOther,
  refreshTokenAction,
} from "../../../Redux/actions/AuthActions/authActions";
import { USER } from "../../../Redux/actions/AuthActions/Types";

export const SigningCheck = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const getData = async () => {
    const user = await AsyncStorage.getItem("user");

    // AsyncStorage.clear();
    // AsyncStorage.removeItem("refreshToken");
    // AsyncStorage.removeItem("defaultLocation");
    if (user) {
      const data = JSON.parse(user);
      console.log(data);
      if (data?.user?.pin) {
        loginActionOther({ pin: data?.user?.pin })
          .then((res) => {
            dispatch({ type: USER, payload: { user: res } });
          })
          .catch((e) => {
            navigation.navigate("Signup");
          });

        return;
      }

      dispatch({ type: USER, payload: data });
      return;
    }

    navigation.navigate("Signup");
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View
      style={{
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spinner size={"large"} color={primaryShade1} />
      <Text style={{ marginTop: 20 }}>Checking status</Text>
    </View>
  );
};
