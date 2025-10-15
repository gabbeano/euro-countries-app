import React, { useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from '@react-native-vector-icons/ionicons';
import useCountries from "@/hooks/useCountries";
import CountryItem from "@/components/CountryItem";
import SearchBar from "@/components/SearchBar";
import { Country } from "@/types";
import FilterSheet from "@/components/FilterSheet";

export default function CountryListScreen() {
    const { countries, loading, error } = useCountries();
    const [query, setQuery] = useState("");
    const [debounceQuery, setDebounceQuery] = useState(query);
    const [filterBadge, setFilterBadge] = useState(0);
    

    const router = useRouter();

    const [isFilterVisible, setFilterVisible] = useState(false);
    const [filtered, setFiltered] = useState<Country[]>(countries);

    useEffect(() => {
        if (countries.length > 0) {
            setFiltered(countries);
        }
    }, [countries]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebounceQuery(query)
        }, 300);

        return () => {
            clearTimeout(timeout);
        }

    }, [query]);

    const searched = filtered.filter((country) =>
        country.name.toLowerCase().includes(debounceQuery.toLowerCase())
    );

    const onCleanSearch = () => setQuery("");

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
                onClean={onCleanSearch}
            />
            <FlatList
                data={searched}
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
            <View style={styles.filterContainer}>
                <TouchableOpacity
                    style={styles.filterButton}
                    onPress={() => setFilterVisible(true)}
                    testID="filter-button"
                >
                    <Ionicons name="filter" color="#fff" size={22} />
                </TouchableOpacity>
                {(filterBadge > 0) && (
                    <View style={styles.badge}>
                        <Text style={styles.textBadge}>
                            {filterBadge}
                        </Text>
                    </View>
                )}
            </View>
            
            <FilterSheet
                visible={isFilterVisible}
                onClose={() => setFilterVisible(false)}
                countries={countries}
                onApply={setFiltered}
                setFilterBadge={(badges: number) => setFilterBadge(badges)}
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
    filterContainer: {
        position: "absolute",
        bottom: 40,
        right: 20,       
    },
    filterButton: {
        backgroundColor: "#007AFF",
        padding: 14,
        borderRadius: 30,
    },
    badge: {
        position: "absolute",
        padding: 2,
        minWidth: 18,
        minHeight: 18,
        justifyContent: "center",
        alignItems: "center",
        top: -4,
        right: -4,
        backgroundColor: "#e43636",
        borderRadius: 10,
        paddingHorizontal: 5,
    },
    textBadge: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
    },
});

