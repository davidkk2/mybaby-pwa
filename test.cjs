const fetch = require('node-fetch');
const cheerio = require('cheerio');
async function test() {
  const res = await fetch('https://www.babycenter.com/pregnancy/week-by-week/12-weeks-pregnant');
  const $ = cheerio.load(await res.text());
  const images = [];
  $('img').each((i, el) => {
    const src = $(el).attr('src');
    if (src && src.includes('belly')) images.push(src);
  });
  console.log('Week 12 belly:', images);
}
test();
