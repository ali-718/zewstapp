import React, { useState } from "react";
import { View, Image, TouchableOpacity, FlatList } from "react-native";
import { MainScreenContainer } from "../../../MainScreenContainers";
import leftImage from "../../../../assets/images/backIcon.png";
import rightImage from "../../../../assets/images/editIcon.png";
import dollarBill from "../../../../assets/images/dollarBill.png";
import switchOn from "../../../../assets/images/switchOn.png";
import switchOff from "../../../../assets/images/switchOff.png";
import check from "../../../../assets/images/check.png";
import dash from "../../../../assets/images/dash.png";
import placeholder from "../../../../assets/images/placeholderImage.jpeg";
import { Text } from "../../../../components/Text/Text";
import { grayTextColor, primaryColor } from "../../../../theme/colors";
import { IconBox } from "../../../../components/IconBox/IconBox";
import { useNavigation } from "@react-navigation/native";
import {
  addonsList,
  allergensList,
  categoriesList,
  days,
  HEIGHT,
} from "../../../../helpers/utlils";

export const FoodDetailPage = ({ changeAvailability, ...props }) => {
  const navigation = useNavigation();
  const { image, name, available: av, desc } = props.route.params.item;

  const [available, setavailable] = useState(av);

  return (
    <MainScreenContainer
      leftImage={leftImage}
      rightImage={rightImage}
      title={name}
      onPressRight={() =>
        navigation.navigate("addMeal", {
          data: {
            ...props.route.params.item,
            categories: categoriesList,
            allergens: allergensList,
            addons: addonsList,
            days: days,
          },
        })
      }
    >
      <View style={{ width: "100%", flex: 1, alignItems: "center" }}>
        <Image
          style={{ width: "100%", height: HEIGHT > 1000 ? 400 : 250 }}
          source={image ? { uri: image } : placeholder}
        />
        <View
          style={{
            width: "90%",
            flex: 1,
            alignItems: "center",
            marginVertical: 20,
            marginBottom: 40,
          }}
        >
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 22,
                color: "black",
                fontFamily: "openSans_semiBold",
                width: "70%",
              }}
            >
              {name}
            </Text>

            <View
              style={{
                paddingHorizontal: 10,
                borderColor: available ? primaryColor : grayTextColor,
                borderWidth: 1,
                borderRadius: 50,
                height: 25,
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: available ? primaryColor : grayTextColor,
                  fontSize: 14,
                  fontFamily: "openSans_bold",
                }}
              >
                {available ? "Available" : "Hidden"}
              </Text>
            </View>
          </View>

          <View style={{ width: "100%", marginTop: 10 }}>
            <Text
              style={{
                color: grayTextColor,
                fontSize: 16,
              }}
            >
              {desc}
            </Text>
          </View>

          <View style={{ width: "100%", marginTop: 20 }}>
            <Text
              style={{
                color: grayTextColor,
                fontSize: 16,
                textTransform: "uppercase",
                fontFamily: "openSans_bold",
                marginLeft: 5,
              }}
            >
              Numbers
            </Text>

            <View
              style={{
                width: "100%",
                marginTop: 20,
                backgroundColor: "white",
                borderRadius: 10,
                padding: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <Text
                  style={{
                    color: "black",
                    fontSize: 16,
                    fontFamily: "openSans_bold",
                  }}
                >
                  Cash Incentives Per Unit
                </Text>
                <Text
                  style={{
                    color: primaryColor,
                    fontSize: 28,
                    fontFamily: "openSans_bold",
                  }}
                >
                  $1.49
                </Text>
              </View>

              <Image
                source={dollarBill}
                style={{ width: 50, height: 40, resizeMode: "contain" }}
              />
            </View>

            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  width: "48%",
                  marginTop: 10,
                  backgroundColor: "white",
                  borderRadius: 10,
                  padding: 10,
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontSize: 16,
                    fontFamily: "openSans_bold",
                  }}
                >
                  Unit Cost
                </Text>
                <Text
                  style={{
                    color: primaryColor,
                    fontSize: 28,
                    fontFamily: "openSans_bold",
                  }}
                >
                  $8.49
                </Text>
              </View>
              <View
                style={{
                  width: "48%",
                  marginTop: 10,
                  backgroundColor: "white",
                  borderRadius: 10,
                  padding: 10,
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontSize: 16,
                    fontFamily: "openSans_bold",
                  }}
                >
                  Tax Refunds
                </Text>
                <Text
                  style={{
                    color: primaryColor,
                    fontSize: 28,
                    fontFamily: "openSans_bold",
                  }}
                >
                  $2.49
                </Text>
              </View>
            </View>

            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  width: "48%",
                  marginTop: 10,
                  backgroundColor: "white",
                  borderRadius: 10,
                  padding: 10,
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontSize: 16,
                    fontFamily: "openSans_bold",
                  }}
                >
                  Total orders
                </Text>
                <Text
                  style={{
                    color: primaryColor,
                    fontSize: 28,
                    fontFamily: "openSans_bold",
                  }}
                >
                  34
                </Text>
              </View>
              <View
                style={{
                  width: "48%",
                  marginTop: 10,
                  backgroundColor: "white",
                  borderRadius: 10,
                  padding: 10,
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontSize: 16,
                    fontFamily: "openSans_bold",
                  }}
                >
                  Rating
                </Text>
                <Text
                  style={{
                    color: primaryColor,
                    fontSize: 28,
                    fontFamily: "openSans_bold",
                  }}
                >
                  4.1
                </Text>
              </View>
            </View>

            <View style={{ width: "100%", marginTop: 20 }}>
              <Text
                style={{
                  color: grayTextColor,
                  fontSize: 16,
                  textTransform: "uppercase",
                  fontFamily: "openSans_bold",
                  marginLeft: 5,
                }}
              >
                Availaibility
              </Text>

              <View
                style={{
                  width: "100%",
                  marginTop: 10,
                  backgroundColor: "white",
                  borderRadius: 10,
                  padding: 10,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity onPress={() => setavailable(!available)}>
                  <Image
                    source={available ? switchOn : switchOff}
                    style={{ width: 60, height: 40, resizeMode: "contain" }}
                  />
                </TouchableOpacity>

                <View style={{ marginLeft: 10 }}>
                  <Text
                    style={{
                      color: "black",
                      fontSize: 16,
                      fontFamily: "openSans_semiBold",
                    }}
                  >
                    {available ? "Available" : "Hidden"}
                  </Text>
                  <Text
                    style={{
                      color: grayTextColor,
                      fontSize: 14,
                    }}
                  >
                    Since May 4, 2021
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                width: "100%",
                marginTop: 10,
                backgroundColor: "white",
                borderRadius: 10,
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text style={{ color: "black" }}>M</Text>

                <Image
                  source={check}
                  style={{
                    width: 15,
                    height: 15,
                    resizeMode: "contain",
                    marginTop: 10,
                  }}
                />
              </View>

              <View style={{ alignItems: "center" }}>
                <Text style={{ color: "black" }}>T</Text>

                <Image
                  source={check}
                  style={{
                    width: 15,
                    height: 15,
                    resizeMode: "contain",
                    marginTop: 10,
                  }}
                />
              </View>

              <View style={{ alignItems: "center" }}>
                <Text style={{ color: "black" }}>W</Text>

                <Image
                  source={dash}
                  style={{
                    width: 15,
                    height: 15,
                    resizeMode: "contain",
                    marginTop: 10,
                  }}
                />
              </View>

              <View style={{ alignItems: "center" }}>
                <Text style={{ color: "black" }}>T</Text>

                <Image
                  source={dash}
                  style={{
                    width: 15,
                    height: 15,
                    resizeMode: "contain",
                    marginTop: 10,
                  }}
                />
              </View>

              <View style={{ alignItems: "center" }}>
                <Text style={{ color: "black" }}>F</Text>

                <Image
                  source={check}
                  style={{
                    width: 15,
                    height: 15,
                    resizeMode: "contain",
                    marginTop: 10,
                  }}
                />
              </View>

              <View style={{ alignItems: "center" }}>
                <Text style={{ color: "black" }}>S</Text>

                <Image
                  source={check}
                  style={{
                    width: 15,
                    height: 15,
                    resizeMode: "contain",
                    marginTop: 10,
                  }}
                />
              </View>

              <View style={{ alignItems: "center" }}>
                <Text style={{ color: "black" }}>S</Text>

                <Image
                  source={check}
                  style={{
                    width: 15,
                    height: 15,
                    resizeMode: "contain",
                    marginTop: 10,
                  }}
                />
              </View>
            </View>

            <View style={{ width: "100%", marginTop: 20 }}>
              <Text
                style={{
                  color: grayTextColor,
                  fontSize: 16,
                  textTransform: "uppercase",
                  fontFamily: "openSans_bold",
                  marginLeft: 5,
                }}
              >
                Categories
              </Text>

              <View
                style={{
                  width: "100%",
                  marginTop: 10,
                  backgroundColor: "white",
                  borderRadius: 10,
                  padding: 10,
                  paddingHorizontal: 20,
                }}
              >
                <FlatList
                  data={["Vegeterian", "Baked"]}
                  numColumns={2}
                  keyExtractor={(val) => val}
                  renderItem={({ item }, i) => (
                    <IconBox type={"categories"} text={item} />
                  )}
                  columnWrapperStyle={{ justifyContent: "space-between" }}
                />
              </View>
            </View>

            <View style={{ width: "100%", marginTop: 20 }}>
              <Text
                style={{
                  color: grayTextColor,
                  fontSize: 16,
                  textTransform: "uppercase",
                  fontFamily: "openSans_bold",
                  marginLeft: 5,
                }}
              >
                Allergens
              </Text>

              <View
                style={{
                  width: "100%",
                  marginTop: 10,
                  backgroundColor: "white",
                  borderRadius: 10,
                  padding: 10,
                  paddingHorizontal: 20,
                }}
              >
                <FlatList
                  data={["Lactose", "Gluten"]}
                  numColumns={2}
                  keyExtractor={(val) => val}
                  renderItem={({ item }, i) => (
                    <IconBox type={"allergens"} text={item} />
                  )}
                  columnWrapperStyle={{ justifyContent: "space-between" }}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </MainScreenContainer>
  );
};
