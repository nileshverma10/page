const express = require("express");
const router = express.Router();
const data = require("../controller/main");

router.post("/addData", data.addData);
router.get("/getData", data.getData);
router.delete("/deleteData/:id", data.deleteData);
router.patch("/patchData/:id", data.patchData);
router.post("/login", data.login);

module.exports = router;
