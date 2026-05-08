const fs = require('fs');

const dataStr = fs.readFileSync('src/data/weeklyDetailsData.ts', 'utf8');
let objStr = dataStr.replace('export const weeklyDetailsData: Record<number, any> = ', '').replace(/;$/, '');
let data = JSON.parse(objStr);

data[16] = {
  week: 16,
  fruitSize: 'Avokado boyutunda',
  fruitEmoji: '🥑',
  fruitLength: 'Yaklaşık 11.6 cm, 100 gr',
  babyDev: '**16. Hafta Bebek Gelişimi:**\n\nBebeğiniz artık sizi duyabiliyor! İç kulaktaki o minik kemikler yerini aldı ve sesleri (kalp atışınız, sindirim sesleriniz ve hatta sizin sesiniz) algılamaya başladı.\n\nKafa derisinde ömür boyu sahip olacağı saç folikülü deseni oluşuyor. Kasları o kadar güçlendi ki sırtını dikleştirebiliyor ve başını daha dik tutabiliyor.',
  momBody: '**16. Hafta Annede Değişimler:**\n\nÜnlü "Hamilelik Işıltısı"na (Pregnancy Glow) merhaba deyin! Artan kan akışı yüzünüze sağlıklı, canlı bir pembelik ve parlaklık katıyor.\n\nRahminiz büyümeye devam ediyor ve ağırlık merkeziniz yavaş yavaş değişiyor. Eğer bu ilk hamileliğinizse, o meşhur "gaz balonu mu yoksa tekme mi?" çırpıntılarını yakında hissedeceksiniz!',
  ultrasoundText: 'Büyük gün! Eğer bebeğiniz bacak bacak üstüne atıp saklamıyorsa, bu hafta yapılacak bir ultrasonda cinsiyeti çok yüksek bir ihtimalle kesin olarak öğrenebilirsiniz!',
  images: {
    baby: '/images/babycenter/week-16.jpg',
    ultrasound: 'https://assets.babycenter.com/ims/2026/03/16-weeks-ultrasound.webp'
  }
};

data[17] = {
  week: 17,
  fruitSize: 'Nar boyutunda',
  fruitEmoji: '🍅',
  fruitLength: 'Yaklaşık 13.0 cm, 140 gr',
  babyDev: '**17. Hafta Bebek Gelişimi:**\n\nBebeğinizin iskelet sistemi o esnek ve yumuşak kıkırdak yapısından, sert ve sağlam kemiklere dönüşüyor. Kordon bağınız da daha kalın ve güçlü bir hale geldi.\n\nIsı regülasyonu için "kahverengi yağ" adı verilen özel bir yağ tabakası vücudunda depolanmaya başlıyor, bu onu doğduğunda sıcacık tutacak.',
  momBody: '**17. Hafta Annede Değişimler:**\n\nİştahınız fırlamış olabilir! Kendinizi sürekli bir şeyler atıştırmak isterken bulabilirsiniz. Bebeğinizin büyümesi için bu kaloriye ihtiyacınız var ama sağlıklı seçimler yapmaya özen gösterin.\n\nBüyüyen rahminiz siyatik sinirine baskı yaparsa kalçanızdan bacağınıza doğru inen keskin bir ağrı hissedebilirsiniz.',
  ultrasoundText: 'Bebeğinizin içeride kocaman esnediğini veya yutkunma pratikleri yaptığını görebilirsiniz. Kemiklerinin beyaz ve parlak bir şekilde ekranda belirmesi harika bir görüntüdür.',
  images: {
    baby: '/images/babycenter/week-17.jpg',
    ultrasound: 'https://assets.babycenter.com/ims/2026/03/17-weeks-ultrasound.webp'
  }
};

data[18] = {
  week: 18,
  fruitSize: 'Tatlı Patates boyutunda',
  fruitEmoji: '🍠',
  fruitLength: 'Yaklaşık 14.2 cm, 190 gr',
  babyDev: '**18. Hafta Bebek Gelişimi:**\n\nSinir sistemi için çok önemli bir adım: Sinirlerin üzeri "miyelin" adı verilen koruyucu bir kılıfla kaplanıyor, bu da beyin ile vücut arasındaki iletişimi hızlandırıyor.\n\nEğer bebeğiniz kızsa fallop tüpleri ve rahmi yerini aldı bile; erkekse üreme organları dışarıdan iyice belirginleşti.',
  momBody: '**18. Hafta Annede Değişimler:**\n\nİşte o sihirli an geldi! Artık bebeğinizin tekmelerini (popcorn patlaması veya kelebek kanadı çırpıntısı gibi) çok daha net hissetmeye başlayabilirsiniz!\n\nKarnınız büyüdükçe sırt ağrıları yaşamanız normaldir. Artık sırtüstü değil, kalbe giden kan akışını en iyi sağlayan "sol yanınıza" yatarak uyumaya alışmalısınız.',
  ultrasoundText: 'Bu haftalarda (18-22 arası) genellikle "Ayrıntılı (Detaylı) Ultrason" yapılır. Doktorunuz bebeğin kalbindeki 4 odacığı, böbreklerini, beyin yapısını ve tüm organlarını tek tek milimetrik olarak inceler.',
  images: {
    baby: '/images/babycenter/week-18.jpg',
    ultrasound: 'https://assets.babycenter.com/ims/2026/03/18-weeks-ultrasound.webp'
  }
};

const content = `export const weeklyDetailsData: Record<number, any> = ${JSON.stringify(data, null, 2)};`;
fs.writeFileSync('src/data/weeklyDetailsData.ts', content);
