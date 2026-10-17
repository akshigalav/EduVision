import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Dna, 
  Layers, 
  CheckCircle, 
  Compass, 
  Smartphone,
  Cpu,
  GraduationCap 
} from 'lucide-react';
import FeatureCard from '../components/FeatureCard';
import { FEATURES } from '../data/learningData';
import './Home.css';

/**
 * Home Page Component
 * Hero section, platform intro, key features (3D, AR, AI, Quiz), and quick workflow.
 */
export default function Home() {
  return (
    <div className="home-page">
      {/* =========================================================================
          HERO SECTION
          ========================================================================= */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-pill-badge">
              <Sparkles size={15} className="hero-pill-icon" />
              <span>Next-Generation Academic Visual Learning</span>
            </div>

            <h1 className="hero-title">
              Master Complex Science in <span className="gradient-text">Interactive 3D</span> & Augmented Reality
            </h1>

            <p className="hero-description">
              <strong>EduVision AR</strong> transforms traditional textbook diagrams into immersive, interactive spatial 3D models. Inspect anatomy, cellular structures, and physics phenomena directly in your web browser with AI tutoring.
            </p>

            <div className="hero-cta-group">
              <Link to="/subjects" className="btn btn-primary hero-btn-main">
                <span>Start Learning Now</span>
                <ArrowRight size={18} />
              </Link>
              <a href="#features" className="btn btn-secondary hero-btn-secondary">
                <span>Explore Features</span>
              </a>
            </div>

            <div className="hero-stats-row">
              <div className="stat-item">
                <span className="stat-value">5+</span>
                <span className="stat-label">STEM Disciplines</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-value">3D & AR</span>
                <span className="stat-label">Spatial Interaction</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-value">AI Tutor</span>
                <span className="stat-label">Real-time Answers</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Display / Mock 3D Card */}
          <div className="hero-visual">
            <div className="hero-card-glow"></div>
            <div className="hero-mockup-frame glass-card">
              <div className="mockup-header">
                <div className="mockup-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <div className="mockup-url-bar">
                  <span>eduvision.ar / biology / human-heart</span>
                </div>
                <div className="mockup-badge">3D Active</div>
              </div>

              <div className="mockup-viewport">
                <div className="spatial-grid-bg"></div>
                <div className="spatial-orbit-ring ring-1"></div>
                <div className="spatial-orbit-ring ring-2"></div>
                
                {/* 3D Model Focal Simulation */}
                <div className="spatial-model-core">
                  <div className="core-icon-pulse">
                    <Dna size={48} className="core-icon" />
                  </div>
                  <div className="core-label">Human Heart & Vascular Tree</div>
                  <div className="core-tag">Realtime Mesh Preview</div>
                </div>

                <div className="mockup-floating-tag tag-ar">
                  <Smartphone size={14} /> WebAR Ready
                </div>
                <div className="mockup-floating-tag tag-ai">
                  <Cpu size={14} /> AI Assistant Connected
                </div>
              </div>

              <div className="mockup-footer">
                <div className="mockup-controls-hint">
                  <span className="control-chip">Drag to Rotate</span>
                  <span className="control-chip">Pinch to Zoom</span>
                </div>
                <Link to="/learn/human-heart" className="mockup-launch-btn">
                  Launch Lab <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FEATURES SECTION
          Showcasing the 4 core pillars requested:
          1. 3D Learning
          2. Augmented Reality
          3. AI Assistant
          4. Interactive Quiz
          ========================================================================= */}
      <section id="features" className="features-section">
        <div className="container">
          <div className="section-header-centered">
            <span className="badge badge-primary">Core Capabilities</span>
            <h2 className="section-heading">
              Engineered to Make Learning <span className="gradient-text">Intuitive & Tangible</span>
            </h2>
            <p className="section-subheading">
              EduVision AR bridges abstract concepts with spatial engagement. Here is how our four core pillars empower students.
            </p>
          </div>

          <div className="features-grid">
            {FEATURES.map((feature) => (
              <FeatureCard
                key={feature.id}
                title={feature.title}
                description={feature.description}
                badge={feature.badge}
                iconName={feature.iconName}
                accentColor={feature.accentColor}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          WORKFLOW STEP-BY-STEP SECTION
          Student navigation walkthrough
          ========================================================================= */}
      <section className="workflow-section">
        <div className="container">
          <div className="workflow-box glass-card">
            <div className="workflow-header">
              <span className="badge badge-cyan">Simple 4-Step Flow</span>
              <h2 className="workflow-title">How You Learn With EduVision AR</h2>
            </div>

            <div className="steps-grid">
              <div className="step-card">
                <div className="step-number">01</div>
                <h4 className="step-title">Select Subject</h4>
                <p className="step-desc">Pick from Biology, Physics, Chemistry, Math, or Computer Science.</p>
              </div>

              <div className="step-card">
                <div className="step-number">02</div>
                <h4 className="step-title">Choose Topic</h4>
                <p className="step-desc">Select specific anatomical or scientific models like Human Heart or Plant Cell.</p>
              </div>

              <div className="step-card">
                <div className="step-number">03</div>
                <h4 className="step-title">Explore 3D & AR</h4>
                <p className="step-desc">Rotate the 3D model on screen or project it onto your desk using your camera.</p>
              </div>

              <div className="step-card">
                <div className="step-number">04</div>
                <h4 className="step-title">Ask AI & Take Quiz</h4>
                <p className="step-desc">Clarify doubts instantly with the smart tutor and test retention with a quick quiz.</p>
              </div>
            </div>

            <div className="workflow-footer-cta">
              <Link to="/subjects" className="btn btn-primary">
                <BookOpen size={18} />
                <span>Begin Your First Lesson</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
