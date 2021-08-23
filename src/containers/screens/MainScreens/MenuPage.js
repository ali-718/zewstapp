import { Icon } from "native-base";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "../../../components/Text/Text";
import {
  grayShade1,
  grayTextColor,
  primaryShade1,
} from "../../../theme/colors";
import { MainScreenContainer } from "../../MainScreenContainers";
import { MaterialIcons } from "@expo/vector-icons";
import { Input } from "../../../components/Inputs/Input";

const ResturantName = ({
  name,
  address,
  setSelected,
  selected,
  search,
  setSearch,
}) => (
  <View style={{ width: "100%" }}>
    <TouchableOpacity
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      onPress={setSelected}
    >
      <View style={{ width: "85%" }}>
        <Text
          style={{
            fontSize: 22,
            color: "black",
            fontFamily: "openSans_semiBold",
          }}
        >
          {name}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: grayTextColor,
            marginTop: 5,
          }}
        >
          {address}
        </Text>
      </View>
      <View style={{ width: "10%", alignItems: "flex-end" }}>
        <Icon
          style={{ fontSize: 20, color: grayTextColor }}
          name={"arrow-forward-ios"}
          as={MaterialIcons}
        />
      </View>
    </TouchableOpacity>

    {selected ? (
      <View style={{ width: "100%", flex: 1 }}>
        <View
          style={{
            width: "100%",
            marginTop: 15,
            borderRadius: 10,
            backgroundColor: grayShade1,
            padding: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "openSans_bold",
              color: grayTextColor,
              textTransform: "uppercase",
            }}
          >
            Menu items - 8
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "openSans_bold",
                  color: primaryShade1,
                  textTransform: "uppercase",
                }}
              >
                Edit
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ marginLeft: 10 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "openSans_bold",
                  color: primaryShade1,
                  textTransform: "uppercase",
                }}
              >
                Add
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ width: "100%", marginTop: 10 }}>
          <Input
            placeholder={"Search"}
            iconName={"search"}
            iconType={MaterialIcons}
            value={search}
            onChangeText={(val) => setSearch(val)}
            style={{ height: 60 }}
            iconStyle={{ fontSize: 30 }}
            inputStyle={{ fontSize: 20 }}
          />
        </View>
      </View>
    ) : null}
  </View>
);

export const MenuPage = () => {
  const [selected, setSelected] = useState(0);
  const [search, setSearch] = useState("");

  return (
    <MainScreenContainer>
      <View
        style={{
          width: "90%",
          marginVertical: 20,
          marginBottom: 40,
          alignItems: "center",
        }}
      >
        <View style={{ width: "100%", alignItems: "center" }}>
          <ResturantName
            name={"Rocco Italian Grill - Arcadia"}
            address={"17080 Northwood Hwy, Arcadia, MI 49613"}
            selected={selected === 0}
            setSelected={() => setSelected(0)}
            search={search}
            setSearch={(val) => setSearch(val)}
          />
        </View>
      </View>
    </MainScreenContainer>
  );
};
