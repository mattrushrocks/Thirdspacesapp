import { useNavigate } from 'react-router';
import { useUser } from '../context/UserContext';
import { Navigation } from './Navigation';
import { mockSessions, mockAssignments } from '../data/mockData';
import { Calendar, Clock, MapPin, Users as UsersIcon, ChevronRight, ChevronLeft, Plus } from 'lucide-react';
import { useState } from 'react';
import Group1 from '../imports/Group1';

export function Home() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [exploreIndex, setExploreIndex] = useState(0);

  // Filter upcoming sessions (next 7 days)
  const upcomingSessions = mockSessions.filter((session) => {
    const sessionDate = new Date(session.date);
    const today = new Date();
    const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    return sessionDate >= today && sessionDate <= weekFromNow;
  }).slice(0, 3);

  const exploreSessions = mockSessions.slice(0, 6);

  const nextExploreSlide = () => {
    setExploreIndex((prev) => (prev + 1) % Math.ceil(exploreSessions.length / 2));
  };

  const prevExploreSlide = () => {
    setExploreIndex((prev) => (prev - 1 + Math.ceil(exploreSessions.length / 2)) % Math.ceil(exploreSessions.length / 2));
  };

  return (
    <div className="min-h-screen pb-20 md:pt-20">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1730619163577-cc35030384c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVuaW5nJTIwY29mZmVlJTIwc2hvcCUyMGludGVyaW9yfGVufDF8fHx8MTc3MDk2Mjk2MXww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Cozy cafe study space"
          className="w-full h-full object-cover"
        />
        {/* Primary color overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#464A63]/90 via-[#464A63]/50 to-transparent flex items-end">
          <div className="p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-9">
                <Group1 />
              </div>
              <h1 style={{ color: '#DAE77B' }}>Welcome Back!</h1>
            </div>
            <p className="text-white/90">Ready to make today productive?</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        {/* Quick Stats */}
        <section className="grid grid-cols-3 gap-4">
          <div className="glass-card p-4 text-center">
            <div className="text-2xl mb-1" style={{ color: 'var(--primary)' }}>12</div>
            <div className="text-xs text-gray-600">Sessions<br/>Attended</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-2xl mb-1" style={{ color: 'var(--primary)' }}>5</div>
            <div className="text-xs text-gray-600">Study<br/>Groups</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-2xl mb-1" style={{ color: 'var(--primary)' }}>48hrs</div>
            <div className="text-xs text-gray-600">Total Study<br/>Time</div>
          </div>
        </section>

        {/* My Assignments */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2>My Assignments</h2>
            <button
              onClick={() => navigate('/add-assignment')}
              className="text-sm flex items-center gap-1"
              style={{ color: 'var(--primary)' }}
            >
              <Plus className="w-4 h-4" />
              Add Assignment
            </button>
          </div>

          {mockAssignments.length === 0 ? (
            <div className="glass-card p-8 text-center">
              <p className="text-gray-600 mb-4">No assignments yet</p>
              <button
                onClick={() => navigate('/add-assignment')}
                className="px-6 py-2 rounded-lg text-white"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                Add Your First Assignment
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {mockAssignments.map((assignment) => {
                const progress = (assignment.loggedHours / assignment.plannedHours) * 100;
                const daysUntilDue = Math.ceil(
                  (new Date(assignment.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                );
                
                return (
                  <button
                    key={assignment.id}
                    onClick={() => {/* Navigate to assignment detail */}}
                    className="glass-card p-4 w-full text-left transition-all"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <h3 className="mb-1">{assignment.title}</h3>
                        <p className="text-sm text-gray-600">{assignment.className}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm mb-1" style={{ color: 'var(--primary)' }}>
                          {assignment.loggedHours}/{assignment.plannedHours}h
                        </div>
                        <div className="text-xs text-gray-600">
                          {daysUntilDue > 0 ? `${daysUntilDue} days left` : 'Due today'}
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>Progress</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full transition-all duration-300 rounded-full"
                          style={{
                            width: `${Math.min(progress, 100)}%`,
                            backgroundColor: 'var(--secondary)',
                          }}
                        />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </section>

        {/* My Upcoming Sessions */}
        <section>
          <h2 className="mb-4">My Upcoming Sessions</h2>

          {upcomingSessions.length === 0 ? (
            <div className="glass-card p-8 text-center">
              <p className="text-gray-600 mb-4">No upcoming sessions yet</p>
              <button
                onClick={() => navigate('/create')}
                className="px-6 py-2 rounded-lg text-white"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                Create Your First Session
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingSessions.map((session) => (
                <button
                  key={session.id}
                  onClick={() => navigate(`/session/${session.id}`)}
                  className="glass-card p-4 w-full text-left transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="mb-2">{session.title}</h3>
                      
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(session.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{session.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{session.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <UsersIcon className="w-4 h-4" />
                          <span>{session.currentParticipants}/{session.maxParticipants} participants</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Explore Sessions - With Carousel */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2>Explore Sessions</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={prevExploreSlide}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-all"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                </button>
                <button
                  onClick={nextExploreSlide}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-all"
                  aria-label="Next"
                >
                  <ChevronRight className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                </button>
              </div>
              <button
                onClick={() => navigate('/spaces')}
                className="text-sm"
                style={{ color: 'var(--primary)' }}
              >
                View All →
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${exploreIndex * 100}%)` }}
            >
              {Array.from({ length: Math.ceil(exploreSessions.length / 2) }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 gap-4 px-1">
                  {exploreSessions.slice(slideIndex * 2, slideIndex * 2 + 2).map((session) => (
                    <button
                      key={session.id}
                      onClick={() => navigate(`/session/${session.id}`)}
                      className="glass-card p-4 text-left transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="mb-1">{session.title}</h3>
                          <p className="text-sm text-gray-600">{session.class}</p>
                        </div>
                        <div className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'var(--secondary)', color: 'var(--primary)' }}>
                          {session.currentParticipants}/{session.maxParticipants}
                        </div>
                      </div>

                      <p className="text-sm text-gray-700 mb-3 line-clamp-2">{session.goals}</p>

                      <div className="flex items-center gap-4 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(session.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{session.spaceName}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: Math.ceil(exploreSessions.length / 2) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setExploreIndex(index)}
                className="w-2 h-2 rounded-full transition-all"
                style={{ 
                  backgroundColor: exploreIndex === index ? 'var(--primary)' : '#D1D5DB' 
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}