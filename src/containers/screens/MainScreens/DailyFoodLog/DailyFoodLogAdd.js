import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { HeadingBox } from "../../../../components/HeadingBox/HeadingBox";
import { Input } from "../../../../components/Inputs/Input";
import { MainScreenContainer } from "../../../MainScreenContainers";
import { inputBorderColor } from "../../../../theme/colors";
import { Dropdown } from "../../../../components/Inputs/DropDown";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import * as actions from "../../../../Redux/actions/InventoryAction/InventoryActions";
import { RegularButton } from "../../../../components/Buttons/RegularButton";
import { marginTop } from "styled-system";
import validator from "validator";
import { dailyFoodLogAddAction } from "../../../../Redux/actions/DashboardActions/DashboardActions";

export const DailyFoodLogAdd = () => {
  const [selectedItem, setSelectedItem] = useState({});
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [allUnits, setallUnits] = useState([]);
  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const device = useSelector((state) => state.system.device);
  const defaultLocation = useSelector(
    (state) => state.locations.defaultLocation
  );
  const list = useSelector((state) => state.inventory.inventory.list);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const fetchInventoryItems = () =>
    dispatch(
      actions.fetchInventoryAction({ locationId: defaultLocation.locationId })
    );

  useEffect(() => {
    if (!isFocused) return;
    fetchInventoryItems();

    actions
      .getUnits()
      .then((res) => setallUnits(res))
      .catch((e) => setallUnits([]));
  }, [isFocused]);

  const addFoodLog = () => {
    if (
      validator.isEmpty(unit, { ignore_whitespace: false }) ||
      validator.isEmpty(quantity, { ignore_whitespace: false }) ||
      validator.isEmpty(reason, { ignore_whitespace: false }) ||
      !selectedItem?.itemName
    ) {
      ToastError("please fill all fields");
      return;
    }

    setIsLoading(true);

    const data = {
      item: selectedItem,
      reason,
      wastedQuantity: quantity,
      costPerUnit: selectedItem?.costPerUnit,
    };

    dailyFoodLogAddAction(data)
      .then((res) => {
        setIsLoading(false);
        setSelectedItem({});
        setUnit("");
        setQuantity("");
        setReason("");
      })
      .catch((e) => {
        setIsLoading(false);
      });
  };

  return (
    <MainScreenContainer>
      <HeadingBox heading={"Log in food"} />
      <View
        style={{
          width: "95%",
          flex: 1,
          alignItems: "center",
          marginVertical: 20,
          borderRadius: 10,
          backgroundColor: "white",
          paddingVertical: device === "tablet" ? 40 : 20,
          paddingHorizontal: device === "tablet" ? 32 : 12,
        }}
      >
        <Dropdown
          selectedMenu={selectedItem?.itemName ?? ""}
          setMenu={(val) => {
            setSelectedItem(list.find((item) => item.itemName === val));
          }}
          placeholder={"Item"}
          menus={list.map((item) => item.itemName)}
          style={{
            zIndex: 3,
            borderWidth: 1,
            borderBottomWidth: 1,
            borderColor: inputBorderColor,
            borderRadius: 8,
          }}
        />

        <Input
          editable={false}
          placeholder={"Wastage Cost"}
          value={`${selectedItem?.costPerUnit ?? ""}`}
          style={{
            marginTop: 12,
            borderColor: inputBorderColor,
            borderWidth: 1,
            borderBottomWidth: 1,
            borderRadius: 8,
          }}
          inputStyle={{ opacity: 0.5 }}
        />

        <Input
          placeholder={"Quantity"}
          value={quantity}
          style={{
            marginTop: 12,
            borderColor: inputBorderColor,
            borderWidth: 1,
            borderBottomWidth: 1,
            borderRadius: 8,
          }}
          setValue={(val) => setQuantity(val)}
          keyboardType={"number-pad"}
        />

        <Dropdown
          selectedMenu={unit}
          setMenu={setUnit}
          placeholder={"Unit"}
          menus={allUnits}
          style={{
            zIndex: 2,
            borderWidth: 1,
            borderBottomWidth: 1,
            borderColor: inputBorderColor,
            borderRadius: 8,
            marginTop: 12,
          }}
        />

        <Input
          placeholder={"Reason"}
          value={reason}
          style={{
            marginTop: 12,
            borderColor: inputBorderColor,
            borderWidth: 1,
            borderBottomWidth: 1,
            borderRadius: 8,
          }}
          setValue={(val) => setReason(val)}
          textarea
        />

        <RegularButton
          isLoading={isLoading}
          onPress={addFoodLog}
          style={{ marginTop: 71 }}
          text={"save"}
        />
      </View>
    </MainScreenContainer>
  );
};
