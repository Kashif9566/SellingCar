import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import HomePage from "./components/pages/user/homepage/HomePage";
import NewAd from "./components/pages/user/newAd/NewAd";
import NewAdForm from "./components/pages/user/newAd/NewAdForm";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setUser } from "./redux/slice/UserSlice";
import VehicleDetails from "./components/pages/user/vehicles/VehicleDetails";
import UserVehicleAd from "./components/pages/user/userVehicleAd/UserVehicleAd";

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      dispatch(setUser(userInfo));
    }
  }, [dispatch]);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post-an-ad" element={<NewAd />} />
        <Route path="/ad-form" element={<NewAdForm />} />
        <Route path="/car-details/:vehicleId" element={<VehicleDetails />} />
        <Route path="/my-ad" element={<UserVehicleAd />} />
      </Routes>
    </div>
  );
}

export default App;
