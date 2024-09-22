import React, { useEffect, useRef, useState } from "react";
import client from "../restaurant-app/sanityClient";
import {
  View,
  SafeAreaView,
  Image,
  Text,
  ScrollView,
  Dimensions,
  Animated,
  BackHandler,
  Alert,
} from "react-native";
import MenuCard from "../components/MenuCard";
import CartButton from "../components/CartButton";
import CartView from "../components/CartView";
import { urlFor } from "../restaurant-app/sanityClient";
import { useDispatch } from "react-redux";
import { emptyCart } from "../features/cartSlice";

const { height } = Dimensions.get("window");

const RestaurantScreen = ({navigation,route}) => {
  const dispatch = useDispatch();
  const [category , setCategory] = useState();
  const translateY = useRef(new Animated.Value(height)).current;
  const {cardData} = route.params;
  const imageUrl = urlFor(cardData?.image).url();

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back to the Home Screen?', [
        { text: 'Cancel', onPress: () => null, style: 'cancel' },
        { text: 'YES', onPress: () => {
          dispatch(emptyCart());
          navigation.navigate("Home")}},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);
  

  useEffect(()=>{
    const getCategory = async () => {
      const data =
        await client.fetch(`*[_id == "${cardData?.type?._ref}"] {name}`);
      setCategory(data[0]);
    };
    getCategory();
  },[])

  const slideUp = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const slideDown = () => {
    Animated.timing(translateY, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView className="flex-1 bg-white relative">
      {/* Restaurant Image */}
      <View className="h-[35%] w-full">
        <Image
          source={{uri: imageUrl}}
          className="h-full w-full"
        />
      </View>

      <View className="absolute top-[28%] left-0 right-0 h-[72%] bg-white rounded-t-[35px] pt-5 px-5">
        
        <View className="flex gap-2">
          <Text className="text-4xl font-extrabold">{cardData?.name}</Text>
          <Text className="text-gray-700 flex items-center text-base">
            <Image
              source={require("../assets/icons/star-icon.png")}
              className="h-5 w-5"
            />{" "}
            {cardData?.rating} ({cardData?.reviews} reviews) · <Text className="font-bold">{category?.name}</Text>
          </Text>
          <View className="flex-row pt-1 items-center">
            <Image
              source={require("../assets/icons/location-icon.png")}
              className="h-5 w-5"
            />
            <Text className="text-gray-700 text-base">
              {" "}
              {cardData?.address}
            </Text>
          </View>

          <Text className="text-3xl font-extrabold pt-2">Menu</Text>
        </View>

        <ScrollView
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: "column",
            rowGap: 10,
            paddingTop: 10,
            paddingBottom: 100,
          }}
        >
          {
            cardData?.dishes.map((element,index)=>{
              return <MenuCard data = {element} key={index}/>
            })
          }
        </ScrollView>
      </View>
      <CartButton slideUp={slideUp} />
      <CartView translateY={translateY} navigation={navigation} slideDown={slideDown}/>

    </SafeAreaView>
  );
};

export default RestaurantScreen;
