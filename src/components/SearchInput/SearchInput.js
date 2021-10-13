import React from "react";
import { Input } from "../Inputs/Input";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

export const SearchInput = ({ search, setSearch, searchKeyword, style }) => {
  // const device = useSelector((state) => state.system.device);
  return (
    <Input
      placeholder={"Search"}
      iconName={"search"}
      iconType={MaterialIcons}
      value={search}
      setValue={(val) => {
        setSearch(val);
        searchKeyword(val);
      }}
      style={{ marginTop: 20, ...style }}
      iconStyle={{ fontSize: 30 }}
      inputStyle={{ fontSize: 20 }}
    />
  );
};
