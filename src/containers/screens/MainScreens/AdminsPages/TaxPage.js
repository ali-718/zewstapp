import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View } from "react-native";
import { MainScreenContainer } from "../../../MainScreenContainers";
import pdfIcon from "../../../../assets/images/downloadBackPurple.png";
import { MaterialIcons } from "@expo/vector-icons";
import { MealItem } from "../../../../components/Meals/MealItem";
import { Input } from "../../../../components/Inputs/Input";
import { useSelector } from "react-redux";
import { SearchInput } from "../../../../components/SearchInput/SearchInput";
import { HeadingBox } from "../../../../components/HeadingBox/HeadingBox";
import { RegularButton } from "../../../../components/Buttons/RegularButton";
import * as DocumentPicker from "expo-document-picker";

const dummyTax = ["IRS-2019.pdf", "IRS-2019.pdf", "IRS-2019.pdf"];

export const TaxPage = () => {
  const navigation = useNavigation();
  const device = useSelector((state) => state.system.device);
  const [tax, settax] = useState(dummyTax);
  const [search, setSearch] = useState("");

  const selectDocument = () => {
    DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      multiple: false,
    });
  };

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
      <HeadingBox heading={"Tax Document"} />
      <View style={{ width: "90%", marginBottom: 30 }}>
        <View style={{ width: "100%", marginTop: 10 }}>
          {tax.map((item, i) => (
            <View key={i} style={{ width: "100%", marginTop: 10 }}>
              <MealItem
                label={"Tax document 2019"}
                text={item}
                icon={pdfIcon}
                touchable
                iconStyle={{ width: 30, height: 30 }}
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

        <RegularButton
          onPress={selectDocument}
          style={{ marginTop: 20 }}
          text={"Upload document"}
        />
      </View>
    </MainScreenContainer>
  );
};
