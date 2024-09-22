import React, { useState, useEffect } from "react";
import client from "../restaurant-app/sanityClient";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  ActivityIndicator,
} from "react-native";
import { restaurantDataFunc } from "../service/ApiData";
import RestaurantDisplay from "../components/RestaurantDisplay";
import DropdownWithSearch from "../components/DropdownWithSearch";

const HomeScreen = ({ navigation }) => {
  const [restaurantSearchData, setRestaurantSearchData] = useState();
  const [searchInput, setSearchInput] = useState();
  const [data, setData] = useState();
  useEffect(() => {
    const getDataFunc = async () => {
      const data1 = await restaurantDataFunc();
      setData(data1);
    };
    getDataFunc();
  }, []);

  const getRestaurantSearchData = async () => {
    const data =
      await client.fetch(`*[_type == "restaurant" && (name match "${searchInput}" || category match "${searchInput}" || description match "${searchInput}") ] {
    name,
    reviews,
    lat,
    lng,
    rating,
    type,
    address,
    "image": image.asset._ref,
    category,
    description,
    dishes[]->{
      name,
      description,
      price,
      image
    }
}`);
    setRestaurantSearchData(data);
  };

  useEffect(() => {
    getRestaurantSearchData();
  }, [searchInput]);


  return (
    <SafeAreaView className="pt-12 flex-1 gap-y-4 bg-white relative">

      <View className="w-[98%] flex-row items-center gap-2 pr-2 pl-4">
        <View className="border border-gray-400 rounded-xl px-3 py-2 w-full flex-row items-center justify-between">
          <View className="flex-row items-center w-[60%] border-r border-gray-400">
            <Image
              source={require("../assets/icons/search-icon.png")}
              className="h-6 w-6"
            />
            <TextInput
              value={searchInput}
              onChangeText={(e) => {
                setSearchInput(e);
              }}
              placeholder="Restaurants..."
              placeholderTextColor={"#949494"}
              className="ml-3 text-base w-[75%]"
            />
          </View>
          <View className="flex-row gap-1 items-center">
            <Image
              source={require("../assets/icons/location-icon.png")}
              className="h-5 w-5"
            />
            <Text className="text-gray-500 text-base">New York, NYC</Text>
          </View>
        </View>
      </View>

      <DropdownWithSearch
        navigation={navigation}
        searchInput={searchInput}
        restaurantSearchData={restaurantSearchData}
        setSearchInput={setSearchInput}

      />

      <View className="flex -z-10 items-center border border-gray-400 my-5 rounded-2xl p-1 mx-4">
        <View className="rounded-xl">
          <View className="py-1 px-4">
            <Text className="text-lg font-medium text-center">
            "Craving something delicious? 🍔🍕 <Text className="text-lightOrange">Fast Food 🍔</Text> | <Text className="text-lightOrange"> Shakes 🥤"</Text>| <Text className="text-lightOrange">Chinese 🥡</Text>....
            </Text>
          </View>
        </View>
      </View>

      {data ? (
        data.map((element,index) => {
          return (
            <RestaurantDisplay
              navigation={navigation}
              restaurantData={element}
              categoryName={element?.name}
              categoryDesc={element?.description}
              key={index}
            />
          );
        })
      ) : (
        <ActivityIndicator size="large" color="#F48631" />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
