import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Navigation } from './Navigation';
import { mockGroups } from '../data/mockData';
import { Users, Crown, Calendar, Plus, Search, ChevronRight, UserPlus, User, Mail, CheckCircle, XCircle } from 'lucide-react';
import Group1 from '../imports/Group1';

export function Groups() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'groups' | 'friends'>('groups');
  const [showAddFriendModal, setShowAddFriendModal] = useState(false);
  const [friendSearchQuery, setFriendSearchQuery] = useState('');

  const myGroups = mockGroups.filter(g => !g.isOwner);
  const ownedGroups = mockGroups.filter(g => g.isOwner);
  
  // Mock friends data
  const myFriends = [
    {
      id: '1',
      name: 'Sarah Chen',
      major: 'Computer Science',
      studySessions: 12,
      currentlyStudying: true,
      location: 'Bird Library - 3rd Floor',
    },
    {
      id: '2',
      name: 'Marcus Johnson',
      major: 'Biology',
      studySessions: 8,
      currentlyStudying: false,
      location: null,
    },
    {
      id: '3',
      name: 'Emma Rodriguez',
      major: 'Psychology',
      studySessions: 15,
      currentlyStudying: true,
      location: 'Starbucks on Marshall',
    },
  ];

  const friendRequests = [
    {
      id: '4',
      name: 'Alex Kim',
      major: 'Engineering',
      mutualFriends: 3,
    },
  ];

  const exploreFriends = [
    {
      id: '5',
      name: 'Jordan Lee',
      major: 'Business',
      mutualFriends: 2,
      recentSession: 'Organic Chemistry Study',
    },
    {
      id: '6',
      name: 'Taylor Swift',
      major: 'English Literature',
      mutualFriends: 1,
      recentSession: 'Essay Writing Session',
    },
  ];

  // Mock group invitations
  const groupInvitations = [
    {
      id: 'inv-1',
      groupName: 'Physics Study Squad',
      groupDescription: 'Weekly physics problem-solving sessions',
      invitedBy: 'Sarah Chen',
      invitedByAvatar: 'SC',
      members: 14,
      timestamp: '2 hours ago',
    },
    {
      id: 'inv-2',
      groupName: 'Late Night Grinders',
      groupDescription: 'For night owls who study best after 10pm',
      invitedBy: 'Marcus Johnson',
      invitedByAvatar: 'MJ',
      members: 8,
      timestamp: '1 day ago',
    },
  ];

  const exploreGroups = [
    {
      id: '5',
      name: 'Early Morning Crew',
      description: 'For those who love 7am study sessions',
      members: 9,
      isOwner: false,
      nextSession: null,
    },
    {
      id: '6',
      name: 'Engineering Squad',
      description: 'All engineering majors welcome',
      members: 32,
      isOwner: false,
      nextSession: '2026-02-18',
    },
  ];

  const filteredExploreGroups = exploreGroups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredExploreFriends = exploreFriends.filter(friend =>
    friend.name.toLowerCase().includes(friendSearchQuery.toLowerCase()) ||
    friend.major.toLowerCase().includes(friendSearchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pb-20 md:pt-20">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Logo Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-9">
            <Group1 />
          </div>
          <h1>Groups & Friends</h1>
        </div>

        {/* Tab Toggle */}
        <div className="glass-card p-1 flex gap-1">
          <button
            onClick={() => setActiveTab('groups')}
            className="flex-1 py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
            style={{
              backgroundColor: activeTab === 'groups' ? 'var(--primary)' : 'transparent',
              color: activeTab === 'groups' ? 'white' : 'var(--primary)',
            }}
          >
            <Users className="w-5 h-5" />
            <span>Groups</span>
          </button>
          <button
            onClick={() => setActiveTab('friends')}
            className="flex-1 py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
            style={{
              backgroundColor: activeTab === 'friends' ? 'var(--primary)' : 'transparent',
              color: activeTab === 'friends' ? 'white' : 'var(--primary)',
            }}
          >
            <User className="w-5 h-5" />
            <span>Friends</span>
          </button>
        </div>

        {/* Groups Content */}
        {activeTab === 'groups' && (
          <>
            {/* Group Invitations */}
            {groupInvitations.length > 0 && (
              <section>
                <div 
                  className="glass-card p-4 rounded-lg border-l-4"
                  style={{ borderLeftColor: 'var(--secondary)' }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <Mail className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--secondary)' }} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm">Group Invitations</h3>
                          <div className="px-2 py-0.5 rounded-full text-xs" style={{ backgroundColor: 'var(--secondary)', color: 'var(--primary)' }}>
                            {groupInvitations.length}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">
                          {groupInvitations[0].invitedBy} invited you to <span className="font-medium">{groupInvitations[0].groupName}</span>
                          {groupInvitations.length > 1 && ` and ${groupInvitations.length - 1} more`}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
                  </div>
                </div>
              </section>
            )}

            {/* Groups You Own */}
            {ownedGroups.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Crown className="w-5 h-5" style={{ color: 'var(--accent-1)' }} />
                  <h2>Groups You Own</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ownedGroups.map((group) => (
                    <div key={group.id} className="glass-card p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="mb-1">{group.name}</h3>
                          <p className="text-sm text-gray-600">{group.description}</p>
                        </div>
                        <div className="px-2 py-1 rounded-full text-xs" style={{ backgroundColor: 'var(--accent-1)', color: 'white' }}>
                          Owner
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{group.members} members</span>
                        </div>
                        {group.nextSession && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>Next: {new Date(group.nextSession).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                          </div>
                        )}
                      </div>

                      <button
                        className="w-full py-2 px-4 rounded-lg text-sm transition-all"
                        style={{ backgroundColor: 'var(--secondary)', color: 'var(--primary)' }}
                      >
                        Manage Group
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* My Groups */}
            <section>
              <h2 className="mb-4">My Groups</h2>
              
              {myGroups.length === 0 ? (
                <div className="glass-card p-8 text-center">
                  <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 mb-4">You haven't joined any groups yet</p>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="px-6 py-2 rounded-lg text-white"
                    style={{ backgroundColor: 'var(--primary)' }}
                  >
                    Create or Join a Group
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {myGroups.map((group) => (
                    <button
                      key={group.id}
                      className="glass-card p-6 text-left transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="mb-1">{group.name}</h3>
                          <p className="text-sm text-gray-600">{group.description}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{group.members} members</span>
                        </div>
                        {group.nextSession && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>Next: {new Date(group.nextSession).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </section>

            {/* Explore Groups */}
            <section>
              <h2 className="mb-4">Explore Groups</h2>

              <div className="glass-card p-4 mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search groups..."
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredExploreGroups.map((group) => (
                  <div key={group.id} className="glass-card p-6">
                    <h3 className="mb-2">{group.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{group.description}</p>

                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{group.members} members</span>
                      </div>
                    </div>

                    <button
                      className="w-full py-2 px-4 rounded-lg text-sm text-white transition-all"
                      style={{ backgroundColor: 'var(--primary)' }}
                    >
                      Join Group
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* Friends Content */}
        {activeTab === 'friends' && (
          <>
            {/* My Friends */}
            <section>
              <h2 className="mb-4">My Friends</h2>
              
              {myFriends.length === 0 ? (
                <div className="glass-card p-8 text-center">
                  <User className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 mb-4">You haven't added any friends yet</p>
                  <button
                    onClick={() => setShowAddFriendModal(true)}
                    className="px-6 py-2 rounded-lg text-white"
                    style={{ backgroundColor: 'var(--primary)' }}
                  >
                    Add a Friend
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {myFriends.map((friend) => (
                    <div key={friend.id} className="glass-card p-6 text-left transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="mb-1">{friend.name}</h3>
                          <p className="text-sm text-gray-600">{friend.major}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{friend.studySessions} study sessions</span>
                        </div>
                        {friend.currentlyStudying && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>Currently studying at {friend.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Friend Requests */}
            <section>
              <h2 className="mb-4">Friend Requests</h2>
              
              {friendRequests.length === 0 ? (
                <div className="glass-card p-8 text-center">
                  <UserPlus className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 mb-4">You have no friend requests</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {friendRequests.map((request) => (
                    <div key={request.id} className="glass-card p-6 text-left transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="mb-1">{request.name}</h3>
                          <p className="text-sm text-gray-600">{request.major}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{request.mutualFriends} mutual friends</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Explore Friends */}
            <section>
              <h2 className="mb-4">Explore Friends</h2>

              <div className="glass-card p-4 mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={friendSearchQuery}
                    onChange={(e) => setFriendSearchQuery(e.target.value)}
                    placeholder="Search friends..."
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredExploreFriends.map((friend) => (
                  <div key={friend.id} className="glass-card p-6">
                    <h3 className="mb-2">{friend.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{friend.major}</p>

                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{friend.mutualFriends} mutual friends</span>
                      </div>
                    </div>

                    <button
                      className="w-full py-2 px-4 rounded-lg text-sm text-white transition-all"
                      style={{ backgroundColor: 'var(--primary)' }}
                    >
                      Add Friend
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>

      {/* Create Group Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="glass-card p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h2>Create a Group</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-all"
              >
                <ChevronRight className="w-6 h-6 text-gray-600 rotate-180" />
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm mb-2" style={{ color: 'var(--primary)' }}>
                  Group Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
                  placeholder="CS Study Squad"
                />
              </div>

              <div>
                <label className="block text-sm mb-2" style={{ color: 'var(--primary)' }}>
                  Description
                </label>
                <textarea
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--secondary)] resize-none"
                  rows={3}
                  placeholder="What's this group about?"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-2 px-4 rounded-lg border-2"
                  style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Group created! (Mock functionality)');
                    setShowCreateModal(false);
                  }}
                  className="flex-1 py-2 px-4 rounded-lg text-white"
                  style={{ backgroundColor: 'var(--primary)' }}
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Friend Modal */}
      {showAddFriendModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="glass-card p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h2>Add a Friend</h2>
              <button
                onClick={() => setShowAddFriendModal(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-all"
              >
                <ChevronRight className="w-6 h-6 text-gray-600 rotate-180" />
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm mb-2" style={{ color: 'var(--primary)' }}>
                  Friend's Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
                  placeholder="Sarah Chen"
                />
              </div>

              <div>
                <label className="block text-sm mb-2" style={{ color: 'var(--primary)' }}>
                  Major
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
                  placeholder="Computer Science"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddFriendModal(false)}
                  className="flex-1 py-2 px-4 rounded-lg border-2"
                  style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Friend added! (Mock functionality)');
                    setShowAddFriendModal(false);
                  }}
                  className="flex-1 py-2 px-4 rounded-lg text-white"
                  style={{ backgroundColor: 'var(--primary)' }}
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}