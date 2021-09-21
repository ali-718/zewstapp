import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { carouselData, WIDTH } from "../../../helpers/utlils";
import {
  primaryColor,
  primaryShade1,
  primaryShade2,
  textColor,
} from "../../../theme/colors";
import logo from "../../../assets/images/logoWhite.png";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Text } from "../../../components/Text/Text";

export const OnBoardingPage = ({ inLogin = false }) => {
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);

  const _renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          width: "100%",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ width: "90%", flex: 1 }}>
          <Image
            style={{ width: "100%", height: 250, resizeMode: "contain" }}
            source={item.image}
          />

          <Text
            style={{
              color: "white",
              fontSize: 20,
              marginTop: 10,
              textAlign: "center",
              fontFamily: "openSans_regular",
            }}
          >
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={[primaryColor, primaryShade1]}
      style={{
        width: "100%",
        flex: 1,
        paddingTop: 50,
        alignItems: "center",
      }}
    >
      <SafeAreaView
        style={{
          width: "100%",
          flex: 1,
          paddingTop: StatusBar.currentHeight,
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "90%",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 20,
            }}
          >
            <Image
              style={{ width: 250, height: 50, resizeMode: "contain" }}
              source={logo}
            />
          </View>
          <View
            style={{
              width: "100%",

              paddingVertical: 20,
              alignItems: "center",
              justifyContent: "space-between",
              height: 450,
            }}
          >
            <Carousel
              onSnapToItem={(index) => setActiveIndex(index)}
              data={carouselData}
              renderItem={_renderItem}
              sliderWidth={inLogin ? WIDTH / 2 - 30 : WIDTH > 500 ? 500 : WIDTH}
              itemWidth={inLogin ? WIDTH / 2 - 30 : WIDTH > 500 ? 500 : WIDTH}
              style={{ maxWidth: 500, width: "100%" }}
              loop
            />
            <View style={{ marginTop: 20 }} />
            <Pagination
              dotsLength={carouselData.length}
              activeDotIndex={activeIndex}
              inactiveDotColor={primaryShade2}
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 4,
                marginHorizontal: 0,
              }}
              containerStyle={{ paddingVertical: 0, margin: 0 }}
              inactiveDotScale={1}
              dotColor={"rgba(210, 186, 233, 0.92)"}
              inactiveDotOpacity={0.5}
            />
          </View>
        </View>

        {!inLogin && (
          <View
            style={{
              width: "100%",
              marginTop: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={{
                width: "50%",
                padding: 15,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
              }}
              onPress={() => navigation.navigate("Signup")}
            >
              <Text
                style={{
                  color: textColor,
                  fontSize: 20,
                  fontWeight: "bold",
                  fontFamily: "openSans_bold",
                }}
              >
                Sign up
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "49.5%",
                padding: 15,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
              }}
              onPress={() => navigation.navigate("Login")}
            >
              <Text
                style={{
                  color: textColor,
                  fontSize: 20,
                  fontWeight: "bold",
                  fontFamily: "openSans_bold",
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};
