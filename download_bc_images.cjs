const fs = require('fs');
const https = require('https');
const path = require('path');

const targetDir = path.join(__dirname, 'public', 'images', 'babycenter');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

async function downloadWeekImages() {
  for (let week = 1; week <= 42; week++) {
    try {
      const url = `https://www.babycenter.com/pregnancy/week-by-week/${week}-week${week===1?'':'s'}-pregnant`;
      console.log(`Fetching week ${week}...`);
      const res = await fetch(url);
      if (!res.ok) continue;
      const html = await res.text();
      
      const match = html.match(/property="og:image" content="([^"]+)"/);
      if (match && match[1]) {
        let imgUrl = match[1];
        console.log(`Week ${week}: ${imgUrl}`);
        
        // Download the image
        await new Promise((resolve) => {
          https.get(imgUrl, (res) => {
            const ext = imgUrl.split('.').pop().split('?')[0];
            const fileStream = fs.createWriteStream(path.join(targetDir, `week-${week}.${ext}`));
            res.pipe(fileStream);
            fileStream.on('finish', () => {
              fileStream.close();
              resolve();
            });
          });
        });
      }
    } catch (e) {
      console.error(`Error for week ${week}:`, e.message);
    }
  }
  console.log("Done!");
}

downloadWeekImages();
