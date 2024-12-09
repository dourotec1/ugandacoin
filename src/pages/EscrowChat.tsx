import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Shield, AlertTriangle, Bell, CheckCircle2, Send, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { mockOffers } from '../data/mockOffers';
import { LoadingScreen } from '../components/LoadingScreen';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  type: 'message' | 'system';
}

interface DisputeReason {
  id: string;
  title: string;
  description: string;
}

const disputeReasons: DisputeReason[] = [
  {
    id: 'no-response',
    title: 'No response from trader',
    description: 'The trader has not responded for an extended period'
  },
  {
    id: 'payment-issue',
    title: 'Payment issue',
    description: 'There is a problem with the payment'
  },
  {
    id: 'terms-violation',
    title: 'Terms violation',
    description: 'The trader is not following the agreed terms'
  }
];

export const EscrowChat = () => {
  const { username, amount } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [escrowStatus, setEscrowStatus] = useState<'unfunded' | 'funded' | 'paid' | 'disputed' | 'completed'>('unfunded');
  const [loading, setLoading] = useState(true);
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [selectedDispute, setSelectedDispute] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const trader = mockOffers.find(offer => offer.username === username);
  const isSeller = user?.username === trader?.username;

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false);
      // Add initial system message
      setMessages([
        {
          id: '1',
          sender: 'system',
          content: `Trade started with ${username}. Please wait for the seller to fund the escrow.`,
          timestamp: new Date(),
          type: 'system'
        }
      ]);
    }, 3000);

    return () => clearTimeout(timer);
  }, [user, username, navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setEscrowStatus('funded');
    setMessages(prev => [
      ...prev,
      {
        id: Math.random().toString(36).substr(2, 9),
        sender: 'system',
        content: 'Escrow has been funded. Buyer can now proceed with the payment.',
        timestamp: new Date(),
        type: 'system'
      }
    ]);
    setLoading(false);
  };

  const handleMarkAsPaid = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setEscrowStatus('paid');
    setMessages(prev => [
      ...prev,
      {
        id: Math.random().toString(36).substr(2, 9),
        sender: 'system',
        content: 'Payment marked as sent. Waiting for seller confirmation.',
        timestamp: new Date(),
        type: 'system'
      }
    ]);
    setLoading(false);
  };

  const handleOpenDispute = (reason: string) => {
    setEscrowStatus('disputed');
    setShowDisputeModal(false);
    setMessages(prev => [
      ...prev,
      {
        id: Math.random().toString(36).substr(2, 9),
        sender: 'system',
        content: `Dispute opened: ${reason}. A moderator will review your case shortly.`,
        timestamp: new Date(),
        type: 'system'
      }
    ]);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white border-b sticky top-0 z-10">
          <div className="px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-lg font-semibold">Trade with {username}</h1>
                <p className="text-sm text-gray-600">
                  Amount: ${amount} USD
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-600">Escrow Protected</span>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="h-[calc(100vh-13rem)] overflow-y-auto p-4 space-y-4">
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
          <div ref={messagesEndRef} />
        </div>

        {/* Action Bar */}
        <div className="bg-white border-t sticky bottom-0">
          <div className="p-4 space-y-4">
            {/* Status and Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  escrowStatus === 'disputed' ? 'bg-red-500' :
                  escrowStatus === 'completed' ? 'bg-green-500' :
                  'bg-yellow-500'
                }`} />
                <span className="text-sm text-gray-600">
                  {escrowStatus === 'unfunded' && 'Waiting for seller to fund escrow'}
                  {escrowStatus === 'funded' && 'Escrow funded - Waiting for payment'}
                  {escrowStatus === 'paid' && 'Payment sent - Waiting for confirmation'}
                  {escrowStatus === 'disputed' && 'Dispute opened - Waiting for moderator'}
                  {escrowStatus === 'completed' && 'Trade completed'}
                </span>
              </div>
              
              <div className="flex gap-2">
                {isSeller && escrowStatus === 'unfunded' && (
                  <button
                    onClick={handleFundEscrow}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Fund Escrow
                  </button>
                )}
                
                {!isSeller && escrowStatus === 'funded' && (
                  <button
                    onClick={handleMarkAsPaid}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    I Have Paid
                  </button>
                )}
                
                {escrowStatus !== 'disputed' && escrowStatus !== 'completed' && (
                  <button
                    onClick={() => setShowDisputeModal(true)}
                    className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    Open Dispute
                  </button>
                )}
              </div>
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="flex gap-2">
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
            </form>
          </div>
        </div>
      </div>

      {/* Dispute Modal */}
      {showDisputeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-semibold mb-4">Open Dispute</h3>
            <p className="text-gray-600 mb-6">
              Please select a reason for opening the dispute:
            </p>
            
            <div className="space-y-4 mb-6">
              {disputeReasons.map(reason => (
                <label
                  key={reason.id}
                  className="flex items-start gap-3 p-3 rounded-lg border cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="radio"
                    name="disputeReason"
                    value={reason.id}
                    checked={selectedDispute === reason.id}
                    onChange={() => setSelectedDispute(reason.id)}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium">{reason.title}</div>
                    <div className="text-sm text-gray-600">{reason.description}</div>
                  </div>
                </label>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => handleOpenDispute(
                  disputeReasons.find(r => r.id === selectedDispute)?.title || ''
                )}
                disabled={!selectedDispute}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                Open Dispute
              </button>
              <button
                onClick={() => setShowDisputeModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};