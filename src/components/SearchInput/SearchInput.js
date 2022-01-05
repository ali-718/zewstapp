import React from "react";
import { Input } from "../Inputs/Input";
import { Feather  } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { grayBorderColor } from "../../theme/colors";

export const SearchInput = ({ search, setSearch, searchKeyword, style }) => {
  // const device = useSelector((state) => state.system.device);
  return (
    <Input
      placeholder={"Search..."}
      iconName={"search"}
      iconType={Feather}
      value={search}
      noPlaceHolder
      setValue={(val) => {
        setSearch(val);
        searchKeyword(val);
      }}
      style={{
        marginTop: 20,
        height: 40,
        borderWidth: 0.5,
        borderBottomWidth: 1.5,
        borderColor: "#E2E2EA",
        borderRadius: 10,
        marginBottom: 20,
        ...style,
      }}
      iconStyle={{ fontSize: 26, marginTop: 10 }}
      inputStyle={{ fontSize: 22 }}
    />
  );
};
