const fs = require('fs');

const dataStr = fs.readFileSync('src/data/weeklyDetailsData.ts', 'utf8');
let objStr = dataStr.replace('export const weeklyDetailsData: Record<number, any> = ', '').replace(/;$/, '');
let data = JSON.parse(objStr);

data[19] = {
  week: 19,
  fruitSize: 'Büyük Bir Mango boyutunda',
  fruitEmoji: '🥭',
  fruitLength: 'Yaklaşık 15.3 cm, 240 gr',
  babyDev: '**19. Hafta Bebek Gelişimi:**\n\nBebeğinizin cildi suda buruşmaması için "Verniks kazeoza" adı verilen peynirimsi, beyaz, koruyucu bir tabaka ile kaplanmaya başlıyor.\n\nBeynindeki duyusal bölgeler (koku, tat, görme, dokunma ve işitme) muazzam bir hızla uzmanlaşıyor. Milyonlarca motor nöronu kaslara bağlanarak hareketlerini çok daha bilinçli hale getiriyor.',
  momBody: '**19. Hafta Annede Değişimler:**\n\nHamilelik hormonları cilt pigmentasyonunu etkileyebilir. Karnınızın ortasından aşağıya doğru inen koyu renkli çizgiye (Linea Nigra) veya yüzünüzde hamilelik maskesine (Melazma) rastlayabilirsiniz.\n\nBüyüyen göbeğiniz nedeniyle yuvarlak bağ ağrılarınız veya hafif kasık kramplarınız devam edebilir, pozisyon değiştirirken yavaş hareket edin.',
  ultrasoundText: 'Eğer henüz girmediyseniz detaylı (ayrıntılı) ultrason bu haftalarda yapılır. Bebeğinizin parmaklarını emerken veya yüzünü elleriyle kapatırken muhteşem fotoğraflarını yakalayabilirsiniz.',
  images: {
    baby: '/images/babycenter/week-19.jpg',
    ultrasound: 'https://assets.babycenter.com/ims/2026/03/19-weeks-ultrasound.webp'
  }
};

data[20] = {
  week: 20,
  fruitSize: 'Muz boyutunda',
  fruitEmoji: '🍌',
  fruitLength: 'Yaklaşık 25.4 cm (Baştan topuğa), 300 gr',
  babyDev: '**20. Hafta Bebek Gelişimi:**\n\nKocaman bir tebrik: **Yolun tam yarısındasınız!** Bugüne kadar bebeğinizin boyu başından poposuna ölçülüyordu, bu haftadan itibaren başından topuklarına kadar (yaklaşık 25 cm) ölçülmeye başlanıyor.\n\nBebeğiniz içeride yutkunma pratikleri yapıyor ve bağırsaklarında "mekonyum" adı verilen o ilk siyah/yeşil kakasını üretip depolamaya başlıyor.',
  momBody: '**20. Hafta Annede Değişimler:**\n\nRahminizin tepe noktası artık tam olarak göbek deliğinizin hizasına ulaştı! Büyüyen karın baskısıyla göbek deliğiniz dışarı doğru "pırtlayabilir", doğumdan sonra eski haline dönecektir.\n\nHormonlar sayesinde dökülmesi duran saçlarınız, hayatınızda hiç olmadığı kadar gür ve parlak görünüyor olabilir.',
  ultrasoundText: 'Bebeğinizin kendine has bir uyku-uyanıklık döngüsü oluştu! Ultrasonda onu mışıl mışıl uyurken yakalayabilir veya içeride taklalar atarken görebilirsiniz.',
  images: {
    baby: '/images/babycenter/week-20.jpg',
    ultrasound: 'https://assets.babycenter.com/ims/2026/03/20-weeks-ultrasound.webp'
  }
};

data[21] = {
  week: 21,
  fruitSize: 'Büyük Bir Havuç boyutunda',
  fruitEmoji: '🥕',
  fruitLength: 'Yaklaşık 26.7 cm, 360 gr',
  babyDev: '**21. Hafta Bebek Gelişimi:**\n\nBebeğiniz artık bir gurme! Yediğiniz yemeklerin tatları amniyotik sıvıya geçiyor ve bebeğiniz bu sıvıyı yutarak tat alma duyusunu geliştiriyor.\n\nKaşları ve göz kapakları tamamen oluştu. Hatta eğer kızınız olacaksa, şu an minik yumurtalıklarında ömrü boyunca sahip olacağı milyonlarca yumurta hücresi bulunuyor!',
  momBody: '**21. Hafta Annede Değişimler:**\n\nKan hacminizdeki artış ve rahim baskısı nedeniyle ayak bileklerinizde ve ayaklarınızda hafif şişmeler (ödem) başlayabilir. Otururken ayaklarınızı yukarı kaldırmak iyi gelecektir.\n\nAyrıca karnınız ve göğüsleriniz büyüdükçe cilt gerilir, bu da hafif kaşıntılara ve çatlak (stria) oluşumuna yol açabilir. Bol bol nemlendirici kullanın.',
  ultrasoundText: 'Bebeğinizin kalp atışları o kadar güçlendi ki, doktorunuz standart bir stetoskopla bile bu harika ritmi rahatlıkla duyabilir.',
  images: {
    baby: '/images/babycenter/week-21.jpg',
    ultrasound: 'https://assets.babycenter.com/ims/2026/03/21-weeks-ultrasound.webp'
  }
};

const content = `export const weeklyDetailsData: Record<number, any> = ${JSON.stringify(data, null, 2)};`;
fs.writeFileSync('src/data/weeklyDetailsData.ts', content);
