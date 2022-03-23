import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Text } from "../../../components/Text/Text";
import { MainScreenContainer } from "../../MainScreenContainers";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Modal } from "../../../components/Modal/Modal";
import { Input } from "../../../components/Inputs/Input";
import PhoneInput from "react-native-phone-number-input";
import tableService from "../../../assets/images/tableService.png";
import toGo from "../../../assets/images/toGo.png";
import deliveryPos from "../../../assets/images/deliveryPos.png";
import currentOrders from "../../../assets/images/currentOrders.png";
import addressToGo from "../../../assets/images/addressToGo.png";
import purpleAddCircle from "../../../assets/images/purpleAddCircle.png";
import textPos from "../../../assets/images/textPos.png";
import registerNewPos from "../../../assets/images/registerNewPos.png";
import grayCross from "../../../assets/images/grayCross.png";
import blackBackArrow from "../../../assets/images/blackBackArrow.png";
import { RegularButton } from "../../../components/Buttons/RegularButton";
import { useDispatch, useSelector } from "react-redux";
import {
  createCustomer,
  findAllCustomers,
  resetOrderState,
} from "../../../Redux/actions/PosActions/OrderActions";
import { HEIGHT } from "../../../helpers/utlils";
import { ToastError, ToastSuccess } from "../../../helpers/Toast";
import { Spinner } from "native-base";
import { primaryColor } from "../../../theme/colors";

export const PosMenuScreen = () => {
  const navigation = useNavigation();
  const phonneRef = useRef();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [isModal, setIsModal] = useState(false);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [unFormatted, setUnFormatted] = useState("");
  const [customersPage, setCustomersPage] = useState(0);
  const [filteredItem, setFiltereditem] = useState([]);
  const [searchPhoneNumber, setSearchPhoneNumber] = useState("");
  const [orderType, setOrderType] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [renderIt, setRenderIt] = useState(false);
  const defaultLocation = useSelector(
    (state) => state.locations.defaultLocation
  );
  const [SelectedAddress, setSelectedAddress] = useState("");
  const [listOfOtherAddress, setListOfOtherAddress] = useState([]);
  const [countryCode, setCountryCode] = useState("US");
  const [addCustomerLoading, setAddCustomerLoading] = useState(false);
  const { list } = useSelector((state) => state.pos.customers);

  useEffect(() => {
    if (!isFocused) return;

    dispatch(findAllCustomers({ locationId: defaultLocation.locationId }));
  }, [isFocused]);

  useEffect(() => {
    setFiltereditem(list ?? []);
  }, [list]);

  const addOtherAddress = ({ val, index }) => {
    const addresses = [...listOfOtherAddress];

    addresses[index] = { ...addresses[index], address: val };

    setListOfOtherAddress(addresses);
  };

  const createNewAddressField = () => {
    const addresses = [...listOfOtherAddress];

    addresses.push({ address: "" });

    setListOfOtherAddress(addresses);
  };

  const onCreateCustomer = () => {
    if (
      firstName.trim().length === 0 ||
      lastName.trim().length === 0 ||
      contact.trim().length === 0 ||
      address.trim().length === 0 ||
      unFormatted.trim().length === 0
    ) {
      ToastError("Kindly fill all fields");
      return;
    }

    const data = {
      locationId: defaultLocation.locationId,
      firstName: firstName,
      lastName: lastName,
      phone: contact,
      email: email,
      address: address,
      countryCode: phonneRef.current.getCallingCode(),
      country: phonneRef.current.getCountryCode(),
    };

    setAddCustomerLoading(true);

    createCustomer(data)
      .then(() => {
        setAddCustomerLoading(false);
        ToastSuccess("Success", "Customer added Successfully");
        clearAllFields();

        if (customersPage === 'custom') {
          setIsModal(false)
        }
        else {

          setCustomersPage(0);
        }
        dispatch(findAllCustomers({ locationId: defaultLocation.locationId }));
      })
      .catch((e) => {
        setAddCustomerLoading(true);
      });
  };

  const onClickCustomer = ({
    firstName,
    lastName,
    email,
    address,
    phone,
    countryCode,
    country,
    ...user
  }) => {
    setfirstName(firstName);
    setlastName(lastName);
    setEmail(email);
    setAddress(address);
    setUnFormatted();
    setCustomersPage(3);
    setUnFormatted(phone.replace("+", "").replace(countryCode, ""));
    setCountryCode(country);
    setSelectedUser({ firstName, lastName, email, address, ...user });
    setRenderIt(true);
  };

  const clearAllFields = () => {
    setfirstName("");
    setlastName("");
    setEmail("");
    setAddress("");
    setUnFormatted("");
    setCountryCode("US");
    setSelectedUser("");
    setRenderIt(false);
    setSelectedAddress("");
    setListOfOtherAddress([])
  };

  const searchKeyword = (text) => {
    const keyword = text?.toLowerCase();
    const realData = list;
    const finalData = realData.filter(
      (item) =>
        item.firstName?.toLowerCase()?.includes(keyword) ||
        item.lastName?.toLowerCase()?.includes(keyword) ||
        item.phone?.toLowerCase()?.includes(keyword)
    );

    setFiltereditem(finalData);
  };

  const closeModal = () => {
    setIsModal(false);
    setCustomersPage(0);
    clearAllFields();
  };

  return (
    <MainScreenContainer isDrawer shortDrawer noScroll>
      <View
        style={{
          width: "100%",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ width: "95%", maxWidth: 900 }}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={{
                width: "48%",
                height: 200,
                borderRadius: 12,
                backgroundColor: "#0184E9",
                justifyContent: "center",
                paddingLeft: 20,
              }}
              onPress={() => navigation.navigate("tableList")}
            >
              <Image
                source={tableService}
                style={{ width: 50, height: 50, resizeMode: "contain" }}
              />
              <Text
                style={{
                  fontSize: 30,
                  color: "white",
                }}
              >
                Table Service
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "48%",
                height: 200,
                borderRadius: 12,
                backgroundColor: "#0184E9",
                justifyContent: "center",
                paddingLeft: 20,
              }}
              onPressIn={() => {
                setIsModal(true);
                setOrderType("Takeaway");

              setCustomersPage(0);
              }}
            >
              <Image
                source={toGo}
                style={{ width: 50, height: 50, resizeMode: "contain" }}
              />
              <Text
                style={{
                  fontSize: 30,
                  color: "white",
                  marginTop: 5,
                }}
              >
                To Go
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: "100%",
              flexDirection: "row",

              justifyContent: "space-between",
              marginTop: 30,
            }}
          >
            <TouchableOpacity
              style={{
                width: "48%",
                height: 200,
                borderRadius: 12,
                backgroundColor: "#876FFF",
                paddingLeft: 20,
                justifyContent: "center",
              }}
              onPressIn={() => {
                setIsModal(true);
                setOrderType("Delivery");
                setCustomersPage(0);
              }}
            >
              <Image
                source={deliveryPos}
                style={{ width: 50, height: 50, resizeMode: "contain" }}
              />
              <Text
                style={{
                  fontSize: 30,
                  color: "white",
                  marginTop: 5,
                }}
              >
                Delivery
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "48%",
                height: 200,
                borderRadius: 12,
                backgroundColor: "#2936A3",
                paddingLeft: 20,
                justifyContent: "center",
              }}
              onPress={() => navigation.navigate("currentOrders")}
            >
              <Image
                source={currentOrders}
                style={{ width: 50, height: 50, resizeMode: "contain" }}
              />
              <Text
                style={{
                  fontSize: 30,
                  color: "white",
                  marginTop: 5,
                }}
              >
                Current Orders
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 30,
            }}
          >
            <View
              style={{
                width: "48%",
                height: 200,
                borderRadius: 12,
                backgroundColor: "#876FFF",
                paddingLeft: 20,
                justifyContent: "center",
              }}
            >
              <Image
                source={textPos}
                style={{ width: 50, height: 50, resizeMode: "contain" }}
              />
              <Text
                style={{
                  fontSize: 30,
                  color: "white",
                  marginTop: 5,
                }}
              >
                Text
              </Text>
            </View>
            <TouchableOpacity
              style={{
                width: "48%",
                height: 200,
                borderRadius: 12,
                backgroundColor: "#2936A3",
                paddingLeft: 20,
                justifyContent: "center",
              }}
              onPressIn={() => {
                setIsModal(true)
                setCustomersPage("custom")
              }}
            >
              <Image
                source={registerNewPos}
                style={{ width: 50, height: 50, resizeMode: "contain" }}
              />
              <Text
                style={{
                  fontSize: 30,
                  color: "white",
                  marginTop: 5,
                }}
              >
                Register a new customer
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* new customer modal */}
      <Modal
        onShow={() => {
          dispatch(findAllCustomers({ locationId: defaultLocation.locationId }))
          clearAllFields()
        }
        }
        onRequestClose={closeModal}
        visible={isModal}
      >
        <View
          style={{
            width: "90%",
            maxWidth: 700,
            borderWidth: 1,
            padding: 20,
            backgroundColor: "#FBFAFB",
            paddingVertical: 30,
            borderRadius: 20,
            maxHeight: HEIGHT * 0.8,
            overflow: "hidden",
          }}
        >
          {customersPage === 1 || (customersPage === 3 && renderIt) || customersPage === 'custom' ? (
            <ScrollView>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {customersPage === 3 ? (
                  <TouchableOpacity
                    style={{
                      width: 250,
                      height: 60,
                      backgroundColor: "#576984",
                      borderRadius: 8,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => {
                      setIsModal(false);
                      setCustomersPage(0);
                      dispatch(resetOrderState());
                      navigation.navigate("orderTaking", {
                        customer: {
                          ...selectedUser,
                          address:
                            SelectedAddress === ""
                              ? selectedUser.address
                              : listOfOtherAddress[SelectedAddress].address,
                        },
                        orderType,
                      });
                    }}
                  >
                    <Text style={{ fontSize: 22, color: "white" }}>
                      Save & Punch Order
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      borderColor: "#A461D8",
                      backgroundColor: "white",
                      width: 120,
                      height: 40,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 8,
                    }}
                    disabled={addCustomerLoading}
                    onPress={onCreateCustomer}
                  >
                    {addCustomerLoading ? (
                      <Spinner color={primaryColor} />
                    ) : (
                      <Text
                        style={{
                          color: "#A461D8",
                          fontSize: 18,
                          fontFamily: "openSans_semiBold",
                        }}
                      >
                        Save
                      </Text>
                    )}
                  </TouchableOpacity>
                )}

                <Text
                  style={{
                    color: "#A461D8",
                    fontSize: 25,
                    fontFamily: "openSans_semiBold",
                  }}
                >
                  {customersPage === 3 ? "Edit Customer" : "New Customer"}
                </Text>

                {customersPage === 3 ? (
                  <TouchableOpacity
                    onPress={() => {
                      setCustomersPage(2);
                      clearAllFields();
                    }}
                  >
                    <Image
                      source={grayCross}
                      style={{ width: 40, height: 40 }}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={customersPage === "custom" ? () => { setIsModal(false); clearAllFields() } : () => setCustomersPage(0)}
                    style={{
                      borderWidth: 1,
                      borderColor: "#A461D8",
                      backgroundColor: "white",
                      width: 120,
                      height: 40,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 8,
                    }}
                  >
                    <Text
                      style={{
                        color: "#A461D8",
                        fontSize: 18,
                        fontFamily: "openSans_semiBold",
                      }}
                    >
                      Cancel
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 30,
                }}
              >
                <Input
                  value={firstName}
                  setValue={(val) => setfirstName(val)}
                  placeholder={"First name"}
                  style={{
                    width: "48%",
                    borderWidth: 1,
                    borderColor: "#ECECF2",
                    borderBottomWidth: 1,
                  }}
                />
                <Input
                  value={lastName}
                  setValue={(val) => setlastName(val)}
                  placeholder={"Last name"}
                  style={{
                    width: "48%",
                    borderWidth: 1,
                    borderColor: "#ECECF2",
                    borderBottomWidth: 1,
                  }}
                />
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 30,
                }}
              >
                <PhoneInput
                  textInputProps={{ value: unFormatted }}
                  defaultCode={countryCode}
                  ref={phonneRef}
                  layout="first"
                  onChangeText={(text) => {
                    setUnFormatted(text);
                  }}
                  onChangeFormattedText={(text) => {
                    setContact(text);
                  }}
                  containerStyle={{
                    backgroundColor: "white",
                    width: "48%",
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: "#ECECF2",
                    borderBottomWidth: 1,
                  }}
                  flagButtonStyle={{
                    width: 60,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop: 15,
                    paddingLeft: 10,
                  }}
                  textContainerStyle={{
                    backgroundColor: "white",
                    flex: 1,
                    borderRadius: 10,
                  }}
                />
                <Input
                  value={email}
                  setValue={(val) => setEmail(val)}
                  placeholder={"Email address"}
                  style={{
                    width: "48%",
                    borderWidth: 1,
                    borderColor: "#ECECF2",
                    borderBottomWidth: 1,
                  }}
                />
              </View>

              {customersPage === 3 ? (
                <>
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Input
                      value={address}
                      setValue={(val) => setAddress(val)}
                      textarea
                      placeholder={"Saved Address"}
                      style={{
                        marginTop: 30,
                        borderWidth: 1,
                        borderColor: "#ECECF2",
                        borderBottomWidth: 1,
                        width: "80%",
                      }}
                    />

                    <View
                      style={{
                        width: "20%",
                        alignItems: "center",
                        marginTop: 20,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => setSelectedAddress("")}
                        style={{
                          width: 40,
                          height: 40,
                          backgroundColor:
                            SelectedAddress === "" ? primaryColor : "white",
                          borderRadius: 8,
                          borderWidth: 3,
                          borderColor: primaryColor,
                          marginTop: 20,
                        }}
                      ></TouchableOpacity>
                    </View>
                  </View>

                  {listOfOtherAddress.map((item, i) => (
                    <View
                      key={i}
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Input
                        setValue={(val) =>
                          addOtherAddress({ val, index: i })
                        }
                        value={item.address}
                        textarea
                        placeholder={"Current Delivery address "}
                        style={{
                          marginTop: 30,
                          borderWidth: 1,
                          borderColor: "#ECECF2",
                          borderBottomWidth: 1,
                          width: "80%",
                        }}
                      />

                      <View
                        style={{
                          width: "20%",
                          alignItems: "center",
                          marginTop: 20,
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => setSelectedAddress(i)}
                          style={{
                            width: 40,
                            height: 40,
                            backgroundColor:
                              SelectedAddress === i ? primaryColor : "white",
                            borderRadius: 8,
                            borderWidth: 3,
                            borderColor: primaryColor,
                            marginTop: 20,
                          }}
                        ></TouchableOpacity>
                      </View>
                    </View>
                  ))}

                  <View style={{ marginTop: 30 }} />
                  <TouchableOpacity
                    onPress={createNewAddressField}
                    style={{
                      width: "100%",
                      borderRadius: 8,
                      backgroundColor: "white",
                      borderWidth: 3,
                      borderColor: primaryColor,
                      padding: 10,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingHorizontal: 20,
                    }}
                  >
                    <Image
                      source={purpleAddCircle}
                      style={{ width: 40, height: 40 }}
                    />
                    <Image
                      source={addressToGo}
                      style={{ width: 40, height: 40 }}
                    />
                  </TouchableOpacity>
                </>
              ) : (
                <Input
                  value={address}
                  setValue={(val) => setAddress(val)}
                  textarea
                  placeholder={"Address"}
                  style={{
                    marginTop: 30,
                    borderWidth: 1,
                    borderColor: "#ECECF2",
                    borderBottomWidth: 1,
                    width: "100%",
                  }}
                />
              )}
            </ScrollView>
          ) : customersPage === 2 ? (
            <View style={{ width: "100%" }}>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View />

                <Text
                  style={{
                    color: "#A461D8",
                    fontSize: 22,
                    fontFamily: "openSans_semiBold",
                  }}
                >
                  Enter Customer Info
                </Text>

                <TouchableOpacity onPress={() => setCustomersPage(0)}>
                  <Image source={grayCross} style={{ width: 40, height: 40 }} />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() => setCustomersPage(1)}
                style={{
                  width: "100%",
                  height: 70,
                  backgroundColor: "#E6EAFF",
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 40,
                  flexDirection: "row",
                }}
              >
                <Image
                  source={blackBackArrow}
                  style={{ width: 20, height: 20, resizeMode: "contain" }}
                />
                <Text style={{ fontSize: 22, color: "black", marginLeft: 20 }}>
                  New Customer
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                disabled
                style={{
                  width: "100%",
                  height: 100,
                  backgroundColor: "#0184E9",
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 20,
                }}
              >
                <Text style={{ fontSize: 22, color: "white" }}>
                  Existing Customer?
                </Text>
                <Text style={{ fontSize: 18, color: "white" }}>
                  Search by phone number
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 25,
                }}
              >
                <Input
                  keyboardType={"number-pad"}
                  placeholder={"Phone number"}
                  value={searchPhoneNumber}
                  setValue={(val) => {
                    searchKeyword(val);
                    setSearchPhoneNumber(val);
                  }}
                  style={{
                    width: "70%",
                    borderWidth: 1,
                    borderColor: "#ECECF2",
                    borderBottomWidth: 1,
                  }}
                />
                <RegularButton
                  text={"Search"}
                  style={{ width: "28%", height: 60 }}
                />
              </View>

              <View style={{ width: "100%", marginTop: 30 }}>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 15,
                  }}
                >
                  <View style={{ width: "30%", minWidth: 100 }}>
                    <Text
                      style={{
                        fontFamily: "openSans_bold",
                        fontSize: 16,
                        color: "#44444F",
                        marginLeft: 10,
                        textTransform: "uppercase",
                      }}
                    >
                      first name
                    </Text>
                  </View>
                  <View style={{ width: "30%", minWidth: 100 }}>
                    <Text
                      style={{
                        fontFamily: "openSans_bold",
                        fontSize: 16,
                        color: "#44444F",
                        marginLeft: 10,
                        textTransform: "uppercase",
                      }}
                    >
                      last name
                    </Text>
                  </View>
                  <View style={{ width: "40%", minWidth: 100 }}>
                    <Text
                      style={{
                        fontFamily: "openSans_bold",
                        fontSize: 16,
                        color: "#44444F",
                        marginLeft: 10,
                        textTransform: "uppercase",
                      }}
                    >
                      Phone number
                    </Text>
                  </View>
                </View>

                <ScrollView style={{ width: "100%", height: "50%" }}>
                  {filteredItem.map((item, i) => (
                    <TouchableOpacity
                      onPress={() => onClickCustomer(item)}
                      key={i}
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor:
                          i % 2 === 0 ? "#FFFFFF" : "rgba(0,0,0,0)",
                        padding: 15,
                      }}
                    >
                      <View style={{ width: "30%", minWidth: 100 }}>
                        <Text
                          style={{
                            fontSize: 18,
                            color: "black",
                            marginLeft: 10,
                          }}
                        >
                          {item?.firstName}
                        </Text>
                      </View>
                      <View style={{ width: "30%", minWidth: 100 }}>
                        <Text
                          style={{
                            fontSize: 18,
                            color: "black",
                            marginLeft: 10,
                          }}
                        >
                          {item?.lastName}
                        </Text>
                      </View>
                      <View style={{ width: "40%", minWidth: 100 }}>
                        <Text
                          style={{
                            fontSize: 18,
                            color: "black",
                            marginLeft: 10,
                            textTransform: "uppercase",
                          }}
                        >
                          {item?.phone}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          ) : (
            <View style={{ width: "100%" }}>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View />

                <Text
                  style={{
                    color: "#A461D8",
                    fontSize: 22,
                    fontFamily: "openSans_semiBold",
                  }}
                >
                  Enter Customer Info
                </Text>

                <TouchableOpacity onPress={closeModal}>
                  <Image source={grayCross} style={{ width: 40, height: 40 }} />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 40,
                }}
              >
                <TouchableOpacity
                  onPress={() => setCustomersPage(1)}
                  style={{
                    width: "48%",
                    height: 100,
                    backgroundColor: "#59C7B0",
                    borderRadius: 8,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 22, color: "white" }}>
                    New Customer
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setCustomersPage(2)}
                  style={{
                    width: "48%",
                    height: 100,
                    backgroundColor: "#0184E9",
                    borderRadius: 8,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 22, color: "white" }}>
                    Existing Customer?
                  </Text>
                  <Text style={{ fontSize: 18, color: "white" }}>
                    Search by phone number
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </Modal>
    </MainScreenContainer>
  );
};
