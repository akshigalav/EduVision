import React from 'react';
import { Link } from 'react-router-dom';
import { X, CheckCircle2, Box, Glasses, Bot, HelpCircle, ArrowRight } from 'lucide-react';
import './ActionModal.css';

/**
 * ActionModal Component
 * Provides interactive feedback for features:
 * "View 3D Model", "Try AR", "Ask AI", and "Take Quiz".
 */
export default function ActionModal({ isOpen, onClose, actionType, topicTitle }) {
  if (!isOpen) return null;

  // Content configuration based on actionType
  const getModalDetails = () => {
    switch (actionType) {
      case '3d':
        return {
          title: `3D Model Viewer: ${topicTitle}`,
          tag: '3D Visualization Lab',
          icon: <Box size={32} className="modal-icon-box" />,
          color: '#6366f1',
          overview: 'Interactive 3D model rendering powered by Three.js & WebGL.',
          steps: [
            'Load high-fidelity .gltf / .glb model of ' + topicTitle,
            'OrbitControls for 360° touch and mouse drag rotation',
            'Raycasting to inspect and dissect specific anatomical layers',
            'Smooth zoom and lighting customization'
          ],
          statusText: 'Active & Interactive: High-fidelity procedural 3D model with OrbitControls, X-ray wireframe, simulation speed, and layer dissection.'
        };
      case 'ar':
        return {
          title: `Augmented Reality (AR) Mode: ${topicTitle}`,
          tag: 'WebAR Integration',
          icon: <Glasses size={32} className="modal-icon-ar" />,
          color: '#06b6d4',
          overview: 'Web-based Augmented Reality projection using WebXR and MindAR camera tracking.',
          steps: [
            'Request browser camera permissions (Mobile / Desktop webcam)',
            'Surface plane detection or image target recognition',
            'Anchor interactive 3D model onto physical desktop surface',
            'Real-time scale, rotate, and walk-around inspection'
          ],
          statusText: 'Live WebAR camera tracking available in the Try AR module.'
        };
      case 'ai':
        return {
          title: `AI Smart Tutor: ${topicTitle}`,
          tag: 'EduBot AI Live',
          icon: <Bot size={32} className="modal-icon-ai" />,
          color: '#10b981',
          overview: 'Context-aware AI tutor tailored to answer specific queries about ' + topicTitle + '.',
          steps: [
            'Connected to Gemini AI API with custom educational system prompt',
            'Understands student question and references specific subject concepts',
            'Explains complex physiological, physical, and scientific processes simply',
            'Supports multi-turn chat, markdown, formulas, and follow-up doubts'
          ],
          statusText: 'Active & Online: Powered by Google Gemini on port 3001.'
        };
      case 'quiz':
        return {
          title: `Interactive Quiz: ${topicTitle}`,
          tag: 'Assessment Engine',
          icon: <HelpCircle size={32} className="modal-icon-quiz" />,
          color: '#f59e0b',
          overview: 'Dynamic conceptual challenge testing knowledge of ' + topicTitle + '.',
          steps: [
            'Multiple-choice questions generated from curriculum topics',
            'Real-time answer validation and instant explanations',
            'Performance analytics and learning mastery score',
            'Badge rewards saved to student progress dashboard'
          ],
          statusText: 'Interactive quiz state engine for testing knowledge.'
        };
      default:
        return {
          title: 'EduVision AR Feature',
          tag: 'Upcoming Phase',
          icon: <Box size={32} />,
          color: '#6366f1',
          overview: 'Feature preview for EduVision AR.',
          steps: [],
          statusText: 'Under step-by-step development.'
        };
    }
  };

  const details = getModalDetails();

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container glass-card" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-badge-wrapper">
            <span className="badge" style={{ backgroundColor: `${details.color}20`, color: details.color, borderColor: `${details.color}40` }}>
              {details.tag}
            </span>
          </div>

          <button className="modal-close-btn" onClick={onClose} title="Close window">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          <div className="modal-icon-header" style={{ color: details.color }}>
            {details.icon}
            <h3 className="modal-title">{details.title}</h3>
          </div>

          <p className="modal-overview">{details.overview}</p>

          <div className="modal-steps-box">
            <h4 className="modal-steps-heading">Feature Capabilities:</h4>
            <ul className="modal-steps-list">
              {details.steps.map((step, idx) => (
                <li key={idx} className="modal-step-item">
                  <CheckCircle2 size={16} style={{ color: details.color, flexShrink: 0 }} />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="modal-status-callout" style={{ borderColor: `${details.color}30` }}>
            <span className="callout-pill" style={{ backgroundColor: details.color }}>Status Note</span>
            <p className="callout-text">{details.statusText}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          {actionType === 'ai' && (
            <Link 
              to={`/chat?q=${encodeURIComponent(`Explain the core concepts of ${topicTitle}`)}`}
              className="btn btn-primary"
              onClick={onClose}
              style={{ backgroundColor: '#10b981', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <Bot size={16} />
              <span>Launch AI Smart Tutor</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
