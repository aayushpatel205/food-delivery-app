import React from "react";
import { View, Text, ScrollView } from "react-native";
import Card from "./Card";

const RestaurantDisplay = ({
  navigation,
  restaurantData,
  categoryName,
  categoryDesc,
}) => {
  return (
    <View>
      <View className="flex-row items-center px-4">
        <View>
          <Text className="font-bold text-xl">{categoryName}</Text>
          <Text className="text-gray-500">{categoryDesc}</Text>
        </View>
      </View>

      <ScrollView
        overScrollMode="never"
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 3,
          paddingLeft: 13,
          paddingRight: 20,
          paddingVertical: 15,
          gap: 20,
          alignItems: "center",
        }}
      >
        {restaurantData.restaurants.map((element,index) => {
          return <Card cardData={element} navigation={navigation} key={index}/>;
        })}
      </ScrollView>
    </View>
  );
};

export default RestaurantDisplay;
