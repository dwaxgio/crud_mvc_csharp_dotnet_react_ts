import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PlantFormModal from "../PlantFormModal";

describe("PlantFormModal", () => {
  test("validates required fields", () => {
    const onSave = jest.fn();
    render(
      <PlantFormModal
        plant={null}
        isOpen={true}
        onClose={jest.fn()}
        onSave={onSave}
      />
    );

    const saveButton = screen.getByText(/Save/i);
    fireEvent.click(saveButton);

    const nameInput = screen.getByPlaceholderText(/Enter plant name/i);
    expect(nameInput).toBeInvalid(); 
  });
});
