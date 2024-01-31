import React, { useState } from "react";
import "./uservehicle.css";
import ConfirmationModal from "../../../modal/ConfirmationModal";
const UserVehicleModel = ({ vehicle, handleDelete }) => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmDelete = () => {
    handleDelete(vehicle.id);
    setShowModal(false);
  };
  return (
    <div className="user-vehicle-card card">
      <div className="user-card-body">
        <img alt="car" src={`http://localhost:8000/${vehicle.image}`} />
        <div>
          <div className="make-model">
            <div>{vehicle.make}</div>
            <div>{vehicle.model}</div>
            <div>{vehicle.year}</div>
          </div>
          <div className="ad-live card">
            <p>Your Ad is Live</p>
          </div>
          <button
            className="btn btn-warning"
            onClick={() => setShowModal(true)}
          >
            Delete Ad
          </button>
          <ConfirmationModal
            showModal={showModal}
            handleClose={handleCloseModal}
            handleConfirm={handleConfirmDelete}
            title="Are you sure to delete your Ad?"
          />
        </div>
      </div>
    </div>
  );
};

export default UserVehicleModel;
