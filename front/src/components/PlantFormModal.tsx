import React, { useState } from "react";
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
  const [formData, setFormData] = useState<Plant>(
    plant || {
      id: "",
      name: "",
      type: "succulent",
      wateringFrequencyDays: 1,
      lastWateredDate: new Date().toISOString(),
      location: "",
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
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
              <input
                className="form-control mb-3"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
              />
              <select
                className="form-select mb-3"
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="succulent">Succulent</option>
                <option value="tropical">Tropical</option>
                <option value="herb">Herb</option>
                <option value="cacti">Cacti</option>
              </select>
              <input
                className="form-control mb-3"
                type="number"
                name="wateringFrequencyDays"
                value={formData.wateringFrequencyDays}
                onChange={handleChange}
                placeholder="Watering Frequency (days)"
                required
              />
              <input
                className="form-control mb-3"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
                required
              />
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
