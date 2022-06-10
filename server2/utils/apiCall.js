const axios = require("axios").default;

const apicall = async (req) => {
  try {
    const { url, method } = req;
    const URL = process.env.SERVER1_URL;
    let data = await axios({ method, url: `${URL}${url}`, data: req.body });
    return data;
  } catch (error) {
    return { message: error.response.data.message };
  }
};

module.exports = apicall;
