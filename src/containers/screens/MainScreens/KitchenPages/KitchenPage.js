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
            renderItem={({ item, index }) => (
              <View
                style={{
                  backgroundColor: kitchenMenuColor,
                  borderColor: "#D8D8D8",
                  borderWidth: 1,
                  marginLeft: 10,
                  width: "32%",
                  padding: 15,
                }}
              >
                <Text style={{ color: "black" }}>2021-04-13 01:49:23</Text>
                <Text style={{ color: "black" }}>Served By: Sara</Text>

                <Text style={{ color: "black", marginVertical: 20 }}>
                  In House
                </Text>

                {[1, 2, 3].map((item) => (
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      marginTop: 0,
                    }}
                  >
                    <Text style={{ color: "black", flex: 1 }}>Margarita</Text>
                    <Text style={{ color: "black" }}>8.63</Text>
                  </View>
                ))}
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                  }}
                >
                  <Text style={{ color: "black", flex: 1 }}>
                    ........................
                  </Text>
                  <Text style={{ color: "black" }}>............</Text>
                </View>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                  }}
                >
                  <Text style={{ color: "black", flex: 1 }}>Cash:</Text>
                  <Text style={{ color: "black" }}>-72.48</Text>
                </View>
              </View>
            )}
          />
        </View>
      </MainScreenContainer>
    );
  }

  return <View />;
};
