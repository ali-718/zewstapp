import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View } from "react-native";
import { MainScreenContainer } from "../../../MainScreenContainers";
import pdfIcon from "../../../../assets/images/pdfIcon.png";
import { MaterialIcons } from "@expo/vector-icons";
import { MealItem } from "../../../../components/Meals/MealItem";
import { Input } from "../../../../components/Inputs/Input";
import { useSelector } from "react-redux";
import { SearchInput } from "../../../../components/SearchInput/SearchInput";

const dummyTax = ["IRS-2019.pdf", "IRS-2019.pdf", "IRS-2019.pdf"];

export const TaxPage = () => {
  const navigation = useNavigation();
  const device = useSelector((state) => state.system.device);
  const [tax, settax] = useState(dummyTax);
  const [search, setSearch] = useState("");

  const searchKeyword = (text) => {
    const keyword = text?.toLowerCase();
    const realData = dummyTax;
    const finalData = realData.filter((item) =>
      item?.toLowerCase()?.includes(keyword)
    );

    settax(finalData);
  };

  return (
    <MainScreenContainer title={"Tax Documents"}>
      <View style={{ width: "90%", marginTop: 20, marginBottom: 30 }}>
        <View style={{ width: "100%" }}>
          <SearchInput
            search={search}
            setSearch={setSearch}
            searchKeyword={searchKeyword}
          />
        </View>

        <View style={{ width: "100%", marginTop: 10 }}>
          {tax.map((item, i) => (
            <View key={i} style={{ width: "100%", marginTop: 10 }}>
              <MealItem
                label={"Tax document 2019"}
                text={item}
                icon={pdfIcon}
                touchable
                iconStyle={{ width: 20, height: 20 }}
                onPress={() =>
                  navigation.navigate("taxDocument", {
                    data: {
                      name: item,
                    },
                  })
                }
              />
            </View>
          ))}
        </View>
      </View>
    </MainScreenContainer>
  );
};
