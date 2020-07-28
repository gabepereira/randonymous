import React from "react";
import { View, Button } from "react-native";

export default ({ navigation: { navigate } }) => {
    const handleSignIn = () => {
        navigate("Chat");
    };

    return (
        <View>
            <Button onPress={handleSignIn} title="Sign In" />
        </View>
    );
};
