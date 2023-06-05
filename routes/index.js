const express = require("express");
const router = express.Router();

const habbitController = require("../controllers/habbitController");

// router.get("/", (req, res) => {
//   res.send("Hello World");
// });

router.get("/", habbitController.home);
router.get("/weekly-report", habbitController.detail);

router.post("/create-habbit", habbitController.create);

router.post("/update-date-status", habbitController.updateDateStatus);

module.exports = router;