const path = require("path");
const findRemoveSync = require("find-remove");

const filePath = path.resolve(__dirname, `../data`);
const age = 5 * 24 * 60 * 60 * 1000;

const deleteOldFiles = () => {
  findRemoveSync(`${filePath}`, {
    age: { seconds: age },
  });
};

module.exports = deleteOldFiles;
