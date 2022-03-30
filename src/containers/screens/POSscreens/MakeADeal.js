import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
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
import step1 from "../../../assets/images/step1.png";
import step2 from "../../../assets/images/step2.png";
import step3 from "../../../assets/images/step3.png";
import { SearchInput } from "../../../components/SearchInput/SearchInput";

const MealComponent = ({ meal, onPress, width }) => {
  return (
    <TouchableOpacity
      style={{
        borderRadius: 8,
        backgroundColor: "white",
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "rgba(196, 196, 196, 1)",
        ...(width && { width }),
      }}
      onPress={onPress}
    >
      <Image
        source={meal?.mealMedia ? { uri: meal?.mealMedia } : placeholderImage}
        style={{ width: "100%", height: 50, resizeMode: "contain" }}
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
  const [step, setStep] = useState("");
  const [search, setSearch] = useState("");

  const searchKeyword = (text) => {
    const keyword = text?.toLowerCase();
    const realData = [];
    // const realData = mealsToShow.filter(
    //   (item) => item.mealCategory === selectedCategory
    // );
    const finalData = realData.filter((item) =>
      item.mealName?.toLowerCase()?.includes(keyword)
    );

    setfilteredItems(finalData);
  };

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
              marginTop: 20,
              backgroundColor: "white",
              zIndex: 8,
              flex:0.9
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
              {step === ""
                ? "Previousely created deals"
                : "Select meal/food from the menu"}
            </Text>

            <View style={{ width: "100%", marginTop: 23,flex:1 }}>
              {step === "" ? (
                <ScrollView style={{ width: "100%", flex: 0.5 }}>
                  <View
                    style={{
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      flexDirection: "row",
                    }}
                  >
                    {[1, 2, 3, 4, 5, 6, 6, 5].map((item, i) => (
                      <View
                        style={{
                          width: "49%",
                          borderWidth: 1,
                          borderRadius: 8,
                          borderColor: primaryColor,
                          padding: 15,
                          marginTop: 20,
                        }}
                      >
                        <View
                          style={{
                            width: "100%",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
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
                                color: "rgba(128, 61, 34, 1)",
                              }}
                            >
                              Items in this deal
                            </Text>
                          </View>

                          <TouchableOpacity>
                            <Image
                              source={editGray}
                              style={{ width: 18, height: 18 }}
                            />
                          </TouchableOpacity>
                        </View>

                        <View
                          style={{
                            width: "100%",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginTop: 20,
                          }}
                        >
                          {[1, 2, 3].map((meals, i) => (
                            <MealComponent
                              width={"30%"}
                              meal={{ mealName: "ali haider is good" }}
                            />
                          ))}
                        </View>

                        <View
                          style={{
                            width: "100%",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                            marginTop: 20,
                          }}
                        >
                          <View style={{ alignItems: "center" }}>
                            <Text
                              style={{
                                fontSize: 10,
                              }}
                            >
                              Actual Price
                            </Text>
                            <Text
                              style={{
                                fontSize: 12,
                                color: primaryColor,
                              }}
                            >
                              $18.00
                            </Text>
                          </View>
                          <View style={{ alignItems: "center" }}>
                            <Text
                              style={{
                                fontSize: 10,
                              }}
                            >
                              Starting Date
                            </Text>
                            <Text
                              style={{
                                fontSize: 12,
                                color: primaryColor,
                              }}
                            >
                              03/22/2022
                            </Text>
                          </View>
                          <View style={{ alignItems: "center" }}>
                            <Text
                              style={{
                                fontSize: 10,
                              }}
                            >
                              Starting Time
                            </Text>
                            <Text
                              style={{
                                fontSize: 12,
                                color: primaryColor,
                              }}
                            >
                              5:00 am
                            </Text>
                          </View>
                        </View>
                      </View>
                    ))}
                  </View>
                </ScrollView>
              ) : (
                <View style={{ width: "100%", marginTop: -20 }}>
                  <SearchInput
                    search={search}
                    setSearch={setSearch}
                    searchKeyword={searchKeyword}
                    placeholder={"Search by Name"}
                  />

                  <View
                    style={{
                      width: "100%",
                      marginTop: 20,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        padding: 10,
                        paddingHorizontal: 15,
                        borderWidth: 2,
                        borderRadius: 12,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        maxWidth: '30%',
                        flex: 1,
                        height: "100%"
                      }}
                    >
                      <Image source={step1} style={{ width: 20, height: 31, resizeMode:'contain' }} />

                      <View style={{ marginLeft: 16 }}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: "openSans_semiBold",
                          }}
                        >
                          Step 01
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                          }}
                        >
                          Select the item/food
                        </Text>
                      </View>
                    </View>
                    
                    <View
                      style={{
                        padding: 10,
                        paddingHorizontal: 15,
                        borderWidth: 2,
                        borderRadius: 12,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft:16,
                        opacity: step >= 2 ? 1 : 0.5,
                        maxWidth: '30%',
                        flex: 1,
                        height: "100%"
                      }}
                    >
                      <Image source={step2} style={{ width: 25, height: 25, resizeMode:'contain', ...(step < 2 && {tintColor: 'gray'}) }} />

                      <View style={{ marginLeft: 10 }}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: "openSans_semiBold",
                          }}
                        >
                          Step 02
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                          }}
                        >
                          Select the item/food
                        </Text>
                      </View>
                    </View>
                   
                    <View
                      style={{
                        padding: 10,
                        paddingHorizontal: 15,
                        borderWidth: 2,
                        borderRadius: 12,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft:16,
                        opacity: step >= 3 ? 1 : 0.5,
                        maxWidth: '30%',
                        flex: 1,
                        height: "100%"
                      }}
                    >
                      <Image source={step3} style={{ width: 25, height: 25, resizeMode:'contain', ...(step < 3 && {tintColor: 'gray'}) }} />

                      <View style={{ marginLeft: 10 }}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: "openSans_semiBold",
                          }}
                        >
                          Step 03
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                          }}
                        >
                          Set price and deal dates
                        </Text>
                      </View>
                    </View>
                
                  </View>
                </View>
              )}
            </View>

            <RegularButton
              onPress={() => setStep(0)}
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
