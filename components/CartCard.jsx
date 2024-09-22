import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { urlFor } from "../restaurant-app/sanityClient";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../features/cartSlice";

const CartCard = ({ data }) => {
  const dispatch = useDispatch();
  const imageUrl = urlFor(data?.imageRef).url();
  return (
    <View className="h-18 border border-gray-300 rounded-2xl p-3 flex-row items-center justify-between mb-4">
      <View className="flex-row gap-3 items-center">
        <Text className="font-bold text-xl">{data?.quantity} x</Text>
        <Image source={{ uri: imageUrl }} className="h-14 w-14 rounded-full" />
        <Text className="font-bold text-xl">{data?.name}</Text>
      </View>
      <View className="flex-row gap-4 items-center">
        <Text className="text-xl font-bold">${data?.price}</Text>
        <TouchableOpacity
          onPress={()=>{dispatch(removeFromCart({data}));}}
          className="h-8 w-8 bg-lightOrange rounded-full flex justify-center items-center"
        >
          <Image
            source={require("../assets/icons/icons8-minus-24.png")}
            className="h-4 w-4"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartCard;
