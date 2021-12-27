import React, { useRef, useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { carouselData, WIDTH } from "../../../helpers/utlils";
import { primaryColor, grayTextColor, textColor } from "../../../theme/colors";
import logo from "../../../assets/images/logoPurple.png";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Text } from "../../../components/Text/Text";
import { useSelector } from "react-redux";
import { RegularButton } from "../../../components/Buttons/RegularButton";

export const OnBoardingPage = ({ inLogin = false }) => {
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  const device = useSelector((state) => state.system.device);
  const orientation = useSelector((state) => state.system.orientation);
  const carouselRef = useRef();

  const changeCarousel = () => {
    if (activeIndex === 2) {
      navigation.navigate("Signup");
      return;
    }
    setActiveIndex(activeIndex + 1);
    carouselRef.current.snapToNext();
  };

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
        <View
          style={{
            width: "90%",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{
              width: "100%",
              height:
                device === "tablet"
                  ? orientation === "portrait"
                    ? 400
                    : 250
                  : 250,
              resizeMode: "contain",
            }}
            source={item.image}
          />

          <Text
            style={{
              color: "black",
              fontSize: device === "tablet" ? 30 : 25,
              marginTop: 20,
              textAlign: "center",
              fontFamily: "openSans_bold",
            }}
          >
            {item.heading}
          </Text>

          <Text
            style={{
              color: "black",
              fontSize: 18,
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
      colors={["white", "white"]}
      style={{
        width: "100%",
        flex: 1,
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
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: 16,
          }}
        >
          <View
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: orientation === "portrait" ? 0 : 20,
              height: device === "tablet" ? 200 : 100,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flex:
                  device === "tablet"
                    ? orientation === "portrait"
                      ? 0.65
                      : 0.65
                    : 0.7,
                alignItems: "flex-end",
              }}
            >
              <Image
                style={{
                  width: device === "tablet" ? 250 : 150,
                  resizeMode: "contain",
                }}
                source={logo}
              />
            </View>
            <View
              style={{
                flex:
                  device === "tablet"
                    ? orientation === "portrait"
                      ? 0.35
                      : 0.4
                    : 0.3,
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                <Text
                  style={{
                    textTransform: "uppercase",
                    color: primaryColor,
                    fontSize: device === "tablet" ? 20 : 18,
                  }}
                >
                  Skip
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={[
              {
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
                flex: 1,
                marginTop: orientation === "portrait" ? 20 : 0,
              },
              device === "tablet"
                ? {
                    maxWidth: 400,
                  }
                : {},
            ]}
          >
            <Carousel
              ref={carouselRef}
              onSnapToItem={(index) => setActiveIndex(index)}
              data={carouselData}
              renderItem={_renderItem}
              sliderWidth={inLogin ? WIDTH / 2 - 30 : WIDTH > 500 ? 500 : WIDTH}
              itemWidth={inLogin ? WIDTH / 2 - 30 : WIDTH > 500 ? 500 : WIDTH}
              style={{
                maxWidth: 400,
                width: "100%",
              }}
            />
            <View style={{ marginTop: 32 }} />
            <Pagination
              dotsLength={carouselData.length}
              activeDotIndex={activeIndex}
              inactiveDotColor={grayTextColor}
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 100,
                marginHorizontal: 0,
              }}
              containerStyle={{ paddingVertical: 0, margin: 0 }}
              inactiveDotScale={1}
              dotColor={primaryColor}
              inactiveDotOpacity={0.5}
            />

            <RegularButton
              onPress={changeCarousel}
              text={activeIndex === 2 ? "GET STARTED" : "NEXT"}
              style={{ borderRadius: 10, width: "100%", marginVertical: 22 }}
              colors={[primaryColor, primaryColor]}
            />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};
