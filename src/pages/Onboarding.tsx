import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Baby, Check, Sparkles, Heart, User, Briefcase, Home, ShieldCheck, AlertCircle, Flower2, Calendar } from 'lucide-react';

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

interface ProfileData {
  status: 'pregnant' | 'born' | 'trying' | null;
  primaryGoal: 'baby_focus' | 'mom_focus' | 'medical_focus' | 'ttc_focus' | null;
  firstChild: boolean | null;
  tryDuration: string;
  calcMethod: 'last_period' | 'conception_date' | 'know_weeks' | 'due_date' | null;
  lastPeriodDate?: string;
  cycleLength?: number;
  conceptionDate?: string;
  knownWeeks?: number;
  knownDays?: number;
  dueDate?: string;
  adjustedLmpDate?: string; // The ultimate truth source for the app
  nextPeriodDate?: string; // For TTC Mode
  ovulationDate?: string; // For TTC Mode
  calculatedWeeks: number; // For immediate UI use
  calculatedDays: number;
  age: string;
  weight: string;
  height: string;
  prePregnancyWeight: string;
  isWorking: boolean | null;
  workStart: string;
  workEnd: string;
}

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [profile, setProfile] = useState<ProfileData>({
    status: null,
    primaryGoal: null,
    firstChild: null,
    tryDuration: '',
    calcMethod: null,
    cycleLength: 28,
    knownWeeks: 5,
    knownDays: 0,
    calculatedWeeks: 0,
    calculatedDays: 0,
    age: '',
    weight: '',
    height: '',
    prePregnancyWeight: '',
    isWorking: null,
    workStart: '09:00',
    workEnd: '17:00'
  });

  const handleStatusSelect = (status: 'pregnant' | 'born' | 'trying') => {
    if (status === 'trying') {
      setProfile(prev => ({ ...prev, status, primaryGoal: 'ttc_focus' }));
      setTimeout(() => setStep(4), 350); // Skip goal and first child for trying
    } else {
      setProfile(prev => ({ ...prev, status }));
      setTimeout(() => setStep(2), 350);
    }
  };

  const handleSelect = (key: keyof ProfileData, value: any, nextStepNum?: Step) => {
    setProfile(prev => ({ ...prev, [key]: value }));
    if (nextStepNum) setTimeout(() => setStep(nextStepNum), 350);
  };

  const handleBack = () => {
    if (profile.status === 'trying' && step === 4) setStep(1);
    else if (profile.status === 'trying' && step === 6) setStep(4);
    else if (profile.status === 'trying' && step === 8) setStep(7);
    else if (profile.status === 'born' && step === 11) setStep(3);
    else if (profile.status === 'born' && step === 8) setStep(11);
    else setStep((s) => (s - 1) as Step);
  };

  const handleForward = () => {
    if (profile.status === 'trying' && step === 4) setStep(6);
    else setStep((s) => (s + 1) as Step);
  };

  const calculateDates = () => {
    let lmpDate = new Date();
    let dueDate = new Date();
    let gestationalDays = 0;

    const today = new Date();
    today.setHours(0,0,0,0);

    if (profile.status === 'trying' && profile.lastPeriodDate) {
      const lmp = new Date(profile.lastPeriodDate);
      const cycle = profile.cycleLength || 28;
      const nextPeriod = new Date(lmp.getTime() + cycle * 24 * 60 * 60 * 1000);
      const ovulation = new Date(nextPeriod.getTime() - 14 * 24 * 60 * 60 * 1000);
      
      setProfile(prev => ({
        ...prev,
        adjustedLmpDate: lmp.toISOString(),
        nextPeriodDate: nextPeriod.toISOString(),
        ovulationDate: ovulation.toISOString()
      }));
      setStep(7);
      return;
    }

    if (profile.calcMethod === 'last_period' && profile.lastPeriodDate) {
      const lmp = new Date(profile.lastPeriodDate);
      const cycleOffset = (profile.cycleLength || 28) - 28;
      lmpDate = new Date(lmp.getTime() + cycleOffset * 24 * 60 * 60 * 1000);
      dueDate = new Date(lmpDate.getTime() + 280 * 24 * 60 * 60 * 1000);
    } 
    else if (profile.calcMethod === 'conception_date' && profile.conceptionDate) {
      const concDate = new Date(profile.conceptionDate);
      lmpDate = new Date(concDate.getTime() - 14 * 24 * 60 * 60 * 1000);
      dueDate = new Date(concDate.getTime() + 266 * 24 * 60 * 60 * 1000);
    }
    else if (profile.calcMethod === 'due_date' && profile.dueDate) {
      dueDate = new Date(profile.dueDate);
      lmpDate = new Date(dueDate.getTime() - 280 * 24 * 60 * 60 * 1000);
    }
    else if (profile.calcMethod === 'know_weeks') {
      gestationalDays = (profile.knownWeeks || 0) * 7 + (profile.knownDays || 0);
      lmpDate = new Date(today.getTime() - gestationalDays * 24 * 60 * 60 * 1000);
      dueDate = new Date(lmpDate.getTime() + 280 * 24 * 60 * 60 * 1000);
    }

    // Calculate current weeks and days
    const diffTime = today.getTime() - lmpDate.getTime();
    gestationalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // Safety clamp (0 to 42 weeks)
    gestationalDays = Math.max(0, Math.min(gestationalDays, 42 * 7));

    const weeks = Math.floor(gestationalDays / 7);
    const days = gestationalDays % 7;

    setProfile(prev => ({
      ...prev,
      adjustedLmpDate: lmpDate.toISOString(),
      dueDate: dueDate.toISOString(),
      calculatedWeeks: weeks,
      calculatedDays: days,
      weeks: weeks // for legacy fallback
    }));

    setStep(7);
  };

  const completeOnboarding = () => {
    localStorage.setItem('mybaby_profile', JSON.stringify(profile));
    navigate('/dashboard');
  };

  const variants = {
    enter: { x: 50, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 }
  };

  return (
    <div className="container" style={{ justifyContent: 'center', padding: '1rem' }}>
      <div className="glass-card" style={{ width: '100%', padding: '2rem 1.5rem' }}>
        
        {step !== 10 && (
          <div className="step-indicator" style={{ marginBottom: '1.5rem' }}>
            {[1,2,3,4,5,6,7,8,9,11].map((s) => (
              <div 
                key={s} 
                className={`step-dot ${step >= s ? 'active' : ''}`}
                style={{ display: profile.status === 'born' && (s === 4 || s === 5 || s === 6 || s === 7) ? 'none' : profile.status === 'trying' && (s === 2 || s === 3 || s === 5 || s === 11) ? 'none' : profile.status === 'pregnant' && s === 11 ? 'none' : 'block' }}
              />
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
              <h2 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Şu anki durumunuz nedir?</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                <div className={`option-card ${profile.status === 'pregnant' ? 'selected' : ''}`} onClick={() => handleStatusSelect('pregnant')} style={{ flexDirection: 'row', padding: '1.2rem', justifyContent: 'flex-start', alignItems: 'center', gap: '1rem' }}>
                  <div className="option-icon" style={{ width: '48px', height: '48px', flexShrink: 0 }}><Baby size={24} /></div>
                  <div style={{ textAlign: 'left' }}>
                    <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Hamileyim</h3>
                  </div>
                </div>
                <div className={`option-card ${profile.status === 'trying' ? 'selected' : ''}`} onClick={() => handleStatusSelect('trying')} style={{ flexDirection: 'row', padding: '1.2rem', justifyContent: 'flex-start', alignItems: 'center', gap: '1rem' }}>
                  <div className="option-icon" style={{ width: '48px', height: '48px', flexShrink: 0 }}><Flower2 size={24} /></div>
                  <div style={{ textAlign: 'left' }}>
                    <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Anne Adayıyım</h3>
                  </div>
                </div>
                <div className={`option-card ${profile.status === 'born' ? 'selected' : ''}`} onClick={() => handleStatusSelect('born')} style={{ flexDirection: 'row', padding: '1.2rem', justifyContent: 'flex-start', alignItems: 'center', gap: '1rem' }}>
                  <div className="option-icon" style={{ width: '48px', height: '48px', flexShrink: 0 }}><Sparkles size={24} /></div>
                  <div style={{ textAlign: 'left' }}>
                    <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Doğum Yaptım</h3>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && profile.status !== 'trying' && (
            <motion.div key="step2" variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
              <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', fontSize: '1.4rem' }}>Sizi en iyi şekilde nasıl destekleyebiliriz?</h2>
              <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Arayüzü ve yapay zekamızı bu hedefinize göre şekillendireceğiz.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div className={`option-card ${profile.primaryGoal === 'baby_focus' ? 'selected' : ''}`} onClick={() => handleSelect('primaryGoal', 'baby_focus', 3)} style={{ flexDirection: 'row', padding: '1rem', textAlign: 'left' }}>
                  <div className="option-icon" style={{ width: '40px', height: '40px', flexShrink: 0 }}><Baby size={20} /></div>
                  <div>
                    <h3 style={{ fontSize: '1rem', margin: '0 0 0.2rem 0' }}>Bebeğimin Gelişimini Takip Etmek</h3>
                  </div>
                </div>
                <div className={`option-card ${profile.primaryGoal === 'mom_focus' ? 'selected' : ''}`} onClick={() => handleSelect('primaryGoal', 'mom_focus', 3)} style={{ flexDirection: 'row', padding: '1rem', textAlign: 'left' }}>
                  <div className="option-icon" style={{ width: '40px', height: '40px', flexShrink: 0 }}><User size={20} /></div>
                  <div>
                    <h3 style={{ fontSize: '1rem', margin: '0 0 0.2rem 0' }}>Vücudumdaki Değişimleri İzlemek</h3>
                  </div>
                </div>
                <div className={`option-card ${profile.primaryGoal === 'medical_focus' ? 'selected' : ''}`} onClick={() => handleSelect('primaryGoal', 'medical_focus', 3)} style={{ flexDirection: 'row', padding: '1rem', textAlign: 'left' }}>
                  <div className="option-icon" style={{ width: '40px', height: '40px', flexShrink: 0 }}><AlertCircle size={20} /></div>
                  <div>
                    <h3 style={{ fontSize: '1rem', margin: '0 0 0.2rem 0' }}>Tıbbi Süreci & Komplikasyonları Bilmek</h3>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && profile.status !== 'trying' && (
            <motion.div key="step3" variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
              <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Bu ilk çocuğunuz mu?</h2>
              <div className="options-grid">
                <div className={`option-card ${profile.firstChild === true ? 'selected' : ''}`} onClick={() => {
                  setProfile(prev => ({...prev, firstChild: true}));
                  if (profile.status === 'born') setTimeout(() => setStep(11), 350);
                  else setTimeout(() => setStep(4), 350);
                }}>
                  <div className="option-icon"><Check size={32} /></div>
                  <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Evet</h3>
                </div>
                <div className={`option-card ${profile.firstChild === false ? 'selected' : ''}`} onClick={() => {
                  setProfile(prev => ({...prev, firstChild: false}));
                  if (profile.status === 'born') setTimeout(() => setStep(11), 350);
                  else setTimeout(() => setStep(4), 350);
                }}>
                  <div className="option-icon"><Heart size={32} /></div>
                  <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Hayır</h3>
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
              <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', fontSize: '1.4rem' }}>Ne kadar süredir hamile kalmaya çalışıyorsunuz?</h2>
              <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Bu bilgi size sunacağımız tıbbi yaklaşımı özelleştirir.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {['Henüz yeni başladık', '6 aydan az', '6-12 ay', '1 yıldan fazla', 'Tüp bebek / Tedavi gördüm'].map(opt => (
                  <div key={opt} className={`option-card ${profile.tryDuration === opt ? 'selected' : ''}`} onClick={() => {
                    setProfile({...profile, tryDuration: opt});
                    if (profile.status === 'trying') setStep(6);
                    else setStep(5);
                  }} style={{ padding: '1rem' }}>
                    <h3 style={{ fontSize: '1rem', margin: 0 }}>{opt}</h3>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 5 && profile.status !== 'trying' && (
            <motion.div key="step5" variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
              <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', fontSize: '1.4rem' }}>Hamilelik sürenizi belirleyelim</h2>
              <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Halihazırda ne biliyorsunuz?</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div className={`option-card ${profile.calcMethod === 'last_period' ? 'selected' : ''}`} onClick={() => handleSelect('calcMethod', 'last_period', 6)} style={{ padding: '1rem' }}>
                  <h3 style={{ fontSize: '1rem', margin: 0 }}>Son adet döngümün ilk gününü biliyorum</h3>
                </div>
                <div className={`option-card ${profile.calcMethod === 'conception_date' ? 'selected' : ''}`} onClick={() => handleSelect('calcMethod', 'conception_date', 6)} style={{ padding: '1rem' }}>
                  <h3 style={{ fontSize: '1rem', margin: 0 }}>Gebelik (Transfer) tarihini belirtebilirim</h3>
                </div>
                <div className={`option-card ${profile.calcMethod === 'due_date' ? 'selected' : ''}`} onClick={() => handleSelect('calcMethod', 'due_date', 6)} style={{ padding: '1rem' }}>
                  <h3 style={{ fontSize: '1rem', margin: 0 }}>Doktorum beklenen doğum tarihini söyledi</h3>
                </div>
                <div className={`option-card ${profile.calcMethod === 'know_weeks' ? 'selected' : ''}`} onClick={() => handleSelect('calcMethod', 'know_weeks', 6)} style={{ padding: '1rem' }}>
                  <h3 style={{ fontSize: '1rem', margin: 0 }}>Obstetrik süremi zaten biliyorum (Hafta/Gün)</h3>
                </div>
              </div>
            </motion.div>
          )}

          {step === 6 && (
            <motion.div key="step6" variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
              <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.4rem' }}>{profile.status === 'trying' ? 'Adet Döngüsü Bilgileriniz' : 'Tarihleri Girelim'}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
                
                {(profile.calcMethod === 'last_period' || profile.status === 'trying') && (
                  <>
                    <div className="input-group" style={{ width: '100%' }}>
                      <label className="input-label">Son Adet Tarihiniz (İlk Gün)</label>
                      <input type="date" className="input-field" value={profile.lastPeriodDate || ''} onChange={e => setProfile({...profile, lastPeriodDate: e.target.value})} />
                    </div>
                    <div className="input-group" style={{ width: '100%' }}>
                      <label className="input-label">Ortalama Döngü Süreniz (Gün)</label>
                      <input type="number" className="input-field" value={profile.cycleLength || 28} onChange={e => setProfile({...profile, cycleLength: parseInt(e.target.value)})} />
                      <small style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', marginTop: '0.5rem', display: 'block' }}>Genellikle 28 gündür.</small>
                    </div>
                  </>
                )}

                {profile.calcMethod === 'conception_date' && profile.status !== 'trying' && (
                  <div className="input-group" style={{ width: '100%' }}>
                    <label className="input-label">Gebelik (Döllenme/Transfer) Tarihi</label>
                    <input type="date" className="input-field" value={profile.conceptionDate || ''} onChange={e => setProfile({...profile, conceptionDate: e.target.value})} />
                  </div>
                )}

                {profile.calcMethod === 'due_date' && profile.status !== 'trying' && (
                  <div className="input-group" style={{ width: '100%' }}>
                    <label className="input-label">Beklenen Doğum Tarihi</label>
                    <input type="date" className="input-field" value={profile.dueDate || ''} onChange={e => setProfile({...profile, dueDate: e.target.value})} />
                  </div>
                )}

                {profile.calcMethod === 'know_weeks' && profile.status !== 'trying' && (
                  <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
                    <div className="input-group" style={{ flex: 1 }}>
                      <label className="input-label">Hafta</label>
                      <input type="number" className="input-field" value={profile.knownWeeks} onChange={e => setProfile({...profile, knownWeeks: parseInt(e.target.value)})} />
                    </div>
                    <div className="input-group" style={{ flex: 1 }}>
                      <label className="input-label">Gün</label>
                      <input type="number" max="6" className="input-field" value={profile.knownDays} onChange={e => setProfile({...profile, knownDays: parseInt(e.target.value)})} />
                    </div>
                  </div>
                )}

                <button className="btn-primary" style={{ width: '100%' }} onClick={calculateDates}>Hesapla</button>
              </div>
            </motion.div>
          )}

          {step === 7 && (
            <motion.div key="step7" variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
              <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>Harika! Her Şeyi Hesapladık</h2>
              
              {profile.status === 'trying' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(255,255,255,0.4)', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '0.8rem' }}>
                    <span style={{ color: 'var(--color-text-muted)', fontWeight: '500' }}>Tahmini Yumurtlama:</span>
                    <span style={{ fontWeight: 'bold', color: 'var(--color-accent)' }}>
                      {profile.ovulationDate ? new Date(profile.ovulationDate).toLocaleDateString('tr-TR') : '-'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-text-muted)', fontWeight: '500' }}>Beklenen Adet Tarihi:</span>
                    <span style={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>
                      {profile.nextPeriodDate ? new Date(profile.nextPeriodDate).toLocaleDateString('tr-TR') : '-'}
                    </span>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(255,255,255,0.4)', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '0.8rem' }}>
                    <span style={{ color: 'var(--color-text-muted)', fontWeight: '500' }}>Obstetrik Gebelik Süreniz:</span>
                    <span style={{ fontWeight: 'bold' }}>{profile.calculatedWeeks} Hafta, {profile.calculatedDays} Gün</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '0.8rem' }}>
                    <span style={{ color: 'var(--color-text-muted)', fontWeight: '500' }}>Bebeğinizin Gebelik Yaşı:</span>
                    <span style={{ fontWeight: 'bold' }}>{Math.max(0, profile.calculatedWeeks - 2)} Hafta</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-text-muted)', fontWeight: '500' }}>Beklenen Doğum Tarihi:</span>
                    <span style={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>
                      {profile.dueDate ? new Date(profile.dueDate).toLocaleDateString('tr-TR') : '-'}
                    </span>
                  </div>
                </div>
              )}

              <button className="btn-primary" style={{ width: '100%', marginTop: '2rem' }} onClick={() => setStep(8)}>Devam Et</button>
            </motion.div>
          )}

          {step === 8 && (
            <motion.div key="step8" variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
              <h2 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Fiziksel Özellikleriniz</h2>
              <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>Kilo takibi ve gelişim eğrisi için bu bilgiler çok önemli.</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="input-group">
                  <label className="input-label">Yaşınız</label>
                  <input type="number" className="input-field" placeholder="Örn: 28" value={profile.age} onChange={e => setProfile({...profile, age: e.target.value})} />
                </div>
                <div className="input-group">
                  <label className="input-label">Boyunuz (cm)</label>
                  <input type="number" className="input-field" placeholder="Örn: 165" value={profile.height} onChange={e => setProfile({...profile, height: e.target.value})} />
                </div>
                {profile.status === 'pregnant' && (
                  <div>
                    <label className="input-label">Hamilelik Öncesi Kilo</label>
                    <input 
                      type="number" 
                      className="input-field" 
                      placeholder="Örn: 60" 
                      value={profile.prePregnancyWeight || ''}
                      onChange={(e) => setProfile({ ...profile, prePregnancyWeight: e.target.value })}
                    />
                  </div>
                )}
                <div className="input-group" style={profile.status !== 'pregnant' ? { gridColumn: '1 / -1' } : {}}>
                  <label className="input-label">Şu anki Kilonuz (kg)</label>
                  <input type="number" className="input-field" placeholder="Örn: 62" value={profile.weight} onChange={e => setProfile({...profile, weight: e.target.value})} />
                </div>
              </div>
            </motion.div>
          )}

          {step === 9 && (
            <motion.div key="step9" variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
              <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Çalışma Hayatınız</h2>
              <div className="options-grid" style={{ marginBottom: '2rem' }}>
                <div className={`option-card ${profile.isWorking === true ? 'selected' : ''}`} onClick={() => setProfile({...profile, isWorking: true})}>
                  <div className="option-icon"><Briefcase size={32} /></div>
                  <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Çalışıyorum</h3>
                </div>
                <div className={`option-card ${profile.isWorking === false ? 'selected' : ''}`} onClick={() => setProfile({...profile, isWorking: false})}>
                  <div className="option-icon"><Home size={32} /></div>
                  <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Çalışmıyorum</h3>
                </div>
              </div>

              {profile.isWorking && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                  <div className="input-group">
                    <label className="input-label">Başlama</label>
                    <input type="time" className="input-field" value={profile.workStart} onChange={e => setProfile({...profile, workStart: e.target.value})} />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Bitiş</label>
                    <input type="time" className="input-field" value={profile.workEnd} onChange={e => setProfile({...profile, workEnd: e.target.value})} />
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {step === 10 && (
            <motion.div key="step10" variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3, staggerChildren: 0.2 }}>
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.5 }} style={{ width: '80px', height: '80px', background: 'var(--color-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'white' }}>
                  <ShieldCheck size={40} />
                </motion.div>
                
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-text-main)' }}>Her Şey Hazır!</h2>
                
                <div style={{ background: 'rgba(255, 196, 164, 0.1)', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem', border: '1px solid rgba(255, 196, 164, 0.3)' }}>
                  
                  {profile.status !== 'trying' && (
                    <div style={{ marginBottom: '1.2rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem', justifyContent: 'center' }}>
                        <img src="/images/gorsel-5.png" alt="Bebek Gelişimi" style={{ width: '60px', height: '60px', borderRadius: '14px', objectFit: 'cover', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                        <div style={{ textAlign: 'left' }}>
                          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Her hafta yenilenen</p>
                          <p style={{ margin: 0, fontSize: '1.05rem', fontWeight: '700', color: 'var(--color-primary)' }}>Bebek Gelişim Görselleri</p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        {['🍎','🫐','🍓','🥑','🍌','🍉'].map((e, i) => (
                          <span key={i} style={{ fontSize: '1.3rem', opacity: 0.8 + i * 0.04 }}>{e}</span>
                        ))}
                      </div>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-muted)', textAlign: 'center' }}>Bebeğinizin hafta hafta boyutunu meyve karşılığıyla göreceksiniz!</p>
                    </div>
                  )}

                  <p style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', color: 'var(--color-text-main)', fontWeight: '500' }}>
                    {profile.status === 'trying' 
                      ? 'Doğurganlık döngünüzü yakından takip edecek ve size yapay zeka destekli tıbbi asistanlık sunacağız.'
                      : profile.status === 'born'
                      ? 'Bebeğinizin büyümesini günden güne takip edecek ve size yapay zeka destekli asistanlık sunacağız.'
                      : 'Bebeğinizin büyümesini günden güne görselleştirecek ve size yapay zeka destekli tıbbi asistanlık sunacağız.'}
                  </p>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', textAlign: 'left' }}>
                    <ShieldCheck size={16} style={{ flexShrink: 0, marginTop: '2px' }}/> 
                    Gizliliğiniz ve güvenliğiniz bizim için önemlidir. Kişisel verilerinizi sunucularımızda saklamıyor, bilgilerinizi üçüncü taraflarla onayınız olmadan kesinlikle paylaşmıyoruz. Tüm verileriniz bu cihazda güvendedir.
                  </p>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary" 
                  style={{ width: '100%', fontSize: '1.2rem', padding: '1.2rem' }} 
                  onClick={completeOnboarding}
                >
                  {profile.status === 'trying' ? 'Hadi bu güzel sürece başlayalım :)' : profile.status === 'born' ? 'Bebeğinizin gelişimine bakalım :)' : 'Hadi hamilelik sürecine bakalım :)'}
                </motion.button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* Navigation Buttons for steps that need them */}
        {step > 1 && step < 10 && step !== 6 && step !== 7 && (
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <button className="btn-secondary" onClick={handleBack}>Geri</button>
            
            {(step === 8 || step === 9) && (
              <button className="btn-primary" onClick={handleForward} disabled={(step === 8 && (!profile.weight || !profile.height)) || (step === 9 && profile.isWorking === null)}>
                İleri
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
