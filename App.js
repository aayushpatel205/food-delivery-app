import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./pages/HomeScreen";
import RestaurantScreen from "./pages/RestaurantScreen";
import DeliveryScreen from "./pages/DeliveryScreen";
import { Provider } from "react-redux";
import { store } from "./app/store";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style="light"/>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            headerStyle:{
              backgroundColor: "#fff"
            }
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Restaurant" component={RestaurantScreen} />
          <Stack.Screen name="Delivery" component={DeliveryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
