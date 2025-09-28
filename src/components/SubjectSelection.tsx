import React from 'react';
import { Calculator, Atom, FlaskConical, Globe, Clock, Users, BookOpen, Lightbulb } from 'lucide-react';
import { UserProfile } from '../App';

interface Props {
  user: UserProfile;
  onSelectSubject: (subject: string, topic: string) => void;
}

const SubjectSelection: React.FC<Props> = ({ user, onSelectSubject }) => {
  const subjects = [
    {
      name: 'Math',
      icon: Calculator,
      color: 'from-blue-500 to-blue-600',
      topics: ['Basic Arithmetic', 'Fractions', 'Algebra', 'Geometry'],
      type: 'STEM'
    },
    {
      name: 'Physics',
      icon: Atom,
      color: 'from-purple-500 to-purple-600',
      topics: ['Motion', 'Forces', 'Energy', 'Light'],
      type: 'STEM'
    },
    {
      name: 'Chemistry',
      icon: FlaskConical,
      color: 'from-green-500 to-green-600',
      topics: ['Elements', 'Reactions', 'Molecules', 'Acids & Bases'],
      type: 'STEM'
    },
    {
      name: 'History',
      icon: Clock,
      color: 'from-amber-500 to-amber-600',
      topics: ['Ancient Civilizations', 'World Wars', 'American History', 'Cultural History'],
      type: 'Humanities'
    },
    {
      name: 'Geography',
      icon: Globe,
      color: 'from-teal-500 to-teal-600',
      topics: ['Continents', 'Climate', 'Natural Resources', 'Countries'],
      type: 'Humanities'
    },
    {
      name: 'Biology',
      icon: Lightbulb,
      color: 'from-emerald-500 to-emerald-600',
      topics: ['Human Body', 'Plants', 'Animals', 'Ecosystems'],
      type: 'Humanities'
    }
  ];

  const [selectedSubject, setSelectedSubject] = React.useState<string>('');
  const [selectedTopic, setSelectedTopic] = React.useState<string>('');

  const handleStart = () => {
    if (selectedSubject && selectedTopic) {
      onSelectSubject(selectedSubject, selectedTopic);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">What would you like to learn today?</h1>
        <p className="text-gray-600">Choose a subject and topic to start your learning journey</p>
      </div>

      {/* Subject Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {subjects.map((subject) => (
          <button
            key={subject.name}
            onClick={() => {
              setSelectedSubject(subject.name);
              setSelectedTopic('');
            }}
            className={`p-6 rounded-xl border-2 transition-all text-left ${
              selectedSubject === subject.name
                ? 'border-blue-500 bg-blue-50 shadow-lg transform scale-105'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
            }`}
          >
            <div className={`w-12 h-12 bg-gradient-to-r ${subject.color} rounded-lg flex items-center justify-center mb-4`}>
              <subject.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{subject.name}</h3>
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
              subject.type === 'STEM' 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-purple-100 text-purple-700'
            }`}>
              {subject.type}
            </span>
          </button>
        ))}
      </div>

      {/* Topic Selection */}
      {selectedSubject && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Choose a {selectedSubject} topic:
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {subjects
              .find(s => s.name === selectedSubject)
              ?.topics.map((topic) => (
                <button
                  key={topic}
                  onClick={() => setSelectedTopic(topic)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedTopic === topic
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <BookOpen className="w-6 h-6 mx-auto mb-2" />
                    <p className="font-medium">{topic}</p>
                  </div>
                </button>
              ))}
          </div>

          {selectedTopic && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Ready to learn {selectedTopic}?
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {subjects.find(s => s.name === selectedSubject)?.type === 'STEM' 
                      ? "We'll start by understanding what you already know, then build from there!"
                      : "Let's explore what you know and discover new insights together!"
                    }
                  </p>
                </div>
                <button
                  onClick={handleStart}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 flex items-center space-x-2"
                >
                  <span>Start Learning</span>
                  <Users className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Learning Method Info */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">STEM Subjects</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• Tell us what you don't understand</li>
            <li>• Get basic facts and helpful videos</li>
            <li>• Summarize what you learned</li>
            <li>• Practice step-by-step problem solving</li>
          </ul>
        </div>
        <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
          <h3 className="text-lg font-semibold text-purple-900 mb-3">Humanities Subjects</h3>
          <ul className="space-y-2 text-sm text-purple-800">
            <li>• Share what you already know</li>
            <li>• Explore new concepts with videos</li>
            <li>• Take interactive quizzes</li>
            <li>• Build understanding through discussion</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SubjectSelection;