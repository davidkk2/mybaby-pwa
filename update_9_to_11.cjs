const fs = require('fs');

const dataStr = fs.readFileSync('src/data/weeklyDetailsData.ts', 'utf8');
let objStr = dataStr.replace('export const weeklyDetailsData: Record<number, any> = ', '').replace(/;$/, '');
let data = JSON.parse(objStr);

data[9] = {
  week: 9,
  fruitSize: 'Yeşil zeytin boyutunda',
  fruitEmoji: '🫒',
  fruitLength: 'Yaklaşık 22-25 mm, 2 gr',
  babyDev: '**9. Hafta Bebek Gelişimi:**\n\nBebeğinizin minik kalbi artık dört odacıklı bir yapıya ulaştı ve kapakçıkları şekilleniyor. Ayrıca damak yapısı ve minik diş tomurcukları diş etlerinin altında oluşmaya başlıyor!\n\nKasları da hızla gelişiyor; öyle ki içeride sürekli küçük ve ani hareketler yapıyor. Ama endişelenmeyin, amuda da kalksa bu ufak jimnastikleri hissetmeniz için henüz çok erken.',
  momBody: '**9. Hafta Annede Değişimler:**\n\nHamilelik hormonlarının (özellikle hCG) en yüksek seviyelere ulaştığı haftalardasınız. Bu yüzden ruh hali dalgalanmaları (bir an ağlayıp bir an gülmek) son derece normaldir.\n\nMemeleriniz büyümeye ve hassaslaşmaya devam ediyor, daha rahat bir sutyene geçmenin vakti gelmiş olabilir.',
  ultrasoundText: 'Ultrasonda bebeğinizin kafasının vücuduna oranla oldukça büyük olduğunu görebilirsiniz. Kollarını ve bacaklarını hareket ettirdiğini net bir şekilde izlemek heyecan vericidir.',
  images: {
    baby: '/images/babycenter/week-9.jpg',
    ultrasound: 'https://assets.babycenter.com/ims/2026/03/9-weeks-ultrasound.webp'
  }
};

data[10] = {
  week: 10,
  fruitSize: 'Çilek boyutunda',
  fruitEmoji: '🍓',
  fruitLength: 'Yaklaşık 31 mm, 4 gr',
  babyDev: '**10. Hafta Bebek Gelişimi:**\n\nBüyük bir dönüm noktası! Bebeğiniz resmen embriyo dönemini bitirdi ve artık bir **fetüs**. Bütün hayati organları (beyin, kalp, karaciğer, böbrekler) oluştu ve çalışmaya başladı.\n\nGeçen haftalardaki o perde şeklindeki parmak arası dokular kayboldu ve artık birbirinden tamamen ayrık, belirgin el ve ayak parmakları var.',
  momBody: '**10. Hafta Annede Değişimler:**\n\nKan hacminiz hamilelik öncesine göre %50\'ye kadar arttı. Bu artış yüzünden göğüslerinizde ve karnınızda ince mavi damarların daha belirgin hale geldiğini fark edebilirsiniz.\n\nMüjdeli haber: İlk trimesterin sonuna yaklaşıyorsunuz ve mide bulantıları birçok anne adayı için yavaş yavaş hafiflemeye başlayacak.',
  ultrasoundText: 'Bebeğiniz artık insan silüetine çok daha benziyor. Ultrasonda dirseklerini bükebildiğini ve yüz hatlarının (burun, alın) çok daha belirginleştiğini görebilirsiniz.',
  images: {
    baby: '/images/babycenter/week-10.jpg',
    ultrasound: 'https://assets.babycenter.com/ims/2026/03/10-weeks-ultrasound.webp'
  }
};

data[11] = {
  week: 11,
  fruitSize: 'İncir boyutunda',
  fruitEmoji: '🍐',
  fruitLength: 'Yaklaşık 41 mm, 7 gr',
  babyDev: '**11. Hafta Bebek Gelişimi:**\n\nBebeğiniz artık ellerini yumruk yapıp açabiliyor! Tırnak yatakları ve saç kökleri oluşmaya başladı. Diyafram kası geliştiği için içeride minik hıçkırık krizleri yaşıyor olabilir.\n\nCildi hala kağıt kadar ince ve şeffaf; tüm damarları dışarıdan görülebiliyor. Kemikleri sertleşmeye başlıyor.',
  momBody: '**11. Hafta Annede Değişimler:**\n\nHamilelik hormonları sadece bebeğinizi değil sizi de güzelleştiriyor! Saçlarınızın ve tırnaklarınızın eskisinden çok daha hızlı ve güçlü uzadığını fark edebilirsiniz.\n\nMide yanması (reflü) ve hazımsızlık şikayetleri başlayabilir, baharatlı veya çok yağlı yiyeceklerden uzak durmak iyi gelecektir.',
  ultrasoundText: 'Eğer bu hafta ense kalınlığı (ikili test) ultrasonuna girerseniz, doktorunuz bebeğinizin ense kısmındaki sıvıyı ölçecektir. Ekranda harika bir profil profili görebilirsiniz!',
  images: {
    baby: '/images/babycenter/week-11.jpg',
    ultrasound: 'https://assets.babycenter.com/ims/2026/03/11-weeks-ultrasound.webp'
  }
};

const content = `export const weeklyDetailsData: Record<number, any> = ${JSON.stringify(data, null, 2)};`;
fs.writeFileSync('src/data/weeklyDetailsData.ts', content);
