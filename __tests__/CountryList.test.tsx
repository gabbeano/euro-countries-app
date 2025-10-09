import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import CountryList from "../app/index";
import useCountries from "@/hooks/useCountries";

// mock Expo Router
jest.mock("expo-router", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

// mock hook useCountries
jest.mock("@/hooks/useCountries");

describe("CountryList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Showing loader", () => {
    (useCountries as jest.Mock).mockReturnValue({
      countries: [],
      loading: true,
      error: null,
    });

    const { getByTestId } = render(<CountryList />);
    expect(getByTestId("activity-indicator")).toBeTruthy();
  });

  it("Showing Error", () => {
    (useCountries as jest.Mock).mockReturnValue({
      countries: [],
      loading: false,
      error: "Network error",
    });

    const { getByText } = render(<CountryList />);
    expect(getByText(/Network error/i)).toBeTruthy();
  });

  it("Rendering list", () => {
    const countries = [
      { id: "DEU", name: "Germany", population: 83240525, area: 357114 },
      { id: "FRA", name: "France", population: 67081000, area: 551695 },
    ];

    (useCountries as jest.Mock).mockReturnValue({
      countries,
      loading: false,
      error: null,
    });

    const { getByText, queryByText, getByPlaceholderText } = render(<CountryList />);

    // Rendering
    expect(getByText("Germany")).toBeTruthy();
    expect(getByText("France")).toBeTruthy();

    // Filltering
    const input = getByPlaceholderText("Search country...");
    fireEvent.changeText(input, "France");

    expect(getByText("France")).toBeTruthy();
    expect(queryByText("Germany")).toBeNull(); 
  });

  // Filter button and modal
  it("opens filter modal when filter button is pressed", () => {
    (useCountries as jest.Mock).mockReturnValue({
      countries: [],
      loading: false,
      error: null,
    });
  
    const { getByTestId } = render(<CountryList />);
  
    const filterButton = getByTestId("filter-button");
    expect(filterButton).toBeTruthy();
  
    fireEvent.press(filterButton);
  
    const filterSheet = getByTestId("filter-sheet");
    expect(filterSheet).toBeTruthy();
  });
});
