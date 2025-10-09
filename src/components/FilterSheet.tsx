import React, { useRef, useMemo, useCallback, useEffect } from "react";
import { View, Text, Button, Dimensions } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { useRangeFilter } from "@/hooks/useRangeFilter";
import { Country } from "@/types";

type Props = {
    visible: boolean;
    onClose: () => void;
    countries: Country[];
    onApply: (filtered: Country[]) => void;
    setFilterBadge: (badges: number) => void
};

export default function FilterSheet({ visible, onClose, countries, onApply, setFilterBadge }: Props) {
    const sheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ["55%"], []);
    const windowWidth = Dimensions.get('window').width;

    const {
        stats,
        populationRange,
        setPopulationRange,
        areaRange,
        setAreaRange,
        filteredCountries,
        resetFilters,
    } = useRangeFilter(countries);

    const countActiveFilters = () =>
        [
            populationRange[0] > stats.minPopulation || populationRange[1] < stats.maxPopulation,
            areaRange[0] > stats.minArea || areaRange[1] < stats.maxArea,
        ].filter((filter) => filter === true).length;
      
    useEffect(() => {
        setFilterBadge(countActiveFilters());
    }, [populationRange, areaRange, stats]);

    const handleApply = useCallback(() => {
        onApply(filteredCountries);
        onClose();
    }, [filteredCountries]);

    if (!visible) return null;

    return (
        <BottomSheet
            ref={sheetRef}
            index={0}
            snapPoints={snapPoints}
            enablePanDownToClose
            onClose={onClose}
            style={{
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.25)",
                elevation: 10,
            }}
        >
            <BottomSheetView style={{ padding: 20 }} testID="filter-sheet">
                <Text style={{ fontWeight: "500", marginBottom: 6 }}>Population</Text>
                <Text>
                {populationRange[0] === 0
                    ? Math.round(stats.minPopulation).toLocaleString()
                    : Math.round(populationRange[0]).toLocaleString()}
                —{" "}
                {populationRange[1] === Infinity
                    ? Math.round(stats.maxPopulation).toLocaleString()
                    : Math.round(populationRange[1]).toLocaleString()}
                </Text>
                <MultiSlider
                    values={populationRange}
                    min={stats.minPopulation}
                    max={stats.maxPopulation}
                    step={10000}
                    onValuesChange={(values) => setPopulationRange([values[0], values[1]])}
                    selectedStyle={{ backgroundColor: "#007AFF" }}
                    markerStyle={{ backgroundColor: "#007AFF" }}
                    sliderLength={windowWidth - 40}
                />
                <Text style={{ fontWeight: "500", marginBottom: 6, marginTop: 20 }}>
                    Area (km²)
                </Text>
                <Text>
                    {areaRange[0] === 0
                        ? Math.round(stats.minArea).toLocaleString()
                        : Math.round(areaRange[0]).toLocaleString()}
                    —{" "}
                    {areaRange[1] === Infinity
                        ? Math.round(stats.maxArea).toLocaleString()
                        : Math.round(areaRange[1]).toLocaleString()}
                </Text>
                <MultiSlider
                    values={areaRange}
                    min={stats.minArea}
                    max={stats.maxArea}
                    step={10000}
                    onValuesChange={(values) => setAreaRange([values[0], values[1]])}
                    selectedStyle={{ backgroundColor: "#007AFF" }}
                    markerStyle={{ backgroundColor: "#007AFF" }}
                    sliderLength={windowWidth - 40}
                />
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 24,
                    }}
                >
                    <Button title="Reset" color="gray" onPress={resetFilters} />
                    <Button title="Apply filters" onPress={handleApply} />
                </View>
            </BottomSheetView>
        </BottomSheet>
    );
}
