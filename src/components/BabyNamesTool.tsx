import React, { useState, useMemo, useEffect } from 'react';
import { Search, Heart, Baby, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { babyNames } from '../data/babyNamesData';

const ALPHABET = 'ABCDEFGHIJKLMNOPRSŞTUVYZ'.split('');

export default function BabyNamesTool() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGender, setSelectedGender] = useState<'all' | 'boy' | 'girl' | 'unisex'>('all');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('mybaby_favorite_names');
    if (saved) {
      try { setFavorites(JSON.parse(saved)); } catch (e) {}
    }
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const isFav = prev.includes(id);
      const newFavs = isFav ? prev.filter(f => f !== id) : [...prev, id];
      localStorage.setItem('mybaby_favorite_names', JSON.stringify(newFavs));
      return newFavs;
    });
  };

  const isPristine = !searchTerm && selectedGender === 'all' && selectedLetter === null && !showOnlyFavorites;

  const filteredNames = useMemo(() => {
    if (isPristine) return []; // Hiçbir arama/filtre yoksa boş döndür

    return babyNames.filter(name => {
      if (showOnlyFavorites && !favorites.includes(name.id)) return false;
      if (selectedGender !== 'all' && name.gender !== selectedGender) return false;
      if (selectedLetter && !name.name.toUpperCase().startsWith(selectedLetter)) return false;
      if (searchTerm) {
        const lowerSearch = searchTerm.toLowerCase();
        return name.name.toLowerCase().includes(lowerSearch) || name.meaning.toLowerCase().includes(lowerSearch);
      }
      return true;
    }).sort((a, b) => a.name.localeCompare(b.name, 'tr'));
  }, [searchTerm, selectedGender, selectedLetter, showOnlyFavorites, favorites]);

  return (
    <div style={{ background: 'white', borderRadius: '30px', padding: '1.5rem', boxShadow: '0 10px 40px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ width: '50px', height: '50px', borderRadius: '15px', background: 'var(--color-primary)', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 15px rgba(255, 196, 164, 0.5)' }}>
          <Baby size={28} />
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--color-text-main)', fontWeight: '800' }}>İsim Bulucu</h2>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Mükemmel ismi keşfedin</p>
        </div>
        <button 
          onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
          style={{ background: showOnlyFavorites ? '#ffe8e8' : '#f5f5f5', border: 'none', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: showOnlyFavorites ? '#e74c3c' : 'var(--color-text-muted)', cursor: 'pointer', transition: 'all 0.2s' }}
        >
          <Heart size={20} fill={showOnlyFavorites ? '#e74c3c' : 'none'} />
        </button>
      </div>

      <div style={{ position: 'relative' }}>
        <input 
          type="text" 
          placeholder="İsim veya anlama göre ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '15px', border: '1px solid rgba(0,0,0,0.1)', background: '#fcfcfc', fontSize: '1rem', color: 'var(--color-text-main)', outline: 'none' }}
        />
        <Search size={20} color="var(--color-text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
        {searchTerm && (
          <button onClick={() => setSearchTerm('')} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        )}
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', scrollbarWidth: 'none' }}>
        {[
          { id: 'all', label: 'Tümü', emoji: '🌟' },
          { id: 'girl', label: 'Kız', emoji: '👧' },
          { id: 'boy', label: 'Erkek', emoji: '👦' },
          { id: 'unisex', label: 'Üniseks', emoji: '💛' }
        ].map(gender => (
          <button
            key={gender.id}
            onClick={() => setSelectedGender(gender.id as any)}
            style={{ padding: '0.6rem 1.2rem', borderRadius: '20px', border: 'none', background: selectedGender === gender.id ? 'var(--color-primary)' : '#f5f5f5', color: selectedGender === gender.id ? 'white' : 'var(--color-text-main)', fontSize: '0.95rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap', transition: 'all 0.2s' }}
          >
            <span>{gender.emoji}</span> {gender.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.5rem', scrollbarWidth: 'none', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <button onClick={() => setSelectedLetter(null)} style={{ width: '36px', height: '36px', flexShrink: 0, borderRadius: '50%', border: 'none', background: selectedLetter === null ? 'var(--color-secondary)' : 'transparent', color: selectedLetter === null ? 'white' : 'var(--color-text-muted)', fontWeight: 'bold', cursor: 'pointer' }}>Tüm</button>
        {ALPHABET.map(letter => (
          <button key={letter} onClick={() => setSelectedLetter(letter)} style={{ width: '36px', height: '36px', flexShrink: 0, borderRadius: '50%', border: 'none', background: selectedLetter === letter ? 'var(--color-secondary)' : 'transparent', color: selectedLetter === letter ? 'white' : 'var(--color-text-main)', fontWeight: 'bold', cursor: 'pointer' }}>
            {letter}
          </button>
        ))}
      </div>

      <div style={{ maxHeight: '400px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', paddingRight: '0.5rem' }}>
        <AnimatePresence mode="popLayout">
          {isPristine ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ textAlign: 'center', padding: '3rem 1rem', background: '#fcfcfc', borderRadius: '20px', border: '1px dashed rgba(0,0,0,0.1)' }}>
              <Baby size={40} color="var(--color-text-muted)" style={{ opacity: 0.5, marginBottom: '1rem' }} />
              <p style={{ color: 'var(--color-text-main)', fontWeight: '600', fontSize: '1.1rem', margin: '0 0 0.5rem 0' }}>1.000'den Fazla İsim Sizi Bekliyor</p>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: 0 }}>Yukarıdan arama yapın, harf seçin veya cinsiyete göre filtreleyin.</p>
            </motion.div>
          ) : filteredNames.length > 0 ? (
            filteredNames.slice(0, 100).map(name => ( // Sadece ilk 100'ü göstererek performansı artırıyoruz
              <motion.div key={name.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} style={{ background: '#fcfcfc', border: '1px solid rgba(0,0,0,0.03)', borderRadius: '20px', padding: '1.2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: name.gender === 'girl' ? '#ffe8e8' : name.gender === 'boy' ? '#e8f0ff' : '#f0e8ff', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.2rem' }}>
                  {name.gender === 'girl' ? '👧' : name.gender === 'boy' ? '👦' : '💛'}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--color-text-main)' }}>{name.name}</h3>
                    {name.isPopular && <Sparkles size={14} color="#e67e22" />}
                  </div>
                  <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: '1.4' }}>
                    <strong style={{ color: 'var(--color-primary)' }}>{name.origin}:</strong> {name.meaning}
                  </p>
                </div>
                <button onClick={() => toggleFavorite(name.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }}>
                  <Heart size={22} color={favorites.includes(name.id) ? '#e74c3c' : '#ccc'} fill={favorites.includes(name.id) ? '#e74c3c' : 'none'} />
                </button>
              </motion.div>
            ))
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ textAlign: 'center', padding: '2rem 1rem', background: '#fcfcfc', borderRadius: '20px', border: '1px dashed rgba(0,0,0,0.1)' }}>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '0', fontSize: '1rem' }}>
                {searchTerm ? `"${searchTerm}" ismini 1.000+ isimlik arşivimizde bulamadık.` : 'Bu kriterlere uygun isim bulunamadı.'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
