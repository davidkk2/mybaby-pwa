const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/babyNamesData.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Replace single quotes used as apostrophes inside words (e.g. Allah'ın -> Allah\'ın)
// We look for a letter, a single quote, and another letter.
content = content.replace(/([a-zA-ZçğıöşüÇĞİÖŞÜ])'([a-zA-ZçğıöşüÇĞİÖŞÜ])/g, "$1\\'$2");

// Also check for ' in specific common words if the above doesn't catch it
content = content.replace(/Mısır'a/g, "Mısır\\'a");
content = content.replace(/Kur'an/g, "Kur\\'an");
content = content.replace(/Kuran'da/g, "Kuran\\'da");
content = content.replace(/Kuran'ın/g, "Kuran\\'ın");

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed syntax errors in babyNamesData.ts');
