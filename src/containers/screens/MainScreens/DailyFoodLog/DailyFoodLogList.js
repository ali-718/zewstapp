import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import { AdminOverviewBox } from "../../../../components/AdminComponents/AdminOverviewBox";
import { HeadingBox } from "../../../../components/HeadingBox/HeadingBox";
import { SearchInput } from "../../../../components/SearchInput/SearchInput";
import { MainScreenContainer } from "../../../MainScreenContainers";
import { LoadingPage } from "../../../../components/LoadingPage/LoadingPage";
import { RegularButton } from "../../../../components/Buttons/RegularButton";
import { dailyFoodLogListAction } from "../../../../Redux/actions/DashboardActions/DashboardActions";

export const DailyFoodlogList = () => {
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
    setIsLoading(true);

    dailyFoodLogListAction({
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
      item.itemName?.toLowerCase()?.includes(keyword)
    );

    setFiltereditem(finalData);
  };

  return (
    <MainScreenContainer shortDrawer isDrawer>
      <HeadingBox noBack heading={"Daily Food Log"} />

      <RegularButton
        onPress={() => navigation.navigate("DailyFoodLogAdd")}
        style={{
          width: 250,
          right: 0,
          position: "absolute",
          zIndex: 10,
          top: 20,
        }}
        white
        text={"+ Add a menu item"}
      />

      {isLoading ? (
        <LoadingPage />
      ) : (
        <View
          style={{
            width: "100%",
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
              name={""}
              boxStyle={{ marginTop: 10 }}
              label={item?.itemName}
              rightText={""}
              rightTextStyle={{
                fontSize: 12,
                color: "#CCCCCC",
                marginRight: 20,
              }}
            />
          ))}
        </View>
      )}
    </MainScreenContainer>
  );
};
