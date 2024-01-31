import React from "react";
import Loader from "../../../loader/Loader";
import VehicleModel from "./VehicleModel";
import "./vehicleModel.css";

const Vehicles = ({ allVehicles, isLoading, page, setPage, hasNextPage }) => {
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="row vehicles-section mx-5">
          <div className="vehicles-row">
            {allVehicles &&
              allVehicles.map((vehicle) => (
                <div key={vehicle.id} className="col-md-3">
                  <VehicleModel vehicle={vehicle} />
                </div>
              ))}
          </div>
          <div className="pagination-card card row">
            <div className="col-md-12">
              <button
                className="pagination-button"
                onClick={() => setPage(1)}
                disabled={page === 1}
              >
                « First
              </button>
              <button
                className="pagination-button"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                ‹ Prev
              </button>
              <span className="pagination-info">Page {page}</span>
              <button
                className="pagination-button"
                onClick={() => setPage(page + 1)}
                disabled={!hasNextPage}
              >
                Next ›
              </button>
              <button
                className="pagination-button"
                onClick={() => setPage(10)}
                disabled={!hasNextPage}
              >
                Last »
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vehicles;
