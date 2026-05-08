import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LogOut, Heart, Sparkles, Activity, Scale, MessageCircleHeart, Info, Stethoscope, X, CheckCircle2, Circle, ListTodo } from 'lucide-react';
import { getWeeklyData, type WeeklyData } from '../data/weeklyData';
import Navigation from '../components/Navigation';
import BlogSection, { type BlogEntry } from '../components/BlogSection';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ReactMarkdown from 'react-markdown';
import TTCDashboard from './TTCDashboard';
import BornDashboard from './BornDashboard';
import WeekTimeline from '../components/WeekTimeline';

export default function Dashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [babyMessage, setBabyMessage] = useState("Annecim sana ulaşmaya çalışıyorum...");
  const [dailyTip, setDailyTip] = useState({ title: "Asistanınız Düşünüyor...", text: "Doktor notlarınız ve verileriniz yapay zeka tarafından analiz ediliyor...", icon: <Sparkles size={24} color="var(--color-primary)"/> });
  const [dynamicInfo, setDynamicInfo] = useState({ babyDev: "Yükleniyor...", momSymp: "Yükleniyor..." });
  const [showPopup, setShowPopup] = useState(false);
  const [weekInfo, setWeekInfo] = useState<WeeklyData | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [currentVisit, setCurrentVisit] = useState<any>(null);
  const [isAILoading, setIsAILoading] = useState(true);
  const [alertCard, setAlertCard] = useState<{hasAlert: boolean, topic: string, title: string, description: string} | null>(null);
  const [checklist, setChecklist] = useState<{id: number, title: string, description: string, completed?: boolean}[]>([]);
  const [showAssistantModal, setShowAssistantModal] = useState(false);
  const [assistantMessage, setAssistantMessage] = useState("");
  const [isAssistantLoading, setIsAssistantLoading] = useState(false);
  const [blogs, setBlogs] = useState<BlogEntry[]>([]);

  useEffect(() => {
    const data = localStorage.getItem('mybaby_profile');
    if (data) {
      const parsed = JSON.parse(data);
      
      // Live dynamic week calculation based on adjustedLmpDate (never out of sync)
      if (parsed.adjustedLmpDate) {
         const lmp = new Date(parsed.adjustedLmpDate);
         const today = new Date();
         today.setHours(0,0,0,0);
         const diffTime = today.getTime() - lmp.getTime();
         const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
         parsed.weeks = Math.max(0, Math.min(Math.floor(diffDays / 7), 42));
      }
      
      setProfile(parsed);
      
      const currentSelectedWeek = selectedWeek === null ? parsed.weeks : selectedWeek;
      if (selectedWeek === null) {
        setSelectedWeek(parsed.weeks);
        return; // Wait for state update to trigger the actual fetch
      }
      
      if (parsed.status === 'pregnant') {
        setWeekInfo(getWeeklyData(currentSelectedWeek));
      }

      let visits: any[] = [];
      const visitsData = localStorage.getItem('mybaby_visits');
      if (visitsData) {
        visits = JSON.parse(visitsData);
        const thisWeekVisit = visits.find((v: any) => v.week === currentSelectedWeek);
        if (thisWeekVisit) setCurrentVisit(thisWeekVisit);
      }

      const fetchAIInsights = async () => {
        try {
          // Check daily cache first
          const cacheKey = `mybaby_ai_cache_${currentSelectedWeek}_${parsed.primaryGoal}_${parsed.weight}_${parsed.age}_${parsed.height}_${parsed.prePregnancyWeight}_${parsed.isWorking}_${parsed.workStart}_${parsed.workEnd}_${parsed.nextAppointmentDate || 'no'}_${new Date().toDateString()}`;
          const cached = sessionStorage.getItem(cacheKey);
          
          if (cached === 'loading') {
            return; // Prevent parallel concurrent API calls in StrictMode
          }

          if (cached && cached !== 'loading') {
            const aiData = JSON.parse(cached);
            setBabyMessage(aiData.babyMessage);
            setDynamicInfo({ babyDev: aiData.babyDev, momSymp: aiData.momSymp });
            setDailyTip({ title: aiData.dailyTip.title, text: aiData.dailyTip.text, icon: <Sparkles size={24} color="var(--color-primary)" /> });
            if (aiData.alertCard && aiData.alertCard.hasAlert) setAlertCard(aiData.alertCard);
            if (aiData.checklist) setChecklist(aiData.checklist);
            if (aiData.blogs && Array.isArray(aiData.blogs)) setBlogs(aiData.blogs);
            setIsAILoading(false);
            if (currentSelectedWeek === parsed.weeks) {
              setTimeout(() => setShowPopup(true), 800);
            }
            return;
          }

          // Mark as loading to prevent duplicate simultaneous fetches
          sessionStorage.setItem(cacheKey, 'loading');

          const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
          const genAI = new GoogleGenerativeAI(apiKey);
          const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
          
          const currentWeekData = getWeeklyData(currentSelectedWeek);

          const prompt = `Sen çok tatlı, sevecen, empatik ve uzman bir hamilelik asistanı yapay zekasın. 
Kullanıcının genel profil bilgileri: ${JSON.stringify(parsed)} (Kullanıcı normalde ${parsed.weeks}. haftada).
Kullanıcı şu an sistemden ${currentSelectedWeek}. haftanın bilgilerini inceliyor! Tavsiyelerini ve bebek gelişimini ${currentSelectedWeek}. haftaya göre ver.
Kullanıcının doktor muayene notları: ${JSON.stringify(visits)}
Bu incelenen (${currentSelectedWeek}.) haftanın genel tıbbi bilgileri: Bebek gelişimi: "${currentWeekData.babyDevelopment}". Anne belirtileri: "${currentWeekData.momSymptoms}".

DİKKAT! KULLANICININ UYGULAMADAKİ ANA HEDEFİ ŞUDUR: "${parsed.primaryGoal === 'mom_focus' ? 'Kendi vücudundaki değişimleri ve belirtileri öncelikli olarak takip etmek.' : parsed.primaryGoal === 'medical_focus' ? 'Olası komplikasyonları, tıbbi süreci ve ilaçları çok ciddiye almak ve tıbbi odaklı kalmak.' : 'Bebeğin gelişimini yakından takip etmek ve heyecanını paylaşmak.'}". 

Görev 1: Bebeğin ağzından, anneyi çok mutlu edecek aşırı kısa ve tatlı bir mesaj yaz (babyMessage). Ana hedefe göre tonu ayarla.
Görev 2: Kullanıcının YAŞINA ve profiline uygun GÜNLÜK TAVSİYE ver (dailyTip). Kesinlikle blog yazısı gibi uzun olmasın, KISA ve samimi olsun (maksimum 2 cümle).
Görev 3: Bebek Gelişimi metnini kişiye özel yeniden yaz (babyDev). Profesyonel ve sıcak bir hamilelik uygulaması tarzında, bebeğin şu anki boyutunu (Örn: mercimek tanesi) ve çok ilginç 1-2 bilimsel gerçeğini ekle. Ancak KESİNLİKLE kısa, okuması eğlenceli ve hap bilgi şeklinde olsun (maksimum 3 cümle). Markdown ile **kalın yazılar** kullan.
Görev 4: Anne Belirtileri metnini ona özel hale getirerek yeniden yaz (momSymp). Çok KISA, motive edici ve sohbet havasında olsun (maksimum 3 cümle). Markdown kullan.
Görev 5: Kullanıcının doktor notlarında, seçtiği ana hedefte veya bu haftanın genel belirtilerinde anne için dikkat edilmesi gereken bir durum var mı? Varsa, "Kontrol Zamanı" isimli bir kart için veriler üret. Yoksa "hasAlert": false döndür.
Görev 6: Kullanıcının şu anki hamilelik haftasına uygun 6 adet kişiye özel blog yazısı başlığı ve özeti üret (blogs). 
Görev 7: Bu haftanın gelişim özelliklerine ve kullanıcının profiline göre **3 maddelik kişiye özel bir yapılacaklar listesi** (checklist) hazırla. Örn: "Su Tüketimini Artır", "Folik Asit Kullanımı", "Egzersize Başla". Her maddenin 'id' (1,2,3), 'title' (kısa) ve 'description' (1 cümle) alanları olsun.

Lütfen SADECE aşağıdaki JSON formatında cevap ver, Markdown KULLANMA:
{
  "babyMessage": "Annecim...",
  "dailyTip": {
    "title": "Tavsiye Başlığı",
    "text": "Tavsiye detayı..."
  },
  "babyDev": "...",
  "momSymp": "...",
  "alertCard": {
    "hasAlert": true,
    "topic": "Semptom/Durum Adı",
    "title": "Bu Semptom Hakkında Konuşalım",
    "description": "Kısa bir açıklama cümlesi..."
  },
  "checklist": [
    { "id": 1, "title": "...", "description": "..." }
  ],
  "blogs": [
    { "id": 1, "title": "...", "summary": "...", "tags": ["Beslenme"], "emoji": "🥦" }
  ]
}
`;
          const result = await model.generateContent(prompt);
          const text = result.response.text();
          const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
          const aiData = JSON.parse(cleanJson);
          
          setBabyMessage(aiData.babyMessage);
          setDynamicInfo({ babyDev: aiData.babyDev, momSymp: aiData.momSymp });
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
          if (aiData.checklist) {
            setChecklist(aiData.checklist);
          }

          // Cache for today
          try { sessionStorage.setItem(`mybaby_ai_cache_${currentSelectedWeek}_${parsed.primaryGoal}_${parsed.weight}_${parsed.age}_${parsed.height}_${parsed.prePregnancyWeight}_${parsed.isWorking}_${parsed.workStart}_${parsed.workEnd}_${parsed.nextAppointmentDate || 'no'}_${new Date().toDateString()}`, JSON.stringify(aiData)); } catch(e) {}
          
          setIsAILoading(false);
          if (currentSelectedWeek === parsed.weeks) {
            setTimeout(() => setShowPopup(true), 800);
          }
          
        } catch (err) {
          console.error("AI Error", err);
          sessionStorage.removeItem(`mybaby_ai_cache_${currentSelectedWeek}_${parsed.primaryGoal}_${parsed.weight}_${parsed.age}_${parsed.height}_${parsed.prePregnancyWeight}_${parsed.isWorking}_${parsed.workStart}_${parsed.workEnd}_${parsed.nextAppointmentDate || 'no'}_${new Date().toDateString()}`);
          
          setBabyMessage("Ben buradayım annecim, seninle büyümeye devam ediyorum!");
          const currentWeekData = getWeeklyData(parsed.weeks);
          setDynamicInfo({ babyDev: currentWeekData.babyDevelopment, momSymp: currentWeekData.momSymptoms });
          setDailyTip({
             title: "Dinlenmeyi Unutmayın",
             text: "Gün içinde fırsat buldukça ayaklarınızı uzatarak dinlenmeniz bebeğiniz ve sizin için çok önemli.",
             icon: <Heart size={24} color="var(--color-primary)" />
          });
          // Fallback blogs when AI fails
          setBlogs([
            { id: 1, title: `${parsed.weeks}. Haftada Bebeğinizde Neler Oluyor?`, summary: 'Bu haftanın gelişim aşamalarını öğrenin.', tags: ['Bebek', 'Tıbbi'], emoji: '👶' },
            { id: 2, title: 'Hamilelikte Sağlıklı Beslenme Rehberi', summary: 'Bu dönemde almanız gereken besinler ve vitaminler.', tags: ['Beslenme', 'İpucu'], emoji: '🥗' },
            { id: 3, title: 'Hamilelikte Egzersiz: Neler Yapabilirsiniz?', summary: 'Güvenli egzersiz önerileri ve dikkat edilmesi gerekenler.', tags: ['Egzersiz', 'Yaşam'], emoji: '🧘' },
            { id: 4, title: 'Hamilelikte Ruh Sağlığınızı Korumak', summary: 'Hormonal değişimlerle başa çıkma yolları.', tags: ['Psikoloji', 'Yaşam'], emoji: '💆' },
            { id: 5, title: 'Doktor Kontrollerinde Sormanız Gerekenler', summary: 'Muayenelerde unutmamanız gereken önemli sorular.', tags: ['Tıbbi', 'İpucu'], emoji: '📋' },
            { id: 6, title: 'Hamilelikte Uyku Düzeni ve İpuçları', summary: 'Rahat uyku için pozisyon ve rutinler.', tags: ['Yaşam', 'İpucu'], emoji: '😴' },
          ]);
          setIsAILoading(false);
          setTimeout(() => setShowPopup(true), 800);
        }
      };

      setIsAILoading(true);
      setChecklist([]);
      setAlertCard(null);
      fetchAIInsights();

    } else {
      navigate('/onboarding');
    }
  }, [navigate, selectedWeek]);

  const handleOpenAssistant = async (topic: string) => {
    setShowAssistantModal(true);
    setIsAssistantLoading(true);
    setAssistantMessage("");
    
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      
      const prompt = `Sen uzman bir hamilelik asistanısın. Kullanıcı şu anda ${profile.weeks} haftalık hamile. 
      Kullanıcının profili: ${JSON.stringify(profile)}
      Kullanıcının odaklanmak istediği konu (Semptom/Durum): "${topic}".
      Lütfen bu durum/semptom hakkında kullanıcıya çok sempatik, samimi, şefkatli ve KISA bir açıklama yap. Bilimsel verileri çok sıkıcı olmayan, bol emojili ve sıcak bir sohbet havasında anlat. Heyecanlı ve yorgun bir anne adayının okuyacağını unutma; bu yüzden uzun paragraflardan kaçın, rahatlatıcı ol ve tavsiyeleri kısa "hap bilgiler" şeklinde ver. Sonuna da "Ne zaman doktora başvurmalı?" kısmını ekle. Cevabını Markdown formatında (kalın başlıklar, kısa maddeler vb.) çok şık ve okuması kolay olacak şekilde biçimlendir.`;
      
      const result = await model.generateContent(prompt);
      setAssistantMessage(result.response.text());
      setIsAssistantLoading(false);
    } catch(err) {
      setAssistantMessage("Şu anda sisteme bağlanamıyorum, lütfen daha sonra tekrar deneyin.");
      setIsAssistantLoading(false);
    }
  };

  const handleReset = () => {
    localStorage.removeItem('mybaby_profile');
    localStorage.removeItem('mybaby_visits');
    localStorage.removeItem('mybaby_privacy_accepted');
    sessionStorage.clear();
    navigate('/');
  };

  const toggleChecklistItem = (id: number) => {
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  if (!profile) return null;

  if (profile.status === 'trying') {
    return <TTCDashboard profile={profile} onReset={handleReset} />;
  }

  if (profile.status === 'born') {
    return <BornDashboard profile={profile} onReset={handleReset} />;
  }

  if (!weekInfo) return null;

  const bmi = profile.height && profile.weight 
    ? (Number(profile.weight) / Math.pow(Number(profile.height) / 100, 2)).toFixed(1) 
    : null;

  let remainingDays = Math.max((40 - profile.weeks) * 7, 0);
  let progressPercentage = Math.min((profile.weeks / 40) * 100, 100);

  if (profile.dueDate) {
    const dueDateObj = new Date(profile.dueDate);
    const today = new Date();
    const diffTime = dueDateObj.getTime() - today.getTime();
    remainingDays = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    progressPercentage = Math.max(0, Math.min(((280 - remainingDays) / 280) * 100, 100));
  } else if (profile.lastPeriodDate) {
    const lmpDate = new Date(profile.lastPeriodDate);
    const dueDateObj = new Date(lmpDate.getTime() + 280 * 24 * 60 * 60 * 1000);
    const today = new Date();
    const diffTime = dueDateObj.getTime() - today.getTime();
    remainingDays = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    progressPercentage = Math.max(0, Math.min(((280 - remainingDays) / 280) * 100, 100));
  }

  const getTrimester = (week: number) => {
    if (week <= 12) return "1. Trimester";
    if (week <= 27) return "2. Trimester";
    return "3. Trimester";
  };

  const getMilestoneImage = (week: number) => {
    if (week === 1) return 1;
    if (week === 2) return 2;
    if (week === 3) return 3;
    if (week === 4) return 4;
    if (week >= 5 && week <= 8) return 5;
    if (week >= 9 && week <= 16) return 6;
    if (week >= 17 && week <= 24) return 7;
    if (week >= 25 && week <= 28) return 8;
    if (week >= 29 && week <= 39) return 9;
    return 10;
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
              backgroundColor: 'rgba(255, 251, 245, 0.7)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              zIndex: 9999,
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              padding: '1.5rem'
            }}
          >
            <motion.div
              initial={{ scale: 0.5, y: 100, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 20, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
              className="glass-card"
              style={{
                maxWidth: '350px', width: '100%', padding: '2rem 1.5rem',
                border: '3px solid var(--color-primary)', textAlign: 'center',
                position: 'relative', boxShadow: '0 25px 50px rgba(255, 196, 164, 0.3)'
              }}
            >
              <motion.div 
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
                style={{
                  position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)',
                  width: '60px', height: '60px', borderRadius: '50%',
                  backgroundColor: 'var(--color-primary)', color: 'white',
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  boxShadow: 'var(--shadow-md)'
                }}
              >
                <MessageCircleHeart size={30} />
              </motion.div>

              <h2 style={{ marginTop: '1rem', color: 'var(--color-primary)', fontSize: '1.3rem' }}>Sana bir mesajım var!</h2>
              <p style={{ fontSize: '1.1rem', fontStyle: 'italic', margin: '1rem 0', color: 'var(--color-text-main)' }}>
                "{babyMessage}"
              </p>

              <button className="btn-primary" onClick={() => setShowPopup(false)} style={{ width: '100%', padding: '0.8rem', fontSize: '1rem' }}>
                Canım Bebeğim <Heart size={16} fill="white" />
              </button>
            </motion.div>
          </motion.div>
        )}

        {showAssistantModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              zIndex: 9999,
              display: 'flex', justifyContent: 'center', alignItems: 'flex-end',
            }}
            onClick={() => setShowAssistantModal(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              className="glass-card"
              onClick={e => e.stopPropagation()}
              style={{
                width: '100%', maxWidth: '600px', maxHeight: '85vh', overflowY: 'auto',
                borderBottomLeftRadius: 0, borderBottomRightRadius: 0,
                padding: '2rem 1.5rem', borderTop: '4px solid #e74c3c',
                backgroundColor: 'var(--color-bg)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0, color: '#e74c3c', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Stethoscope size={24} /> {alertCard?.topic}
                </h3>
                <button onClick={() => setShowAssistantModal(false)} style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}>
                  <X size={24} />
                </button>
              </div>

              {isAssistantLoading ? (
                <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--color-text-muted)' }}>
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} style={{ display: 'inline-block', marginBottom: '1rem' }}>
                    <Sparkles size={32} color="#e74c3c" />
                  </motion.div>
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

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ padding: 0, width: '100%', maxWidth: '600px', margin: '0 auto', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg)', overflowX: 'hidden' }}
      >
        {weekInfo && (
          <>
            {/* Cinematic Hero Section */}
            <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', backgroundColor: '#eaddd5' }}>
              <img 
                src={`/images/babycenter/week-${Math.min(Math.max(weekInfo.week, 2), 41)}.jpg`} 
                alt={`${weekInfo.week}. Hafta`} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://placehold.co/800x600/ffc4a4/ffffff?text=${weekInfo.week}.+Hafta`;
                }}
              />
              
              {/* Top Navigation Overlay */}
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
                <h1 style={{ margin: 0, fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'white', textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
                  <Heart size={22} color="var(--color-primary)" fill="var(--color-primary)" />
                  MyBaby
                </h1>
                <button onClick={handleReset} style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', backdropFilter: 'blur(10px)', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                  <LogOut size={18} />
                </button>
              </div>

              {/* Title Overlay */}
              <div style={{ position: 'absolute', bottom: '3rem', left: '1.5rem', zIndex: 10 }}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ background: 'rgba(255,255,255,0.85)', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '700', color: 'var(--color-primary)', backdropFilter: 'blur(4px)', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                    {getTrimester(weekInfo.week)}
                  </span>
                </div>
                <h2 style={{ margin: 0, fontSize: '2.8rem', fontWeight: '800', color: 'white', textShadow: '0 2px 15px rgba(0,0,0,0.5)', lineHeight: 1.1 }}>
                  {weekInfo.week}. Hafta
                </h2>
              </div>
              
              {/* Smooth Bottom Gradient */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '80px', background: 'linear-gradient(to top, var(--color-bg), transparent)' }}></div>
            </div>

            {/* Week Timeline Component */}
            <WeekTimeline currentWeek={profile.weeks} onWeekSelect={(w) => navigate(`/week/${w}`)} />

            {/* Content Section */}
            <div className="dashboard-content-section">
              
              {/* Progress Bar & Countdown Section */}
              <div style={{ marginBottom: '2.5rem' }}>
                <div className="top-stats-row">
                  <div>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Yolculuk</p>
                    <h3 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--color-primary)' }}>%{Math.round(progressPercentage)} Tamamlandı</h3>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Kavuşmaya</p>
                    <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--color-text-main)' }}>{remainingDays} Gün Kaldı</h3>
                  </div>
                </div>
                
                <div style={{ width: '100%', height: '16px', background: 'rgba(0,0,0,0.06)', borderRadius: 'var(--radius-full)', overflow: 'hidden', position: 'relative', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)' }}>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                    style={{ 
                      height: '100%', 
                      background: 'linear-gradient(90deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                      borderRadius: 'var(--radius-full)',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <motion.div 
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                      style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)' }}
                    />
                  </motion.div>
                </div>
              </div>

              {/* Upcoming Appointment Banner */}
              {daysToAppt !== null && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ background: 'linear-gradient(90deg, var(--color-accent), #a8a4d4)', padding: '1rem 1.5rem', borderRadius: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white', marginBottom: '2rem', boxShadow: '0 8px 20px rgba(198,194,245,0.4)' }}
                >
                  <div>
                    <h4 style={{ margin: '0 0 0.2rem 0', fontSize: '1.1rem' }}>Doktor Randevusu</h4>
                    <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.9 }}>
                      {new Date(profile.nextAppointmentDate).toLocaleDateString('tr-TR')} {profile.nextAppointmentTime && `- ${profile.nextAppointmentTime}`}
                    </p>
                  </div>
                  <div style={{ background: 'white', color: 'var(--color-accent)', padding: '0.5rem 1rem', borderRadius: '12px', fontWeight: 'bold', fontSize: '1.1rem', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                    {daysToAppt === 0 ? 'Bugün!' : `${daysToAppt} Gün Kaldı`}
                  </div>
                </motion.div>
              )}

              {/* Alert Card / Kontrol Zamanı */}
              {alertCard?.hasAlert && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOpenAssistant(alertCard.topic)}
                  style={{ background: 'linear-gradient(135deg, rgba(231,76,60,0.1), rgba(231,76,60,0.05))', border: '1px solid rgba(231,76,60,0.2)', padding: '1.2rem', borderRadius: '16px', marginBottom: '2rem', cursor: 'pointer', boxShadow: '0 4px 15px rgba(231,76,60,0.1)' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#e74c3c', marginBottom: '0.5rem' }}>
                    <Stethoscope size={24} />
                    <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Kontrol Zamanı</h3>
                  </div>
                  <h4 style={{ margin: '0 0 0.4rem 0', color: 'var(--color-text-main)', fontSize: '1rem' }}>{alertCard.title}</h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{alertCard.description} <b>Asistan ile konuşmak için dokunun.</b></p>
                </motion.div>
              )}

              {/* Emoji Banner */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', padding: '1rem', background: 'white', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
                <div style={{ fontSize: '3.5rem', lineHeight: 1, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}>
                  {weekInfo.emoji}
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Bebeğiniz şu an bir</p>
                  <p style={{ margin: 0, fontSize: '1.4rem', fontWeight: '800', color: 'var(--color-text-main)' }}>
                    {weekInfo.fruit} <span style={{ fontWeight: 'normal', fontSize: '1rem', color: 'var(--color-text-muted)' }}>
                      ({currentVisit?.actualSize ? `Tam ${currentVisit.actualSize}` : `~${weekInfo.size}`})
                    </span>
                  </p>
                </div>
              </div>

              {/* Minimalist Info Texts (No Cards) */}
              <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
                {profile?.primaryGoal === 'mom_focus' || profile?.primaryGoal === 'medical_focus' ? (
                  <>
                    <div style={{ order: 1, width: '100%' }}>
                      <h4 style={{ margin: '0 0 0.6rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: profile?.primaryGoal === 'medical_focus' ? '#e74c3c' : 'var(--color-secondary)', fontSize: '1.2rem', fontWeight: '700' }}>
                        <Info size={20} /> Sizde Neler Oluyor?
                      </h4>
                      <div className="markdown-content" style={{ width: '100%', margin: 0, fontSize: '1.05rem', lineHeight: 1.6, color: 'var(--color-text-main)' }}>
                        {isAILoading ? 'Yapay Zeka Analiz Ediyor...' : <ReactMarkdown>{dynamicInfo.momSymp}</ReactMarkdown>}
                      </div>
                    </div>
                    <div style={{ order: 2, width: '100%' }}>
                      <h4 style={{ margin: '0 0 0.6rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)', fontSize: '1.2rem', fontWeight: '700' }}>
                        <Sparkles size={20} /> Bebekte Neler Oluyor?
                      </h4>
                      <div className="markdown-content" style={{ width: '100%', margin: 0, fontSize: '1.05rem', lineHeight: 1.6, color: 'var(--color-text-main)' }}>
                        {isAILoading ? 'Yapay Zeka Analiz Ediyor...' : <ReactMarkdown>{dynamicInfo.babyDev}</ReactMarkdown>}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ order: 1, width: '100%' }}>
                      <h4 style={{ margin: '0 0 0.6rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)', fontSize: '1.2rem', fontWeight: '700' }}>
                        <Sparkles size={20} /> Bebekte Neler Oluyor?
                      </h4>
                      <div className="markdown-content" style={{ width: '100%', margin: 0, fontSize: '1.05rem', lineHeight: 1.6, color: 'var(--color-text-main)' }}>
                        {isAILoading ? 'Yapay Zeka Analiz Ediyor...' : <ReactMarkdown>{dynamicInfo.babyDev}</ReactMarkdown>}
                      </div>
                    </div>
                    <div style={{ order: 2, width: '100%' }}>
                      <h4 style={{ margin: '0 0 0.6rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-secondary)', fontSize: '1.2rem', fontWeight: '700' }}>
                        <Info size={20} /> Sizde Neler Oluyor?
                      </h4>
                      <div className="markdown-content" style={{ width: '100%', margin: 0, fontSize: '1.05rem', lineHeight: 1.6, color: 'var(--color-text-main)' }}>
                        {isAILoading ? 'Yapay Zeka Analiz Ediyor...' : <ReactMarkdown>{dynamicInfo.momSymp}</ReactMarkdown>}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Weekly Checklist Section */}
              {checklist && checklist.length > 0 && (
                <div style={{ marginBottom: '2rem', background: 'white', borderRadius: '24px', padding: '1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
                  <h4 style={{ margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-primary)', fontSize: '1.2rem', fontWeight: '800' }}>
                    <ListTodo size={22} /> Haftanın Yapılacaklar Listesi
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {checklist.map((item) => (
                      <motion.div 
                        key={item.id}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleChecklistItem(item.id)}
                        style={{ 
                          display: 'flex', 
                          alignItems: 'flex-start', 
                          gap: '1rem', 
                          padding: '1rem', 
                          background: item.completed ? 'rgba(183, 211, 169, 0.1)' : 'rgba(0,0,0,0.02)', 
                          borderRadius: '16px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          border: `1px solid ${item.completed ? 'rgba(183, 211, 169, 0.4)' : 'transparent'}`
                        }}
                      >
                        <div style={{ marginTop: '0.1rem', color: item.completed ? 'var(--color-secondary)' : 'var(--color-text-muted)' }}>
                          {item.completed ? <CheckCircle2 size={22} fill="var(--color-secondary)" color="white" /> : <Circle size={22} />}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ 
                            fontSize: '1.05rem', 
                            fontWeight: '700', 
                            color: item.completed ? 'var(--color-secondary)' : 'var(--color-text-main)',
                            textDecoration: item.completed ? 'line-through' : 'none',
                            transition: 'all 0.2s ease'
                          }}>
                            {item.title}
                          </div>
                          <div style={{ 
                            fontSize: '0.9rem', 
                            color: 'var(--color-text-muted)', 
                            marginTop: '0.2rem',
                            opacity: item.completed ? 0.7 : 1
                          }}>
                            {item.description}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ height: '1px', background: 'rgba(0,0,0,0.06)', margin: '2rem 0' }}></div>

              {/* Modern Profile Stats Row */}
              <div className="profile-stats-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <div style={{ background: 'var(--color-secondary)', color: 'white', width: '48px', height: '48px', borderRadius: '14px', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 10px rgba(183, 211, 169, 0.4)' }}>
                    <Scale size={24} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: '600' }}>Güncel Kilo</div>
                    <div style={{ fontWeight: '800', fontSize: '1.2rem', color: 'var(--color-text-main)' }}>{profile.weight} kg <span style={{ fontSize: '0.8rem', fontWeight: 'normal', color: 'var(--color-text-muted)' }}>(VKİ: {bmi})</span></div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <div style={{ background: 'var(--color-accent)', color: 'white', width: '48px', height: '48px', borderRadius: '14px', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 10px rgba(214, 187, 219, 0.4)' }}>
                    <Activity size={24} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: '600' }}>Durum</div>
                    <div style={{ fontWeight: '800', fontSize: '1.2rem', color: 'var(--color-text-main)' }}>{profile.isWorking ? 'Çalışıyor' : 'Evde'} <span style={{ fontSize: '0.8rem', fontWeight: 'normal', color: 'var(--color-text-muted)' }}>(Yaş: {profile.age})</span></div>
                  </div>
                </div>
              </div>

              {/* Elegant Daily Tip Panel */}
              <div style={{ padding: '1.5rem', borderRadius: '24px', background: 'linear-gradient(135deg, rgba(255, 196, 164, 0.15) 0%, rgba(212, 224, 181, 0.2) 100%)', display: 'flex', gap: '1rem', alignItems: 'flex-start', border: '2px solid white', boxShadow: '0 8px 20px rgba(0,0,0,0.02)' }}>
                <div style={{ color: 'var(--color-primary)', marginTop: '2px', background: 'white', padding: '0.6rem', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                  {dailyTip.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0, width: '100%' }}>
                  <h4 style={{ margin: '0 0 0.4rem 0', fontSize: '1.15rem', color: 'var(--color-primary)', fontWeight: '800' }}>{dailyTip.title}</h4>
                  <div className="markdown-content" style={{ margin: 0, fontSize: '1rem', color: 'var(--color-text-main)', lineHeight: 1.5 }}>
                    <ReactMarkdown>{dailyTip.text}</ReactMarkdown>
                  </div>
                </div>
              </div>

              {/* Personalized Blog Section */}
              <BlogSection blogs={blogs} profile={profile} isLoading={isAILoading} />

            </div>
          </>
        )}
      </motion.div>
      <Navigation />
    </>
  );
}
