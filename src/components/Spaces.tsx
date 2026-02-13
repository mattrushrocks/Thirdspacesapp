import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Navigation } from './Navigation';
import { mockSpaces, mockSessions } from '../data/mockData';
import { MapPin, Star, Users, Wifi, Zap, ChevronRight, Tag, Search } from 'lucide-react';
import Group1 from '../imports/Group1';

const spaceImages: Record<string, string> = {
  '1': 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzcwNzYyOTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  '2': 'https://images.unsplash.com/photo-1751199199992-b32cefa81c72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYWZlJTIwc3R1ZGVudHN8ZW58MXx8fHwxNzcwODU4NDY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  '3': 'https://images.unsplash.com/photo-1737018363337-c11847e9f39b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkeSUyMHNwYWNlJTIwbGlicmFyeXxlbnwxfHx8fDE3NzA4NTg0NjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  '4': 'https://images.unsplash.com/photo-1686225422430-f84ad3180ded?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwY2FmZSUyMHBsYW50c3xlbnwxfHx8fDE3NzA3NTA2NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
};

export function Spaces() {
  const navigate = useNavigate();
  const [selectedSpace, setSelectedSpace] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const getSpaceSessions = (spaceId: string) => {
    const space = mockSpaces.find(s => s.id === spaceId);
    return mockSessions.filter(session => session.location === space?.name);
  };

  // Filter spaces based on search query
  const filteredSpaces = mockSpaces.filter((space) => {
    const query = searchQuery.toLowerCase();
    return (
      space.name.toLowerCase().includes(query) ||
      space.address.toLowerCase().includes(query) ||
      space.amenities.some(amenity => amenity.toLowerCase().includes(query))
    );
  });

  return (
    <div className="min-h-screen pb-20 md:pt-20">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Logo Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-9">
            <Group1 />
          </div>
          <h1>Third Spaces</h1>
        </div>

        <p className="text-gray-600">Discover places to study together</p>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, location, or amenities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
          />
        </div>

        {/* Popular Spaces */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2>Popular Near You</h2>
            {searchQuery && (
              <span className="text-sm text-gray-600">
                {filteredSpaces.length} {filteredSpaces.length === 1 ? 'result' : 'results'}
              </span>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSpaces.map((space) => (
              <div key={space.id} className="glass-card overflow-hidden">
                <div className="relative h-40">
                  <img
                    src={spaceImages[space.id]}
                    alt={space.name}
                    className="w-full h-full object-cover"
                  />
                  {space.discount && (
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs flex items-center gap-1" style={{ backgroundColor: 'var(--accent-1)', color: 'white' }}>
                      <Tag className="w-3 h-3" />
                      Discount
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="mb-1">{space.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{space.distance}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4" style={{ fill: 'var(--secondary)', color: 'var(--secondary)' }} />
                      <span>{space.rating}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">{space.address}</p>

                  {space.discount && (
                    <div className="mb-3 p-2 rounded-lg" style={{ backgroundColor: 'var(--neutral-1)' }}>
                      <p className="text-sm" style={{ color: 'var(--accent-1)' }}>
                        🎉 {space.discount}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mb-4">
                    {space.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="text-xs px-2 py-1 rounded-full"
                        style={{ backgroundColor: 'var(--neutral-1)', color: 'var(--primary)' }}
                      >
                        {amenity === 'WiFi' && <Wifi className="w-3 h-3 inline mr-1" />}
                        {amenity === 'Outlets' && <Zap className="w-3 h-3 inline mr-1" />}
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{space.sessionsCount} sessions this week</span>
                    </div>
                    <button
                      onClick={() => setSelectedSpace(selectedSpace === space.id ? null : space.id)}
                      className="text-sm px-3 py-1 rounded-lg transition-all"
                      style={{ 
                        backgroundColor: selectedSpace === space.id ? 'var(--primary)' : 'var(--secondary)',
                        color: selectedSpace === space.id ? 'white' : 'var(--primary)'
                      }}
                    >
                      {selectedSpace === space.id ? 'Hide' : 'View'} Sessions
                    </button>
                  </div>

                  {selectedSpace === space.id && (
                    <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                      <h3 className="text-sm mb-3">Upcoming Sessions</h3>
                      {getSpaceSessions(space.id).length === 0 ? (
                        <p className="text-sm text-gray-500">No upcoming sessions</p>
                      ) : (
                        getSpaceSessions(space.id).map((session) => (
                          <button
                            key={session.id}
                            onClick={() => navigate(`/session/${session.id}`)}
                            className="w-full p-3 rounded-lg text-left transition-all"
                            style={{ backgroundColor: 'var(--neutral-1)' }}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-sm mb-1" style={{ color: 'var(--primary)' }}>{session.title}</div>
                                <div className="text-xs text-gray-600">
                                  {new Date(session.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {session.time}
                                </div>
                              </div>
                              <ChevronRight className="w-4 h-4 text-gray-400" />
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="glass-card p-6 text-center">
          <h3 className="mb-2">Own a study-friendly space?</h3>
          <p className="text-gray-600 mb-4">Partner with Third to welcome more students</p>
          <button
            className="px-6 py-2 rounded-lg text-white"
            style={{ backgroundColor: 'var(--accent-1)' }}
          >
            Become a Partner
          </button>
        </section>
      </div>
    </div>
  );
}