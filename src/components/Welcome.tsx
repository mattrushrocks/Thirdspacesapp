import { useNavigate } from 'react-router';
import { BookOpen } from 'lucide-react';
import Group1 from '../imports/Group1';

export function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-card p-12 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="w-32 h-28">
            <Group1 />
          </div>
        </div>
        
        <h1 className="mb-3" style={{ color: 'var(--primary)' }}>Third</h1>
        <p className="text-xl mb-2" style={{ color: 'var(--primary)' }}>Study. Vibe. Belong.</p>
        <p className="text-gray-600 mb-8">
          Make focus social, studying communal, and wellbeing collective.
        </p>
        
        <button
          onClick={() => navigate('/auth')}
          className="w-full py-3 px-6 rounded-xl text-white transition-all"
          style={{ backgroundColor: 'var(--primary)' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3a3d52'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--primary)'}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}