import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Box, 
  Glasses, 
  Bot, 
  HelpCircle, 
  RotateCw, 
  Maximize2, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  Compass, 
  Eye, 
  Info,
  Smartphone,
  Cpu,
  Heart,
  Activity,
  ArrowRight,
  ShieldAlert,
  Flame,
  Zap,
  Target
} from 'lucide-react';
import { TOPICS } from '../data/learningData';
import ActionModal from '../components/ActionModal';
import GeneralOrganViewer from '../components/GeneralOrganViewer';
import { MODEL_COMPONENTS_DATA } from '../data/modelComponentsData';
import './Learning.css';

/**
 * Learning Page Component
 * The central spatial exploration interface for EduVision AR.
 * Features an interactive 3D WebGL Three.js spatial laboratory for ALL 15 curriculum models
 * across Biology, Physics, Chemistry, Mathematics, and Computer Science,
 * including component inspection, 3D hot-spot targeting, and direct AI Smart Tutor integration.
 */
export default function Learning() {
  const { topicId = 'human-heart' } = useParams();
  const navigate = useNavigate();

  // Find the selected topic across all curriculum subjects
  const allTopics = Object.values(TOPICS).flat();
  const currentTopic = allTopics.find(t => t.id === topicId) || allTopics[0];
  const parentSubjectId = Object.keys(TOPICS).find(k => TOPICS[k].some(t => t.id === currentTopic.id)) || "biology";

  // Topic 3D Component Breakdown & Telemetry
  const topicComponentsData = MODEL_COMPONENTS_DATA[currentTopic.id] || MODEL_COMPONENTS_DATA['human-heart'];
  const componentsList = topicComponentsData?.components || [];

  // State for interactive modals
  const [modalOpen, setModalOpen] = useState(false);
  const [activeAction, setActiveAction] = useState('3d');

  // Active component selection for 3D model inspection
  const [activeComponent, setActiveComponent] = useState(null);

  const handleAskAI = (prompt) => {
    const q = prompt || currentTopic.aiPromptSuggestion || `Explain the core concepts of ${currentTopic.title}`;
    navigate(`/chat?q=${encodeURIComponent(q)}&subject=${encodeURIComponent(parentSubjectId)}`);
  };

  const handleActionClick = (actionType) => {
    if (actionType === "ai") { handleAskAI(); return; }
    setActiveAction(actionType);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const selectedComponentData = componentsList.find(c => c.id === activeComponent);

  return (
    <div className="learning-page">
      <div className="container">
        {/* Navigation Breadcrumb */}
        <div className="learning-breadcrumb">
          <Link to={`/topics/${parentSubjectId}`} className="back-link">
            <ArrowLeft size={16} />
            <span>Back to {parentSubjectId.charAt(0).toUpperCase() + parentSubjectId.slice(1)} Topics</span>
          </Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{currentTopic.title}</span>
        </div>

        {/* Learning Top Banner */}
        <div className="learning-header">
          <div className="header-meta-group">
            <span className="badge badge-primary">{currentTopic.category}</span>
            <span className="badge badge-cyan">{currentTopic.modelType}</span>
            <span className="badge badge-emerald">
              Interactive 3D Spatial Lab
            </span>
          </div>

          <h1 className="learning-topic-title">{currentTopic.title}</h1>
          <p className="learning-topic-tagline">{currentTopic.tagline}</p>
        </div>

        {/* Main Grid: 3D Viewport on Left, Details & Actions on Right */}
        <div className="learning-workspace-grid">
          {/* =========================================================================
              3D MODEL VIEWPORT (Three.js Spatial Lab for ALL Models)
              ========================================================================= */}
          <div className="viewport-container glass-card">
            {/* Viewport Top Controls Bar */}
            <div className="viewport-top-bar">
              <div className="viewport-mode-indicator">
                <span className="pulse-dot"></span>
                <span className="indicator-text">
                  WebGL 3D Interactive Spatial Lab
                </span>
              </div>

              <div className="viewport-tools">
                {activeComponent && (
                  <button 
                    className="tool-btn" 
                    onClick={() => setActiveComponent(null)}
                    title="View Entire System"
                  >
                    <Target size={15} />
                    <span>Whole System</span>
                  </button>
                )}
                <button 
                  className="tool-btn" 
                  onClick={() => handleActionClick('3d')}
                  title="Lab Info & Capabilities"
                >
                  <Maximize2 size={15} />
                  <span>Lab Specs</span>
                </button>
              </div>
            </div>

            {/* Viewport Canvas (Universal 3D Model Viewer) */}
            <GeneralOrganViewer 
              topicId={currentTopic.id} 
              title={currentTopic.title}
              activeComponent={activeComponent}
              onSelectComponent={setActiveComponent}
            />

            {/* Viewport Action Toolbar */}
            <div className="viewport-action-bar">
              <button 
                className="action-btn btn-view-3d" 
                onClick={() => {
                  setActiveComponent(null);
                  handleActionClick('3d');
                }}
                title="View 3D Visualization Lab details"
              >
                <Box size={18} />
                <span>3D Lab Specs</span>
              </button>

              <button 
                className="action-btn btn-try-ar" 
                onClick={() => navigate(`/ar/${currentTopic.id}`)}
                title="Launch Augmented Reality camera to track target image"
              >
                <Glasses size={18} />
                <span>Try AR</span>
              </button>

              <button 
                className="action-btn btn-ask-ai" 
                onClick={() => handleAskAI(currentTopic.aiPromptSuggestion)}
                title="Ask AI questions about this topic"
              >
                <Bot size={18} />
                <span>Ask AI Tutor</span>
              </button>

              <button 
                className="action-btn btn-take-quiz" 
                onClick={() => handleActionClick('quiz')}
                title="Test your understanding with a quiz"
              >
                <HelpCircle size={18} />
                <span>Take Quiz</span>
              </button>
            </div>
          </div>

          {/* =========================================================================
              TOPIC DETAILS & LEARNING CONCEPTS
              ========================================================================= */}
          <div className="details-panel glass-card">
            <div className="details-header">
              <h3 className="details-heading">Topic Overview</h3>
              <span className="time-estimate">{currentTopic.estimatedTime} session</span>
            </div>

            <p className="topic-full-description">
              {currentTopic.description}
            </p>

            <div className="topic-additional-context">
              <Info size={18} className="info-icon" />
              <p>{currentTopic.overview}</p>
            </div>

            <div className="key-points-section">
              <h4 className="key-points-title">Core Conceptual Pillars:</h4>
              <div className="key-points-list">
                {currentTopic.keyPoints.map((point, index) => (
                  <div key={index} className="key-point-card">
                    <div className="point-indicator">
                      <CheckCircle2 size={16} className="point-check-icon" />
                    </div>
                    <div className="point-body">
                      <h5 className="point-title">{point.title}</h5>
                      <p className="point-desc">{point.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Smart AI Prompt Suggestion Box */}
            <div className="ai-prompt-preview-box">
              <div className="ai-box-header">
                <Sparkles size={16} className="ai-box-icon" />
                <span>Suggested AI Inquiry:</span>
              </div>
              <p className="ai-prompt-text">"{currentTopic.aiPromptSuggestion}"</p>
              <button 
                className="btn btn-secondary ai-ask-quick-btn"
                onClick={() => handleActionClick('ai')}
              >
                <Bot size={14} />
                <span>Ask EduVision AI</span>
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            COMPONENT & ARCHITECTURAL ANALYSIS SECTION (FOR ALL 15 TOPICS)
            ========================================================================= */}
        {componentsList.length > 0 && (
          <div className="chambers-section-container">
            <div className="chambers-section-header">
              <div className="section-title-wrap">
                <Activity size={24} className="chambers-header-icon" />
                <div>
                  <h2 className="chambers-section-title">
                    {topicComponentsData.title} • Structural Components & Layer Dissection
                  </h2>
                  <p className="chambers-section-sub">
                    Click any component card or 3D viewport pin to isolate its geometry, zoom the 3D camera, and inspect scientific specifications.
                  </p>
                </div>
              </div>
              {activeComponent && (
                <button 
                  className="btn btn-secondary reset-inspect-btn" 
                  onClick={() => setActiveComponent(null)}
                >
                  <RotateCw size={14} />
                  <span>Show Whole Model</span>
                </button>
              )}
            </div>

            {/* Focused Component Spotlight Card (When Selected) */}
            {selectedComponentData && (
              <div className="focused-chamber-card glass-card">
                <div className="focused-card-top">
                  <div className="focused-title-group">
                    <span 
                      className="focused-chamber-dot"
                      style={{ backgroundColor: selectedComponentData.color }}
                    />
                    <h3 className="focused-chamber-name">{selectedComponentData.name}</h3>
                    <span className="chamber-badge badge-ox" style={{ backgroundColor: `${selectedComponentData.color}25`, color: selectedComponentData.color, borderColor: `${selectedComponentData.color}40` }}>
                      {selectedComponentData.tag}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="chamber-camera-status">3D Camera Locked On Target</span>
                    <button 
                      className="btn btn-secondary"
                      style={{ padding: '4px 10px', fontSize: '0.75rem', gap: '4px', display: 'flex', alignItems: 'center' }}
                      onClick={() => handleAskAI(`Explain the function and significance of ${selectedComponentData.name} in ${currentTopic.title}`)}
                    >
                      <Bot size={14} />
                      <span>Ask AI Tutor</span>
                    </button>
                  </div>
                </div>

                <p className="focused-chamber-desc">{selectedComponentData.summary}</p>

                {selectedComponentData.specs && (
                  <div className="focused-specs-grid">
                    {Object.entries(selectedComponentData.specs).map(([key, val], idx) => (
                      <div key={idx} className="spec-box">
                        <span className="spec-label">{key}</span>
                        <span className="spec-value">{val}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Component Cards Grid */}
            <div className="chambers-cards-grid">
              {componentsList.map(comp => {
                const isSelected = activeComponent === comp.id;
                return (
                  <div 
                    key={comp.id}
                    className={`chamber-info-card glass-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => setActiveComponent(isSelected ? null : comp.id)}
                  >
                    <div className="card-chamber-header">
                      <div className="chamber-name-row">
                        <span 
                          className="chamber-indicator-circle"
                          style={{ backgroundColor: comp.color }}
                        />
                        <h4 className="chamber-card-title">{comp.name}</h4>
                      </div>
                      <span 
                        className="card-type-tag tag-ox"
                        style={{ backgroundColor: `${comp.color}20`, color: comp.color }}
                      >
                        {comp.category}
                      </span>
                    </div>

                    <p className="chamber-card-summary">{comp.summary}</p>

                    <div className="chamber-card-footer">
                      <div className="chamber-vessels-tag">
                        <span className="vessel-label">Layer:</span>
                        <span className="vessel-name">{comp.tag}</span>
                      </div>
                      <span className="inspect-3d-hint">
                        {isSelected ? 'Inspecting' : 'Click to Focus 3D'}
                        <ArrowRight size={13} />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Interactive Modal for Action Buttons */}
      <ActionModal 
        isOpen={modalOpen} 
        onClose={closeModal} 
        actionType={activeAction} 
        topicTitle={currentTopic.title} 
      />
    </div>
  );
}
