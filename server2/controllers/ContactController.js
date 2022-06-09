const apicall = require("../utils/apiCall");

const server1Proxy = async (req, res) => {
  try {
    const data = await apicall(req);
    res.json(data.data);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

module.exports = {
  server1Proxy,
};
