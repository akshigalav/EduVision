import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Dna, 
  Atom, 
  FlaskConical, 
  Sigma, 
  Cpu, 
  ArrowRight, 
  BookOpen, 
  Sparkles,
  Lock,
  Layers,
  Search,
  Bot
} from 'lucide-react';
import { SUBJECTS } from '../data/learningData';
import './Subjects.css';

/**
 * Subjects Page Component
 * Allows students to select their field of study.
 * All STEM subjects are connected with 3D/interactive modules and AI Smart Tutoring.
 */
export default function Subjects() {
  const [searchQuery, setSearchQuery] = useState('');

  // Icon mapping helper
  const renderSubjectIcon = (iconName, color) => {
    switch (iconName) {
      case 'Dna':
        return <Dna size={32} style={{ color }} />;
      case 'Atom':
        return <Atom size={32} style={{ color }} />;
      case 'FlaskConical':
        return <FlaskConical size={32} style={{ color }} />;
      case 'Sigma':
        return <Sigma size={32} style={{ color }} />;
      case 'Cpu':
        return <Cpu size={32} style={{ color }} />;
      default:
        return <Layers size={32} style={{ color }} />;
    }
  };

  // Filter subjects based on search query
  const filteredSubjects = SUBJECTS.filter(subject => 
    subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    subject.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="subjects-page">
      <div className="container">
        {/* Page Header */}
        <div className="subjects-header">
          <div className="subjects-header-content">
            <span className="badge badge-primary">Curriculum Catalog</span>
            <h1 className="subjects-title">
              Explore Academic <span className="gradient-text">STEM Disciplines</span>
            </h1>
            <p className="subjects-subtitle">
              Select any subject to dive into interactive 3D spatial models, AR camera projections, and AI-assisted tutoring powered by Gemini.
            </p>
          </div>

          {/* Search Bar & Quick AI link */}
          <div className="subjects-header-actions">
            <div className="search-bar-wrapper">
              <Search size={18} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search subjects or concepts..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            <Link to="/chat" className="btn btn-secondary ask-ai-header-btn">
              <Bot size={16} />
              <span>Ask EduVision AI</span>
            </Link>
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="subjects-grid">
          {filteredSubjects.map((subject) => {
            const isActive = subject.status === 'active';

            return (
              <div 
                key={subject.id} 
                className={`subject-card glass-card ${isActive ? 'active-module' : 'upcoming-module'}`}
                style={{
                  background: subject.gradient
                }}
              >
                <div className="subject-card-top">
                  <div 
                    className="subject-icon-box"
                    style={{ 
                      backgroundColor: `${subject.accentColor}18`,
                      borderColor: `${subject.accentColor}35` 
                    }}
                  >
                    {renderSubjectIcon(subject.iconName, subject.accentColor)}
                  </div>

                  <span className={`badge ${subject.badgeVariant}`}>
                    {subject.statusLabel}
                  </span>
                </div>

                <div className="subject-card-body">
                  <h3 className="subject-name">{subject.name}</h3>
                  <p className="subject-desc">{subject.description}</p>
                </div>

                <div className="subject-card-footer">
                  <div className="subject-meta-info">
                    <span className="topic-count-highlight">{subject.topicsCount} Interactive Topics</span>
                    <span className="topic-status-text">AI Tutor & 3D Ready</span>
                  </div>

                  <div className="subject-btn-group">
                    <Link 
                      to={`/chat?subject=${encodeURIComponent(subject.name)}`}
                      className="btn btn-secondary subject-ai-btn"
                      title={`Ask EduBot AI Tutor about ${subject.name}`}
                    >
                      <Bot size={15} />
                      <span>Ask AI</span>
                    </Link>

                    <Link 
                      to={`/topics/${subject.id}`} 
                      className="btn btn-emerald subject-enter-btn"
                      style={{
                        backgroundColor: subject.accentColor,
                        color: '#ffffff'
                      }}
                    >
                      <span>Explore</span>
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Informative Guidance Banner */}
        <div className="subjects-info-banner glass-card">
          <div className="banner-icon-box">
            <Bot size={28} className="banner-icon" />
          </div>
          <div className="banner-text">
            <h4 className="banner-title">EduBot AI Smart Tutor Online For All Subjects</h4>
            <p className="banner-desc">
              Have doubts or need a concept explained step-by-step? Ask the <strong>EduVision AI Tutor</strong> about Biology, Physics, Chemistry, Mathematics, or Computer Science anytime!
            </p>
          </div>
          <Link to="/chat" className="btn btn-primary banner-action-btn">
            <Bot size={18} />
            <span>Launch AI Smart Tutor</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
