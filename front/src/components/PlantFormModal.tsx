import React, { useState, useEffect } from "react";
import { Plant } from "../models/Plant";

interface PlantFormModalProps {
  plant: Plant | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (plant: Plant) => void;
}

const PlantFormModal: React.FC<PlantFormModalProps> = ({
  plant,
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Plant>({
    id: "",
    name: "",
    type: "succulent",
    wateringFrequencyDays: 1,
    lastWateredDate: new Date().toISOString(),
    location: "",
  });

  useEffect(() => {
    if (plant) {
      setFormData({
        ...plant,
        lastWateredDate: plant.lastWateredDate.slice(0, 10),
      });
    } else {
      setFormData({
        id: "",
        name: "",
        type: "succulent",
        wateringFrequencyDays: 1,
        lastWateredDate: new Date().toISOString().slice(0, 10),
        location: "",
      });
    }
  }, [plant]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "wateringFrequencyDays" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedData = {
      ...formData,
      lastWateredDate: new Date(formData.lastWateredDate).toISOString(),
    };

    onSave(formattedData);
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {plant ? "Edit Plant" : "Add Plant"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  id="name"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter plant name"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="type" className="form-label">
                  Type
                </label>
                <select
                  id="type"
                  className="form-select"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="succulent">Succulent</option>
                  <option value="tropical">Tropical</option>
                  <option value="herb">Herb</option>
                  <option value="cacti">Cacti</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="wateringFrequencyDays" className="form-label">
                  Watering Frequency (Days)
                </label>
                <input
                  id="wateringFrequencyDays"
                  className="form-control"
                  type="number"
                  name="wateringFrequencyDays"
                  value={formData.wateringFrequencyDays}
                  onChange={handleChange}
                  placeholder="Enter watering frequency in days"
                  min="1"
                  max="365"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="lastWateredDate" className="form-label">
                  Last Watered Date
                </label>
                <input
                  id="lastWateredDate"
                  className="form-control"
                  type="date"
                  name="lastWateredDate"
                  value={formData.lastWateredDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="location" className="form-label">
                  Location
                </label>
                <input
                  id="location"
                  className="form-control"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter location"
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlantFormModal;
