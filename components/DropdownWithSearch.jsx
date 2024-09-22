import React from "react";
import { ScrollView, View } from "react-native";
import { urlFor } from "../restaurant-app/sanityClient";
import DropdownItem from "./DropdownItem";

const DropdownWithSearch = ({ searchInput, restaurantSearchData, navigation , setSearchInput}) => {
  const condition =
    searchInput?.length > 0 && restaurantSearchData?.length >= 1;
  return condition ? (
    <View className="w-[94%] absolute top-[127] left-3.5 bg-white z-50 border border-gray-400 rounded-xl shadow-lg py-1 max-h-[148]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 4,
          display: "flex",
          gap: 4,
          paddingHorizontal: 5,
          minHeight: "96%",
        }}
      >
        {restaurantSearchData?.map((element,index) => {
          const imageUrl = urlFor(element?.image).url();
          return (
            <DropdownItem imageUrl={imageUrl} key={index} data={element} navigation={navigation} setSearchInput={setSearchInput}/>
          );
        })}
      </ScrollView>
    </View>
  ) : (
    <></>
  );
};

export default DropdownWithSearch;
