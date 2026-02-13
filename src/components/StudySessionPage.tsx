import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Smile, Zap, Meh, Flame } from 'lucide-react';

interface Participant {
  id: string;
  name: string;
}

const mockParticipants: Participant[] = [
  { id: '1', name: 'Jordan Lee' },
  { id: '2', name: 'Maya Patel' },
  { id: '3', name: 'Carlos Mendez' },
  { id: '4', name: 'Sarah Chen' },
];

export function StudySessionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sessionStarted, setSessionStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3 * 60); // 3 minutes in seconds
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Timer countdown
  useEffect(() => {
    if (!sessionStarted || timeLeft <= 0) {
      if (sessionStarted && timeLeft <= 0) {
        setShowCheckIn(true);
      }
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setShowCheckIn(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [sessionStarted, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEmotionSelect = (emotion: string) => {
    setSelectedEmotion(emotion);
  };

  const handleCheckInComplete = () => {
    navigate('/home');
  };

  const handleLeaveSession = () => {
    if (confirm('Are you sure you want to leave this session?')) {
      navigate('/home');
    }
  };

  if (showCheckIn) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#F2F1EF' }}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-[20px] max-w-md w-full p-8"
        >
          <h2 className="text-2xl font-bold text-[#464A63] text-center mb-2">
            Session Complete!
          </h2>
          <p className="text-[#4A5565] text-center mb-8">
            How did this session feel?
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {[
              { icon: Smile, label: 'Focused' },
              { icon: Zap, label: 'Energized' },
              { icon: Meh, label: 'Distracted' },
              { icon: Flame, label: 'Productive' },
            ].map((option) => {
              const IconComponent = option.icon;
              return (
                <button
                  key={option.label}
                  onClick={() => handleEmotionSelect(option.label)}
                  className="p-6 rounded-[20px] border-2 transition-all text-center"
                  style={{
                    borderColor: selectedEmotion === option.label ? '#DAE77B' : '#E5E7EB',
                    backgroundColor: selectedEmotion === option.label ? '#DAE77B' : 'white',
                  }}
                >
                  <div className="flex items-center justify-center mb-2">
                    <IconComponent size={48} style={{ color: '#464A63' }} />
                  </div>
                  <div className="text-sm font-medium text-[#464A63]">{option.label}</div>
                </button>
              );
            })}
          </div>

          <button
            onClick={handleCheckInComplete}
            disabled={!selectedEmotion}
            className="w-full py-3 px-6 rounded-[20px] text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#464A63' }}
          >
            Complete Check-In
          </button>
        </motion.div>
      </div>
    );
  }

  if (!sessionStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#F2F1EF' }}>
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-[20px] p-8 mb-6">
            <h1 className="text-[32px] font-bold text-[#464A63] mb-2">
              Calculus Study Session
            </h1>
            <p className="text-[#4A5565] mb-6">Ready to focus together?</p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-[#464A63]">
                <span className="font-semibold">Duration:</span>
                <span>3 minutes</span>
              </div>
              <div className="flex items-center gap-3 text-[#464A63]">
                <span className="font-semibold">Participants:</span>
                <span>{mockParticipants.length + 1} students</span>
              </div>
            </div>

            <button
              onClick={() => setSessionStarted(true)}
              className="w-full py-4 px-6 rounded-[20px] text-white text-lg font-semibold transition-all hover:opacity-90"
              style={{ backgroundColor: '#CD7542' }}
            >
              Start Session
            </button>
          </div>

          <button
            onClick={() => navigate('/home')}
            className="w-full text-center text-[#4A5565] hover:text-[#464A63]"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#F2F1EF' }}>
      <div className="max-w-2xl w-full">
        {/* Large Timer */}
        <div className="bg-white rounded-[20px] p-12 mb-6 text-center">
          <div className="text-[96px] font-bold text-[#464A63] mb-4 leading-none">
            {formatTime(timeLeft)}
          </div>
          <p className="text-xl text-[#4A5565] mb-6">
            {mockParticipants.length + 1} students focusing
          </p>

          {/* Participant Avatars */}
          <div className="flex justify-center gap-2 mb-8">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
              style={{ backgroundColor: '#CD7542' }}
            >
              Me
            </div>
            {mockParticipants.slice(0, 4).map((participant) => {
              const initials = participant.name
                .split(' ')
                .map((n) => n[0])
                .join('');
              return (
                <div
                  key={participant.id}
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                  style={{ backgroundColor: '#464A63' }}
                >
                  {initials}
                </div>
              );
            })}
          </div>

          <button
            onClick={handleLeaveSession}
            className="px-6 py-2 rounded-[20px] text-[#464A63] border-2 border-[#464A63] hover:bg-[#F2F1EF] transition-all"
          >
            Leave Session
          </button>
        </div>

        {/* Minimal tips */}
        <div className="text-center text-sm text-[#4A5565]">
          <p>Stay focused. You've got this.</p>
        </div>
      </div>
    </div>
  );
}