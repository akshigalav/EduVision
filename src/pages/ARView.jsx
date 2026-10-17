import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { MindARThree } from 'mind-ar/dist/mindar-image-three.prod.js';
import { 
  ArrowLeft, 
  Camera, 
  HelpCircle, 
  Download, 
  Eye, 
  X, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  RotateCw, 
  Smartphone,
  AlertTriangle
} from 'lucide-react';
import { createHeart3DModel } from '../utils/createHeart3DModel';
import './ARView.css';

/**
 * Play a high-tech audio chime when target is locked using Web Audio API
 */
function playTargetLockChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12); // A5

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.25);
  } catch (err) {
    // Audio context may require prior user interaction
  }
}

export default function ARView() {
  const { topicId = 'human-heart' } = useParams();
  const navigate = useNavigate();

  const containerRef = useRef(null);
  const mindarRef = useRef(null);
  const heartModelRef = useRef(null);
  const animFrameIdRef = useRef(null);

  // AR States
  const [cameraReady, setCameraReady] = useState(false);
  const [targetDetected, setTargetDetected] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [showTargetModal, setShowTargetModal] = useState(false);
  const [simulationMode, setSimulationMode] = useState(false);
  const [modelType, setModelType] = useState('procedural');

  // Initialize MindAR or Simulated AR
  useEffect(() => {
    let isMounted = true;
    const container = containerRef.current;
    if (!container) return;

    if (simulationMode) {
      // -------------------------------------------------------------
      // SIMULATION / DEMO MODE (For testing without live camera/card)
      // -------------------------------------------------------------
      const simScene = new THREE.Scene();
      const simCamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
      simCamera.position.set(0, 0, 4);

      const simRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      simRenderer.setSize(window.innerWidth, window.innerHeight);
      simRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(simRenderer.domElement);

      const amb = new THREE.AmbientLight(0xffffff, 1.2);
      simScene.add(amb);
      const dir = new THREE.DirectionalLight(0xffffff, 2.0);
      dir.position.set(3, 5, 4);
      simScene.add(dir);

      // Create simulated target card in 3D
      const cardGeo = new THREE.PlaneGeometry(1.6, 1.1);
      const cardTexture = new THREE.TextureLoader().load('/targets/heart-target.png');
      const cardMat = new THREE.MeshBasicMaterial({ map: cardTexture, side: THREE.DoubleSide });
      const cardMesh = new THREE.Mesh(cardGeo, cardMat);
      simScene.add(cardMesh);

      // Create 3D Heart Model and anchor to simulated card
      const heartHelper = createHeart3DModel({
        scale: 0.65,
        onLoaded: (info) => {
          if (isMounted) setModelType(info.type);
        }
      });
      heartHelper.group.position.set(0, 0, 0.4);
      cardMesh.add(heartHelper.group);
      heartModelRef.current = heartHelper;

      setCameraReady(true);
      setTargetDetected(true);

      const clock = { start: performance.now() };
      const simAnimate = () => {
        animFrameIdRef.current = requestAnimationFrame(simAnimate);
        const elapsed = (performance.now() - clock.start) * 0.001;

        // Rotate virtual target card slightly
        cardMesh.rotation.y = Math.sin(elapsed * 0.8) * 0.35;
        cardMesh.rotation.x = Math.cos(elapsed * 0.6) * 0.15;

        heartHelper.updatePulse(elapsed);
        simRenderer.render(simScene, simCamera);
      };
      simAnimate();

      return () => {
        if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
        simRenderer.dispose();
        if (container.contains(simRenderer.domElement)) {
          container.removeChild(simRenderer.domElement);
        }
      };
    }

    // -------------------------------------------------------------
    // LIVE MINDAR WEBAR IMAGE TRACKING
    // -------------------------------------------------------------
    let mindarThree = null;

    const startMindAR = async () => {
      try {
        setCameraError(null);

        // Detect if mobile device or desktop/laptop
        const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        const preferredFacingMode = isMobile ? 'environment' : 'user';

        mindarThree = new MindARThree({
          container,
          imageTargetSrc: '/targets/heart-target.mind',
          filterMinCF: 0.0001,
          filterBeta: 0.001,
          uiLoading: 'no',
          uiScanning: 'no',
          uiError: 'no', // Disable MindAR default blocking modal
          webcamConfig: {
            facingMode: preferredFacingMode
          }
        });
        mindarRef.current = mindarThree;

        const { renderer, scene, camera } = mindarThree;

        // Lighting for the 3D heart
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
        scene.add(ambientLight);
        const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
        keyLight.position.set(2, 4, 3);
        scene.add(keyLight);
        const rimLight = new THREE.PointLight(0xef4444, 2.0, 8);
        rimLight.position.set(0, -2, 2);
        scene.add(rimLight);

        // Anchor 0 represents the image in heart-target.mind
        const anchor = mindarThree.addAnchor(0);

        // Build & attach 3D Heart Model to the anchor group
        const heartHelper = createHeart3DModel({
          scale: 0.75,
          onLoaded: (info) => {
            if (isMounted) setModelType(info.type);
          }
        });
        heartHelper.group.position.set(0, 0, 0.2);
        anchor.group.add(heartHelper.group);
        heartModelRef.current = heartHelper;

        // Detection Events
        anchor.onTargetFound = () => {
          if (!isMounted) return;
          setTargetDetected(true);
          playTargetLockChime();
        };

        anchor.onTargetLost = () => {
          if (!isMounted) return;
          setTargetDetected(false);
        };

        // Safeguard timeout: If camera permission prompt takes > 5s or device has no camera
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Camera initialization timed out. No webcam response received.')), 6000)
        );

        // Start MindAR Engine & Video Stream
        await Promise.race([mindarThree.start(), timeoutPromise]);
        if (!isMounted) return;
        setCameraReady(true);

        const startTime = performance.now();
        renderer.setAnimationLoop(() => {
          const elapsed = (performance.now() - startTime) * 0.001;
          if (heartHelper) {
            heartHelper.updatePulse(elapsed);
          }
          renderer.render(scene, camera);
        });
      } catch (err) {
        console.warn('MindAR failed to initialize:', err);
        if (isMounted) {
          setCameraError(err.message || 'Unable to access web camera.');
          // Auto-fallback to simulation after 1.5s if camera is unavailable so user is never stuck
          setTimeout(() => {
            if (isMounted && !cameraReady) {
              setSimulationMode(true);
            }
          }, 1500);
        }
      }
    };

    startMindAR();

    // Cleanup on unmount or mode switch
    return () => {
      isMounted = false;
      if (mindarThree) {
        try {
          mindarThree.stop();
          mindarThree.renderer.setAnimationLoop(null);
        } catch (e) {
          // ignore cleanup errors
        }
      }
      // Stop all video tracks from camera
      const video = container.querySelector('video');
      if (video && video.srcObject) {
        video.srcObject.getTracks().forEach(track => track.stop());
      }
      // Clear container DOM
      container.innerHTML = '';
    };
  }, [simulationMode]);

  const handleBack = () => {
    navigate(`/learn/${topicId}`);
  };

  const toggleSimulation = () => {
    setSimulationMode(prev => !prev);
  };

  return (
    <div className="ar-page-wrapper">
      {/* MindAR Video & WebGL Canvas Container */}
      <div className="ar-viewport-container" ref={containerRef} />

      {/* Top HUD Bar */}
      <div className="ar-hud-top">
        <button className="ar-back-btn" onClick={handleBack} title="Return to Topic Learning">
          <ArrowLeft size={16} />
          <span>Exit AR</span>
        </button>

        {/* Live Tracking Status Pill */}
        <div className="ar-status-badge">
          <span className={`status-dot ${targetDetected ? 'active' : ''}`} />
          <span>
            {simulationMode 
              ? 'Simulation Target Active'
              : targetDetected 
                ? 'Target Locked: Human Heart' 
                : cameraReady 
                  ? 'Searching for Target Card...' 
                  : 'Initializing Camera...'}
          </span>
        </div>

        {/* Tools (Target Preview & Sim Mode) */}
        <div className="ar-top-tools">
          <button 
            className="ar-tool-btn"
            onClick={() => setShowTargetModal(true)}
            title="View or download image target to scan"
          >
            <Eye size={15} />
            <span>Target Card</span>
          </button>

          <button 
            className={`ar-tool-btn ${simulationMode ? 'active' : ''}`}
            onClick={toggleSimulation}
            title={simulationMode ? 'Switch back to Live Webcam AR' : 'Test AR using virtual target simulation'}
          >
            <Smartphone size={15} />
            <span>{simulationMode ? 'Live AR' : 'Simulate'}</span>
          </button>
        </div>
      </div>

      {/* Simulation Mode Watermark */}
      {simulationMode && (
        <div className="simulation-mode-watermark">
          Virtual Target Simulation (3D Anchor Active)
        </div>
      )}

      {/* Center Reticle Scanning Guide */}
      {!simulationMode && !cameraError && (
        <div className="ar-reticle-overlay">
          <div className={`reticle-box ${targetDetected ? 'detected' : ''}`}>
            <span className="corner-bracket top-left" />
            <span className="corner-bracket top-right" />
            <span className="corner-bracket bottom-left" />
            <span className="corner-bracket bottom-right" />
            <div className="reticle-scanline" />

            <div className="reticle-hint">
              {targetDetected ? (
                <>
                  <CheckCircle2 size={16} color="#34d399" />
                  <span>3D Heart Anchored</span>
                </>
              ) : (
                <>
                  <Camera size={16} />
                  <span>Point at Target Card</span>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bottom HUD: Target Detected Details Card */}
      {targetDetected && (
        <div className="ar-hud-bottom">
          <div className="ar-detection-card">
            <div className="card-status-title-row">
              <div className="card-title-group">
                <Sparkles size={18} color="#10b981" />
                <h3>Human Heart AR Model</h3>
              </div>
              <span className="anchored-badge">Target Anchored</span>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#cbd5e1', margin: 0 }}>
              Rotate or move the target card to view cardiac anatomy from any spatial perspective.
            </p>

            <div className="ar-chamber-chips">
              <span className="ar-chamber-pill" style={{ color: '#ef4444' }}>• Left Atrium & Ventricle</span>
              <span className="ar-chamber-pill" style={{ color: '#3b82f6' }}>• Right Atrium & Ventricle</span>
              <span className="ar-chamber-pill" style={{ color: '#f87171' }}>• Aortic Arch</span>
              <span className="ar-chamber-pill" style={{ color: '#6366f1' }}>• Pulmonary Trunk</span>
            </div>
          </div>
        </div>
      )}

      {/* Camera Permission / Error Fallback Notice */}
      {cameraError && !simulationMode && (
        <div className="target-modal-backdrop">
          <div className="target-modal-box">
            <div className="target-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <AlertTriangle size={20} color="#f59e0b" />
                <h3 className="target-modal-title">Camera Permission Needed</h3>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>
              WebAR requires webcam access to track the predefined image target. If your browser blocked camera permissions, or you are testing in an environment without a camera, you can use the <strong>Simulate AR</strong> mode instead.
            </p>
            <div className="target-modal-actions">
              <button className="btn btn-secondary" onClick={handleBack}>
                Exit to Learning
              </button>
              <button className="btn btn-primary" onClick={toggleSimulation}>
                Use Simulate AR Mode
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Predefined Image Target Preview & Download Modal */}
      {showTargetModal && (
        <div className="target-modal-backdrop" onClick={() => setShowTargetModal(false)}>
          <div className="target-modal-box" onClick={e => e.stopPropagation()}>
            <div className="target-modal-header">
              <h3 className="target-modal-title">Predefined AR Image Target</h3>
              <button 
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                onClick={() => setShowTargetModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#cbd5e1', margin: 0 }}>
              Point your webcam at this image card on your phone screen, or print it out. The 3D Human Heart will automatically anchor to it.
            </p>

            <img 
              src="/targets/heart-target.png" 
              alt="EduVision AR Image Target Card" 
              className="target-image-preview"
            />

            <div className="target-modal-actions">
              <a 
                href="/targets/heart-target.png" 
                download="EduVision-Heart-Target.png"
                className="btn btn-secondary"
                style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}
              >
                <Download size={15} />
                <span>Save Card</span>
              </a>
              <button className="btn btn-primary" onClick={() => setShowTargetModal(false)}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
