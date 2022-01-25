import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MainScreenContainer } from "../../MainScreenContainers";
import { HeadingBox } from "../../../components/HeadingBox/HeadingBox";
import { useDispatch, useSelector } from "react-redux";
import { Text } from "../../../components/Text/Text";
import {
  availableTableColor,
  grayColor,
  grayMenuText,
  grayShade2,
  occupiedTableColor,
  orderBillBackground,
  primaryColor,
  reservedTableColor,
} from "../../../theme/colors";
import { categoriesList, HEIGHT } from "../../../helpers/utlils";
import * as actions from "../../../Redux/actions/PosActions/OrderActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastError } from "../../../helpers/Toast";
import { Icon, Spinner } from "native-base";
import { useIsFocused, useNavigation } from "@react-navigation/core";
import { getRandomColor } from "../../../helpers/utlils";
import { flex, marginTop, order } from "styled-system";
import { RegularButton } from "../../../components/Buttons/RegularButton";
import deleteIcon from "../../../assets/images/deleteIcon.png";
import { Chip } from "../../../components/Chip/Chip";
import moment from "moment";
import validator from "validator";
import { useStripe } from "@stripe/stripe-react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { StripeModal } from "../../../components/StripeModal/StripeModal";

const CategoryComponent = ({ width, name, onPress }) => {
  const [color, setColor] = useState("");

  useEffect(() => {
    if (color === "") {
      setColor(getRandomColor());
    }
  }, []);

  return (
    <TouchableOpacity
      style={{
        width: width || "30%",
        borderRadius: 20,
        backgroundColor: color,
        minHeight: 120,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          fontSize: 18,
          color: "white",
          margin: 10,
        }}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const MealComponent = ({ meal, onPress, width }) => {
  const [color, setColor] = useState("#FF477E");

  // useEffect(() => {
  //   if (color === "") {
  //     setColor(getRandomColor());
  //   }
  // }, []);

  return (
    <TouchableOpacity
      style={{
        width: width || "22%",
        borderRadius: 8,
        backgroundColor: color,
        minHeight: 80,
        marginLeft: "2%",
        marginTop: 10,
        paddingTop: 10,
        justifyContent: "space-between",
      }}
      onPress={onPress}
    >
      <Text
        style={{
          fontSize: 16,
          color: "white",
          marginHorizontal: 8,
          marginTop: 0,
        }}
      >
        {meal.mealName}
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: "white",
          marginVertical: 10,
          marginHorizontal: 8,
        }}
      >
        ${meal.mealPrice}
      </Text>
    </TouchableOpacity>
  );
};

export const OrderTakingScreen = (props) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const navigation = useNavigation();
  const isScreenFocused = useIsFocused();
  const [showTerminal, setShowTerminal] = useState(false);
  const device = useSelector((state) => state.system.device);
  const user = useSelector((state) => state.auth.user.user);
  const defaultLocation = useSelector(
    (state) => state.locations.defaultLocation
  );
  const { categories, meals, isLoading, isError } = useSelector(
    (state) => state.pos.meal
  );
  const {
    isSuccess,
    orderId,
    isLoading: orderLoading,
    isError: orderError,
  } = useSelector((state) => state.pos.createOrder);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isDefaultLocation, setIsDefaultLocation] = useState(false);
  const [mealsToShow, setMealsToShow] = useState([]);
  const [tableNo, setTableNo] = useState(props.route?.params?.tableNo ?? "");
  const [orderList, setOrderList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [charge, setCharge] = useState(false);
  const [createOrderLoading, setcreateOrderLoading] = useState(false);
  const [createOrderLoadingWithCard, setcreateOrderLoadingWithCard] =
    useState(false);
  const [loadingLabel, setLoadingLabel] = useState("Loading");
  const [firstTime, setFirstTime] = useState(true);
  const [mealSelectedForAdjustment, setmealSelectedForAdjustment] =
    useState("");
  const [showNoteTextBox, setShowNoteTextBox] = useState(false);
  const [showAdjustPrice, setShowAdjustPrice] = useState(false);
  const [notes, setNotes] = useState("");
  const [adjustedPrice, setAdjustedPrice] = useState("");
  const [paymentSuccessfull, setpaymentSuccessfull] = useState(false);
  const [paymentTime, setPaymentTime] = useState(false);
  // for reserved order
  const [isReserved, setIsReserved] = useState(false);
  const [reservedOrder, setReservedOrder] = useState({});
  const [reserveOrderError, setReserveOrderError] = useState(false);
  const [fullDisplay, setFullDisplay] = useState(false);
  const [reservedTotalPrice, setReservedTotalPrice] = useState(0);

  useEffect(() => {
    const isReserved = props.route.params.isReserved;

    if (isReserved) {
      setIsReserved(true);
      getOrderByTableId();
    }
  }, []);

  const getOrderByTableId = () => {
    actions
      .fetchOrderByTableId({
        locationId: defaultLocation.locationId,
        tableId: props.route.params?.tableId,
      })
      .then((res) => {
        setReservedOrder(res);
        setPaymentTime(true);
        if (res?.paymentDetails == null) {
          res?.catalog?.map((item) => {
            setReservedTotalPrice(
              (price) => price + item?.mealPrice * item.quantity
            );
          });
        }
      })
      .catch((e) => {
        setReserveOrderError(true);
      });
  };

  const setMealIdForAdjustment = (id) => {
    setNotes("");
    setShowNoteTextBox(false);
    setAdjustedPrice("");
    setShowAdjustPrice(false);
    if (id === mealSelectedForAdjustment) {
      setmealSelectedForAdjustment(false);
      return;
    }
    setmealSelectedForAdjustment(id);
  };
  const [cardOrderInfo, setCardOrderInfo] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");

  const { paymentIntent } = useSelector((state) => state.pos);

  useEffect(() => {
    if (!orderError) return;

    setcreateOrderLoading(orderLoading);
  }, [orderError]);

  useEffect(() => {
    if (!isSuccess) return;
    if (firstTime) return;

    setPaymentTime(true);

    actions
      .attachOrderToTableAction({
        table: props.route.params.table,
        orderId,
      })
      .then((res) => {
        setLoadingLabel("Reserving table for customer");
        actions
          .changeTableStatusAction({
            locationId: defaultLocation.locationId,
            tableId: props.route.params.tableId,
            stature: "RESERVED",
          })
          .then(() => {
            setcreateOrderLoading(false);
            setcreateOrderLoadingWithCard(false);
          })
          .catch((res) => {
            setcreateOrderLoading(false);
            setcreateOrderLoadingWithCard(false);
          });
      })
      .catch((res) => {
        setcreateOrderLoading(false);
        setcreateOrderLoadingWithCard(false);
      });
  }, [isSuccess]);

  const ProcessPayment = () => {
    console.log("runing process Payment");
    if (paymentMethod !== "Card") {
      setcreateOrderLoading(true);
      actions
        .payOrderAction({
          orderId: isReserved ? reservedOrder?.orderId : orderId,
          locationId: defaultLocation.locationId,
          paymentDetails: "Cash",
        })
        .then((res) => {
          setLoadingLabel("Attaching order to table");
          setcreateOrderLoading(false);
          setcreateOrderLoadingWithCard(false);
          setpaymentSuccessfull(true);
          actions
            .changeTableStatusAction({
              locationId: defaultLocation.locationId,
              tableId: props.route.params.tableId,
              stature: "AVAILABLE",
            })
            .then(() => {
              navigation.goBack();
            });
        })
        .catch((res) => {
          setcreateOrderLoading(false);
          setcreateOrderLoadingWithCard(false);
        });
    } else {
      console.log("yes paying through stripe");
      setcreateOrderLoadingWithCard(true);
      actions
        .payOrderAction({
          orderId: isReserved ? reservedOrder?.orderId : orderId,
          locationId: defaultLocation.locationId,
          paymentDetails: "Stripe",
        })
        .then((res) => {
          setLoadingLabel("Attaching order to table");
          setcreateOrderLoading(false);
          setcreateOrderLoadingWithCard(false);
          setpaymentSuccessfull(true);
          actions
            .changeTableStatusAction({
              locationId: defaultLocation.locationId,
              tableId: props.route.params.tableId,
              stature: "AVAILABLE",
            })
            .then(() => {
              navigation.goBack();
            });
        })
        .catch((res) => {
          setcreateOrderLoading(false);
          setcreateOrderLoadingWithCard(false);
          setPaymentMethod("cash");
        });
    }
  };

  const createOrder = () => {
    if (orderList.length === 0) {
      ToastError("Select any menu item first!");
      return;
    }

    setFirstTime(false);
    setLoadingLabel("Confirming order");

    if (isReserved) {
      const data = {
        locationId: defaultLocation.locationId,
        catalog: [
          ...orderList.map((item) => ({
            quantity: item.selected,
            recipe: item.mealRecipes[0],
            mealName: item.mealName,
            mealPrice: item.mealPrice,
            mealTime: moment().format("h:mm:ss a"),
            notes: item?.notes || "",
            adjustedPrice: item?.adjustedPrice || "",
            new: true,
          })),
        ],
        price: (totalPrice + reservedTotalPrice).toFixed(2),
        customerId: "12345",
        orderId: reservedOrder?.orderId,
      };

      dispatch(actions.updateExistingOrderAction(data));
      return;
    }

    const data = {
      client_id: user.clientId,
      locationId: defaultLocation.locationId,
      catalog: [
        ...orderList.map((item) => ({
          quantity: item.selected,
          recipe: item.mealRecipes[0],
          mealName: item.mealName,
          mealPrice: item.mealPrice,
          mealTime: moment().format("h:mm:ss a"),
          notes: item?.notes || "",
          adjustedPrice: item?.adjustedPrice || "",
          ...(isReserved && { new: true }),
        })),
      ],
      price: totalPrice,
      discount: 0,
      customerId: "12345",
    };

    dispatch(actions.createOrder(data));
  };

  const createOrderByCard = () => {
    // if (orderList.length === 0) {
    //   ToastError("Select any menu item first!");
    //   return;
    // }

    setFirstTime(false);
    // setcreateOrderLoading(true);
    // setLoadingLabel("Confirming order");

    const data = {
      client_id: user.clientId,
      locationId: defaultLocation.locationId,
      catalog: [
        ...orderList.map((item) => ({
          quantity: item.selected,
          recipe: item.mealRecipes[0],
          mealName: item.mealName,
          mealPrice: item.mealPrice,
        })),
      ],
      price: isReserved
        ? (totalPrice + reservedTotalPrice).toFixed(2)
        : totalPrice,
      discount: 0,
      customerId: "12345",
    };

    setCardOrderInfo(data);
    setPaymentMethod("Card");

    dispatch(
      actions.getOrderPaymentIntentAction({
        amount: data?.price,
        clientId: data?.client_id,
      })
    );
  };

  useEffect(() => {
    if (paymentIntent?.intentKey?.paymentIntent) {
      let intent = paymentIntent?.intentKey?.paymentIntent;
      initPaymentSheet({
        customerId: "12345",
        paymentIntentClientSecret: intent,
      })
        .then(() => {
          presentPaymentSheet({
            clientSecret: intent,
          }).then((res) => {
            console.log(res);
            if (
              res?.error?.code === "Canceled" ||
              res?.error?.code === "Failed"
            ) {
              dispatch(actions.clearOrderPaymentIntentAction());
              setFirstTime(true);
              setcreateOrderLoading(false);
              setPaymentMethod("cash");
              return;
            } else {
              ProcessPayment();
            }
          });
        })
        .catch((err) => {
          console.log("STRIPE ERROR IS", err);
          setPaymentMethod("cash");
        });
    }
  }, [paymentIntent?.intentKey?.paymentIntent]);

  useEffect(() => {
    setMealsToShow(meals.map((item) => ({ ...item, selected: 0 })));
  }, [meals]);

  useEffect(() => {
    if (!isScreenFocused) return;
    checkDefaultLocation();
    fetchAllMeals();
  }, [isScreenFocused]);

  useEffect(() => {
    if (orderList.length === 0) {
      setTotalPrice(0);
      return;
    }

    let price = 0;

    orderList.map((item) => {
      price += item.totalPrice;
    });

    setTotalPrice(price);
  }, [orderList]);

  const checkDefaultLocation = async () => {
    const location = defaultLocation.locationId;

    if (location === null) {
      setIsDefaultLocation(false);
      return;
    }

    setIsDefaultLocation(true);
  };

  const fetchAllMeals = async () => {
    const location = defaultLocation.locationId;

    if (location === null) return;

    dispatch(
      actions.fetchMealsAction({
        locationId: location,
      })
    );
  };

  const incrementMealItem = (id) => {
    const allMeals = [...mealsToShow];
    const index = allMeals.findIndex((item) => item.mealId === id);

    if (index > -1) {
      allMeals[index] = {
        ...allMeals[index],
        selected: allMeals[index].selected + 1,
      };

      setMealsToShow(allMeals);
    }
  };

  const createOrderList = (meal) => {
    const check =
      orderList.filter((item) => item.mealId === meal.mealId).length > 0;

    const list = [...orderList];

    if (check) {
      const index = list.findIndex((item) => item.mealId === meal.mealId);

      if (index > -1) {
        list[index] = {
          ...list[index],
          selected: list[index].selected + 1,
          totalPrice: list[index].totalPrice + meal.mealPrice,
        };
        setOrderList(list);
      }
      return;
    }

    list.push({
      ...meal,
      selected: 1,
      totalPrice: meal.mealPrice,
      originalPrice: meal.mealPrice,
    });

    setOrderList(list);
  };

  const deleteOrderList = (meal) => {
    const check =
      orderList.filter((item) => item.mealId === meal.mealId).length > 0;

    const list = [...orderList];
    const allList = [...mealsToShow];

    if (check) {
      const index = list.findIndex((item) => item.mealId === meal.mealId);
      const allIndex = mealsToShow.findIndex(
        (item) => item.mealId === meal.mealId
      );

      if (index > -1) {
        if (list[index].selected === 1) {
          list.splice(index, 1);
        } else {
          list[index] = {
            ...list[index],
            selected: list[index].selected - 1,
            totalPrice: list[index].totalPrice - meal.mealPrice,
          };
        }

        setOrderList(list);
      }

      if (allIndex > -1) {
        allList[allIndex].selected = allList[allIndex].selected - 1;

        setMealsToShow(allList);
      }
      return;
    }
  };

  const updateNotesOnOrderMeal = (meal, notes) => {
    const check =
      orderList.filter((item) => item.mealId === meal.mealId).length > 0;

    const list = [...orderList];

    if (check) {
      const index = list.findIndex((item) => item.mealId === meal.mealId);

      if (index > -1) {
        list[index].notes = notes;

        setOrderList(list);
      }

      return;
    }
  };

  const updateAdjustedPriceOnOrderMeal = (meal, price) => {
    const check =
      orderList.filter((item) => item.mealId === meal.mealId).length > 0;

    const list = [...orderList];
    if (check) {
      const index = list.findIndex((item) => item.mealId === meal.mealId);

      if (index > -1) {
        list[index].adjustedPrice = price;

        if (price?.includes("$") && validator.isNumeric(price.slice(1))) {
          list[index].totalPrice =
            parseInt(list[index].originalPrice) * list[index].selected -
            parseFloat(price.slice(1));
          setOrderList(list);
          return;
        }

        if (price?.includes("%") && validator.isNumeric(price.slice(1))) {
          list[index].totalPrice =
            parseInt(list[index].originalPrice) * list[index].selected -
            (
              parseFloat(`0.${price.slice(1)}`) *
              (parseInt(list[index].originalPrice) * list[index].selected)
            ).toFixed(2);

          setOrderList(list);
          return;
        }

        if (price.length === 0) {
          list[index].totalPrice =
            parseInt(list[index].originalPrice) * list[index].selected;
        }

        setOrderList(list);
      }

      return;
    }
  };

  if (device === "tablet") {
    return (
      <MainScreenContainer noScroll>
        <HeadingBox heading={`Table ${props.route?.params?.tableNo || ""}`} />

        {isDefaultLocation ? (
          <View
            style={{
              width: "98%",
              marginTop: 20,
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
              ) : categories.length > 0 ? (
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    height: "100%",
                  }}
                >
                  <View style={{ width: "60%" }}>
                    <View style={{ width: "100%", marginTop: 0 }}>
                      <View
                        style={{
                          flex: 1,
                          flexWrap: "wrap",
                          flexDirection: "row",
                        }}
                      >
                        {categories.map((item) => (
                          <TouchableOpacity
                            onPress={() => setSelectedCategory(item)}
                            style={{ marginLeft: 10, marginTop: 10 }}
                          >
                            <Chip
                              selected={selectedCategory === item}
                              text={item}
                            />
                          </TouchableOpacity>
                        ))}
                      </View>

                      {selectedCategory.length > 0 ? (
                        <View style={{ width: "100%", marginTop: 30 }}>
                          <FlatList
                            scrollEnabled={false}
                            data={mealsToShow.filter(
                              (item) => item.mealCategory === selectedCategory
                            )}
                            numColumns={4}
                            style={{
                              marginTop: 20,
                              width: "100%",
                              marginBottom: 50,
                            }}
                            renderItem={({ item }) => (
                              <MealComponent
                                onPress={
                                  isSuccess
                                    ? () => null
                                    : () => {
                                        incrementMealItem(item.mealId);
                                        createOrderList(item);
                                      }
                                }
                                meal={item}
                              />
                            )}
                          />
                        </View>
                      ) : null}
                    </View>
                  </View>
                  {/* Billing */}
                  {selectedCategory.length > 0 || isReserved ? (
                    <View style={{ width: "40%" }}>
                      {isReserved ? (
                        reservedOrder?.orderId ? (
                          <View
                            style={{
                              width: "100%",
                              backgroundColor: "#FFCCD5",
                              padding: 10,
                              borderRadius: 10,
                              flexDirection: "column",
                              justifyContent: "space-between",
                              paddingHorizontal: 15,
                              paddingBottom: 20,
                            }}
                          >
                            <View
                              style={{
                                width: "100%",
                                alignItems: "center",
                                justifyContent: "flex-end",
                                flexDirection: "row",
                              }}
                            >
                              <TouchableOpacity
                                onPress={() => setFullDisplay(!fullDisplay)}
                              >
                                <Icon
                                  fontSize={15}
                                  as={MaterialIcons}
                                  name={
                                    fullDisplay
                                      ? "keyboard-arrow-up"
                                      : "keyboard-arrow-down"
                                  }
                                />
                              </TouchableOpacity>
                            </View>
                            <View style={{ width: "100%", marginVertical: 0 }}>
                              {reservedOrder?.catalog
                                ?.slice(0, fullDisplay ? 9999 : 2)
                                ?.map((item, i) => (
                                  <TouchableOpacity
                                    style={{
                                      flexDirection: "row",
                                      alignItems: "center",
                                      justifyContent: "space-between",
                                      marginTop: 0,
                                      width: "100%",

                                      paddingVertical: 7,
                                    }}
                                    key={item.mealId}
                                    activeOpacity={1}
                                  >
                                    <Text style={{ flex: 0.9, fontSize: 16 }}>
                                      x{item.quantity} {item.mealName}
                                    </Text>

                                    <View
                                      style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "center",
                                      }}
                                    >
                                      <Text style={{ fontSize: 16 }}>
                                        $
                                        {(
                                          item.mealPrice * item.quantity
                                        ).toFixed(2)}
                                      </Text>
                                    </View>
                                  </TouchableOpacity>
                                ))}
                            </View>
                          </View>
                        ) : null
                      ) : null}
                      <View
                        style={{
                          width: "100%",
                          backgroundColor: isSuccess
                            ? "#FFCCD5"
                            : orderBillBackground,
                          padding: 10,
                          borderRadius: 10,
                          flexDirection: "column",
                          justifyContent: "space-between",
                          paddingHorizontal: 15,
                          paddingBottom: 20,
                          marginTop: isReserved ? 20 : 0,
                        }}
                      >
                        <View style={{ width: "100%", marginVertical: 0 }}>
                          {orderList.map((item, i) => (
                            <>
                              <TouchableOpacity
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  marginTop: 0,
                                  width: "100%",
                                  backgroundColor:
                                    mealSelectedForAdjustment === i
                                      ? "#C4C4C4"
                                      : "rgba(0,0,0,0)",
                                  paddingVertical: 7,
                                }}
                                key={item.mealId}
                                onPress={() => setMealIdForAdjustment(i)}
                              >
                                <Text style={{ flex: 0.9, fontSize: 16 }}>
                                  x{item.selected} {item.mealName}
                                </Text>

                                <View
                                  style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Text style={{ fontSize: 16 }}>
                                    ${item.totalPrice?.toFixed(2)}
                                  </Text>
                                  {mealSelectedForAdjustment !== i && (
                                    <TouchableOpacity
                                      onPress={() => deleteOrderList(item)}
                                    >
                                      <Text
                                        style={{
                                          color: "#868686",
                                          fontSize: 20,
                                          marginLeft: 10,
                                          margin: 0,
                                        }}
                                      >
                                        x
                                      </Text>
                                    </TouchableOpacity>
                                  )}
                                </View>
                              </TouchableOpacity>

                              {mealSelectedForAdjustment === i ? (
                                showNoteTextBox ? (
                                  <View
                                    style={{
                                      width: "100%",
                                      marginTop: 10,
                                    }}
                                  >
                                    <TextInput
                                      defaultValue={item.notes}
                                      ref={inputRef}
                                      style={{
                                        width: "100%",
                                        height: 39,
                                        backgroundColor: "white",
                                        borderBottomWidth: 0.5,
                                        borderColor: "#000000",
                                        paddingHorizontal: 10,
                                      }}
                                      onChangeText={(val) => setNotes(val)}
                                    />

                                    <TouchableOpacity
                                      style={{
                                        width: 95,
                                        height: 36,
                                        backgroundColor: "#FFFFFF",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderWidth: 0.8,
                                        borderColor: "#868686",
                                        borderRadius: 6,
                                        marginTop: 15,
                                      }}
                                      onPress={() =>
                                        updateNotesOnOrderMeal(item, notes)
                                      }
                                    >
                                      <Text
                                        style={{
                                          fontSize: 12,
                                          color: "black",
                                          textTransform: "uppercase",
                                        }}
                                      >
                                        add note
                                      </Text>
                                    </TouchableOpacity>
                                  </View>
                                ) : showAdjustPrice ? (
                                  <View
                                    style={{
                                      width: "100%",
                                      marginTop: 10,
                                    }}
                                  >
                                    <TextInput
                                      keyboardType="numeric"
                                      defaultValue={item.adjustedPrice}
                                      ref={inputRef}
                                      style={{
                                        width: "100%",
                                        height: 39,
                                        backgroundColor: "white",
                                        borderBottomWidth: 0.5,
                                        borderColor: "#000000",
                                        paddingHorizontal: 10,
                                      }}
                                      value={adjustedPrice}
                                      onChangeText={(val) =>
                                        setAdjustedPrice(val)
                                      }
                                    />

                                    <View
                                      style={{
                                        marginTop: 15,
                                        width: "100%",
                                        flexDirection: "row",
                                      }}
                                    >
                                      <TouchableOpacity
                                        style={{
                                          width: 123,
                                          height: 36,
                                          backgroundColor: "#FFFFFF",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          borderWidth: 0.8,
                                          borderColor: "#868686",
                                          borderRadius: 6,
                                        }}
                                        onPress={() =>
                                          updateAdjustedPriceOnOrderMeal(
                                            item,
                                            adjustedPrice
                                          )
                                        }
                                      >
                                        <Text
                                          style={{
                                            fontSize: 12,
                                            color: "black",
                                            textTransform: "uppercase",
                                          }}
                                        >
                                          Adjust price
                                        </Text>
                                      </TouchableOpacity>

                                      <TouchableOpacity
                                        style={{
                                          width: 34,
                                          height: 36,
                                          backgroundColor: "#FFFFFF",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          borderWidth: 0.8,
                                          borderColor: "#868686",
                                          borderRadius: 6,
                                          marginLeft: 10,
                                        }}
                                        onPress={() => {
                                          const price = adjustedPrice;

                                          setAdjustedPrice(
                                            `$${price
                                              .replaceAll("$", "")
                                              .replaceAll("%", "")}`
                                          );
                                        }}
                                      >
                                        <Text
                                          style={{
                                            fontSize: 12,
                                            color: "black",
                                            textTransform: "uppercase",
                                          }}
                                        >
                                          $
                                        </Text>
                                      </TouchableOpacity>
                                      <TouchableOpacity
                                        style={{
                                          width: 34,
                                          height: 36,
                                          backgroundColor: "#FFFFFF",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          borderWidth: 0.8,
                                          borderColor: "#868686",
                                          borderRadius: 6,
                                          marginLeft: 10,
                                        }}
                                        onPress={() => {
                                          const price = adjustedPrice;

                                          setAdjustedPrice(
                                            `%${price
                                              .replaceAll("$", "")
                                              .replaceAll("%", "")}`
                                          );
                                        }}
                                      >
                                        <Text
                                          style={{
                                            fontSize: 12,
                                            color: "black",
                                            textTransform: "uppercase",
                                          }}
                                        >
                                          %
                                        </Text>
                                      </TouchableOpacity>
                                    </View>
                                  </View>
                                ) : (
                                  <View
                                    style={{
                                      width: "100%",
                                      marginTop: 19,
                                      flexDirection: "row",
                                    }}
                                  >
                                    <TouchableOpacity
                                      style={{
                                        width: 123,
                                        height: 36,
                                        backgroundColor: "#FFFFFF",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderWidth: 0.8,
                                        borderColor: "#868686",
                                        borderRadius: 6,
                                      }}
                                      onPress={() => setShowAdjustPrice(true)}
                                    >
                                      <Text
                                        style={{
                                          fontSize: 12,
                                          color: "black",
                                          textTransform: "uppercase",
                                        }}
                                      >
                                        Adjust price
                                      </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                      style={{
                                        width: 70,
                                        height: 36,
                                        backgroundColor: "#FFFFFF",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderWidth: 0.8,
                                        borderColor: "#868686",
                                        borderRadius: 6,
                                        marginLeft: 16,
                                      }}
                                      onPress={() => setShowNoteTextBox(true)}
                                    >
                                      <Text
                                        style={{
                                          fontSize: 12,
                                          color: "black",
                                          textTransform: "uppercase",
                                        }}
                                      >
                                        Notes
                                      </Text>
                                    </TouchableOpacity>
                                  </View>
                                )
                              ) : null}
                            </>
                          ))}

                          <View
                            style={{
                              width: "100%",
                              borderTopWidth: 1,
                              borderColor: grayShade2,
                              marginTop: 20,
                              paddingTop: 10,
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 16,
                                fontFamily: "openSans_semiBold",
                              }}
                            >
                              Total:
                            </Text>

                            <Text
                              style={{
                                fontSize: 16,
                                fontFamily: "openSans_semiBold",
                              }}
                            >
                              $
                              {isReserved
                                ? (totalPrice + reservedTotalPrice).toFixed(2)
                                : totalPrice.toFixed(2)}
                            </Text>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          width: "100%",
                          marginTop: 20,
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        {paymentSuccessfull ? (
                          <View
                            style={{
                              display: "flex",
                              width: "100%",
                              marginTop: 45,
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Text
                              style={{
                                color: "#57C27B",
                                textTransform: "uppercase",
                                fontSize: 12,
                              }}
                            >
                              Payment confirmed
                            </Text>
                          </View>
                        ) : charge ? (
                          <View style={{ display: "flex", width: "100%" }}>
                            <RegularButton
                              style={{
                                borderWidth: 1,
                                borderColor: primaryColor,
                              }}
                              onPress={() => setShowTerminal(true)}
                              text={`Send to terminal`}
                            />
                            <RegularButton
                              isLoading={createOrderLoading}
                              colors={["white", "white"]}
                              style={{
                                borderWidth: 1,
                                borderColor: primaryColor,
                                marginTop: 10,
                              }}
                              textStyle={{ color: primaryColor }}
                              onPress={ProcessPayment}
                              text={`Cash`}
                              white
                            />
                            <RegularButton
                              isLoading={
                                paymentIntent?.isLoading ||
                                createOrderLoadingWithCard
                              }
                              colors={["white", "white"]}
                              style={{
                                borderWidth: 1,
                                borderColor: primaryColor,
                                marginTop: 10,
                              }}
                              textStyle={{ color: primaryColor }}
                              onPress={createOrderByCard}
                              text={`credit Card`}
                              white
                            />

                            <TouchableOpacity onPress={() => setCharge(false)}>
                              <Text
                                style={{
                                  color: "black",
                                  textDecorationLine: "underline",
                                  marginTop: 40,
                                  fontSize: 12,
                                  textTransform: "uppercase",
                                }}
                              >
                                Back
                              </Text>
                            </TouchableOpacity>
                          </View>
                        ) : (
                          <View style={{ display: "flex", width: "100%" }}>
                            <RegularButton
                              isLoading={orderLoading}
                              onPress={createOrder}
                              text={"Sent"}
                              disabled={isSuccess}
                            />
                            <RegularButton
                              disabled={!paymentTime}
                              style={{ marginTop: 10 }}
                              white
                              onPress={() => setCharge(true)}
                              text={`Payment $${(
                                totalPrice + reservedTotalPrice
                              ).toFixed(2)}`}
                            />
                          </View>
                        )}
                      </View>
                    </View>
                  ) : null}
                </View>
              ) : (
                <View
                  style={{
                    width: "100%",
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    height: HEIGHT - 100,
                  }}
                >
                  <Text
                    style={{ fontSize: 20, width: "80%", textAlign: "center" }}
                  >
                    You need to add atleast one meal added to start order 😃
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
        ) : (
          <View
            style={{
              width: "100%",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              height: HEIGHT - 100,
            }}
          >
            <Text style={{ fontSize: 20, width: "80%", textAlign: "center" }}>
              You need to add atleast one location to start order 😃
            </Text>
          </View>
        )}
        {console.log(reservedOrder?.catalog)}
        <StripeModal
          list={
            reservedOrder?.catalog
              ? [
                  ...orderList?.map((item) => ({
                    quantity: item.selected,
                    description: item.mealName,
                    amount: item.totalPrice?.toFixed(2),
                  })),
                  ...reservedOrder?.catalog?.map((item) => ({
                    quantity: item.quantity,
                    description: item.mealName,
                    amount: (item.mealPrice * item.quantity).toFixed(2),
                  })),
                ]
              : []
          }
          visible={showTerminal}
          handleClose={() => setShowTerminal(false)}
          amount={
            isReserved
              ? (totalPrice + reservedTotalPrice).toFixed(2)
              : totalPrice.toFixed(2)
          }
          orderId={isReserved ? reservedOrder?.orderId : orderId}
          clientId={user?.clientId}
          locationId={defaultLocation.locationId}
        />
      </MainScreenContainer>
    );
  }

  const [tab, setTab] = useState(0);

  return (
    <MainScreenContainer>
      <HeadingBox heading={""} />

      {isDefaultLocation ? (
        <View style={{ width: "90%", height: "100%" }}>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              onPress={() => setTab(0)}
              style={{
                width: "33%",
                alignItems: "center",
                justifyContent: "center",
                height: 40,
                borderBottomWidth: tab === 0 ? 2 : 0,
                borderColor: primaryColor,
              }}
            >
              <Text>CATEGORIES</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTab(1)}
              style={{
                width: "33%",
                alignItems: "center",
                justifyContent: "center",
                height: 40,
                borderBottomWidth: tab === 1 ? 2 : 0,
                borderColor: primaryColor,
              }}
            >
              <Text>MENU</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTab(2)}
              style={{
                width: "33%",
                alignItems: "center",
                justifyContent: "center",
                height: 40,
                borderBottomWidth: tab === 2 ? 2 : 0,
                borderColor: primaryColor,
              }}
            >
              <Text>TABLE</Text>
            </TouchableOpacity>
          </View>

          <View style={{ width: "100%", marginTop: 20 }}>
            {tab === 0 ? (
              <FlatList
                data={categories}
                numColumns={2}
                style={{
                  marginTop: 20,
                  width: "100%",
                  height: "100%",
                  paddingBottom: 20,
                }}
                columnWrapperStyle={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginVertical: 10,
                }}
                renderItem={({ item }) => (
                  <CategoryComponent
                    onPress={() => setSelectedCategory(item)}
                    width={"48%"}
                    key={item}
                    name={item}
                  />
                )}
              />
            ) : tab === 1 ? (
              <FlatList
                data={mealsToShow.filter(
                  (item) => item.mealCategory === selectedCategory
                )}
                numColumns={2}
                style={{
                  marginTop: 20,
                  width: "100%",
                  marginBottom: 50,
                }}
                columnWrapperStyle={{
                  marginTop: 20,
                }}
                renderItem={({ item }) => (
                  <MealComponent
                    width={"45%"}
                    onPress={() => {
                      incrementMealItem(item.mealId);
                      createOrderList(item);
                    }}
                    meal={item}
                  />
                )}
              />
            ) : (
              <View style={{ width: "100%", marginTop: 20 }}>
                {orderList.map((item) => (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 20,
                      width: "100%",
                    }}
                    key={item.mealId}
                  >
                    <Text style={{ flex: 0.9, fontSize: 18 }}>
                      x{item.selected} {item.mealName}
                    </Text>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ fontSize: 18 }}>${item.totalPrice}</Text>
                      <TouchableOpacity onPress={() => deleteOrderList(item)}>
                        <Image
                          style={{
                            width: 20,
                            height: 20,
                            marginLeft: 10,
                            resizeMode: "contain",
                          }}
                          source={deleteIcon}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}

                <View
                  style={{
                    width: "100%",
                    borderTopWidth: 1,
                    borderColor: grayShade2,
                    marginTop: 20,
                    paddingTop: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: "openSans_semiBold",
                    }}
                  >
                    Total:
                  </Text>

                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: "openSans_semiBold",
                    }}
                  >
                    ${totalPrice}
                  </Text>
                </View>

                <View
                  style={{
                    width: "100%",
                    marginTop: 20,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {charge ? (
                    <View style={{ display: "flex", width: "100%" }}>
                      <RegularButton
                        isLoading={orderLoading || createOrderLoading}
                        colors={["white", "white"]}
                        style={{
                          borderWidth: 1,
                          borderColor: primaryColor,
                        }}
                        textStyle={{ color: primaryColor }}
                        onPress={createOrder}
                        text={`Cash`}
                        white
                      />
                      <RegularButton
                        isLoading={paymentIntent?.isLoading}
                        colors={["white", "white"]}
                        style={{
                          borderWidth: 1,
                          borderColor: primaryColor,
                          marginTop: 10,
                        }}
                        textStyle={{ color: primaryColor }}
                        onPress={createOrderByCard}
                        text={`Card`}
                        white
                      />
                    </View>
                  ) : (
                    <RegularButton
                      onPress={() => setCharge(true)}
                      text={`Charge $${totalPrice}`}
                    />
                  )}
                </View>
              </View>
            )}
          </View>
        </View>
      ) : (
        <View
          style={{
            width: "100%",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            height: HEIGHT - 100,
          }}
        >
          <Text style={{ fontSize: 20, width: "80%", textAlign: "center" }}>
            You need to add atleast one location to start order 😃
          </Text>
        </View>
      )}
    </MainScreenContainer>
  );
};
