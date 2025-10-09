import { useMemo, useState } from "react";
import { Country } from "@/types";

export function useRangeFilter(countries: Country[]) {
    const [populationRange, setPopulationRange] = useState<[number, number]>([0, Infinity]);
    const [areaRange, setAreaRange] = useState<[number, number]>([0, Infinity]);

    const stats = useMemo(() => {
        const populations = countries.map(c => c.population).filter(Boolean);
        const areas = countries.map(c => c.area).filter(Boolean);

        return {
        minPopulation: Math.min(...populations),
        maxPopulation: Math.max(...populations),
        minArea: Math.min(...areas),
        maxArea: Math.max(...areas),
        };
    }, [countries]);

    const filteredCountries = useMemo(() => {
        return countries.filter(c => {
        const withinPopulation =
            c.population >= populationRange[0] && c.population <= populationRange[1];
        const withinArea =
            c.area >= areaRange[0] && c.area <= areaRange[1];
        return withinPopulation && withinArea;
        });
    }, [countries, populationRange, areaRange]);

    const resetFilters = () => {
        setPopulationRange([0, Infinity]);
        setAreaRange([0, Infinity]);
    };

    return {
        stats,
        populationRange,
        setPopulationRange,
        areaRange,
        setAreaRange,
        filteredCountries,
        resetFilters,
    };
}
