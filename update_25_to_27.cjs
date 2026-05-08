const fs = require('fs');

const dataStr = fs.readFileSync('src/data/weeklyDetailsData.ts', 'utf8');
let objStr = dataStr.replace('export const weeklyDetailsData: Record<number, any> = ', '').replace(/;$/, '');
let data = JSON.parse(objStr);

data[25] = {
  week: 25,
  fruitSize: 'Karnabahar boyutunda',
  fruitEmoji: '🥦',
  fruitLength: 'Yaklaşık 34.6 cm, 660 gr',
  babyDev: '**25. Hafta Bebek Gelişimi:**\n\nBebeğinizin cildinin altındaki o incecik kılcal damarlar şekilleniyor ve kanla doluyor. Bu da cildine o tatlı, sağlıklı pembe/kırmızı rengini veriyor!\n\nSesinize olan duyarlılığı zirvede. Sizin sesinizi diğer seslerden rahatlıkla ayırt edebilir. Ani veya yüksek bir sese içeriden sıçrayarak (irkilme refleksi) tepki verebilir.',
  momBody: '**25. Hafta Annede Değişimler:**\n\nBüyüyen rahminiz midenize ve sindirim sisteminize baskı yapmaya devam ediyor. Bu nedenle mide yanması (reflü) ve hazımsızlık şikayetleri bu haftalarda artabilir.\n\nAyrıca leğen kemiklerinizin esnemesi sebebiyle kasıklarınızda veya kuyruk sokumunuzda ağrılar (Symphysis Pubis Disfonksiyonu) yaşayabilirsiniz. Yastık destekli oturmak iyi gelecektir.',
  ultrasoundText: 'Bebeğinizin burnundaki minik burun delikleri açıldı! Ultrasonda burnunun tıpkı minyatür bir düğme gibi göründüğünü fark edebilirsiniz.',
  images: {
    baby: '/images/babycenter/week-25.jpg',
    ultrasound: 'https://assets.babycenter.com/ims/2026/03/25-weeks-ultrasound.webp'
  }
};

data[26] = {
  week: 26,
  fruitSize: 'Büyük Bir Marul boyutunda',
  fruitEmoji: '🥬',
  fruitLength: 'Yaklaşık 35.6 cm, 760 gr',
  babyDev: '**26. Hafta Bebek Gelişimi:**\n\nBüyük haber: **Bebeğiniz gözlerini açtı!** Yaklaşık 10. haftadan beri sımsıkı kapalı olan o minik göz kapakları nihayet aralandı.\n\nİçerisi karanlık olsa da ışığı algılayabiliyor ve hatta gözlerini kırpabiliyor. Beyin dalgası aktiviteleri inanılmaz hızlandı, dışarıdaki sese veya dokunuşa göre uyarılıp kalp atışlarını hızlandırabiliyor.',
  momBody: '**26. Hafta Annede Değişimler:**\n\nKocaman bir göbekle rahat bir uyku pozisyonu bulmak artık olimpiyat sporu gibi gelebilir! Geceleri aniden giren bacak krampları uykunuzu bölebilir (magnezyum seviyeleriniz için doktorunuza danışın).\n\nRahminiz göbek deliğinizin yaklaşık 6 cm üzerine kadar çıktı, nefes alırken diyaframınızın biraz sıkıştığını hissedebilirsiniz.',
  ultrasoundText: 'Eğer şanslıysanız, ultrasonda o minik göz kapaklarının kırpıldığını yakalayabilirsiniz! Ekranda çok daha net bir insan profili göreceksiniz.',
  images: {
    baby: '/images/babycenter/week-26.jpg',
    ultrasound: 'https://assets.babycenter.com/ims/2026/03/26-weeks-ultrasound.webp'
  }
};

data[27] = {
  week: 27,
  fruitSize: 'Brokoli boyutunda',
  fruitEmoji: '🥦',
  fruitLength: 'Yaklaşık 36.6 cm, 875 gr',
  babyDev: '**27. Hafta Bebek Gelişimi:**\n\nBebeğiniz 1 kiloya doğru koşuyor! Beyni inanılmaz bir büyüme atağı geçiriyor ve akciğerleri nefes alıp vermeye her gün biraz daha hazırlanıyor.\n\nBu haftalarda karnınızda ritmik, pıt pıt atan, saat tiktakları gibi hafif titreşimler hissedebilirsiniz. Panik yok! Bunlar bebeğinizin yutkunma pratikleri yaparken tuttuğu masum hıçkırık krizleridir.',
  momBody: '**27. Hafta Annede Değişimler:**\n\nSüper haber: **İkinci Trimesterin (ikinci 3 ayın) son haftasına geldiniz!** Önümüzdeki hafta hamileliğin son düzlüğüne giriyorsunuz.\n\nKan akışınızdaki artıştan dolayı ellerinizde ve ayaklarınızda şişlikler (ödem) devam edebilir. Yüzüklerinizi şimdiden güvenli bir yere kaldırmak iyi bir fikir olabilir.',
  ultrasoundText: 'Bebeğiniz amniyotik sıvıyı içine çekip çıkararak akciğerlerini çalıştırıyor. Ekranda göğüs kafesinin inip kalktığı nefes alma provalarını izleyebilirsiniz.',
  images: {
    baby: '/images/babycenter/week-27.jpg',
    ultrasound: 'https://assets.babycenter.com/ims/2026/03/27-weeks-ultrasound.webp'
  }
};

const content = `export const weeklyDetailsData: Record<number, any> = ${JSON.stringify(data, null, 2)};`;
fs.writeFileSync('src/data/weeklyDetailsData.ts', content);
