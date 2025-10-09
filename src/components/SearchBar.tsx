import Ionicons from "@react-native-vector-icons/ionicons";
import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";

interface Props {
    value: string;
    onChange: (text: string) => void;
    onClean: () => void;
}

export default function SearchBar({ value, onChange, onClean }: Props) {

    const isValue = value !== "";

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Search country..."
                value={value}
                onChangeText={onChange}
                style={styles.input}
            />
            {isValue &&
                <TouchableOpacity onPress={onClean} style={styles.cleanIcon}>
                    <Ionicons name="close-circle" size={20} color="#999" />
                </TouchableOpacity>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: "#f1f3f4"
    },
    input: {
        backgroundColor: "#fff",
        paddingRight: 30,
        paddingLeft: 12,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#e0e0e0",
    },
    cleanIcon: {
        position: "absolute",
        height: "100%",
        top: 8,
        bottom: 8,
        right: 10,
        paddingHorizontal: 5,
        justifyContent: "center",
    },
});
