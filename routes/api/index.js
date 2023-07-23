const express = require('express');
const router = express.Router();
const habbitController = require("../../controllers/api/habbitController");

router.get("/get-habbits", habbitController.index);

router.post("/create-habbit", habbitController.create);

router.post("/update-habbit-status", habbitController.updateDateStatus);
   
module.exports = router;