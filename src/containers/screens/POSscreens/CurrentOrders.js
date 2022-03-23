import {
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MainScreenContainer } from "../../MainScreenContainers";
import { HeadingBox } from "../../../components/HeadingBox/HeadingBox";
import { Spinner } from "native-base";
import { primaryColor } from "../../../theme/colors";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders } from "../../../Redux/actions/PosActions/OrderActions";
import { Chip } from "../../../components/Chip/Chip";
import { Text } from "../../../components/Text/Text";
import moment from "moment";
import { HEIGHT } from "../../../helpers/utlils";
import { Modal } from "../../../components/Modal/Modal";
import blackBackArrow from "../../../assets/images/blackBackArrow.png";
import placeholderImage from "../../../assets/images/food2.png";

const types = ["Total Orders", "Table Service", "Delivery", "Take Away Order"];

export const CurrentOrders = () => {
  const dispatch = useDispatch();
  const [selectedType, setSelectedType] = useState("Total Orders");
  const [isModal, setIsModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});
  const defaultLocation = useSelector(
    (state) => state.locations.defaultLocation
  );
  const { isLoading, TableService, Delivery, Takeaway, TotalOrders } =
    useSelector((state) => state.pos.orders);

  useEffect(() => {
    dispatch(fetchAllOrders({ locationId: defaultLocation.locationId }));
  }, []);

  const closeModal = () => setIsModal(false);

  return (
    <MainScreenContainer noScroll>
      <View
        style={{
          width: "95%",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <HeadingBox noScroll heading={"Back"} />

        <View
          style={{
            width: "98%",
            marginTop: 0,
            height: "100%",
            flex: 1,
          }}
        >
          <ScrollView style={{ flex: 1 }}>
            {isLoading ? (
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 10,
                  paddingVertical: 20,
                }}
              >
                <Spinner size={"large"} color={primaryColor} />
              </View>
            ) : (
              <View style={{ width: "100%", flex: 1 }}>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  {types.map((item, i) => (
                    <TouchableOpacity
                      key={i}
                      onPress={() => setSelectedType(item)}
                      style={{ marginLeft: 10, marginTop: 10 }}
                    >
                      <Chip selected={selectedType === item} text={item} />
                    </TouchableOpacity>
                  ))}
                </View>

                <ScrollView
                  horizontal
                  style={{ width: "100%", minHeight: HEIGHT }}
                >
                  <View style={{ width: "100%", marginVertical: 20 }}>
                    <View
                      style={{
                        width: "100%",
                        marginTop: 30,
                        flexDirection: "row",
                        paddingHorizontal: 20,
                      }}
                    >
                      <View style={{ width: 100 }}>
                        <Text
                          style={{
                            fontFamily: "openSans_bold",
                            fontSize: 11,
                            color: "#44444F",
                            marginLeft: 10,
                            textTransform: "uppercase",
                          }}
                        >
                          ORDER NUMBER
                        </Text>
                      </View>
                      <View style={{ width: 150, marginLeft: 20 }}>
                        <Text
                          style={{
                            fontFamily: "openSans_bold",
                            fontSize: 11,
                            color: "#44444F",
                            marginLeft: 10,
                            textTransform: "uppercase",
                          }}
                        >
                          Customer
                        </Text>
                      </View>
                      <View style={{ width: 150, marginLeft: 20 }}>
                        <Text
                          style={{
                            fontFamily: "openSans_bold",
                            fontSize: 11,
                            color: "#44444F",
                            marginLeft: 10,
                            textTransform: "uppercase",
                          }}
                        >
                          No. of Items Ordered
                        </Text>
                      </View>
                      <View style={{ width: 180, marginLeft: 20 }}>
                        <Text
                          style={{
                            fontFamily: "openSans_bold",
                            fontSize: 11,
                            color: "#44444F",
                            marginLeft: 10,
                            textTransform: "uppercase",
                          }}
                        >
                          Date/Time
                        </Text>
                      </View>
                      <View style={{ width: 80, marginLeft: 20 }}>
                        <Text
                          style={{
                            fontFamily: "openSans_bold",
                            fontSize: 11,
                            color: "#44444F",
                            marginLeft: 10,
                            textTransform: "uppercase",
                          }}
                        >
                          Amount
                        </Text>
                      </View>
                      <View style={{ width: 80, marginLeft: 20 }}>
                        <Text
                          style={{
                            fontFamily: "openSans_bold",
                            fontSize: 11,
                            color: "#44444F",
                            marginLeft: 10,
                            textTransform: "uppercase",
                          }}
                        >
                          Status
                        </Text>
                      </View>
                    </View>
                    <FlatList
                      key={selectedType}
                      data={
                        selectedType === "Total Orders"
                          ? TotalOrders
                          : selectedType === "Table Service"
                          ? TableService
                          : selectedType === "Delivery"
                          ? Delivery
                          : selectedType === "Take Away Order"
                          ? Takeaway
                          : []
                      }
                      keyExtractor={(item, i) => `${i}`}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          onPress={() => {
                            setIsModal(true);
                            setSelectedOrder(item);
                          }}
                          style={{
                            width: "100%",
                            paddingTop: 15,
                            flexDirection: "row",
                            paddingHorizontal: 20,
                            alignItems: "center",
                          }}
                        >
                          <View style={{ width: 100 }}>
                            <Text
                              style={{
                                fontSize: 16,
                                color: "black",
                                marginLeft: 20,
                              }}
                            >
                              {item?.ticketNo}
                            </Text>
                          </View>
                          <View style={{ width: 150, marginLeft: 20 }}>
                            <Text
                              style={{
                                fontSize: 16,
                                color: "black",
                                marginLeft: 10,
                              }}
                            >
                              {`${item?.customer?.firstName ?? ""} ${
                                item?.customer?.lastName ?? ""
                              }`}
                            </Text>
                          </View>
                          <View style={{ width: 150, marginLeft: 20 }}>
                            <Text
                              style={{
                                fontSize: 16,
                                color: "black",
                                marginLeft: 20,
                              }}
                            >
                              {item?.catalog?.length}
                            </Text>
                          </View>
                          <View style={{ width: 180, marginLeft: 20 }}>
                            <Text
                              style={{
                                fontSize: 16,
                                color: "black",
                                marginLeft: 10,
                              }}
                            >
                              {moment(item?.timestamp).format(
                                "MMM D, YYYY mm a"
                              )}
                            </Text>
                          </View>
                          <View style={{ width: 80, marginLeft: 20 }}>
                            <Text
                              style={{
                                fontSize: 16,
                                color: "black",
                                marginLeft: 10,
                              }}
                            >
                              ${item?.price}
                            </Text>
                          </View>
                          <View style={{ width: 80, marginLeft: 20 }}>
                            <Text
                              style={{
                                fontSize: 16,
                                color: "black",
                                marginLeft: 10,
                              }}
                            >
                              {item?.paid ? "Paid" : "Not Paid"}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                </ScrollView>
              </View>
            )}
          </ScrollView>
        </View>
      </View>

      <Modal
        animationType={"none"}
        onRequestClose={closeModal}
        visible={isModal}
        style={{ alignItems: "flex-end", justifyContent: "flex-end" }}
      >
        <View
          style={{
            width: "50%",
            height: "100%",
            backgroundColor: "white",
            padding: 20,
          }}
        >
          <View style={{ width: "100%", marginTop: 30 }}>
            <TouchableOpacity onPress={closeModal}>
              <View style={{ transform: [{ rotateY: 160 }], width: 30 }}>
                <Image
                  source={blackBackArrow}
                  style={{ width: 30, height: 30 }}
                />
              </View>
            </TouchableOpacity>

            <ScrollView style={{ width: "100%" }}>
              <Text
                style={{
                  fontSize: 30,
                  color: primaryColor,
                  fontFamily: "openSans_semiBold",
                  marginTop: 50,
                }}
              >
                Order Detail
              </Text>

              {selectedOrder?.catalog?.map((item, i) => (
                <View
                  style={{
                    width: "100%",
                    marginTop: 20,
                    borderWidth: 1,
                    borderColor: "#C4C4C4",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: 20,
                    borderRadius: 20,
                  }}
                >
                  <Image
                    source={placeholderImage}
                    style={{ width: 70, height: 70 }}
                  />
                  <View
                    style={{
                      marginHorizontal: 20,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{ fontSize: 16, fontFamily: "openSans_semiBold" }}
                    >
                      x{item?.quantity}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        marginLeft: 10,
                        fontFamily: "openSans_semiBold",
                      }}
                    >
                      {item?.mealName}
                    </Text>
                  </View>

                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: 10,
                      fontFamily: "openSans_semiBold",
                    }}
                  >
                    ${item?.mealPrice}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </MainScreenContainer>
  );
};
