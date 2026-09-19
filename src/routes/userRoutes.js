const express = require("express");
const userController = require("../controllers/userController");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router()

router.get("/", asyncHandler(userController.get))
router.get("/:id", asyncHandler(userController.show))
router.post("/", asyncHandler(userController.add))
router.patch("/:id", asyncHandler(userController.edit))
router.delete("/:id", asyncHandler(userController.remove))


module.exports = router