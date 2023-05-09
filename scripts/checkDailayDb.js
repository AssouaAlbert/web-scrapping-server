const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const date = require("./getDate");
const fileName = `_${date}`;
const filePath = path.resolve(__dirname, `./data/_${date}.json`);

const checkDailayDb = async () => {
  try {
    const db = mongoose.connection.db;
    const collectExist = await db
      .listCollections({ name: fileName })
      .next((err, collectionInfo) => {
        if (err) {
          throw new Error(err);
        } else if (collectionInfo) {
            return collectionInfo
        } else {
          throw new Error("There Collection does not exist");
        }
      });
    if(!collectExist){

    }
  } catch (error) {
    console.log(
      "🚀 ~ file: checkDailayDb.js:22 ~ checkDailayDb ~ error:",
      error
    );

    // setTimeout(checkDailayDb, timeout);
  }
};

module.exports = checkDailayDb;
