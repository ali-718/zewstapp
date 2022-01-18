import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import { AdminOverviewBox } from "../../../../components/AdminComponents/AdminOverviewBox";
import { HeadingBox } from "../../../../components/HeadingBox/HeadingBox";
import { SearchInput } from "../../../../components/SearchInput/SearchInput";
import { MainScreenContainer } from "../../../MainScreenContainers";
import { LoadingPage } from "../../../../components/LoadingPage/LoadingPage";
import { fetchExpiredMeals } from "../../../../Redux/actions/WasteActions/WasteActions";

export const WasteItemList = () => {
  const navigation = useNavigation();
  const device = useSelector((state) => state.system.device);
  const defaultLocation = useSelector(
    (state) => state.locations.defaultLocation
  );
  const [search, setSearch] = useState("");
  const [filteredItem, setFiltereditem] = useState([]);
  const isScreenFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    if (!isScreenFocused) return;
    //       locationId: "8985da3c-2077-4b3b-8470-c4d3271c9a51",
    setIsLoading(true);
    fetchExpiredMeals({
      locationId: defaultLocation?.locationId,
    }).then((res) => {
      setIsLoading(false);
      setFiltereditem(res);
      setAllData(res);
    });
  }, [isScreenFocused]);

  const searchKeyword = (text) => {
    const keyword = text?.toLowerCase();
    const realData = allData;
    const finalData = realData.filter((item) =>
      item.mealName?.toLowerCase()?.includes(keyword)
    );

    setFiltereditem(finalData);
  };

  return (
    <MainScreenContainer isDrawer>
      <HeadingBox noBack heading={"Waste Prediction"} />

      {isLoading ? (
        <LoadingPage />
      ) : (
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

          {filteredItem.map((item, i) => (
            <AdminOverviewBox
              boxStyle={{ marginTop: 10 }}
              label={item?.mealName}
              rightText={device === "tablet" ? "Reccomended recipes" : ""}
              rightTextStyle={{
                fontSize: 12,
                color: "#CCCCCC",
                marginRight: 20,
              }}
              onPress={() =>
                navigation.navigate("WasteItemDetail", {
                  data: { ...item?.mealRecipes[0], mealId: item?.mealId },
                })
              }
            />
          ))}
        </View>
      )}
    </MainScreenContainer>
  );
};
