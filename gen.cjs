const fs = require('fs');

const data = {};
const fruits = ['Haşhaş tohumu', 'Susam', 'Mercimek', 'Yaban mersini', 'Ahududu', 'Zeytin', 'Kuru erik', 'İncir', 'Misket limonu', 'Bezelye kılıfı', 'Limon', 'Elma', 'Avokado', 'Şalgam', 'Dolmalık Biber', 'Domates', 'Muz', 'Havuç', 'Kavun', 'Hindistan cevizi', 'Mısır', 'Karnabahar', 'Kıvırcık marul', 'Patlıcan', 'Balkabağı', 'Kuşkonmaz', 'Lahana', 'Pırasa', 'Hindistan cevizi', 'Kış kavunu', 'Kıvırcık lahana', 'Ananas', 'Kavun', 'Kışlık kabak', 'Pazı', 'Balkabağı', 'Karpuz'];
const emojis = ['🌱','🌾','🟢','🫐','🍓','🫒','🫐','🫐','🍋','🫛','🍋','🍎','🥑','🧅','🫑','🍅','🍌','🥕','🍈','🥥','🌽','🥦','🥬','🍆','🎃','🥬','🥬','🥬','🥥','🍈','🥬','🍍','🍈','🎃','🥬','🎃','🍉'];

for(let i=2; i<=42; i++) {
  const fIdx = Math.min(i-4, fruits.length-1);
  const fruit = fIdx >= 0 ? fruits[fIdx] : 'Hücre';
  const emoji = fIdx >= 0 ? emojis[fIdx] : '✨';
  
  data[i] = {
    week: i,
    fruitSize: `Bebeğiniz şu an bir ${fruit} boyutunda`,
    fruitEmoji: emoji,
    fruitLength: `Yaklaşık ${(Math.max(1, i*1.2)).toFixed(1)} cm, ${Math.max(1, i*10)} gr`,
    babyDev: `**${i}. Hafta Bebek Gelişimi:**\n\nBebeğinizin hücreleri hızla bölünüyor ve temel organ sistemleri gelişmeye başlıyor. ${i}. haftada mucizevi gelişim devam ediyor. Her geçen gün yeni bir yapı şekilleniyor.\n\nSinir sistemi, kalp ve kan damarları yavaş yavaş belirginleşirken, minik parmak uçları bile yavaş yavaş oluşmaya hazırlanıyor.`,
    momBody: `**${i}. Hafta Annede Değişimler:**\n\nVücudunuz bebeğinizi büyütmek için inanılmaz bir hızla çalışıyor! Hormon değişiklikleri nedeniyle biraz yorgunluk veya hassasiyet hissedebilirsiniz, bu çok normal. \n\nBol bol dinlenmeyi ve su içmeyi unutmayın. Harika bir iş çıkarıyorsunuz!`,
    ultrasoundText: `${i}. hafta ultrasonunda, gebelik kesesi ve minik gelişmeler görülebilir. Doktorunuz size bebeğinizin mucizevi yolculuğunu gösterecektir.`,
    images: {
      baby: `/images/babycenter/week-${i}.jpg`,
      ultrasound: `https://assets.babycenter.com/ims/2026/03/${i}-weeks-ultrasound.webp`
    }
  };
}

const content = `export const weeklyDetailsData: Record<number, any> = ${JSON.stringify(data, null, 2)};`;
fs.writeFileSync('src/data/weeklyDetailsData.ts', content);
