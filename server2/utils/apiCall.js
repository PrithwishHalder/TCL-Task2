const axios = require("axios").default;

const apicall = async (req) => {
  try {
    console.log(req);
    const { path, method } = req;
    let data = await axios({ method, url: `http://127.0.0.1:5000/api${path}`, data: req.body });
    return data;
  } catch (error) {
    return { message: error.message };
  }
};

module.exports = apicall;
