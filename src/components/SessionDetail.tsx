import { useParams, useNavigate } from 'react-router';
import { Navigation } from './Navigation';
import { mockSessions } from '../data/mockData';
import { Calendar, Clock, MapPin, Users as UsersIcon, Target, User as UserIcon, ChevronLeft, Users2 } from 'lucide-react';

export function SessionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const session = mockSessions.find(s => s.id === id);

  if (!session) {
    return (
      <div className="min-h-screen pb-20 md:pt-20">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="glass-card p-8 text-center">
            <p className="text-gray-600">Session not found</p>
            <button
              onClick={() => navigate('/home')}
              className="mt-4 px-6 py-2 rounded-lg text-white"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isFull = session.currentParticipants >= session.maxParticipants;
  const spotsLeft = session.maxParticipants - session.currentParticipants;

  return (
    <div className="min-h-screen pb-20 md:pt-20">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        {/* Session Header */}
        <div className="glass-card p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="mb-2">{session.title}</h1>
              <div className="flex items-center gap-2 text-sm">
                <span className="px-3 py-1 rounded-full" style={{ backgroundColor: 'var(--secondary)', color: 'var(--primary)' }}>
                  {session.class}
                </span>
                {session.isPrivate ? (
                  <span className="px-3 py-1 rounded-full bg-gray-200 text-gray-700">Private</span>
                ) : (
                  <span className="px-3 py-1 rounded-full" style={{ backgroundColor: 'var(--neutral-1)', color: 'var(--primary)' }}>Public</span>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl mb-1" style={{ color: 'var(--primary)' }}>
                {session.currentParticipants}/{session.maxParticipants}
              </div>
              <div className="text-xs text-gray-600">Participants</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--neutral-1)' }}>
                <Calendar className="w-5 h-5" style={{ color: 'var(--primary)' }} />
              </div>
              <div>
                <div className="text-sm text-gray-600">Date</div>
                <div style={{ color: 'var(--primary)' }}>
                  {new Date(session.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--neutral-1)' }}>
                <Clock className="w-5 h-5" style={{ color: 'var(--primary)' }} />
              </div>
              <div>
                <div className="text-sm text-gray-600">Time</div>
                <div style={{ color: 'var(--primary)' }}>{session.time}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--neutral-1)' }}>
                <MapPin className="w-5 h-5" style={{ color: 'var(--primary)' }} />
              </div>
              <div>
                <div className="text-sm text-gray-600">Location</div>
                <div style={{ color: 'var(--primary)' }}>{session.location}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--neutral-1)' }}>
                <UserIcon className="w-5 h-5" style={{ color: 'var(--primary)' }} />
              </div>
              <div>
                <div className="text-sm text-gray-600">Host</div>
                <div style={{ color: 'var(--primary)' }}>{session.hostName}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Session Goals */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-5 h-5" style={{ color: 'var(--primary)' }} />
            <h2>Session Goals</h2>
          </div>
          <p className="text-gray-700">{session.goals}</p>
        </div>

        {/* Demographics */}
        {session.demographics && (
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-3">
              <Users2 className="w-5 h-5" style={{ color: 'var(--primary)' }} />
              <h2>Who's This For?</h2>
            </div>
            <p className="text-gray-700">{session.demographics}</p>
          </div>
        )}

        {/* Participants */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2>
              <UsersIcon className="w-5 h-5 inline mr-2" />
              Participants ({session.currentParticipants})
            </h2>
            {!isFull && (
              <span className="text-sm" style={{ color: 'var(--accent-1)' }}>
                {spotsLeft} {spotsLeft === 1 ? 'spot' : 'spots'} left
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {session.participants.map((participant, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center text-white text-xl" style={{ backgroundColor: 'var(--primary)' }}>
                  {participant.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="text-sm" style={{ color: 'var(--primary)' }}>{participant}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Join Button */}
        <div className="glass-card p-6">
          {isFull ? (
            <div className="text-center">
              <p className="text-gray-600 mb-4">This session is full</p>
              <button
                className="w-full py-3 px-6 rounded-xl text-white"
                style={{ backgroundColor: '#9CA3AF' }}
                disabled
              >
                Session Full
              </button>
            </div>
          ) : (
            <div>
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600">
                  Ready to join {session.hostName} and {session.currentParticipants - 1} {session.currentParticipants === 2 ? 'other' : 'others'}?
                </p>
              </div>
              <button
                onClick={() => {
                  navigate('/study-session', { state: { sessionData: session } });
                }}
                className="w-full py-3 px-6 rounded-xl text-white transition-all"
                style={{ backgroundColor: 'var(--accent-1)' }}
              >
                Join Session
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}