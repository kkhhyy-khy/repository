import React, { useState } from 'react';
import { Heart, Volume2, CreditCard as Edit3, Users, Sparkles, Play, Pause } from 'lucide-react';
import { UserProfile } from '../App';

interface Props {
  user: UserProfile;
  onUpdateUser: (updates: Partial<UserProfile>) => void;
}

const MindfulnessCenter: React.FC<Props> = ({ user, onUpdateUser }) => {
  const [currentActivity, setCurrentActivity] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [journalEntry, setJournalEntry] = useState('');
  const [breathingTimer, setBreathingTimer] = useState(0);

  const mindfulnessActivities = [
    {
      id: 'breathing',
      title: 'Calm Breathing',
      description: 'Simple breathing exercise to help you relax',
      icon: Heart,
      color: 'from-blue-400 to-blue-600',
      duration: '3 min'
    },
    {
      id: 'focus',
      title: 'Focus First Aid',
      description: 'Quick attention recovery when feeling scattered',
      icon: Sparkles,
      color: 'from-purple-400 to-purple-600',
      duration: '2 min'
    },
    {
      id: 'grounding',
      title: 'Grounding Exercise',
      description: 'Connect with the present moment',
      icon: Volume2,
      color: 'from-green-400 to-green-600',
      duration: '5 min'
    }
  ];

  const resiliencePrompts = [
    "What is one challenge you overcame today?",
    "Name three things you're grateful for right now",
    "What would you tell a friend who is facing the same problem?",
    "How can you break this big problem into smaller pieces?",
    "What is one thing you learned about yourself this week?"
  ];

  const startActivity = (activityId: string) => {
    setCurrentActivity(activityId);
    setIsPlaying(true);
    
    if (activityId === 'breathing') {
      // Simple breathing timer simulation
      let count = 0;
      const interval = setInterval(() => {
        count++;
        setBreathingTimer(count);
        if (count >= 180) { // 3 minutes
          clearInterval(interval);
          setIsPlaying(false);
          onUpdateUser({ energyPoints: Math.min(100, user.energyPoints + 10) });
        }
      }, 1000);
    }
  };

  const saveJournalEntry = () => {
    if (journalEntry.trim()) {
      // In a real app, this would save to a database
      onUpdateUser({ totalPoints: user.totalPoints + 5 });
      setJournalEntry('');
      alert('Journal entry saved! +5 points');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Wellness Center 🌸</h1>
        <p className="text-gray-600">Take care of your mind and emotions</p>
      </div>

      {/* Current Activity */}
      {currentActivity && (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white mb-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              {mindfulnessActivities.find(a => a.id === currentActivity)?.title}
            </h2>
            {currentActivity === 'breathing' && (
              <div className="space-y-4">
                <div className="text-6xl font-bold">{Math.floor(breathingTimer / 60)}:{(breathingTimer % 60).toString().padStart(2, '0')}</div>
                <div className="space-y-2">
                  <p className="text-lg opacity-90">Breathe in slowly... hold... breathe out slowly...</p>
                  <div className="w-32 h-32 mx-auto bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                    <Heart className="w-16 h-16" />
                  </div>
                </div>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg transition-all flex items-center space-x-2 mx-auto"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  <span>{isPlaying ? 'Pause' : 'Resume'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mindfulness Activities */}
      {!currentActivity && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Mindfulness First Aid</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mindfulnessActivities.map((activity) => (
              <button
                key={activity.id}
                onClick={() => startActivity(activity.id)}
                className="p-6 rounded-lg border border-gray-200 hover:shadow-md transition-all text-left group"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${activity.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <activity.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{activity.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{activity.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{activity.duration}</span>
                  <div className="text-blue-600 group-hover:translate-x-1 transition-transform">→</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Resilience Journal */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center space-x-3 mb-6">
          <Edit3 className="w-6 h-6 text-green-500" />
          <h2 className="text-xl font-semibold text-gray-900">Resilience Journal</h2>
        </div>
        
        <div className="space-y-4">
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h3 className="font-medium text-green-900 mb-2">Today's Prompt:</h3>
            <p className="text-green-800">
              {resiliencePrompts[Math.floor(Math.random() * resiliencePrompts.length)]}
            </p>
          </div>
          
          <textarea
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
            placeholder="Write your thoughts here... This is a safe space for you."
            className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          
          <button
            onClick={saveJournalEntry}
            disabled={!journalEntry.trim()}
            className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 disabled:opacity-50 transition-all"
          >
            Save Entry (+5 points)
          </button>
        </div>
      </div>

      {/* Emotional Check-in */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center space-x-3 mb-6">
          <Heart className="w-6 h-6 text-pink-500" />
          <h2 className="text-xl font-semibold text-gray-900">How are you feeling?</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { emoji: '😊', label: 'Happy', color: 'bg-yellow-100 text-yellow-800' },
            { emoji: '😔', label: 'Sad', color: 'bg-blue-100 text-blue-800' },
            { emoji: '😰', label: 'Worried', color: 'bg-purple-100 text-purple-800' },
            { emoji: '😤', label: 'Frustrated', color: 'bg-red-100 text-red-800' },
            { emoji: '😌', label: 'Calm', color: 'bg-green-100 text-green-800' }
          ].map((mood, index) => (
            <button
              key={index}
              className={`p-4 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-all text-center ${mood.color}`}
            >
              <div className="text-2xl mb-2">{mood.emoji}</div>
              <p className="font-medium text-sm">{mood.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Peer Support */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6 border border-pink-200">
        <div className="flex items-center space-x-3 mb-4">
          <Users className="w-6 h-6 text-pink-500" />
          <h2 className="text-xl font-semibold text-gray-900">Peer Support</h2>
        </div>
        
        <p className="text-gray-700 mb-4">
          Send anonymous encouragement to other learners or share your wisdom!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="bg-pink-500 text-white p-4 rounded-lg hover:bg-pink-600 transition-all">
            Send Hope Message 💌
          </button>
          <button className="bg-purple-500 text-white p-4 rounded-lg hover:bg-purple-600 transition-all">
            Share Your Strength 🌟
          </button>
        </div>
      </div>
    </div>
  );
};

export default MindfulnessCenter;