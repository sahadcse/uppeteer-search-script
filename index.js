const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    await page.goto('https://www.duckduckgo.com');

    await page.waitForSelector('input[name="q"]', { timeout: 30000 });
    console.log('Search box is visible.');

    await page.type('input[name="q"]', 'automation');

    await page.keyboard.press('Enter');
    console.log('Search initiated.');

    await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
    console.log('Navigation completed.');

    await page.waitForSelector('a.result__a', { timeout: 30000 });
    console.log('Results are visible.');

    const results = await page.evaluate(() => {
      const anchors = Array.from(document.querySelectorAll('a.result__a'));
      return anchors.map(anchor => anchor.textContent);
    });

    console.log(results);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();
