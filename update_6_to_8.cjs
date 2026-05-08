const fs = require('fs');

const dataStr = fs.readFileSync('src/data/weeklyDetailsData.ts', 'utf8');
let objStr = dataStr.replace('export const weeklyDetailsData: Record<number, any> = ', '').replace(/;$/, '');
let data = JSON.parse(objStr);

data[6] = {
  week: 6,
  fruitSize: 'Tatlı bir bezelye boyutunda',
  fruitEmoji: '🫛',
  fruitLength: 'Yaklaşık 4-6 mm, 0.1 gr',
  babyDev: '**6. Hafta Bebek Gelişimi:**\n\nBebeğinizin o minik kalbi artık dakikada ortalama 100-160 defa (sizinkinin neredeyse iki katı hızda!) atıyor ve kan pompalamaya başladı.\n\nŞu an bir C harfi şeklinde kıvrılmış olan bebeğinizin göz, burun ve kulak çukurları belirmeye başladı. Hatta o minik kolların ve bacakların çıkacağı tomurcuklar bile yerini alıyor.',
  momBody: '**6. Hafta Annede Değişimler:**\n\nHamilelik belirtileri bu hafta tam gaz kendini gösterebilir! Mide bulantıları, halsizlik ve yorgunluk en yakın arkadaşlarınız olabilir. Vücudunuz devasa bir inşaat alanı gibi çalıştığı için bu çok normal.\n\nAyrıca sık sık tuvalete gitme ihtiyacı hissedebilirsiniz, çünkü artan kan hacminiz böbreklerinizi daha fazla çalıştırıyor.',
  ultrasoundText: 'Bu hafta yapılacak bir vajinal ultrasonda gebelik kesesi, "yolk sac" (bebeği besleyen kese) ve bebeğinizin kendisi (küçük bir pirinç tanesi gibi) görülebilir. Minik bir kalp atışı duyma ihtimaliniz de çok yüksek!',
  images: {
    baby: '/images/babycenter/week-6.jpg',
    ultrasound: 'https://assets.babycenter.com/ims/2026/03/6-weeks-ultrasound.webp'
  }
};

data[7] = {
  week: 7,
  fruitSize: 'Yaban mersini boyutunda',
  fruitEmoji: '🫐',
  fruitLength: 'Yaklaşık 10 mm, 0.5 gr',
  babyDev: '**7. Hafta Bebek Gelişimi:**\n\nBebeğinizin başı, beynin hızla büyümesi nedeniyle vücudundan daha büyük! O minik beynin içinde dakikada yüz yeni beyin hücresi üretiliyor.\n\nKollar ve bacaklar küçük kürekler gibi uzamaya başladı. Ayrıca böbrekleri de yerine yerleşiyor ve yakında idrar üretimine başlayacak.',
  momBody: '**7. Hafta Annede Değişimler:**\n\nArtan hormonlar nedeniyle koku alma duyunuz bir süper kahraman gibi güçlenmiş olabilir. En sevdiğiniz yemeğin kokusu bile aniden midenizi bulandırabilir.\n\nAşerme veya bazı yiyeceklerden tiksinme durumları bu hafta zirve yapabilir. Kendinizi hiç zorlamayın, midenizin kabul ettiği hafif şeyleri az ve sık yemeye çalışın.',
  ultrasoundText: 'Ultrasonda artık bebeğiniz sadece bir nokta değil, küçük bir yaban mersini büyüklüğünde belirgin bir şekle sahiptir. Kalp atışları da ekranda net bir şekilde gözlemlenebilir.',
  images: {
    baby: '/images/babycenter/week-7.jpg',
    ultrasound: 'https://assets.babycenter.com/ims/2026/03/7-weeks-ultrasound.webp'
  }
};

data[8] = {
  week: 8,
  fruitSize: 'Ahududu boyutunda',
  fruitEmoji: '🍇',
  fruitLength: 'Yaklaşık 16 mm, 1 gr',
  babyDev: '**8. Hafta Bebek Gelişimi:**\n\nMucizevi detaylar: Bebeğinizin el ve ayak parmakları perdeli bir şekilde oluşmaya başladı bile! Ayrıca üst dudağı, burnunun ucu ve minik göz kapakları şekilleniyor.\n\nİçeride kollarını ve bacaklarını hareket ettirebiliyor ama o kadar küçük ki siz bu tekmeleri hissetmek için aylarca bekleyeceksiniz.',
  momBody: '**8. Hafta Annede Değişimler:**\n\nRahminiz normal boyutunun iki katına çıkarak bir limon büyüklüğüne ulaştı! Bu büyüme nedeniyle hafif kasık krampları hissedebilirsiniz.\n\nKan hacminiz %50 artıyor, bu da kalbinizin eskisinden daha çok çalışmasına neden oluyor. Bol bol dinlenmek bu süreçte en büyük ilacınız.',
  ultrasoundText: 'Artık ultrasonda bebeğinizin küçük hareketlerini, kol ve bacak tomurcuklarını rahatça görebilirsiniz. Kalp atışı ise odanın içini dolduracak kadar güçlü duyulabilir!',
  images: {
    baby: '/images/babycenter/week-8.jpg',
    ultrasound: 'https://assets.babycenter.com/ims/2026/03/8-weeks-ultrasound.webp'
  }
};

const content = `export const weeklyDetailsData: Record<number, any> = ${JSON.stringify(data, null, 2)};`;
fs.writeFileSync('src/data/weeklyDetailsData.ts', content);
