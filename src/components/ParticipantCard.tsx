import { motion } from 'motion/react';

interface ParticipantCardProps {
  name: string;
  status: string;
  isMe?: boolean;
  reaction?: string | null;
  isCelebrating?: boolean;
}

export function ParticipantCard({ name, status, isMe, reaction, isCelebrating }: ParticipantCardProps) {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="relative bg-white rounded-2xl p-4 border border-gray-200">
      {/* Celebration Confetti */}
      {isCelebrating && (
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: ['#DAE77B', '#CD7542', '#464A63'][i % 3],
                left: `${Math.random() * 100}%`,
                top: '-10px',
              }}
              initial={{ y: 0, opacity: 1, rotate: 0 }}
              animate={{
                y: 300,
                opacity: 0,
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: 2 + Math.random(),
                delay: Math.random() * 0.5,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      )}

      {/* Reaction Emoji */}
      {reaction && (
        <div className="absolute -top-2 -right-2 text-2xl bg-white rounded-full p-1 border-2 border-[#DAE77B] shadow-sm">
          {reaction}
        </div>
      )}

      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-white flex-shrink-0"
          style={{ backgroundColor: isMe ? 'var(--accent-1)' : 'var(--primary)' }}
        >
          <span className="font-semibold">{initials}</span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-[#464A63] mb-1">
            {name}
            {isMe && null}
          </div>
          <div className="text-sm text-[#4A5565] truncate">{status}</div>
        </div>
      </div>
    </div>
  );
}
