
import React, { useState } from 'react';
import { Users, MessageCircle, FileText, BookOpen, ClipboardList, Trophy, Clock, Plus, X } from 'lucide-react';
import ClassInfo from '@/components/ClassInfo';
import ChatSection from '@/components/ChatSection';
import QuizBlock from '@/components/QuizBlock';
import FileShare from '@/components/FileShare';
import AttendanceBlock from '@/components/AttendanceBlock';
import ParticipationBlock from '@/components/ParticipationBlock';
import SurveyCheckBlock from '@/components/SurveyCheckBlock';
import UserProfile from '@/components/UserProfile';

const Index = () => {
  const [userRole, setUserRole] = useState('instructor'); // 'instructor' or 'student'
  const [userName] = useState('이지현'); // This would come from authentication
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [messages, setMessages] = useState([
    { id: 1, user: '이지현 교수', message: '안녕하세요! 오늘 수업을 시작하겠습니다.', time: '10:00', isTeacher: true },
    { id: 2, user: '김보민', message: '교수님 안녕하세요!', time: '10:01', isTeacher: false },
    { id: 3, user: '박민수', message: '좋은 아침입니다~', time: '10:01', isTeacher: false }
  ]);

  // Block visibility state for instructor view
  const [visibleBlocks, setVisibleBlocks] = useState({
    classInfo: true,
    quiz: true,
    attendance: true,
    fileShare: true,
    participation: true,
    surveyCheck: false
  });

  const classInfo = {
    name: '미디어 심리학',
    professor: '이지현 교수',
    time: '화/목 10:00-11:30',
    participants: 25
  };

  const addMessage = (message) => {
    const newMessage = {
      id: messages.length + 1,
      user: userRole === 'instructor' ? '이지현 교수' : '김보민',
      message: message,
      time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
      isTeacher: userRole === 'instructor'
    };
    setMessages([...messages, newMessage]);
  };

  const toggleBlock = (blockName) => {
    setVisibleBlocks(prev => ({
      ...prev,
      [blockName]: !prev[blockName]
    }));
  };

  const addNewBlock = (blockType) => {
    setVisibleBlocks(prev => ({
      ...prev,
      [blockType]: true
    }));
  };

  const renderInstructorView = () => (
    <>
      {/* 왼쪽 블록들 */}
      <div className="col-span-4 space-y-4">
        {/* 수업 정보 블록 */}
        {visibleBlocks.classInfo && (
          <div className="h-48 relative">
            <button
              onClick={() => toggleBlock('classInfo')}
              className="absolute top-2 right-2 z-10 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
            >
              <X className="w-4 h-4" />
            </button>
            <ClassInfo classInfo={classInfo} />
          </div>
        )}
        
        {/* 퀴즈 블록 */}
        {visibleBlocks.quiz && (
          <div className="h-64 relative">
            <button
              onClick={() => toggleBlock('quiz')}
              className="absolute top-2 right-2 z-10 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
            >
              <X className="w-4 h-4" />
            </button>
            <QuizBlock activeQuiz={activeQuiz} setActiveQuiz={setActiveQuiz} />
          </div>
        )}
        
        {/* 출석 블록 */}
        {visibleBlocks.attendance && (
          <div className="flex-1 relative">
            <button
              onClick={() => toggleBlock('attendance')}
              className="absolute top-2 right-2 z-10 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
            >
              <X className="w-4 h-4" />
            </button>
            <AttendanceBlock participants={classInfo.participants} />
          </div>
        )}

        {/* 블록 추가 버튼 */}
        <div className="flex justify-center">
          <div className="flex gap-2">
            {!visibleBlocks.surveyCheck && (
              <button
                onClick={() => addNewBlock('surveyCheck')}
                className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                title="설문 체크 블록 추가"
              >
                <Plus className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 중앙 블록들 */}
      <div className="col-span-4 space-y-4">
        {/* 자료 공유 블록 */}
        {visibleBlocks.fileShare && (
          <div className="h-64 relative">
            <button
              onClick={() => toggleBlock('fileShare')}
              className="absolute top-2 right-2 z-10 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
            >
              <X className="w-4 h-4" />
            </button>
            <FileShare />
          </div>
        )}
        
        {/* 설문 체크 블록 */}
        {visibleBlocks.surveyCheck && (
          <div className="h-48 relative">
            <button
              onClick={() => toggleBlock('surveyCheck')}
              className="absolute top-2 right-2 z-10 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
            >
              <X className="w-4 h-4" />
            </button>
            <SurveyCheckBlock userRole={userRole} />
          </div>
        )}
        
        {/* 참여 내역 블록 */}
        {visibleBlocks.participation && (
          <div className="flex-1 relative">
            <button
              onClick={() => toggleBlock('participation')}
              className="absolute top-2 right-2 z-10 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
            >
              <X className="w-4 h-4" />
            </button>
            <ParticipationBlock />
          </div>
        )}
      </div>
    </>
  );

  const renderStudentView = () => (
    <>
      {/* 왼쪽 블록들 */}
      <div className="col-span-4 space-y-4">
        <div className="h-48">
          <ClassInfo classInfo={classInfo} />
        </div>
        
        <div className="h-64">
          <QuizBlock activeQuiz={activeQuiz} setActiveQuiz={setActiveQuiz} />
        </div>
        
        {visibleBlocks.surveyCheck && (
          <div className="h-48">
            <SurveyCheckBlock userRole={userRole} />
          </div>
        )}
        
        <div className="flex-1">
          <ParticipationBlock />
        </div>
      </div>

      {/* 중앙 블록들 */}
      <div className="col-span-4 space-y-4">
        <div className="h-64">
          <FileShare />
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-4 h-screen">
        {/* 사용자 프로필 - 우측 상단 */}
        <div className="col-span-12 flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <button
              onClick={() => setUserRole('instructor')}
              className={`px-4 py-2 rounded-lg ${
                userRole === 'instructor' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              교수자 뷰
            </button>
            <button
              onClick={() => setUserRole('student')}
              className={`px-4 py-2 rounded-lg ${
                userRole === 'student' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              학생 뷰
            </button>
          </div>
          <UserProfile userName={userName} userRole={userRole} />
        </div>

        {/* 메인 콘텐츠 */}
        {userRole === 'instructor' ? renderInstructorView() : renderStudentView()}

        {/* 오른쪽 채팅 블록 */}
        <div className="col-span-4">
          <ChatSection messages={messages} addMessage={addMessage} participants={classInfo.participants} />
        </div>
      </div>
    </div>
  );
};

export default Index;
