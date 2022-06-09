const express = require("express");
const { server1Proxy } = require("../controllers/ContactController");
const router = express.Router();

router.all("/*/:id?", server1Proxy);

module.exports = router;
