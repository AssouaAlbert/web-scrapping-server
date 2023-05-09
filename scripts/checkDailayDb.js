const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const getGamesList = require("./getGamesList");

const date = require("./getDate");
const fileName = `_${date}`;
const filePath = path.resolve(__dirname, `../data/${fileName}.json`);

const checkDailayDb = async () => {
  try {
    const db = mongoose.connection.db;
    const collectExist = await db
      .listCollections({ name: fileName })
      .next((err, collectionInfo) => {
        if (err) {
          throw new Error(err);
        } else if (collectionInfo) {
          return collectionInfo;
        } else {
          throw new Error("There Collection does not exist");
        }
      });
    if (!collectExist) {
      if (fs.existsSync(filePath)) {
        console.log(`${filePath} exists`);
      } else {
        //   const gamesList = await getGamesList();
      }
      const data = await fs.writeFile(
        filePath,
        `${JSON.stringify(gamesList)}`,
        (err) => {
          if (err) {
            console.error(err);
          }
        }
      );
      console.log(
        "🚀 ~ file: checkDailayDb.js:36 ~ checkDailayDb ~ data:",
        data
      );
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
