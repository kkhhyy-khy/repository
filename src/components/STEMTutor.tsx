import React, { useState } from 'react';
import { MessageCircle, CheckCircle, XCircle, Lightbulb, Video, ArrowRight, RefreshCw } from 'lucide-react';
import { UserProfile, LearningSession } from '../App';

interface Props {
  user: UserProfile;
  session: LearningSession;
  onUpdateUser: (updates: Partial<UserProfile>) => void;
  onSessionEnd: () => void;
}

const STEMTutor: React.FC<Props> = ({ user, session, onUpdateUser, onSessionEnd }) => {
  const [currentStep, setCurrentStep] = useState<'identify' | 'learn' | 'summarize' | 'practice' | 'reflect'>('identify');
  const [userInput, setUserInput] = useState('');
  const [summary, setSummary] = useState('');
  const [currentProblem, setCurrentProblem] = useState<any>(null);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [sessionPoints, setSessionPoints] = useState(0);

  const handleIdentifyGaps = () => {
    if (userInput.trim()) {
      setCurrentStep('learn');
      setSessionPoints(prev => prev + 5);
    }
  };

  const handleSummarySubmit = () => {
    if (summary.trim().length >= 10) {
      setCurrentStep('practice');
      setSessionPoints(prev => prev + 10);
      generateProblem();
    }
  };

  const generateProblem = () => {
    // Sample problems based on subject/topic
    const problems = {
      'Math': {
        'Basic Arithmetic': {
          question: "What is 12 + 15?",
          answer: "27",
          steps: ["12 + 15", "= 27"],
          hint: "Add the ones place first: 2 + 5 = 7, then the tens place: 1 + 1 = 2"
        }
      },
      'Physics': {
        'Forces': {
          question: "If a 5kg object has a force of 10N applied to it, what is its acceleration?",
          answer: "2",
          steps: ["F = ma", "10 = 5 × a", "a = 10/5", "a = 2 m/s²"],
          hint: "Remember Newton's second law: F = ma. Solve for acceleration (a)."
        }
      }
    };

    const problem = problems[session.subject as keyof typeof problems]?.[session.topic as any];
    setCurrentProblem(problem || {
      question: "Sample problem for " + session.topic,
      answer: "42",
      steps: ["Step 1", "Step 2", "Answer: 42"],
      hint: "Think step by step!"
    });
  };

  const handleAnswer = (answer: string) => {
    setAttempts(prev => prev + 1);
    
    if (answer.toLowerCase().includes(currentProblem.answer.toLowerCase())) {
      setSessionPoints(prev => prev + Math.max(20 - attempts * 5, 5));
      setCurrentStep('reflect');
    } else {
      if (attempts >= 2) {
        setShowHint(true);
      }
    }
  };

  const handleReflection = () => {
    const updatedUser = {
      ...user,
      totalPoints: user.totalPoints + sessionPoints,
      energyPoints: Math.min(100, user.energyPoints + Math.floor(sessionPoints / 2))
    };
    onUpdateUser(updatedUser);
    onSessionEnd();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-gray-900">
              Learning {session.subject}: {session.topic}
            </h1>
            <div className="text-sm font-medium text-blue-600">
              {sessionPoints} points earned
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{ 
                width: `${
                  currentStep === 'identify' ? 20 :
                  currentStep === 'learn' ? 40 :
                  currentStep === 'summarize' ? 60 :
                  currentStep === 'practice' ? 80 : 100
                }%` 
              }}
            ></div>
          </div>
        </div>

        {/* Step 1: Identify Knowledge Gaps */}
        {currentStep === 'identify' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <MessageCircle className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-900">What don't you know about {session.topic}?</h2>
            </div>
            
            <p className="text-gray-600">
              Be honest! Tell us what parts of {session.topic} you find confusing or haven't learned yet. 
              This helps us give you the right information.
            </p>
            
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="For example: I don't understand how to add fractions with different denominators..."
              className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            
            <button
              onClick={handleIdentifyGaps}
              disabled={!userInput.trim()}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center space-x-2"
            >
              <span>Next: Learn the Basics</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Step 2: Learning Materials */}
        {currentStep === 'learn' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <Video className="w-6 h-6 text-purple-500" />
              <h2 className="text-xl font-semibold text-gray-900">Learn the Basics</h2>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
              <h3 className="font-semibold text-purple-900 mb-3">Key Facts about {session.topic}</h3>
              <ul className="space-y-2 text-purple-800">
                <li>• Basic concept explanation</li>
                <li>• Important formulas or rules</li>
                <li>• Common examples</li>
                <li>• Tips and tricks</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <div className="flex items-center space-x-3 mb-3">
                <Video className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-blue-900">Educational Video</h3>
              </div>
              <div className="bg-gray-800 rounded-lg h-32 flex items-center justify-center">
                <p className="text-white">📹 Video: Introduction to {session.topic}</p>
              </div>
            </div>
            
            <button
              onClick={() => setCurrentStep('summarize')}
              className="bg-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-600 transition-all flex items-center space-x-2"
            >
              <span>I watched the video</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Step 3: Summary */}
        {currentStep === 'summarize' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <Lightbulb className="w-6 h-6 text-yellow-500" />
              <h2 className="text-xl font-semibold text-gray-900">Summarize What You Learned</h2>
            </div>
            
            <p className="text-gray-600">
              In 10-50 words, tell us what you learned about {session.topic}. Use your own words!
            </p>
            
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="I learned that..."
              className="w-full h-24 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
            
            <div className="text-sm text-gray-500">
              Words: {summary.trim().split(' ').filter(word => word.length > 0).length}/50
            </div>
            
            <button
              onClick={handleSummarySubmit}
              disabled={summary.trim().length < 10}
              className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center space-x-2"
            >
              <span>Submit Summary</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Step 4: Practice Problem */}
        {currentStep === 'practice' && currentProblem && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <h2 className="text-xl font-semibold text-gray-900">Practice Problem</h2>
            </div>
            
            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <h3 className="font-semibold text-green-900 mb-4">{currentProblem.question}</h3>
              
              <input
                type="text"
                placeholder="Enter your answer..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent mb-4"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAnswer(e.currentTarget.value);
                  }
                }}
              />
              
              {showHint && (
                <div className="bg-blue-100 rounded-lg p-4 mb-4">
                  <p className="text-sm text-blue-800">
                    <strong>Hint:</strong> {currentProblem.hint}
                  </p>
                </div>
              )}
              
              <p className="text-sm text-gray-600">Attempts: {attempts}/3</p>
            </div>
          </div>
        )}

        {/* Step 5: Reflection */}
        {currentStep === 'reflect' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <RefreshCw className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-900">Reflect on Your Learning</h2>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-4">Great job! 🎉</h3>
              <p className="text-blue-800 mb-4">
                Before you finish, help us understand: How did you solve this problem? 
                What steps did you take?
              </p>
              
              <textarea
                placeholder="I solved it by..."
                className="w-full h-24 p-4 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
              />
            </div>
            
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <p className="text-green-800 font-medium">
                Session Complete! You earned {sessionPoints} points! 🌟
              </p>
            </div>
            
            <button
              onClick={handleReflection}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all"
            >
              Finish Session
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default STEMTutor;