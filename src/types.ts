
export interface Country {
    id: string;
    name: string;
    capital: string;
    flag: string | null;
    population: number;
    area: number;
}

export type CountryDetails = {
    name: string;
    population: string;
    area: string;
}
