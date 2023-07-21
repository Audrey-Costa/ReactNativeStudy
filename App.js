import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack"
import Login from "./screens/Login";
import StickerSmach from "./screens/StickerSmash";
import { View } from "react-native";

const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="StickerSmash" component={StickerSmach} />
        </Stack.Navigator>
    <View>
      <StatusBar style="dark"/>
    </View>
      </NavigationContainer>
  )
};  