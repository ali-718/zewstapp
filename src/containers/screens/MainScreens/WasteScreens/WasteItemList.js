import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import { AdminOverviewBox } from "../../../../components/AdminComponents/AdminOverviewBox";
import { HeadingBox } from "../../../../components/HeadingBox/HeadingBox";
import { SearchInput } from "../../../../components/SearchInput/SearchInput";
import { MainScreenContainer } from "../../../MainScreenContainers";

export const WasteItemList = () => {
  const navigation = useNavigation();
  const device = useSelector((state) => state.system.device);
  const [search, setSearch] = useState("");
  const [filteredItem, setFiltereditem] = useState([]);

  const searchKeyword = (text) => {
    const keyword = text?.toLowerCase();
    const realData = [];
    const finalData = realData.filter((item) =>
      item.recipeTitle?.toLowerCase()?.includes(keyword)
    );

    setFiltereditem(finalData);
  };

  return (
    <MainScreenContainer isDrawer>
      <HeadingBox noBack heading={"Waste Prediction"} />

      <View
        style={{
          width: "90%",
          alignItems: "center",
          marginBottom: 50,
          backgroundColor: "white",
          borderRadius: 10,
          marginTop: 20,
        }}
      >
        <View style={{ width: "95%" }}>
          <SearchInput
            search={search}
            setSearch={setSearch}
            searchKeyword={searchKeyword}
          />
        </View>

        <AdminOverviewBox
          boxStyle={{ marginTop: 10 }}
          label={"Jack’s Creek Black Angus"}
          name={"Expire date: 31.11.2021"}
          rightText={device === "tablet" ? "Reccomended recipes" : ""}
          rightTextStyle={{ fontSize: 12, color: "#CCCCCC", marginRight: 20 }}
          onPress={() => navigation.navigate("WasteItemDetail")}
        />
        <AdminOverviewBox
          boxStyle={{ marginTop: 10 }}
          label={"Jack’s Creek Black Angus"}
          name={"Expire date: 31.11.2021"}
          rightText={device === "tablet" ? "Reccomended recipes" : ""}
          rightTextStyle={{ fontSize: 12, color: "#CCCCCC", marginRight: 20 }}
          onPress={() => navigation.navigate("WasteItemDetail")}
        />
      </View>
    </MainScreenContainer>
  );
};
