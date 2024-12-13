import React, { useState } from "react";
import { Plant } from "../models/Plant";

interface PlantTableProps {
  plants: Plant[];
  onDelete: (id: string) => void;
  onWater: (id: string) => void;
}

const PlantTable: React.FC<PlantTableProps> = ({
  plants,
  onDelete,
  onWater,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"urgency" | "name" | "type">("urgency"); // Estado para el criterio de orden
  const recordsPerPage = 5;

  const calculateStatus = (plant: Plant): { status: string; color: string } => {
    const today = new Date();
    const lastWateredDate = new Date(plant.lastWateredDate);
    const nextWateringDate = new Date(
      lastWateredDate.getTime() +
        plant.wateringFrequencyDays * 24 * 60 * 60 * 1000
    );

    const daysUntilNextWatering = Math.ceil(
      (nextWateringDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysUntilNextWatering < 0) {
      return { status: "Overdue", color: "red" };
    } else if (daysUntilNextWatering <= 2) {
      return { status: "Due Soon", color: "orange" };
    } else {
      return { status: "OK", color: "green" };
    }
  };

  const sortedPlants = [...plants].sort((a, b) => {
    if (sortBy === "urgency") {
      const today = new Date();
      const nextWateringA = new Date(
        new Date(a.lastWateredDate).getTime() +
          a.wateringFrequencyDays * 24 * 60 * 60 * 1000
      );
      const nextWateringB = new Date(
        new Date(b.lastWateredDate).getTime() +
          b.wateringFrequencyDays * 24 * 60 * 60 * 1000
      );

      return nextWateringA.getTime() - nextWateringB.getTime();
    } else if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "type") {
      return a.type.localeCompare(b.type);
    }
    return 0;
  });

  const paginatedPlants = sortedPlants.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const totalPages = Math.ceil(sortedPlants.length / recordsPerPage);

  return (
    <div>
      <div className="mb-3 d-flex justify-content-end">
        <label htmlFor="sortBy" className="me-2">
          Sort By:
        </label>
        <select
          id="sortBy"
          className="form-select w-auto"
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value as "urgency" | "name" | "type")
          }
        >
          <option value="urgency">Urgency</option>
          <option value="name">Name</option>
          <option value="type">Type</option>
        </select>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Watering Frequency Days</th>
            <th>Last Watered</th>
            <th>Location</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedPlants.map((plant) => {
            const { status, color } = calculateStatus(plant);
            return (
              <tr key={plant.id}>
                <td>{plant.name}</td>
                <td>{plant.type}</td>
                <td>{plant.wateringFrequencyDays}</td>
                <td>{new Date(plant.lastWateredDate).toLocaleDateString()}</td>
                <td>{plant.location}</td>
                <td style={{ color }}>
                  <strong>{status}</strong>
                </td>
                <td>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => onWater(plant.id)}
                  >
                    Water
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(plant.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="d-flex justify-content-between">
        <button
          className="btn btn-secondary"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-secondary"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PlantTable;
