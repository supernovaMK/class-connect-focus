import React, { useState } from 'react';
import { Vote, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface PollBlockProps {
  config?: {
    question?: string;
    options?: string[];
  };
  userRole: 'instructor' | 'student';
}

const PollBlock: React.FC<PollBlockProps> = ({ config, userRole }) => {
  const question = config?.question || '투표 질문';
  const options = config?.options?.length ? config.options : ['옵션 1', '옵션 2'];
  
  const [votes, setVotes] = useState<number[]>(options.map(() => 0));
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const totalVotes = votes.reduce((a, b) => a + b, 0);

  const handleVote = (index: number) => {
    if (hasVoted || userRole === 'instructor') return;
    
    const newVotes = [...votes];
    newVotes[index]++;
    setVotes(newVotes);
    setHasVoted(true);
    setSelectedOption(index);
  };

  const getPercentage = (voteCount: number) => {
    if (totalVotes === 0) return 0;
    return Math.round((voteCount / totalVotes) * 100);
  };

  return (
    <Card className="h-full bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border-purple-200 dark:border-purple-800">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Vote className="w-5 h-5 text-purple-600" />
            <CardTitle className="text-lg">투표</CardTitle>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{totalVotes}명 참여</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="font-medium mb-4">{question}</p>
        
        <div className="space-y-3">
          {options.map((option, index) => (
            <div key={index}>
              {userRole === 'instructor' || hasVoted ? (
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className={selectedOption === index ? 'font-semibold text-purple-600' : ''}>
                      {option}
                    </span>
                    <span className="text-muted-foreground">
                      {votes[index]}표 ({getPercentage(votes[index])}%)
                    </span>
                  </div>
                  <Progress 
                    value={getPercentage(votes[index])} 
                    className="h-2"
                  />
                </div>
              ) : (
                <Button
                  variant="outline"
                  className="w-full justify-start hover:bg-purple-100 dark:hover:bg-purple-900/30"
                  onClick={() => handleVote(index)}
                >
                  {option}
                </Button>
              )}
            </div>
          ))}
        </div>

        {userRole === 'student' && hasVoted && (
          <p className="text-sm text-green-600 mt-3 text-center">
            ✓ 투표 완료
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default PollBlock;
