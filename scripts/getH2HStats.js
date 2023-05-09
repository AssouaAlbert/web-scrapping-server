const getTeamDiff = require("./getTeamDiff");
const getH2HStats = async (page, gamesList) => {
  const gamesListArray = Object.entries(gamesList);
  for (let i = 0; i < gamesListArray.length; i++) {
    const [key, value] = gamesListArray[i];
    // if (value.league) {
    await page.goto(`${value.link}/h2h`, {
      waitUntil: "domcontentloaded",
    });
    let results = await page.evaluate(
      async ([key, gamesList]) => {
        return await new Promise((res, rej) => {
          let h2h = [];
          const h2hGames = document?.querySelectorAll("[id^=h2h__match]");
          for (i = 0; i < h2hGames.length; i++) {
            let homeTeam = h2hGames[i]?.querySelector(
              "div:nth-child(1) > span:nth-child(2)"
            )?.textContent;
            let awayTeam = h2hGames[i]?.querySelector(
              "div:nth-child(2) > span:nth-child(2)"
            )?.textContent;
            let awayScore = h2hGames[i]?.querySelector(
              " div.pn > div > div:nth-child(2)"
            )?.textContent;
            let homeScore = h2hGames[i]?.querySelector(
              " div.pn > div > div:nth-child(1)"
            )?.textContent;
            h2h = [
              ...h2h,
              {
                home: { homeTeam, homeScore },
                away: { awayTeam, awayScore },
              },
            ];
          }

          res(
            (gamesList[key] = {
              ...gamesList[key],
              h2h,
            })
          );
        });
      },
      [key, gamesList]
    );
    gamesList[key] = await results;
    await page.click("#home__tab");
    results = await page.evaluate(
      async ([key, gamesList]) => {
        return await new Promise((res, rej) => {
          const matches = document?.querySelectorAll("#h2h__match-result");
          lastGames = [];
          for (let i = 0; i < matches.length; i++) {
            const result = matches[i].textContent;
            lastGames = [...lastGames, result];
          }
          res(
            (gamesList[key] = {
              ...gamesList[key],
              home: { ...gamesList[key].home, lastGames },
            })
          );
        });
      },
      [key, gamesList]
    );
    gamesList[key] = await results;
    await page.click("#away__tab");
    results = await page.evaluate(
      async ([key, gamesList]) => {
        return await new Promise((res, rej) => {
          const matches = document?.querySelectorAll("#h2h__match-result");
          lastGames = [];
          for (let i = 0; i < matches.length; i++) {
            const result = matches[i].textContent;
            lastGames = [...lastGames, result];
          }
          res(
            (gamesList[key] = {
              ...gamesList[key],
              away: { ...gamesList[key].away, lastGames },
            })
          );
        });
      },
      [key, gamesList]
    );
    gamesList[key] = await results;
    // }
  }

  return gamesList = await getTeamDiff(gamesList);
};
module.exports = getH2HStats;
