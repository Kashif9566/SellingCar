const express = require("express");
const router = express.Router();
const vehicle = require("../controller/vehicle.controller");
const upload = require("../middleware/multerMiddleware");
const { protect } = require("../middleware/authMiddleware");
router.post(
  "/user/:userId/newAd",
  protect,
  upload.single("image"),
  vehicle.createAdForVehicle
);
router.get("/allvehicles", vehicle.getVehicles);
router.get("/vehicle/:vehicleId", vehicle.getVehicleById);
router.get("/user/:userId/vehicles", vehicle.getVehicleForUser);
router.get("/search", vehicle.searchVehicle);
router.get("/similar-vehicles/:vehicleId", vehicle.getSimilarVehicles);
router.delete(
  "/user/:userId/vehicle/:vehicleId",
  protect,
  vehicle.deleteVehicle
);

module.exports = router;
