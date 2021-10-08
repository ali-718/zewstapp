import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Input } from "../../../../components/Inputs/Input";
import { Text } from "../../../../components/Text/Text";
import { primaryColor } from "../../../../theme/colors";
import { RegularButton } from "../../../../components/Buttons/RegularButton";
import { MainScreenContainer } from "../../../MainScreenContainers";
import switchOn from "../../../../assets/images/switchOn.png";
import switchOff from "../../../../assets/images/switchOff.png";
import { MealItem } from "../../../../components/Meals/MealItem";
import { ToastError } from "../../../../helpers/Toast";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../Redux/actions/EmployeeActions/EmployeeActions";
import { useNavigation } from "@react-navigation/core";
import deleteIconWhite from "../../../../assets/images/deleteIconWhite.png";
import { DeleteModal } from "../../../../components/Meals/DeleteModal";

export const AddEmployeesPage = (props) => {
  const dispatch = useDispatch();
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
  const [selectedType, setSelectedType] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [available, setavailable] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);

  useEffect(() => {
    if (!deleteError) return;

    setdeleteModal(false);
  }, [deleteError]);

  useEffect(() => {
    const data = props?.route?.params?.data;

    if (data) {
      const { active, lastName, email, phone, firstName, type } = data;

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
      contact.trim().length === 0 ||
      email.trim().length === 0
    ) {
      ToastError("Kindly all fields");
      return;
    }

    if (isEdit) {
      const data = {
        clientId: user.clientId,
        firstName,
        lastName,
        phone: contact,
        email: email,
        type: selectedType,
        active: available,
        navigation,
        employeeId: props.route.params.data.employeeId,
      };

      dispatch(actions.editEmployeeAction(data));
      return;
    }

    const data = {
      clientId: user.clientId,
      firstName,
      lastName,
      phone: contact,
      email: email,
      type: selectedType,
      active: available,
      navigation,
    };

    dispatch(actions.addEmployeeAction(data));
  };

  const deleteEmployee = () =>
    dispatch(
      actions.deleteEmployee({
        clientId: user?.clientId,
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
      <DeleteModal
        onRequestClose={() => setdeleteModal(false)}
        visible={deleteModal}
        isLoading={deleteLoading}
        onDelete={deleteEmployee}
        deleteItemText={"this employee?"}
        heading={"Delete Employee?"}
      />

      <View style={{ width: "90%", marginVertical: 20, marginBottom: 40 }}>
        <View style={{ width: "100%" }}>
          <Input
            value={firstName}
            setValue={(val) => setfirstName(val)}
            placeholder={"First name*"}
          />
        </View>

        <View style={{ width: "100%", marginTop: 20 }}>
          <Input
            placeholder={"Last Name*"}
            value={lastName}
            setValue={(val) => setlastName(val)}
          />
        </View>

        <View style={{ width: "100%", marginTop: 20 }}>
          <Input
            value={contact}
            setValue={(val) => setContact(val)}
            keyboardType={"number-pad"}
            placeholder={"Contact number*"}
          />
        </View>

        <View style={{ width: "100%", marginTop: 20 }}>
          <Input
            keyboardType={"email-address"}
            placeholder={"Email address*"}
            value={email}
            setValue={(val) => setEmail(val)}
          />
        </View>

        <View style={{ width: "100%", marginTop: 20 }}>
          <View
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
                  width: "33%",
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
                  width: "33%",
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 10,
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
                  borderTopRightRadius: 50,
                  borderBottomRightRadius: 50,
                  borderWidth: 1,
                  borderColor: primaryColor,
                  width: "33%",
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 10,
                  backgroundColor:
                    selectedType === "Host" ? primaryColor : "white",
                }}
                onPress={() => setSelectedType("Host")}
              >
                <Text
                  style={{
                    color: selectedType === "Host" ? "white" : primaryColor,
                    fontFamily: "openSans_semiBold",
                  }}
                >
                  Host
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{ width: "100%", marginTop: 10 }}>
          <MealItem
            label={"Availability*"}
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
            style={{ borderRadius: 50 }}
          />
        </View>
      </View>
    </MainScreenContainer>
  );
};
