const express = require("express");
const cors = require("cors");
const app = express();
const sequelize = require("./config/db.config");
const dotenv = require("dotenv");
const userRoutes = require("./route/user.route");
const vehicleRoutes = require("./route/vehicle.route");

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/uploads", express.static("uploads"));
app.use("/", userRoutes);
app.use("/", vehicleRoutes);

dotenv.config();

require("./model/association");
sequelize.sync();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
