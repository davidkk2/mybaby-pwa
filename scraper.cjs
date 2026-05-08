const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');

async function scrapeWeek(week) {
  const url = `https://www.babycenter.com/pregnancy/week-by-week/${week}-weeks-pregnant`;
  console.log(`Fetching ${url}`);
  try {
    const res = await fetch(url);
    const html = await res.text();
    const $ = cheerio.load(html);
    
    const title = $('h1').text().trim();
    
    // Find images
    const images = [];
    $('img').each((i, el) => {
      const src = $(el).attr('src');
      if (src && (src.includes('fetaldev') || src.includes('ultrasound') || src.includes('belly') || src.includes('size'))) {
        images.push(src);
      }
    });

    console.log(`Week ${week}:`, title);
    console.log(`Images:`, images);
  } catch (err) {
    console.error(err);
  }
}

scrapeWeek(6);
