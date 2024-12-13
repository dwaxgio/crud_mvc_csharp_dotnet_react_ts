import React from "react";
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
  const [currentPage, setCurrentPage] = React.useState(1);
  const recordsPerPage = 5;

  const paginatedPlants = plants.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const totalPages = Math.ceil(plants.length / recordsPerPage);

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
    } else if (daysUntilNextWatering <= 3) {
      return { status: "Due Soon", color: "orange" };
    } else {
      return { status: "OK", color: "green" };
    }
  };

  return (
    <div>
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
                </td>{" "}
                <td>
                  <button
                    className="btn btn-success btn-sm ms-2"
                    onClick={() => onWater(plant.id)}
                  >
                    Water
                  </button>
                  <button
                    className="btn btn-danger btn-sm ms-2"
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
