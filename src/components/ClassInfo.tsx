
import React from 'react';
import { BookOpen, Clock, Users } from 'lucide-react';

const ClassInfo = ({ classInfo }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-full">
      <div className="flex items-center gap-3 mb-4">
        <BookOpen className="w-6 h-6 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-800">수업 정보</h2>
      </div>
      
      <div className="space-y-3">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{classInfo.name}</h3>
          <p className="text-gray-600">{classInfo.professor}</p>
        </div>
        
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{classInfo.time}</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-600">
          <Users className="w-4 h-4" />
          <span className="text-sm">참여자: {classInfo.participants}명</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">수업 상태</span>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            진행 중
          </span>
        </div>
      </div>
    </div>
  );
};

export default ClassInfo;
