import React from "react";
import { render, screen } from "@testing-library/react";
import PlantTable from "../PlantTable";
import { Plant } from "../../models/Plant";

describe("PlantTable", () => {
  const plants: Plant[] = [
    {
      id: "1",
      name: "Cactus",
      type: "cacti",
      wateringFrequencyDays: 7,
      lastWateredDate: new Date().toISOString(),
      location: "Living Room",
    },
  ];

  test("displays due date status correctly", () => {
    render(
      <PlantTable plants={plants} onDelete={jest.fn()} onWater={jest.fn()} />
    );
    const statusCell = screen.getByText(/OK/i); 
    expect(statusCell).toBeInTheDocument();
  });
});
