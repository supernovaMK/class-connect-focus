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
import WidgetSelectorModal from '@/components/WidgetSelectorModal';
import MemoBlock from '@/components/MemoBlock';
import PollBlock from '@/components/PollBlock';

interface WidgetConfig {
  [key: string]: any;
}

const Index = () => {
  const [userRole, setUserRole] = useState<'instructor' | 'student'>('instructor');
  const [userName] = useState('이지현');
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [messages, setMessages] = useState([
    { id: 1, user: '이지현 교수', message: '안녕하세요! 오늘 수업을 시작하겠습니다.', time: '10:00', isTeacher: true },
    { id: 2, user: '김보민', message: '교수님 안녕하세요!', time: '10:01', isTeacher: false },
    { id: 3, user: '박민수', message: '좋은 아침입니다~', time: '10:01', isTeacher: false }
  ]);

  const [isWidgetModalOpen, setIsWidgetModalOpen] = useState(false);

  // Block visibility state for instructor view
  const [visibleBlocks, setVisibleBlocks] = useState({
    classInfo: true,
    quiz: true,
    attendance: true,
    fileShare: true,
    participation: true,
    surveyCheck: false,
    memo: false,
    poll: false
  });

  // Widget configurations
  const [widgetConfigs, setWidgetConfigs] = useState<WidgetConfig>({});

  const classInfo = {
    name: '미디어 심리학',
    professor: '이지현 교수',
    time: '화/목 10:00-11:30',
    participants: 25
  };

  const addMessage = (message: string) => {
    const newMessage = {
      id: messages.length + 1,
      user: userRole === 'instructor' ? '이지현 교수' : '김보민',
      message: message,
      time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
      isTeacher: userRole === 'instructor'
    };
    setMessages([...messages, newMessage]);
  };

  const toggleBlock = (blockName: string) => {
    setVisibleBlocks(prev => ({
      ...prev,
      [blockName]: !prev[blockName]
    }));
  };

  const handleAddWidget = (widgetType: string, config: any) => {
    setVisibleBlocks(prev => ({
      ...prev,
      [widgetType]: true
    }));
    setWidgetConfigs(prev => ({
      ...prev,
      [widgetType]: config
    }));
  };

  const getHiddenWidgets = () => {
    return Object.entries(visibleBlocks)
      .filter(([_, visible]) => !visible)
      .map(([key]) => key);
  };

  const renderBlockWithClose = (blockName: string, content: React.ReactNode, heightClass: string = 'h-48') => (
    <div className={`${heightClass} relative`}>
      <button
        onClick={() => toggleBlock(blockName)}
        className="absolute top-2 right-2 z-10 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
      >
        <X className="w-4 h-4" />
      </button>
      {content}
    </div>
  );

  const renderInstructorView = () => (
    <>
      {/* 왼쪽 블록들 */}
      <div className="col-span-4 space-y-4">
        {visibleBlocks.classInfo && renderBlockWithClose(
          'classInfo',
          <ClassInfo classInfo={classInfo} />
        )}
        
        {visibleBlocks.quiz && renderBlockWithClose(
          'quiz',
          <QuizBlock activeQuiz={activeQuiz} setActiveQuiz={setActiveQuiz} config={widgetConfigs.quiz} />,
          'h-64'
        )}
        
        {visibleBlocks.attendance && renderBlockWithClose(
          'attendance',
          <AttendanceBlock participants={classInfo.participants} />,
          'flex-1'
        )}

        {visibleBlocks.memo && renderBlockWithClose(
          'memo',
          <MemoBlock config={widgetConfigs.memo} userRole={userRole} />
        )}
      </div>

      {/* 중앙 블록들 */}
      <div className="col-span-4 space-y-4">
        {visibleBlocks.fileShare && renderBlockWithClose(
          'fileShare',
          <FileShare />,
          'h-64'
        )}
        
        {visibleBlocks.surveyCheck && renderBlockWithClose(
          'surveyCheck',
          <SurveyCheckBlock userRole={userRole} config={widgetConfigs.surveyCheck} />
        )}

        {visibleBlocks.poll && renderBlockWithClose(
          'poll',
          <PollBlock config={widgetConfigs.poll} userRole={userRole} />
        )}
        
        {visibleBlocks.participation && renderBlockWithClose(
          'participation',
          <ParticipationBlock />,
          'flex-1'
        )}

        {/* 블록 추가 버튼 */}
        <div className="flex justify-center">
          <button
            onClick={() => setIsWidgetModalOpen(true)}
            className="p-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span>위젯 추가</span>
          </button>
        </div>
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
          <QuizBlock activeQuiz={activeQuiz} setActiveQuiz={setActiveQuiz} config={widgetConfigs.quiz} />
        </div>
        
        {visibleBlocks.surveyCheck && (
          <div className="h-48">
            <SurveyCheckBlock userRole={userRole} config={widgetConfigs.surveyCheck} />
          </div>
        )}

        {visibleBlocks.memo && (
          <div className="h-48">
            <MemoBlock config={widgetConfigs.memo} userRole={userRole} />
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

        {visibleBlocks.poll && (
          <div className="h-48">
            <PollBlock config={widgetConfigs.poll} userRole={userRole} />
          </div>
        )}
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

      {/* 위젯 선택 모달 */}
      <WidgetSelectorModal
        isOpen={isWidgetModalOpen}
        onClose={() => setIsWidgetModalOpen(false)}
        onSelectWidget={handleAddWidget}
        hiddenWidgets={getHiddenWidgets()}
      />
    </div>
  );
};

export default Index;
