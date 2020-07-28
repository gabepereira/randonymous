import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";

import Routes from "./src/routes";

export default () => {
    return (
        <NavigationContainer>
            <Routes />
            <StatusBar style="auto" />
        </NavigationContainer>
    );
};
