import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Code2, GraduationCap, Cpu } from 'lucide-react';
import './Footer.css';

/**
 * Footer Component
 * Educational macro project attribution, quick navigation links, and roadmap tags.
 */
export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="container footer-container">
        <div className="footer-top">
          {/* Brand Info */}
          <div className="footer-brand-col">
            <div className="footer-logo">
              <div className="footer-logo-icon">
                <Sparkles size={18} />
              </div>
              <span className="footer-logo-text">EduVision <span className="brand-highlight">AR</span></span>
            </div>
            <p className="footer-tagline">
              An AI-Powered Augmented Reality Learning Assistant designed to revolutionize educational concepts through interactive 3D visualization, spatial AR, and intelligent tutoring.
            </p>
            <div className="footer-badge-group">
              <span className="badge badge-primary">
                <GraduationCap size={14} /> College Macro Project
              </span>
              <span className="badge badge-cyan">
                <Code2 size={14} /> Phase 1 Frontend
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="footer-links-col">
            <h4 className="footer-heading">Platform</h4>
            <ul className="footer-links-list">
              <li><Link to="/">Home Overview</Link></li>
              <li><Link to="/subjects">Browse Subjects</Link></li>
              <li><Link to="/topics/biology">Biology 3D Lab</Link></li>
            </ul>
          </div>

          {/* Biology Topics */}
          <div className="footer-links-col">
            <h4 className="footer-heading">Phase 1 Modules</h4>
            <ul className="footer-links-list">
              <li><Link to="/learn/human-heart">Human Heart 3D</Link></li>
              <li><Link to="/learn/human-brain">Human Brain 3D</Link></li>
              <li><Link to="/learn/plant-cell">Plant Cell 3D</Link></li>
            </ul>
          </div>

          {/* Technology Stack Info */}
          <div className="footer-tech-col">
            <h4 className="footer-heading">Built With</h4>
            <div className="tech-tags-wrapper">
              <span className="tech-tag">React 18</span>
              <span className="tech-tag">Vite</span>
              <span className="tech-tag">React Router v7</span>
              <span className="tech-tag">Modern CSS</span>
              <span className="tech-tag">Lucide Icons</span>
            </div>
            <p className="future-roadmap-note">
              Next Steps: Phase 2 (Three.js 3D Viewport & WebXR Camera AR), Phase 3 (Gemini AI API & Interactive Quiz Engine).
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright-text">
            © {new Date().getFullYear()} EduVision AR. Designed for B.Tech Macro Project Showcase.
          </p>
          <div className="academic-badge">
            <Cpu size={14} /> Built for Step-by-Step Educational Scalability
          </div>
        </div>
      </div>
    </footer>
  );
}
