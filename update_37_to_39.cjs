const fs = require('fs');

const dataStr = fs.readFileSync('src/data/weeklyDetailsData.ts', 'utf8');
let objStr = dataStr.replace('export const weeklyDetailsData: Record<number, any> = ', '').replace(/;$/, '');
let data = JSON.parse(objStr);

data[37] = {
  week: 37,
  fruitSize: 'Kış Kavunu boyutunda',
  fruitEmoji: '🍈',
  fruitLength: 'Yaklaşık 48.6 cm, 2850 gr',
  babyDev: '**37. Hafta Bebek Gelişimi:**\n\nTebrikler! Bebeğiniz artık "Erken Term" (Zamanında) kabul ediliyor. Yani prematüre sınırını tamamen geride bıraktınız!\n\nBağışıklık sistemi mükemmel çalışıyor. Akciğerleri tamamen olgunlaştı ve dış dünyada ilk ağlamasını gerçekleştirmek için ses telleri hazır bekliyor. Süt emmek için yanaklarındaki tombulluk (yağ yastıkçıkları) iyice gelişti.',
  momBody: '**37. Hafta Annede Değişimler:**\n\nRahim ağzınız doğuma hazırlık için yavaş yavaş yumuşamaya ve incelmeye (efasman) başlar. Bu süreçte çamaşırınızda hafif sümüksü veya pembemsi bir akıntı görebilirsiniz; bu, rahim ağzını tıkayan "nişan (mucus plug)" düşmesi olabilir.\n\nBebek iyice aşağı indiği için pelvik bölgenizde, sanki bowling topu taşıyormuşsunuz gibi yoğun bir baskı hissedebilirsiniz.',
  ultrasoundText: 'Bebeğiniz o kadar büyüdü ki, ultrasonda artık sadece vücudunun bazı bölümlerini (sadece yüzünü veya sadece ayağını) tek tek görebilirsiniz. Baş parmağını emerken yakalamanız an meselesidir.',
  images: {
    baby: '/images/babycenter/week-37.jpg',
    ultrasound: 'https://assets.babycenter.com/ims/2026/03/37-weeks-ultrasound.webp'
  }
};

data[38] = {
  week: 38,
  fruitSize: 'Balkabağı boyutunda',
  fruitEmoji: '🎃',
  fruitLength: 'Yaklaşık 49.8 cm, 3000 gr',
  babyDev: '**38. Hafta Bebek Gelişimi:**\n\nBebeğinizin vücudunu kaplayan o incecik tüyler (lanugo) ve beyaz kremsi tabaka (verniks) büyük oranda döküldü.\n\nBebeğiniz amniyotik sıvıyla birlikte bu dökülen hücreleri yutuyor. Tüm bu yuttukları, bağırsaklarında birikerek doğumdan sonraki o meşhur ilk siyah/yeşil kakasını (mekonyum) oluşturacak! Kavrama yeteneği artık sizin parmağınızı sıkıca tutabilecek kadar güçlü.',
  momBody: '**38. Hafta Annede Değişimler:**\n\nEvi dip köşe temizleme isteği mi geldi? Buna "Yuva Yapma İçgüdüsü (Nesting)" denir! Doğanın sizi bebeğin gelişine fiziksel ve zihinsel olarak hazırlama yoludur; ancak kendinizi çok yormayın.\n\nBraxton Hicks kasılmaları artık gerçek doğum sancılarıyla karışacak kadar güçlenebilir. Eğer kasılmalar düzenli aralıklarla geliyorsa ve dinlenmekle geçmiyorsa, doktorunuzla görüşme vakti gelmiş demektir.',
  ultrasoundText: 'Ekranda harika bir yenidoğan göreceksiniz. Ses tellerini test etmek için ara sıra ağzını kocaman açıp esneyebilir.',
  images: {
    baby: '/images/babycenter/week-38.jpg',
    ultrasound: 'https://assets.babycenter.com/ims/2026/03/38-weeks-ultrasound.webp'
  }
};

data[39] = {
  week: 39,
  fruitSize: 'Küçük Bir Karpuz boyutunda',
  fruitEmoji: '🍉',
  fruitLength: 'Yaklaşık 50.7 cm, 3200 gr',
  babyDev: '**39. Hafta Bebek Gelişimi:**\n\nİşte beklenen an: **Bebeğiniz resmen "Tam Zamanında (Full Term)" oldu!** İçerideki tüm gelişimi bitti, tamamen pişti ve dış dünya için %100 hazır.\n\nDış cildinin altındaki o taptaze, pürüzsüz yeni cilt tabakası tamamen oluştu. Beyni, doğduktan sonra ilk 3 yıl boyunca yaşayacağı muazzam büyüme atağı için hızla nöron bağlantıları kurmaya devam ediyor.',
  momBody: '**39. Hafta Annede Değişimler:**\n\nHer an "suyunuz gelebilir"! Filmlerdeki gibi aniden şelale şeklinde olmak zorunda değildir, bazen ince bir sızıntı şeklinde de olabilir.\n\nBu haftadan itibaren bebeğinizin hareketlerini saymaya devam edin. Hareketlerde azalma hissederseniz veya su gelişiniz olursa hemen hastanenize başvurun. Çantanız kapıda hazır beklesin!',
  ultrasoundText: 'Bebeğiniz içeride iyice sıkıştığı için ultrasonda net bir yüz fotoğrafı almak artık neredeyse imkansızdır. Karanlıkta, başı aşağıda, kollarını göğsüne bağlamış büyük anı bekliyor!',
  images: {
    baby: '/images/babycenter/week-39.jpg',
    ultrasound: 'https://assets.babycenter.com/ims/2026/03/39-weeks-ultrasound.webp'
  }
};

const content = `export const weeklyDetailsData: Record<number, any> = ${JSON.stringify(data, null, 2)};`;
fs.writeFileSync('src/data/weeklyDetailsData.ts', content);
