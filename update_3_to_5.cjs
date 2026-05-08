const fs = require('fs');

const dataStr = fs.readFileSync('src/data/weeklyDetailsData.ts', 'utf8');
let objStr = dataStr.replace('export const weeklyDetailsData: Record<number, any> = ', '').replace(/;$/, '');
let data = JSON.parse(objStr);

data[3] = {
  week: 3,
  fruitSize: 'Bir iğne ucu boyutunda',
  fruitEmoji: '✨',
  fruitLength: 'Gözle görülemeyecek kadar küçük, 0 gr',
  babyDev: '**3. Hafta Bebek Gelişimi:**\n\nBüyük buluşma gerçekleşti! Sperm yumurtayı dölledi ve "zigot" adını verdiğimiz minik bir yaşam topu oluştu.\n\nBu mucizevi hücre topu hızla bölünerek fallop tüplerinizden rahminize doğru birkaç günlük büyük bir yolculuğa çıkıyor.',
  momBody: '**3. Hafta Annede Değişimler:**\n\nBu haftada döllenen yumurta rahim duvarınıza yerleşmeye (implantasyon) başlar. Bu esnada bazı kadınlar çamaşırlarında çok hafif, pembe veya kahverengi bir lekelenme görebilir. Bu "yerleşme kanaması" tamamen normaldir.\n\nHenüz hamilelik hormonları çok yüksek olmadığı için tipik belirtileri hissetmemeniz normaldir.',
  ultrasoundText: 'Bu hafta henüz çok erken olduğu için ultrasonda bebeği veya gebelik kesesini görmek mümkün değildir.',
  images: {
    baby: '/images/babycenter/week-3.jpg',
    ultrasound: 'https://placehold.co/800x450/4a4453/ffffff?text=3.+Hafta+Ultrasonda+Henuz+Gorunmez'
  }
};

data[4] = {
  week: 4,
  fruitSize: 'Haşhaş tohumu boyutunda',
  fruitEmoji: '🌑',
  fruitLength: 'Yaklaşık 2 mm boyutunda',
  babyDev: '**4. Hafta Bebek Gelişimi:**\n\nBebeğiniz artık resmen rahminize yerleşti! Şu an "embriyo" olarak adlandırılıyor ve üç farklı hücre tabakasından (iç, orta, dış) oluşuyor.\n\nBu tabakalar ileride bebeğinizin organlarını (sinir sistemi, kalp, akciğerler, cilt) oluşturacak. Ayrıca bebeğinizi besleyecek olan plasenta ve göbek kordonu da hızla oluşmaya başlıyor.',
  momBody: '**4. Hafta Annede Değişimler:**\n\nAdetiniz geciktiyse, evde yapacağınız bir hamilelik testinin çift çizgi verme ihtimali çok yüksek! hCG (hamilelik hormonu) seviyeleriniz hızla artıyor.\n\nBu hormon artışı nedeniyle göğüslerinizde hassasiyet, dolgunluk ve hafif yorgunluk hissetmeye başlayabilirsiniz.',
  ultrasoundText: 'Bu hafta, çok şanslıysanız vajinal ultrasonda sadece minik bir nokta şeklinde "gebelik kesesi" görünebilir, ancak bebeğin kendisi henüz görünmez.',
  images: {
    baby: '/images/babycenter/week-4.jpg',
    ultrasound: 'https://placehold.co/800x450/4a4453/ffffff?text=4.+Hafta+Gebelik+Kesesi+Belirebilir'
  }
};

data[5] = {
  week: 5,
  fruitSize: 'Elma çekirdeği boyutunda',
  fruitEmoji: '🍎',
  fruitLength: 'Yaklaşık 3 mm boyutunda',
  babyDev: '**5. Hafta Bebek Gelişimi:**\n\nİnanılmaz bir gelişme: Bebeğinizin minik kalbi atmaya başlıyor! Kalp hücreleri bir araya geldi ve ilk ritmik kasılmalarını yapıyor.\n\nAyrıca nöral tüp (ileride beyin ve omurilik olacak yapı) şekilleniyor. Bu yüzden folik asit kullanımınız şu an çok ama çok önemli.',
  momBody: '**5. Hafta Annede Değişimler:**\n\nHamilelik belirtileri artık "Ben buradayım!" demeye başlayabilir. Sık sık tuvalete gitme ihtiyacı, sabah bulantıları (gün boyu da sürebilir) ve aşırı bir uyku hali hissedebilirsiniz.\n\nKokulara karşı aniden gelişen bir hassasiyet (kahve, parfüm, yemek kokuları) sizi şaşırtabilir.',
  ultrasoundText: 'Bu haftada yapılan erken bir vajinal ultrasonda gebelik kesesi net bir şekilde görülür. Şanslıysanız, minik kalbin atışlarını (yanıp sönen minik bir piksel gibi) bile görebilirsiniz!',
  images: {
    baby: '/images/babycenter/week-5.jpg',
    ultrasound: 'https://assets.babycenter.com/ims/2026/03/5-weeks-ultrasound.webp'
  }
};

const content = `export const weeklyDetailsData: Record<number, any> = ${JSON.stringify(data, null, 2)};`;
fs.writeFileSync('src/data/weeklyDetailsData.ts', content);
