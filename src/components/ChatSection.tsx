
import React, { useState } from 'react';
import { Send, Users } from 'lucide-react';

const ChatSection = ({ messages, addMessage, participants }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      addMessage(newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full flex flex-col">
      {/* 채팅 헤더 */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">실시간 채팅</h2>
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="w-4 h-4" />
            <span className="text-sm">{participants}명 참여</span>
          </div>
        </div>
      </div>

      {/* 메시지 목록 */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isTeacher ? 'justify-start' : 'justify-start'}`}>
            <div className={`max-w-xs ${msg.isTeacher ? 'bg-blue-100' : 'bg-gray-100'} rounded-lg p-3`}>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-medium ${msg.isTeacher ? 'text-blue-700' : 'text-gray-700'}`}>
                  {msg.user}
                </span>
                <span className="text-xs text-gray-500">{msg.time}</span>
              </div>
              <p className="text-sm text-gray-800">{msg.message}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 메시지 입력 */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="메시지를 입력하세요..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;
