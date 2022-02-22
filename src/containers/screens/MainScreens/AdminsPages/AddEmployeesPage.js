import React, { useEffect, useRef, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Input } from "../../../../components/Inputs/Input";
import { Text } from "../../../../components/Text/Text";
import { primaryColor } from "../../../../theme/colors";
import { RegularButton } from "../../../../components/Buttons/RegularButton";
import { MainScreenContainer } from "../../../MainScreenContainers";
import cashier from "../../../../assets/images/cashier.png";
import switchOn from "../../../../assets/images/switchOn.png";
import switchOff from "../../../../assets/images/switchOff.png";
import grayCircle from "../../../../assets/images/grayCircle.png";
import checkCircle from "../../../../assets/images/checkCircle.png";
import purpleCashier from "../../../../assets/images/purpleCashier.png";
import { MealItem } from "../../../../components/Meals/MealItem";
import { ToastError } from "../../../../helpers/Toast";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../Redux/actions/EmployeeActions/EmployeeActions";
import { useNavigation } from "@react-navigation/core";
import deleteIconWhite from "../../../../assets/images/deleteIconWhite.png";
import { DeleteModal } from "../../../../components/Meals/DeleteModal";
import { Dropdown } from "../../../../components/Inputs/DropDown";
import { HeadingBox } from "../../../../components/HeadingBox/HeadingBox";
import BottomSheet from "react-native-gesture-bottom-sheet";

export const AddEmployeesPage = (props) => {
  const dispatch = useDispatch();
  const bottomSheet = useRef();
  const navigation = useNavigation();
  const user = useSelector((state) => state.auth.user.user);
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
        type = "",
      } = data;

      setIsEdit(true);
      setavailable(active);
      setEmail(email);
      setContact(phone);
      setlastName(lastName);
      setfirstName(firstName);
      setSelectedType(type);
    }
  }, []);

  const addEmployee = () => {
    if (
      selectedType.trim().length === 0 ||
      firstName.trim().length === 0 ||
      lastName.trim().length === 0 ||
      contact.trim().length === 0
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
        active: available,
        navigation,
        employeeId: props.route.params.data.employeeId,
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
      active: available,
      navigation,
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
            />
          ) : (
            <View
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
            </View>
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

        <View style={{ width: "100%", marginTop: 20 }}>
          <MealItem
            label={"Availability"}
            text={available ? "Available" : "Hidden"}
            icon={available ? switchOn : switchOff}
            onIconClick={() => setavailable(!available)}
          />
        </View>

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
          height={800}
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

            {roles.map((item, i) => (
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

                  <Text style={{ fontSize: 21, marginLeft: 20 }}>{item}</Text>
                </View>

                <Image
                  source={selectedType === item ? checkCircle : grayCircle}
                  style={{ width: 50, height: 50, marginRight: 30 }}
                />
              </TouchableOpacity>
            ))}
          </View>
        </BottomSheet>
      </View>
    </MainScreenContainer>
  );
};
