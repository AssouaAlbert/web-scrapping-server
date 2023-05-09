const puppeteer = require("puppeteer");

const scrollPageGetLinks = require("./scrollPageGetLinks.js");
const checkIfLeague = require("./checkIfLeague.js");

const getGamesList = async () => {
  const browser = await puppeteer.launch({ headless: false, dumpio: false });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1200,
    height: 800,
  });
  await page.goto("https://www.livescore.com/en/");
  let gamesList = await page
    .waitForSelector('[data-test-id="virtuoso-item-list"]')
    .then(async () => {
      return await scrollPageGetLinks(page);
    });
  await checkIfLeague(page, gamesList);
};

module.exports = getGamesList;
