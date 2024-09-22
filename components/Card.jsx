import React from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import { urlFor } from "../restaurant-app/sanityClient";
import { useDispatch } from "react-redux";
import { addRestaurantData } from "../features/cartSlice";

const Card = ({ navigation, cardData }) => {
  const dispatch = useDispatch();
  const imageUrl = urlFor(cardData.image).url();

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate("Restaurant", { cardData });
        dispatch(addRestaurantData(cardData));
      }}
    >
      <View className="w-72 h-64 rounded-3xl overflow-hidden bg-white border-gray-300 border border-x p-3">
        <Image
          source={{ uri: imageUrl }}
          className="h-[62%] w-full rounded-2xl"
        />
        <View className="pl-1 pt-1 flex gap-1 w-full h-[30%]">
          <Text className="font-extrabold text-lg">{cardData.name}</Text>
          <View className="flex-row pb-1">
            <Image
              source={require("../assets/icons/star-icon.png")}
              className="h-5 w-5"
            />
            <Text className="text-gray-700">
              {cardData.rating} ({cardData?.reviews} reviews)
            </Text>
          </View>
          <View className="flex-row">
            <Image
              source={require("../assets/icons/location-icon.png")}
              className="h-5 w-5"
            />
            <Text className="text-gray-700">{cardData?.address}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Card;
