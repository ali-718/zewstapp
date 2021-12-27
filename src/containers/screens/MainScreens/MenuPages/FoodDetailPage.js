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
import {
  grayBorderColor,
  grayTextColor,
  menuItemPriceBorder,
  primaryColor,
} from "../../../../theme/colors";
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
import { useSelector } from "react-redux";
import { RegularButton } from "../../../../components/Buttons/RegularButton";

export const FoodDetailPage = ({
  changeAvailability,
  isTab,
  data = {},
  ...props
}) => {
  const navigation = useNavigation();
  const device = useSelector((state) => state.system.device);
  const {
    mealMedia: image,
    mealName: name,
    mealAvailability: av,
    mealDescription: desc,
    mealTotalUnitCost: price,
    mealPrice,
    mealDaysAvailable,
    mealCategory,
    mealAllergens,
    mealAddons,
    orderedNumber = "",
    taxPrice: priceWithtax = "",
    profitPrice = "",
    ratings = "",
  } = isTab ? data : props.route.params.item;

  console.log(props.route.params.item);

  const [available, setavailable] = useState(av);

  const PriceBox = ({ heading, price, noPrice }) => (
    <View
      style={{
        width: "48%",
        marginTop: 10,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: menuItemPriceBorder,
        paddingHorizontal: 20,
      }}
    >
      <Text
        style={{
          color: "black",
          fontSize: 16,
          fontFamily: "openSans_bold",
        }}
      >
        {heading}
      </Text>
      <Text
        style={{
          color: primaryColor,
          fontSize: 28,
          fontFamily: "openSans_bold",
        }}
      >
        {noPrice ? null : <Text>$</Text>}
        {price}
      </Text>
    </View>
  );

  return (
    <MainScreenContainer>
      <View style={{ width: "95%", alignItems: "center", marginTop: 10 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <View style={{ flex: 1 }}>
            <HeadingBox heading={name} />
          </View>

          <RegularButton
            onPress={() =>
              navigation.navigate("addMeal", {
                data: props.route.params.item,
              })
            }
            style={{ width: 250, right: 0, marginTop: 10 }}
            white
            text={"Edit menu item"}
          />
        </View>
      </View>
      <View
        style={{ width: "100%", flex: 1, alignItems: "center", marginTop: 20 }}
      >
        <Image
          style={{
            width: "100%",
            height: WIDTH > 600 ? 400 : 250,
            resizeMode: "contain",
          }}
          source={image ? { uri: image[0] } : placeholder}
        />
        <View
          style={{
            width: "90%",
            flex: 1,
            alignItems: "center",
            marginVertical: 20,
            marginBottom: 40,
            backgroundColor: "white",
            padding: 20,
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
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <PriceBox heading={"Unit Cost"} price={price} />
              <PriceBox heading={"Menu Price"} price={mealPrice} />
            </View>

            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <PriceBox heading={"Price with Tax"} price={priceWithtax} />
              <PriceBox heading={"Profit"} price={profitPrice} />
            </View>

            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <PriceBox
                noPrice
                heading={"Total orders"}
                price={orderedNumber}
              />
              <PriceBox noPrice heading={"Rating"} price={ratings} />
            </View>

            {mealCategory?.length > 0 && (
              <View style={{ width: "100%", marginTop: 20 }}>
                <Text
                  style={{
                    color: grayTextColor,
                    fontSize: 16,
                    textTransform: "uppercase",
                    fontFamily: "openSans_bold",
                  }}
                >
                  Category
                </Text>

                <View
                  style={{
                    width: "100%",
                    marginTop: 10,
                    backgroundColor: "white",
                    borderRadius: 10,
                  }}
                >
                  <Text style={{ fontSize: 16 }}>{mealCategory}</Text>
                </View>
              </View>
            )}

            {mealAllergens?.length > 0 && (
              <View style={{ width: "100%", marginTop: 20 }}>
                <Text
                  style={{
                    color: grayTextColor,
                    fontSize: 16,
                    textTransform: "uppercase",
                    fontFamily: "openSans_bold",
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
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {mealAllergens.map((item, i) => (
                    <Text style={{ fontSize: 16, color: "black" }}>
                      {item}
                      {mealAllergens?.length - 1 === i ? null : ","}
                    </Text>
                  ))}
                </View>
              </View>
            )}

            {mealAddons?.length > 0 && (
              <View style={{ width: "100%", marginTop: 20 }}>
                <Text
                  style={{
                    color: grayTextColor,
                    fontSize: 16,
                    textTransform: "uppercase",
                    fontFamily: "openSans_bold",
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
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {mealAddons.map((item, i) => (
                    <Text style={{ fontSize: 16, color: "black" }}>
                      {item}
                      {mealAddons?.length - 1 === i ? null : ","}
                    </Text>
                  ))}
                </View>
              </View>
            )}
            <View
              style={{
                width: "100%",
                flexDirection: device === "tablet" ? "row" : "column",
                justifyContent: "center",
              }}
            >
              <View style={{ flex: 1, marginTop: 40 }}>
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
                  <TouchableOpacity onPress={() => null}>
                    <Image
                      source={available ? switchOn : switchOff}
                      style={{ width: 60, height: 40, resizeMode: "contain" }}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{
                  flex: 1,
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

                  {mealDaysAvailable?.find((item) => item === "Monday") ? (
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

                  {mealDaysAvailable?.find((item) => item === "Tuesday") ? (
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

                  {mealDaysAvailable?.find((item) => item === "Wednesday") ? (
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

                  {mealDaysAvailable?.find((item) => item === "Thursday") ? (
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

                  {mealDaysAvailable?.find((item) => item === "Friday") ? (
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

                  {mealDaysAvailable?.find((item) => item === "Saturday") ? (
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
                  {mealDaysAvailable?.find((item) => item === "Sunday") ? (
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
            </View>
          </View>
        </View>
      </View>
    </MainScreenContainer>
  );
};
