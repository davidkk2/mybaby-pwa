import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Clock, X, Sparkles } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ReactMarkdown from 'react-markdown';

export interface BlogEntry {
  id: number;
  title: string;
  summary: string;
  tags: string[];
  emoji: string;
}

interface BlogSectionProps {
  blogs: BlogEntry[];
  profile: any;
  isLoading: boolean;
}

export default function BlogSection({ blogs, profile, isLoading }: BlogSectionProps) {
  const [selectedBlog, setSelectedBlog] = useState<BlogEntry | null>(null);
  const [articleContent, setArticleContent] = useState("");
  const [isArticleLoading, setIsArticleLoading] = useState(false);

  const handleOpenBlog = async (blog: BlogEntry) => {
    setSelectedBlog(blog);
    setIsArticleLoading(true);
    setArticleContent("");

    // Check cache first
    const cacheKey = `mybaby_blog_${blog.id}_${blog.title.slice(0,20)}_${new Date().toDateString()}`;
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      setArticleContent(cached);
      setIsArticleLoading(false);
      return;
    }

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const isTTC = profile.status === 'trying';

      const prompt = `Sen uzman bir ${isTTC ? 'doğurganlık ve kadın sağlığı' : 'hamilelik ve anne-bebek sağlığı'} blog yazarısın. Türkçe yaz.

Kullanıcı Profili:
- Durum: ${isTTC ? 'Hamile kalmaya çalışıyor' : `${profile.weeks || '?'} haftalık hamile`}
- Yaş: ${profile.age || '?'}
- Çalışıyor mu: ${profile.isWorking ? 'Evet' : 'Hayır'}
- Ana Hedef: ${profile.primaryGoal || '?'}
- Deneme Süresi: ${profile.tryDuration || '?'}

Blog Başlığı: "${blog.title}"
Blog Özeti: "${blog.summary}"

Bu başlık ve özete sadık kalarak, kullanıcının profiline özel çok tatlı, samimi ve bol emojili bir blog/dergi yazısı yaz.

Kurallar:
- Bilimsel verileri çok sıkıcı olmayan, eğlenceli ve sıcak bir sohbet havasında anlat.
- Kullanıcıya "sen" diye hitap et ve bol bol moral ver.
- Uzun paragraflardan kesinlikle kaçın. Okuması çok kolay, hap bilgiler şeklinde olsun (Maksimum 300 kelime).
- Markdown formatını TAM olarak kullan (kalın başlıklar, alt başlıklar, listeler, bullet pointler).
- Yazının sonunda mutlaka mini bir motivasyon cümlesi olsun.`;

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      setArticleContent(text);
      setIsArticleLoading(false);

      // Cache the article
      try { sessionStorage.setItem(cacheKey, text); } catch(e) {}

    } catch (err) {
      setArticleContent("Yazı yüklenirken bir sorun oluştu. Lütfen daha sonra tekrar deneyin.");
      setIsArticleLoading(false);
    }
  };

  const tagColors: Record<string, string> = {
    'Beslenme': '#d4e0b5',
    'Psikoloji': '#c6c2f5',
    'Egzersiz': '#ffc4a4',
    'Tıbbi': '#ff8a8a',
    'Bebek': '#fde28f',
    'Doğurganlık': '#c6c2f5',
    'Yaşam': '#d4e0b5',
    'İpucu': '#ffc4a4',
  };

  const getTagColor = (tag: string) => {
    for (const [key, color] of Object.entries(tagColors)) {
      if (tag.toLowerCase().includes(key.toLowerCase())) return color;
    }
    return '#e0e0e0';
  };

  if (isLoading) {
    return (
      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-main)', fontSize: '1.3rem', marginBottom: '1rem' }}>
          <BookOpen size={22} color="var(--color-primary)" /> Mevcut Döngünüze Göre
        </h3>
        <div className="hide-scrollbar" style={{ display: 'flex', gap: '0.8rem', overflowX: 'auto', paddingBottom: '0.8rem' }}>
          {[1,2,3].map(i => (
            <div key={i} style={{ background: 'rgba(0,0,0,0.03)', borderRadius: '16px', minWidth: '220px', height: '180px', flexShrink: 0, animation: 'pulse 1.5s infinite' }} />
          ))}
        </div>
      </div>
    );
  }

  if (!blogs || blogs.length === 0) return null;

  return (
    <>
      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-main)', fontSize: '1.3rem', marginBottom: '0.3rem' }}>
          <BookOpen size={22} color="var(--color-primary)" /> Mevcut Döngünüze Göre
        </h3>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', margin: '0 0 1rem 0' }}>Size özel hazırlanmış yazılar</p>

        <div className="hide-scrollbar" style={{ 
          display: 'flex', 
          gap: '0.8rem', 
          overflowX: 'auto', 
          paddingBottom: '0.8rem',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch'
        }}>
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              onClick={() => handleOpenBlog(blog)}
              style={{
                background: 'white',
                borderRadius: '18px',
                padding: '1.2rem',
                cursor: 'pointer',
                boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                border: '1px solid rgba(0,0,0,0.04)',
                minWidth: '200px',
                maxWidth: '200px',
                flexShrink: 0,
                scrollSnapAlign: 'start',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.6rem',
                transition: 'all 0.2s'
              }}
              whileHover={{ scale: 1.03, boxShadow: '0 6px 24px rgba(0,0,0,0.1)' }}
              whileTap={{ scale: 0.97 }}
            >
              <div style={{ fontSize: '2rem', lineHeight: 1 }}>{blog.emoji}</div>
              <h4 style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-main)', lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{blog.title}</h4>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-text-muted)', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', flex: 1 }}>{blog.summary}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap', marginTop: 'auto' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>
                  <Clock size={10} /> 5 dk
                </span>
                {blog.tags.slice(0, 1).map((tag, ti) => (
                  <span key={ti} style={{ fontSize: '0.6rem', padding: '0.12rem 0.45rem', borderRadius: '6px', background: getTagColor(tag), color: '#4a4453', fontWeight: '600' }}>{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Blog Reader Modal */}
      <AnimatePresence>
        {selectedBlog && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}
            onClick={() => setSelectedBlog(null)}
          >
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
              onClick={e => e.stopPropagation()}
              style={{ width: '100%', maxWidth: '600px', maxHeight: '92vh', overflowY: 'auto', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', backgroundColor: 'var(--color-bg)', padding: '0' }}
            >
              {/* Article Header */}
              <div style={{ position: 'sticky', top: 0, zIndex: 10, padding: '1.5rem 1.5rem 1rem', background: 'linear-gradient(to bottom, var(--color-bg), var(--color-bg))', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '1.5rem' }}>{selectedBlog.emoji}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        <Clock size={12} /> 5 dakika okuma
                      </span>
                    </div>
                    <h2 style={{ margin: 0, fontSize: '1.3rem', color: 'var(--color-text-main)', lineHeight: 1.3 }}>{selectedBlog.title}</h2>
                  </div>
                  <button onClick={() => setSelectedBlog(null)} style={{ background: 'rgba(0,0,0,0.05)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', flexShrink: 0 }}>
                    <X size={18} color="var(--color-text-muted)" />
                  </button>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.8rem' }}>
                  {selectedBlog.tags.map((tag, ti) => (
                    <span key={ti} style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem', borderRadius: '8px', background: getTagColor(tag), color: '#4a4453', fontWeight: '600' }}>{tag}</span>
                  ))}
                </div>
              </div>

              {/* Article Body */}
              <div style={{ padding: '1.5rem' }}>
                {isArticleLoading ? (
                  <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--color-text-muted)' }}>
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }} style={{ display: 'inline-block', marginBottom: '1rem' }}>
                      <Sparkles size={32} color="var(--color-primary)" />
                    </motion.div>
                    <p style={{ fontSize: '1rem' }}>Yazınız size özel hazırlanıyor...</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Bu bir kaç saniye sürebilir.</p>
                  </div>
                ) : (
                  <div style={{ color: 'var(--color-text-main)', fontSize: '1rem', lineHeight: 1.8 }} className="markdown-content">
                    <ReactMarkdown>{articleContent}</ReactMarkdown>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
