const User = require("./user.model");
const Vehicle = require("./vehicle.model");

User.hasMany(Vehicle);
Vehicle.belongsTo(User);
