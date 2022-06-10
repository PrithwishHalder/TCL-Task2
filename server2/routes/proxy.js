const express = require("express");
const { server1Proxy } = require("../controllers/server1Controller");
const router = express.Router();

router.all("/*", server1Proxy);

module.exports = router;
