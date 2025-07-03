
import React from 'react';
import { User } from 'lucide-react';

interface UserProfileProps {
  userName: string;
  userRole: 'instructor' | 'student';
}

const UserProfile = ({ userName, userRole }: UserProfileProps) => {
  const roleLabel = userRole === 'instructor' ? '교수' : '학생';

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
      <User className="w-4 h-4 text-gray-600" />
      <span className="text-sm font-medium text-gray-800">
        {userName} <span className="text-gray-500">[{roleLabel}]</span>
      </span>
    </div>
  );
};

export default UserProfile;
