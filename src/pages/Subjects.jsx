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
  Search
} from 'lucide-react';
import { SUBJECTS } from '../data/learningData';
import './Subjects.css';

/**
 * Subjects Page Component
 * Allows students to select their field of study.
 * Biology is active with ready 3D topics; others showcase the upcoming academic modules.
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
              Select a subject to dive into interactive 3D spatial models, AR camera projections, and AI-assisted tutoring.
            </p>
          </div>

          {/* Search Bar */}
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
                  {isActive ? (
                    <>
                      <div className="subject-meta-info">
                        <span className="topic-count-highlight">{subject.topicsCount} Interactive Topics</span>
                        <span className="topic-status-text">Ready for 3D & AR</span>
                      </div>
                      <Link 
                        to={`/topics/${subject.id}`} 
                        className="btn btn-emerald subject-enter-btn"
                        style={{
                          backgroundColor: subject.accentColor,
                          color: '#ffffff'
                        }}
                      >
                        <span>Open Modules</span>
                        <ArrowRight size={16} />
                      </Link>
                    </>
                  ) : (
                    <>
                      <div className="subject-meta-info">
                        <span className="topic-count-muted">Curriculum in Development</span>
                        <span className="topic-status-text">Available in {subject.statusLabel}</span>
                      </div>
                      <div className="locked-btn-chip">
                        <Lock size={14} />
                        <span>Queued</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Informative Guidance Banner */}
        <div className="subjects-info-banner glass-card">
          <div className="banner-icon-box">
            <Sparkles size={24} className="banner-icon" />
          </div>
          <div className="banner-text">
            <h4 className="banner-title">Phase 1 Focus: Biological Sciences</h4>
            <p className="banner-desc">
              For Phase 1 of our B.Tech macro project, we have fully designed the <strong>Biology</strong> module featuring the Human Heart, Human Brain, and Plant Cell. Select Biology above to inspect the 3D learning lab!
            </p>
          </div>
          <Link to="/topics/biology" className="btn btn-primary banner-action-btn">
            Explore Biology Lab <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
