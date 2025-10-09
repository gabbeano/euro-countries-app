import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { CountryDetails } from "@/types";

export default function DetailsScreen() {
  const { name, population, area } = useLocalSearchParams<CountryDetails>();

  return (
    <View style={styles.container}>
        <Stack.Screen options={{ title: name }} />
        <View style={styles.row}>
            <Text style={styles.label}>Population:</Text>
            <Text style={styles.value}>
                {Number(population).toLocaleString() || "—"}
            </Text>
        </View>
        <View style={[styles.row, styles.borderBottom]}>
            <Text style={styles.label}>Area:</Text>
            <Text style={styles.value}>
                {area ? `${Number(area).toLocaleString()} km²` : "—"}
            </Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderColor: "#f0f0f0",
        paddingHorizontal: 12,
        paddingVertical: 20,
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderColor: "#f0f0f0",
    },
    label: { color: "#555" },
    value: { fontWeight: "600" },
});
