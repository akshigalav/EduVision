import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  Dna, 
  Heart, 
  Brain, 
  Leaf, 
  Clock, 
  Layers, 
  Box, 
  Sparkles, 
  HelpCircle, 
  Activity,
  Bot,
  Orbit,
  Zap,
  Sun,
  Droplet,
  Compass,
  Flame,
  Triangle,
  TrendingUp,
  GitBranch,
  Cpu,
  BarChart2
} from 'lucide-react';
import { TOPICS, SUBJECTS } from '../data/learningData';
import './Topics.css';

/**
 * Topics Page Component
 * Displays available interactive modules for a chosen subject with direct AI Tutor integration.
 */
export default function Topics() {
  const { subjectId = 'biology' } = useParams();

  // Find subject details
  const currentSubject = SUBJECTS.find(s => s.id === subjectId) || SUBJECTS[0];
  const topicsList = TOPICS[subjectId] || TOPICS.biology;

  // Render topic icon
  const renderTopicIcon = (iconName) => {
    switch (iconName) {
      case 'HeartPulse':
        return <Activity size={28} className="topic-icon-elem heart" />;
      case 'Brain':
        return <Brain size={28} className="topic-icon-elem brain" />;
      case 'Leaf':
        return <Leaf size={28} className="topic-icon-elem leaf" />;
      case 'Orbit':
        return <Orbit size={28} className="topic-icon-elem" style={{ color: '#818cf8' }} />;
      case 'Zap':
        return <Zap size={28} className="topic-icon-elem" style={{ color: '#f59e0b' }} />;
      case 'Sun':
        return <Sun size={28} className="topic-icon-elem" style={{ color: '#fbbf24' }} />;
      case 'Droplet':
        return <Droplet size={28} className="topic-icon-elem" style={{ color: '#38bdf8' }} />;
      case 'Compass':
        return <Compass size={28} className="topic-icon-elem" style={{ color: '#06b6d4' }} />;
      case 'Flame':
        return <Flame size={28} className="topic-icon-elem" style={{ color: '#f43f5e' }} />;
      case 'Triangle':
        return <Triangle size={28} className="topic-icon-elem" style={{ color: '#f59e0b' }} />;
      case 'TrendingUp':
        return <TrendingUp size={28} className="topic-icon-elem" style={{ color: '#10b981' }} />;
      case 'GitBranch':
        return <GitBranch size={28} className="topic-icon-elem" style={{ color: '#a855f7' }} />;
      case 'Cpu':
        return <Cpu size={28} className="topic-icon-elem" style={{ color: '#6366f1' }} />;
      case 'BarChart2':
        return <BarChart2 size={28} className="topic-icon-elem" style={{ color: '#3b82f6' }} />;
      default:
        return <Layers size={28} className="topic-icon-elem" />;
    }
  };

  return (
    <div className="topics-page">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <div className="topics-breadcrumb">
          <Link to="/subjects" className="back-link">
            <ArrowLeft size={16} />
            <span>Back to Subjects</span>
          </Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{currentSubject.name}</span>
        </div>

        {/* Header */}
        <div className="topics-header">
          <div className="topics-header-content">
            <div className="topics-subject-badge">
              <Sparkles size={16} />
              <span>Interactive {currentSubject.name} Laboratory</span>
            </div>

            <h1 className="topics-page-title">
              {currentSubject.name} <span className="gradient-text">Learning Modules</span>
            </h1>

            <p className="topics-page-desc">
              Select an educational topic below to inspect spatial concepts or start an interactive tutoring session with the EduBot AI Tutor.
            </p>
          </div>

          <div className="topics-header-action">
            <Link 
              to={`/chat?subject=${encodeURIComponent(currentSubject.name)}`}
              className="btn btn-secondary topics-ai-tutor-btn"
            >
              <Bot size={18} />
              <span>Ask {currentSubject.name} AI Tutor</span>
            </Link>
          </div>
        </div>

        {/* Topics Grid */}
        <div className="topics-grid">
          {topicsList.map((topic) => (
            <div key={topic.id} className="topic-item-card glass-card">
              <div className="topic-card-top">
                <div className="topic-icon-box">
                  {renderTopicIcon(topic.icon)}
                </div>

                <div className="topic-badges-group">
                  <span className="badge badge-primary">
                    <Box size={12} /> {topic.modelType}
                  </span>
                  <span className="badge badge-cyan">
                    <Clock size={12} /> {topic.estimatedTime}
                  </span>
                </div>
              </div>

              {['human-heart', 'human-brain', 'plant-cell'].includes(topic.id) && (
                <div className="topic-media-preview">
                  <img 
                    src={`/images/${topic.id}.jpg`} 
                    alt={topic.title} 
                    className="topic-preview-img" 
                    loading="lazy"
                  />
                  <span className="topic-preview-badge">
                    <Sparkles size={11} /> Realistic 3D Medical Render
                  </span>
                </div>
              )}

              <div className="topic-card-content">
                <span className="topic-category-tag">{topic.category}</span>
                <h3 className="topic-title">{topic.title}</h3>
                <p className="topic-tagline">{topic.tagline}</p>
                <p className="topic-description">{topic.description}</p>
              </div>

              <div className="topic-card-highlights">
                <span className="highlights-label">Key Core Concepts:</span>
                <div className="highlights-pills">
                  {topic.keyPoints.slice(0, 3).map((pt, idx) => (
                    <span key={idx} className="point-pill">{pt.title}</span>
                  ))}
                </div>
              </div>

              <div className="topic-card-bottom">
                <div className="topic-features-icons">
                  <span title="3D Model Ready">3D</span>
                  <span title="AR Compatible">AR</span>
                  <span title="AI Tutor Ready">AI</span>
                  <Link to={`/learn/${topic.id}?quiz=1`} className="topic-quiz-link-chip" title="Take 5-Question Quiz">
                    Quiz
                  </Link>
                </div>

                <div className="topic-action-buttons">
                  <Link 
                    to={`/chat?subject=${encodeURIComponent(currentSubject.name)}&q=${encodeURIComponent(topic.aiPromptSuggestion)}`}
                    className="btn btn-secondary topic-ai-chip-btn"
                    title={`Ask EduBot: ${topic.aiPromptSuggestion}`}
                  >
                    <Bot size={15} />
                    <span>Ask AI</span>
                  </Link>

                  <Link to={`/learn/${topic.id}`} className="btn btn-primary topic-launch-btn">
                    <span>Explore</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Phase Guidance Note */}
        <div className="topics-roadmap-note glass-card">
          <div className="roadmap-note-icon">
            <Bot size={24} style={{ color: 'var(--primary-light)' }} />
          </div>
          <div className="roadmap-note-content">
            <h4>Live AI Smart Tutor & Interactive Exploration</h4>
            <p>
              Click <strong>"Ask AI"</strong> on any topic above to launch EduBot AI tutor with instant question context, or select <strong>"Explore"</strong> to open the full learning view with interactive diagrams, details, and prompt suggestions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
