/*DEPENDENCIES IMPORT*/
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

/* SCRIPTS */
const checkDailayDb = require("./scripts/checkDailayDb");

/**CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;

/* CONNNECT TO DATABASE */
mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    /* START SERVER*/
    app.listen(PORT, () => console.log("Server is running on port %d", PORT));
    checkDailayDb();
  })
  .catch((error) => {
    console.log(error.message);
  });
