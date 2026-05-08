import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Baby, Heart, ArrowRight, XCircle, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';

export default function Welcome() {
  const navigate = useNavigate();
  const [hasConsented, setHasConsented] = useState(false);
  const [step, setStep] = useState(0);

  // Consent Checkboxes
  const [consentAppUse, setConsentAppUse] = useState(false);
  const [consentOverseas, setConsentOverseas] = useState(false);
  const [consentAds, setConsentAds] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  useEffect(() => {
    const isAccepted = localStorage.getItem('mybaby_privacy_accepted');
    if (isAccepted) {
      setHasConsented(true);
      setStep(1);
    } else {
      setStep(0);
    }
  }, []);

  const handleConsent = (type: 'required' | 'all' | 'selected') => {
    let appUse = consentAppUse;
    let overseas = consentOverseas;
    let ads = consentAds;

    if (type === 'required') {
      appUse = true;
      overseas = true;
      setConsentAppUse(true);
      setConsentOverseas(true);
    } else if (type === 'all') {
      appUse = true;
      overseas = true;
      ads = true;
      setConsentAppUse(true);
      setConsentOverseas(true);
      setConsentAds(true);
    } else if (type === 'selected') {
      if (!appUse || !overseas) return;
    }
    
    localStorage.setItem('mybaby_privacy_accepted', 'true');
    localStorage.setItem('mybaby_consents', JSON.stringify({
      appDataUse: appUse,
      overseasProcessing: overseas,
      personalizedAds: ads,
      acceptedAt: new Date().toISOString()
    }));
    setHasConsented(true);
    setTimeout(() => setStep(1), 300);
  };

  const variants = {
    enter: { x: 50, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 }
  };

  return (
    <div className="container" style={{ justifyContent: 'center', alignItems: 'center', padding: '1rem' }}>
      
      <AnimatePresence mode="wait">
        
        {step === 0 && (
          <motion.div 
            key="step0"
            variants={variants}
            initial="enter" animate="center" exit="exit" transition={{ duration: 0.4 }}
            className="glass-card" 
            style={{ maxWidth: '450px', width: '100%', padding: '2rem 1.5rem', position: 'relative' }}
          >
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <ShieldCheck size={40} color="var(--color-primary)" style={{ marginBottom: '0.5rem' }} />
              <h2 style={{ fontSize: '1.5rem', color: 'var(--color-text-main)', margin: '0 0 0.5rem 0' }}>
                Gizlilik Hakkında Konuşalım
              </h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
                Sizin ve bebeğinizin verilerini güvende tutmak için şeffaf bir sözleşme yapalım.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', padding: '1rem', background: 'rgba(0,0,0,0.02)', borderRadius: '12px', border: consentAppUse ? '1px solid var(--color-primary)' : '1px solid transparent', cursor: 'pointer', transition: 'all 0.2s' }}>
                <input 
                  type="checkbox" 
                  checked={consentAppUse} 
                  onChange={(e) => setConsentAppUse(e.target.checked)} 
                  style={{ width: '20px', height: '20px', accentColor: 'var(--color-primary)', marginTop: '2px' }} 
                />
                <div>
                  <span style={{ fontSize: '0.9rem', color: 'var(--color-text-main)', lineHeight: 1.4, display: 'block' }}>
                    Uygulamada hizmet alabilmek için hamilelik durumu dahil uygulama verilerimin kullanılmasını kabul ediyorum.
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#e74c3c', fontWeight: 'bold' }}>* Gerekli</span>
                </div>
              </label>

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', padding: '1rem', background: 'rgba(0,0,0,0.02)', borderRadius: '12px', border: consentOverseas ? '1px solid var(--color-primary)' : '1px solid transparent', cursor: 'pointer', transition: 'all 0.2s' }}>
                <input 
                  type="checkbox" 
                  checked={consentOverseas} 
                  onChange={(e) => setConsentOverseas(e.target.checked)} 
                  style={{ width: '20px', height: '20px', accentColor: 'var(--color-primary)', marginTop: '2px' }} 
                />
                <div>
                  <span style={{ fontSize: '0.9rem', color: 'var(--color-text-main)', lineHeight: 1.4, display: 'block' }}>
                    Varsa özel kişisel veri kategorisi de dahil olmak üzere, kişisel verilerimin gizlilik politikası uyarınca ikamet ettiğim ülke dışında işlenmesine ve aktarılmasına izin veriyorum.
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#e74c3c', fontWeight: 'bold' }}>* Gerekli</span>
                </div>
              </label>

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', padding: '1rem', background: 'rgba(0,0,0,0.02)', borderRadius: '12px', border: consentAds ? '1px solid var(--color-primary)' : '1px solid transparent', cursor: 'pointer', transition: 'all 0.2s' }}>
                <input 
                  type="checkbox" 
                  checked={consentAds} 
                  onChange={(e) => setConsentAds(e.target.checked)} 
                  style={{ width: '20px', height: '20px', accentColor: 'var(--color-primary)', marginTop: '2px' }} 
                />
                <div>
                  <span style={{ fontSize: '0.9rem', color: 'var(--color-text-main)', lineHeight: 1.4, display: 'block' }}>
                    Uygulamada bana özel, kişiselleştirilmiş kampanya ve reklam gösterilmesini kabul ediyorum.
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>İsteğe Bağlı</span>
                </div>
              </label>

            </div>

            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <button 
                onClick={() => setShowPrivacyModal(true)} 
                style={{ color: 'var(--color-primary)', fontSize: '0.85rem', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
              >
                Daha fazla bilgi için lütfen gizlilik politikamıza göz atın.
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <button 
                className="btn-primary" 
                onClick={() => handleConsent('all')}
                style={{ width: '100%', fontSize: '1rem', padding: '1rem', background: 'var(--color-primary)' }}
              >
                Hepsini Kabul Et
              </button>
              <button 
                className="btn-secondary" 
                onClick={() => handleConsent('required')}
                style={{ width: '100%', fontSize: '1rem', padding: '1rem', background: 'white', border: '2px solid var(--color-primary)', color: 'var(--color-primary)' }}
              >
                Yalnızca Gerekli Olanları Kabul Et
              </button>
              
              <button 
                onClick={() => handleConsent('selected')}
                disabled={!consentAppUse || !consentOverseas}
                style={{ width: '100%', fontSize: '0.9rem', padding: '1rem', background: 'transparent', border: 'none', color: (!consentAppUse || !consentOverseas) ? '#ccc' : 'var(--color-text-muted)', cursor: (!consentAppUse || !consentOverseas) ? 'not-allowed' : 'pointer' }}
              >
                Seçilenleri Onayla ve Devam Et
              </button>
            </div>
            
          </motion.div>
        )}

        {step === 1 && (
          <motion.div 
            key="step1"
            variants={variants}
            initial="enter" animate="center" exit="exit" transition={{ duration: 0.4 }}
            className="glass-card" 
            style={{ maxWidth: '400px', width: '100%', position: 'relative', textAlign: 'center', padding: '2.5rem 1.5rem' }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{ position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)' }}
            >
              <div className="btn-icon" style={{ width: '60px', height: '60px', backgroundColor: 'var(--color-primary)', color: 'white' }}>
                <Heart size={32} />
              </div>
            </motion.div>
            
            <h1 style={{ marginTop: '20px', fontSize: '2.2rem', color: 'var(--color-text-main)' }}>Hoş Geldiniz!</h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', marginBottom: '2rem' }}>
              Mucizenize kavuşacağınız bu harika yolculukta, bebeğinizin büyüme serüvenine eşlik etmek için sabırsızlanıyoruz.
            </p>

            <button 
              className="btn-primary" 
              onClick={() => setStep(2)}
              style={{ width: '100%', fontSize: '1.2rem', padding: '1.2rem' }}
            >
              Neler Sunuyoruz?
              <ArrowRight size={20} />
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            variants={variants}
            initial="enter" animate="center" exit="exit" transition={{ duration: 0.4 }}
            className="glass-card" 
            style={{ maxWidth: '500px', width: '100%', padding: '2rem 1.5rem', position: 'relative' }}
          >
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <Sparkles size={32} color="var(--color-primary)" style={{ marginBottom: '0.5rem' }} />
              <h2 style={{ fontSize: '1.6rem', color: 'var(--color-text-main)', margin: '0 0 0.5rem 0' }}>
                Hamileliğin Her Aşamasında Yanınızdayız
              </h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
                Klasik bir takip uygulamasından çok daha fazlası.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
              
              {/* Column Headers */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', color: '#8892b0', fontWeight: 'bold', fontSize: '0.85rem' }}>
                  <XCircle size={16} /> MyBaby Olmadan
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', color: 'var(--color-primary)', fontWeight: 'bold', fontSize: '0.85rem' }}>
                  <CheckCircle2 size={16} /> MyBaby İle
                </div>
              </div>

              {/* Comparison Row 1 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ background: 'rgba(0,0,0,0.03)', padding: '1rem', borderRadius: '12px', opacity: 0.7, borderLeft: '3px solid #8892b0' }}>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-main)' }}>Kafa karıştıran, ezber internet makaleleri.</p>
                </div>
                <div style={{ background: 'rgba(255,196,164,0.15)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--color-primary)', borderLeft: '3px solid var(--color-primary)' }}>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-main)' }}>Doktor notlarınızı okuyup, <b>sizi tanıyan</b> Akıllı Yapay Zeka Asistanı.</p>
                </div>
              </div>

              {/* Comparison Row 2 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ background: 'rgba(0,0,0,0.03)', padding: '1rem', borderRadius: '12px', opacity: 0.7, borderLeft: '3px solid #8892b0' }}>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-main)' }}>Manuel gün sayma ve karmaşık tıbbi hesaplar.</p>
                </div>
                <div style={{ background: 'rgba(212,224,181,0.2)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--color-secondary)', borderLeft: '3px solid var(--color-secondary)' }}>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-main)' }}>SAT bazlı <b>otomatik ve milimetrik</b> gebelik/yaş hesaplamaları.</p>
                </div>
              </div>

              {/* Comparison Row 3 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ background: 'rgba(0,0,0,0.03)', padding: '1rem', borderRadius: '12px', opacity: 0.7, borderLeft: '3px solid #8892b0' }}>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-main)' }}>Yalnız hissedilen stresli bir süreç.</p>
                </div>
                <div style={{ background: 'rgba(198,194,245,0.15)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--color-accent)', borderLeft: '3px solid var(--color-accent)' }}>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-main)' }}>Her gün sizinle konuşan, heyecanınızı paylaşan <b>empati dolu</b> bir yol arkadaşı.</p>
                </div>
              </div>

            </div>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary" 
              onClick={() => navigate('/onboarding')}
              style={{ width: '100%', fontSize: '1.15rem', padding: '1.2rem', background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))', border: 'none' }}
            >
              Bu Mükemmel Serüvene Başla
              <Baby size={22} style={{ marginLeft: '0.5rem' }}/>
            </motion.button>
            
            <button 
              onClick={() => setStep(1)} 
              style={{ background: 'transparent', border: 'none', color: 'var(--color-text-muted)', width: '100%', marginTop: '1rem', fontSize: '0.9rem', cursor: 'pointer' }}
            >
              Geri Dön
            </button>
            
          </motion.div>
        )}
      </AnimatePresence>

      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {showPrivacyModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}
            onClick={() => setShowPrivacyModal(false)}
          >
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
              onClick={e => e.stopPropagation()}
              style={{ width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', backgroundColor: 'var(--color-bg)', padding: '0' }}
            >
              <div style={{ position: 'sticky', top: 0, zIndex: 10, padding: '1.5rem 1.5rem 1rem', background: 'var(--color-bg)', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ margin: 0, fontSize: '1.3rem', color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ShieldCheck size={22} color="var(--color-primary)" /> Gizlilik Politikası
                </h2>
                <button onClick={() => setShowPrivacyModal(false)} style={{ background: 'rgba(0,0,0,0.05)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', fontSize: '1.2rem', color: 'var(--color-text-muted)' }}>✕</button>
              </div>

              <div style={{ padding: '1.5rem', color: 'var(--color-text-main)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                <p style={{ marginBottom: '1rem', color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>Son güncelleme: Mayıs 2026</p>

                <h3 style={{ color: 'var(--color-primary)', fontSize: '1.05rem', marginBottom: '0.5rem' }}>1. Toplanan Veriler</h3>
                <p style={{ marginBottom: '1rem' }}>MyBaby uygulaması, size kişiselleştirilmiş bir hamilelik ve doğurganlık deneyimi sunmak amacıyla aşağıdaki bilgileri toplar:</p>
                <ul style={{ marginBottom: '1.2rem', paddingLeft: '1.2rem' }}>
                  <li>Ad ve yaş bilgisi</li>
                  <li>Boy, kilo ve fiziksel ölçümler</li>
                  <li>Hamilelik durumu, son adet tarihi</li>
                  <li>Doktor notları ve muayene bilgileri</li>
                  <li>Sağlık hedefleri ve tercihler</li>
                </ul>

                <h3 style={{ color: 'var(--color-primary)', fontSize: '1.05rem', marginBottom: '0.5rem' }}>2. Verilerin Saklanması</h3>
                <p style={{ marginBottom: '1.2rem' }}>Tüm kişisel verileriniz <strong>yalnızca cihazınızda (localStorage)</strong> saklanır. Verileriniz sunucularımıza gönderilmez ve bulut ortamında depolanmaz. Uygulama sildiğinizde veya tarayıcı verilerini temizlediğinizde tüm bilgileriniz kalıcı olarak silinir.</p>

                <h3 style={{ color: 'var(--color-primary)', fontSize: '1.05rem', marginBottom: '0.5rem' }}>3. Yapay Zeka Kullanımı</h3>
                <p style={{ marginBottom: '1.2rem' }}>MyBaby, size kişiselleştirilmiş içerik sunmak için Google Gemini AI hizmetini kullanır. Yapay zekaya gönderilen bilgiler (hamilelik haftası, yaş, sağlık notları) yalnızca anlık içerik üretimi için kullanılır ve Google tarafından saklanmaz.</p>

                <h3 style={{ color: 'var(--color-primary)', fontSize: '1.05rem', marginBottom: '0.5rem' }}>4. Üçüncü Taraflarla Paylaşım</h3>
                <p style={{ marginBottom: '1.2rem' }}>Kişisel verileriniz, açık onayınız olmadan hiçbir üçüncü tarafla paylaşılmaz, satılmaz veya kiralanmaz. Reklam onayı vermeniz halinde, kişiselleştirilmiş reklam gösterimi için anonim kullanım verileri kullanılabilir.</p>

                <h3 style={{ color: 'var(--color-primary)', fontSize: '1.05rem', marginBottom: '0.5rem' }}>5. Haklarınız</h3>
                <ul style={{ marginBottom: '1.2rem', paddingLeft: '1.2rem' }}>
                  <li><strong>Erişim hakkı:</strong> Saklanan verilerinizi istediğiniz zaman Profil sayfasından görüntüleyebilirsiniz.</li>
                  <li><strong>Silme hakkı:</strong> Tüm verilerinizi Profil sayfasındaki "Sıfırla" butonu ile kalıcı olarak silebilirsiniz.</li>
                  <li><strong>Onay geri çekme:</strong> Reklam onayınızı istediğiniz zaman geri çekebilirsiniz.</li>
                </ul>

                <h3 style={{ color: 'var(--color-primary)', fontSize: '1.05rem', marginBottom: '0.5rem' }}>6. İletişim</h3>
                <p style={{ marginBottom: '1.5rem' }}>Gizlilik politikamızla ilgili sorularınız için bizimle iletişime geçebilirsiniz.</p>

                <button 
                  onClick={() => setShowPrivacyModal(false)} 
                  className="btn-primary"
                  style={{ width: '100%', padding: '1rem', fontSize: '1rem' }}
                >
                  Anladım, Kapat
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
