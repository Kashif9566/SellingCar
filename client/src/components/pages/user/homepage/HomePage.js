import React, { useState, useEffect } from "react";
import Navbar from "../../../nav/Navbar";
import {
  fetchAllVehicles,
  selectAllVehicles,
  selectIsLoading,
  selectSearchVehicle,
  selectIsError,
} from "../../../../redux/slice/VehicleSlice";
import { useDispatch, useSelector } from "react-redux";
import Vehicles from "../vehicles/Vehicles";
import SearchBar from "../../../searchbar/SearchBar";
import Footer from "../../../footer/Footer";

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllVehicles());
  }, [dispatch, page, pageSize]);

  const allVehicles = useSelector(selectAllVehicles);
  const searchVehicle = useSelector(selectSearchVehicle);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const filteredVehicles = searchVehicle ? searchVehicle : allVehicles;
  const hasNextPage = filteredVehicles.length >= pageSize * page;

  return (
    <div className="home-page-container">
      <Navbar />
      <SearchBar />
      {isError ? (
        <div className="card p-5 m-4 text-center ">
          <h4>
            Sorry! We could not find any results against your search criteria
          </h4>
        </div>
      ) : (
        <Vehicles
          allVehicles={filteredVehicles}
          isLoading={isLoading}
          page={page}
          pageSize={pageSize}
          setPage={setPage}
          hasNextPage={hasNextPage}
        />
      )}
      <Footer />
    </div>
  );
};
export default HomePage;
