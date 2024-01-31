import React, { useEffect, useState } from "react";
import Navbar from "../../../nav/Navbar";
import api from "../../../../api/api";
import { useSelector } from "react-redux";
import "./uservehicle.css";
import { Link } from "react-router-dom";
import Logo from "../../../nav/Logo.png";
import UserVehicleModel from "./UserVehicleModel";
import { fetchAllVehicles } from "../../../../redux/slice/VehicleSlice";

const UserVehicleAd = () => {
  const user = useSelector((state) => state.user);
  const [vehicles, setVehicles] = useState(null);

  const fetchUserVehicles = async () => {
    try {
      const response = await api.get(`user/${user.id}/vehicles`);
      if (response) {
        setVehicles(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserVehicles();
  }, [user.id]);

  const handleDelete = async (vehicleId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await api.delete(
        `/user/${user.id}/vehicle/${vehicleId}`,
        config
      );
      if (response) {
        fetchUserVehicles();
        fetchAllVehicles();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Navbar />
      {!vehicles ? (
        <div className="my-ad-notfound">
          <div className="card">
            <h3>No Ad posted yet, want to sell your car?</h3>
            <p>Click below Post an Ad to sell your car</p>
            <Link to={"/post-an-ad"} className="btn btn-warning">
              Post an Ad
            </Link>
            <p>Get Started with SellMyCar.com!</p>
            <div className="myad-logo">
              <a href="/">
                <img src={Logo} alt="Logo" />
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="user-ad-conatiner">
          {vehicles.length === 1 ? <h2>Your Ad</h2> : <h2>Your Ads</h2>}
          <div>
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="my-ad-vehicles">
                <UserVehicleModel
                  vehicle={vehicle}
                  handleDelete={handleDelete}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserVehicleAd;
