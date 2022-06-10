const apicall = require("../utils/apiCall");

const server1Proxy = async (req, res) => {
  try {
    const data = await apicall(req);
    // Send data from the response if the HTTP status code is 200 or 201.
    if (data.status === 200 || data.status === 201) {
      return res.status(data.status).json(data.data);
    }
    // Send error message if the response is with any other HTTP status code.
    return res.status(data.status || 404).json(data);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

module.exports = {
  server1Proxy,
};
