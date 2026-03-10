const puppeteer = require("puppeteer");
const fs = require("fs");

async function exportPDF(html) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const path = `output/reports/${Date.now()}.pdf`

  await page.setContent(html, { waitUntil: "networkidle0" });

  await page.pdf({
    path: path,
    format: "A4",
    printBackground: true,
    margin: {
      top: "20mm",
      right: "15mm",
      bottom: "20mm",
      left: "15mm"
    }
  });

  await browser.close();
  return path;
}

module.exports = { exportPDF };