import React from "react";
import { Plant } from "../models/Plant";

interface PlantTableProps {
  plants: Plant[];
  onEdit: (plant: Plant) => void;
  onDelete: (id: string) => void;
}

const PlantTable: React.FC<PlantTableProps> = ({
  plants,
  onEdit,
  onDelete,
}) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const recordsPerPage = 5;

  const paginatedPlants = plants.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const totalPages = Math.ceil(plants.length / recordsPerPage);

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Last Watered</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedPlants.map((plant) => (
            <tr key={plant.id}>
              <td>{plant.name}</td>
              <td>{plant.type}</td>
              <td>{new Date(plant.lastWateredDate).toLocaleDateString()}</td>
              <td>{plant.location}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => onEdit(plant)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm ms-2"
                  onClick={() => onDelete(plant.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
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
