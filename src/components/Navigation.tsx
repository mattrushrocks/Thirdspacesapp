import { Home, MapPin, PlusCircle, Users, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';
import Group1 from '../imports/Group1';

export function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/spaces', icon: MapPin, label: 'Spaces' },
    { path: '/create', icon: PlusCircle, label: 'Create' },
    { path: '/groups', icon: Users, label: 'Groups' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass-card border-t border-gray-200 safe-area-inset-bottom md:top-0 md:bottom-auto md:border-b md:border-t-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center md:justify-between py-3">
          {/* Logo - only visible on desktop */}
          <div className="hidden md:flex items-center gap-2">
            <div className="w-10 h-9">
              <Group1 />
            </div>
            <span className="font-semibold" style={{ color: 'var(--primary)' }}>Third</span>
          </div>

          {/* Navigation Items */}
          <div className="flex justify-around md:justify-center md:gap-8 flex-1 md:flex-initial">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all md:flex-row md:gap-2"
                  style={{
                    color: active ? 'var(--primary)' : '#6B7280',
                  }}
                >
                  <Icon className="w-6 h-6" fill={active ? 'currentColor' : 'none'} />
                  <span className="text-xs md:text-sm">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}