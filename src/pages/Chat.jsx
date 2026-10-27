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
  Leaf,
  Key,
  Check,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import './Chat.css';

// ── Constants ────────────────────────────────────────────────────────────────

// Use relative URL so Vite proxy forwards /api to http://localhost:3001
const API_URL = '/api/chat';
const HEALTH_URL = '/api/health';

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

function getLocalCurriculumReply(query, subject) {
  const q = query.toLowerCase();
  if (q.includes('heart') || q.includes('cardiac') || q.includes('blood') || q.includes('valve')) {
    return `### The Human Heart: The Ultimate Biological Pump ❤️\n\nThe **human heart** is a muscular organ about the size of a fist that circulates blood throughout the body.\n\n#### 🫀 Key Anatomical Chambers:\n- **Right Atrium (RA)**: Collects oxygen-depleted blood from the superior & inferior vena cava.\n- **Right Ventricle (RV)**: Propels deoxygenated blood via the pulmonary artery into the lungs.\n- **Left Atrium (LA)**: Receives fresh oxygen-rich blood from the lungs via pulmonary veins.\n- **Left Ventricle (LV)**: The most muscular chamber, pumping oxygenated blood under high pressure through the **aorta** to your body.\n\n*Tip: Explore the **3D Heart Viewer** or **Try AR** right here in EduVision!*`;
  }
  if (q.includes('photosynthesis') || q.includes('plant')) {
    return `### What is Photosynthesis? 🌿\n\n**Photosynthesis** is how plants convert sunlight into chemical energy (glucose).\n\n#### 🔬 Chemical Formula:\n\`6CO₂ + 6H₂O + Sunlight ➔ C₆H₁₂O₆ + 6O₂\`\n\n- **Light Reactions**: Chlorophyll absorbs light and splits water molecules, producing ATP, NADPH, and oxygen.\n- **Calvin Cycle**: Fixes $CO_2$ into sugars inside the stroma.`;
  }
  if (q.includes('pythagor') || q.includes('triangle')) {
    return `### The Pythagorean Theorem 📐\n\nFor any right-angled triangle:\n\`a² + b² = c²\`\n\n- **a** and **b**: The two shorter sides forming the 90° right angle.\n- **c**: The **hypotenuse** (the longest side directly opposite the right angle).`;
  }
  if (q.includes('season') || q.includes('earth')) {
    return `### Why Does Earth Have Seasons? 🌍\n\nSeasons are caused by Earth's **23.5° axial tilt** as it revolves around the Sun over the course of a year. When a hemisphere leans toward the Sun, it experiences warmer summer days with direct rays; when it tilts away, it experiences winter.`;
  }
  if (q.includes('newton') || q.includes('motion')) {
    return `### Newton's Three Laws of Motion 🚀\n\n1. **First Law (Inertia)**: Objects remain at rest or constant velocity unless acted on by net force.\n2. **Second Law**: \`Force = Mass × Acceleration (F = ma)\`\n3. **Third Law**: For every action, there is an equal and opposite reaction.`;
  }
  const subLabel = subject && subject !== 'all' ? ` [${subject.toUpperCase()}]` : '';
  return `### Hello from EduBot! 🎓${subLabel}\n\nGreat question: **"${query}"**\n\nI can help break down topics across **Biology, Physics, Chemistry, Mathematics, and Computer Science**.\n\nTry asking me about:\n- **Human Heart & Circulation**\n- **Photosynthesis & Cellular Respiration**\n- **Pythagorean Theorem & Trigonometry**\n- **Newton's Laws of Motion & Induction**`;
}

/**
 * Minimal markdown renderer: bold, inline code, lists, paragraphs.
 */
function renderMarkdown(text) {
  const lines = text.split('\n');
  const elements = [];
  let key = 0;
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) { i++; continue; }

    if (/^[-*]\s/.test(line)) {
      const items = [];
      while (i < lines.length && /^[-*]\s/.test(lines[i])) {
        items.push(<li key={i}>{inlineMarkdown(lines[i].replace(/^[-*]\s/, ''))}</li>);
        i++;
      }
      elements.push(<ul key={key++}>{items}</ul>);
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(<li key={i}>{inlineMarkdown(lines[i].replace(/^\d+\.\s/, ''))}</li>);
        i++;
      }
      elements.push(<ol key={key++}>{items}</ol>);
      continue;
    }

    if (/^#{1,3}\s/.test(line)) {
      elements.push(<h3 key={key++}>{inlineMarkdown(line.replace(/^#{1,3}\s/, ''))}</h3>);
      i++;
      continue;
    }

    if (/^>\s/.test(line)) {
      elements.push(<blockquote key={key++}>{inlineMarkdown(line.replace(/^>\s/, ''))}</blockquote>);
      i++;
      continue;
    }

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

  // Server & key state
  const [serverStatus, setServerStatus] = useState('checking'); // 'checking' | 'live' | 'demo' | 'offline'
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [customKey, setCustomKey] = useState(() => localStorage.getItem('eduvision_gemini_key') || '');
  const [tempKeyInput, setTempKeyInput] = useState('');

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const initialQuerySentRef = useRef(false);

  // Check backend health
  const checkHealth = useCallback(async () => {
    setServerStatus('checking');
    try {
      const headers = {};
      const keyToUse = customKey || localStorage.getItem('eduvision_gemini_key');
      if (keyToUse) headers['x-gemini-key'] = keyToUse;

      const res = await fetch(HEALTH_URL, { headers });
      if (!res.ok) throw new Error('Health check failed');
      const data = await res.json();

      if (data.hasKey) {
        setServerStatus('live');
      } else {
        setServerStatus('demo');
      }
    } catch {
      setServerStatus('offline');
    }
  }, [customKey]);

  useEffect(() => {
    checkHealth();
  }, [checkHealth]);

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

    const userMsg = { role: 'user', content: trimmed, time: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setError(null);
    setLoading(true);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    const history = messages.map(m => ({ role: m.role, content: m.content }));
    const keyToUse = customKey || localStorage.getItem('eduvision_gemini_key');

    try {
      const headers = { 'Content-Type': 'application/json' };
      if (keyToUse) headers['x-gemini-key'] = keyToUse;

      const res = await fetch(API_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({ 
          message: trimmed, 
          history, 
          subject: currentSub !== 'all' ? currentSub : undefined 
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Server returned an error.');
      }

      const data = await res.json();
      const aiMsg = { role: 'assistant', content: data.reply, time: new Date() };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      // If backend is offline or fetch failed, gracefully answer from local curriculum knowledge
      const fallbackReply = getLocalCurriculumReply(trimmed, currentSub);
      const isConnectionIssue = err.message.includes('Failed to fetch') || err.message.includes('NetworkError');

      const aiMsg = {
        role: 'assistant',
        content: `${fallbackReply}\n\n*(Offline Mode: Answering from local educational curriculum)*`,
        time: new Date(),
      };
      setMessages(prev => [...prev, aiMsg]);

      if (isConnectionIssue) {
        setError('Backend is offline. Running in zero-setup Local Curriculum Mode.');
      }
    } finally {
      setLoading(false);
    }
  }, [activeSubject, customKey, loading, messages]);

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

  const saveCustomKey = () => {
    const clean = tempKeyInput.trim();
    if (clean) {
      localStorage.setItem('eduvision_gemini_key', clean);
      setCustomKey(clean);
    } else {
      localStorage.removeItem('eduvision_gemini_key');
      setCustomKey('');
    }
    setShowKeyModal(false);
    setTimeout(checkHealth, 300);
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
            <div className={`chat-status ${serverStatus}`}>
              <span className={`status-dot ${serverStatus}`} />
              <span>
                {serverStatus === 'checking' && 'Connecting…'}
                {serverStatus === 'live' && `Online · Powered by Gemini 2.5 (${activeTabMeta.label} Specialist)`}
                {serverStatus === 'demo' && `Curriculum Demo Mode (${activeTabMeta.label})`}
                {serverStatus === 'offline' && 'Local Mode (Backend Offline)'}
              </span>
            </div>
          </div>
          <div className="chat-header-actions">
            <button
              className={`icon-btn key-btn ${customKey ? 'active' : ''}`}
              onClick={() => {
                setTempKeyInput(customKey);
                setShowKeyModal(true);
              }}
              title="Configure Gemini API Key"
              aria-label="Configure API Key"
              id="config-key-btn"
            >
              <Key size={16} />
              <span className="key-btn-label">{customKey ? 'Key Set' : 'Add Key'}</span>
            </button>

            <button
              className="icon-btn"
              onClick={checkHealth}
              title="Refresh connection status"
              aria-label="Refresh status"
            >
              <RefreshCw size={15} />
            </button>

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

      {/* ── API Key Configuration Modal ── */}
      {showKeyModal && (
        <div className="key-modal-overlay" onClick={() => setShowKeyModal(false)}>
          <div className="key-modal" onClick={e => e.stopPropagation()}>
            <div className="key-modal-header">
              <h3>Configure Gemini API Key</h3>
              <button className="icon-btn close-modal-btn" onClick={() => setShowKeyModal(false)}>
                <X size={16} />
              </button>
            </div>
            <p className="key-modal-desc">
              You can set your Gemini API key in <code>server/.env</code> or enter it below to use it directly in your browser session.
            </p>
            <div className="key-input-wrapper">
              <input
                type="password"
                className="key-input"
                placeholder="AIzaSy..."
                value={tempKeyInput}
                onChange={e => setTempKeyInput(e.target.value)}
              />
            </div>
            <div className="key-modal-actions">
              {customKey && (
                <button
                  className="btn-secondary"
                  onClick={() => {
                    setTempKeyInput('');
                    localStorage.removeItem('eduvision_gemini_key');
                    setCustomKey('');
                    setShowKeyModal(false);
                    setTimeout(checkHealth, 300);
                  }}
                >
                  Clear Key
                </button>
              )}
              <button className="btn-primary" onClick={saveCustomKey}>
                <Check size={16} />
                Save Key
              </button>
            </div>
          </div>
        </div>
      )}

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

      {/* ── Notice / Error Banner ── */}
      {error && (
        <div className="chat-error-banner" role="alert" id="chat-error">
          <AlertCircle size={16} />
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
