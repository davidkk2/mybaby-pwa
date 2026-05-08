const fs = require('fs');

const dataStr = fs.readFileSync('src/data/weeklyDetailsData.ts', 'utf8');
let objStr = dataStr.replace('export const weeklyDetailsData: Record<number, any> = ', '').replace(/;$/, '');
let data = JSON.parse(objStr);

data[12] = {
  week: 12,
  fruitSize: 'Erik boyutunda',
  fruitEmoji: '🍑',
  fruitLength: 'Yaklaşık 54 mm, 14 gr',
  babyDev: '**12. Hafta Bebek Gelişimi:**\n\nBebeğinizin refleksleri muazzam bir hızla gelişiyor! Artık parmaklarını açıp kapatabiliyor, ayak parmaklarını kıvırabiliyor ve göz kaslarını sıkabiliyor.\n\nEğer karnınıza hafifçe dokunursanız, o da içeriden kıvrılarak tepki verir (bunu henüz hissedemeseniz de). Ayrıca bağırsakları, büyüdükçe göbek kordonundan karın boşluğuna doğru taşınarak kalıcı yerlerine yerleşiyor.',
  momBody: '**12. Hafta Annede Değişimler:**\n\nBüyük bir kutlamayı hak ediyorsunuz: **İlk trimesterin (ilk 3 ay) sonuna geldiniz!** Bu hafta itibarıyla düşük riski çok büyük oranda azalıyor.\n\nRahminiz leğen kemiğinden (pelvis) yukarı doğru çıkmaya başlıyor, bu da mesanenizdeki baskıyı azaltarak tuvalet molalarınızı biraz da olsa seyrekleştirebilir.',
  ultrasoundText: 'Bu hafta ultrasonda bebeğinizin baş parmağını emdiğini, yutkunduğunu veya minik hıçkırıklar yaşadığını net bir şekilde görebilirsiniz.',
  images: {
    baby: '/images/babycenter/week-12.jpg',
    ultrasound: 'https://assets.babycenter.com/ims/2026/03/12-weeks-ultrasound.webp'
  }
};

data[13] = {
  week: 13,
  fruitSize: 'Limon boyutunda',
  fruitEmoji: '🍋',
  fruitLength: 'Yaklaşık 74 mm, 23 gr',
  babyDev: '**13. Hafta Bebek Gelişimi:**\n\nBebeğiniz artık kendine has o minik parmak izlerine sahip! Evet, şu an o minik ellerinde ömrü boyunca taşıyacağı benzersiz izler oluştu.\n\nSes telleri de hızla gelişiyor. Önceden kafası vücudunun yarısı kadardı, şimdi ise vücudu hızla büyüyerek orantılı bir insan görünümüne daha çok yaklaşıyor.',
  momBody: '**13. Hafta Annede Değişimler:**\n\nHamileliğin "Balayı Dönemi" olarak bilinen **İkinci Trimestere** hoş geldiniz! Mide bulantıları ve aşırı yorgunluk hissi büyük ihtimalle arkanızda kaldı.\n\nEnerjiniz geri geliyor ve kendinizi çok daha "normal" hissediyorsunuz. Hatta azalan bulantılarla birlikte cinsel isteğinizde bir artış fark edebilirsiniz.',
  ultrasoundText: 'Cinsiyet organları dışarıdan şekillenmeye başlasa da, ultrasonda cinsiyeti kesin olarak söylemek için genelde birkaç hafta daha (yaklaşık 16. hafta) beklemek en garantisidir.',
  images: {
    baby: '/images/babycenter/week-13.jpg',
    ultrasound: 'https://assets.babycenter.com/ims/2026/03/13-weeks-ultrasound.webp'
  }
};

data[14] = {
  week: 14,
  fruitSize: 'Şeftali boyutunda',
  fruitEmoji: '🍑',
  fruitLength: 'Yaklaşık 87 mm, 43 gr',
  babyDev: '**14. Hafta Bebek Gelişimi:**\n\nYüz kasları artık tam mesai yapıyor! Bebeğiniz içeride kaşlarını çatabiliyor, gözlerini kısabiliyor ve tatlı tatlı yüz buruşturabiliyor.\n\nVücudunu sıcak tutmak için "lanugo" adı verilen çok ince, ipeksi tüyler tüm cildini kaplamaya başlıyor (bu tüyler doğuma yakın dökülecektir).',
  momBody: '**14. Hafta Annede Değişimler:**\n\nEvet, aynaya baktığınızda o tatlı "hamile göbeğini" artık hafifçe görmeye başlayabilirsiniz! Rahminiz gerildikçe kasıklarınızda "yuvarlak bağ ağrısı" dediğimiz ani ve keskin çekilmeler hissedebilirsiniz, bu çok normaldir.\n\nArtık hamile kıyafetlerine veya beli lastikli pantolonlara geçiş yapmanın tam sırası!',
  ultrasoundText: 'Bebeğinizin kollarını ve bacaklarını çok daha koordineli bir şekilde hareket ettirdiğini görebilirsiniz. Hatta ultrasonda size el sallıyormuş gibi bile görünebilir!',
  images: {
    baby: '/images/babycenter/week-14.jpg',
    ultrasound: 'https://assets.babycenter.com/ims/2026/03/14-weeks-ultrasound.webp'
  }
};

data[15] = {
  week: 15,
  fruitSize: 'Elma boyutunda',
  fruitEmoji: '🍎',
  fruitLength: 'Yaklaşık 10.1 cm, 70 gr',
  babyDev: '**15. Hafta Bebek Gelişimi:**\n\nİnanılmaz ama gerçek: Bebeğinizin göz kapakları hala kapalı olsa da artık ışığı hissedebiliyor! Karnınıza bir el feneri tutarsanız, ışıktan kaçmak için hareket edebilir.\n\nİskelet sistemi kıkırdaktan sert kemiklere dönüşüyor. Ayrıca bacakları artık kollarından daha uzun.',
  momBody: '**15. Hafta Annede Değişimler:**\n\nArtan kan hacminiz ve genişleyen damarlarınız nedeniyle burun kanamaları veya sürekli burun tıkanıklığı yaşayabilirsiniz (buna hamilelik nezlesi denir).\n\nEğer bu ilk hamileliğiniz değilse, karnınızda kelebek kanadı çırpıntısı veya gaz baloncuğu gibi ilk bebek hareketlerini (quickening) hissetmeye başlayabilirsiniz!',
  ultrasoundText: 'Bebeğinizin içeride nefes alma pratikleri yaptığını (amniyotik sıvıyı içine çekip vererek) görebilirsiniz. Bu hareketler akciğerlerinin gelişimi için çok önemlidir.',
  images: {
    baby: '/images/babycenter/week-15.jpg',
    ultrasound: 'https://assets.babycenter.com/ims/2026/03/15-weeks-ultrasound.webp'
  }
};

const content = `export const weeklyDetailsData: Record<number, any> = ${JSON.stringify(data, null, 2)};`;
fs.writeFileSync('src/data/weeklyDetailsData.ts', content);
