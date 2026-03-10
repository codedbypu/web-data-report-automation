const { scrapeData } = require('./scraper');

(async () => {
    const url = 'https://www.sanook.com/news/';

    const data = await scrapeData(url);
    console.log(data);
})();