import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plant } from "../models/Plant";
import PlantTable from "../components/PlantTable";
import PlantFormModal from "../components/PlantFormModal";

const Dashboard: React.FC = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [modalPlant, setModalPlant] = useState<Plant | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = () => {
    axios
      .get<Plant[]>("https://localhost:7056/api/plants")
      .then((response) => setPlants(response.data))
      .catch((error) => console.error("Error fetching plants:", error));
  };

  const handleSavePlant = (plant: Plant) => {
    const payload = {
      ...plant,
      id: plant.id || undefined,
      lastWateredDate: new Date(plant.lastWateredDate).toISOString(),
    };

    if (plant.id) {
      axios
        .put(`https://localhost:7056/api/plants/${plant.id}`, payload)
        .then(fetchPlants)
        .catch((error) => console.error("Error updating plant:", error));
    } else {
      axios
        .post("https://localhost:7056/api/plants", payload)
        .then(fetchPlants)
        .catch((error) => console.error("Error adding plant:", error));
    }
    setIsModalOpen(false);
  };

  const handleDeletePlant = (id: string) => {
    axios
      .delete(`https://localhost:7056/api/plants/${id}`)
      .then(fetchPlants)
      .catch((error) => console.error("Error deleting plant:", error));
  };

  const handleWaterPlant = (id: string) => {
    axios
      .put(`https://localhost:7056/api/plants/${id}/water`)
      .then(fetchPlants)
      .catch((error) => console.error("Error watering plant:", error));
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Plant Care Dashboard</h1>
      <button
        className="btn btn-success mb-3"
        onClick={() => {
          setModalPlant(null);
          setIsModalOpen(true);
        }}
      >
        Add Plant
      </button>
      <PlantTable
        plants={plants}
        onEdit={(plant) => {
          setModalPlant(plant);
          setIsModalOpen(true);
        }}
        onDelete={handleDeletePlant}
        onWater={handleWaterPlant} // Nueva función para registrar el riego
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
