const puppeteer = require("puppeteer");

const getGamesList = async () => {
  const browser = await puppeteer.launch({ headless: false, dumpio: false });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1200,
    height: 800,
  });
  await page.goto("https://www.livescore.com/en/");
  await page
    .waitForSelector('[data-test-id="virtuoso-item-list"]')
    .then(async () => {
      gamesList = await scrollPageGetLinks(page);
    });
};
