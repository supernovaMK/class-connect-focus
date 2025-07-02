
import React from 'react';
import { UserCheck, Users } from 'lucide-react';

const AttendanceBlock = ({ participants }) => {
  const attendanceData = {
    present: 23,
    late: 2,
    absent: 0,
    total: participants
  };

  const attendanceRate = ((attendanceData.present / attendanceData.total) * 100).toFixed(1);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-full">
      <div className="flex items-center gap-3 mb-4">
        <UserCheck className="w-6 h-6 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-800">출석 현황</h2>
      </div>

      <div className="space-y-4">
        {/* 출석률 */}
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600">{attendanceRate}%</div>
          <p className="text-sm text-gray-500">출석률</p>
        </div>

        {/* 출석 상세 */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">출석</span>
            <span className="text-sm font-medium text-green-600">{attendanceData.present}명</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">지각</span>
            <span className="text-sm font-medium text-yellow-600">{attendanceData.late}명</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">결석</span>
            <span className="text-sm font-medium text-red-600">{attendanceData.absent}명</span>
          </div>
        </div>

        {/* 출석 체크 버튼 */}
        <div className="pt-4 border-t border-gray-100">
          <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            출석 확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceBlock;
