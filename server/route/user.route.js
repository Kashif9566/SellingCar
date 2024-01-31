const express = require("express");
const router = express.Router();
const user = require("../controller/user.controller");
const upload = require("../middleware/multerMiddleware");

router.post("/user/register", upload.single("image"), user.createUser);
router.post("/user/login", user.login);
router.put("/user/:userId/changePassword", user.changePassword);
router.put(
  "/user/:userId/editProfile",
  upload.single("image"),
  user.updateUser
);
router.get("/user/:userId", user.getUserById);

module.exports = router;
