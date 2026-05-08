import { Home, User, Stethoscope } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Ana Sayfa', icon: <Home size={24} /> },
    { path: '/doctor', label: 'Doktor', icon: <Stethoscope size={24} /> },
    { path: '/profile', label: 'Profilim', icon: <User size={24} /> }
  ];

  return (
    <div className="bottom-nav">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.3rem',
              cursor: 'pointer',
              color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
              transition: 'all 0.2s ease',
              transform: isActive ? 'scale(1.1)' : 'scale(1)'
            }}
          >
            {item.icon}
            <span style={{ fontSize: '0.75rem', fontWeight: isActive ? 'bold' : 'normal' }}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
