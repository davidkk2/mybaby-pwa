import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { LogOut, Heart, Sparkles, Stethoscope, X, Baby, Star } from 'lucide-react';
import Navigation from '../components/Navigation';
import BlogSection, { type BlogEntry } from '../components/BlogSection';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ReactMarkdown from 'react-markdown';

export default function BornDashboard({ profile, onReset }: { profile: any, onReset: () => void }) {

  const [coachMessage, setCoachMessage] = useState("Gelişim analiz ediliyor...");
  const [dailyTip, setDailyTip] = useState({ title: "Asistanınız Düşünüyor...", text: "Verileriniz yapay zeka tarafından analiz ediliyor...", icon: <Sparkles size={24} color="var(--color-primary)"/> });
  const [dynamicInfo, setDynamicInfo] = useState({ babyDev: "Yükleniyor...", tips: "Yükleniyor..." });
  const [showPopup, setShowPopup] = useState(false);
  const [isAILoading, setIsAILoading] = useState(true);
  const [alertCard, setAlertCard] = useState<{hasAlert: boolean, topic: string, title: string, description: string} | null>(null);
  const [showAssistantModal, setShowAssistantModal] = useState(false);
  const [assistantMessage, setAssistantMessage] = useState("");
  const [isAssistantLoading, setIsAssistantLoading] = useState(false);
  const [blogs, setBlogs] = useState<BlogEntry[]>([]);

  // Baby Age Calculations
  const birthDate = profile.birthDate ? new Date(profile.birthDate) : new Date();
  const today = new Date();
  today.setHours(0,0,0,0);
  const diffTime = today.getTime() - birthDate.getTime();
  const babyAgeDays = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
  const babyAgeWeeks = Math.floor(babyAgeDays / 7);
  const babyAgeMonths = Math.floor(babyAgeDays / 30);

  let phase = "Lohusalık ve Yeni Doğan";
  let phaseColor = "var(--color-accent)";
  let phaseIcon = <Baby size={32} />;
  let phaseSub = "Bebeğinizle yeni bir hayata alışıyorsunuz.";

  if (babyAgeDays <= 40) {
    phase = "Lohusalık ve Yeni Doğan";
    phaseColor = "var(--color-accent)";
    phaseSub = "Bebeğinizle tanışma ve alışma süreci.";
  } else if (babyAgeDays <= 180) {
    phase = "İlk 6 Ay (Bebeklik)";
    phaseColor = "var(--color-secondary)";
    phaseSub = "Hızlı büyüme ve sadece anne sütü/mama.";
  } else if (babyAgeDays <= 365) {
    phase = "Ek Gıdaya Geçiş ve Gelişim";
    phaseColor = "var(--color-primary)";
    phaseSub = "Hareketlenme ve yeni tatlar keşfetme.";
  } else {
    phase = "Oyun Çocuğu";
    phaseColor = "#ff8a8a";
    phaseSub = "Dünyayı keşfeden bir çocuk!";
  }

  useEffect(() => {
    const fetchAIInsights = async () => {
      try {
        // Check cache first
        const cacheKey = `born_ai_cache_${babyAgeDays}_${profile.weight}_${profile.age}_${profile.height}_${profile.isWorking}_${profile.workStart}_${profile.workEnd}_${profile.primaryGoal}_${new Date().toDateString()}`;
        const cached = sessionStorage.getItem(cacheKey);
        
        if (cached) {
          const aiData = JSON.parse(cached);
          setCoachMessage(aiData.coachMessage);
          setDynamicInfo({ babyDev: aiData.babyDev, tips: aiData.tips });
          setDailyTip({
            title: aiData.dailyTip.title,
            text: aiData.dailyTip.text,
            icon: <Sparkles size={24} color="var(--color-primary)" />
          });
          if (aiData.alertCard && aiData.alertCard.hasAlert) setAlertCard(aiData.alertCard);
          if (aiData.blogs && Array.isArray(aiData.blogs)) setBlogs(aiData.blogs);
          
          setIsAILoading(false);
          setTimeout(() => setShowPopup(true), 800);
          return;
        }

        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `Sen uzman, şefkatli ve destekleyici bir "Doğum Sonrası (Postpartum) ve Bebek Gelişimi Asistanısın".
Kullanıcının profili: Yaş: ${profile.age}, Kilo: ${profile.weight}, Çalışma Durumu: ${profile.isWorking ? 'Çalışıyor' : 'Çalışmıyor'}.
Durum: Bebeği ${babyAgeDays} günlük (Yaklaşık ${babyAgeMonths} aylık / ${babyAgeWeeks} haftalık). Evre: "${phase}".

DİKKAT! KULLANICININ UYGULAMADAKİ ANA HEDEFİ ŞUDUR: "${profile.primaryGoal === 'mom_focus' ? 'Kendi vücudundaki lohusalık değişimleri, psikolojisi ve toparlanmasını öncelikli olarak takip etmek.' : profile.primaryGoal === 'medical_focus' ? 'Tıbbi süreci, bebek kontrollerini ve olası komplikasyonları ciddiye almak.' : 'Bebeğin gelişimini yakından takip etmek ve bebeği önceliklendirmek.'}". 

Görev 1: Kullanıcıya (anneye) okuyacağı, moral verici, şefkatli ve profesyonel bir mesaj yaz (coachMessage). Anneliği öv ve mesaj tonunu ANA HEDEFE göre ayarla.
Görev 2: Bebeğin ${babyAgeDays} günlük gelişimine ve annenin uyku/stres durumuna uygun bir günlük tavsiye ver (dailyTip). ANA HEDEF'i dikkate al.
Görev 3: Bebeğin şu anki ayında/haftasında vücudunda, motor ve zihinsel gelişiminde neler olduğunu detaylı anlat (babyDev).
Görev 4: Annenin lohusalık/doğum sonrası vücut toparlanması ve ruh sağlığı için yapması gerekenler hakkında akıcı bir tavsiye metni ver (tips).
Görev 5: Annenin durumu veya bebeğin yaşı riskli bir aşı/kontrol dönemi ise veya dikkat edilmesi gereken bir semptom (örn: lohusa depresyonu, ateş vs.) için "Kontrol Zamanı" kartı oluştur. Yoksa false döndür.
Görev 6: Kullanıcının şu anki lohusalık/bebek evresine uygun 6 adet kişiye özel blog yazısı başlığı ve özeti üret (blogs). Her blog için id (1-6 sayı), title, summary (1-2 cümle), tags (1-2 etiket: Beslenme, Psikoloji, Egzersiz, Tıbbi, Bebek, Yaşam, İpucu), emoji üret.

Lütfen SADECE aşağıdaki JSON formatında cevap ver, Markdown KULLANMA:
{
  "coachMessage": "Sevgili taze anne...",
  "dailyTip": {
    "title": "Tavsiye Başlığı",
    "text": "Tavsiye detayı..."
  },
  "babyDev": "...",
  "tips": "...",
  "alertCard": {
    "hasAlert": true,
    "topic": "Semptom/Durum",
    "title": "Uzman Görüşü Alın",
    "description": "Açıklama"
  },
  "blogs": [
    { "id": 1, "title": "...", "summary": "...", "tags": ["Bebek"], "emoji": "🍼" }
  ]
}
`;
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const aiData = JSON.parse(cleanJson);
        
        setCoachMessage(aiData.coachMessage);
        setDynamicInfo({ babyDev: aiData.babyDev, tips: aiData.tips });
        setDailyTip({
          title: aiData.dailyTip.title,
          text: aiData.dailyTip.text,
          icon: <Sparkles size={24} color="var(--color-primary)" />
        });
        if (aiData.alertCard && aiData.alertCard.hasAlert) {
          setAlertCard(aiData.alertCard);
        }
        if (aiData.blogs && Array.isArray(aiData.blogs)) {
          setBlogs(aiData.blogs);
        }
        
        sessionStorage.setItem(cacheKey, JSON.stringify(aiData));
        
        setIsAILoading(false);
        setTimeout(() => setShowPopup(true), 800);
        
      } catch (err) {
        console.error("AI Error", err);
        setCoachMessage("Bugün bebeğinizle birlikte sadece anın tadını çıkarın. Harika bir iş çıkarıyorsunuz.");
        setDynamicInfo({ babyDev: "Bebeğiniz her gün yeni şeyler öğrenerek büyümeye devam ediyor.", tips: "Kendinize şefkat gösterin, dinlenmek en doğal ihtiyacınız." });
        setDailyTip({
           title: "Derin Bir Nefes Alın",
           text: "Anneliğin ilk günleri zorlayıcı olabilir. Siz harika bir annesiniz, yardıma ihtiyaç duymak çok normal.",
           icon: <Heart size={24} color="var(--color-primary)" />
        });
        setIsAILoading(false);
        setTimeout(() => setShowPopup(true), 800);
      }
    };

    fetchAIInsights();
  }, [profile, babyAgeDays, phase]);

  const handleOpenAssistant = async (topic: string) => {
    setShowAssistantModal(true);
    setIsAssistantLoading(true);
    setAssistantMessage("");
    
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      
      const prompt = `Sen uzman bir bebek gelişimi ve pediatri asistanısın. Kullanıcı yeni doğum yaptı. Bebeği ${babyAgeDays} günlük.
      Kullanıcının profili: ${JSON.stringify(profile)}
      Odaklanmak istediği konu: "${topic}".
      Lütfen bu konu hakkında yeni anneye çok sempatik, rahatlatıcı, şefkatli ve KISA bir açıklama yap. Bebek bakımı veya lohusalıkla ilgili bilimsel verileri sıkıcı olmayan, bol emojili ve sıcak bir sohbet havasında anlat. Annenin uykusuz ve yorgun olabileceğini unutma; bu yüzden çok uzun paragraflardan kaçın, moral ver ve tavsiyeleri kısa "hap bilgiler" şeklinde ver. Cevabını Markdown formatında (kalın başlıklar, kısa maddeler vb.) çok şık ve okuması kolay olacak şekilde biçimlendir.`;
      
      const result = await model.generateContent(prompt);
      setAssistantMessage(result.response.text());
      setIsAssistantLoading(false);
    } catch(err) {
      setAssistantMessage("Şu anda sisteme bağlanamıyorum, lütfen daha sonra tekrar deneyin.");
      setIsAssistantLoading(false);
    }
  };

  const getDaysUntilAppointment = () => {
    if (!profile?.nextAppointmentDate) return null;
    const appt = new Date(profile.nextAppointmentDate);
    const today = new Date();
    today.setHours(0,0,0,0);
    const diffTime = appt.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 ? diffDays : null;
  };

  const daysToAppt = getDaysUntilAppointment();

  return (
    <>
      <AnimatePresence>
        {showPopup && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(255, 251, 245, 0.7)', backdropFilter: 'blur(12px)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1.5rem' }}
          >
            <motion.div
              initial={{ scale: 0.5, y: 100, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.8, y: 20, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.5, duration: 0.8 }} className="glass-card"
              style={{ maxWidth: '350px', width: '100%', padding: '2rem 1.5rem', border: '3px solid var(--color-accent)', textAlign: 'center', position: 'relative', boxShadow: '0 25px 50px rgba(198, 194, 245, 0.3)' }}
            >
              <motion.div 
                animate={{ rotate: [0, -10, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
                style={{ position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)', width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'var(--color-accent)', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: 'var(--shadow-md)' }}
              >
                <Baby size={30} />
              </motion.div>
              <h2 style={{ marginTop: '1rem', color: 'var(--color-accent)', fontSize: '1.3rem' }}>Koçunuzdan Mesaj</h2>
              <p style={{ fontSize: '1.1rem', fontStyle: 'italic', margin: '1rem 0', color: 'var(--color-text-main)' }}>"{coachMessage}"</p>
              <button className="btn-primary" onClick={() => setShowPopup(false)} style={{ width: '100%', padding: '0.8rem', fontSize: '1rem', background: 'var(--color-accent)' }}>
                Teşekkürler <Heart size={16} fill="white" />
              </button>
            </motion.div>
          </motion.div>
        )}

        {showAssistantModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(8px)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}
            onClick={() => setShowAssistantModal(false)}
          >
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              className="glass-card" onClick={e => e.stopPropagation()}
              style={{ width: '100%', maxWidth: '600px', maxHeight: '85vh', overflowY: 'auto', borderBottomLeftRadius: 0, borderBottomRightRadius: 0, padding: '2rem 1.5rem', borderTop: '4px solid #e74c3c', backgroundColor: 'var(--color-bg)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0, color: '#e74c3c', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Stethoscope size={24} /> {alertCard?.topic}</h3>
                <button onClick={() => setShowAssistantModal(false)} style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}><X size={24} /></button>
              </div>
              {isAssistantLoading ? (
                <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--color-text-muted)' }}>
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} style={{ display: 'inline-block', marginBottom: '1rem' }}><Sparkles size={32} color="#e74c3c" /></motion.div>
                  <p>Tıbbi verileriniz analiz ediliyor...</p>
                </div>
              ) : (
                <div style={{ color: 'var(--color-text-main)', fontSize: '1rem', lineHeight: 1.6 }} className="markdown-content">
                  <ReactMarkdown>{assistantMessage}</ReactMarkdown>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ padding: 0, maxWidth: '600px', margin: '0 auto', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg)' }}>
        
        {/* Cinematic Hero Section for Born */}
        <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', background: `linear-gradient(135deg, ${phaseColor}88, var(--color-bg))`, overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          
          <motion.div 
            animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            style={{ position: 'absolute', width: '250px', height: '250px', borderRadius: '50%', background: 'white', filter: 'blur(40px)', zIndex: 1 }}
          />

          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
            <h1 style={{ margin: 0, fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'white', textShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
              <Star size={22} color="white" /> Doğum Sonrası
            </h1>
            <button onClick={onReset} style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', backdropFilter: 'blur(10px)', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <LogOut size={18} />
            </button>
          </div>

          <div style={{ zIndex: 10, textAlign: 'center', color: 'var(--color-text-main)' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>Bebeğiniz</div>
            <div style={{ fontSize: '4.5rem', fontWeight: '900', lineHeight: 1.1, color: 'white', textShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>{babyAgeMonths > 0 ? babyAgeMonths : babyAgeWeeks > 0 ? babyAgeWeeks : babyAgeDays}</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>{babyAgeMonths > 0 ? 'Aylık' : babyAgeWeeks > 0 ? 'Haftalık' : 'Günlük'}</div>
          </div>

          <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '80px', background: 'linear-gradient(to top, var(--color-bg), transparent)', zIndex: 5 }}></div>
        </div>

        {/* Content Section */}
        <div style={{ flex: 1, background: 'var(--color-bg)', borderTopLeftRadius: '30px', borderTopRightRadius: '30px', marginTop: '-30px', position: 'relative', zIndex: 20, padding: '2rem 1.5rem 6rem' }}>
          
          {/* Phase Banner */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem', padding: '1.2rem', background: 'white', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', borderLeft: `6px solid ${phaseColor}` }}>
            <div style={{ color: phaseColor }}>
              {phaseIcon}
            </div>
            <div>
              <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: '800', color: 'var(--color-text-main)' }}>{phase}</p>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{phaseSub}</p>
            </div>
          </div>

          {/* Upcoming Appointment Banner */}
          {daysToAppt !== null && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              style={{ background: 'linear-gradient(90deg, var(--color-accent), #a8a4d4)', padding: '1rem 1.5rem', borderRadius: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white', marginBottom: '2rem', boxShadow: '0 8px 20px rgba(198,194,245,0.4)' }}
            >
              <div>
                <h4 style={{ margin: '0 0 0.2rem 0', fontSize: '1.1rem' }}>Pediatri/Doktor Randevusu</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.9 }}>{new Date(profile.nextAppointmentDate).toLocaleDateString('tr-TR')} {profile.nextAppointmentTime && `- ${profile.nextAppointmentTime}`}</p>
              </div>
              <div style={{ background: 'white', color: 'var(--color-accent)', padding: '0.5rem 1rem', borderRadius: '12px', fontWeight: 'bold', fontSize: '1.1rem', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                {daysToAppt === 0 ? 'Bugün!' : `${daysToAppt} Gün Kaldı`}
              </div>
            </motion.div>
          )}

          {/* Alert Card / Kontrol Zamanı */}
          {alertCard?.hasAlert && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => handleOpenAssistant(alertCard.topic)}
              style={{ background: 'linear-gradient(135deg, rgba(231,76,60,0.1), rgba(231,76,60,0.05))', border: '1px solid rgba(231,76,60,0.2)', padding: '1.2rem', borderRadius: '16px', marginBottom: '2rem', cursor: 'pointer', boxShadow: '0 4px 15px rgba(231,76,60,0.1)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#e74c3c', marginBottom: '0.5rem' }}><Stethoscope size={24} /><h3 style={{ margin: 0, fontSize: '1.1rem' }}>Uzman Tavsiyesi Gerekli</h3></div>
              <h4 style={{ margin: '0 0 0.4rem 0', color: 'var(--color-text-main)', fontSize: '1rem' }}>{alertCard.title}</h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{alertCard.description} <b>Asistanla konuşmak için dokunun.</b></p>
            </motion.div>
          )}

          {/* Minimalist Info Texts */}
          <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
            <div>
              <h4 style={{ margin: '0 0 0.6rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)', fontSize: '1.2rem', fontWeight: '700' }}><Baby size={20} /> Bebeğinizin Gelişimi</h4>
              <p style={{ margin: 0, fontSize: '1.05rem', lineHeight: 1.6, color: 'var(--color-text-main)' }}>{isAILoading ? 'Yapay Zeka Analiz Ediyor...' : dynamicInfo.babyDev}</p>
            </div>
            <div>
              <h4 style={{ margin: '0 0 0.6rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-secondary)', fontSize: '1.2rem', fontWeight: '700' }}><Heart size={20} /> Annelik & Toparlanma</h4>
              <p style={{ margin: 0, fontSize: '1.05rem', lineHeight: 1.6, color: 'var(--color-text-main)' }}>{isAILoading ? 'Yapay Zeka Analiz Ediyor...' : dynamicInfo.tips}</p>
            </div>
          </div>

          <div style={{ height: '1px', background: 'rgba(0,0,0,0.06)', margin: '2rem 0' }}></div>

          {/* Elegant Daily Tip Panel */}
          <div style={{ padding: '1.5rem', borderRadius: '24px', background: 'linear-gradient(135deg, rgba(255, 196, 164, 0.15) 0%, rgba(212, 224, 181, 0.2) 100%)', display: 'flex', gap: '1rem', alignItems: 'flex-start', border: '2px solid white', boxShadow: '0 8px 20px rgba(0,0,0,0.02)' }}>
            <div style={{ color: 'var(--color-primary)', marginTop: '2px', background: 'white', padding: '0.6rem', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
              {dailyTip.icon}
            </div>
            <div>
              <h4 style={{ margin: '0 0 0.4rem 0', fontSize: '1.15rem', color: 'var(--color-primary)', fontWeight: '800' }}>{dailyTip.title}</h4>
              <p style={{ margin: 0, fontSize: '1rem', color: 'var(--color-text-main)', lineHeight: 1.5 }}>{dailyTip.text}</p>
            </div>
          </div>

          {/* Personalized Blog Section */}
          <BlogSection blogs={blogs} profile={profile} isLoading={isAILoading} />

        </div>
      </motion.div>
      <Navigation />
    </>
  );
}
