const fs = require('fs');

const dataStr = fs.readFileSync('src/data/weeklyDetailsData.ts', 'utf8');
let objStr = dataStr.replace('export const weeklyDetailsData: Record<number, any> = ', '').replace(/;$/, '');
let data = JSON.parse(objStr);

data[40] = {
  week: 40,
  fruitSize: 'Orta Boy Bir Karpuz boyutunda',
  fruitEmoji: '🍉',
  fruitLength: 'Yaklaşık 51.2 cm, 3400 gr',
  babyDev: '**40. Hafta Bebek Gelişimi:**\n\nBüyük gün geldi! Bebeğinizin kafatası kemikleri hala tam birleşmemiştir; aralarında "bıngıldak (fontanel)" adı verilen boşluklar vardır. Bu boşluklar, doğum kanalından geçerken kafasının sıkışıp zarar görmesini engellemek için mükemmel bir tasarımdır.\n\nEğer bebeğiniz hala içerideyken saçları ve tırnakları uzamaya devam ediyor. Doğduğunda küçük bir maniküre ihtiyacı olabilir!',
  momBody: '**40. Hafta Annede Değişimler:**\n\nResmi tahmini doğum tarihinize ulaştınız! Ancak unutmayın; bebeklerin sadece %5\'i tam olarak beklenen tarihte doğar. Bekleme oyunu yorucu olabilir, sabırlı olun.\n\nBol bol yürüyüş yapmak, pilates topunda hafifçe zıplamak ve merdiven inip çıkmak bebeğin aşağı inmesine ve doğumun başlamasına yardımcı olabilir.',
  ultrasoundText: 'Artık standart bir ultrason ziyareti yerine, bebeğin kalp atışlarının izlendiği NST (Non-Stress Test) cihazına bağlanarak kasılmalarınızı ve bebeğin stres durumunu kontrol edersiniz.',
  images: {
    baby: '/images/babycenter/week-40.jpg',
    ultrasound: 'https://assets.babycenter.com/ims/2026/03/40-weeks-ultrasound.webp'
  }
};

data[41] = {
  week: 41,
  fruitSize: 'Büyük Bir Karpuz boyutunda',
  fruitEmoji: '🍉',
  fruitLength: 'Yaklaşık 51.7 cm, 3600 gr',
  babyDev: '**41. Hafta Bebek Gelişimi:**\n\n"Geç Term" dönemine girdiniz! Bebeğiniz içerideki lüks yaşamından o kadar memnun ki dışarı çıkmak istemiyor. Hala her gün kilo almaya ve yağ depolamaya devam ediyor.\n\nOnu koruyan beyaz tabaka (verniks) yavaş yavaş kaybolduğu için, doğduğunda cildi suda fazla kalmış gibi biraz buruşuk veya kuru (soyulmaya yüz tutmuş) olabilir.',
  momBody: '**41. Hafta Annede Değişimler:**\n\n"Hala doğurmadın mı?" soruları sizi bunaltmış olabilir! Doktorunuz bu hafta doğumu suni sancı (indüksiyon) ile başlatmayı önerebilir veya rahim ağzını uyarmak için membran sıyırma işlemi yapabilir.\n\nArtık bebeğin hareketlerini takip etmek her zamankinden çok daha önemli, en ufak bir durağanlıkta doktorunuza haber vermelisiniz.',
  ultrasoundText: 'Doktorunuz "Biyofiziksel Profil" adı verilen detaylı bir ultrasonla bebeğin nefes almasını, hareketlerini, kas tonusunu ve içeride kalan amniyotik sıvı miktarını ölçecektir.',
  images: {
    baby: '/images/babycenter/week-41.jpg',
    ultrasound: 'https://assets.babycenter.com/ims/2026/03/41-weeks-ultrasound.webp'
  }
};

data[42] = {
  week: 42,
  fruitSize: 'Dev Bir Jakmeyvesi boyutunda',
  fruitEmoji: '🍈',
  fruitLength: 'Yaklaşık 52.5 cm, 3800 gr',
  babyDev: '**42. Hafta Bebek Gelişimi:**\n\nArtık "Post-Term" (Günü Geçmiş) bir bebek bekliyorsunuz! Tırnakları uzun, saçları gür ve cildi biraz kurumuş şekilde doğması çok muhtemeldir.\n\nİçerideki amniyotik sıvı azaldığı için tekmeleri artık çok daha sert ve köşelidir. O da dışarı çıkmak için en az sizin kadar sabırsızlanıyor!',
  momBody: '**42. Hafta Annede Değişimler:**\n\nPlasentanın (bebeğin eşi) belli bir kullanım ömrü vardır ve 42. haftadan sonra bebeği yeterince besleyemeyebilir. Bu nedenle doktorunuz kesinlikle daha fazla beklemenize izin vermeyecektir.\n\nEğer doğum kendi kendine başlamadıysa, bu hafta mutlaka suni sancı veya sezaryen ile o beklenen büyük buluşma gerçekleşecektir. Şimdiden gözünüz aydın!',
  ultrasoundText: 'Bebeğiniz artık içerideki son anlarını yaşıyor. Ultrason cihazındaki görüntüden ziyade, birkaç saat veya gün içinde onu kendi gözlerinizle göreceksiniz!',
  images: {
    baby: '/images/babycenter/week-42.jpg',
    ultrasound: 'https://assets.babycenter.com/ims/2026/03/42-weeks-ultrasound.webp'
  }
};

const content = `export const weeklyDetailsData: Record<number, any> = ${JSON.stringify(data, null, 2)};`;
fs.writeFileSync('src/data/weeklyDetailsData.ts', content);
