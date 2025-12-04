import React, { useState, useEffect } from 'react';
import { HelpCircle, CheckCircle } from 'lucide-react';

interface QuizConfig {
  question?: string;
  options?: string[];
  correctAnswer?: number;
}

interface QuizBlockProps {
  activeQuiz: any;
  setActiveQuiz: (quiz: any) => void;
  config?: QuizConfig;
}

const QuizBlock = ({ activeQuiz, setActiveQuiz, config }: QuizBlockProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const sampleQuiz = config?.question ? {
    id: 1,
    question: config.question,
    options: config.options || [],
    correctAnswer: config.options?.[config.correctAnswer || 0] || ''
  } : {
    id: 1,
    question: '미디어 심리학에서 가장 중요한 개념은 무엇인가요?',
    options: ['인지 편향', '감정적 반응', '사회적 학습', '모든 것'],
    correctAnswer: '모든 것'
  };

  const handleSubmit = () => {
    setSubmitted(true);
    // 퀴즈 결과 처리 로직
    console.log('선택한 답:', selectedAnswer);
  };

  const startQuiz = () => {
    setActiveQuiz(sampleQuiz);
    setSelectedAnswer('');
    setSubmitted(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-full">
      <div className="flex items-center gap-3 mb-4">
        <HelpCircle className="w-6 h-6 text-purple-600" />
        <h2 className="text-lg font-semibold text-gray-800">퀴즈</h2>
      </div>

      {!activeQuiz ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">활성화된 퀴즈가 없습니다</p>
          <button
            onClick={startQuiz}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            샘플 퀴즈 시작
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">{activeQuiz.question}</h3>
            <div className="space-y-2">
              {activeQuiz.options.map((option, index) => (
                <label key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="quiz-answer"
                    value={option}
                    checked={selectedAnswer === option}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                    disabled={submitted}
                    className="text-purple-600"
                  />
                  <span className="text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={!selectedAnswer}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              제출하기
            </button>
          ) : (
            <div className="text-center py-2">
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-sm text-green-600">제출 완료!</p>
              {selectedAnswer === activeQuiz.correctAnswer ? (
                <p className="text-sm text-green-600 mt-1">정답입니다! 🎉</p>
              ) : (
                <p className="text-sm text-red-600 mt-1">정답: {activeQuiz.correctAnswer}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizBlock;
