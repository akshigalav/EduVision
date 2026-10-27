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
  Flame
} from 'lucide-react';
import { TOPICS } from '../data/learningData';
import ActionModal from '../components/ActionModal';
import HeartModelViewer from '../components/HeartModelViewer';
import { CHAMBER_DATA } from '../data/heartData';
import './Learning.css';

/**
 * Learning Page Component
 * The central spatial exploration interface.
 * Phase 2 includes an interactive 3D WebGL Three.js Human Heart model viewer,
 * camera controls (rotate, zoom, reset), and 4 anatomical chamber information panels.
 */
export default function Learning() {
  const { topicId = 'human-heart' } = useParams();
  const navigate = useNavigate();

  // Find the selected topic across biology modules
  const allTopics = Object.values(TOPICS).flat();
  const currentTopic = allTopics.find(t => t.id === topicId) || allTopics[0];
  const parentSubjectId = Object.keys(TOPICS).find(k => TOPICS[k].some(t => t.id === currentTopic.id)) || "biology";

  // State for interactive modals
  const [modalOpen, setModalOpen] = useState(false);
  const [activeAction, setActiveAction] = useState('3d');

  // Active chamber selection for 3D model inspection
  const [activeChamber, setActiveChamber] = useState(null);

  // Simulated rotation angle for topics without active 3D models yet
  const [rotationAngle, setRotationAngle] = useState(45);

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

  const handleRotatePreview = () => {
    setRotationAngle(prev => (prev + 45) % 360);
  };

  const selectedChamberData = CHAMBER_DATA.find(c => c.id === activeChamber);

  return (
    <div className="learning-page">
      <div className="container">
        {/* Navigation Breadcrumb */}
        <div className="learning-breadcrumb">
          <Link to={`/topics/${parentSubjectId}`} className="back-link">
            <ArrowLeft size={16} />
            <span>Back to Topics</span>
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
              {currentTopic.id === 'human-heart' ? 'Phase 2: Live 3D Model' : 'Phase 1 Web Lab'}
            </span>
          </div>

          <h1 className="learning-topic-title">{currentTopic.title}</h1>
          <p className="learning-topic-tagline">{currentTopic.tagline}</p>
        </div>

        {/* Main Grid: 3D Viewport on Left, Details & Actions on Right */}
        <div className="learning-workspace-grid">
          {/* =========================================================================
              3D MODEL VIEWPORT (Three.js on Human Heart)
              ========================================================================= */}
          <div className="viewport-container glass-card">
            {/* Viewport Top Controls Bar */}
            <div className="viewport-top-bar">
              <div className="viewport-mode-indicator">
                <span className="pulse-dot"></span>
                <span className="indicator-text">
                  {currentTopic.id === 'human-heart' ? 'Three.js 3D WebGL Model Viewer' : '3D Spatial Canvas'}
                </span>
              </div>

              <div className="viewport-tools">
                {currentTopic.id === 'human-heart' ? (
                  <button 
                    className="tool-btn" 
                    onClick={() => setActiveChamber(null)}
                    title="View Whole Heart"
                  >
                    <Heart size={15} />
                    <span>Whole Organ</span>
                  </button>
                ) : (
                  <button 
                    className="tool-btn" 
                    onClick={handleRotatePreview} 
                    title="Simulate 3D Rotation"
                  >
                    <RotateCw size={15} />
                    <span>Rotate</span>
                  </button>
                )}
                <button 
                  className="tool-btn" 
                  onClick={() => handleActionClick('3d')}
                  title="Model Details & Info"
                >
                  <Maximize2 size={15} />
                  <span>Inspect</span>
                </button>
              </div>
            </div>

            {/* Viewport Canvas or Live Three.js Viewer */}
            {currentTopic.id === 'human-heart' ? (
              <HeartModelViewer 
                activeChamber={activeChamber} 
                onSelectChamber={setActiveChamber} 
              />
            ) : (
              <div className="viewport-canvas">
                <div className="canvas-grid-lines"></div>

                {/* Simulated 3D Model Visualization */}
                <div 
                  className="model-simulation-stage"
                  style={{ transform: `rotateY(${rotationAngle}deg)` }}
                >
                  <div className="wireframe-ring ring-outer"></div>
                  <div className="wireframe-ring ring-inner"></div>
                  
                  <div className="model-center-orb">
                    <Box size={56} className="orb-icon" />
                    <span className="model-orb-label">{currentTopic.title}</span>
                    <span className="model-orb-sub">Ready for Three.js GLTF</span>
                  </div>

                  <div className="anchor-point point-top" title="Anterior View"></div>
                  <div className="anchor-point point-right" title="Lateral View"></div>
                  <div className="anchor-point point-bottom" title="Cross Section"></div>
                </div>

                <div className="viewport-overlay-bottom">
                  <div className="viewport-fps-chip">
                    <span>60 FPS Target</span>
                  </div>
                  <div className="viewport-instructions">
                    <span>OrbitControls: Left-click drag to rotate • Scroll to zoom</span>
                  </div>
                </div>
              </div>
            )}

            {/* Viewport Action Toolbar (The 4 Requested Buttons) */}
            <div className="viewport-action-bar">
              <button 
                className="action-btn btn-view-3d" 
                onClick={() => {
                  if (currentTopic.id === 'human-heart') {
                    setActiveChamber(null);
                  } else {
                    handleActionClick('3d');
                  }
                }}
                title="View full interactive 3D model"
              >
                <Box size={18} />
                <span>View 3D Model</span>
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
                <span>Ask AI</span>
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
              <span className="time-estimate">{currentTopic.estimatedTime} reading</span>
            </div>

            <p className="topic-full-description">
              {currentTopic.description}
            </p>

            <div className="topic-additional-context">
              <Info size={18} className="info-icon" />
              <p>{currentTopic.overview}</p>
            </div>

            <div className="key-points-section">
              <h4 className="key-points-title">Core Anatomical & Functional Concepts:</h4>
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
                <span>Suggested AI Question:</span>
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
            PHASE 2: 4 CARDIAC CHAMBERS INTERACTIVE PANELS (Human Heart)
            ========================================================================= */}
        {currentTopic.id === 'human-heart' && (
          <div className="chambers-section-container">
            <div className="chambers-section-header">
              <div className="section-title-wrap">
                <Activity size={24} className="chambers-header-icon" />
                <div>
                  <h2 className="chambers-section-title">Cardiac Chambers & Blood Pathway Analysis</h2>
                  <p className="chambers-section-sub">
                    Click any chamber card or 3D pin to zoom, isolate, and inspect its internal circulatory mechanics.
                  </p>
                </div>
              </div>
              {activeChamber && (
                <button 
                  className="btn btn-secondary reset-inspect-btn" 
                  onClick={() => setActiveChamber(null)}
                >
                  <RotateCw size={14} />
                  <span>Show All Chambers</span>
                </button>
              )}
            </div>

            {/* Focused Chamber Spotlight Detail Card (When Selected) */}
            {selectedChamberData && (
              <div className="focused-chamber-card glass-card">
                <div className="focused-card-top">
                  <div className="focused-title-group">
                    <span 
                      className="focused-chamber-dot"
                      style={{ backgroundColor: selectedChamberData.color }}
                    />
                    <h3 className="focused-chamber-name">{selectedChamberData.name}</h3>
                    <span className={`chamber-badge ${selectedChamberData.oxygenated ? 'badge-ox' : 'badge-deox'}`}>
                      {selectedChamberData.oxygenated ? 'Oxygenated (O2-Rich)' : 'Deoxygenated (CO2-Rich)'}
                    </span>
                  </div>
                  <span className="chamber-camera-status">3D Camera Locked On Target</span>
                </div>

                <p className="focused-chamber-desc">{selectedChamberData.summary}</p>

                <div className="focused-specs-grid">
                  <div className="spec-box">
                    <span className="spec-label">Connected Vessels</span>
                    <span className="spec-value">{selectedChamberData.vessels}</span>
                  </div>
                  <div className="spec-box">
                    <span className="spec-label">Regulating Valve</span>
                    <span className="spec-value">{selectedChamberData.valve}</span>
                  </div>
                  <div className="spec-box">
                    <span className="spec-label">Circulatory Circuit</span>
                    <span className="spec-value">
                      {selectedChamberData.oxygenated ? 'Systemic Circulation' : 'Pulmonary Circulation'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 4 Chamber Information Cards Grid */}
            <div className="chambers-cards-grid">
              {CHAMBER_DATA.map(chamber => {
                const isSelected = activeChamber === chamber.id;
                return (
                  <div 
                    key={chamber.id}
                    className={`chamber-info-card glass-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => setActiveChamber(isSelected ? null : chamber.id)}
                  >
                    <div className="card-chamber-header">
                      <div className="chamber-name-row">
                        <span 
                          className="chamber-indicator-circle"
                          style={{ backgroundColor: chamber.color }}
                        />
                        <h4 className="chamber-card-title">{chamber.name}</h4>
                      </div>
                      <span className={`card-type-tag ${chamber.oxygenated ? 'tag-ox' : 'tag-deox'}`}>
                        {chamber.oxygenated ? 'O2 Rich' : 'CO2 Rich'}
                      </span>
                    </div>

                    <p className="chamber-card-summary">{chamber.summary}</p>

                    <div className="chamber-card-footer">
                      <div className="chamber-vessels-tag">
                        <span className="vessel-label">Vessels:</span>
                        <span className="vessel-name">{chamber.vessels}</span>
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
