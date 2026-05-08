const fs = require('fs');

const dataStr = fs.readFileSync('src/data/weeklyDetailsData.ts', 'utf8');
let objStr = dataStr.replace('export const weeklyDetailsData: Record<number, any> = ', '').replace(/;$/, '');
let data = JSON.parse(objStr);

data[31] = {
  week: 31,
  fruitSize: 'Hindistan Cevizi boyutunda',
  fruitEmoji: '🥥',
  fruitLength: 'Yaklaşık 41.1 cm, 1500 gr',
  babyDev: '**31. Hafta Bebek Gelişimi:**\n\nBebeğiniz 1.5 kilogram barajını aştı! Beyni o kadar hızlı çalışıyor ve o kadar çok sinir bağı kuruyor ki, artık beş duyusu (görme, işitme, tat, koku, dokunma) tamamen çalışıyor.\n\nİlginç bir gerçek: Bebeğiniz şu an her gün birkaç bardak çişini amniyotik sıvıya yapıyor ve sonra bu sıvıyı yutuyor. Bu döngü, böbreklerinin mükemmel çalıştığını gösterir.',
  momBody: '**31. Hafta Annede Değişimler:**\n\nGöğüsleriniz doğuma hazırlanıyor. Bu haftalarda sütyeninizde "Kolostrum" adı verilen sarımsı, ilk sütün ufak sızıntılarını görebilirsiniz (görmezseniz de tamamen normaldir).\n\nRahminizin kasılarak doğuma antrenman yapması (Braxton Hicks kasılmaları) biraz daha sıklaşabilir ve karnınızın sipsivri bir taş gibi sertleştiğini hissedebilirsiniz.',
  ultrasoundText: 'Bebeğinizin içerideki alanı daraldığı için artık kollarını ve bacaklarını göğsüne doğru çekerek o klasik "cenin pozisyonunu" aldığını net bir şekilde görebilirsiniz.',
  images: {
    baby: '/images/babycenter/week-31.jpg',
    ultrasound: 'https://assets.babycenter.com/ims/2026/03/31-weeks-ultrasound.webp'
  }
};

data[32] = {
  week: 32,
  fruitSize: 'Kavun boyutunda',
  fruitEmoji: '🍈',
  fruitLength: 'Yaklaşık 42.4 cm, 1700 gr',
  babyDev: '**32. Hafta Bebek Gelişimi:**\n\nBüyük hazırlık başlıyor! Çoğu bebek bu haftalarda doğum kanalına doğru (baş aşağı) "Sefalik Pozisyon" alarak doğum gününü beklemeye koyulur.\n\nTırnakları parmak uçlarına kadar uzadı! Ayrıca cilt altı yağları artmaya devam ediyor, böylece o kırışık görünüm tamamen kaybolarak yerini pürüzsüz ve tombul bir cilde bırakıyor.',
  momBody: '**32. Hafta Annede Değişimler:**\n\nVücudunuzdaki kan hacmi hamilelik öncesine göre %50 oranında artarak zirve noktasına ulaştı! Bu artış, bebeğinizi beslemek ve doğuma hazırlık için hayati önem taşır.\n\nBebeğiniz büyüdükçe karnınıza sığamıyor; tekmelerini veya dirseklerini karnınızda belirgin çıkıntılar (dışarıdan bile görülebilen küçük tepecikler) şeklinde hissedebilirsiniz.',
  ultrasoundText: 'Bebeğinizin kafasında artık kalın ve gür saçlar görülebilir (tabii kel doğmayacaksa!). Ultrason cihazıyla bebeğinizin başının leğen kemiğinize doğru yöneldiğini görebilirsiniz.',
  images: {
    baby: '/images/babycenter/week-32.jpg',
    ultrasound: 'https://assets.babycenter.com/ims/2026/03/32-weeks-ultrasound.webp'
  }
};

data[33] = {
  week: 33,
  fruitSize: 'Ananas boyutunda',
  fruitEmoji: '🍍',
  fruitLength: 'Yaklaşık 43.7 cm, 1900 gr',
  babyDev: '**33. Hafta Bebek Gelişimi:**\n\nBağışıklık sistemi için mucizevi bir transfer haftası! Vücudunuzdaki değerli antikorlar plasenta yoluyla hızla bebeğinize geçiyor ve onu doğduktan sonraki hastalıklara karşı zırh gibi korumaya hazırlıyor.\n\nBebeğinizin kafatası hariç (doğum kanalından geçebilmesi için yumuşak kalmalı) tüm kemikleri tamamen sertleşti ve güçlendi.',
  momBody: '**33. Hafta Annede Değişimler:**\n\nBüyüyen bebek mesanenize (idrar torbanıza) adeta trambolin muamelesi yaptığı için, geceleri uykunuzdan kalkıp tuvalete gitme sayınız rekor kırabilir.\n\nHormonlar tüm eklemlerinizi iyice gevşettiği için, yürürken biraz daha sakar hissedebilirsiniz veya ayak bilekleriniz daha kolay burkulabilir. Adımlarınızı dikkatli atın.',
  ultrasoundText: 'Bebeğiniz uyanık olduğu anlarda gözlerini fal taşı gibi açıp etrafa bakıyor olabilir. Ayrıca günde yarım litreye yakın amniyotik sıvıyı yutarak sindirim sistemini çalıştırdığını görebilirsiniz.',
  images: {
    baby: '/images/babycenter/week-33.jpg',
    ultrasound: 'https://assets.babycenter.com/ims/2026/03/33-weeks-ultrasound.webp'
  }
};

const content = `export const weeklyDetailsData: Record<number, any> = ${JSON.stringify(data, null, 2)};`;
fs.writeFileSync('src/data/weeklyDetailsData.ts', content);
