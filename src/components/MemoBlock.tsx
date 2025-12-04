import React, { useState } from 'react';
import { StickyNote, Edit2, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface MemoBlockProps {
  config?: {
    title?: string;
    content?: string;
  };
  userRole: 'instructor' | 'student';
}

const MemoBlock: React.FC<MemoBlockProps> = ({ config, userRole }) => {
  const [title, setTitle] = useState(config?.title || '메모');
  const [content, setContent] = useState(config?.content || '');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <Card className="h-full bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-yellow-200 dark:border-yellow-800">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StickyNote className="w-5 h-5 text-yellow-600" />
            {isEditing && userRole === 'instructor' ? (
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-7 text-lg font-semibold bg-transparent border-yellow-300"
              />
            ) : (
              <CardTitle className="text-lg">{title}</CardTitle>
            )}
          </div>
          {userRole === 'instructor' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="h-8 w-8 p-0"
            >
              {isEditing ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Edit2 className="w-4 h-4 text-muted-foreground" />
              )}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isEditing && userRole === 'instructor' ? (
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="메모 내용을 입력하세요..."
            className="min-h-[100px] bg-white/50 dark:bg-black/20 border-yellow-200"
          />
        ) : (
          <div className="min-h-[100px] p-3 bg-white/50 dark:bg-black/20 rounded-md whitespace-pre-wrap text-sm">
            {content || (
              <span className="text-muted-foreground italic">
                메모 내용이 없습니다.
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MemoBlock;
