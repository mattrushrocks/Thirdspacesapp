import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useUser } from '../context/UserContext';
import { ChevronRight, Target, Coffee, Users, Sunrise, Sun, Moon, Zap, Gauge, Waves } from 'lucide-react';

const questions = [
  {
    id: 'focusType',
    question: 'What\'s your focus type?',
    options: [
      { label: 'Deep Focus', description: 'I prefer complete silence and minimal distractions', icon: Target },
      { label: 'Background Buzz', description: 'I work best with ambient noise and activity', icon: Coffee },
      { label: 'Social Studier', description: 'I love studying while chatting and taking breaks', icon: Users },
    ],
  },
  {
    id: 'energyType',
    question: 'When do you have the most energy?',
    options: [
      { label: 'Early Bird', description: 'Morning sessions energize me', icon: Sunrise },
      { label: 'Afternoon Achiever', description: 'I hit my stride in the afternoon', icon: Sun },
      { label: 'Night Owl', description: 'Late nights are when I thrive', icon: Moon },
    ],
  },
  {
    id: 'sessionType',
    question: 'What kind of sessions do you prefer?',
    options: [
      { label: 'Quick Sprints', description: '30-60 minute focused bursts', icon: Zap },
      { label: 'Marathon Study', description: '2-4 hour deep work sessions', icon: Gauge },
      { label: 'Flexible Flow', description: 'I adjust based on the task', icon: Waves },
    ],
  },
];

export function ProfileSetup() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleSelect = (value: string) => {
    const questionId = questions[currentQuestion].id;
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      // Complete setup
      if (user) {
        setUser({
          ...user,
          focusType: newAnswers.focusType,
          energyType: newAnswers.energyType,
          sessionType: newAnswers.sessionType,
        });
      }
      setTimeout(() => {
        navigate('/home');
      }, 300);
    }
  };

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="mb-8">
          <div className="flex gap-2 mb-4">
            {questions.map((_, index) => (
              <div
                key={index}
                className="h-1 flex-1 rounded-full transition-all"
                style={{
                  backgroundColor: index <= currentQuestion ? 'var(--secondary)' : '#E5E7EB',
                }}
              />
            ))}
          </div>
          <p className="text-sm text-gray-600 text-center">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        <div className="glass-card p-8">
          <h2 className="text-center mb-8">{question.question}</h2>

          <div className="space-y-4">
            {question.options.map((option) => {
              const IconComponent = option.icon;
              return (
                <button
                  key={option.label}
                  onClick={() => handleSelect(option.label)}
                  className="w-full p-6 rounded-xl border-2 border-transparent transition-all text-left"
                  style={{
                    backgroundColor: answers[question.id] === option.label ? 'var(--secondary)' : 'white',
                    borderColor: answers[question.id] === option.label ? 'var(--secondary)' : '#E5E7EB',
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--neutral)' }}>
                      <IconComponent className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold mb-1" style={{ color: 'var(--primary)' }}>
                        {option.label}
                      </div>
                      <div className="text-sm text-gray-600">{option.description}</div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {currentQuestion > 0 && (
          <button
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
            className="mt-6 mx-auto block text-sm text-gray-600 hover:text-gray-900"
          >
            ← Back
          </button>
        )}
      </div>
    </div>
  );
}