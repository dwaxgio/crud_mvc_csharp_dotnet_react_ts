import "@testing-library/jest-dom";

process.env = {
  ...process.env,
  VITE_API_BASE_URL: "https://localhost:7056/api/",
};

jest.mock("axios");
