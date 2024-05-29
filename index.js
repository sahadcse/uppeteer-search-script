const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://www.google.com");

  await page.type('input[name="q"]', "puppeteer");
  await page.click('input[name="btnK"]');

  await page.waitForSelector("h3");

  const result = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll("h3"));
    return anchors.map((anchor) => anchor.textContent);
  });

  console.log(result);

  await browser.close();
})();
