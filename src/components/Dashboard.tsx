import React from 'react';
import { BookOpen, Brain, TrendingUp, Award, Clock, Battery, Target, Zap } from 'lucide-react';
import { UserProfile } from '../App';

interface Props {
  user: UserProfile;
  onNavigate: (view: string) => void;
  onUpdateUser: (updates: Partial<UserProfile>) => void;
}

const Dashboard: React.FC<Props> = ({ user, onNavigate, onUpdateUser }) => {
  const timeRemaining = Math.max(0, user.timeLimit - user.timeSpentToday);
  const energyPercentage = (user.energyPoints / 100) * 100;

  const quickActions = [
    {
      title: 'Start Learning',
      description: 'Choose a subject to begin',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      action: () => onNavigate('subjects')
    },
    {
      title: 'View Progress',
      description: 'Track your learning journey',
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      action: () => onNavigate('progress')
    },
    {
      title: 'Mindfulness',
      description: 'Take a wellness break',
      icon: Brain,
      color: 'from-purple-500 to-purple-600',
      action: () => onNavigate('mindfulness')
    }
  ];

  const recentAchievements = [
    { title: 'First Login', points: 10, icon: Award },
    { title: 'Quiz Master', points: 25, icon: Brain },
    { title: 'Streak Started', points: 15, icon: Zap }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user.name}! 🌟</h1>
        <p className="opacity-90">Ready to learn something amazing today?</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Energy Points</p>
              <p className="text-2xl font-bold text-green-600">{user.energyPoints}</p>
            </div>
            <Battery className="w-8 h-8 text-green-500" />
          </div>
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all"
                style={{ width: `${Math.min(energyPercentage, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Time Left Today</p>
              <p className="text-2xl font-bold text-blue-600">{timeRemaining}m</p>
            </div>
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Points</p>
              <p className="text-2xl font-bold text-amber-600">{user.totalPoints}</p>
            </div>
            <Award className="w-8 h-8 text-amber-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Current Streak</p>
              <p className="text-2xl font-bold text-orange-600">{user.currentStreak} days</p>
            </div>
            <Target className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group text-left"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
              <p className="text-sm text-gray-600">{action.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Achievements */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Achievements</h2>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="space-y-4">
            {recentAchievements.map((achievement, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <achievement.icon className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{achievement.title}</p>
                    <p className="text-sm text-gray-600">+{achievement.points} points</p>
                  </div>
                </div>
                <div className="text-amber-600 font-bold">🏆</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Daily Quest */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-green-900">Daily Quest</h2>
          <div className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            +50 Points
          </div>
        </div>
        <p className="text-green-800 mb-4">Complete 3 learning sessions today to unlock bonus energy!</p>
        <div className="w-full bg-green-200 rounded-full h-3">
          <div className="bg-green-500 h-3 rounded-full w-1/3"></div>
        </div>
        <p className="text-sm text-green-700 mt-2">1/3 sessions completed</p>
      </div>
    </div>
  );
};

export default Dashboard;