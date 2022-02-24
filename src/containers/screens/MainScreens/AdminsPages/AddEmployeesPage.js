import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { Input } from "../../../../components/Inputs/Input";
import { Text } from "../../../../components/Text/Text";
import { RegularButton } from "../../../../components/Buttons/RegularButton";
import { MainScreenContainer } from "../../../MainScreenContainers";
import cashier from "../../../../assets/images/cashier.png";
import grayCircle from "../../../../assets/images/grayCircle.png";
import checkCircle from "../../../../assets/images/checkCircle.png";
import purpleClock from "../../../../assets/images/purpleClock.png";
import purpleCalendar from "../../../../assets/images/purpleCalendar.png";
import purpleCashier from "../../../../assets/images/purpleCashier.png";
import { ToastError } from "../../../../helpers/Toast";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../Redux/actions/EmployeeActions/EmployeeActions";
import { useNavigation } from "@react-navigation/core";
import deleteIconWhite from "../../../../assets/images/deleteIconWhite.png";
import { DeleteModal } from "../../../../components/Meals/DeleteModal";
import { HeadingBox } from "../../../../components/HeadingBox/HeadingBox";
import BottomSheet from "react-native-gesture-bottom-sheet";
import { HEIGHT } from "../../../../helpers/utlils";
import { DateTimeSelector } from "../../../../components/DateTimeSelector/DateTimeSelector";
import moment from "moment";

export const AddEmployeesPage = (props) => {
  const dispatch = useDispatch();
  const bottomSheet = useRef();
  const shiftSheet = useRef();
  const navigation = useNavigation();
  const device = useSelector((state) => state.system.device);
  const user = useSelector((state) => state.auth.user.user);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const isLoading = useSelector(
    (state) => state.employee.addEmployee.isLoading
  );
  const deleteLoading = useSelector(
    (state) => state.employee.deleteEmployee.isLoading
  );
  const deleteError = useSelector(
    (state) => state.employee.deleteEmployee.isError
  );
  const defaultLocation = useSelector(
    (state) => state.locations.defaultLocation
  );
  const [selectedType, setSelectedType] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [available, setavailable] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);
  const [roles, setRoles] = useState([]);
  const [selectedShiftDays, setSelectedShiftDays] = useState([]);
  const [shiftStartTime, setShiftStartTime] = useState(new Date(1598051730000));
  const [shiftEndTime, setShiftEndTime] = useState(new Date(1598051730000));

  const sorter = {
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
    sunday: 7,
  };

  const shiftDaysSelection = (item) => {
    const check = selectedShiftDays.filter((data) => data === item).length > 0;

    if (check) {
      setSelectedShiftDays(selectedShiftDays.filter((data) => data !== item));
      return;
    }

    setSelectedShiftDays([...selectedShiftDays, item]);
  };

  useEffect(() => {
    if (!deleteError) return;

    setdeleteModal(false);
  }, [deleteError]);

  useEffect(() => {
    actions.getEmployeeRoles().then((res) => setRoles(res));

    const data = props?.route?.params?.data;

    if (data) {
      const {
        active = "",
        lastName = "",
        email = "",
        phone = "",
        firstName = "",
        role = "",
      } = data;

      setIsEdit(true);
      setavailable(active);
      setEmail(email);
      setContact(phone);
      setlastName(lastName);
      setfirstName(firstName);
      setSelectedType(role);
    }
  }, []);

  const addEmployee = () => {
    if (
      selectedType.trim().length === 0 ||
      firstName.trim().length === 0 ||
      lastName.trim().length === 0 ||
      contact.trim().length === 0 ||
      selectedShiftDays.length === 0
    ) {
      ToastError("Kindly all fields");
      return;
    }

    if (isEdit) {
      const data = {
        locationId: defaultLocation.locationId,
        firstName,
        lastName,
        phone: contact,
        role: selectedType,
        active: true,
        navigation,
        employeeId: props.route.params.data.employeeId,
        shift: {
          days: selectedShiftDays,
          timings: {
            startTime: moment(shiftStartTime),
            endTime: moment(shiftEndTime),
          },
        },
      };

      dispatch(actions.editEmployeeAction(data));
      return;
    }

    const data = {
      locationId: defaultLocation.locationId,
      firstName,
      lastName,
      phone: contact,
      role: selectedType,
      active: true,
      navigation,
      shift: {
        days: selectedShiftDays,
        timings: {
          startTime: moment(shiftStartTime),
          endTime: moment(shiftEndTime),
        },
      },
    };

    dispatch(actions.addEmployeeAction(data));
  };

  const deleteEmployee = () =>
    dispatch(
      actions.deleteEmployee({
        locationId: defaultLocation.locationId,
        employeeId: props.route.params.data.employeeId,
        navigation,
      })
    );

  return (
    <MainScreenContainer
      rightImage={isEdit ? deleteIconWhite : ""}
      onPressRight={isEdit ? () => setdeleteModal(true) : () => null}
      title={isEdit ? "Edit Employee" : "Add Employee"}
    >
      <HeadingBox heading={isEdit ? "Edit employee" : "Add employee"} />
      <DeleteModal
        onRequestClose={() => setdeleteModal(false)}
        visible={deleteModal}
        isLoading={deleteLoading}
        onDelete={deleteEmployee}
        deleteItemText={"this employee?"}
        heading={"Delete Employee?"}
      />

      <View style={{ width: "90%", marginVertical: 20, marginBottom: 80 }}>
        <View style={{ width: "100%" }}>
          <Input
            value={firstName}
            setValue={(val) => setfirstName(val)}
            placeholder={"First name"}
          />
        </View>

        <View style={{ width: "100%", marginTop: 20 }}>
          <Input
            placeholder={"Last Name"}
            value={lastName}
            setValue={(val) => setlastName(val)}
          />
        </View>

        <View style={{ width: "100%", marginTop: 20 }}>
          <Input
            value={contact}
            setValue={(val) => setContact(val)}
            keyboardType={"number-pad"}
            placeholder={"Contact number"}
          />
        </View>

        {/* <View style={{ width: "100%", marginTop: 20 }}>
          <Input
            keyboardType={"email-address"}
            placeholder={"Email address"}
            value={email}
            setValue={(val) => setEmail(val)}
          />
        </View> */}

        <View style={{ width: "100%", marginTop: 20, zIndex: 1 }}>
          {selectedType === "" ? (
            <Input
              value={selectedType}
              setValue={(val) => null}
              keyboardType={"number-pad"}
              placeholder={"Role"}
              editable={false}
              onPress={() => bottomSheet.current.show()}
              noInput
            />
          ) : (
            <TouchableOpacity
              onPress={() => bottomSheet.current.show()}
              style={{
                width: "100%",
                height: 80,
                borderWidth: 2,
                borderColor: "#A461D8",
                backgroundColor: "white",
                borderRadius: 8,
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 20,
              }}
            >
              <Image source={purpleCashier} style={{ width: 50, height: 50 }} />

              <Text
                style={{
                  fontSize: 18,
                  marginLeft: 20,
                  color: "#A461D8",
                  fontFamily: "openSans_bold",
                }}
              >
                {selectedType}
              </Text>
            </TouchableOpacity>
          )}
          <View style={{ marginTop: 20 }} />
          {selectedShiftDays.length === 0 ? (
            <Input
              value={""}
              setValue={(val) => null}
              keyboardType={"number-pad"}
              placeholder={"Select Shift"}
              editable={false}
              onPress={() => shiftSheet.current.show()}
              noInput
            />
          ) : (
            <TouchableOpacity
              onPress={() => shiftSheet.current.show()}
              style={{
                width: "100%",
                height: 80,
                borderWidth: 2,
                borderColor: "#A461D8",
                backgroundColor: "white",
                borderRadius: 8,
                paddingLeft: 20,
              }}
            >
              <Text style={{ marginTop: 10, color: "gray" }}>Select Shift</Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  // justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    style={{ width: 20, height: 20 }}
                    source={purpleClock}
                  />

                  <Text
                    style={{
                      fontSize: 18,
                      color: "#A461D8",
                      fontFamily: "openSans_bold",
                      marginLeft: 10,
                    }}
                  >
                    {moment(shiftStartTime).format("h:mm a")} -{" "}
                    {moment(shiftEndTime).format("h:mm a")}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: 40,
                  }}
                >
                  <Image
                    style={{ width: 20, height: 20 }}
                    source={purpleCalendar}
                  />

                  <Text
                    style={{
                      fontSize: 18,
                      color: "#A461D8",
                      fontFamily: "openSans_bold",
                      marginLeft: 10,
                    }}
                    numberOfLines={1}
                  >
                    {selectedShiftDays.length > 1
                      ? `${selectedShiftDays.join(" - ")}`
                      : selectedShiftDays[0]}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          {/* <Dropdown
            selectedMenu={selectedType}
            setMenu={setSelectedType}
            placeholder={"Role"}
            menus={roles}
            style={{ zIndex: 3 }}
          /> */}
          {/* <View
            style={{
              width: "100%",
              backgroundColor: "white",
              borderRadius: 10,
              padding: 10,
              height: 90,
              flexDirection: "column",
            }}
          >
            <Text style={{ color: "gray" }}>Type</Text>

            <View style={{ width: "100%", flexDirection: "row" }}>
              <TouchableOpacity
                style={{
                  borderTopLeftRadius: 50,
                  borderBottomLeftRadius: 50,
                  borderWidth: 1,
                  borderColor: primaryColor,
                  width: "25%",
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 10,
                  backgroundColor:
                    selectedType === "Cashier" ? primaryColor : "white",
                }}
                onPress={() => setSelectedType("Cashier")}
              >
                <Text
                  style={{
                    color: selectedType === "Cashier" ? "white" : primaryColor,
                    fontFamily: "openSans_semiBold",
                  }}
                >
                  Cashier
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderColor: primaryColor,
                  width: "25%",
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 10,
                  borderWidth: 1,
                  backgroundColor:
                    selectedType === "Manager" ? primaryColor : "white",
                }}
                onPress={() => setSelectedType("Manager")}
              >
                <Text
                  style={{
                    color: selectedType === "Manager" ? "white" : primaryColor,
                    fontFamily: "openSans_semiBold",
                  }}
                >
                  Manager
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderColor: primaryColor,
                  width: "25%",
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 10,
                  backgroundColor:
                    selectedType === "Kitchen Staff" ? primaryColor : "white",
                }}
                onPress={() => setSelectedType("Kitchen Staff")}
              >
                <Text
                  style={{
                    color:
                      selectedType === "Kitchen Staff" ? "white" : primaryColor,
                    fontFamily: "openSans_semiBold",
                  }}
                >
                  Kitchen Staff
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderTopRightRadius: 50,
                  borderBottomRightRadius: 50,
                  borderWidth: 1,
                  borderColor: primaryColor,
                  width: "25%",
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 10,
                  backgroundColor:
                    selectedType === "Order Taker" ? primaryColor : "white",
                }}
                onPress={() => setSelectedType("Order Taker")}
              >
                <Text
                  style={{
                    color:
                      selectedType === "Order Taker" ? "white" : primaryColor,
                    fontFamily: "openSans_semiBold",
                  }}
                >
                  Order Taker
                </Text>
              </TouchableOpacity>
            </View>
          </View> */}
        </View>

        {/* <View style={{ width: "100%", marginTop: 20 }}>
          <MealItem
            label={"Availability"}
            text={available ? "Available" : "Hidden"}
            icon={available ? switchOn : switchOff}
            onIconClick={() => setavailable(!available)}
          />
        </View> */}

        <View style={{ width: "100%", marginTop: 20 }}>
          <RegularButton
            onPress={addEmployee}
            isLoading={isLoading}
            text={isEdit ? "Update" : "Save"}
          />
        </View>

        <BottomSheet
          sheetBackgroundColor={"white"}
          hasDraggableIcon
          ref={bottomSheet}
          height={700}
        >
          <View style={{ width: "100%", flex: 1, backgroundColor: "white" }}>
            <View style={{ marginLeft: 30, marginTop: 40, marginBottom: 30 }}>
              <Text
                style={{
                  fontSize: 26,
                  color: "#363636",
                  fontFamily: "openSans_semiBold",
                }}
              >
                Select the Role
              </Text>
            </View>

            {roles
              .filter((item) => item !== "OWNER")
              .map((item, i) => (
                <TouchableOpacity
                  key={i}
                  style={{
                    width: "100%",
                    height: 100,
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingLeft: 30,
                    backgroundColor: i % 2 === 0 ? "#FAFAFB" : "white",
                  }}
                  onPress={() => setSelectedType(item)}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image source={cashier} style={{ width: 50, height: 50 }} />

                    <Text
                      style={{
                        fontSize: device === "tablet" ? 21 : 18,
                        marginLeft: 20,
                      }}
                    >
                      {item}
                    </Text>
                  </View>

                  <Image
                    source={selectedType === item ? checkCircle : grayCircle}
                    style={{
                      width: device === "tablet" ? 50 : 30,
                      height: device === "tablet" ? 50 : 30,
                      marginRight: 30,
                    }}
                  />
                </TouchableOpacity>
              ))}
          </View>
        </BottomSheet>

        {/* select shift */}
        <BottomSheet
          sheetBackgroundColor={"white"}
          hasDraggableIcon
          ref={shiftSheet}
          height={HEIGHT / 1.3}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ width: "100%" }}
          >
            <View
              style={{
                width: "100%",
                flex: 1,
                backgroundColor: "white",
                alignItems: "center",
              }}
            >
              <View style={{ marginTop: 40, marginBottom: 30, width: "90%" }}>
                <Text
                  style={{
                    fontSize: 26,
                    color: "#000000",
                    fontFamily: "openSans_semiBold",
                  }}
                >
                  Assign Shift or Select Shift
                </Text>
                <Text
                  style={{
                    fontSize: device === "tablet" ? 24 : 20,
                    color: "#363636",
                    fontFamily: "openSans_semiBold",
                    marginTop: 43,
                  }}
                >
                  Select Days
                </Text>

                <View
                  style={{
                    width: "100%",
                    backgroundColor: "#FAFAFA",
                    borderRadius: 8,
                    padding: device === "tablet" ? 20 : 10,
                    marginTop: 16,
                  }}
                >
                  <FlatList
                    data={[
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                      "Sunday",
                    ]}
                    keyExtractor={(item) => item}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={{
                          width: "48%",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          height: 75,
                          marginTop: 20,
                          backgroundColor:
                            selectedShiftDays.filter((data) => data === item)
                              .length > 0
                              ? "#A461D8"
                              : "white",
                          paddingLeft: device === "tablet" ? 20 : 10,
                          borderRadius: 8,
                        }}
                        onPress={() => shiftDaysSelection(item)}
                      >
                        <Text
                          style={{
                            fontSize: device === "tablet" ? 21 : 18,
                            color:
                              selectedShiftDays.filter((data) => data === item)
                                .length > 0
                                ? "white"
                                : "black",
                          }}
                        >
                          {item}
                        </Text>

                        <Image
                          source={
                            selectedShiftDays.filter((data) => data === item)
                              .length > 0
                              ? checkCircle
                              : grayCircle
                          }
                          style={{
                            width: device === "tablet" ? 50 : 30,
                            height: device === "tablet" ? 50 : 30,
                            marginRight: 30,
                            ...(selectedShiftDays.filter(
                              (data) => data === item
                            ).length > 0 && { tintColor: "white" }),
                          }}
                        />
                      </TouchableOpacity>
                    )}
                  />
                </View>

                <View style={{ width: "100%", marginTop: 10 }}>
                  <Text
                    style={{
                      fontSize: 24,
                      color: "#363636",
                      fontFamily: "openSans_semiBold",
                      marginTop: 43,
                    }}
                  >
                    Select Time(s)
                  </Text>

                  <View
                    style={{
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexDirection: "row",
                      marginTop: 20,
                    }}
                  >
                    <Input
                      noInput
                      onPress={() => setShow1(true)}
                      value={moment(shiftStartTime).format("h:mm a")}
                      setValue={(val) => null}
                      editable={false}
                      style={{
                        width: "48%",
                        borderWidth: 2,
                        borderBottomWidth: 2,
                      }}
                      placeholder={"Start Time"}
                    />
                    <Input
                      noInput
                      onPress={() => setShow2(true)}
                      value={moment(shiftEndTime).format("h:mm a")}
                      setValue={(val) => null}
                      editable={false}
                      style={{
                        width: "48%",
                        borderWidth: 1,
                        borderBottomWidth: 1,
                      }}
                      placeholder={"End Time"}
                    />
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>

          <DateTimeSelector
            show={show1 || show2}
            value={show1 ? shiftStartTime : shiftEndTime}
            mode={"time"}
            is24Hour={true}
            onChange={
              show1
                ? (date) => setShiftStartTime(date)
                : (date) => setShiftEndTime(date)
            }
            onPress={() => {
              setShow1(false);
              setShow2(false);
            }}
          />
        </BottomSheet>
      </View>
    </MainScreenContainer>
  );
};
