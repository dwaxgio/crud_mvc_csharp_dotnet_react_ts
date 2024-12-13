import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import Dashboard from "../../pages/Dashboard";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Dashboard", () => {
  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({
      data: [
        {
          id: "1",
          name: "Cactus",
          type: "cacti",
          wateringFrequencyDays: 7,
          lastWateredDate: new Date().toISOString(),
          location: "Living Room",
        },
      ],
    });

    mockedAxios.put.mockResolvedValue({});
  });

  test("updates plant status after watering", async () => {
    render(<Dashboard />);

    const waterButton = await screen.findByRole("button", { name: /Water/i });

    fireEvent.click(waterButton);

    expect(mockedAxios.put).toHaveBeenCalledWith(
      expect.stringContaining("/plants/1/water")
    );

    const statusCell = await screen.findByText(/OK/i);
    expect(statusCell).toBeInTheDocument();
  });
});
