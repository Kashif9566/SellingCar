const sequelize = require("../config/db.config");
const { DataTypes } = require("sequelize");

const Vehicle = sequelize.define(
  "Vehicle",
  {
    make: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    exteriorColor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    mileage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    transmission: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    registeredIn: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    assembly: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    engineType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    engineCapacity: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    features: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    adDescription: {
      type: DataTypes.TEXT,
      validate: {
        len: [0, 5000],
      },
    },
    mobileNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    secondaryNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Vehicle;
