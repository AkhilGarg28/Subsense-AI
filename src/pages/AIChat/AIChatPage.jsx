import { useState } from 'react';
import { HiOutlinePaperAirplane, HiOutlineSparkles } from 'react-icons/hi';
import { Card, Button } from '../../components/ui';
import { APP_NAME } from '../../utils/constants';

/**
 * AIChatPage — AI financial assistant chat interface.
 * Placeholder UI — AI integration will be added later.
 */
const AIChatPage = () => {
  const [message, setMessage] = useState('');

  const placeholderMessages = [
    { role: 'assistant', content: `Hi! I'm your ${APP_NAME} assistant. How can I help you manage your finances today?` },
    { role: 'user', content: 'What are my top subscriptions by cost?' },
    { role: 'assistant', content: 'Based on your data, your top 3 subscriptions by cost are:\n1. AWS - $120.00/mo\n2. Adobe CC - $54.99/mo\n3. Netflix - $15.99/mo\n\nTotal: $190.98/month' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Connect to AI backend
    //todo: Add message to chat history
    console.log('Message sent:', message);
    setMessage('');
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col animate-fade-in">
      {/* Page Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">AI Chat</h1>
        <p className="mt-1 text-text-secondary">Chat with your AI financial assistant.</p>
      </div>

      {/* Chat Area */}
      <Card className="flex flex-1 flex-col overflow-hidden" padding="none">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {placeholderMessages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  msg.role === 'user'
                    ? 'bg-primary text-white'
                    : 'bg-surface text-text-primary'
                }`}
              >
                {msg.role === 'assistant' && (
                  <div className="mb-1 flex items-center gap-1.5">
                    <HiOutlineSparkles className="h-3.5 w-3.5 text-primary" />
                    <span className="text-xs font-medium text-primary">{APP_NAME}</span>
                  </div>
                )}
                <p className="text-sm whitespace-pre-line">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="border-t border-border p-4">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about your finances..."
              className="flex-1 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <Button type="submit" variant="primary" className="rounded-xl px-4">
              <HiOutlinePaperAirplane className="h-5 w-5 rotate-90" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default AIChatPage;
