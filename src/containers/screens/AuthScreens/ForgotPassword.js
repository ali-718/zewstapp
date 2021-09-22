import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Input } from "../../../components/Inputs/Input";
import { AuthScreenContainer } from "../../AuthScreenContainer";
import { PasswordInput } from "../../../components/Inputs/PasswordInput";
import { RegularButton } from "../../../components/Buttons/RegularButton";
import { Text } from "../../../components/Text/Text";
import { primaryShade3 } from "../../../theme/colors";
import { useSelector } from "react-redux";
import { OnBoardingPage } from "./onBoardingPage";

export const ForgotPassword = (props) => {
  const orientation = useSelector((state) => state.system.orientation);
  const device = useSelector((state) => state.system.device);

  const [email, setEmail] = useState("");

  // if (device === "tablet") {
  //   return (
  //     <View
  //       style={{
  //         width: "100%",
  //         alignItems: "center",
  //         justifyContent: "center",
  //         flex: 1,
  //         flexDirection: "row",
  //       }}
  //     >
  //       <View
  //         style={{
  //           width: orientation === "landscape" ? "60%" : "50%",
  //           alignItems: "center",

  //           justifyContent: "center",
  //         }}
  //       >
  //         <OnBoardingPage inLogin />
  //       </View>
  //       <View
  //         style={{
  //           width: orientation === "landscape" ? "40%" : "50%",
  //           alignItems: "center",

  //           justifyContent: "center",
  //         }}
  //       >
  //         <AuthScreenContainer title={"Forgot Password"}>
  //           <View
  //             style={{ width: "90%", marginVertical: 20, marginBottom: 40 }}
  //           >
  //             <View style={{ width: "100%", marginTop: 20 }}>
  //               <Input
  //                 keyboardType={"email-address"}
  //                 placeholder={"Email address*"}
  //                 value={email}
  //                 onChangeText={(val) => setEmail(val)}
  //               />
  //             </View>

  //             <View style={{ width: "100%", marginTop: 20 }}>
  //               <RegularButton text={"Submit"} style={{ borderRadius: 50 }} />
  //             </View>

  //             <View
  //               style={{ width: "100%", marginTop: 20, alignItems: "center" }}
  //             >
  //               <TouchableOpacity
  //                 onPress={() => props.navigation.navigate("Login")}
  //               >
  //                 <Text
  //                   style={{
  //                     fontFamily: "openSans_bold",
  //                     fontSize: 18,
  //                     color: primaryShade3,
  //                   }}
  //                 >
  //                   Login
  //                 </Text>
  //               </TouchableOpacity>
  //             </View>
  //           </View>
  //         </AuthScreenContainer>
  //       </View>
  //     </View>
  //   );
  // }

  return (
    <AuthScreenContainer title={"Forgot Password"}>
      <View style={{ width: "90%", marginVertical: 20, marginBottom: 40 }}>
        <View style={{ width: "100%", marginTop: 20 }}>
          <Input
            keyboardType={"email-address"}
            placeholder={"Email address*"}
            value={email}
            onChangeText={(val) => setEmail(val)}
          />
        </View>

        <View style={{ width: "100%", marginTop: 20 }}>
          <RegularButton text={"Submit"} style={{ borderRadius: 50 }} />
        </View>

        <View style={{ width: "100%", marginTop: 20, alignItems: "center" }}>
          <TouchableOpacity onPress={() => props.navigation.navigate("Login")}>
            <Text
              style={{
                fontFamily: "openSans_bold",
                fontSize: 18,
                color: primaryShade3,
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </AuthScreenContainer>
  );
};
