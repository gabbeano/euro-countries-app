import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Country } from "@/types";

interface Props {
    country: Country;
    onPress: () => void;
}

export default function CountryItem({ country, onPress }: Props) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image source={{ uri: country.flag ?? "" }} style={styles.flag} />
            <View style={styles.info}>
                <Text style={styles.name}>{country.name}</Text>
                <Text style={styles.capital}>{country.capital}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderBottomWidth: 1,
        borderColor: "#eee",
        backgroundColor: "#fff",
    },
    flag: {
        width: 56,
        height: 40,
        borderRadius: 4,
        marginRight: 12,
        backgroundColor: "#f6f6f6",
    },
    info: { flex: 1 },
    name: { fontSize: 16, fontWeight: "600" },
    capital: { marginTop: 2, color: "#666" },
});
