import React from 'react';
import { BarChart3, TrendingUp, Brain, Award, Clock, Target } from 'lucide-react';
import { UserProfile } from '../App';

interface Props {
  user: UserProfile;
}

const ProgressTracker: React.FC<Props> = ({ user }) => {
  const mockData = {
    aiAssisted: 65,
    selfReliant: 35,
    weeklyProgress: [
      { day: 'Mon', points: 45 },
      { day: 'Tue', points: 60 },
      { day: 'Wed', points: 30 },
      { day: 'Thu', points: 80 },
      { day: 'Fri', points: 55 },
      { day: 'Sat', points: 70 },
      { day: 'Sun', points: 40 }
    ],
    subjectProgress: [
      { subject: 'Math', level: 3, progress: 75 },
      { subject: 'Physics', level: 2, progress: 40 },
      { subject: 'History', level: 4, progress: 90 },
      { subject: 'Geography', level: 2, progress: 55 }
    ]
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Learning Progress</h1>
        <p className="text-gray-600">Track your growth and celebrate your achievements</p>
      </div>

      {/* AI vs Self-Reliant Learning */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center space-x-3 mb-6">
          <Brain className="w-6 h-6 text-blue-500" />
          <h2 className="text-xl font-semibold text-gray-900">Learning Independence</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-700">AI-Assisted Learning</span>
              <span className="font-bold text-blue-600">{mockData.aiAssisted}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-blue-500 h-3 rounded-full transition-all"
                style={{ width: `${mockData.aiAssisted}%` }}
              ></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-700">Self-Reliant Learning</span>
              <span className="font-bold text-green-600">{mockData.selfReliant}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-green-500 h-3 rounded-full transition-all"
                style={{ width: `${mockData.selfReliant}%` }}
              ></div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-semibold text-gray-900 mb-2">Independence Goal</h3>
            <p className="text-gray-700 text-sm mb-3">
              Great progress! Keep practicing to become more independent in your learning.
            </p>
            <div className="flex items-center space-x-2 text-sm text-green-700">
              <Target className="w-4 h-4" />
              <span>Goal: 50% Self-Reliant</span>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Progress Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center space-x-3 mb-6">
          <BarChart3 className="w-6 h-6 text-purple-500" />
          <h2 className="text-xl font-semibold text-gray-900">Weekly Points</h2>
        </div>
        
        <div className="flex items-end justify-between h-32 mb-4">
          {mockData.weeklyProgress.map((day, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div 
                className="bg-purple-500 rounded-t w-8 transition-all hover:bg-purple-600"
                style={{ height: `${(day.points / 80) * 100}%` }}
              ></div>
              <span className="text-xs text-gray-600">{day.day}</span>
            </div>
          ))}
        </div>
        
        <div className="text-center text-sm text-gray-600">
          Total points this week: {mockData.weeklyProgress.reduce((sum, day) => sum + day.points, 0)}
        </div>
      </div>

      {/* Subject Progress */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center space-x-3 mb-6">
          <TrendingUp className="w-6 h-6 text-green-500" />
          <h2 className="text-xl font-semibold text-gray-900">Subject Mastery</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockData.subjectProgress.map((subject, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">{subject.subject}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Level {subject.level}</span>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Award 
                        key={i}
                        className={`w-4 h-4 ${i < subject.level ? 'text-yellow-500' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all"
                  style={{ width: `${subject.progress}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-600">
                {subject.progress}% complete to next level
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center space-x-3 mb-6">
          <Award className="w-6 h-6 text-yellow-500" />
          <h2 className="text-xl font-semibold text-gray-900">Recent Achievements</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'First Steps', icon: '🚀', earned: true },
            { name: 'Quiz Master', icon: '🧠', earned: true },
            { name: 'Streak Keeper', icon: '🔥', earned: false },
            { name: 'Helper', icon: '🤝', earned: false },
          ].map((badge, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg border-2 text-center transition-all ${
                badge.earned 
                  ? 'border-yellow-300 bg-yellow-50' 
                  : 'border-gray-200 bg-gray-50 opacity-60'
              }`}
            >
              <div className="text-2xl mb-2">{badge.icon}</div>
              <p className={`font-medium text-sm ${
                badge.earned ? 'text-yellow-800' : 'text-gray-600'
              }`}>
                {badge.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Time Management */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center space-x-3 mb-6">
          <Clock className="w-6 h-6 text-blue-500" />
          <h2 className="text-xl font-semibold text-gray-900">Time Management</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {user.timeSpentToday}m
            </div>
            <p className="text-sm text-gray-600">Time spent today</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">
              {Math.max(0, user.timeLimit - user.timeSpentToday)}m
            </div>
            <p className="text-sm text-gray-600">Time remaining</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-2">
              {user.currentStreak}
            </div>
            <p className="text-sm text-gray-600">Day streak</p>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-500 h-3 rounded-full transition-all"
              style={{ width: `${(user.timeSpentToday / user.timeLimit) * 100}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">Daily time usage</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;