import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { useSelector } from "react-redux";
import { width } from "styled-system";
import { RegularButton } from "../../../../components/Buttons/RegularButton";
import { HeadingBox } from "../../../../components/HeadingBox/HeadingBox";
import { Dropdown } from "../../../../components/Inputs/DropDown";
import { Text } from "../../../../components/Text/Text";
import { kitchenMenuColor } from "../../../../theme/colors";
import { MainScreenContainer } from "../../../MainScreenContainers";
import { SpikeOrder } from "../../../../components/SpikeOrder/SpikeOrder";
import { MainOrder } from "../../../../components/MainOrder/MainOrder";

export const KitchenPage = () => {
  const device = useSelector((state) => state.system.device);
  const [selected, setSelected] = useState(0);
  const [category, setCategory] = useState("");

  if (device === "tablet") {
    return (
      <MainScreenContainer>
        <View style={{ width: "95%" }}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 20,
              zIndex: 10,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", flex: 0.7 }}
            >
              <RegularButton
                white={selected === 0 ? false : true}
                text={"tickets"}
                onPress={() => setSelected(0)}
                style={{ flex: 1 }}
                textStyle={{ fontSize: 12 }}
              />
              <RegularButton
                white={selected === 1 ? false : true}
                text={"All orders"}
                onPress={() => setSelected(1)}
                style={{ marginLeft: 10, flex: 1 }}
                textStyle={{ fontSize: 12 }}
              />
              <RegularButton
                white={selected === 2 ? false : true}
                text={"waiting orders"}
                onPress={() => setSelected(2)}
                style={{ marginLeft: 10, flex: 1 }}
                textStyle={{ fontSize: 12 }}
              />
              <RegularButton
                white={selected === 3 ? false : true}
                text={"ticket spike"}
                onPress={() => setSelected(3)}
                style={{ marginLeft: 10, flex: 1 }}
                textStyle={{ fontSize: 12 }}
              />
            </View>

            <View style={{ flex: 0.2, zIndex: 10 }}>
              <Dropdown
                errMsg={"Looks like there are no items left in inventory 😞"}
                selectedMenu={category}
                menus={["Show all", "ali"]}
                setMenu={(val) => setCategory(val)}
                placeholder={"Quantity"}
                style={{ zIndex: 10 }}
              />
            </View>
          </View>

          <View style={{ marginTop: 20, zIndex: 0 }} />

          <FlatList
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
            numColumns={3}
            columnWrapperStyle={{ marginLeft: -10, marginTop: 10 }}
            renderItem={
              selected === 3
                ? ({ item, index }) => <SpikeOrder />
                : selected === 0
                ? ({ item, index }) => <MainOrder />
                : () => <View />
            }
          />
        </View>
      </MainScreenContainer>
    );
  }

  return <View />;
};
