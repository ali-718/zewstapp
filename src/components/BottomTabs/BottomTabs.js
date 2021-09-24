import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import {
  grayMenuText,
  grayTextColor,
  primaryColor,
  primaryShade1,
  primaryShade2,
  primaryShade3,
} from "../../theme/colors";
import homeIcon from "../../assets/images/Dashboardicon.png";
import homeIconSelected from "../../assets/images/DashboardSelected.png";
import insightIcon from "../../assets/images/insightIcon.png";
import insightIconSelected from "../../assets/images/insightIconSelected.png";
import foodIcon from "../../assets/images/foodIcon.png";
import foodIconSelected from "../../assets/images/foodIconSelected.png";
import adminIcon from "../../assets/images/adminIcon.png";
import adminIconSelected from "../../assets/images/adminIconSelected.png";
import qrcodeIcon from "../../assets/images/qrcodeIcon.png";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import RecipeIcon from "../../assets/images/RecipeIcon.png";
import RecipeIconSelected from "../../assets/images/RecipeIconSelected.png";
import WasteIcon from "../../assets/images/WasteIcon.png";
import InventorySelected from "../../assets/images/InventorySelected.png";
import InventoryIcon from "../../assets/images/InventoryIcon.png";
import MenuIcon from "../../assets/images/MenuIcon.png";

const Menu = ({ image, name, setselected, selected, style }) => (
  <TouchableOpacity
    style={{
      width: "11%",
      alignItems: "center",
      justifyContent: "center",
      borderTopWidth: selected ? 3 : 0,
      borderColor: primaryColor,
      ...style,
    }}
    onPress={setselected}
  >
    <Image
      source={image}
      style={{ width: 25, height: 25, resizeMode: "contain" }}
    />
    <Text
      style={{
        fontSize: 10,
        color: grayMenuText,
        marginTop: 5,
        textAlign: "center",
      }}
    >
      {name}
    </Text>
  </TouchableOpacity>
);

export const BottomTabs = ({ selected, setselected }) => {
  const navigation = useNavigation();
  const device = useSelector((state) => state.system.device);
  const home = selected === 0 ? homeIconSelected : homeIcon;
  const insight = selected === 1 ? insightIconSelected : insightIcon;
  const qrcode = qrcodeIcon;
  const food = selected === 3 ? foodIconSelected : foodIcon;
  const RecipeEngineering = selected === 5 ? RecipeIconSelected : RecipeIcon;
  const WasteEngineering = selected === 6 ? WasteIcon : WasteIcon;
  const Inventory = selected === 7 ? InventorySelected : InventoryIcon;
  const foodTab = selected === 8 ? foodIconSelected : foodIcon;
  const insightTab = selected === 9 ? insightIconSelected : insightIcon;
  const admin = selected === 10 ? adminIconSelected : adminIcon;

  const [showMore, setshowmore] = useState(false);

  useEffect(() => {
    setshowmore(false);
  }, [selected]);

  if (device === "tablet") {
    return (
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          height: 65,
          backgroundColor: "white",
          borderTopWidth: 0.5,
          borderColor: grayTextColor,
        }}
      >
        <Menu
          selected={selected === 0}
          setselected={() => setselected(0)}
          image={home}
          name={"Dashboard"}
        />

        <Menu
          selected={selected === 5}
          setselected={() => setselected(5)}
          image={RecipeEngineering}
          name={"Recipe Engineering"}
        />

        <Menu
          selected={selected === 6}
          setselected={() => setselected(6)}
          image={WasteEngineering}
          name={"Waste Engineering"}
        />

        <Menu
          selected={selected === 7}
          setselected={() => setselected(7)}
          image={Inventory}
          name={"Inventory"}
        />

        <TouchableOpacity
          style={{
            width: "11%",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => {
            setselected(4);
          }}
        >
          <View
            style={{
              width: 70,
              height: 70,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 100,
              overflow: "hidden",
              marginTop: -45,
            }}
          >
            <LinearGradient
              colors={[primaryColor, primaryShade1]}
              style={{
                width: 70,
                height: 70,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: primaryShade1,
              }}
            >
              <Image
                source={qrcode}
                style={{ width: 25, height: 25, resizeMode: "contain" }}
              />
            </LinearGradient>
          </View>
          <Text style={{ fontSize: 10, color: grayMenuText, marginTop: 10 }}>
            Scan QR
          </Text>
        </TouchableOpacity>

        <Menu
          selected={selected === 8}
          setselected={() => setselected(8)}
          image={foodTab}
          name={"Menu"}
        />

        <Menu
          selected={selected === 9}
          setselected={() => setselected(9)}
          image={insight}
          name={"Sales"}
        />

        <Menu
          selected={selected === 10}
          setselected={() => setselected(10)}
          image={admin}
          name={"Admin"}
        />

        <Menu setselected={() => null} image={MenuIcon} name={"More"} />
      </View>
    );
  }

  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        height: 65,
        backgroundColor: "white",
        borderTopWidth: 0.5,
        borderColor: grayTextColor,
      }}
    >
      {showMore && (
        <View
          style={{
            width: 80,
            position: "absolute",
            right: 10,
            zIndex: 2,
            backgroundColor: "white",
            bottom: 80,
            borderRadius: 10,
            paddingVertical: 20,
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,

            elevation: 6,
          }}
        >
          <Menu
            selected={selected === 5}
            setselected={() => setselected(5)}
            image={RecipeEngineering}
            name={"Recipe Engineering"}
            style={{ width: "90%", paddingTop: 10 }}
          />

          <Menu
            selected={selected === 6}
            setselected={() => setselected(6)}
            image={WasteEngineering}
            name={"Waste Engineering"}
            style={{ width: "90%", marginTop: 20, paddingTop: 10 }}
          />

          <Menu
            selected={selected === 7}
            setselected={() => setselected(7)}
            image={Inventory}
            name={"Inventory"}
            style={{ width: "90%", marginTop: 20, paddingTop: 10 }}
          />

          <Menu
            selected={selected === 10}
            setselected={() => setselected(10)}
            image={admin}
            name={"Admin"}
            style={{ width: "90%", marginTop: 20, paddingTop: 10 }}
          />
        </View>
      )}
      <Menu
        selected={selected === 0}
        setselected={() => setselected(0)}
        image={home}
        name={"Dashboard"}
        style={{ width: "20%" }}
      />
      <Menu
        selected={selected === 1}
        setselected={() => setselected(1)}
        image={insight}
        name={"Sales"}
        style={{ width: "20%" }}
      />
      <TouchableOpacity
        style={{
          width: "20%",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => {
          setselected(2);
        }}
      >
        <View
          style={{
            width: 70,
            height: 70,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 100,
            overflow: "hidden",
            marginTop: -45,
          }}
        >
          <LinearGradient
            colors={[primaryColor, primaryShade1]}
            style={{
              width: 70,
              height: 70,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: primaryShade1,
            }}
          >
            <Image
              source={qrcode}
              style={{ width: 25, height: 25, resizeMode: "contain" }}
            />
          </LinearGradient>
        </View>
        <Text style={{ fontSize: 10, color: grayMenuText, marginTop: 10 }}>
          Scan QR
        </Text>
      </TouchableOpacity>

      <Menu
        selected={selected === 3}
        setselected={() => setselected(3)}
        image={foodTab}
        name={"Menu"}
        style={{ width: "20%" }}
      />
      <TouchableOpacity
        style={{
          width: "20%",
          alignItems: "center",
          justifyContent: "center",
          borderColor: primaryShade1,
        }}
        onPress={() => {
          setshowmore(!showMore);
        }}
      >
        <Image
          source={MenuIcon}
          style={{ width: 25, height: 25, resizeMode: "contain" }}
        />
        <Text style={{ fontSize: 10, color: grayMenuText, marginTop: 10 }}>
          More
        </Text>
      </TouchableOpacity>
    </View>
  );
};
