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
  Activity
} from 'lucide-react';
import { TOPICS, SUBJECTS } from '../data/learningData';
import './Topics.css';

/**
 * Topics Page Component
 * Displays available interactive modules for a chosen subject (Biology focus for Phase 1).
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
      default:
        return <Dna size={28} className="topic-icon-elem" />;
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
          <div className="topics-subject-badge">
            <Dna size={16} />
            <span>Interactive Laboratory</span>
          </div>

          <h1 className="topics-page-title">
            {currentSubject.name} <span className="gradient-text">3D Learning Modules</span>
          </h1>

          <p className="topics-page-desc">
            Select an anatomical or cellular structure below to launch the spatial viewer, inspect cross-sections, and test your knowledge.
          </p>
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

              <div className="topic-card-content">
                <span className="topic-category-tag">{topic.category}</span>
                <h3 className="topic-title">{topic.title}</h3>
                <p className="topic-tagline">{topic.tagline}</p>
                <p className="topic-description">{topic.description}</p>
              </div>

              <div className="topic-card-highlights">
                <span className="highlights-label">Key Anatomical Focus:</span>
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
                  <span title="5-Question Quiz">Quiz</span>
                </div>

                <Link to={`/learn/${topic.id}`} className="btn btn-primary topic-launch-btn">
                  <span>Enter 3D Lab</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Phase 1 Explanatory Note */}
        <div className="topics-roadmap-note glass-card">
          <div className="roadmap-note-icon">
            <Sparkles size={20} />
          </div>
          <div className="roadmap-note-content">
            <h4>B.Tech Macro Project Evaluation Guide</h4>
            <p>
              These 3 biology modules demonstrate our complete frontend user journey. In Phase 2, the 3D model viewport will load live WebGL GLTF files with touch rotation and WebXR AR camera pass-through.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
