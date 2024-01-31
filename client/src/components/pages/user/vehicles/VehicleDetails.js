import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../../api/api";
import "./vehicleDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import {
  faCalendar,
  faTachometer,
  faGasPump,
  faCogs as faTransmission,
  faLocationDot,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../../../nav/Logo.png";
import VehicleModel from "./VehicleModel";
import Footer from "../../../footer/Footer";
import Navbar from "../../../nav/Navbar";
const VehicleDetails = () => {
  const { vehicleId } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [similarVehicles, setSimilarVehicles] = useState([]);
  console.log(similarVehicles);
  const fetchVehicle = async (vehicleId) => {
    try {
      const response = await api.get(`/vehicle/${vehicleId}`);
      if (response.data) {
        setVehicle(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSimilarVehicles = async () => {
    try {
      const response = await api.get(`/similar-vehicles/${vehicleId}`);
      if (response.data) {
        setSimilarVehicles(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchVehicle(vehicleId);
    fetchSimilarVehicles();
  }, [vehicleId]);
  const avatarSrc = `https://ui-avatars.com/api/?name=${vehicle?.User.username}&size=40`;
  return (
    <div>
      <Navbar />
      <div className="vehicle-detail-container">
        {vehicle && (
          <div className="row">
            <div className="col-md-7">
              <div className="card car-details">
                <div className="car-name">
                  <div className="make-model">
                    <h2>{vehicle.make}</h2>
                    <h2>{vehicle.model}</h2>
                    <h2>{vehicle.year}</h2>
                  </div>
                  <div className="image-city">
                    <FontAwesomeIcon icon={faLocationDot} /> {vehicle.city}
                  </div>
                </div>
                <div className="car-image-details">
                  {vehicle && vehicle.image !== null && (
                    <img
                      src={`http://localhost:8000/${vehicle.image}`}
                      alt="Vehicle"
                      className="car-image-detail"
                      style={{ width: "100%" }}
                    />
                  )}
                </div>
                <div className="row car-info">
                  <div className="card col-md-3">
                    <FontAwesomeIcon icon={faCalendar} />
                    <div>{vehicle.year}</div>
                  </div>
                  <div className="card col-md-3">
                    <FontAwesomeIcon icon={faTachometer} />
                    <div>{vehicle.mileage} km</div>
                  </div>
                  <div className="card col-md-3">
                    <FontAwesomeIcon icon={faGasPump} />
                    <div>{vehicle.engineType}</div>
                  </div>
                  <div className="card col-md-3">
                    <FontAwesomeIcon icon={faTransmission} />
                    <div>{vehicle.transmission}</div>
                  </div>
                </div>
                <div className="more-info">
                  <div className="row">
                    <div className="col-md-6">
                      <div>
                        <p>Registered In</p>
                        <p>{vehicle.registeredIn}</p>
                      </div>
                      <div>
                        <p>Assembly</p>
                        <p>{vehicle.assembly}</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div>
                        <p>Color</p>
                        <p>{vehicle.exteriorColor}</p>
                      </div>
                      <div>
                        <p>Engine Capacity</p>
                        <p>{vehicle.engineCapacity}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="features-section">
                  <h4>Car Features</h4>
                  {vehicle.features && vehicle.features.length > 0 ? (
                    <ul className="features-list">
                      {vehicle.features.map((feature, index) => (
                        <li className="feature" key={index}>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No features available</p>
                  )}
                </div>

                <div className="seller-comments-section">
                  <h4>Description</h4>
                  <ul className="description-list">
                    {vehicle.adDescription.split("\n").map((line, index) => (
                      <li key={index}>{line}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div className="card car-details-card">
                {vehicle && (
                  <>
                    <p>
                      Price: {new Intl.NumberFormat().format(vehicle.price)}
                    </p>
                    <div className="managed-by">
                      <h2>Buy Car with Trust</h2>
                      <img className="image-logo" alt="logo" src={Logo}></img>
                      <ul>
                        <li>
                          <FontAwesomeIcon icon={faCheck} />
                          Inspected By SellMyCar
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faCheck} />
                          Documents Checked
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faCheck} />
                          Secure Transaction
                        </li>
                      </ul>
                    </div>
                    <div className="card seller-phone">
                      <p>
                        <FontAwesomeIcon icon={faPhone} />{" "}
                        {vehicle.mobileNumber}
                      </p>
                      <span>Phone Number</span>
                    </div>
                  </>
                )}
              </div>
              <div className="card seller-details">
                <div className="card-header">Seller Details</div>
                <div className="card-body seller-body">
                  <div className="seller-info">
                    {vehicle.User.image === null ? (
                      <img
                        src={avatarSrc}
                        alt="Profile Avatar"
                        className="user-avatar"
                      />
                    ) : (
                      <img
                        className="vehicle-onwer-pic"
                        alt="user-pic"
                        src={`http://localhost:8000/${vehicle.User.image}`}
                      />
                    )}

                    <div>
                      <h2>Seller:</h2>
                      <p>{vehicle.User.username}</p>
                    </div>
                    <div>
                      <h2>City:</h2>
                      <p>{vehicle.city}</p>
                    </div>
                    <div>
                      <h2>Contact:</h2>
                      <p>{vehicle.mobileNumber}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card safety-tips">
                <h2>Safety tips for transaction</h2>
                <p>1. Use a safe location to meet seller</p>
                <p>2. Avoid cash transactions</p>
                <p>3. Beware of unrealistic offers</p>
              </div>
            </div>
          </div>
        )}
        <div className="similar-ads">
          <div className="row vehicles-section ">
            {similarVehicles.length === 0 ? null : (
              <>
                <h4>SIMILAR ADS</h4>
                {similarVehicles.map((vehicle) => (
                  <div key={vehicle.id} className="col-md-3 mx-4">
                    <VehicleModel vehicle={vehicle} />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VehicleDetails;
