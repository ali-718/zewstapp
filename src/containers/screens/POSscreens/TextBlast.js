import { Image, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { MainScreenContainer } from "../../MainScreenContainers";
import { primaryColor } from "../../../theme/colors";
import { Text } from "../../../components/Text/Text";
import { HeadingBox } from "../../../components/HeadingBox/HeadingBox";
import { Input } from "../../../components/Inputs/Input";
import { RegularButton } from "../../../components/Buttons/RegularButton";
import Pizza from "../../../assets/images/pizza.png";
import salad from "../../../assets/images/salad.png";
import burger from "../../../assets/images/burger.png";

export const TextBlast = () => {
  const navigation = useNavigation();

  return (
    <View style={{ width: "100%", flex: 1 }}>
      <MainScreenContainer isDrawer shortDrawer noScroll>
        <View
          style={{
            width: "100%",
            paddingHorizontal: 30,
          }}
        >
          <HeadingBox noScroll heading={""} />
        </View>

        <View
          style={{
            width: "100%",
            flex: 1,
            backgroundColor: "#fbfafb",
            paddingHorizontal: 20,
            alignItems: "center",
            zIndex:8
          }}
        >
          <View
            style={{
              width: "95%",
              borderRadius: 20,
              borderWidth: 1,
              borderColor: primaryColor,
              padding: 30,
              marginTop: 50,
              backgroundColor: "white",
              zIndex:8
            }}
          >
            <Text
              style={{
                fontSize: 30,
                color: primaryColor,
                fontFamily: "openSans_semiBold",
              }}
            >
              Text Blast
            </Text>

            <Text
              style={{
                color: "#0B0410",
                fontFamily: "openSans_semiBold",
                fontSize: 20,
                marginTop: 80,
              }}
            >
              Send Message
            </Text>

            <Input
              placeholder={"Current Delivery address"}
              setValue={(val) => null}
              value={""}
              style={{
                marginTop: 20,
                borderRadius: 0,
                borderWidth: 2,
                borderColor: primaryColor,
                borderRadius: 8,
                borderBottomWidth: 2,
              }}
              textarea={true}
            />

            <RegularButton
              style={{ width: "100%", marginTop: 25 }}
              text={"send message"}
            />
          </View>

          <Image
          source={Pizza}
          style={{
            position: "absolute",
            zIndex: 6,
            width: 356,
            height: 476,
            resizeMode: "contain",
            top: -150,
            alignSelf: "center",
            right: -20,
          }}
        />

          <Image
          source={salad}
          style={{
            position: "absolute",
            zIndex: 6,
            width: 436,
            height: 676,
            resizeMode: "contain",
            bottom: -150,
            alignSelf: "center",
            right: -20,
          }}
        />

          <Image
          source={burger}
          style={{
            position: "absolute",
            zIndex: 6,
            width: 206,
            height: 276,
            resizeMode: "contain",
            bottom: -110,
            alignSelf: "center",
            left: 0,
          }}
        />
        </View>
       
      </MainScreenContainer>
      
    </View>
  );
};
