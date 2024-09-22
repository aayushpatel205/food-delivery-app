import React from "react";
import { useDispatch } from "react-redux";
import { addRestaurantData } from "../features/cartSlice";
import { TouchableOpacity, View, Image, Text } from "react-native";

const DropdownItem = ({ imageUrl, data, navigation, setSearchInput }) => {
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      activeOpacity={0.4}
      onPress={() => {
        navigation.navigate("Restaurant", { cardData: data });
        dispatch(addRestaurantData(data));
        setSearchInput("");
      }}
    >
      <View className="h-14 rounded-lg px-2 py-2 my-1 flex-row items-center bg-white">
        <Image
          source={{ uri: imageUrl }}
          className="h-11 w-11 rounded-full mr-4"
        />
        <Text className="font-extrabold text-xl w-[82%] text-lightOrange bg-white">
          {data?.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default DropdownItem;
