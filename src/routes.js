import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import ChatScreen from "./pages/ChatScreen";
import HomeScreen from "./pages/HomeScreen";

const Stack = createStackNavigator();

export default () => {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    );
};
