const puppeteer = require('puppeteer');

async function scrapeData(url) {
    const brower = await puppeteer.launch();
    const page = await brower.newPage();

    await page.goto(url, { waitUntil: 'networkidle2' }); //เข้าเว็บ แและรอเว็บโหลดเสร็จ ไม่มี request วิ่งเกิน 2 อัน

    const data = await page.evaluate(() => {
        const container = document.querySelector('main') || document.body;
        const readableTags = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SPAN', 'LI'];
        const allElements = container.querySelectorAll('*');

        let allContent = [];
        allElements.forEach(el => {
            const tag = el.tagName;
            if (!readableTags.includes(tag)) return;

            const text = el.innerHTML?.trim();
            if (tag.startsWith('H')) {
                allContent.push({
                    type: 'header',
                    text
                });
            }
            else if (tag === 'P' || tag === 'SPAN') {
                allContent.push({
                    type: 'paragraph',
                    text
                });
            }
            else if (tag === 'LI'){
                allContent.push({
                    type: 'List',
                    text
                });
            }
        });

        const result = {
            title: document.title,
            content: allContent
        }
        return result
    });
    await brower.close();
    return data;
}

module.exports = { scrapeData };