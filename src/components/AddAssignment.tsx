import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Navigation } from './Navigation';
import { mockClasses } from '../data/mockData';
import { ArrowLeft, BookOpen, Calendar as CalendarIcon, Lightbulb } from 'lucide-react';
import Group1 from '../imports/Group1';

export function AddAssignment() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    className: '',
    dueDate: '',
    plannedHours: 8,
    suggestedSessions: 4,
    durationPerSession: 2,
  });

  // Calculate suggested distribution when hours change
  const updateHoursSuggestion = (hours: number) => {
    const sessions = Math.ceil(hours / 2);
    const duration = Math.round((hours / sessions) * 2) / 2; // Round to nearest 0.5
    setFormData({
      ...formData,
      plannedHours: hours,
      suggestedSessions: sessions,
      durationPerSession: duration,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock assignment creation
    alert('Assignment created! (Mock functionality)');
    navigate('/home');
  };

  const getDaysUntilDue = () => {
    if (!formData.dueDate) return 0;
    const due = new Date(formData.dueDate);
    const today = new Date();
    const diff = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, diff);
  };

  return (
    <div className="min-h-screen pb-20 md:pt-20">
      <Navigation />

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Logo Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-9">
            <Group1 />
          </div>
          <h1>Add Assignment</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <>
              {/* Assignment Name */}
              <div className="glass-card p-6">
                <label className="block mb-2" style={{ color: 'var(--primary)' }}>
                  <BookOpen className="w-4 h-4 inline mr-1" />
                  Assignment Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
                  placeholder="Problem Set 3"
                />
              </div>

              {/* Class */}
              <div className="glass-card p-6">
                <label className="block mb-2" style={{ color: 'var(--primary)' }}>
                  Class *
                </label>
                <select
                  required
                  value={formData.className}
                  onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
                >
                  <option value="">Choose a class...</option>
                  {mockClasses.map((className) => (
                    <option key={className} value={className}>
                      {className}
                    </option>
                  ))}
                </select>
              </div>

              {/* Due Date */}
              <div className="glass-card p-6">
                <label className="block mb-2" style={{ color: 'var(--primary)' }}>
                  <CalendarIcon className="w-4 h-4 inline mr-1" />
                  Due Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!formData.title || !formData.className || !formData.dueDate}
                className="w-full rounded-[16px] text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: 'var(--primary)', height: '56px' }}
              >
                Next
              </button>
            </>
          )}

          {step === 2 && (
            <>
              {/* Effort Budget */}
              <div className="glass-card p-6">
                <label className="block mb-4" style={{ color: 'var(--primary)' }}>
                  How many total hours do you want to dedicate?
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="2"
                    max="20"
                    step="0.5"
                    value={formData.plannedHours}
                    onChange={(e) => updateHoursSuggestion(parseFloat(e.target.value))}
                    className="flex-1"
                  />
                  <div className="w-20 text-center py-2 px-4 rounded-lg" style={{ backgroundColor: 'var(--secondary)', color: 'var(--primary)' }}>
                    {formData.plannedHours}h
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
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex-1 rounded-[16px] text-white transition-all"
                  style={{ backgroundColor: 'var(--primary)', height: '56px' }}
                >
                  Next
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              {/* Session Distribution */}
              <div className="glass-card p-6 space-y-4">
                <h3 style={{ color: 'var(--primary)' }}>Suggested Study Plan</h3>
                
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--secondary)' }}>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl mb-1" style={{ color: 'var(--primary)' }}>
                        {formData.suggestedSessions}
                      </div>
                      <div className="text-sm text-gray-700">Sessions</div>
                    </div>
                    <div>
                      <div className="text-2xl mb-1" style={{ color: 'var(--primary)' }}>
                        {formData.durationPerSession}h
                      </div>
                      <div className="text-sm text-gray-700">Per Session</div>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600">
                  We suggest spreading your {formData.plannedHours} hours across {formData.suggestedSessions} sessions over the next {getDaysUntilDue()} days.
                </p>

                {/* Adjustments */}
                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <div>
                    <label className="block mb-2 text-sm" style={{ color: 'var(--primary)' }}>
                      Number of Sessions
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="1"
                        max={Math.ceil(formData.plannedHours)}
                        value={formData.suggestedSessions}
                        onChange={(e) => {
                          const sessions = parseInt(e.target.value);
                          const duration = Math.round((formData.plannedHours / sessions) * 2) / 2;
                          setFormData({ ...formData, suggestedSessions: sessions, durationPerSession: duration });
                        }}
                        className="flex-1"
                      />
                      <div className="w-12 text-center text-sm">
                        {formData.suggestedSessions}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm" style={{ color: 'var(--primary)' }}>
                      Duration Per Session (hours)
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="0.5"
                        max={formData.plannedHours}
                        step="0.5"
                        value={formData.durationPerSession}
                        onChange={(e) => {
                          const duration = parseFloat(e.target.value);
                          const sessions = Math.ceil(formData.plannedHours / duration);
                          setFormData({ ...formData, durationPerSession: duration, suggestedSessions: sessions });
                        }}
                        className="flex-1"
                      />
                      <div className="w-12 text-center text-sm">
                        {formData.durationPerSession}h
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-4 bg-blue-50 border border-blue-200">
                <p className="text-sm text-gray-700 flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--primary)' }} />
                  <span><strong>Tip:</strong> These sessions won't be automatically scheduled. You can create them manually when you're ready to study.</span>
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
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
                  Create Assignment
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}