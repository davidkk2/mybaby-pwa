import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Scale, Stethoscope, Building, BedDouble, Save, CheckCircle, Target } from 'lucide-react';
import Navigation from '../components/Navigation';
import type { ProfileData } from '../types';

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('mybaby_profile');
    if (data) {
      setProfile(JSON.parse(data));
    } else {
      navigate('/onboarding');
    }
  }, [navigate]);

  const handleChange = (field: string, value: any) => {
    setProfile((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    localStorage.setItem('mybaby_profile', JSON.stringify(profile));
    // Clear AI cache so Dashboard regenerates with updated profile data
    sessionStorage.clear();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  if (!profile) return null;

  return (
    <>
      <motion.div 
        className="container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ padding: '1.5rem', maxWidth: '600px', margin: '0 auto', minHeight: '100vh', paddingBottom: '6rem' }}
      >
        <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: 'var(--shadow-md)' }}>
              <User size={40} color="var(--color-primary)" />
            </div>
          </div>
          <h1 style={{ margin: 0, fontSize: '1.8rem', color: 'var(--color-primary)' }}>Profilim</h1>
          <p style={{ color: 'var(--color-text-muted)', margin: '0.5rem 0 0 0' }}>Bilgilerinizi güncelleyerek deneyiminizi kişiselleştirin.</p>
        </header>

        <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem', borderRadius: 'var(--radius-md)' }}>
          <h3 style={{ margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-secondary)', fontSize: '1.2rem' }}>
            <Scale size={20} /> Fiziksel Bilgiler
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)', fontWeight: 'bold' }}>Hamilelik Öncesi Kilo</label>
              <input 
                type="number" 
                value={profile.prePregnancyWeight || ''} 
                onChange={(e) => handleChange('prePregnancyWeight', e.target.value)}
                style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0,0,0,0.1)', outline: 'none', fontSize: '1rem' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)', fontWeight: 'bold' }}>Güncel Kilo (kg)</label>
              <input 
                type="number" 
                value={profile.weight || ''} 
                onChange={(e) => handleChange('weight', e.target.value)}
                style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0,0,0,0.1)', outline: 'none', fontSize: '1rem' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)', fontWeight: 'bold' }}>Boy (cm)</label>
              <input 
                type="number" 
                value={profile.height || ''} 
                onChange={(e) => handleChange('height', e.target.value)}
                style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0,0,0,0.1)', outline: 'none', fontSize: '1rem' }}
              />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)', fontWeight: 'bold' }}>{profile.status === 'trying' ? 'Döngü Günü' : 'Hamilelik Haftası'}</label>
              {profile.adjustedLmpDate ? (
                <div style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0,0,0,0.1)', background: 'rgba(0,0,0,0.02)', fontSize: '1rem', color: 'var(--color-text-main)' }}>
                  {(() => {
                    const lmp = new Date(profile.adjustedLmpDate!);
                    const today = new Date();
                    today.setHours(0,0,0,0);
                    const diffDays = Math.floor((today.getTime() - lmp.getTime()) / (1000*60*60*24));
                    if (profile.status === 'trying') {
                      const cycleDay = Math.max(1, diffDays + 1);
                      return `${cycleDay}. gün (${profile.cycleLength || 28} günlük döngü)`;
                    }
                    const w = Math.max(0, Math.min(Math.floor(diffDays / 7), 42));
                    const d = diffDays % 7;
                    return `${w} Hafta, ${d} Gün (SAT'tan otomatik hesaplanıyor)`;
                  })()}
                </div>
              ) : (
                <div style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0,0,0,0.1)', background: 'rgba(0,0,0,0.02)', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Hesaplanamadı — SAT bilgisi gerekli</div>
              )}
              <small style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', display: 'block', marginTop: '0.3rem' }}>Bu değer SAT veya gebelik tarihinden otomatik hesaplanır.</small>
            </div>
          </div>
        </div>

        {/* Primary Goal Section */}
        <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem', borderRadius: 'var(--radius-md)' }}>
          <h3 style={{ margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)', fontSize: '1.2rem' }}>
            <Target size={20} /> Ana Hedefiniz
          </h3>
          {profile.status !== 'trying' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { value: 'baby_focus', label: 'Bebeğimin Gelişimini Takip Etmek' },
                { value: 'mom_focus', label: 'Vücudumdaki Değişimleri İzlemek' },
                { value: 'medical_focus', label: 'Tıbbi Süreci & Komplikasyonları Bilmek' }
              ].map(opt => (
                <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.8rem', background: profile.primaryGoal === opt.value ? 'rgba(255,196,164,0.1)' : 'rgba(0,0,0,0.02)', border: profile.primaryGoal === opt.value ? '1px solid var(--color-primary)' : '1px solid transparent', borderRadius: '12px', cursor: 'pointer' }}>
                  <input type="radio" name="goal" checked={profile.primaryGoal === opt.value} onChange={() => handleChange('primaryGoal', opt.value)} style={{ accentColor: 'var(--color-primary)' }} />
                  <span style={{ fontSize: '0.95rem' }}>{opt.label}</span>
                </label>
              ))}
            </div>
          ) : (
            <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Gebe kalma modunda ana hedefiniz otomatik olarak "Doğurganlık Takibi" olarak ayarlanmıştır.</p>
          )}
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem', borderRadius: 'var(--radius-md)' }}>
          <h3 style={{ margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-accent)', fontSize: '1.2rem' }}>
            <Stethoscope size={20} /> Sağlık & Takip
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)', fontWeight: 'bold' }}>Son Adet Tarihi (SAT)</label>
              <input 
                type="date" 
                value={profile.lastPeriodDate || ''} 
                onChange={(e) => handleChange('lastPeriodDate', e.target.value)}
                style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0,0,0,0.1)', outline: 'none', fontSize: '1rem' }}
              />
              <small style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', display: 'block', marginTop: '0.3rem' }}>Doğum günü tahminini ve geri sayımı hassaslaştırır.</small>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)', fontWeight: 'bold' }}>Kan Grubu</label>
              <select 
                value={profile.bloodType || ''} 
                onChange={(e) => handleChange('bloodType', e.target.value)}
                style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0,0,0,0.1)', outline: 'none', fontSize: '1rem', backgroundColor: 'white' }}
              >
                <option value="">Seçiniz</option>
                <option value="A+">A Rh (+)</option>
                <option value="A-">A Rh (-)</option>
                <option value="B+">B Rh (+)</option>
                <option value="B-">B Rh (-)</option>
                <option value="AB+">AB Rh (+)</option>
                <option value="AB-">AB Rh (-)</option>
                <option value="0+">0 Rh (+)</option>
                <option value="0-">0 Rh (-)</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)', fontWeight: 'bold' }}><Stethoscope size={14}/> Doktorunuzun Adı</label>
              <input 
                type="text" 
                placeholder="Örn: Dr. Ayşe Yılmaz"
                value={profile.doctorName || ''} 
                onChange={(e) => handleChange('doctorName', e.target.value)}
                style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0,0,0,0.1)', outline: 'none', fontSize: '1rem' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)', fontWeight: 'bold' }}><Building size={14}/> Hastane</label>
              <input 
                type="text" 
                placeholder="Örn: Şifa Hastanesi"
                value={profile.hospitalName || ''} 
                onChange={(e) => handleChange('hospitalName', e.target.value)}
                style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0,0,0,0.1)', outline: 'none', fontSize: '1rem' }}
              />
            </div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem', borderRadius: 'var(--radius-md)' }}>
          <h3 style={{ margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#8892b0', fontSize: '1.2rem' }}>
            <BedDouble size={20} /> Yaşam Stili
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)', fontWeight: 'bold' }}>Ortalama Uyku Süresi (Saat)</label>
              <input 
                type="number" 
                placeholder="Örn: 8"
                value={profile.sleepHours || ''} 
                onChange={(e) => handleChange('sleepHours', e.target.value)}
                style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0,0,0,0.1)', outline: 'none', fontSize: '1rem' }}
              />
            </div>
            
            <div style={{ padding: '1rem', backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: 'var(--radius-sm)' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', color: 'var(--color-text-main)', cursor: 'pointer', fontWeight: 'bold' }}>
                <input 
                  type="checkbox" 
                  checked={profile.isWorking || false} 
                  onChange={(e) => handleChange('isWorking', e.target.checked)}
                  style={{ width: '20px', height: '20px', accentColor: 'var(--color-primary)' }}
                />
                Şu an çalışıyorum
              </label>
            </div>
          </div>
        </div>



        <button 
          onClick={handleSave} 
          className="btn-primary" 
          style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', padding: '1rem' }}
        >
          {isSaved ? <><CheckCircle size={20} /> Kaydedildi!</> : <><Save size={20} /> Bilgilerimi Güncelle</>}
        </button>

      </motion.div>
      <Navigation />
    </>
  );
}
