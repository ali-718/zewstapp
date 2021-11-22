import React, { useState } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { borderColor2, grayMenuText, primaryColor } from "../../theme/colors";
import deleteIcon from "../../assets/images/deleteIcon.png";
import arrowDownIcon from "../../assets/images/arrowDownIcon.png";
import { Dropdown } from "../Inputs/DropDown";
import { Text } from "../Text/Text";
import { Icon } from "native-base";
import { Entypo } from "@expo/vector-icons";
import { recipePacking } from "../../helpers/utlils";
import { Input } from "../Inputs/Input";

export const RecipeStepsAccordion = ({
  i,
  item,
  deleteRecipe,
  addRecipeDescription,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <View style={{ width: "100%" }}>
      <TouchableOpacity
        style={{
          marginTop: 0,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
          paddingVertical: 10,
          borderWidth: 2,
          borderColor: borderColor2,
          borderBottomWidth: 0,
          borderTopWidth: 0,
        }}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text
          style={{
            fontSize: 18,
            marginLeft: 10,
            flex: 1,
          }}
        >
          {`step ${i + 1}`}
        </Text>

        <Image
          style={{
            width: 15,
            height: 15,
            resizeMode: "contain",
            marginRight: 15,
          }}
          source={arrowDownIcon}
        />
      </TouchableOpacity>

      {isOpen && (
        <View
          style={{
            width: "100%",
            padding: 10,
            zIndex: 1,
            backgroundColor: "white",
          }}
        >
          <TouchableOpacity
            onPress={() => deleteRecipe(i)}
            style={{
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 0,
            }}
          >
            <Image
              style={{
                width: 30,
                height: 30,
                resizeMode: "contain",
                marginBottom: 10,
              }}
              source={deleteIcon}
            />
          </TouchableOpacity>

          <Input
            setValue={(val) => addRecipeDescription(val, i)}
            style={{
              borderRadius: 0,
              flex: 1,
              zIndex: 0,
              borderWidth: 0,
            }}
            value={item.description}
            autoFocus
          />
        </View>
      )}
    </View>
  );
};
