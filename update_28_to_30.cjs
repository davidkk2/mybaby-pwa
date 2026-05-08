const fs = require('fs');

const dataStr = fs.readFileSync('src/data/weeklyDetailsData.ts', 'utf8');
let objStr = dataStr.replace('export const weeklyDetailsData: Record<number, any> = ', '').replace(/;$/, '');
let data = JSON.parse(objStr);

data[28] = {
  week: 28,
  fruitSize: 'Büyük Bir Patlıcan boyutunda',
  fruitEmoji: '🍆',
  fruitLength: 'Yaklaşık 37.6 cm, 1000 gr',
  babyDev: '**28. Hafta Bebek Gelişimi:**\n\n**Üçüncü Trimestere (son 3 aya) hoş geldiniz!** Bebeğiniz büyük bir kilometre taşını devirdi ve tam 1 kilograma ulaştı!\n\nBeynindeki o düzgün yüzey, gelişen devasa zeka ağını sığdırabilmek için kıvrımlı ve oluklu (tıpkı bir ceviz gibi) bir yapıya dönüşüyor. Ayrıca beynindeki bu muazzam gelişim sayesinde rüya görmeye (REM uykusu) başlamış olabilir.',
  momBody: '**28. Hafta Annede Değişimler:**\n\nArtık son düzlükteyiz. Bu haftadan itibaren doktor randevularınız ayda birden, iki haftada bire düşebilir. Eğer kan grubunuz Rh negatifse, bu haftalarda kan uyuşmazlığı iğnesi olmanız gerekebilir.\n\nBüyüyen göbeğiniz ve değişen ağırlık merkeziniz nedeniyle bel, sırt ve siyatik ağrılarınız artabilir.',
  ultrasoundText: 'Bebeğinizin cilt altındaki yağ tabakası hızla kalınlaştığı için, ultrasonda o eski şeffaf ve kırışık görünüm tamamen kayboldu; yerine tombul ve pürüzsüz bir bebek geldi!',
  images: {
    baby: '/images/babycenter/week-28.jpg',
    ultrasound: 'https://assets.babycenter.com/ims/2026/03/28-weeks-ultrasound.webp'
  }
};

data[29] = {
  week: 29,
  fruitSize: 'Bal Kabağı boyutunda',
  fruitEmoji: '🎃',
  fruitLength: 'Yaklaşık 38.6 cm, 1150 gr',
  babyDev: '**29. Hafta Bebek Gelişimi:**\n\nBebeğinizin iskeleti giderek sertleşiyor ve kemikleri güçleniyor (her gün yaklaşık 250 mg kalsiyuma ihtiyacı var, yoğurt ve süt tüketimi çok önemli!).\n\nAncak kafatası kemikleri tamamen birleşmemiş ve yumuşak kalmıştır; bu esneklik, doğum kanalından kolayca geçebilmesi için doğanın mucizevi bir önlemidir.',
  momBody: '**29. Hafta Annede Değişimler:**\n\nRahminiz o kadar büyüdü ki, artık diyaframınıza, midenize ve bağırsaklarınıza ciddi bir baskı yapıyor. Bu baskı nefes darlığı, kabızlık ve şiddetli mide yanması (reflü) yapabilir.\n\nAz az ama sık sık yemek yemek ve bol su içmek bu son aylarda hayat kurtarıcınız olacak.',
  ultrasoundText: 'Bebeğinizin hareket alanı daralıyor. Ultrasonda eskisi gibi taklalar atamadığını, bunun yerine ayak parmaklarını emdiğini veya göbek kordonuyla oynadığını görebilirsiniz.',
  images: {
    baby: '/images/babycenter/week-29.jpg',
    ultrasound: 'https://assets.babycenter.com/ims/2026/03/29-weeks-ultrasound.webp'
  }
};

data[30] = {
  week: 30,
  fruitSize: 'Büyük Bir Lahana boyutunda',
  fruitEmoji: '🥬',
  fruitLength: 'Yaklaşık 39.9 cm, 1300 gr',
  babyDev: '**30. Hafta Bebek Gelişimi:**\n\nBebeğinizin etrafındaki amniyotik sıvı miktarı bu haftalarda en yüksek seviyesine ulaşır. Artık o kadar büyüdü ki, içerideki su havuzunda kapladığı alan suya oranla çok daha fazladır.\n\nEskiden kırmızı kan hücrelerini karaciğer üretiyordu, artık bu önemli görevi tamamen kemik iliği devraldı!',
  momBody: '**30. Hafta Annede Değişimler:**\n\nBüyüyen karnınız gece uykularınızı iyice zorlaştırabilir. Sola yatmak, bacaklarınızın arasına ve belinizin altına yastık destekleri koymak sizi rahatlatacaktır.\n\nAyrıca vücudunuz doğuma hazırlık yaptığı için, eklemlerinizdeki gevşeme yürümenizi biraz daha ağırlaştırabilir. Kendinizi yormayın.',
  ultrasoundText: 'Ultrasonda, bebeğinizin kafasındaki o ince tüylerin (lanugo) dökülmeye başladığını ve yerine kalın, gerçek saç tellerinin çıkmaya başladığını fark edebilirsiniz.',
  images: {
    baby: '/images/babycenter/week-30.jpg',
    ultrasound: 'https://assets.babycenter.com/ims/2026/03/30-weeks-ultrasound.webp'
  }
};

const content = `export const weeklyDetailsData: Record<number, any> = ${JSON.stringify(data, null, 2)};`;
fs.writeFileSync('src/data/weeklyDetailsData.ts', content);
