import React from 'react';
import { X, CheckCircle2, Box, Glasses, Bot, HelpCircle, ArrowRight } from 'lucide-react';
import './ActionModal.css';

/**
 * ActionModal Component
 * Provides interactive feedback for Phase 1 buttons:
 * "View 3D Model", "Try AR", "Ask AI", and "Take Quiz".
 * Shows evaluators and professors the exact Phase 2/3 technical roadmap.
 */
export default function ActionModal({ isOpen, onClose, actionType, topicTitle }) {
  if (!isOpen) return null;

  // Content configuration based on actionType
  const getModalDetails = () => {
    switch (actionType) {
      case '3d':
        return {
          title: `3D Model Viewer: ${topicTitle}`,
          tag: 'Phase 2: 3D Visualization',
          icon: <Box size={32} className="modal-icon-box" />,
          color: '#6366f1',
          overview: 'Interactive 3D model rendering powered by Three.js & WebGL.',
          steps: [
            'Load high-fidelity .gltf / .glb model of ' + topicTitle,
            'OrbitControls for 360° touch and mouse drag rotation',
            'Raycasting to inspect and dissect specific anatomical layers',
            'Smooth zoom and lighting customization'
          ],
          statusText: 'Scheduled for Phase 2 implementation using Three.js and @react-three/fiber.'
        };
      case 'ar':
        return {
          title: `Augmented Reality (AR) Mode: ${topicTitle}`,
          tag: 'Phase 2: AR Integration',
          icon: <Glasses size={32} className="modal-icon-ar" />,
          color: '#06b6d4',
          overview: 'Web-based Augmented Reality projection using WebXR Device API and AR.js.',
          steps: [
            'Request browser camera permissions (Mobile / Desktop webcam)',
            'Surface plane detection or Hiro marker recognition',
            'Anchor interactive 3D model onto physical desktop surface',
            'Real-time scale, rotate, and walk-around inspection'
          ],
          statusText: 'Scheduled for Phase 2 WebXR / Model-Viewer camera integration.'
        };
      case 'ai':
        return {
          title: `AI Learning Assistant: ${topicTitle}`,
          tag: 'Phase 3: AI Smart Tutor',
          icon: <Bot size={32} className="modal-icon-ai" />,
          color: '#10b981',
          overview: 'Context-aware AI tutor tailored to answer specific queries about ' + topicTitle + '.',
          steps: [
            'Connected to Gemini AI API with custom educational system prompt',
            'Understands student question and references specific 3D model parts',
            'Explains complex physiological and scientific processes simply',
            'Supports voice input and conversational follow-ups'
          ],
          statusText: 'Scheduled for Phase 3 using Gemini AI SDK integration.'
        };
      case 'quiz':
        return {
          title: `Interactive Quiz: ${topicTitle}`,
          tag: 'Phase 3: Assessment Engine',
          icon: <HelpCircle size={32} className="modal-icon-quiz" />,
          color: '#f59e0b',
          overview: 'Dynamic 5-question conceptual challenge testing knowledge of ' + topicTitle + '.',
          steps: [
            'Multiple-choice questions generated from curriculum topics',
            'Real-time answer validation and instant explanations',
            'Performance analytics and learning mastery score',
            'Badge rewards saved to student progress dashboard'
          ],
          statusText: 'Scheduled for Phase 3 interactive quiz state engine.'
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
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
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
            <h4 className="modal-steps-heading">How This Feature Will Work:</h4>
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
            <span className="callout-pill" style={{ backgroundColor: details.color }}>Roadmap Note</span>
            <p className="callout-text">{details.statusText}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}
