import React, { useState, useEffect } from 'react';
import { User, BookOpen, Brain, Heart, Award, Clock, Battery, Settings } from 'lucide-react';
import UserRegistration from './components/UserRegistration';
import Dashboard from './components/Dashboard';
import SubjectSelection from './components/SubjectSelection';
import STEMTutor from './components/STEMTutor';
import HumanitiesTutor from './components/HumanitiesTutor';
import ProgressTracker from './components/ProgressTracker';
import MindfulnessCenter from './components/MindfulnessCenter';
import SupervisorDashboard from './components/SupervisorDashboard';

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  grade: string;
  energyPoints: number;
  totalPoints: number;
  timeSpentToday: number;
  timeLimit: number;
  currentStreak: number;
  subjects: {
    [key: string]: {
      level: number;
      progress: number;
      aiAssisted: number;
      selfReliant: number;
    };
  };
}

export interface LearningSession {
  subject: string;
  topic: string;
  startTime: Date;
  endTime?: Date;
  aiInteractions: number;
  selfSolvedProblems: number;
  pointsEarned: number;
  reflectionComplete: boolean;
}

function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [currentView, setCurrentView] = useState<'registration' | 'dashboard' | 'subjects' | 'stem' | 'humanities' | 'progress' | 'mindfulness' | 'supervisor'>('registration');
  const [currentSession, setCurrentSession] = useState<LearningSession | null>(null);
  const [supervisorMode, setSupervisorMode] = useState(false);

  useEffect(() => {
    // Load user data from localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setCurrentView('dashboard');
    }
  }, []);

  const handleUserRegistration = (user: UserProfile) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    setCurrentView('dashboard');
  };

  const updateUserProgress = (updates: Partial<UserProfile>) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, ...updates };
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
  };

  const startLearningSession = (subject: string, topic: string) => {
    const session: LearningSession = {
      subject,
      topic,
      startTime: new Date(),
      aiInteractions: 0,
      selfSolvedProblems: 0,
      pointsEarned: 0,
      reflectionComplete: false,
    };
    setCurrentSession(session);
  };

  if (!currentUser && currentView === 'registration') {
    return <UserRegistration onRegister={handleUserRegistration} />;
  }

  if (supervisorMode) {
    return (
      <SupervisorDashboard 
        onExitSupervisor={() => setSupervisorMode(false)}
        users={currentUser ? [currentUser] : []}
      />
    );
  }

  const navigationItems = [
    { id: 'dashboard', icon: User, label: 'Dashboard' },
    { id: 'subjects', icon: BookOpen, label: 'Learn' },
    { id: 'progress', icon: Brain, label: 'Progress' },
    { id: 'mindfulness', icon: Heart, label: 'Wellness' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">LearnSafe AI</h1>
            </div>
            
            {currentUser && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Battery className="w-4 h-4 text-green-500" />
                  <span className="font-medium text-gray-700">{currentUser.energyPoints}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span className="font-medium text-gray-700">
                    {Math.max(0, currentUser.timeLimit - currentUser.timeSpentToday)}m left
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span className="font-medium text-gray-700">{currentUser.totalPoints}</span>
                </div>
                <button
                  onClick={() => setSupervisorMode(true)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        {currentUser && (
          <nav className="w-64 bg-white shadow-sm border-r border-gray-200">
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Hi, {currentUser.name}!</h2>
                <p className="text-sm text-gray-600">Grade {currentUser.grade} • Age {currentUser.age}</p>
              </div>
              
              <ul className="space-y-2">
                {navigationItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setCurrentView(item.id as any)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        currentView === item.id
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {currentView === 'dashboard' && currentUser && (
            <Dashboard 
              user={currentUser} 
              onNavigate={setCurrentView}
              onUpdateUser={updateUserProgress}
            />
          )}
          {currentView === 'subjects' && currentUser && (
            <SubjectSelection 
              user={currentUser} 
              onSelectSubject={(subject, topic) => {
                startLearningSession(subject, topic);
                if (['Math', 'Physics', 'Chemistry'].includes(subject)) {
                  setCurrentView('stem');
                } else {
                  setCurrentView('humanities');
                }
              }}
            />
          )}
          {currentView === 'stem' && currentUser && currentSession && (
            <STEMTutor 
              user={currentUser}
              session={currentSession}
              onUpdateUser={updateUserProgress}
              onSessionEnd={() => {
                setCurrentSession(null);
                setCurrentView('dashboard');
              }}
            />
          )}
          {currentView === 'humanities' && currentUser && currentSession && (
            <HumanitiesTutor 
              user={currentUser}
              session={currentSession}
              onUpdateUser={updateUserProgress}
              onSessionEnd={() => {
                setCurrentSession(null);
                setCurrentView('dashboard');
              }}
            />
          )}
          {currentView === 'progress' && currentUser && (
            <ProgressTracker user={currentUser} />
          )}
          {currentView === 'mindfulness' && currentUser && (
            <MindfulnessCenter 
              user={currentUser}
              onUpdateUser={updateUserProgress}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;