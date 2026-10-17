import React from 'react';
import { Box, Glasses, Bot, HelpCircle, ArrowRight } from 'lucide-react';
import './FeatureCard.css';

/**
 * FeatureCard Component
 * Reusable card to showcase the core pillars: 3D Learning, AR, AI, and Quiz.
 */
export default function FeatureCard({ title, description, badge, iconName, accentColor }) {
  // Map string icon names to Lucide icons
  const renderIcon = () => {
    switch (iconName) {
      case 'Box':
        return <Box size={28} style={{ color: accentColor }} />;
      case 'Glasses':
        return <Glasses size={28} style={{ color: accentColor }} />;
      case 'Bot':
        return <Bot size={28} style={{ color: accentColor }} />;
      case 'HelpCircle':
        return <HelpCircle size={28} style={{ color: accentColor }} />;
      default:
        return <Box size={28} style={{ color: accentColor }} />;
    }
  };

  return (
    <div className="feature-card glass-card">
      <div className="feature-header">
        <div 
          className="feature-icon-box"
          style={{ 
            backgroundColor: `${accentColor}18`, 
            borderColor: `${accentColor}40` 
          }}
        >
          {renderIcon()}
        </div>
        <span 
          className="feature-badge" 
          style={{ 
            backgroundColor: `${accentColor}14`,
            color: accentColor,
            borderColor: `${accentColor}30` 
          }}
        >
          {badge}
        </span>
      </div>

      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
      
      <div className="feature-footer">
        <span className="feature-status-text">EduVision Core Module</span>
        <ArrowRight size={16} className="feature-arrow-icon" style={{ color: accentColor }} />
      </div>
    </div>
  );
}
