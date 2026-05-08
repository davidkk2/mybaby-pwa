import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Info, Camera } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { weeklyDetailsData } from '../data/weeklyDetailsData';

export default function WeekDetail() {
  const { week } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [detailData, setDetailData] = useState<any>(null);
  const weekNum = parseInt(week || '1', 10);

  useEffect(() => {
    const data = localStorage.getItem('mybaby_profile');
    if (data) setProfile(JSON.parse(data));
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!profile) return;
    
    // Yükleme animasyonunu kısa süre göster ki gerçekçi bir geçiş hissi versin
    setIsLoading(true);
    const data = weeklyDetailsData[weekNum] || weeklyDetailsData[4]; // Default to week 4 if not found
    
    setTimeout(() => {
      setDetailData(data);
      setIsLoading(false);
    }, 500);

  }, [profile, weekNum]);

  if (!profile) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ padding: 0, width: '100%', maxWidth: '600px', margin: '0 auto', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg)', overflowX: 'hidden' }}
    >
      {/* Header Image Area */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', backgroundColor: '#eaddd5' }}>
        <img 
          src={detailData ? detailData.images.baby : `/images/babycenter/week-${Math.min(Math.max(weekNum, 2), 41)}.jpg`} 
          alt={`${weekNum}. Hafta`} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://placehold.co/800x800/ffc4a4/ffffff?text=${weekNum}.+Hafta`;
          }}
        />
        
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10, background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%)' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', backdropFilter: 'blur(10px)', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <ArrowLeft size={20} />
          </button>
        </div>

        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)', padding: '4rem 1.5rem 1.5rem', color: 'white' }}>
          <span style={{ background: 'var(--color-primary)', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '700', color: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
            {weekNum <= 13 ? '1. Trimester' : weekNum <= 27 ? '2. Trimester' : '3. Trimester'}
          </span>
          <h1 style={{ margin: '0.5rem 0 0', fontSize: '3.2rem', fontWeight: '800', lineHeight: 1.1, textShadow: '0 2px 15px rgba(0,0,0,0.5)' }}>
            {weekNum}. Hafta
          </h1>
        </div>
      </div>

      {/* Content Area */}
      <div style={{ padding: '2rem 1.5rem', flex: 1, background: 'var(--color-bg)', borderTopLeftRadius: '30px', borderTopRightRadius: '30px', marginTop: '-20px', position: 'relative', zIndex: 20 }}>
        {isLoading || !detailData ? (
          <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--color-text-muted)' }}>
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} style={{ display: 'inline-block', marginBottom: '1rem' }}>
              <Sparkles size={32} color="var(--color-primary)" />
            </motion.div>
            <p style={{ fontSize: '1.1rem', margin: 0 }}>Bebeğinizin {weekNum}. hafta detayları<br/>özenle hazırlanıyor...</p>
          </div>
        ) : (
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            
            {/* Fruit Size Card */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', background: 'white', padding: '1.5rem', borderRadius: '24px', border: '2px solid white', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--color-bg)', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.05)', fontSize: '3rem' }}>
                {detailData.fruitEmoji || '👶'}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.2rem' }}>Boyut & Kilo</div>
                <h3 style={{ margin: '0 0 0.2rem 0', fontSize: '1.25rem', color: 'var(--color-text-main)', lineHeight: 1.3 }}>{detailData.fruitSize}</h3>
                <div style={{ fontSize: '0.9rem', color: 'var(--color-primary)', fontWeight: 'bold' }}>{detailData.fruitLength}</div>
              </div>
            </div>

            {/* Baby Development Section */}
            <div>
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '1.6rem', color: 'var(--color-primary)', marginBottom: '1rem', fontWeight: '800' }}>
                <Sparkles size={24} /> Bebekte Neler Oluyor?
              </h2>
              <div className="markdown-content" style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--color-text-main)' }}>
                <ReactMarkdown>{detailData.babyDev}</ReactMarkdown>
              </div>
            </div>

            <div style={{ height: '1px', background: 'rgba(0,0,0,0.06)' }}></div>

            {/* Mother Symptoms Section */}
            <div>
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '1.6rem', color: 'var(--color-secondary)', marginBottom: '1rem', fontWeight: '800' }}>
                <Info size={24} /> Sizde Neler Oluyor?
              </h2>
              <div className="markdown-content" style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--color-text-main)' }}>
                <ReactMarkdown>{detailData.momBody}</ReactMarkdown>
              </div>
            </div>

            {/* Ultrasound Placeholder */}
            {detailData.images.ultrasound && (
              <div style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
                <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', backgroundColor: '#eaddd5' }}>
                   <img src={detailData.images.ultrasound} alt="Ultrasound" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => (e.target as HTMLImageElement).src = `https://placehold.co/800x450/4a4453/ffffff?text=${weekNum}.+Hafta+Ultrasonda+Görünüm`} />
                   <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.6)', padding: '0.4rem 0.8rem', borderRadius: '20px', color: 'white', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', backdropFilter: 'blur(4px)' }}>
                     <Camera size={14} /> Örnek Görsel
                   </div>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ margin: '0 0 0.6rem 0', fontSize: '1.25rem', color: 'var(--color-text-main)', fontWeight: '800' }}>Ultrasonda Neler Görebilirsiniz?</h3>
                  <p style={{ margin: 0, fontSize: '1.05rem', color: 'var(--color-text-main)', lineHeight: 1.6 }}>{detailData.ultrasoundText}</p>
                </div>
              </div>
            )}

          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
