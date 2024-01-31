import React from "react";
import LazyLoad from "react-lazyload";
import "./vehicleModel.css";
import { Link } from "react-router-dom";
const VehicleModel = ({ vehicle }) => {
  return (
    <Link to={`/car-details/${vehicle.id}`} className="vehicle-container">
      <div className="card">
        <LazyLoad height={240}>
          <img
            src={`http://localhost:8000/${vehicle.image}`}
            className="card-img-top vehicle-image"
            alt={`${vehicle.model}`}
          />
        </LazyLoad>
        <div className="vehicle-info">
          <div className="make-model-year">
            <h2>{vehicle.make}</h2>
            <h2>{vehicle.model}</h2>
            <h2>{vehicle.year}</h2>
          </div>
          <div className="vehicle-price">
            PKR {new Intl.NumberFormat().format(vehicle.price)}
          </div>
          <div className="vehicle-city">{vehicle.city}</div>
        </div>
      </div>
    </Link>
  );
};

export default VehicleModel;
