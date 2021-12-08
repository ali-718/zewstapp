import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
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
  WIDTH,
} from "../../../../helpers/utlils";
import { HeadingBox } from "../../../../components/HeadingBox/HeadingBox";

export const FoodDetailPage = ({
  changeAvailability,
  isTab,
  data = {},
  ...props
}) => {
  const navigation = useNavigation();
  const {
    mealMedia: image,
    mealName: name,
    mealAvailability: av,
    mealDescription: desc,
    mealPrice: price,
    mealDaysAvailable,
    mealCategory,
    mealAllergens,
    mealAddons,
  } = isTab ? data : props.route.params.item;

  const [available, setavailable] = useState(av);

  return (
    <MainScreenContainer>
      <HeadingBox heading={name} />
      <View style={{ width: "100%", flex: 1, alignItems: "center" }}>
        <Image
          style={{
            width: "100%",
            height: WIDTH > 600 ? 400 : 250,
            resizeMode: "contain",
          }}
          source={image ? { uri: image[0] } : dash}
        />
        {console.log(image)}
        {console.log(mealCategory)}
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
                  ${price}
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

                {mealDaysAvailable.find((item) => item === "Monday") ? (
                  <Image
                    source={check}
                    style={{
                      width: 15,
                      height: 15,
                      resizeMode: "contain",
                      marginTop: 10,
                    }}
                  />
                ) : (
                  <Image
                    source={dash}
                    style={{
                      width: 15,
                      height: 15,
                      resizeMode: "contain",
                      marginTop: 10,
                    }}
                  />
                )}
              </View>

              <View style={{ alignItems: "center" }}>
                <Text style={{ color: "black" }}>T</Text>

                {mealDaysAvailable.find((item) => item === "Tuesday") ? (
                  <Image
                    source={check}
                    style={{
                      width: 15,
                      height: 15,
                      resizeMode: "contain",
                      marginTop: 10,
                    }}
                  />
                ) : (
                  <Image
                    source={dash}
                    style={{
                      width: 15,
                      height: 15,
                      resizeMode: "contain",
                      marginTop: 10,
                    }}
                  />
                )}
              </View>

              <View style={{ alignItems: "center" }}>
                <Text style={{ color: "black" }}>W</Text>

                {mealDaysAvailable.find((item) => item === "Wednesday") ? (
                  <Image
                    source={check}
                    style={{
                      width: 15,
                      height: 15,
                      resizeMode: "contain",
                      marginTop: 10,
                    }}
                  />
                ) : (
                  <Image
                    source={dash}
                    style={{
                      width: 15,
                      height: 15,
                      resizeMode: "contain",
                      marginTop: 10,
                    }}
                  />
                )}
              </View>

              <View style={{ alignItems: "center" }}>
                <Text style={{ color: "black" }}>T</Text>

                {mealDaysAvailable.find((item) => item === "Thursday") ? (
                  <Image
                    source={check}
                    style={{
                      width: 15,
                      height: 15,
                      resizeMode: "contain",
                      marginTop: 10,
                    }}
                  />
                ) : (
                  <Image
                    source={dash}
                    style={{
                      width: 15,
                      height: 15,
                      resizeMode: "contain",
                      marginTop: 10,
                    }}
                  />
                )}
              </View>

              <View style={{ alignItems: "center" }}>
                <Text style={{ color: "black" }}>F</Text>

                {mealDaysAvailable.find((item) => item === "Friday") ? (
                  <Image
                    source={check}
                    style={{
                      width: 15,
                      height: 15,
                      resizeMode: "contain",
                      marginTop: 10,
                    }}
                  />
                ) : (
                  <Image
                    source={dash}
                    style={{
                      width: 15,
                      height: 15,
                      resizeMode: "contain",
                      marginTop: 10,
                    }}
                  />
                )}
              </View>

              <View style={{ alignItems: "center" }}>
                <Text style={{ color: "black" }}>S</Text>

                {mealDaysAvailable.find((item) => item === "Saturday") ? (
                  <Image
                    source={check}
                    style={{
                      width: 15,
                      height: 15,
                      resizeMode: "contain",
                      marginTop: 10,
                    }}
                  />
                ) : (
                  <Image
                    source={dash}
                    style={{
                      width: 15,
                      height: 15,
                      resizeMode: "contain",
                      marginTop: 10,
                    }}
                  />
                )}
              </View>

              <View style={{ alignItems: "center" }}>
                <Text style={{ color: "black" }}>S</Text>
                {mealDaysAvailable.find((item) => item === "Sunday") ? (
                  <Image
                    source={check}
                    style={{
                      width: 15,
                      height: 15,
                      resizeMode: "contain",
                      marginTop: 10,
                    }}
                  />
                ) : (
                  <Image
                    source={dash}
                    style={{
                      width: 15,
                      height: 15,
                      resizeMode: "contain",
                      marginTop: 10,
                    }}
                  />
                )}
              </View>
            </View>

            {mealCategory.length > 0 && (
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
                  <Text style={{ marginLeft: 10, fontSize: 16 }}>
                    {mealCategory}
                  </Text>
                </View>
              </View>
            )}

            {mealAllergens.length > 0 && (
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
                    data={mealAllergens}
                    numColumns={2}
                    keyExtractor={(val) => val}
                    renderItem={({ item }, i) => (
                      <IconBox type={"allergens"} text={item} />
                    )}
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                  />
                </View>
              </View>
            )}

            {mealAddons.length > 0 && (
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
                  Addons
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
                    data={mealAddons}
                    numColumns={2}
                    keyExtractor={(val) => val}
                    renderItem={({ item }, i) => (
                      <IconBox type={"addons"} text={item} />
                    )}
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                  />
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    </MainScreenContainer>
  );
};
