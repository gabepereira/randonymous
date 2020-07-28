import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { colors } from "../../config/styles";

const styles = StyleSheet.create({
    message: {
        maxWidth: 300,
        paddingTop: 6,
        paddingBottom: 1,
        alignSelf: "flex-start",
    },
    username: {
        fontWeight: "bold",
        paddingBottom: 6,
    },
    content: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: colors.white,
        borderRadius: 5,
        elevation: 1,
    },
});

export default ({ data: { message, from, content, isSameUser } }) => (
    <View style={styles.message}>
        <View style={styles.content}>
            {/* {!isSameUser && <Text style={styles.username}>{from}</Text>}
            <Text>{content}</Text> */}
            <Text>{message}</Text>
        </View>
    </View>
);
