import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plant } from "../models/Plant";
import PlantTable from "../components/PlantTable";
import PlantFormModal from "../components/PlantFormModal";

import { API_BASE_URL } from "../utils/env";

const Dashboard: React.FC = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [modalPlant, setModalPlant] = useState<Plant | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = () => {
    axios
      .get<Plant[]>(`${API_BASE_URL}plants`)
      .then((response) => setPlants(response.data))
      .catch((error) => console.error("Error fetching plants:", error));
  };

  const fetchDuePlants = () => {
    axios
      .get<Plant[]>(`${API_BASE_URL}plants/due`)
      .then((response) => setPlants(response.data))
      .catch((error) => console.error("Error fetching due plants:", error));
  };

  const handleSavePlant = (plant: Plant) => {
    const payload = {
      ...plant,
      id: plant.id || undefined,
      lastWateredDate: new Date(plant.lastWateredDate).toISOString(),
    };

    if (plant.id) {
      axios
        .put(`${API_BASE_URL}plants/${plant.id}`, payload)
        .then(fetchPlants)
        .catch((error) => console.error("Error updating plant:", error));
    } else {
      axios
        .post(`${API_BASE_URL}plants`, payload)
        .then(fetchPlants)
        .catch((error) => console.error("Error adding plant:", error));
    }
    setIsModalOpen(false);
  };

  const handleDeletePlant = (id: string) => {
    axios
      .delete(`${API_BASE_URL}plants/${id}`)
      .then(fetchPlants)
      .catch((error) => console.error("Error deleting plant:", error));
  };

  const handleWaterPlant = (id: string) => {
    axios
      .put(`${API_BASE_URL}plants/${id}/water`)
      .then(fetchPlants)
      .catch((error) => console.error("Error watering plant:", error));
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Plant Care Dashboard</h1>
      <div className="d-flex justify-content-between mb-3">
        <button
          className="btn btn-success"
          onClick={() => {
            setModalPlant(null);
            setIsModalOpen(true);
          }}
        >
          Add Plant
        </button>
        <button className="btn btn-warning" onClick={fetchDuePlants}>
          Show Due Plants
        </button>
        <button className="btn btn-secondary" onClick={fetchPlants}>
          Show All Plants
        </button>
      </div>
      <PlantTable
        plants={plants}
        onDelete={handleDeletePlant}
        onWater={handleWaterPlant}
      />
      <PlantFormModal
        plant={modalPlant}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePlant}
      />
    </div>
  );
};

export default Dashboard;
