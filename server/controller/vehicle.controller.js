const Vehicle = require("../model/vehicle.model");
const User = require("../model/user.model");
const { Op } = require("sequelize");
const cloudinary = require("../config/cloudinary.config");

exports.createAdForVehicle = async (req, res) => {
  const {
    make,
    model,
    year,
    exteriorColor,
    price,
    mileage,
    transmission,
    registeredIn,
    assembly,
    engineCapacity,
    features,
    city,
    province,
    adDescription,
    mobileNumber,
    secondaryNumber,
    engineType,
  } = req.body;

  const userId = req.params.userId;
  const image = req.file ? req.file.path : null;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!make || !model || !price) {
      console.error("Validation Error:", { make, model, price });
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }
    const featuresArray = features
      ? features.split(",").map((feature) => feature.trim())
      : null;

    let imageUrl = null;

    if (image) {
      try {
        const result = await uploadToCloudinary(image);
        imageUrl = result.secure_url;
      } catch (cloudinaryError) {
        console.error(cloudinaryError);
        return res.status(500).json({
          success: false,
          message: "Error uploading image to Cloudinary",
        });
      }
    }

    const newAd = await Vehicle.create({
      make,
      model,
      year,
      image: imageUrl,
      exteriorColor,
      price,
      mileage,
      transmission,
      registeredIn,
      assembly,
      engineCapacity,
      features: featuresArray,
      city,
      engineType,
      province,
      adDescription,
      mobileNumber,
      secondaryNumber,
      UserId: userId,
    });
    const vehicleWithDetails = await Vehicle.findByPk(newAd.id, {
      include: {
        model: User,
        attributes: {
          exclude: ["password"],
        },
      },
    });
    res.status(200).json(vehicleWithDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const uploadToCloudinary = (filePath) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(filePath, (err, result) => {
      if (err) {
        console.log(err);
        reject({
          success: false,
          message: "Error uploading image to Cloudinary",
        });
      } else {
        resolve(result);
      }
    });
  });
};

exports.getVehicles = async (req, res) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;
    const offset = (page - 1) * pageSize;

    const vehicles = await Vehicle.findAll({
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
      ],
      limit: pageSize,
      offset: offset,
    });

    res.status(200).json(vehicles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getVehicleById = async (req, res) => {
  const vehicleId = req.params.vehicleId;
  console.log("vehilceid", vehicleId);
  try {
    const vehicle = await Vehicle.findByPk(vehicleId, {
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
      ],
    });
    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteVehicle = async (req, res) => {
  const vehicleId = req.params.vehicleId;
  try {
    const deletedVehicle = await Vehicle.destroy({
      where: { id: vehicleId },
    });
    if (deletedVehicle) {
      res.status(200).json({ message: "Vehicle deleted successfully" });
    } else {
      res.status(404).json({ message: "Vehicle not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getVehicleForUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const vehicles = await Vehicle.findAll({
      where: {
        UserId: userId,
      },
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
      ],
    });
    res.status(200).json(vehicles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.searchVehicle = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: "Query parameter is missing" });
    }

    const vehicles = await Vehicle.findAll({
      where: {
        [Op.or]: [
          {
            city: {
              [Op.iLike]: `%${query}%`,
            },
          },
          {
            make: {
              [Op.iLike]: `%${query}%`,
            },
          },
          {
            model: {
              [Op.iLike]: `%${query}%`,
            },
          },
          {
            transmission: {
              [Op.iLike]: `%${query}%`,
            },
          },
        ],
      },
    });
    if (vehicles.length === 0) {
      return res.status(404).json({ message: "No matching vehicles found" });
    }

    res.status(200).json(vehicles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getSimilarVehicles = async (req, res) => {
  try {
    const { vehicleId } = req.params;

    const referenceVehicle = await Vehicle.findByPk(vehicleId);
    if (!referenceVehicle) {
      return res.status(404).json({ error: "Reference Vehicle not found" });
    }

    const similarVehicles = await Vehicle.findAll({
      where: {
        model: referenceVehicle.model,
        id: { [Op.ne]: referenceVehicle.id },
      },
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
      ],
      limit: 4,
    });

    res.status(200).json(similarVehicles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
