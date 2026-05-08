import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Calendar, Ruler, Pill, FileText, Plus, Trash2, CalendarHeart } from 'lucide-react';
import Navigation from '../components/Navigation';

export interface Visit {
  id: string;
  date: string;
  week: number;
  actualSize: string;
  medications: string;
  notes: string;
}

export default function DoctorNotes() {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [nextApptDate, setNextApptDate] = useState('');
  const [nextApptTime, setNextApptTime] = useState('');

  // Form State
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [visitWeek, setVisitWeek] = useState(0);
  const [actualSize, setActualSize] = useState('');
  const [medications, setMedications] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const profileData = localStorage.getItem('mybaby_profile');
    if (profileData) {
      const parsed = JSON.parse(profileData);
      setProfile(parsed);
      setVisitWeek(parsed.weeks); // Default to current week
      if (parsed.nextAppointmentDate) setNextApptDate(parsed.nextAppointmentDate);
      if (parsed.nextAppointmentTime) setNextApptTime(parsed.nextAppointmentTime);
    }

    const visitsData = localStorage.getItem('mybaby_visits');
    if (visitsData) setVisits(JSON.parse(visitsData));
  }, []);

  const handleSave = () => {
    if (!profile) return;
    
    const newVisit: Visit = {
      id: Date.now().toString(),
      date,
      week: visitWeek, // Use the selected week
      actualSize,
      medications,
      notes
    };

    const updatedVisits = [newVisit, ...visits].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setVisits(updatedVisits);
    localStorage.setItem('mybaby_visits', JSON.stringify(updatedVisits));
    
    // Reset form
    setActualSize('');
    setMedications('');
    setNotes('');
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    const updatedVisits = visits.filter(v => v.id !== id);
    setVisits(updatedVisits);
    localStorage.setItem('mybaby_visits', JSON.stringify(updatedVisits));
  };

  const handleSaveAppointment = () => {
    const updatedProfile = { ...profile, nextAppointmentDate: nextApptDate, nextAppointmentTime: nextApptTime };
    setProfile(updatedProfile);
    localStorage.setItem('mybaby_profile', JSON.stringify(updatedProfile));
    setShowAppointmentForm(false);
  };

  const handleDeleteAppointment = () => {
    const updatedProfile = { ...profile };
    delete updatedProfile.nextAppointmentDate;
    delete updatedProfile.nextAppointmentTime;
    setProfile(updatedProfile);
    localStorage.setItem('mybaby_profile', JSON.stringify(updatedProfile));
    setNextApptDate('');
    setNextApptTime('');
  };

  return (
    <>
      <motion.div 
        className="container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ padding: '1.5rem', maxWidth: '600px', margin: '0 auto', minHeight: '100vh', paddingBottom: '6rem' }}
      >
        <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.6rem', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Stethoscope size={24} /> {profile?.status === 'trying' ? 'Sağlık Notları' : 'Doktor Notları'}
            </h1>
            <p style={{ color: 'var(--color-text-muted)', margin: '0.2rem 0 0 0', fontSize: '0.9rem' }}>{profile?.status === 'trying' ? 'Sağlık ve doktor takip notlarınızı kaydedin.' : 'Muayene bilgilerinizi kaydedin.'}</p>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)} 
            className="btn-primary" 
            style={{ width: '40px', height: '40px', padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%' }}
          >
            <Plus size={20} />
          </button>
        </header>

        {/* Upcoming Appointment Section */}
        <div style={{ marginBottom: '2rem' }}>
          {profile?.nextAppointmentDate ? (
            <div className="glass-card" style={{ padding: '1.2rem', background: 'linear-gradient(135deg, rgba(198,194,245,0.2), rgba(198,194,245,0.05))', border: '1px solid rgba(198,194,245,0.4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ background: 'var(--color-accent)', color: 'white', width: '48px', height: '48px', borderRadius: '14px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <CalendarHeart size={24} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--color-accent)' }}>Sıradaki Randevunuz</h3>
                  <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--color-text-main)', fontWeight: 'bold' }}>
                    {new Date(profile.nextAppointmentDate).toLocaleDateString('tr-TR')} {profile.nextAppointmentTime && `- ${profile.nextAppointmentTime}`}
                  </p>
                </div>
              </div>
              <button onClick={handleDeleteAppointment} style={{ background: 'none', border: 'none', color: '#ff8a8a', cursor: 'pointer' }}>
                <Trash2 size={20} />
              </button>
            </div>
          ) : (
            <>
              {!showAppointmentForm ? (
                <button 
                  onClick={() => setShowAppointmentForm(true)}
                  style={{ width: '100%', padding: '1rem', background: 'rgba(0,0,0,0.03)', border: '2px dashed rgba(0,0,0,0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' }}
                >
                  <CalendarHeart size={20} /> Gelecek Randevunuzu Ekleyin
                </button>
              ) : (
                <div className="glass-card" style={{ padding: '1.5rem', border: '2px solid var(--color-accent)' }}>
                  <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color-accent)' }}>Randevu Planla</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Tarih</label>
                      <input type="date" value={nextApptDate} onChange={(e) => setNextApptDate(e.target.value)} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Saat (Opsiyonel)</label>
                      <input type="time" value={nextApptTime} onChange={(e) => setNextApptTime(e.target.value)} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)' }} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn-primary" onClick={handleSaveAppointment} style={{ flex: 1, background: 'var(--color-accent)', padding: '0.8rem' }} disabled={!nextApptDate}>Kaydet</button>
                    <button onClick={() => setShowAppointmentForm(false)} style={{ flex: 1, background: 'transparent', border: '1px solid var(--color-text-muted)', color: 'var(--color-text-muted)', borderRadius: '24px', padding: '0.8rem' }}>İptal</button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {showForm && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="glass-card" 
            style={{ padding: '1.5rem', marginBottom: '2rem', border: '2px solid var(--color-primary)' }}
          >
            <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color-primary)' }}>{profile?.status === 'trying' ? 'Yeni Sağlık Notu' : 'Yeni Muayene Kaydı'}</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem', fontSize: '0.9rem', color: 'var(--color-text-main)', fontWeight: 'bold' }}>
                    <Calendar size={16} /> Tarih
                  </label>
                  <input 
                    type="date" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)}
                    style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0,0,0,0.1)', outline: 'none' }}
                  />
                </div>
                {profile?.status !== 'trying' && (
                  <div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem', fontSize: '0.9rem', color: 'var(--color-text-main)', fontWeight: 'bold' }}>
                      Kaçıncı Hafta?
                    </label>
                    <input 
                      type="number" 
                      value={visitWeek} 
                      onChange={(e) => setVisitWeek(parseInt(e.target.value) || 0)}
                      style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0,0,0,0.1)', outline: 'none' }}
                    />
                  </div>
                )}
              </div>

              {profile?.status !== 'trying' && (
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem', fontSize: '0.9rem', color: 'var(--color-text-main)', fontWeight: 'bold' }}>
                  <Ruler size={16} /> Bebeğin Gerçek Boyutu
                </label>
                <input 
                  type="text" 
                  placeholder="Örn: 7.2 mm"
                  value={actualSize} 
                  onChange={(e) => setActualSize(e.target.value)}
                  style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0,0,0,0.1)', outline: 'none' }}
                />
                <small style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', marginTop: '0.3rem', display: 'block' }}>Girerseniz ana sayfada bu boyut görünür.</small>
              </div>
              )}

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem', fontSize: '0.9rem', color: 'var(--color-text-main)', fontWeight: 'bold' }}>
                  <Pill size={16} /> İlaçlar / Vitaminler
                </label>
                <input 
                  type="text" 
                  placeholder="Örn: Folik Asit, Kan İlacı"
                  value={medications} 
                  onChange={(e) => setMedications(e.target.value)}
                  style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0,0,0,0.1)', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem', fontSize: '0.9rem', color: 'var(--color-text-main)', fontWeight: 'bold' }}>
                  <FileText size={16} /> Doktorun Yorumu
                </label>
                <textarea 
                  placeholder="Örn: Gelişimi 1 hafta önden gidiyor, her şey yolunda."
                  value={notes} 
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0,0,0,0.1)', outline: 'none', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <button className="btn-primary" onClick={handleSave} style={{ flex: 1, padding: '0.8rem' }}>Kaydet</button>
                <button onClick={() => setShowForm(false)} style={{ flex: 1, padding: '0.8rem', background: 'transparent', border: '1px solid var(--color-text-muted)', borderRadius: 'var(--radius-full)', color: 'var(--color-text-muted)', cursor: 'pointer' }}>İptal</button>
              </div>
            </div>
          </motion.div>
        )}

        {visits.length === 0 && !showForm ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--color-text-muted)' }}>
            <Stethoscope size={48} opacity={0.2} style={{ margin: '0 auto 1rem auto' }} />
            <p>{profile?.status === 'trying' ? 'Henüz bir sağlık notu eklemediniz.' : 'Henüz bir doktor notu eklemediniz.'}</p>
            <p style={{ fontSize: '0.9rem' }}>Sağ üstteki + butonuna basarak ilk kaydınızı oluşturabilirsiniz.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {visits.map((visit) => (
              <div key={visit.id} className="glass-card" style={{ padding: '1.2rem', position: 'relative' }}>
                <button 
                  onClick={() => handleDelete(visit.id)}
                  style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: '#ff8a8a', cursor: 'pointer' }}
                  title="Sil"
                >
                  <Trash2 size={18} />
                </button>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
                  <span style={{ background: 'var(--color-primary)', color: 'white', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    {visit.week}. Hafta
                  </span>
                  <span style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>{new Date(visit.date).toLocaleDateString('tr-TR')}</span>
                </div>

                {visit.actualSize && (
                  <div style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.4rem', alignItems: 'flex-start' }}>
                    <Ruler size={16} color="var(--color-secondary)" style={{ marginTop: '2px' }} />
                    <span style={{ fontSize: '0.95rem' }}><strong>Boyut:</strong> {visit.actualSize}</span>
                  </div>
                )}
                
                {visit.medications && (
                  <div style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.4rem', alignItems: 'flex-start' }}>
                    <Pill size={16} color="var(--color-accent)" style={{ marginTop: '2px' }} />
                    <span style={{ fontSize: '0.95rem' }}><strong>İlaçlar:</strong> {visit.medications}</span>
                  </div>
                )}

                {visit.notes && (
                  <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'flex-start', marginTop: '0.8rem', padding: '0.8rem', background: 'rgba(255,255,255,0.5)', borderRadius: 'var(--radius-sm)' }}>
                    <FileText size={16} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.95rem', fontStyle: 'italic' }}>"{visit.notes}"</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </motion.div>
      <Navigation />
    </>
  );
}
