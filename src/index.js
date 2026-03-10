const { scrapeData } = require('./scraper');
const { buildFinalHTML } = require('./manageHTML');
const { exportPDF } = require('./pdfGenerator');
const { cap } = require('./screenshot');

(async () => {
    const url = 'https://www.missivemedia.com/blog/benefits-of-using-html5.html';

    const data = await scrapeData(url);
    console.log('Data: ' , data);
    const html = buildFinalHTML(data);
    const pdf = await exportPDF(html);

    const image = await cap(url);
    console.log('Data: ' , data);
    console.log('Screenshot path:' , image);
    console.log('PDF path:' , pdf);
})();