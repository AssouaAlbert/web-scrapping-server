const getGamesData = require("./getGamesData");

const checkIfLeague = async (page, gamesList) => {
  const gamesListArray = Object.entries(gamesList);
  for (let i = 0; i < gamesListArray.length; i++) {
    const [key, value] = gamesListArray[i];
    await page.goto(`${value.link}`, {
      waitUntil: "domcontentloaded",
    });
    let results = await page.evaluate(
      async ([key, gamesList]) => {
        return await new Promise((res, rej) => {
          const table = document.getElementById("table");
          if (table) {
            res((gamesList[key] = { ...gamesList[key], league: true }));
          } else {
            res((gamesList[key] = { ...gamesList[key], league: false }));
          }
        });
      },
      [key, gamesList]
    );
    gamesList[key] = results;
  }
  return gamesList = await getGamesData(page, gamesList);
};

module.exports = checkIfLeague;
