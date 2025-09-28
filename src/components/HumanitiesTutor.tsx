import React, { useState } from 'react';
import { MessageCircle, Video, Brain, CheckCircle, ArrowRight, RefreshCw } from 'lucide-react';
import { UserProfile, LearningSession } from '../App';

interface Props {
  user: UserProfile;
  session: LearningSession;
  onUpdateUser: (updates: Partial<UserProfile>) => void;
  onSessionEnd: () => void;
}

const HumanitiesTutor: React.FC<Props> = ({ user, session, onUpdateUser, onSessionEnd }) => {
  const [currentStep, setCurrentStep] = useState<'assess' | 'explore' | 'quiz' | 'reflect'>('assess');
  const [knownFacts, setKnownFacts] = useState<string[]>([]);
  const [newFact, setNewFact] = useState('');
  const [unknownAreas, setUnknownAreas] = useState<string[]>([]);
  const [currentQuiz, setCurrentQuiz] = useState<any[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [sessionPoints, setSessionPoints] = useState(0);

  const sampleQuizQuestions = {
    'History': [
      {
        question: "Which ancient civilization built the pyramids?",
        options: ["Romans", "Greeks", "Egyptians", "Babylonians"],
        correct: 2
      },
      {
        question: "What year did World War II end?",
        options: ["1944", "1945", "1946", "1947"],
        correct: 1
      }
    ],
    'Geography': [
      {
        question: "What is the largest continent?",
        options: ["Africa", "Asia", "North America", "Europe"],
        correct: 1
      },
      {
        question: "Which river is the longest in the world?",
        options: ["Amazon", "Nile", "Mississippi", "Yangtze"],
        correct: 1
      }
    ],
    'Biology': [
      {
        question: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Ribosome", "Mitochondria", "Chloroplast"],
        correct: 2
      }
    ]
  };

  const handleAddKnownFact = () => {
    if (newFact.trim() && !knownFacts.includes(newFact.trim())) {
      setKnownFacts([...knownFacts, newFact.trim()]);
      setNewFact('');
      setSessionPoints(prev => prev + 3);
    }
  };

  const handleExploreUnknown = (area: string) => {
    setUnknownAreas([...unknownAreas, area]);
    setSessionPoints(prev => prev + 5);
  };

  const startQuiz = () => {
    const questions = sampleQuizQuestions[session.subject as keyof typeof sampleQuizQuestions] || sampleQuizQuestions['History'];
    setCurrentQuiz(questions);
    setCurrentStep('quiz');
  };

  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...quizAnswers];
    newAnswers[questionIndex] = answerIndex;
    setQuizAnswers(newAnswers);
  };

  const submitQuiz = () => {
    const correctAnswers = quizAnswers.filter((answer, index) => 
      answer === currentQuiz[index]?.correct
    ).length;
    
    const points = correctAnswers * 15;
    setSessionPoints(prev => prev + points);
    setCurrentStep('reflect');
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
              Exploring {session.subject}: {session.topic}
            </h1>
            <div className="text-sm font-medium text-purple-600">
              {sessionPoints} points earned
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-purple-500 h-2 rounded-full transition-all"
              style={{ 
                width: `${
                  currentStep === 'assess' ? 25 :
                  currentStep === 'explore' ? 50 :
                  currentStep === 'quiz' ? 75 : 100
                }%` 
              }}
            ></div>
          </div>
        </div>

        {/* Step 1: Assess Current Knowledge */}
        {currentStep === 'assess' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <MessageCircle className="w-6 h-6 text-purple-500" />
              <h2 className="text-xl font-semibold text-gray-900">What do you already know about {session.topic}?</h2>
            </div>
            
            <p className="text-gray-600">
              List any facts, information, or ideas you already know about {session.topic}. 
              Don't worry if it's not much - everyone starts somewhere!
            </p>

            <div className="space-y-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newFact}
                  onChange={(e) => setNewFact(e.target.value)}
                  placeholder="Add something you know..."
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddKnownFact();
                    }
                  }}
                />
                <button
                  onClick={handleAddKnownFact}
                  disabled={!newFact.trim()}
                  className="bg-purple-500 text-white px-4 py-3 rounded-lg font-medium hover:bg-purple-600 disabled:opacity-50 transition-all"
                >
                  Add
                </button>
              </div>

              {knownFacts.length > 0 && (
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <h3 className="font-semibold text-purple-900 mb-2">What you know:</h3>
                  <ul className="space-y-1">
                    {knownFacts.map((fact, index) => (
                      <li key={index} className="text-purple-800 flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4" />
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <button
              onClick={() => setCurrentStep('explore')}
              className="bg-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-600 transition-all flex items-center space-x-2"
            >
              <span>Continue to Explore</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Step 2: Explore New Areas */}
        {currentStep === 'explore' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <Video className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-900">Discover Something New</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <div className="flex items-center space-x-3 mb-3">
                  <Video className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-blue-900">Educational Videos</h3>
                </div>
                <div className="space-y-3">
                  <div className="bg-gray-800 rounded-lg h-24 flex items-center justify-center">
                    <p className="text-white text-sm">📹 Introduction to {session.topic}</p>
                  </div>
                  <div className="bg-gray-800 rounded-lg h-24 flex items-center justify-center">
                    <p className="text-white text-sm">📹 Key Facts about {session.topic}</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                <h3 className="font-semibold text-green-900 mb-3">Areas to Explore</h3>
                <div className="space-y-2">
                  {['Key Concepts', 'Important Dates', 'Notable Figures', 'Cultural Impact'].map((area) => (
                    <button
                      key={area}
                      onClick={() => handleExploreUnknown(area)}
                      className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                        unknownAreas.includes(area)
                          ? 'border-green-500 bg-green-100 text-green-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {area} {unknownAreas.includes(area) && '✓'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <button
              onClick={startQuiz}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-all flex items-center space-x-2"
            >
              <span>Ready for Quiz</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Step 3: Interactive Quiz */}
        {currentStep === 'quiz' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <Brain className="w-6 h-6 text-green-500" />
              <h2 className="text-xl font-semibold text-gray-900">Knowledge Check Quiz</h2>
            </div>
            
            <div className="space-y-6">
              {currentQuiz.map((question, qIndex) => (
                <div key={qIndex} className="bg-green-50 rounded-lg p-6 border border-green-200">
                  <h3 className="font-semibold text-green-900 mb-4">
                    Question {qIndex + 1}: {question.question}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {question.options.map((option: string, oIndex: number) => (
                      <button
                        key={oIndex}
                        onClick={() => handleQuizAnswer(qIndex, oIndex)}
                        className={`p-3 rounded-lg border-2 transition-all text-left ${
                          quizAnswers[qIndex] === oIndex
                            ? 'border-green-500 bg-green-100 text-green-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <button
              onClick={submitQuiz}
              disabled={quizAnswers.length < currentQuiz.length}
              className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 disabled:opacity-50 transition-all flex items-center space-x-2"
            >
              <span>Submit Quiz</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Step 4: Reflection */}
        {currentStep === 'reflect' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <RefreshCw className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-900">Reflect on Your Journey</h2>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-4">Excellent work! 🎉</h3>
              <p className="text-blue-800 mb-4">
                What was the most interesting thing you learned about {session.topic} today?
              </p>
              
              <textarea
                placeholder="The most interesting thing I learned was..."
                className="w-full h-24 p-4 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
              />
            </div>
            
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <p className="text-green-800 font-medium">
                Learning Session Complete! You earned {sessionPoints} points! 🌟
              </p>
            </div>
            
            <button
              onClick={handleReflection}
              className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-blue-700 transition-all"
            >
              Finish Session
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HumanitiesTutor;