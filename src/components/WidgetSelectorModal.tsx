import React, { useState } from 'react';
import { X, ClipboardList, CheckSquare, FileText, Vote, BookOpen, Clock, Users, StickyNote } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface WidgetOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

interface WidgetSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectWidget: (widgetType: string, config: any) => void;
  hiddenWidgets: string[];
}

const widgetOptions: WidgetOption[] = [
  { id: 'quiz', name: '퀴즈', icon: <ClipboardList className="w-6 h-6" />, description: '학생들에게 퀴즈를 출제합니다' },
  { id: 'surveyCheck', name: '설문 체크', icon: <CheckSquare className="w-6 h-6" />, description: '과제 제출 여부를 확인합니다' },
  { id: 'poll', name: '투표', icon: <Vote className="w-6 h-6" />, description: '학생들의 의견을 투표로 수집합니다' },
  { id: 'memo', name: '메모장', icon: <StickyNote className="w-6 h-6" />, description: '수업 중 메모를 작성합니다' },
  { id: 'attendance', name: '출석', icon: <Users className="w-6 h-6" />, description: '출석 현황을 확인합니다' },
  { id: 'fileShare', name: '자료 공유', icon: <FileText className="w-6 h-6" />, description: '수업 자료를 공유합니다' },
  { id: 'classInfo', name: '수업 정보', icon: <BookOpen className="w-6 h-6" />, description: '수업 정보를 표시합니다' },
  { id: 'participation', name: '참여 내역', icon: <Clock className="w-6 h-6" />, description: '학생 참여 내역을 확인합니다' },
];

const WidgetSelectorModal: React.FC<WidgetSelectorModalProps> = ({
  isOpen,
  onClose,
  onSelectWidget,
  hiddenWidgets
}) => {
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null);
  const [configStep, setConfigStep] = useState<'select' | 'configure'>('select');
  
  // Configuration states
  const [quizQuestion, setQuizQuestion] = useState('');
  const [quizOptions, setQuizOptions] = useState(['', '', '', '']);
  const [quizAnswer, setQuizAnswer] = useState(0);
  
  const [surveyTitle, setSurveyTitle] = useState('');
  
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);
  
  const [memoTitle, setMemoTitle] = useState('');
  const [memoContent, setMemoContent] = useState('');

  const availableWidgets = widgetOptions.filter(w => hiddenWidgets.includes(w.id));

  const handleWidgetSelect = (widgetId: string) => {
    setSelectedWidget(widgetId);
    
    // Widgets that need configuration
    if (['quiz', 'surveyCheck', 'poll', 'memo'].includes(widgetId)) {
      setConfigStep('configure');
    } else {
      // Direct add for simple widgets
      onSelectWidget(widgetId, {});
      resetAndClose();
    }
  };

  const handleConfirmConfig = () => {
    let config = {};
    
    switch (selectedWidget) {
      case 'quiz':
        config = {
          question: quizQuestion,
          options: quizOptions.filter(o => o.trim() !== ''),
          correctAnswer: quizAnswer
        };
        break;
      case 'surveyCheck':
        config = { title: surveyTitle };
        break;
      case 'poll':
        config = {
          question: pollQuestion,
          options: pollOptions.filter(o => o.trim() !== '')
        };
        break;
      case 'memo':
        config = {
          title: memoTitle,
          content: memoContent
        };
        break;
    }
    
    onSelectWidget(selectedWidget!, config);
    resetAndClose();
  };

  const resetAndClose = () => {
    setSelectedWidget(null);
    setConfigStep('select');
    setQuizQuestion('');
    setQuizOptions(['', '', '', '']);
    setQuizAnswer(0);
    setSurveyTitle('');
    setPollQuestion('');
    setPollOptions(['', '']);
    setMemoTitle('');
    setMemoContent('');
    onClose();
  };

  const addPollOption = () => {
    setPollOptions([...pollOptions, '']);
  };

  const updatePollOption = (index: number, value: string) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  const updateQuizOption = (index: number, value: string) => {
    const newOptions = [...quizOptions];
    newOptions[index] = value;
    setQuizOptions(newOptions);
  };

  const renderConfigForm = () => {
    switch (selectedWidget) {
      case 'quiz':
        return (
          <div className="space-y-4">
            <div>
              <Label>퀴즈 질문</Label>
              <Input
                value={quizQuestion}
                onChange={(e) => setQuizQuestion(e.target.value)}
                placeholder="질문을 입력하세요"
              />
            </div>
            <div>
              <Label>선택지</Label>
              {quizOptions.map((option, index) => (
                <div key={index} className="flex items-center gap-2 mt-2">
                  <input
                    type="radio"
                    name="correctAnswer"
                    checked={quizAnswer === index}
                    onChange={() => setQuizAnswer(index)}
                  />
                  <Input
                    value={option}
                    onChange={(e) => updateQuizOption(index, e.target.value)}
                    placeholder={`선택지 ${index + 1}`}
                  />
                </div>
              ))}
              <p className="text-sm text-muted-foreground mt-1">정답을 선택하세요</p>
            </div>
          </div>
        );
      
      case 'surveyCheck':
        return (
          <div className="space-y-4">
            <div>
              <Label>설문 제목</Label>
              <Input
                value={surveyTitle}
                onChange={(e) => setSurveyTitle(e.target.value)}
                placeholder="예: 오늘 과제 제출 완료했나요?"
              />
            </div>
          </div>
        );
      
      case 'poll':
        return (
          <div className="space-y-4">
            <div>
              <Label>투표 질문</Label>
              <Input
                value={pollQuestion}
                onChange={(e) => setPollQuestion(e.target.value)}
                placeholder="투표 질문을 입력하세요"
              />
            </div>
            <div>
              <Label>투표 선택지</Label>
              {pollOptions.map((option, index) => (
                <Input
                  key={index}
                  value={option}
                  onChange={(e) => updatePollOption(index, e.target.value)}
                  placeholder={`선택지 ${index + 1}`}
                  className="mt-2"
                />
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addPollOption}
                className="mt-2"
              >
                + 선택지 추가
              </Button>
            </div>
          </div>
        );
      
      case 'memo':
        return (
          <div className="space-y-4">
            <div>
              <Label>메모 제목</Label>
              <Input
                value={memoTitle}
                onChange={(e) => setMemoTitle(e.target.value)}
                placeholder="메모 제목"
              />
            </div>
            <div>
              <Label>메모 내용</Label>
              <Textarea
                value={memoContent}
                onChange={(e) => setMemoContent(e.target.value)}
                placeholder="메모 내용을 입력하세요"
                rows={4}
              />
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetAndClose}>
      <DialogContent className="bg-background">
        <DialogHeader>
          <DialogTitle>
            {configStep === 'select' ? '위젯 추가' : '위젯 설정'}
          </DialogTitle>
        </DialogHeader>
        
        {configStep === 'select' ? (
          <div className="grid grid-cols-2 gap-3 mt-4">
            {availableWidgets.length > 0 ? (
              availableWidgets.map((widget) => (
                <button
                  key={widget.id}
                  onClick={() => handleWidgetSelect(widget.id)}
                  className="flex flex-col items-center p-4 border rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="text-primary">{widget.icon}</div>
                  <span className="mt-2 font-medium">{widget.name}</span>
                  <span className="text-xs text-muted-foreground text-center mt-1">
                    {widget.description}
                  </span>
                </button>
              ))
            ) : (
              <div className="col-span-2 text-center text-muted-foreground py-8">
                추가할 수 있는 위젯이 없습니다.
              </div>
            )}
          </div>
        ) : (
          <div className="mt-4">
            {renderConfigForm()}
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setConfigStep('select')}>
                뒤로
              </Button>
              <Button onClick={handleConfirmConfig}>
                추가
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WidgetSelectorModal;
