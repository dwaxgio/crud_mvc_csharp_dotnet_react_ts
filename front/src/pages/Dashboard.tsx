import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plant } from "../models/Plant";

const Dashboard: React.FC = () => {
    const [plants, setPlants] = useState<Plant[]>([]);

  useEffect(() => {
    axios
      .get<Plant[]>("https://localhost:7056/api/plants")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setPlants(response.data);
        } else {
          console.error("API did not return an array:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching plants:", error);
      });
  }, []);

  return (
    <div>
      <h1>Plant Care Dashboard</h1>
      {plants.length > 0 ? (
        <ul>
          {plants.map((plant) => (
            <li key={plant.id}>
              {plant.name} - Next Watering:{" "}
              {new Date(plant.lastWateredDate).toLocaleDateString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>No plants available. Please add some plants!</p>
      )}
    </div>
  );
};

export default Dashboard;
