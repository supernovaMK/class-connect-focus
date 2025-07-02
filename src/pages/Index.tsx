
import React, { useState } from 'react';
import { Users, MessageCircle, FileText, BookOpen, ClipboardList, Trophy, Clock } from 'lucide-react';
import ClassInfo from '@/components/ClassInfo';
import ChatSection from '@/components/ChatSection';
import QuizBlock from '@/components/QuizBlock';
import FileShare from '@/components/FileShare';
import AttendanceBlock from '@/components/AttendanceBlock';
import ParticipationBlock from '@/components/ParticipationBlock';

const Index = () => {
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [messages, setMessages] = useState([
    { id: 1, user: '이지현 교수', message: '안녕하세요! 오늘 수업을 시작하겠습니다.', time: '10:00', isTeacher: true },
    { id: 2, user: '김보민', message: '교수님 안녕하세요!', time: '10:01', isTeacher: false },
    { id: 3, user: '박민수', message: '좋은 아침입니다~', time: '10:01', isTeacher: false }
  ]);

  const classInfo = {
    name: '미디어 심리학',
    professor: '이지현 교수',
    time: '화/목 10:00-11:30',
    participants: 25
  };

  const addMessage = (message) => {
    const newMessage = {
      id: messages.length + 1,
      user: '김보민',
      message: message,
      time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
      isTeacher: false
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-4 h-screen">
        {/* 왼쪽 블록들 */}
        <div className="col-span-4 space-y-4">
          {/* 수업 정보 블록 */}
          <div className="h-48">
            <ClassInfo classInfo={classInfo} />
          </div>
          
          {/* 퀴즈 블록 */}
          <div className="h-64">
            <QuizBlock activeQuiz={activeQuiz} setActiveQuiz={setActiveQuiz} />
          </div>
          
          {/* 출석 블록 */}
          <div className="flex-1">
            <AttendanceBlock participants={classInfo.participants} />
          </div>
        </div>

        {/* 중앙 블록들 */}
        <div className="col-span-4 space-y-4">
          {/* 자료 공유 블록 */}
          <div className="h-64">
            <FileShare />
          </div>
          
          {/* 참여 내역 블록 */}
          <div className="flex-1">
            <ParticipationBlock />
          </div>
        </div>

        {/* 오른쪽 채팅 블록 */}
        <div className="col-span-4">
          <ChatSection messages={messages} addMessage={addMessage} participants={classInfo.participants} />
        </div>
      </div>
    </div>
  );
};

export default Index;
