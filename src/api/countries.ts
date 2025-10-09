const BASE =
    "https://restcountries.com/v3.1/region/europe?fields=name,capital,flags,population,area,cca3";

export async function fetchEuropeanCountries() {
    const res = await fetch(BASE);
    if (!res.ok) throw new Error("Network error");
    const data = await res.json();

    console.log('data ', data)

    return data.map((country: any) => ({
        id: country.cca3,
        name: country.name?.common || "—",
        capital: Array.isArray(country.capital) ? country.capital[0] : country.capital || "—",
        flag: country.flags?.png || null,
        population: country.population || 0,
        area: country.area || 0,
    }));
}
