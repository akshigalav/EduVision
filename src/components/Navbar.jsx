import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Sparkles, Compass, Layers, Menu, X, BookOpen, MessageSquare } from 'lucide-react';
import './Navbar.css';

/**
 * Navbar Component
 * Provides global branding, navigation links, and quick action CTA.
 */
export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
          <div className="brand-icon-wrapper">
            <Sparkles className="brand-sparkle-icon" size={20} />
          </div>
          <div className="brand-text-group">
            <span className="brand-title">EduVision <span className="brand-highlight">AR</span></span>
            <span className="brand-subtitle">AI & Spatial Learning</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="nav-desktop">
          <NavLink 
            to="/" 
            end 
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Home
          </NavLink>
          <NavLink 
            to="/subjects" 
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Subjects
          </NavLink>
          <NavLink 
            to="/chat" 
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            <MessageSquare size={14} style={{display:'inline',verticalAlign:'middle',marginRight:'4px'}} />
            AI Tutor
          </NavLink>
          <a href="#features" className="nav-link" onClick={() => {
            // If on another page, let default link handle or smooth scroll
          }}>
            Features
          </a>
        </nav>

        {/* Right Actions */}
        <div className="nav-actions">
          <Link to="/subjects" className="btn btn-primary nav-cta-btn">
            <BookOpen size={16} />
            <span>Start Learning</span>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button 
            className="mobile-menu-btn" 
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-menu-dropdown">
          <NavLink 
            to="/" 
            end 
            className="mobile-nav-link" 
            onClick={closeMobileMenu}
          >
            Home
          </NavLink>
          <NavLink 
            to="/subjects" 
            className="mobile-nav-link" 
            onClick={closeMobileMenu}
          >
            Subjects
          </NavLink>
          <NavLink 
            to="/chat" 
            className="mobile-nav-link" 
            onClick={closeMobileMenu}
          >
            <MessageSquare size={14} style={{display:'inline',verticalAlign:'middle',marginRight:'6px'}} />
            AI Tutor
          </NavLink>
          <Link 
            to="/subjects" 
            className="btn btn-primary mobile-cta" 
            onClick={closeMobileMenu}
          >
            <BookOpen size={16} />
            <span>Start Learning</span>
          </Link>
        </div>
      )}
    </header>
  );
}
