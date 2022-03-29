import { Image, ScrollView, TouchableOpacity, View } from "react-native";
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
import editGray from "../../../assets/images/editGray.png";
import placeholderImage from "../../../assets/images/food2.png";

const MealComponent = ({ meal, onPress, width }) => {
    return (
      <TouchableOpacity
        style={{
          borderRadius: 8,
          backgroundColor: "white",
          padding: 10,
          justifyContent: "space-between",
          alignItems: "center",
          borderWidth:1, borderColor:'rgba(196, 196, 196, 1)',
          ...(width && {width})
        }}
        onPress={onPress}
      >
        <Image
          source={meal?.mealMedia ? { uri: meal?.mealMedia } : placeholderImage}
          style={{ width: "100%", height: 50, resizeMode:'contain' }}
        />
        <Text
          style={{
            fontSize: 12,
            color: "black",
            textAlign: "center",
            marginTop: 10,
          }}
           numberOfLines={1}
        >
          {meal.mealName}
        </Text>
      </TouchableOpacity>
    );
  };


export const MakeADeal = () => {
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
                        zIndex: 8,
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
                            zIndex: 8,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 35,
                                color: primaryColor,
                                fontFamily: "openSans_semiBold",
                            }}
                        >
                            Make a deal
                        </Text>
                        <Text
                            style={{
                                fontSize: 25,
                                color: primaryColor,
                                fontFamily: "openSans_semiBold",
                                marginTop: 10,
                            }}
                        >
                            Previousely created deals
                        </Text>

                        <View style={{ width: "100%", marginTop: 23 }}>
                            <ScrollView style={{ width: "100%", maxHeight: 500 }}>
                                <View
                                    style={{
                                        width: "100%",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        flexWrap: "wrap",
                                        flexDirection: 'row'
                                    }}
                                >
                                    {[1, 2, 3, 4,5,6,6,5].map((item, i) => (
                                        <View
                                            style={{
                                                width: "49%",
                                                borderWidth: 1,
                                                borderRadius: 8,
                                                borderColor: primaryColor,
                                                padding: 15,
                                                marginTop: 20
                                            }}
                                        >
                                            <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <View style={{ flex: 0.9 }}>
                                                    <Text
                                                        style={{
                                                            fontSize: 18,
                                                            color: primaryColor,
                                                            fontFamily: "openSans_semiBold",

                                                        }}
                                                    >
                                                        Deal Title
                                                    </Text>
                                                    <Text
                                                        style={{
                                                            fontSize: 16,
                                                            fontFamily: "openSans_semiBold",

                                                        }}
                                                    >
                                                        Detail of the deal goes here
                                                    </Text>
                                                    <Text
                                                        style={{
                                                            fontSize: 14,
                                                            fontFamily: "openSans_semiBold",
                                                            color: 'rgba(128, 61, 34, 1)'
                                                        }}
                                                    >
                                                        Items in this deal
                                                    </Text>
                                                </View>

                                                <TouchableOpacity>
                                                    <Image source={editGray} style={{ width: 18, height: 18 }} />
                                                </TouchableOpacity>
                                            </View>

                                            <View style={{width: "100%", flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:20}}>
                                                {[1,2,3].map((meals,i) => <MealComponent width={"30%"} meal={{mealName:"ali haider is good" }} />)}
                                                </View>
                                        </View>
                                    ))}
                                </View>
                            </ScrollView>
                        </View>

                        <RegularButton
                            style={{ width: "100%", marginTop: 25 }}
                            text={"Make a new Deal"}
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
