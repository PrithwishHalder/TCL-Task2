const express = require("express");
const dotenv = require("dotenv");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// LOGGING HTTP REQUEST
const morgan = require("morgan");
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));

// ENV PORT INITIALIZATION
dotenv.config({ path: ".env" });
const PORT = process.env.PORT || 8080;

app.use("/proxyapi", require("./routes/proxyContact"));

app.listen(PORT, () => {
  console.log(`Server running at PORT ${PORT}...`);
});
