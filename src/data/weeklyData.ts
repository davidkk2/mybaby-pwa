export interface WeeklyData {
  week: number;
  fruit: string;
  emoji: string;
  size: string;
  babyDevelopment: string;
  momSymptoms: string;
}

export const weeklyData: Record<number, WeeklyData> = {
  1: { week: 1, fruit: "Henüz Bebek Yok", emoji: "🩸", size: "0 mm", babyDevelopment: "Bu hafta aslında son adet döneminizin başlangıcıdır. Henüz hamile değilsiniz ancak vücudunuz hamilelik için hazırlanıyor.", momSymptoms: "Klasik adet belirtileri (kramplar, şişkinlik, ruh hali değişiklikleri) yaşayabilirsiniz." },
  2: { week: 2, fruit: "Yumurta", emoji: "🥚", size: "0.1 mm", babyDevelopment: "Vücudunuz yumurtlamaya hazırlanıyor. Yumurtanız serbest bırakılacak ve sperm ile buluşmayı bekleyecek.", momSymptoms: "Yumurtlama belirtileri (şeffaf akıntı, hafif kasık ağrısı, artan vücut ısısı) olabilir." },
  3: { week: 3, fruit: "Döllenmiş Yumurta", emoji: "🧬", size: "0.2 mm", babyDevelopment: "Mucize gerçekleşti! Sperm yumurtayı dölledi ve zigot oluştu. Hücreler hızla bölünerek rahme doğru ilerliyor.", momSymptoms: "Henüz belirgin bir hamilelik belirtisi hissetmeyebilirsiniz, ancak bazı kadınlar hafif implantasyon (yerleşme) kanaması yaşayabilir." },
  4: { week: 4, fruit: "Haşhaş Tohumu", emoji: "🌑", size: "2 mm", babyDevelopment: "Bebeğiniz şu an minicik bir hücre topu ve rahme yerleşiyor.", momSymptoms: "Hafif kramplar veya lekelenmeler yaşayabilirsiniz. Yorgunluk hissi başlar." },
  5: { week: 5, fruit: "Elma Çekirdeği", emoji: "🍎", size: "3 mm", babyDevelopment: "Bebeğinizin sinir sistemi, beyin ve omuriliği oluşmaya başlıyor. Kalbi atmaya başlayacak!", momSymptoms: "Göğüslerde hassasiyet, sık idrara çıkma ve sabah bulantıları başlayabilir." },
  6: { week: 6, fruit: "Tatlı Bir Bezelye", emoji: "🫛", size: "6 mm", babyDevelopment: "Bebeğinizin kalbi dakikada 100-160 kez atıyor! Göz, burun ve kulak çukurları belirmeye başladı.", momSymptoms: "Mide bulantıları ve yorgunluk bu hafta daha belirgin olabilir. Bol bol dinlenin." },
  7: { week: 7, fruit: "Yaban Mersini", emoji: "🫐", size: "10 mm", babyDevelopment: "Kol ve bacak tomurcukları oluştu. Beyni hızla gelişiyor.", momSymptoms: "Yemek kokularına karşı hassasiyet artabilir. Aşerme veya tiksinme yaşayabilirsiniz." },
  8: { week: 8, fruit: "Ahududu", emoji: "🍇", size: "16 mm", babyDevelopment: "El ve ayak parmakları perdeli bir şekilde oluşmaya başladı.", momSymptoms: "Kan hacminiz arttığı için kalbiniz daha hızlı çarpabilir." },
  9: { week: 9, fruit: "Kiraz", emoji: "🍒", size: "22 mm", babyDevelopment: "Bebeğinizin kalbi dört odacıklı hale geldi. Minik hareketler yapıyor.", momSymptoms: "Duygusal dalgalanmalar yaşayabilirsiniz. Derin nefes egzersizleri iyi gelecektir." },
  10: { week: 10, fruit: "Çilek", emoji: "🍓", size: "30 mm", babyDevelopment: "Bütün hayati organları oluştu ve çalışmaya başladı! Artık ona 'fetüs' deniyor.", momSymptoms: "Bulantılarınız bu haftadan itibaren yavaş yavaş azalmaya başlayabilir." },
  11: { week: 11, fruit: "İncir", emoji: "🍐", size: "41 mm", babyDevelopment: "Bebeğinizin diş tomurcukları oluşuyor ve ellerini açıp kapayabiliyor.", momSymptoms: "Saçlarınız ve tırnaklarınız hamilelik hormonları sayesinde daha hızlı uzayabilir." },
  12: { week: 12, fruit: "Erik", emoji: "🍑", size: "54 mm", babyDevelopment: "Refleksleri gelişiyor! Karnınıza dokunursanız o da içeriden tepki verebilir.", momSymptoms: "İlk trimesterin sonuna geldiniz, düşük riski büyük oranda azaldı! Enerjiniz geri geliyor." },
  13: { week: 13, fruit: "Limon", emoji: "🍋", size: "74 mm", babyDevelopment: "Parmak izleri oluşmaya başladı! Ses telleri gelişiyor.", momSymptoms: "İkinci trimestere hoş geldiniz! Enerjiniz artıyor ve bulantılar büyük ihtimalle bitti." },
  14: { week: 14, fruit: "Şeftali", emoji: "🍑", size: "87 mm", babyDevelopment: "Bebeğiniz artık yüz ifadeleri (gülümseme, kaş çatma) yapabiliyor.", momSymptoms: "Karnınız hafiften belirginleşmeye başlayabilir." },
  15: { week: 15, fruit: "Elma", emoji: "🍏", size: "10 cm", babyDevelopment: "Bebeğiniz ışığı hissedebilir. Kemikleri giderek sertleşiyor.", momSymptoms: "Bazen karnınızda hafif seğirmeler (bebek hareketleri) hissedebilirsiniz." },
  16: { week: 16, fruit: "Avokado", emoji: "🥑", size: "11.6 cm", babyDevelopment: "Kulakları yerini aldı ve duymaya başlıyor! Ona şarkı söyleyebilirsiniz.", momSymptoms: "Bebeğinizin o tatlı minik tekmelerini hissetmeye başlayacağınız haftalardasınız." },
  17: { week: 17, fruit: "Nar", emoji: "🍅", size: "13 cm", babyDevelopment: "Bebeğinizin iskeleti kıkırdaktan kemiğe dönüşüyor ve kordonu kalınlaşıp güçleniyor.", momSymptoms: "İştahınız artabilir, sağlıklı atıştırmalıklar tüketmeye özen gösterin." },
  18: { week: 18, fruit: "Tatlı Patates", emoji: "🍠", size: "14.2 cm", babyDevelopment: "Bebeğiniz artık esneyebiliyor, hıçkırabiliyor ve yutkunabiliyor.", momSymptoms: "Bebeğinizin hareketlerini artık daha net bir şekilde hissedebilirsiniz!" },
  19: { week: 19, fruit: "Mango", emoji: "🥭", size: "15.3 cm", babyDevelopment: "Bebeğinizin cildi Verniks adı verilen koruyucu bir tabaka ile kaplanıyor.", momSymptoms: "Büyüyen rahim sebebiyle hafif bel veya kasık ağrıları olabilir." },
  20: { week: 20, fruit: "Muz", emoji: "🍌", size: "16.4 cm", babyDevelopment: "Yolun yarısındasınız! Bebeğinizin uyku/uyanıklık döngüsü oluşmaya başladı.", momSymptoms: "Göbek deliğiniz dışarı doğru çıkmaya başlayabilir, bu çok normaldir." },
  21: { week: 21, fruit: "Havuç", emoji: "🥕", size: "26.7 cm", babyDevelopment: "Bebeğiniz artık sizin ne yediğinizi tadabiliyor, amniyotik sıvı yediklerinize göre tatlanıyor.", momSymptoms: "Ayaklarınızda ve bileklerinizde hafif şişmeler (ödem) başlayabilir." },
  22: { week: 22, fruit: "Papaya", emoji: "🍈", size: "27.8 cm", babyDevelopment: "Bebeğinizin dudakları, kaşları ve minik kirpikleri çok daha belirgin hale geldi.", momSymptoms: "Büyüyen göbeğiniz sebebiyle sırt ağrıları yaşayabilirsiniz, duruşunuza dikkat edin." },
  23: { week: 23, fruit: "Greyfurt", emoji: "🍊", size: "28.9 cm", babyDevelopment: "Akciğerlerindeki damarlar gelişiyor ve nefes alma pratikleri yapıyor.", momSymptoms: "Braxton Hicks denilen yalancı doğum kasılmalarını hafifçe hissetmeye başlayabilirsiniz." },
  24: { week: 24, fruit: "Kavun", emoji: "🍈", size: "30 cm", babyDevelopment: "Bebeğinizin iç kulağı tamamen gelişti, artık dengesini hissedebiliyor.", momSymptoms: "Gözlerinizde kuruluk veya hassasiyet olabilir." },
  25: { week: 25, fruit: "Karnabahar", emoji: "🥦", size: "34.6 cm", babyDevelopment: "Cildi yavaş yavaş pürüzsüzleşiyor ve bebek yağları oluşuyor.", momSymptoms: "Midenizde yanma (reflü) hissedebilirsiniz, az ve sık yemeye çalışın." },
  26: { week: 26, fruit: "Marul", emoji: "🥬", size: "35.6 cm", babyDevelopment: "Bebeğiniz gözlerini açmaya başladı! Göz rengi şu an oluşum aşamasında.", momSymptoms: "Uyku problemleri veya garip rüyalar görebilirsiniz." },
  27: { week: 27, fruit: "Karnabahar", emoji: "🥦", size: "36.6 cm", babyDevelopment: "Bebeğiniz artık sizin sesinize ve dokunuşunuza daha çok tepki veriyor.", momSymptoms: "İkinci trimesterin sonundasınız! Kasılmalarınız biraz daha belirginleşebilir." },
  28: { week: 28, fruit: "Patlıcan", emoji: "🍆", size: "37.6 cm", babyDevelopment: "Üçüncü trimestere girdiniz! Bebeğiniz rüya görüyor olabilir.", momSymptoms: "Doktor ziyaretleriniz artık daha sık (iki haftada bir) yapılmaya başlanabilir." },
  29: { week: 29, fruit: "Bal Kabağı", emoji: "🎃", size: "38.6 cm", babyDevelopment: "Kemikleri tamamen gelişti ama hala esnek.", momSymptoms: "Artan ağırlık sebebiyle yorgunluk ve nefes darlığı hissedebilirsiniz." },
  30: { week: 30, fruit: "Lahana", emoji: "🥬", size: "39.9 cm", babyDevelopment: "Bebeğinizin beyni inanılmaz bir hızla büyüyor ve kıvrımları oluşuyor.", momSymptoms: "Bebeğiniz büyüdüğü için midenize baskı yapabilir." },
  31: { week: 31, fruit: "Hindistan Cevizi", emoji: "🥥", size: "41.1 cm", babyDevelopment: "Bebeğinizin beş duyusu da tamamen çalışıyor.", momSymptoms: "Sık idrara çıkma ihtiyacı tekrar artabilir." },
  32: { week: 32, fruit: "Kavun", emoji: "🍈", size: "42.4 cm", babyDevelopment: "Bebeğiniz büyük ihtimalle baş aşağı doğum pozisyonunu almış olabilir.", momSymptoms: "Ara sıra nefes darlığı yaşayabilirsiniz, dinlenmeyi ihmal etmeyin." },
  33: { week: 33, fruit: "Ananas", emoji: "🍍", size: "43.7 cm", babyDevelopment: "Bebeğinizin bağışıklık sistemi güçleniyor, antikorları sizden alıyor.", momSymptoms: "Bebek tekmeleri artık daha sert ve keskin hissedilebilir." },
  34: { week: 34, fruit: "Kavun", emoji: "🍈", size: "45 cm", babyDevelopment: "Akciğerleri artık kendi başına nefes alabilecek kadar olgunlaştı.", momSymptoms: "Uyumak için rahat pozisyon bulmakta zorlanabilirsiniz. Yastıklarla destekleyin." },
  35: { week: 35, fruit: "Karpuz", emoji: "🍉", size: "46.2 cm", babyDevelopment: "Böbrekleri tamamen gelişti ve karaciğeri atıkları işleyebiliyor.", momSymptoms: "Doktorunuz sizden hareketleri daha sık saymanızı isteyebilir." },
  36: { week: 36, fruit: "Papaya", emoji: "🍈", size: "47.4 cm", babyDevelopment: "Bebeğiniz artık günde yaklaşık 30 gram kilo alıyor.", momSymptoms: "Bebeğiniz aşağıya, pelvise doğru inebilir (nişan gelmesi). Rahat nefes alabilirsiniz." },
  37: { week: 37, fruit: "Kış Kavunu", emoji: "🍈", size: "48.6 cm", babyDevelopment: "Tebrikler! Bebeğiniz artık 'erken doğum' sınırından çıktı, tam gününde sayılıyor.", momSymptoms: "Vajinal akıntıda artış veya sümüksü tıkaç (nişan) düşmesi olabilir." },
  38: { week: 38, fruit: "Balkabağı", emoji: "🎃", size: "49.8 cm", babyDevelopment: "Bebeğinizin organ gelişimi bitti, artık sadece bolca yağ depoluyor.", momSymptoms: "Artık her an doğum başlayabilir, çantanız kapıda hazır olsun!" },
  39: { week: 39, fruit: "Küçük Karpuz", emoji: "🍉", size: "50.7 cm", babyDevelopment: "Bebeğinizin cildi kalınlaşıyor, yeni doğan görünümünü kazandı.", momSymptoms: "Kasılmalar sıklaşıyor mu diye takipte olun." },
  40: { week: 40, fruit: "Büyük Karpuz", emoji: "🍉", size: "51.2 cm", babyDevelopment: "Büyük gün! Bebeğiniz dış dünyaya tamamen hazır, gelmek için doğru zamanı bekliyor.", momSymptoms: "Sabırsızlanıyorsunuz! Doktorunuz süreci yakından takip edecektir." },
  41: { week: 41, fruit: "Jackfruit", emoji: "🍈", size: "51.7 cm", babyDevelopment: "Hala içeride rahat olabilir. Sizin antikorlarınızı bol bol almaya devam ediyor.", momSymptoms: "Gecikme normaldir. Doktorunuz düzenli NST kontrollerine çağıracaktır." },
  42: { week: 42, fruit: "Dev Karpuz", emoji: "🍉", size: "51.8 cm", babyDevelopment: "Son anlar! Doktorunuz muhtemelen müdahale planı yapmıştır.", momSymptoms: "Artık bebeğinizi kucağınıza almanıza çok çok az kaldı." },
};

export const getWeeklyData = (week: number): WeeklyData => {
  if (weeklyData[week]) return weeklyData[week];
  
  if (week < 4) {
    return {
      week,
      fruit: "Minik Bir Tohum",
      emoji: "✨",
      size: "Mikroskobik",
      babyDevelopment: "Şu an döllenme ve rahme yerleşme aşamasında. Yolculuk yeni başlıyor!",
      momSymptoms: "Bu haftalarda hamileliğin ilk erken belirtileri (yorgunluk, hafif lekelenme) görülebilir."
    };
  }
  
  return {
    week,
    fruit: "Sürpriz Meyve",
    emoji: "✨",
    size: "Hızla büyüyor",
    babyDevelopment: "Bebeğiniz her geçen gün büyümeye ve güçlenmeye devam ediyor.",
    momSymptoms: "Vücudunuz bu muhteşem değişime uyum sağlamaya devam ediyor."
  };
};
