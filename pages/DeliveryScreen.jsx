import React, { useRef, useEffect } from "react";
import {
  View,
  Animated,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { useSelector } from "react-redux";

const DeliveryScreen = ({navigation}) => {
  const slideUp = useRef(new Animated.Value(300)).current;
  const restaurantData = useSelector((state) => state.cartReducer.restaurantData);

  const defaultRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  useEffect(() => {
    Animated.timing(slideUp, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [slideUp]);

  const region = restaurantData
    ? {
        latitude: restaurantData?.lat,
        longitude: restaurantData?.lng,
        latitudeDelta: 0.1,
        longitudeDelta: 0.005,
      }
    : defaultRegion;

  return (
    <View className="h-full w-full">
      <MapView className="h-full w-full" region={region}>
        {restaurantData && restaurantData.lat && restaurantData.lng && (
          <Marker
            title={restaurantData?.name}
            description={restaurantData?.description}
            pinColor="lightOrange"
            coordinate={{
              latitude: restaurantData?.lat,
              longitude: restaurantData?.lng,
            }}
          />
        )}
      </MapView>

      <Animated.View
        style={{
          transform: [{ translateY: slideUp }],
          zIndex: 10,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 350,
          backgroundColor: "white",
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          padding: 20,
        }}
      >
        <View>
          <View className="mb-5">
            <Text className="text-lg font-bold text-gray-800">Estimated Arrival</Text>
            <Text className="text-4xl font-extrabold text-gray-800">
              20-30 Minutes!
            </Text>
            <Text className="text-base text-gray-800">Your order is on its way!</Text>
          </View>
          <Image
            source={require("../assets/delivery-rider.gif")}
            className="h-32 w-44 ml-20 mb-5"
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <View className="h-14 rounded-full bg-lightOrange flex justify-center items-center">
            <Text className="text-white text-xl font-bold">Okay!</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default DeliveryScreen;
