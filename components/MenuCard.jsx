import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { urlFor } from "../restaurant-app/sanityClient";
import { addToCart , removeFromCart } from "../features/cartSlice";
import { useDispatch , useSelector} from "react-redux";

const MenuCard = ({ data }) => {
  const dispatch = useDispatch();
  const quantity = useSelector((state) => {
    const item = state.cartReducer.cart.find((element) => element.name === data.name);
    return item ? item.quantity : 0;
  });
  const imageUrl = urlFor(data.image?.asset._ref ? data.image?.asset._ref : data?.image).url();

  return (
    <View className="w-full border border-gray-300 h-32 rounded-2xl p-3 flex-row">
      <Image
        source={{uri: imageUrl}}
        className="h-full w-[30%] rounded-2xl"
      />
      <View className="w-[75%] h-full pt-1 px-5 flex justify-between">
        <View>
          <Text className="text-2xl font-bold">{data?.name}</Text>
          <Text className="text-sm text-gray-700">{data?.description}</Text>
        </View>

        <View className="flex-row justify-between w-full">
          <Text className="text-xl font-bold">${data?.price}</Text>

          <View className="flex-row gap-2 items-center">
            <TouchableOpacity className="h-8 w-8 bg-lightOrange rounded-full flex justify-center items-center" onPress={()=>{
              dispatch(removeFromCart({data}));
            }}>
              <Image
                source={require("../assets/icons/icons8-minus-24.png")}
                className="h-4 w-4"
              />
            </TouchableOpacity>
            <Text className="text-xl">{quantity}</Text>
              <TouchableOpacity className="h-8 w-8 bg-lightOrange rounded-full flex justify-center items-center" onPress={()=>{
                dispatch(addToCart({data}));
              }}>
              <Image
                source={require("../assets/icons/icons8-plus-24.png")}
                className="h-4 w-4"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MenuCard;
