import React from "react";
import {
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSelector } from "react-redux";

const CartButton = ({ slideUp }) => {
  const data = useSelector((state) => {
    return state.cartReducer.cart;
  });

  const totalCost = useSelector((state) => {
    return state.cartReducer.totalCost;
  });
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        slideUp();
      }}
    >
      <View className="w-[90%] h-18 z-50 absolute bottom-3 left-5 bg-lightOrange rounded-l-full rounded-r-full pl-3 py-3 pr-5 flex-row items-center justify-between">
        <View
          className="h-12 w-12 rounded-full flex justify-center items-center"
          style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
        >
          <Text className="text-white text-xl font-bold">{data.length > 0 ? data.length : 0 }</Text>
        </View>
        <Text className="text-white text-xl font-bold">View Cart</Text>
        <Text className="text-white text-xl font-bold">${totalCost}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CartButton;
