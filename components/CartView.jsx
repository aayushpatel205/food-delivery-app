import React from "react";
import {
  Animated,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import CartCard from "./CartCard";
import { useSelector, useDispatch } from "react-redux";
import { emptyCart } from "../features/cartSlice";
import { ToastAndroid } from "react-native";

const showToastWithGravity = () => {
  ToastAndroid.showWithGravity(
    'Cant Place Order , Please fill the Cart !!',
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
  );
};

const CartView = ({ translateY, navigation, slideDown }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => {
    return state.cartReducer.cart;
  });
  const totalCost = useSelector((state) => {
    return state.cartReducer.totalCost;
  });
  const restaurantData = useSelector((state)=>{
    return state.cartReducer.restaurantData;
  })
  return (
    <Animated.View
      style={[
        styles.animatedView,
        { transform: [{ translateY }] }
      ]}
    >
      <View className="flex-1 pt-3 relative">
        <TouchableOpacity onPress={() => slideDown()} className="px-5">
          <View className="bg-lightOrange rounded-full h-11 w-11 flex justify-center items-center absolute top-1 left-3">
            <Image
              className="h-7 w-7"
              source={require("../assets/icons/icons8-back-arrow-64.png")}
            />
          </View>
        </TouchableOpacity>
        <View className="flex-row justify-center">
          <View className="flex items-center">
            <Text className="text-2xl font-bold mb-1">Your Cart</Text>
            <Text className="text-base text-gray-600">{restaurantData?.name}</Text>
          </View>
        </View>

        <View
          className="h-20 mt-5 mb-6 w-full p-5 flex-row items-center justify-center"
          style={{ backgroundColor: "rgba(244, 134, 49, 0.3)" }}
        >
          <Image
            source={require("../assets/icons/delivery-bike.png")}
            className="h-12 w-12 mr-4"
          />
          <Text className="text-lg font-bold">
          "Your Food, Delivered with Care!"
          </Text>
        </View>

        <View className="p-3 flex-col">
          {data?.length > 0 ? (
            data.map((element,index) => {
              if (element?.quantity > 0) return <CartCard data={element} key={index}/>;
            })
          ) : (
            <View className="h-[50%] w-full flex-row justify-center">
              <View className="flex gap-2 items-center">
                <Image
                  source={require("../assets/icons/empty-cart-3d.jpg")}
                  className="h-40 w-40"
                />
                <Text className="text-2xl font-extrabold text-lightOrange">
                  The cart is empty!
                </Text>
              </View>
            </View>
          )}
        </View>

        <View
          className="h-[25%] w-full py-5 px-10 absolute bottom-0"
          style={{
            backgroundColor: "rgba(244, 134, 49, 0.3)",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}
        >
          <View className="flex-row justify-between mb-2">
            <Text className="text-lg text-gray-600">Subtotal</Text>
            <Text className="text-lg text-gray-600">${totalCost}</Text>
          </View>

          <View className="flex-row justify-between mb-2">
            <Text className="text-lg text-gray-600">Delivery Fee</Text>
            <Text className="text-lg text-gray-600">${data?.length}</Text>
          </View>

          <View className="flex-row justify-between mb-2">
            <Text className="text-lg font-bold">Order total</Text>
            <Text className="text-lg font-bold">
              ${totalCost + data?.length}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              if (data?.length > 0) {
                dispatch(emptyCart());
                navigation.navigate("Delivery");
              }else{
                showToastWithGravity();
              }
            }}
          >
            <View className="h-14 rounded-full bg-lightOrange flex justify-center items-center">
              <Text className="text-white text-xl font-bold">Place Order</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedView: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "95%",
    zIndex: 100,
    backgroundColor: "white",
    borderRadius: 40,
  },
});

export default CartView;
