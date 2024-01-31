import React, { useState } from "react";
import "./searchbar.css";
import {
  searchVehicle,
  resetSearchResults,
} from "../../redux/slice/VehicleSlice";
import { useDispatch } from "react-redux";
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      dispatch(searchVehicle(searchTerm));
    } else {
      dispatch(resetSearchResults());
    }
  };
  return (
    <div>
      <section className="search-classified-bg">
        <div className="search-classified-text text-center generic white">
          <h1>Find Used Cars in Pakistan</h1>
          <p>With thousands of cars, we have the right one for you</p>
        </div>
        <div className="search-bar">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Car Make or Model"
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="search-button">
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default SearchBar;
