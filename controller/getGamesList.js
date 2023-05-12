const DailyStats = require("../models/dailyStats");
console.log("🚀 ~ file: getGamesList.js:2 ~ DailyStats:", DailyStats);
const getGamesList = async (req, res) => {
  try {
    const gamesList = await DailyStats.find();
    res.status(200).json(gamesList);
  } catch (error) {
    message = { subject: "file: getGamesList.js:12", message: error.message };
    mail(message);
    res.status(404).json({ message: error.message });
  }
};

module.exports = getGamesList;
