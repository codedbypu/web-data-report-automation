const puppeteer = require('puppeteer');

async function cap(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle2' });

    const path = `output/screenshots/${Date.now()}.png`;
    await page.screenshot({ path, fullPage: true });

    await browser.close();
    return path;
}

module.exports = { cap }