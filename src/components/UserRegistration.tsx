import React, { useState } from 'react';
import { User, BookOpen, Star, ArrowRight } from 'lucide-react';
import { UserProfile } from '../App';

interface Props {
  onRegister: (user: UserProfile) => void;
}

const UserRegistration: React.FC<Props> = ({ onRegister }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    age: 8,
    grade: '3rd',
  });
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [showQuiz, setShowQuiz] = useState(false);

  const grades = ['K', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'];

  const quizQuestions = [
    {
      question: "What is 5 + 3?",
      options: ["6", "7", "8", "9"],
      correct: 2
    },
    {
      question: "Which planet is closest to the Sun?",
      options: ["Earth", "Mars", "Mercury", "Venus"],
      correct: 2
    },
    {
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correct: 2
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      const correctAnswers = quizAnswers.filter((answer, index) => answer === quizQuestions[index].correct).length;
      const bonusPoints = correctAnswers * 10;
      
      const user: UserProfile = {
        id: Date.now().toString(),
        name: formData.name,
        age: formData.age,
        grade: formData.grade,
        energyPoints: 100 + bonusPoints,
        totalPoints: bonusPoints,
        timeSpentToday: 0,
        timeLimit: 120, // 2 hours in minutes
        currentStreak: 0,
        subjects: {}
      };
      
      onRegister(user);
    }
  };

  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...quizAnswers];
    newAnswers[questionIndex] = answerIndex;
    setQuizAnswers(newAnswers);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to LearnSafe AI!</h1>
          <p className="text-gray-600">Let's get to know you better</p>
        </div>

        {step === 1 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What's your name?
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How old are you?
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                min="5"
                max="18"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What grade are you in?
              </label>
              <select
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {grades.map(grade => (
                  <option key={grade} value={grade}>{grade} Grade</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Continue</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        )}

        {step === 2 && !showQuiz && (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-yellow-100 rounded-full mx-auto flex items-center justify-center">
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Optional Quiz!</h2>
            <p className="text-gray-600">
              Want to take a quick quiz to earn bonus points and unlock special features? 
              It's completely optional!
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowQuiz(true)}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-xl font-medium hover:from-green-600 hover:to-emerald-700 transition-all"
              >
                Yes, let's quiz!
              </button>
              <button
                onClick={() => handleSubmit(new Event('submit') as any)}
                className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-xl font-medium hover:bg-gray-600 transition-all"
              >
                Skip for now
              </button>
            </div>
          </div>
        )}

        {step === 2 && showQuiz && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 text-center">Quick Quiz</h2>
            {quizQuestions.map((question, qIndex) => (
              <div key={qIndex} className="space-y-3">
                <p className="font-medium text-gray-900">{qIndex + 1}. {question.question}</p>
                <div className="grid grid-cols-2 gap-2">
                  {question.options.map((option, oIndex) => (
                    <button
                      key={oIndex}
                      onClick={() => handleQuizAnswer(qIndex, oIndex)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        quizAnswers[qIndex] === oIndex
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            
            <button
              onClick={handleSubmit}
              disabled={quizAnswers.length < quizQuestions.length}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Complete Setup
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserRegistration;