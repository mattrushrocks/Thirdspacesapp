import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useUser } from '../context/UserContext';
import { Navigation } from './Navigation';
import { mockClasses, mockInterests, mockGroups, mockSessions } from '../data/mockData';
import { Edit2, Calendar, Users, BookOpen, Heart, School, Mail, MapPin, Copy, Target, Coffee, Users as UsersIcon, Sunrise, Sun, Moon, Zap, Gauge, Waves, Clock, Award, ArrowLeft, MoreVertical } from 'lucide-react';
import Group1 from '../imports/Group1';

export function Profile() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);

  const userGroups = mockGroups.filter(g => !g.isOwner).slice(0, 3);
  const sessionsAttended = mockSessions.slice(0, 5);

  // Get owned and joined groups
  const ownedGroups = mockGroups.filter(g => g.isOwner);
  const joinedGroups = mockGroups.filter(g => !g.isOwner);

  // Mock matches data - REMOVE THIS
  const matches = [
    {
      id: '1',
      name: 'Sarah Chen',
      major: 'Computer Science',
      matchPercentage: 92,
      sharedInterests: ['Computer Science', 'Late Night Study'],
    },
    {
      id: '2',
      name: 'Marcus Johnson',
      major: 'Biology',
      matchPercentage: 85,
      sharedInterests: ['Early Morning Study'],
    },
    {
      id: '3',
      name: 'Emma Rodriguez',
      major: 'Psychology',
      matchPercentage: 78,
      sharedInterests: ['Coffee Shops', 'Philosophy'],
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--neutral-1)' }}>
      {/* Fixed Profile Image */}
      <div className="fixed top-0 left-0 right-0 h-96 z-0">
        <img
          src="https://images.unsplash.com/photo-1600178572204-6ac8886aae63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwcG9ydHJhaXQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzcwNzgxMTUxfDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt={user?.name}
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"></div>
      </div>

      {/* Spacer to push content down */}
      <div className="h-96"></div>

      {/* Scrollable Content Card */}
      <div 
        className="relative -mt-6 rounded-t-3xl min-h-screen pb-32 z-10 px-4 pt-6"
        style={{ backgroundColor: 'var(--neutral-1)' }}
      >
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Name with Logo */}
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-9">
              <Group1 />
            </div>
            <h1>{user?.name || 'Olivia Thompson'}</h1>
          </div>

          {/* Stats */}
          <div className="flex gap-8 justify-center py-2">
            <div className="flex flex-col items-center">
              <UsersIcon className="w-8 h-8 mb-2" style={{ color: 'var(--primary)' }} />
              <div className="font-semibold text-lg" style={{ color: 'var(--primary)' }}>5</div>
              <div className="text-xs text-gray-600">Friends</div>
            </div>
            <div className="flex flex-col items-center">
              <Users className="w-8 h-8 mb-2" style={{ color: 'var(--primary)' }} />
              <div className="font-semibold text-lg" style={{ color: 'var(--primary)' }}>3</div>
              <div className="text-xs text-gray-600">Groups</div>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="w-8 h-8 mb-2" style={{ color: 'var(--primary)' }} />
              <div className="font-semibold text-lg" style={{ color: 'var(--primary)' }}>48</div>
              <div className="text-xs text-gray-600">Hours</div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t" style={{ borderColor: '#E5E7EB' }}></div>

          {/* Interests */}
          <div className="py-2">
            <h3 className="mb-3 text-sm" style={{ color: 'var(--primary)' }}>Interest</h3>
            <div className="flex flex-wrap gap-2">
              {['Computer Science', 'Philosophy', 'Late Night Study'].map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1.5 rounded-full text-sm"
                  style={{ backgroundColor: '#DAE77B', color: 'var(--primary)' }}
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t" style={{ borderColor: '#E5E7EB' }}></div>

          {/* I'm looking for */}
          <div>
            <h3 className="py-4 text-sm" style={{ color: 'var(--primary)' }}>I'm looking for...</h3>
            <div className="p-5 pb-6 rounded-lg" style={{ backgroundColor: 'white' }}>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: 'var(--primary)' }}></div>
                  <span>A weekly accountability group</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: 'var(--primary)' }}></div>
                  <span>Someone to quiz me for midterms</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: 'var(--primary)' }}></div>
                  <span>A late-night study buddy in the library</span>
                </div>
              </div>
            </div>
            <div className="py-4"></div>
          </div>

          {/* Divider */}
          <div className="border-t" style={{ borderColor: '#E5E7EB' }}></div>

          {/* About me */}
          <div className="py-2">
            <h3 className="mb-3 text-sm" style={{ color: 'var(--primary)' }}>About me</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Hey! I'm a sophomore studying Computer Science. I love collaborative learning and coffee shop study sessions. Always down to help with coding problems or work through problem sets together!
            </p>
            <p className="text-sm text-gray-700 leading-relaxed mt-3">
              When I'm not buried in code, you can usually find me exploring new coffee shops around campus or discussing philosophy with friends. I believe the best learning happens in community!
            </p>
          </div>

          {/* Divider */}
          <div className="border-t" style={{ borderColor: '#E5E7EB' }}></div>

          {/* Organizer Badge */}
          <div className="py-2">
            <h3 className="mb-4 text-sm" style={{ color: 'var(--primary)' }}>Organizer</h3>
            <div 
              className="p-4 rounded-xl flex items-center gap-3"
              style={{ backgroundColor: 'rgba(218, 231, 123, 0.2)' }}
            >
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'var(--secondary)' }}
              >
                <Award className="w-7 h-7" style={{ color: 'var(--primary)' }} />
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm mb-1" style={{ color: 'var(--primary)' }}>
                  10+ sessions organized
                </div>
                <div className="text-xs text-gray-600">
                  You're building an amazing study community!
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t" style={{ borderColor: '#E5E7EB' }}></div>

          {/* Groups */}
          <div className="py-2">
            <h3 className="mb-4 text-sm" style={{ color: 'var(--primary)' }}>My Groups</h3>
            
            {/* Owned Groups */}
            {ownedGroups.length > 0 && (
              <div className="mb-4">
                <div className="text-xs text-gray-500 mb-2">Groups I Own</div>
                <div className="space-y-3">
                  {ownedGroups.map((group) => (
                    <div 
                      key={group.id}
                      onClick={() => navigate(`/groups/${group.id}`)}
                      className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                      style={{ backgroundColor: 'white' }}
                    >
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: 'var(--secondary)' }}
                      >
                        <Users className="w-6 h-6" style={{ color: 'var(--primary)' }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm" style={{ color: 'var(--primary)' }}>
                          {group.name}
                        </div>
                        <div className="text-xs text-gray-600">{group.members} members</div>
                      </div>
                      <div className="flex-shrink-0">
                        <span 
                          className="text-xs px-2 py-1 rounded-full"
                          style={{ backgroundColor: 'rgba(218, 231, 123, 0.3)', color: 'var(--primary)' }}
                        >
                          Owner
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Joined Groups */}
            {joinedGroups.length > 0 && (
              <div>
                <div className="text-xs text-gray-500 mb-2">Groups I've Joined</div>
                <div className="space-y-3">
                  {joinedGroups.map((group) => (
                    <div 
                      key={group.id}
                      onClick={() => navigate(`/groups/${group.id}`)}
                      className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                      style={{ backgroundColor: 'white' }}
                    >
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: 'var(--secondary)' }}
                      >
                        <Users className="w-6 h-6" style={{ color: 'var(--primary)' }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm" style={{ color: 'var(--primary)' }}>
                          {group.name}
                        </div>
                        <div className="text-xs text-gray-600">{group.members} members</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {ownedGroups.length === 0 && joinedGroups.length === 0 && (
              <div className="text-center py-8 text-gray-500 text-sm">
                You haven't joined any groups yet
              </div>
            )}
          </div>

          {/* Sign Out */}
          <button
            onClick={() => {
              if (confirm('Are you sure you want to sign out?')) {
                navigate('/');
              }
            }}
            className="w-full glass-card p-4 text-center text-gray-600 hover:text-gray-900 transition-all"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Navigation */}
      <Navigation />
    </div>
  );
}