import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const fetchAllVehicles = createAsyncThunk(
  "fetchAllVehicles",
  async () => {
    const response = await api.get("/allvehicles");
    return response.data;
  }
);

export const searchVehicle = createAsyncThunk(
  "searchVehicle",
  async (searchTerm) => {
    const response = await api.get(`/search?query=${searchTerm}`);
    return response.data;
  }
);

export const resetSearchResults = createAsyncThunk(
  "resetSearchResults",
  () => null
);

const initialState = {
  vehicles: [],
  searchVehicles: null,
  isloading: false,
  isError: false,
};

const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllVehicles.pending, (state) => {
        state.isloading = true;
      })
      .addCase(fetchAllVehicles.fulfilled, (state, action) => {
        state.isloading = false;
        state.vehicles = action.payload;
      })
      .addCase(fetchAllVehicles.rejected, (state) => {
        state.isError = true;
      })
      .addCase(searchVehicle.pending, (state) => {
        state.isloading = true;
      })
      .addCase(searchVehicle.fulfilled, (state, action) => {
        state.isloading = false;
        state.searchVehicles = action.payload;
      })
      .addCase(searchVehicle.rejected, (state, action) => {
        state.isError = true;
      })
      .addCase(resetSearchResults.fulfilled, (state) => {
        state.isloading = false;
        state.searchVehicles = null;
      });
  },
});

export const selectAllVehicles = (state) => state.vehicle.vehicles;
export const selectSingleVehicle = (state) => state.vehicle.singleVehicle;
export const selectSearchVehicle = (state) => state.vehicle.searchVehicles;
export const selectIsLoading = (state) => state.vehicle.isloading;
export const selectIsError = (state) => state.vehicle.isError;
export default vehicleSlice.reducer;
