import React, { useState, useEffect, useRef } from "react";
import { View, ScrollView, StyleSheet, TextInput } from "react-native";
import useWebSocket from "react-use-websocket";
import { IconButton } from "react-native-paper";

// import { AuthContext } from "../config/contexts/AuthContext";

import { Message } from "../components";
import { colors } from "../config/styles";

const styles = StyleSheet.create({
    messagesContainer: {
        flex: 1,
        paddingHorizontal: 12,
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    actionElement: {
        margin: 12,
        marginTop: 6,
        elevation: 1,
        borderRadius: 5,
    },
    messageBox: {
        flex: 1,
        marginRight: 3,
        maxHeight: 120,
        padding: 12,
        backgroundColor: colors.white,
    },
    button: {
        width: 52,
        height: 52,
        marginHorizontal: 3,
        alignSelf: "flex-end",
        backgroundColor: colors.primary,
    },
    sendButton: {
        marginRight: 12,
    },
});

export default () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [isCloseToBottom, setIsCloseToBottom] = useState(null);

    const socketUrl = "ws://192.168.15.31:39980";

    const { sendJsonMessage: send, lastJsonMessage: data } = useWebSocket(
        socketUrl
    );

    const scrollRef = useRef(null);

    useEffect(() => {
        data?.type === "message" &&
            setMessages((messages) => [...messages, data]);
    }, [data]);

    const handleSendMessage = () => {
        if (message.length) {
            send({
                action: "sendmessage",
                data: {
                    type: "message",
                    from: "teste",
                    content: message,
                },
            });
            setMessage("");
        }
    };

    // const handleAttachment = () => {
    //     console.log("attach");
    // };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                ref={scrollRef}
                style={styles.messagesContainer}
                onScroll={({
                    nativeEvent: {
                        layoutMeasurement,
                        contentOffset,
                        contentSize,
                    },
                }) =>
                    setIsCloseToBottom(
                        layoutMeasurement.height + contentOffset.y >=
                            contentSize.maxHeight - 50
                    )
                }
                onContentSizeChange={(width, height) =>
                    isCloseToBottom && scrollRef.current.scrollTo({ y: height })
                }
            >
                {messages.map(({ from, content }, i) => (
                    <Message
                        key={i}
                        data={{
                            from,
                            content,
                            isSameUser: from === messages[i - 1]?.from,
                        }}
                    />
                ))}
            </ScrollView>
            <View style={styles.actions}>
                <TextInput
                    style={[styles.messageBox, styles.actionElement]}
                    placeholder="Type awesome things..."
                    value={message}
                    onChangeText={(value) => setMessage(value)}
                    multiline
                />
                {/* <IconButton
                    size={20}
                    style={[styles.button, styles.actionElement]}
                    icon="attachment"
                    color={colors.white}
                    onPress={handleAttachment}
                /> */}
                <IconButton
                    size={18}
                    style={[
                        styles.button,
                        styles.sendButton,
                        styles.actionElement,
                    ]}
                    icon="send"
                    color={colors.white}
                    onPress={handleSendMessage}
                />
            </View>
        </View>
    );
};
