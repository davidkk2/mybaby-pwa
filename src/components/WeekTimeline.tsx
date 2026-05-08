import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { weeklyData } from '../data/weeklyData';

interface WeekTimelineProps {
  currentWeek: number;
  onWeekSelect: (week: number) => void;
}

export default function WeekTimeline({ currentWeek, onWeekSelect }: WeekTimelineProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to the selected week when the component mounts or week changes
  useEffect(() => {
    if (scrollRef.current) {
      const selectedElement = scrollRef.current.querySelector(`[data-week="${currentWeek}"]`) as HTMLElement;
      if (selectedElement) {
        const containerWidth = scrollRef.current.clientWidth;
        const scrollPosition = selectedElement.offsetLeft - (containerWidth / 2) + (selectedElement.offsetWidth / 2);
        scrollRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
      }
    }
  }, [currentWeek]);

  return (
    <div style={{ padding: '1.5rem 0', background: 'var(--color-bg)', position: 'relative' }}>
      <div style={{ padding: '0 1.5rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--color-text-main)' }}>Zaman Tüneli</h3>
        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Hafta hafta keşfet</p>
      </div>
      
      <div 
        ref={scrollRef}
        className="hide-scrollbar"
        style={{ 
          display: 'flex', 
          gap: '0.8rem', 
          padding: '0 1.5rem', 
          overflowX: 'auto', 
          scrollBehavior: 'smooth',
          paddingBottom: '1rem', // Space for scrollbar
        }}
      >
        {Object.values(weeklyData).map((data) => {
          const isSelected = data.week === currentWeek;
          return (
            <motion.div
              key={data.week}
              data-week={data.week}
              onClick={() => onWeekSelect(data.week)}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: isSelected ? 'var(--color-primary)' : 'white',
                color: isSelected ? 'white' : 'var(--color-text-main)',
                minWidth: '100px',
                height: '80px',
                borderRadius: '16px',
                padding: '0.8rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                boxShadow: isSelected ? '0 8px 20px rgba(255, 196, 164, 0.4)' : '0 4px 10px rgba(0,0,0,0.03)',
                border: isSelected ? 'none' : '1px solid rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease',
                flexShrink: 0
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: '800', lineHeight: 1 }}>{data.week}</div>
                <div style={{ fontSize: '1.5rem', lineHeight: 1 }}>{data.emoji}</div>
              </div>
              <div style={{ fontSize: '0.7rem', fontWeight: '600', opacity: isSelected ? 0.9 : 0.6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Hafta
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
