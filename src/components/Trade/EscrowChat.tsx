import React, { useState, useRef, useEffect } from 'react';
import { Send, Shield, Clock, AlertTriangle } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  type: 'message' | 'system';
}

interface EscrowChatProps {
  trader: string;
  amount: string;
  cryptoAmount: number;
  onClose: () => void;
}

export const EscrowChat = ({ trader, amount, cryptoAmount, onClose }: EscrowChatProps) => {
  const { user } = useAuthStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [escrowStatus, setEscrowStatus] = useState<'unfunded' | 'funded' | 'completed'>('unfunded');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add initial system message
    setMessages([
      {
        id: '1',
        sender: 'system',
        content: `Trade started with ${trader}. Please wait for the seller to fund the escrow.`,
        timestamp: new Date(),
        type: 'system'
      }
    ]);
  }, [trader]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Math.random().toString(36).substr(2, 9),
      sender: user?.username || 'You',
      content: newMessage,
      timestamp: new Date(),
      type: 'message'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const handleFundEscrow = async () => {
    setLoading(true);
    // Simulate funding delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setEscrowStatus('funded');
    setMessages(prev => [
      ...prev,
      {
        id: Math.random().toString(36).substr(2, 9),
        sender: 'system',
        content: 'Escrow has been funded. You can now proceed with the payment.',
        timestamp: new Date(),
        type: 'system'
      }
    ]);
    setLoading(false);
  };

  const handleCancelTrade = () => {
    const confirmCancel = window.confirm('Are you sure you want to cancel this trade?');
    if (confirmCancel) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Trade with {trader}</h2>
            <p className="text-sm text-gray-600">
              Amount: {amount} USD ({cryptoAmount.toFixed(8)} XMR)
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-500" />
            <span className="text-sm text-gray-600">Escrow Protected</span>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex flex-col ${
                message.type === 'system' ? 'items-center' : 
                message.sender === user?.username ? 'items-end' : 'items-start'
              }`}
            >
              {message.type === 'system' ? (
                <div className="bg-gray-100 rounded-lg px-4 py-2 text-sm text-gray-600 max-w-md">
                  {message.content}
                </div>
              ) : (
                <div className="space-y-1">
                  <span className="text-xs text-gray-500">
                    {message.sender} • {message.timestamp.toLocaleTimeString()}
                  </span>
                  <div className={`rounded-lg px-4 py-2 max-w-md ${
                    message.sender === user?.username
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    {message.content}
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Status Bar */}
        <div className="p-4 border-t border-b bg-gray-50">
          <div className="flex items-center gap-4">
            <Clock className="w-5 h-5 text-gray-500" />
            <div className="flex-1">
              <div className="text-sm font-medium">Trade Status</div>
              <div className="text-sm text-gray-600">
                {escrowStatus === 'unfunded' && 'Waiting for seller to fund escrow'}
                {escrowStatus === 'funded' && 'Escrow funded - Waiting for payment'}
                {escrowStatus === 'completed' && 'Trade completed'}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 border-b space-y-4">
          {escrowStatus === 'unfunded' && (
            <button
              onClick={handleFundEscrow}
              disabled={loading}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  Fund Escrow
                </>
              )}
            </button>
          )}
          <button
            onClick={handleCancelTrade}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
          >
            <AlertTriangle className="w-5 h-5" />
            Cancel Trade
          </button>
        </div>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};