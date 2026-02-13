import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Navigation } from './Navigation';
import { mockClasses, mockSpaces, mockGroups, mockAssignments } from '../data/mockData';
import { ArrowLeft, Calendar as CalendarIcon, Clock, MapPin, Users, Lock, Globe, BookOpen, Check } from 'lucide-react';
import Group1 from '../imports/Group1';

export function Create() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    isPrivate: false,
    maxParticipants: 6,
    assignmentId: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock session creation
    alert('Session created! (Mock functionality)');
    navigate('/home');
  };

  return (
    <div className="min-h-screen pb-20 md:pt-20" style={{ backgroundColor: 'var(--neutral-1)' }}>
      <Navigation />

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Logo Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-9">
            <Group1 />
          </div>
          <h1>Create Session</h1>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex gap-2 mb-2">
            <div 
              className="h-2 flex-1 rounded-full transition-all"
              style={{ backgroundColor: step >= 1 ? 'var(--secondary)' : '#E5E7EB' }}
            />
            <div 
              className="h-2 flex-1 rounded-full transition-all"
              style={{ backgroundColor: step >= 2 ? 'var(--secondary)' : '#E5E7EB' }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-gray-600 mt-1">Step {step} of 2</p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-all"
            style={{ 
              color: 'var(--primary)',
              backgroundColor: 'rgba(218, 231, 123, 0.2)'
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Cancel</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <>
              {/* Event Title */}
              <div className="glass-card p-6" style={{ borderLeft: '4px solid var(--secondary)' }}>
                <label className="block mb-2" style={{ color: 'var(--primary)' }}>
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
                  placeholder="CS 101 Study Session"
                />
              </div>

              {/* Date & Time */}
              <div className="glass-card p-6" style={{ borderLeft: '4px solid var(--accent-1)' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2" style={{ color: 'var(--primary)' }}>
                      <CalendarIcon className="w-4 h-4 inline mr-1" />
                      Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
                    />
                  </div>
                  <div>
                    <label className="block mb-2" style={{ color: 'var(--primary)' }}>
                      <Clock className="w-4 h-4 inline mr-1" />
                      Time *
                    </label>
                    <input
                      type="time"
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="glass-card p-6" style={{ borderLeft: '4px solid var(--primary)' }}>
                <label className="block mb-2" style={{ color: 'var(--primary)' }}>
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Location *
                </label>
                <select
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
                >
                  <option value="">Choose a location...</option>
                  {mockSpaces.map((space) => (
                    <option key={space.id} value={space.name}>
                      {space.name} ({space.distance})
                    </option>
                  ))}
                </select>
              </div>

              {/* Attach Assignment (Optional) */}
              <div className="glass-card p-6" style={{ borderLeft: '4px solid var(--secondary)' }}>
                <label className="block mb-2" style={{ color: 'var(--primary)' }}>
                  <BookOpen className="w-4 h-4 inline mr-1" />
                  Attach Assignment (Optional)
                </label>
                <select
                  value={formData.assignmentId}
                  onChange={(e) => setFormData({ ...formData, assignmentId: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
                >
                  <option value="">No assignment attached</option>
                  {mockAssignments.map((assignment) => (
                    <option key={assignment.id} value={assignment.id}>
                      {assignment.title} - {assignment.className}
                    </option>
                  ))}
                </select>
                {formData.assignmentId && (
                  <div 
                    className="text-sm mt-3 p-3 rounded-lg flex items-center gap-2"
                    style={{ backgroundColor: 'rgba(218, 231, 123, 0.3)' }}
                  >
                    <Check className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--primary)' }} />
                    <span style={{ color: 'var(--primary)' }}>
                      Time from this session will count towards your assignment progress
                    </span>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!formData.title || !formData.date || !formData.time || !formData.location}
                className="w-full rounded-[16px] text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: 'var(--primary)', height: '56px' }}
              >
                Next
              </button>
            </>
          )}

          {step === 2 && (
            <>
              {/* Privacy */}
              <div className="glass-card p-6" style={{ borderLeft: '4px solid var(--secondary)' }}>
                <label className="block mb-4" style={{ color: 'var(--primary)' }}>
                  Privacy Setting *
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, isPrivate: false })}
                    className="p-4 rounded-lg border-2 transition-all flex flex-col items-center text-center"
                    style={{
                      borderColor: !formData.isPrivate ? 'var(--secondary)' : '#E5E7EB',
                      backgroundColor: !formData.isPrivate ? 'var(--secondary)' : 'white',
                    }}
                  >
                    <Globe className="w-10 h-10 mb-3" style={{ color: 'var(--primary)' }} />
                    <div className="font-medium mb-1" style={{ color: 'var(--primary)' }}>Public</div>
                    <div className="text-sm text-gray-600">Anyone can join</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, isPrivate: true })}
                    className="p-4 rounded-lg border-2 transition-all flex flex-col items-center text-center"
                    style={{
                      borderColor: formData.isPrivate ? 'var(--secondary)' : '#E5E7EB',
                      backgroundColor: formData.isPrivate ? 'var(--secondary)' : 'white',
                    }}
                  >
                    <Lock className="w-10 h-10 mb-3" style={{ color: 'var(--primary)' }} />
                    <div className="font-medium mb-1" style={{ color: 'var(--primary)' }}>Private</div>
                    <div className="text-sm text-gray-600">Invite only</div>
                  </button>
                </div>
              </div>

              {/* Max Participants */}
              <div className="glass-card p-6" style={{ borderLeft: '4px solid var(--accent-1)' }}>
                <label className="block mb-2" style={{ color: 'var(--primary)' }}>
                  <Users className="w-4 h-4 inline mr-1" />
                  Max Participants *
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="2"
                    max="20"
                    value={formData.maxParticipants}
                    onChange={(e) => setFormData({ ...formData, maxParticipants: parseInt(e.target.value) })}
                    className="flex-1"
                  />
                  <div className="w-16 text-center py-2 px-4 rounded-lg" style={{ backgroundColor: 'var(--secondary)', color: 'var(--primary)' }}>
                    {formData.maxParticipants}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 rounded-[16px] border-2 transition-all"
                  style={{ borderColor: 'var(--primary)', color: 'var(--primary)', height: '48px' }}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-[16px] text-white transition-all"
                  style={{ backgroundColor: '#CD7542', height: '56px' }}
                >
                  Create Session
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}