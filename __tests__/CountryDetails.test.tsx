import React from "react";
import { render } from "@testing-library/react-native";
import CountryDetails from "../app/details";

// mock Expo Router
jest.mock("expo-router", () => ({
  Stack: {
    Screen: ({ options }: any) => null, 
  },
  useLocalSearchParams: jest.fn(),
}));

import { useLocalSearchParams } from "expo-router";

describe("CountryDetailsScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("rendering title and data population/area", () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({
      name: "Germany",
      population: 83240525,
      area: 357114,
    });

    const { getByText } = render(<CountryDetails />);

    expect(getByText("Population:")).toBeTruthy();
    expect(getByText("83,240,525")).toBeTruthy();
    expect(getByText("Area:")).toBeTruthy();
    expect(getByText("357,114 km²")).toBeTruthy();
  });

  it("default values", () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({
      name: "Unknown",
      population: null,
      area: null,
    });

    const { getByText } = render(<CountryDetails />);

    expect(getByText("Population:")).toBeTruthy();
    expect(getByText("—")).toBeTruthy();
    expect(getByText("Area:")).toBeTruthy();
    expect(getByText("—")).toBeTruthy();
  });
});
