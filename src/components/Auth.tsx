import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useUser } from '../context/UserContext';
import { BookOpen, Mail, Lock, User as UserIcon } from 'lucide-react';
import Group1 from '../imports/Group1';

export function Auth() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    school: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication
    const newUser = {
      id: Math.random().toString(36).substring(7),
      name: formData.name || 'Demo User',
      email: formData.email || 'Demo@example.com',
      school: formData.school || 'Stanford University',
    };
    
    setUser(newUser);
    
    // Only show focus type setup for new signups
    if (isSignUp) {
      navigate('/setup');
    } else {
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-card p-8 max-w-md w-full">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-22">
            <Group1 />
          </div>
        </div>
        
        <h2 className="text-center mb-6">{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-sm mb-2" style={{ color: 'var(--primary)' }}>
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
                  placeholder="Sarah Chen"
                />
              </div>
            </div>
          )}
          
          <div>
            <label className="block text-sm mb-2" style={{ color: 'var(--primary)' }}>
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
                placeholder="you@university.edu"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm mb-2" style={{ color: 'var(--primary)' }}>
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
                placeholder="••••••••"
              />
            </div>
          </div>
          
          {isSignUp && (
            <div>
              <label className="block text-sm mb-2" style={{ color: 'var(--primary)' }}>
                School
              </label>
              <input
                type="text"
                value={formData.school}
                onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
                placeholder="Stanford University"
              />
            </div>
          )}
          
          <button
            type="submit"
            className="w-full py-3 px-6 rounded-xl text-white transition-all mt-6"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            {isSignUp ? 'Sign Up' : 'Log In'}
          </button>
        </form>
        
        <p className="text-center mt-6 text-sm text-gray-600">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="font-medium"
            style={{ color: 'var(--primary)' }}
          >
            {isSignUp ? 'Log In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
}