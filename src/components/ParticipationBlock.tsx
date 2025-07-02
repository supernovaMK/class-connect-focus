
import React from 'react';
import { Trophy, Target, CheckCircle } from 'lucide-react';

const ParticipationBlock = () => {
  const participationData = {
    quizzes: { completed: 3, total: 5, score: 85 },
    surveys: { completed: 2, total: 3 },
    attendance: { present: 12, total: 15 }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-full">
      <div className="flex items-center gap-3 mb-4">
        <Trophy className="w-6 h-6 text-yellow-600" />
        <h2 className="text-lg font-semibold text-gray-800">참여 내역</h2>
      </div>

      <div className="space-y-4">
        {/* 퀴즈 참여 */}
        <div className="p-3 bg-purple-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-800">퀴즈 참여</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
              {participationData.quizzes.completed}/{participationData.quizzes.total} 완료
            </span>
            <span className="text-sm font-medium text-purple-600">
              평균 {participationData.quizzes.score}점
            </span>
          </div>
        </div>

        {/* 설문 참여 */}
        <div className="p-3 bg-green-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">설문 참여</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
              {participationData.surveys.completed}/{participationData.surveys.total} 완료
            </span>
            <span className="text-sm font-medium text-green-600">
              {Math.round((participationData.surveys.completed / participationData.surveys.total) * 100)}%
            </span>
          </div>
        </div>

        {/* 출석 현황 */}
        <div className="p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <UserCheck className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">출석 현황</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
              {participationData.attendance.present}/{participationData.attendance.total} 출석
            </span>
            <span className="text-sm font-medium text-blue-600">
              {Math.round((participationData.attendance.present / participationData.attendance.total) * 100)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipationBlock;
