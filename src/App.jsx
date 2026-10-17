import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Subjects from './pages/Subjects';
import Topics from './pages/Topics';
import Learning from './pages/Learning';
import ARView from './pages/ARView';
import './App.css';

/**
 * ScrollToTop utility
 * Ensures every page view begins from the top of the viewport.
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/**
 * Main App Component
 * Configures client-side routing for EduVision AR.
 */
export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-layout">
        {/* Global Navigation Header */}
        <Navbar />

        {/* Main Content Viewport */}
        <main className="main-content">
          <Routes>
            {/* 1. Home Page */}
            <Route path="/" element={<Home />} />

            {/* 2. Subjects Page */}
            <Route path="/subjects" element={<Subjects />} />

            {/* 3. Topics Page (Default or Specific Subject) */}
            <Route path="/topics" element={<Topics />} />
            <Route path="/topics/:subjectId" element={<Topics />} />

            {/* 4. Learning Page (Interactive 3D model & Actions) */}
            <Route path="/learn/:topicId" element={<Learning />} />

            {/* 5. Phase 3 Web-based Augmented Reality */}
            <Route path="/ar/:topicId" element={<ARView />} />
            <Route path="/ar" element={<ARView />} />

            {/* Fallback to Home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </Router>
  );
}
