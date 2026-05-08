const fs = require('fs');

const dataStr = fs.readFileSync('src/data/weeklyDetailsData.ts', 'utf8');
let objStr = dataStr.replace('export const weeklyDetailsData: Record<number, any> = ', '').replace(/;$/, '');
let data = JSON.parse(objStr);

data[1] = {
  week: 1,
  fruitSize: 'Henüz bebek yok',
  fruitEmoji: '🩸',
  fruitLength: '0 mm, 0 gr',
  babyDev: '**1. Hafta Bebek Gelişimi:**\n\nTeknik olarak henüz hamile değilsiniz! Doktorlar gebeliği hesaplarken son adetinizin ilk gününü baz alırlar. Şu an vücudunuz, olası bir hamilelik için kendini hazırlıyor.\n\nRahminizin iç tabakası kalınlaşıyor ve yakında döllenecek olan o şanslı yumurta olgunlaşmaya başlıyor.',
  momBody: '**1. Hafta Annede Değişimler:**\n\nŞu an muhtemelen adet dönemindesiniz. Bu haftayı kendinize iyi bakarak, sağlıklı beslenerek ve folik asit gibi doğum öncesi vitaminlerinizi düzenli alarak geçirin.\n\nRahatlayın, stresten uzak durun. Yakında büyük bir mucizeye ev sahipliği yapacaksınız!',
  ultrasoundText: 'Bu hafta henüz ortada bir bebek olmadığı için ultrasonda sadece kalınlaşmaya başlayan rahim duvarınızı görebilirsiniz.',
  images: {
    baby: '/images/babycenter/week-2.jpg',
    ultrasound: 'https://placehold.co/800x450/4a4453/ffffff?text=1.+Hafta+Ultrasonda+Henuz+Gorunmez'
  }
};

data[2] = {
  week: 2,
  fruitSize: 'Yumurta boyutunda',
  fruitEmoji: '🥚',
  fruitLength: '0.1 mm, 0 gr',
  babyDev: '**2. Hafta Bebek Gelişimi:**\n\nHala ortada bir bebek yok ama sahne arkasında hummalı bir çalışma var! Vücudunuz yumurtlamaya hazırlanıyor.\n\nOlgunlaşan yumurtanız yumurtalıklardan yola çıkıp fallop tüplerine doğru ilerleyecek ve burada milyonlarca sperm arasından en şanslı olanla buluşmayı bekleyecek.',
  momBody: '**2. Hafta Annede Değişimler:**\n\nBu hafta yumurtlama (ovülasyon) haftanız! Vücudunuzda artan östrojen seviyesi nedeniyle daha enerjik ve mutlu hissedebilirsiniz.\n\nBerrak, uzayan ve yumurta akı kıvamında bir vajinal akıntı fark ederseniz, bu vücudunuzun döllenmeye en hazır olduğu anın işaretidir.',
  ultrasoundText: 'Ultrasonda sadece döllenmeye hazırlanan olgun bir yumurta folikülü görülebilir. Henüz bebeğiniz oluşmadı.',
  images: {
    baby: '/images/babycenter/week-2.jpg',
    ultrasound: 'https://placehold.co/800x450/4a4453/ffffff?text=2.+Hafta+Ultrasonda+Henuz+Gorunmez'
  }
};

const content = `export const weeklyDetailsData: Record<number, any> = ${JSON.stringify(data, null, 2)};`;
fs.writeFileSync('src/data/weeklyDetailsData.ts', content);
