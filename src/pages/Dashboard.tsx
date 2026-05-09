import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LogOut, Heart, Sparkles, Activity, Scale, MessageCircleHeart, Info, Stethoscope, X, CheckCircle2, Circle, ListTodo } from 'lucide-react';
import { getWeeklyData, type WeeklyData } from '../data/weeklyData';
import { weeklyDetailsData } from '../data/weeklyDetailsData';
import Navigation from '../components/Navigation';
import BlogSection, { type BlogEntry } from '../components/BlogSection';
import BabyNamesTool from '../components/BabyNamesTool';
import ReactMarkdown from 'react-markdown';
import TTCDashboard from './TTCDashboard';
import BornDashboard from './BornDashboard';
import WeekTimeline from '../components/WeekTimeline';

export default function Dashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [dailyTip, setDailyTip] = useState({ title: "Asistanınız Düşünüyor...", text: "Doktor notlarınız ve verileriniz yapay zeka tarafından analiz ediliyor...", icon: <Sparkles size={24} color="var(--color-primary)"/> });
  const [dynamicInfo, setDynamicInfo] = useState({ babyDev: "Yükleniyor...", momSymp: "Yükleniyor..." });
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
        setIsAILoading(true);
        const detailedData = weeklyDetailsData[currentSelectedWeek] || {};
        const currentWeekData = getWeeklyData(currentSelectedWeek);
        
        setDynamicInfo({ 
          babyDev: detailedData.babyDev || currentWeekData.babyDevelopment, 
          momSymp: detailedData.momBody || currentWeekData.momSymptoms 
        });
        setDailyTip({
           title: "Dinlenmeyi Unutmayın",
           text: "Gün içinde fırsat buldukça ayaklarınızı uzatarak dinlenmeniz bebeğiniz ve sizin için çok önemli.",
           icon: <Heart size={24} color="var(--color-primary)" />
        });
        
        // Static Checklist
        setChecklist([
          { id: 1, title: "Su Tüketimini Artır", description: "Günde en az 2.5 litre su içmeye özen göster." },
          { id: 2, title: "Hafif Egzersiz", description: "Kendini yormadan 20 dakikalık yürüyüşler yap." },
          { id: 3, title: "Doktor Kontrolü", description: "Randevularını ve testlerini zamanında planla." }
        ]);

        // Fallback blogs
        setBlogs([
          { id: 1, title: `${currentSelectedWeek}. Haftada Bebeğinizde Neler Oluyor?`, summary: 'Bu haftanın gelişim aşamalarını öğrenin.', tags: ['Bebek', 'Tıbbi'], emoji: '👶' },
          { id: 2, title: 'Hamilelikte Sağlıklı Beslenme Rehberi', summary: 'Bu dönemde almanız gereken besinler ve vitaminler.', tags: ['Beslenme', 'İpucu'], emoji: '🥗' },
          { id: 3, title: 'Hamilelikte Egzersiz: Neler Yapabilirsiniz?', summary: 'Güvenli egzersiz önerileri ve dikkat edilmesi gerekenler.', tags: ['Egzersiz', 'Yaşam'], emoji: '🧘' },
          { id: 4, title: 'Hamilelikte Ruh Sağlığınızı Korumak', summary: 'Hormonal değişimlerle başa çıkma yolları.', tags: ['Psikoloji', 'Yaşam'], emoji: '💆' },
          { id: 5, title: 'Doktor Kontrollerinde Sormanız Gerekenler', summary: 'Muayenelerde unutmamanız gereken önemli sorular.', tags: ['Tıbbi', 'İpucu'], emoji: '📋' },
          { id: 6, title: 'Hamilelikte Uyku Düzeni ve İpuçları', summary: 'Rahat uyku için pozisyon ve rutinler.', tags: ['Yaşam', 'İpucu'], emoji: '😴' },
        ]);
        setIsAILoading(false);
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
    
    // Yapay Zeka servisi devre dışı olduğu için statik bir mesaj gösteriyoruz.
    setTimeout(() => {
      setAssistantMessage(`**${topic}** hakkında şu an doktorunuza danışmanız en doğrusu olacaktır. Herhangi bir sağlık durumunda öncelikle doktorunuzla iletişime geçmeyi unutmayın.\n\n_Not: Yapay Zeka asistanımız bakım aşamasındadır._`);
      setIsAssistantLoading(false);
    }, 1000);
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

              {/* Baby Names Tool */}
              <BabyNamesTool />

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
