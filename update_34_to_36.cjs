const fs = require('fs');

const dataStr = fs.readFileSync('src/data/weeklyDetailsData.ts', 'utf8');
let objStr = dataStr.replace('export const weeklyDetailsData: Record<number, any> = ', '').replace(/;$/, '');
let data = JSON.parse(objStr);

data[34] = {
  week: 34,
  fruitSize: 'Orta Boy Bir Kavun boyutunda',
  fruitEmoji: '🍈',
  fruitLength: 'Yaklaşık 45.0 cm, 2100 gr',
  babyDev: '**34. Hafta Bebek Gelişimi:**\n\nHarika bir haber: Bebeğinizin akciğerleri kendi başına nefes alabilecek kadar olgunlaştı (veya olgunlaşmasına sadece ramak kaldı)! Eğer bu hafta doğarsa, muhtemelen çok kısa bir destekle tek başına nefes alabilir.\n\nMerkezi sinir sistemi hızla olgunlaşıyor. Erkek bebek bekliyorsanız, testisleri karın boşluğundan skrotuma (torbalara) doğru inme yolculuğunu tamamlamak üzere.',
  momBody: '**34. Hafta Annede Değişimler:**\n\nHamilelik hormonları ve vücuttaki sıvı artışı bazen gözlerinizdeki kornea tabakasını bile etkileyip görüşünüzü hafifçe bulanıklaştırabilir, doğumdan sonra tamamen geçecektir.\n\nAyrıca karnınız o kadar büyüdü ki, kendinizi ilk aylardaki gibi tekrar çok yorgun ve bitkin hissedebilirsiniz. Mümkün olan her anı dinlenerek geçirin.',
  ultrasoundText: 'Bebeğinizin cildini kaplayan koruyucu beyaz krem tabakası (Verniks) giderek kalınlaşıyor. Ekranda artık yanakları iyice dolmuş, tombul bir yenidoğan görebilirsiniz.',
  images: {
    baby: '/images/babycenter/week-34.jpg',
    ultrasound: 'https://assets.babycenter.com/ims/2026/03/34-weeks-ultrasound.webp'
  }
};

data[35] = {
  week: 35,
  fruitSize: 'Bal Kavunu boyutunda',
  fruitEmoji: '🍈',
  fruitLength: 'Yaklaşık 46.2 cm, 2400 gr',
  babyDev: '**35. Hafta Bebek Gelişimi:**\n\nBebeğinizin iç organları tamamen işlevsel hale geldi! Böbrekleri tamamen gelişti ve karaciğeri bazı atık maddeleri işleyebilecek kapasiteye ulaştı.\n\nTemel fiziksel gelişimi aslında bitti sayılır; bundan sonra doğuma kadar yapacağı en önemli şey hızla kilo almak ve vücut ısısını korumak için yağ depolamak!',
  momBody: '**35. Hafta Annede Değişimler:**\n\nBu haftalarda (35-37 arası) doktorunuz sizden Grup B Streptokok (GBS) testi isteyebilir; bu, doğum sırasında bebeğe geçebilecek yaygın bir bakteriyi kontrol etmek içindir.\n\nRahminiz göğüs kafesinize en tepe noktadan baskı yaptığı için mide yanmanız veya nefes darlığınız bu hafta zirve yapabilir. Sabredin, bebeğiniz yakında aşağı inecek!',
  ultrasoundText: 'Bebeğiniz rahim içindeki tüm alanı kapladı sayılır. Bu yüzden tekmeleri eskisi gibi keskin ve sert değil, daha çok dalgalanma, kıvrılma veya ittirme şeklinde görünebilir.',
  images: {
    baby: '/images/babycenter/week-35.jpg',
    ultrasound: 'https://assets.babycenter.com/ims/2026/03/35-weeks-ultrasound.webp'
  }
};

data[36] = {
  week: 36,
  fruitSize: 'Büyük Bir Marul boyutunda',
  fruitEmoji: '🥬',
  fruitLength: 'Yaklaşık 47.4 cm, 2600 gr',
  babyDev: '**36. Hafta Bebek Gelişimi:**\n\nKilo alma şampiyonuna merhaba deyin! Bebeğiniz şu andan itibaren günde ortalama 30 gram (haftada 200 gram) yağ depoluyor.\n\nYanaklarındaki emme kasları o kadar güçlendi ki, doğduğunda ilk anne sütünü lıkır lıkır içmek için her türlü donanıma sahip.',
  momBody: '**36. Hafta Annede Değişimler:**\n\nMüjdeli rahatlama (Lightening) zamanı geldi! Özellikle ilk hamileliği olanlarda, bebek bu hafta doğum pozisyonu alarak pelvis (leğen) kemiğinin içine doğru inebilir.\n\nBebek aşağı indiği için midenizdeki baskı azalır, sonunda **derin bir nefes alabilir** ve rahatça yemek yiyebilirsiniz! Tabii bu sefer de mesaneye (idrar torbasına) olan baskı artacağı için tuvalet nöbetleriniz sıklaşacaktır.',
  ultrasoundText: 'Bebeğiniz doğum kanalına girmeye hazırlanıyor. Ultrasonda ağzıyla süt emme provaları (şapırdatma hareketleri) yaptığını çok net izleyebilirsiniz.',
  images: {
    baby: '/images/babycenter/week-36.jpg',
    ultrasound: 'https://assets.babycenter.com/ims/2026/03/36-weeks-ultrasound.webp'
  }
};

const content = `export const weeklyDetailsData: Record<number, any> = ${JSON.stringify(data, null, 2)};`;
fs.writeFileSync('src/data/weeklyDetailsData.ts', content);
