const cheerio = require('cheerio');

const got = (...args) => import('got').then(({default: got}) => got(...args)); 

const extractLinks = async (url) => {
  try {
    const response = await got(url);
    const html = response.body;

    const $ = cheerio.load(html);

    const linkObjects = $('a');

    const links = [];
    linkObjects.each((index, element) => {
      links.push({
        text: $(element).text(), 
        href: $(element).attr('href'),
      });
    });

    console.log(links);

  } catch (error) {
    console.log(error.response.body);
  }
};

const URL = 'http://books.toscrape.com/';
extractLinks(URL);