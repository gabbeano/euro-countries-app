import React, { useState } from "react";
import { View, FlatList, ActivityIndicator, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import useCountries from "@/hooks/useCountries";
import CountryItem from "@/components/CountryItem";
import SearchBar from "@/components/SearchBar";

export default function CountryListScreen() {
    const { countries, loading, error } = useCountries();
    const [query, setQuery] = useState("");

    const router = useRouter();

    const filtered = countries.filter((country) =>
        country.name.toLowerCase().includes(query.toLowerCase())
    );

    if (loading)
      return (
        <View style={styles.center}>
            <ActivityIndicator testID="activity-indicator" size="large" />
        </View>
      );

    if (error)
      return (
        <View style={styles.center}>
            <Text>Error: {error}</Text>
        </View>
      );

    return (
        <View style={styles.container}>
            <SearchBar
                value={query}
                onChange={setQuery}
            />
            <FlatList
                data={filtered}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <CountryItem
                        key={item.id}
                        country={item}
                        onPress={() => router.push({ pathname: "/details", params: { 
                            name: item.name, 
                            population: item.population,
                            area: item.area } 
                        })}
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fafafa"
    },
    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
});
