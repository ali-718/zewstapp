import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../../../../components/Inputs/Input";
import { MainScreenContainer } from "../../../MainScreenContainers";
import { ToastError } from "../../../../helpers/Toast";
import * as actions from "../../../../Redux/actions/VendorActions/VendorActions";
import { useNavigation } from "@react-navigation/core";
import { DeleteModal } from "../../../../components/Meals/DeleteModal";
import { HeadingBox } from "../../../../components/HeadingBox/HeadingBox";
import { RegularButton } from "../../../../components/Buttons/RegularButton";

export const AddVendorsPage = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const device = useSelector((state) => state.system.device);
  const defaultLocation = useSelector(
    (state) => state.locations.defaultLocation
  );
  const isLoading = useSelector((state) => state.vendor.addVendors.isLoading);
  const deleteLoading = useSelector(
    (state) => state.vendor.deleteVendors.isLoading
  );
  const deleteError = useSelector(
    (state) => state.vendor.deleteVendors.isError
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);

  useEffect(() => {
    if (!deleteError) return;
    setdeleteModal(false);
  }, [deleteError]);

  useEffect(() => {
    const data = props?.route?.params?.data;

    if (data) {
      const {
        address = "",
        email = "",
        phoneNo = "",
        name = "",
      } = props?.route?.params?.data;

      setIsEdit(true);
      setName(name);
      setEmail(email);
      setPhone(phoneNo);
      setAddress(address);
    }
  }, []);

  const deleteVendor = () =>
    dispatch(
      actions.deleteInventoryAction({
        locationId: defaultLocation.locationId,
        itemId: props?.route?.params?.data?.vendorId,
        navigation,
      })
    );

  const addVendor = () => {
    if (
      name.trim().length === 0 ||
      email.trim().length === 0 ||
      address.trim().length === 0 ||
      phone.trim().length === 0
    ) {
      ToastError("Kindly fill all fields");
      return;
    }

    if (!defaultLocation.locationId) {
      ToastError("Kindly select primary location, first");
      return;
    }

    if (isEdit) {
      const data = {
        locationId: defaultLocation.locationId,
        name: name,
        email: email,
        address: address,
        phoneNo: `+${phone}`,
        navigation,
        vendorId: props?.route?.params?.data?.vendorId,
      };

      dispatch(actions.updateVendorActions(data));

      return;
    }

    const data = {
      locationId: defaultLocation.locationId,
      name: name,
      email: email,
      address: address,
      phoneNo: `+${phone}`,
      navigation,
    };

    dispatch(actions.addVendorActions(data));
  };

  return (
    <MainScreenContainer>
      <HeadingBox heading={isEdit ? "Edit Vendor" : "Add Vendor"} />
      <View
        style={{
          width: "95%",
          flex: 1,
          alignItems: "center",
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
          <Input
            placeholder={"Name"}
            value={name}
            setValue={(val) => setName(val)}
            style={{
              marginTop: 10,
              borderRadius: 0,
              flex: 1,
            }}
          />

          <Input
            placeholder={"Email"}
            value={email}
            setValue={(val) => setEmail(val)}
            style={{
              marginTop: 10,
              borderRadius: 0,
              flex: 1,
            }}
          />
          <Input
            keyboardType={"number-pad"}
            placeholder={"Phone"}
            value={phone}
            setValue={(val) => setPhone(val)}
            style={{
              marginTop: 10,
              borderRadius: 0,
              flex: 1,
            }}
          />
          <Input
            placeholder={"Address"}
            value={address}
            setValue={(val) => setAddress(val)}
            style={{
              marginTop: 10,
              borderRadius: 0,
              flex: 1,
            }}
          />
        </View>

        <RegularButton
          isLoading={isLoading}
          onPress={addVendor}
          style={{ marginTop: 20 }}
          text={isEdit ? "Update" : "save"}
        />

        {/* {isEdit && (
          <RegularButton
            colors={["white", "white"]}
            textStyle={{ color: "red" }}
            style={{ borderWidth: 2, borderColor: "red", marginTop: 20 }}
            text={"Delete"}
            onPress={() => setdeleteModal(true)}
          />
        )} */}
      </View>

      <DeleteModal
        onRequestClose={() => setdeleteModal(false)}
        visible={deleteModal}
        isLoading={deleteLoading}
        onDelete={deleteVendor}
        deleteItemText={"this vendor?"}
        heading={"Delete Vendor?"}
      />
    </MainScreenContainer>
  );
};
