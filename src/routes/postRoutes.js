const express = require("express");
const postController = require("../controllers/postController");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router()

router.get("/", asyncHandler(postController.get))
router.get("/:id", asyncHandler(postController.show))
router.post("/", asyncHandler(postController.add))
router.patch("/:id", asyncHandler(postController.edit))
router.delete("/:id", asyncHandler(postController.remove))


module.exports = router