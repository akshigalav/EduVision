import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Bot, 
  Send, 
  Trash2, 
  X, 
  BookOpen, 
  Lightbulb, 
  FlaskConical, 
  Globe, 
  Calculator,
  Dna,
  Atom,
  Sigma,
  Cpu,
  Sparkles,
  Zap,
  Sun,
  Droplet,
  Compass,
  Flame,
  Triangle,
  Layers,
  TrendingUp,
  GitBranch,
  BarChart2,
  Brain,
  Leaf
} from 'lucide-react';
import './Chat.css';

// ── Constants ────────────────────────────────────────────────────────────────

const API_URL = 'http://localhost:3001/api/chat';

export const SUBJECT_TABS = [
  { id: 'all', label: 'All Subjects', icon: <Sparkles size={14} />, color: '#6366f1' },
  { id: 'biology', label: 'Biology', icon: <Dna size={14} />, color: '#10b981' },
  { id: 'physics', label: 'Physics', icon: <Atom size={14} />, color: '#6366f1' },
  { id: 'chemistry', label: 'Chemistry', icon: <FlaskConical size={14} />, color: '#06b6d4' },
  { id: 'mathematics', label: 'Mathematics', icon: <Sigma size={14} />, color: '#f59e0b' },
  { id: 'computer-science', label: 'Computer Science', icon: <Cpu size={14} />, color: '#818cf8' },
];

export const SUBJECT_QUESTIONS = {
  all: [
    { icon: <Calculator size={13} />, text: 'How does the Pythagorean theorem work?' },
    { icon: <FlaskConical size={13} />, text: 'What is photosynthesis and cellular respiration?' },
    { icon: <Globe size={13} />, text: 'Why does the Earth have seasons and orbital tilt?' },
    { icon: <Atom size={13} />, text: "Explain Newton's three laws of motion with examples" },
    { icon: <Cpu size={13} />, text: 'How do binary search trees achieve O(log n) efficiency?' },
    { icon: <Dna size={13} />, text: 'How does the human heart coordinate electrical impulses?' },
  ],
  biology: [
    { icon: <Dna size={13} />, text: 'Explain how the 4 chambers of the human heart prevent blood mixing' },
    { icon: <Brain size={13} />, text: 'How do neurotransmitters cross the synaptic cleft between neurons?' },
    { icon: <Leaf size={13} />, text: 'Compare chloroplasts with mitochondria in cellular energy metabolism' },
    { icon: <Dna size={13} />, text: 'What is the role of DNA helicase and polymerase in replication?' },
  ],
  physics: [
    { icon: <Atom size={13} />, text: "Explain Kepler's 3 laws of planetary motion and elliptical orbits" },
    { icon: <Zap size={13} />, text: "How does Faraday's law of induction convert motion into electricity?" },
    { icon: <Sun size={13} />, text: "Why does light refract and bend according to Snell's law?" },
    { icon: <Atom size={13} />, text: 'How does total internal reflection enable fiber optic communication?' },
  ],
  chemistry: [
    { icon: <Droplet size={13} />, text: 'Why does ice float on water, and how does hydrogen bonding explain this?' },
    { icon: <Compass size={13} />, text: 'Explain electronegativity trends across the periodic table' },
    { icon: <FlaskConical size={13} />, text: 'How do catalysts lower activation energy without being consumed?' },
    { icon: <Flame size={13} />, text: "How does Le Chatelier's Principle predict equilibrium shifts under stress?" },
  ],
  mathematics: [
    { icon: <Triangle size={13} />, text: 'How does the unit circle connect right-triangle trigonometry to periodic sine waves?' },
    { icon: <Layers size={13} />, text: 'Explain the difference between vector dot product and cross product in 3D' },
    { icon: <TrendingUp size={13} />, text: 'What is the intuitive meaning of a derivative as instantaneous rate of change?' },
    { icon: <Calculator size={13} />, text: 'How does the Fundamental Theorem of Calculus unify derivatives and integrals?' },
  ],
  'computer-science': [
    { icon: <GitBranch size={13} />, text: 'Why does an inorder traversal of a Binary Search Tree produce sorted values?' },
    { icon: <Cpu size={13} />, text: 'Explain the CPU fetch-decode-execute instruction cycle and registers' },
    { icon: <BarChart2 size={13} />, text: 'Compare Quicksort and Mergesort in time complexity, space complexity, and stability' },
    { icon: <Cpu size={13} />, text: 'What is instruction pipelining and how do branch prediction hazards affect throughput?' },
  ],
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function renderMarkdown(text) {
  const lines = text.split('\n');
  const elements = [];
  let key = 0;
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

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
  const [searchParams] = useSearchParams();
  const urlSubjectParam = searchParams.get('subject')?.toLowerCase() || 'all';
  const initialQuery = searchParams.get('q') || searchParams.get('prompt') || '';

  // Match subject tab ID from URL param
  const matchedSubject = SUBJECT_TABS.find(t => 
    t.id === urlSubjectParam || t.label.toLowerCase() === urlSubjectParam
  )?.id || 'all';

  const [activeSubject, setActiveSubject] = useState(matchedSubject);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const initialQuerySentRef = useRef(false);

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

  const sendMessage = useCallback(async (text, overrideSubject) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const currentSub = overrideSubject || activeSubject;

    // Append user message
    const userMsg = { role: 'user', content: trimmed, time: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setError(null);
    setLoading(true);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    const history = messages.map(m => ({ role: m.role, content: m.content }));

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: trimmed, 
          history, 
          subject: currentSub !== 'all' ? currentSub : undefined 
        }),
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
  }, [loading, messages, activeSubject]);

  // Automatically submit initial query if present in URL
  useEffect(() => {
    if (initialQuery && !initialQuerySentRef.current) {
      initialQuerySentRef.current = true;
      sendMessage(initialQuery, matchedSubject);
    }
  }, [initialQuery, matchedSubject, sendMessage]);

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

  const currentQuestions = SUBJECT_QUESTIONS[activeSubject] || SUBJECT_QUESTIONS.all;
  const activeTabMeta = SUBJECT_TABS.find(t => t.id === activeSubject) || SUBJECT_TABS[0];

  return (
    <div className="chat-page">
      {/* ── Header ── */}
      <div className="chat-header">
        <div className="chat-header-inner">
          <div className="chat-avatar-ai">
            <Bot size={22} color="white" />
          </div>
          <div className="chat-header-info">
            <h1 className="gradient-text">EduBot AI Smart Tutor</h1>
            <div className="chat-status">
              <span className="status-dot" />
              <span>
                Online · Powered by Gemini AI
                {activeSubject !== 'all' ? ` (${activeTabMeta.label} Specialist)` : ' (All STEM Subjects)'}
              </span>
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

        {/* ── Subject Selection Filter Tabs ── */}
        <div className="chat-subject-tabs" role="tablist" aria-label="Select subject specialization">
          {SUBJECT_TABS.map((tab) => {
            const isSelected = activeSubject === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isSelected}
                className={`subject-tab-pill ${isSelected ? 'active' : ''}`}
                onClick={() => setActiveSubject(tab.id)}
                id={`subject-tab-${tab.id}`}
              >
                <span className="tab-pill-icon">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Example Questions for Active Subject ── */}
      {messages.length === 0 && (
        <div className="example-questions">
          <div className="example-questions-label">
            Suggested for {activeTabMeta.label}:
          </div>
          <div className="example-chips" role="list">
            {currentQuestions.map((q, idx) => (
              <button
                key={idx}
                className="example-chip"
                onClick={() => handleExampleClick(q.text)}
                disabled={loading}
                role="listitem"
                id={`example-chip-${idx}`}
              >
                {q.icon}
                <span>{q.text}</span>
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
              <Bot size={34} color="var(--primary-light)" />
            </div>
            <h3>Ask EduVision AI Tutor Anything!</h3>
            <p>
              I provide instant, interactive explanations across <strong>Biology</strong>, <strong>Physics</strong>, <strong>Chemistry</strong>, <strong>Mathematics</strong>, and <strong>Computer Science</strong>.
            </p>
            <div className="chat-empty-subject-pills">
              {SUBJECT_TABS.filter(t => t.id !== 'all').map(t => (
                <span 
                  key={t.id} 
                  className={`empty-sub-pill ${activeSubject === t.id ? 'active' : ''}`}
                  onClick={() => setActiveSubject(t.id)}
                >
                  {t.icon} {t.label}
                </span>
              ))}
            </div>
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
            placeholder={
              activeSubject !== 'all' 
                ? `Ask a question about ${activeTabMeta.label}…`
                : 'Ask a question about any STEM subject…'
            }
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
        <p className="input-hint">
          Press Enter to send · Shift+Enter for new line · Specialized for {activeTabMeta.label}
        </p>
      </div>
    </div>
  );
}
