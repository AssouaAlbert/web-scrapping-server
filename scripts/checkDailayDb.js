const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const getGamesList = require("./getGamesList");
const insertToDB = require("./db/insertData");

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
        try {
          const data = Object.values(require(filePath));
          await insertToDB(data);
        } catch (error) {
          const gamesList = await getGamesList();
          await fs.writeFile(
            filePath,
            `${JSON.stringify(gamesList)}`,
            (err) => {
              if (err) {
                console.error(err);
              }
            }
          );
          const data = Object.values(gamesList);
          await insertToDB(data);
        }
      } else {
      }
    }
  } catch (error) {
    console.log(
      "🚀 ~ file: checkDailayDb.js:22 ~ checkDailayDb ~ error:",
      error
    );
    setTimeout(checkDailayDb, timeout);
  }
};

module.exports = checkDailayDb;
