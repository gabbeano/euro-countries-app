import { useEffect, useState } from "react";
import { fetchEuropeanCountries } from "@/api/countries";
import { Country } from "@/types";


export default function useCountries() {
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        fetchEuropeanCountries()
            .then((data) => setCountries(data
                .filter((country: Country) => country.name.toLowerCase() !== "russia")
                .sort((a: Country, b: Country) => a.name.localeCompare(b.name))))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return { countries, loading, error };
}
