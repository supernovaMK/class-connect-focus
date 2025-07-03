
import React, { useState } from 'react';
import { CheckSquare, Users, Check } from 'lucide-react';

interface SurveyCheckBlockProps {
  userRole: 'instructor' | 'student';
}

const SurveyCheckBlock = ({ userRole }: SurveyCheckBlockProps) => {
  const [checkQuestion, setCheckQuestion] = useState('오늘 과제 제출 완료했나요?');
  const [isActive, setIsActive] = useState(false);
  const [studentResponse, setStudentResponse] = useState(false);
  const [responses] = useState({
    total: 25,
    completed: 18,
    pending: 7
  });

  const handleActivateCheck = () => {
    setIsActive(true);
  };

  const handleStudentCheck = () => {
    setStudentResponse(true);
  };

  if (userRole === 'instructor') {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-full">
        <div className="flex items-center gap-3 mb-4">
          <CheckSquare className="w-6 h-6 text-green-600" />
          <h2 className="text-lg font-semibold text-gray-800">설문 체크</h2>
        </div>

        {!isActive ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                체크 질문
              </label>
              <input
                type="text"
                value={checkQuestion}
                onChange={(e) => setCheckQuestion(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button
              onClick={handleActivateCheck}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              체크 활성화
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm font-medium text-green-800 mb-2">활성 질문:</p>
              <p className="text-sm text-gray-700">{checkQuestion}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">{responses.completed}</div>
                <p className="text-xs text-gray-600">완료</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">{responses.pending}</div>
                <p className="text-xs text-gray-600">대기</p>
              </div>
            </div>

            <button
              onClick={() => setIsActive(false)}
              className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              체크 종료
            </button>
          </div>
        )}
      </div>
    );
  }

  // Student view
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-full">
      <div className="flex items-center gap-3 mb-4">
        <CheckSquare className="w-6 h-6 text-green-600" />
        <h2 className="text-lg font-semibold text-gray-800">체크 요청</h2>
      </div>

      {isActive ? (
        <div className="space-y-4">
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-700">{checkQuestion}</p>
          </div>

          {!studentResponse ? (
            <button
              onClick={handleStudentCheck}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              체크 완료
            </button>
          ) : (
            <div className="text-center py-4">
              <Check className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-sm text-green-600">체크 완료!</p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <CheckSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">활성화된 체크 요청이 없습니다</p>
        </div>
      )}
    </div>
  );
};

export default SurveyCheckBlock;
