const fs = require('fs');

async function scrape() {
  const dataStr = fs.readFileSync('src/data/weeklyDetailsData.ts', 'utf8');
  let objStr = dataStr.replace('export const weeklyDetailsData: Record<number, any> = ', '').replace(/;$/, '');
  let data = JSON.parse(objStr);

  for (let i = 1; i <= 42; i++) {
    const url = `https://www.babycenter.com/pregnancy/week-by-week/${i}-weeks-pregnant`;
    try {
      const res = await fetch(url);
      const text = await res.text();
      
      // Look for the ultrasound image in the HTML.
      // Usually it's in a picture tag or img tag with alt text containing 'ultrasound'
      // Example: <img alt="6 weeks ultrasound" src="https://assets.babycenter.com/ims/2015/01/ultrasound-6-weeks_4x3.jpg" ...
      
      const regex = /src="([^"]*ultrasound[^"]*\.(?:jpg|png|webp))"/i;
      const match = text.match(regex);
      
      if (match && match[1]) {
        console.log(`Week ${i}: Found ultrasound ${match[1]}`);
        data[i].images.ultrasound = match[1];
      } else {
        // Let's try another regex just in case they don't have "ultrasound" in the URL
        // Sometimes they have alt="X weeks ultrasound"
        const altRegex = /alt="[^"]*ultrasound[^"]*"[^>]*src="([^"]*\.(?:jpg|png|webp))"/i;
        const altMatch = text.match(altRegex);
        if (altMatch && altMatch[1]) {
           console.log(`Week ${i}: Found ultrasound (via alt) ${altMatch[1]}`);
           data[i].images.ultrasound = altMatch[1];
        } else {
           console.log(`Week ${i}: No ultrasound found`);
           data[i].images.ultrasound = null;
        }
      }
      
      // Introduce a small delay
      await new Promise(r => setTimeout(r, 500));
    } catch (err) {
      console.log(`Week ${i}: Error fetching - ${err.message}`);
    }
  }

  const content = `export const weeklyDetailsData: Record<number, any> = ${JSON.stringify(data, null, 2)};`;
  fs.writeFileSync('src/data/weeklyDetailsData.ts', content);
  console.log('Done!');
}

scrape();
