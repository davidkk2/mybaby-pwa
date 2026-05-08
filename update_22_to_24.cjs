const fs = require('fs');

const dataStr = fs.readFileSync('src/data/weeklyDetailsData.ts', 'utf8');
let objStr = dataStr.replace('export const weeklyDetailsData: Record<number, any> = ', '').replace(/;$/, '');
let data = JSON.parse(objStr);

data[22] = {
  week: 22,
  fruitSize: 'Papaya boyutunda',
  fruitEmoji: '🍈',
  fruitLength: 'Yaklaşık 27.8 cm, 430 gr',
  babyDev: '**22. Hafta Bebek Gelişimi:**\n\nBebeğiniz şu an tam olarak "minyatür bir yenidoğan" gibi görünüyor! Dudakları, kaşları ve minik kirpikleri artık çok daha belirgin. Diş etlerinin hemen altında minik diş tomurcukları gelişmeye devam ediyor.\n\nKavrama yeteneği çok güçlendi; içeride kendi göbek kordonunu sıkıca tutabiliyor (merak etmeyin kordon oldukça dayanıklıdır!).',
  momBody: '**22. Hafta Annede Değişimler:**\n\nHamilelik hormonları (relaksin) sadece pelvis kemiklerinizi değil, vücudunuzdaki tüm bağları gevşetir. Bu da ayak kavislerinizin düşmesine ve ayak numaranızın yarım numara büyümesine neden olabilir!\n\nBüyüyen göbeğiniz ağırlık merkezinizi tamamen değiştirdiğinden, yürürken o meşhur "tatlı penguen yürüyüşüne" yavaş yavaş geçiyor olabilirsiniz.',
  ultrasoundText: 'Bebeğinizin yüz profili artık o kadar netleşti ki, ultrasonda kime daha çok benzediğini (burnu size mi yoksa eşinize mi benziyor?) tartışmaya başlayabilirsiniz!',
  images: {
    baby: '/images/babycenter/week-22.jpg',
    ultrasound: 'https://assets.babycenter.com/ims/2026/03/22-weeks-ultrasound.webp'
  }
};

data[23] = {
  week: 23,
  fruitSize: 'Greyfurt boyutunda',
  fruitEmoji: '🍊',
  fruitLength: 'Yaklaşık 28.9 cm, 500 gr',
  babyDev: '**23. Hafta Bebek Gelişimi:**\n\nBebeğiniz yarım kiloya ulaştı! Akciğerlerindeki damarlar hızla gelişiyor ve doğduğunda ciğerlerinin sönmesini engelleyecek olan "sürfaktan" adı verilen çok önemli bir maddeyi üretmeye hazırlanıyor.\n\nAyrıca milyarlarca beyin hücresi gelişiyor ve duyuları inanılmaz keskinleşiyor. Dışarıdan gelen yüksek seslere (köpek havlaması, elektrik süpürgesi) ani tekmelerle tepki verebilir.',
  momBody: '**23. Hafta Annede Değişimler:**\n\nRahminiz doğum için antrenmanlara başlıyor! Karnınızda ara sıra hissedeceğiniz ağrısız, hafif sertleşmelere "Braxton Hicks (Yalancı Doğum Kasılmaları)" denir.\n\nEğer bu kasılmalar sıklaşmıyorsa tamamen normaldir, vücudunuz sadece büyük güne hazırlık kas antrenmanları yapıyordur.',
  ultrasoundText: 'Bebeğinizin cildi hala biraz şeffaf ve kırışık olsa da, derisinin altında yağ tabakası birikmeye başladı ve yakında o tombul yenidoğan görünümüne kavuşacak.',
  images: {
    baby: '/images/babycenter/week-23.jpg',
    ultrasound: 'https://assets.babycenter.com/ims/2026/03/23-weeks-ultrasound.webp'
  }
};

data[24] = {
  week: 24,
  fruitSize: 'Mısır Koçanı boyutunda',
  fruitEmoji: '🌽',
  fruitLength: 'Yaklaşık 30.0 cm, 600 gr',
  babyDev: '**24. Hafta Bebek Gelişimi:**\n\nÇok önemli bir dönüm noktası: Bebeğinizin iç kulağı (denge merkezi) tamamen gelişti! Yani artık içeride baş aşağı mı yoksa düz mü durduğunu çok iyi biliyor.\n\nTıbbi olarak "yaşayabilirlik" (viability) sınırına ulaştınız; bu haftadan itibaren doğan bebeklerin yoğun bakım desteğiyle hayatta kalma şansı vardır. Ancak o elbette en az 40. haftaya kadar sıcacık yerinde kalacak!',
  momBody: '**24. Hafta Annede Değişimler:**\n\nBu haftalarda (24-28 arası) doktorunuz sizden Gebelik Şekeri (Gestasyonel Diyabet) taraması için Şeker Yükleme Testi isteyecektir.\n\nAyrıca hamilelik hormonları gözlerinizde hafif kuruluk ve hassasiyet yapabilir, lens takıyorsanız bu günlerde gözlük kullanmak daha rahat hissettirebilir.',
  ultrasoundText: 'Bebeğinizin göz kapakları hala sımsıkı kapalı olsa da, gözünün iç yapısı tamamen oluştu. Ultrasonda göz kürelerinin hareket ettiğini bile görebilirsiniz.',
  images: {
    baby: '/images/babycenter/week-24.jpg',
    ultrasound: 'https://assets.babycenter.com/ims/2026/03/24-weeks-ultrasound.webp'
  }
};

const content = `export const weeklyDetailsData: Record<number, any> = ${JSON.stringify(data, null, 2)};`;
fs.writeFileSync('src/data/weeklyDetailsData.ts', content);
