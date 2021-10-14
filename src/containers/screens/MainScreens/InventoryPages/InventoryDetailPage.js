import React from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { grayColor } from "../../../../theme/colors";
import { MainScreenContainer } from "../../../MainScreenContainers";
import purpleEditIcon from "../../../../assets/images/purpleEditIcon.png";
import { Text } from "../../../../components/Text/Text";
import { useSelector } from "react-redux";
import { Input } from "../../../../components/Inputs/Input";
import { useNavigation } from "@react-navigation/core";
import { inventoryAvailibility } from "../../../../helpers/utlils";

export const InventoryDetailPage = ({ data, isTab, ...props }) => {
  const {
    itemName,
    brand,
    quantity,
    units: unit,
    purchaseDate: dateOfPurchase,
    expiryDate: dateOfExpiry,
    color,
    costPerUnit,
    threshold,
    category,
    photos,
    notes,
    availability,
  } = isTab ? data : props?.route?.params?.data;
  const device = useSelector((state) => state.system.device);
  const navigation = useNavigation();

  if (isTab) {
    return (
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: "95%",
              flex: 1,
              alignItems: "center",
              backgroundColor: "white",
              marginVertical: 20,
              borderRadius: 10,
              paddingBottom: 20,
              marginBottom: 80,
            }}
          >
            <View
              style={{
                width: "95%",
                paddingTop: 10,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  borderColor: grayColor,
                  borderBottomWidth: 2,
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingRight: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 22,
                    color: "black",
                    fontFamily: "openSans_bold",
                    flex: 0.9,
                  }}
                  numberOfLines={1}
                >
                  {itemName}
                </Text>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("inventoryAdd", {
                      data: data ? data : props?.route?.params?.data,
                    })
                  }
                >
                  <Image
                    source={purpleEditIcon}
                    style={{
                      width: device === "tablet" ? 30 : 20,
                      resizeMode: "contain",
                    }}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{ width: "95%", flexDirection: "column", marginTop: 20 }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: "black",
                    fontFamily: "openSans_bold",
                  }}
                >
                  Inventory Details
                </Text>

                <View
                  style={{
                    width: "100%",
                    flexDirection: device === "tablet" ? "row" : "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Input
                    placeholder={"Brand"}
                    value={brand}
                    setValue={(val) => setBrand(val)}
                    style={{
                      marginTop: 10,
                      borderRadius: 0,
                      flex: device === "tablet" ? 0.3 : 1,
                      borderColor: grayColor,
                      borderBottomWidth: 2,
                    }}
                    editable={false}
                  />
                  <Input
                    keyboardType={"number-pad"}
                    placeholder={"Quantity"}
                    value={`${quantity}`}
                    setValue={(val) => setQuantity(val)}
                    style={{
                      marginTop: 10,
                      borderRadius: 0,
                      flex: device === "tablet" ? 0.3 : 1,
                      borderColor: grayColor,
                      borderBottomWidth: 2,
                    }}
                    editable={false}
                  />
                  <Input
                    placeholder={"Unit"}
                    value={unit}
                    setValue={(val) => setUnit(val)}
                    style={{
                      marginTop: 10,
                      borderRadius: 0,
                      flex: device === "tablet" ? 0.3 : 1,
                      borderColor: grayColor,
                      borderBottomWidth: 2,
                    }}
                    editable={false}
                  />
                </View>

                <View
                  style={{
                    width: "100%",
                    flexDirection: device === "tablet" ? "row" : "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                    zIndex: 10,
                  }}
                >
                  <Input
                    placeholder={"Date of Purchase"}
                    value={dateOfPurchase}
                    setValue={(val) => setDateOfPurchase(val)}
                    style={{
                      marginTop: 10,
                      borderRadius: 0,
                      flex: device === "tablet" ? 0.3 : 1,
                      borderColor: grayColor,
                      borderBottomWidth: 2,
                    }}
                    editable={false}
                  />
                  <Input
                    placeholder={"Date of Expiry"}
                    value={dateOfExpiry}
                    setValue={(val) => setDateOfExpiry(val)}
                    style={{
                      marginTop: 10,
                      borderRadius: 0,
                      flex: device === "tablet" ? 0.3 : 1,
                      borderColor: grayColor,
                      borderBottomWidth: 2,
                    }}
                    editable={false}
                  />
                  <Input
                    placeholder={"Color"}
                    value={color}
                    setValue={(val) => setDateOfExpiry(val)}
                    style={{
                      marginTop: 10,
                      borderRadius: 0,
                      flex: device === "tablet" ? 0.3 : 1,
                      borderColor: grayColor,
                      borderBottomWidth: 2,
                    }}
                    editable={false}
                  />
                </View>

                <View
                  style={{
                    width: "100%",
                    flexDirection: device === "tablet" ? "row" : "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                    zIndex: 10,
                  }}
                >
                  <Input
                    placeholder={"Cost Per Unit"}
                    value={`${costPerUnit}`}
                    setValue={(val) => setDateOfPurchase(val)}
                    style={{
                      marginTop: 10,
                      borderRadius: 0,
                      flex: device === "tablet" ? 0.3 : 1,
                      borderColor: grayColor,
                      borderBottomWidth: 2,
                    }}
                    editable={false}
                  />
                  <Input
                    placeholder={"Threshold"}
                    value={`${threshold}`}
                    setValue={(val) => setDateOfExpiry(val)}
                    style={{
                      marginTop: 10,
                      borderRadius: 0,
                      flex: device === "tablet" ? 0.3 : 1,
                      borderColor: grayColor,
                      borderBottomWidth: 2,
                    }}
                    editable={false}
                  />
                  <Input
                    placeholder={"Category"}
                    value={category}
                    setValue={(val) => setDateOfExpiry(val)}
                    style={{
                      marginTop: 10,
                      borderRadius: 0,
                      flex: device === "tablet" ? 0.3 : 1,
                      borderColor: grayColor,
                      borderBottomWidth: 2,
                    }}
                    editable={false}
                  />
                </View>

                <View style={{ width: "100%", zIndex: 0 }}>
                  <Input
                    placeholder={"Notes"}
                    value={notes}
                    setValue={(val) => setNotes(val)}
                    style={{
                      marginTop: 10,
                      borderRadius: 0,
                      borderColor: grayColor,
                      borderBottomWidth: 2,
                    }}
                    editable={false}
                  />
                </View>

                <View style={{ width: "100%", zIndex: 0 }}>
                  <Input
                    placeholder={"Availibility"}
                    value={
                      inventoryAvailibility.find(
                        (item) => item.value === availability
                      ).name
                    }
                    style={{
                      marginTop: 10,
                      borderRadius: 0,
                      borderColor: grayColor,
                      borderBottomWidth: 2,
                    }}
                    editable={false}
                  />
                </View>

                {photos.length > 0 && (
                  <View style={{ width: "100%", marginTop: 20 }}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: "black",
                        fontFamily: "openSans_bold",
                      }}
                    >
                      Photos
                    </Text>

                    <View
                      style={{
                        width: "100%",
                        flexWrap: "wrap",
                        marginTop: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent:
                          device === "tablet" ? "flex-start" : "space-between",
                      }}
                    >
                      {photos.map((item, i) => (
                        <View
                          key={i}
                          style={{
                            width: device === "tablet" ? 150 : 140,
                            height: device === "tablet" ? 150 : 140,
                            alignItems: "center",
                            justifyContent: "center",
                            borderWidth: 2,
                            borderColor: grayColor,
                            marginTop: 10,
                            marginLeft:
                              device === "tablet" ? (i === 0 ? 0 : 10) : 0,
                            overflow: "hidden",
                          }}
                        >
                          <Image
                            style={{
                              width: device === "tablet" ? 150 : 140,
                              height: device === "tablet" ? 150 : 140,
                              resizeMode: "contain",
                            }}
                            source={{ uri: item }}
                          />
                        </View>
                      ))}
                    </View>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <MainScreenContainer
      rightImage={""}
      title={"Inventory Item"}
      onPressRight={() => null}
    >
      <View
        style={{
          width: "95%",
          flex: 1,
          alignItems: "center",
          backgroundColor: "white",
          marginVertical: 20,
          borderRadius: 10,
          paddingBottom: 20,
          marginBottom: 30,
        }}
      >
        <View
          style={{
            width: "95%",
            paddingTop: 10,
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              borderColor: grayColor,
              borderBottomWidth: 2,
              justifyContent: "space-between",
              alignItems: "center",
              paddingRight: 10,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                color: "black",
                fontFamily: "openSans_bold",
                flex: 0.9,
              }}
              numberOfLines={1}
            >
              {itemName}
            </Text>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("inventoryAdd", {
                  data: data ? data : props?.route?.params?.data,
                })
              }
            >
              <Image
                source={purpleEditIcon}
                style={{
                  width: device === "tablet" ? 30 : 20,
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{ width: "95%", flexDirection: "column", marginTop: 20 }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "black",
                fontFamily: "openSans_bold",
              }}
            >
              Inventory Details
            </Text>

            <View
              style={{
                width: "100%",
                flexDirection: device === "tablet" ? "row" : "column",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Input
                placeholder={"Brand"}
                value={brand}
                setValue={(val) => setBrand(val)}
                style={{
                  marginTop: 10,
                  borderRadius: 0,
                  flex: device === "tablet" ? 0.3 : 1,
                  borderColor: grayColor,
                  borderBottomWidth: 2,
                }}
                editable={false}
              />
              <Input
                keyboardType={"number-pad"}
                placeholder={"Quantity"}
                value={`${quantity}`}
                setValue={(val) => setQuantity(val)}
                style={{
                  marginTop: 10,
                  borderRadius: 0,
                  flex: device === "tablet" ? 0.3 : 1,
                  borderColor: grayColor,
                  borderBottomWidth: 2,
                }}
                editable={false}
              />
              <Input
                placeholder={"Unit"}
                value={unit}
                setValue={(val) => setUnit(val)}
                style={{
                  marginTop: 10,
                  borderRadius: 0,
                  flex: device === "tablet" ? 0.3 : 1,
                  borderColor: grayColor,
                  borderBottomWidth: 2,
                }}
                editable={false}
              />
            </View>

            <View
              style={{
                width: "100%",
                flexDirection: device === "tablet" ? "row" : "column",
                alignItems: "center",
                justifyContent: "space-between",
                zIndex: 10,
              }}
            >
              <Input
                placeholder={"Date of Purchase"}
                value={dateOfPurchase}
                setValue={(val) => setDateOfPurchase(val)}
                style={{
                  marginTop: 10,
                  borderRadius: 0,
                  flex: device === "tablet" ? 0.3 : 1,
                  borderColor: grayColor,
                  borderBottomWidth: 2,
                }}
                editable={false}
              />
              <Input
                placeholder={"Date of Expiry"}
                value={dateOfExpiry}
                setValue={(val) => setDateOfExpiry(val)}
                style={{
                  marginTop: 10,
                  borderRadius: 0,
                  flex: device === "tablet" ? 0.3 : 1,
                  borderColor: grayColor,
                  borderBottomWidth: 2,
                }}
                editable={false}
              />
              <Input
                placeholder={"Color"}
                value={color}
                setValue={(val) => setDateOfExpiry(val)}
                style={{
                  marginTop: 10,
                  borderRadius: 0,
                  flex: device === "tablet" ? 0.3 : 1,
                  borderColor: grayColor,
                  borderBottomWidth: 2,
                }}
                editable={false}
              />
            </View>

            <View
              style={{
                width: "100%",
                flexDirection: device === "tablet" ? "row" : "column",
                alignItems: "center",
                justifyContent: "space-between",
                zIndex: 10,
              }}
            >
              <Input
                placeholder={"Cost Per Unit"}
                value={`${costPerUnit}`}
                setValue={(val) => setDateOfPurchase(val)}
                style={{
                  marginTop: 10,
                  borderRadius: 0,
                  flex: device === "tablet" ? 0.3 : 1,
                  borderColor: grayColor,
                  borderBottomWidth: 2,
                }}
                editable={false}
              />
              <Input
                placeholder={"Threshold"}
                value={`${threshold}`}
                setValue={(val) => setDateOfExpiry(val)}
                style={{
                  marginTop: 10,
                  borderRadius: 0,
                  flex: device === "tablet" ? 0.3 : 1,
                  borderColor: grayColor,
                  borderBottomWidth: 2,
                }}
                editable={false}
              />
              <Input
                placeholder={"Category"}
                value={category}
                setValue={(val) => setDateOfExpiry(val)}
                style={{
                  marginTop: 10,
                  borderRadius: 0,
                  flex: device === "tablet" ? 0.3 : 1,
                  borderColor: grayColor,
                  borderBottomWidth: 2,
                }}
                editable={false}
              />
            </View>

            <View style={{ width: "100%", zIndex: 0 }}>
              <Input
                placeholder={"Notes"}
                value={notes}
                setValue={(val) => setNotes(val)}
                style={{
                  marginTop: 10,
                  borderRadius: 0,
                  borderColor: grayColor,
                  borderBottomWidth: 2,
                }}
                editable={false}
              />
            </View>

            <View style={{ width: "100%", zIndex: 0 }}>
              <Input
                placeholder={"Availibility"}
                value={
                  inventoryAvailibility.find(
                    (item) => item.value === availability
                  )?.name ?? ""
                }
                style={{
                  marginTop: 10,
                  borderRadius: 0,
                  borderColor: grayColor,
                  borderBottomWidth: 2,
                }}
                editable={false}
              />
            </View>

            {photos.length > 0 && (
              <View style={{ width: "100%", marginTop: 20 }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: "black",
                    fontFamily: "openSans_bold",
                  }}
                >
                  Photos
                </Text>

                <View
                  style={{
                    width: "100%",
                    flexWrap: "wrap",
                    marginTop: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent:
                      device === "tablet" ? "flex-start" : "space-between",
                  }}
                >
                  {photos.map((item, i) => (
                    <View
                      key={i}
                      style={{
                        width: device === "tablet" ? 150 : 140,
                        height: device === "tablet" ? 150 : 140,
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: 2,
                        borderColor: grayColor,
                        marginTop: 10,
                        marginLeft:
                          device === "tablet" ? (i === 0 ? 0 : 10) : 0,
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        style={{
                          width: device === "tablet" ? 150 : 140,
                          height: device === "tablet" ? 150 : 140,
                          resizeMode: "contain",
                        }}
                        source={{ uri: item }}
                      />
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    </MainScreenContainer>
  );
};
