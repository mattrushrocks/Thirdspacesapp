import { useNavigate } from 'react-router';
import { Navigation } from './Navigation';
import { AlertCircle, Calendar, BookOpen } from 'lucide-react';
import Group1 from '../imports/Group1';

export function CreateMenu() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-20 md:pt-20">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Logo Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-9">
            <Group1 />
          </div>
          <h1>Create</h1>
        </div>

        <p className="text-gray-600 mb-6">Choose what you'd like to do</p>

        <div className="space-y-4">
          {/* Interrupt Mode Option */}
          <button
            onClick={() => navigate('/focus-room')}
            className="glass-card w-full p-6 text-left transition-all hover:shadow-lg"
            style={{ borderLeft: '6px solid var(--accent-1)' }}
          >
            <div className="flex items-start gap-4">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0" 
                style={{ backgroundColor: 'rgba(205, 117, 66, 0.15)' }}
              >
                <AlertCircle className="w-8 h-8" style={{ color: 'var(--accent-1)' }} />
              </div>
              <div className="flex-1">
                <h3 className="mb-2">Help Me Focus</h3>
                <p className="text-sm text-gray-600">
                  Join a live focus room instantly. Drop in when you need accountability and collective energy to power through.
                </p>
              </div>
            </div>
          </button>

          {/* Plan Session Option */}
          <button
            onClick={() => navigate('/create-session')}
            className="glass-card w-full p-6 text-left transition-all hover:shadow-lg"
            style={{ borderLeft: '6px solid var(--primary)' }}
          >
            <div className="flex items-start gap-4">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0" 
                style={{ backgroundColor: 'rgba(70, 74, 99, 0.15)' }}
              >
                <Calendar className="w-8 h-8" style={{ color: 'var(--primary)' }} />
              </div>
              <div className="flex-1">
                <h3 className="mb-2">Plan a Study Session</h3>
                <p className="text-sm text-gray-600">
                  Schedule a study session at a specific time and place. Invite friends or let others discover and join your session.
                </p>
              </div>
            </div>
          </button>

          {/* Add Assignment Option */}
          <button
            onClick={() => navigate('/add-assignment')}
            className="glass-card w-full p-6 text-left transition-all hover:shadow-lg"
            style={{ borderLeft: '6px solid var(--secondary)' }}
          >
            <div className="flex items-start gap-4">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0" 
                style={{ backgroundColor: 'rgba(218, 231, 123, 0.3)' }}
              >
                <BookOpen className="w-8 h-8" style={{ color: 'var(--primary)' }} />
              </div>
              <div className="flex-1">
                <h3 className="mb-2">Add Assignment</h3>
                <p className="text-sm text-gray-600">
                  Break down your assignments into manageable tasks. Plan your workload and track your study time progress.
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}