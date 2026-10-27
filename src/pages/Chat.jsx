import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Bot, Send, Trash2, X, BookOpen, Lightbulb, FlaskConical, Globe, Calculator } from 'lucide-react';
import './Chat.css';

// ── Constants ────────────────────────────────────────────────────────────────

const API_URL = 'http://localhost:3001/api/chat';

const EXAMPLE_QUESTIONS = [
  { icon: <Calculator size={13} />, text: 'How does the Pythagorean theorem work?' },
  { icon: <FlaskConical size={13} />, text: 'What is photosynthesis?' },
  { icon: <Globe size={13} />, text: 'Why does the Earth have seasons?' },
  { icon: <BookOpen size={13} />, text: 'What caused World War I?' },
  { icon: <Lightbulb size={13} />, text: 'How do black holes form?' },
  { icon: <FlaskConical size={13} />, text: "Explain Newton's laws of motion" },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/**
 * Minimal markdown renderer: bold, inline code, lists, paragraphs.
 * Returns an array of React elements.
 */
function renderMarkdown(text) {
  const lines = text.split('\n');
  const elements = [];
  let key = 0;
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Blank line
    if (!line.trim()) { i++; continue; }

    // Unordered list
    if (/^[-*]\s/.test(line)) {
      const items = [];
      while (i < lines.length && /^[-*]\s/.test(lines[i])) {
        items.push(<li key={i}>{inlineMarkdown(lines[i].replace(/^[-*]\s/, ''))}</li>);
        i++;
      }
      elements.push(<ul key={key++}>{items}</ul>);
      continue;
    }

    // Ordered list
    if (/^\d+\.\s/.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(<li key={i}>{inlineMarkdown(lines[i].replace(/^\d+\.\s/, ''))}</li>);
        i++;
      }
      elements.push(<ol key={key++}>{items}</ol>);
      continue;
    }

    // Heading (## or ###)
    if (/^#{2,3}\s/.test(line)) {
      elements.push(<h3 key={key++}>{inlineMarkdown(line.replace(/^#{2,3}\s/, ''))}</h3>);
      i++;
      continue;
    }

    // Regular paragraph
    elements.push(<p key={key++}>{inlineMarkdown(line)}</p>);
    i++;
  }

  return elements;
}

function inlineMarkdown(text) {
  // Split on **bold** and `code`
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={idx}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={idx}>{part.slice(1, -1)}</code>;
    }
    return part;
  });
}

// ── Chat Component ────────────────────────────────────────────────────────────

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Auto-resize textarea
  const handleInputChange = (e) => {
    setInput(e.target.value);
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = Math.min(el.scrollHeight, 150) + 'px';
    }
  };

  const sendMessage = useCallback(async (text) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    // Append user message
    const userMsg = { role: 'user', content: trimmed, time: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setError(null);
    setLoading(true);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    // Build history (exclude the message we just added — server adds it to chat)
    const history = messages.map(m => ({ role: m.role, content: m.content }));

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to get a response.');
      }

      const aiMsg = { role: 'assistant', content: data.reply, time: new Date() };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      setError(
        err.message.includes('Failed to fetch')
          ? 'Cannot connect to the AI server. Make sure the backend is running on port 3001.'
          : err.message
      );
    } finally {
      setLoading(false);
    }
  }, [loading, messages]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleExampleClick = (question) => {
    sendMessage(question);
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  const canSend = input.trim().length > 0 && !loading;

  return (
    <div className="chat-page">
      {/* ── Header ── */}
      <div className="chat-header">
        <div className="chat-header-inner">
          <div className="chat-avatar-ai">
            <Bot size={22} color="white" />
          </div>
          <div className="chat-header-info">
            <h1 className="gradient-text">EduBot AI Tutor</h1>
            <div className="chat-status">
              <span className="status-dot" />
              <span>Online · Powered by Gemini 2.0</span>
            </div>
          </div>
          <div className="chat-header-actions">
            {messages.length > 0 && (
              <button
                className="icon-btn"
                onClick={clearChat}
                title="Clear conversation"
                aria-label="Clear conversation"
                id="clear-chat-btn"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Example Questions ── */}
      {messages.length === 0 && (
        <div className="example-questions">
          <div className="example-questions-label">Try asking</div>
          <div className="example-chips" role="list">
            {EXAMPLE_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                className="example-chip"
                onClick={() => handleExampleClick(q.text)}
                disabled={loading}
                role="listitem"
                id={`example-chip-${idx}`}
              >
                {q.icon}
                {q.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Messages ── */}
      <div className="chat-messages" role="log" aria-live="polite" aria-label="Chat messages" id="chat-messages">
        {messages.length === 0 && !loading && (
          <div className="chat-empty">
            <div className="chat-empty-icon">
              <Bot size={30} color="var(--primary-light)" />
            </div>
            <h3>Ask me anything educational!</h3>
            <p>I can help with Science, Maths, History, Geography, Literature, and much more.</p>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`message-row ${msg.role === 'user' ? 'user' : 'ai'}`}
            id={`message-${idx}`}
          >
            <div className={`msg-avatar ${msg.role === 'user' ? 'msg-avatar-user' : 'msg-avatar-ai'}`}>
              {msg.role === 'user' ? 'S' : <Bot size={16} />}
            </div>
            <div className="message-content">
              <div className={`msg-bubble ${msg.role === 'user' ? 'msg-bubble-user' : 'msg-bubble-ai'}`}>
                {msg.role === 'assistant'
                  ? renderMarkdown(msg.content)
                  : msg.content
                }
              </div>
              <span className="msg-time">{formatTime(msg.time)}</span>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {loading && (
          <div className="message-row ai" id="typing-indicator">
            <div className="msg-avatar msg-avatar-ai">
              <Bot size={16} />
            </div>
            <div className="message-content">
              <div className="msg-bubble msg-bubble-ai">
                <div className="typing-indicator" aria-label="EduBot is typing">
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── Error Banner ── */}
      {error && (
        <div className="chat-error-banner" role="alert" id="chat-error">
          <X size={16} />
          <span>{error}</span>
          <button
            className="error-dismiss"
            onClick={() => setError(null)}
            aria-label="Dismiss error"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* ── Input ── */}
      <div className="chat-input-area">
        <div className="chat-input-wrapper">
          <textarea
            ref={textareaRef}
            className="chat-textarea"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question about any subject…"
            rows={1}
            disabled={loading}
            aria-label="Chat input"
            id="chat-input"
          />
          <button
            className="send-btn"
            onClick={() => sendMessage(input)}
            disabled={!canSend}
            aria-label="Send message"
            id="send-btn"
          >
            <Send size={16} />
          </button>
        </div>
        <p className="input-hint">Press Enter to send · Shift+Enter for new line</p>
      </div>
    </div>
  );
}
