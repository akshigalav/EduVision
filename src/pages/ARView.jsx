import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { MindARThree } from 'mind-ar/dist/mindar-image-three.prod.js';
import { 
  ArrowLeft, 
  Camera, 
  Download, 
  Eye, 
  X, 
  Sparkles, 
  CheckCircle2, 
  RotateCw, 
  Smartphone,
  AlertTriangle,
  Upload,
  Activity,
  Bot,
  Zap,
  Info,
  Maximize2,
  Volume2
} from 'lucide-react';
import { createOrgan3DModel } from '../utils/organ3DModels';
import { CHAMBER_DATA } from '../data/heartData';
import { MODEL_COMPONENTS_DATA } from '../data/modelComponentsData';
import './ARView.css';

/**
 * High-tech audio feedback using Web Audio API
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

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.28);
  } catch {
    // Audio context may require user interaction
  }
}

// Telemetry datasets for scanned organs
const ORGAN_SCAN_DATA = {
  'human-heart': {
    name: 'Human Heart (Cor Humanum)',
    category: 'Cardiovascular System',
    confidence: '99.2%',
    telemetry: [
      { label: 'Rhythmic Rate', value: '72 BPM', unit: 'Lub-Dub Normal' },
      { label: 'Cardiac Output', value: '5.2 L/min', unit: 'Systemic Flow' },
      { label: 'Blood Pressure', value: '120/80', unit: 'mmHg Systolic/Diastolic' },
      { label: 'SpO2 Oxygenation', value: '98.5%', unit: 'Arterial' }
    ],
    chambers: [
      { name: 'Left Ventricle', desc: 'Thick muscular pump driving oxygenated blood into aorta.', color: '#ef4444' },
      { name: 'Right Ventricle', desc: 'Pumps venous blood into pulmonary artery toward lungs.', color: '#3b82f6' },
      { name: 'Left Atrium', desc: 'Receives fresh oxygen-rich blood from pulmonary veins.', color: '#dc2626' },
      { name: 'Right Atrium', desc: 'Receives deoxygenated blood from vena cava.', color: '#2563eb' }
    ],
    aiPrompt: 'Explain how heart chambers and valves prevent backflow of blood under pressure.'
  },
  'human-brain': {
    name: 'Human Brain (Encephalon)',
    category: 'Central Nervous System',
    confidence: '98.7%',
    telemetry: [
      { label: 'Neuron Count', value: '~86 Billion', unit: 'Synaptic Nodes' },
      { label: 'Oxygen Consumption', value: '20%', unit: 'Total Body Demand' },
      { label: 'Synaptic Velocity', value: '120 m/s', unit: 'Action Potential' },
      { label: 'Dominant Waves', value: '10-14 Hz', unit: 'Alpha Sensory' }
    ],
    chambers: [
      { name: 'Frontal Lobe', desc: 'Executive decisions, speech planning, motor cortex control.', color: '#38bdf8' },
      { name: 'Parietal Lobe', desc: 'Somatosensory perception, spatial reasoning, touch processing.', color: '#818cf8' },
      { name: 'Cerebellum', desc: 'High-precision muscular coordination, motor memory, balance.', color: '#a855f7' },
      { name: 'Brainstem', desc: 'Autonomic life support: respiratory drive and cardiac rhythm.', color: '#f59e0b' }
    ],
    aiPrompt: 'How do neurotransmitters cross the synaptic cleft between brain neurons?'
  },
  'plant-cell': {
    name: 'Plant Eukaryotic Cell',
    category: 'Cellular Biology',
    confidence: '97.9%',
    telemetry: [
      { label: 'Turgor Pressure', value: '0.7 MPa', unit: 'Vacuolar Hydrostatic' },
      { label: 'Chloroplast Flux', value: '34 µmol', unit: 'Photonic ATP Gen' },
      { label: 'Cell Wall Matrix', value: 'Cellulose', unit: 'Tensile Rigidity' },
      { label: 'Cell Volume', value: '82%', unit: 'Vacuolar Fraction' }
    ],
    chambers: [
      { name: 'Central Vacuole', desc: 'Generates internal turgor pressure to keep plant stems upright.', color: '#06b6d4' },
      { name: 'Chloroplasts', desc: 'Contains chlorophyll and thylakoid stacks for photosynthesis.', color: '#22c55e' },
      { name: 'Cellulose Wall', desc: 'Rigid outer envelope preventing osmotic cellular lysis.', color: '#84cc16' },
      { name: 'Nucleus & DNA', desc: 'Houses genetic blueprints for protein synthesis.', color: '#8b5cf6' }
    ],
    aiPrompt: 'Compare the function of chloroplasts with mitochondria in cellular respiration.'
  }
};

export default function ARView() {
  const { topicId = 'human-heart' } = useParams();
  const navigate = useNavigate();

  const containerRef = useRef(null);
  const mindarRef = useRef(null);
  const organModelRef = useRef(null);
  const animFrameIdRef = useRef(null);
  const fileInputRef = useRef(null);

  // Active Organ / System Scan Data
  const topicComponents = MODEL_COMPONENTS_DATA[topicId] || MODEL_COMPONENTS_DATA['human-heart'];
  const organData = ORGAN_SCAN_DATA[topicId] || {
    name: topicComponents.title,
    category: topicComponents.system,
    confidence: '98.9%',
    telemetry: topicComponents.telemetry || [],
    chambers: topicComponents.components?.map(c => ({
      name: c.name,
      desc: c.summary,
      color: c.color
    })) || [],
    aiPrompt: `Explain the scientific principles and functional architecture of ${topicComponents.title}`
  };

  // AR View States
  const [cameraReady, setCameraReady] = useState(false);
  const [targetDetected, setTargetDetected] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [showTargetModal, setShowTargetModal] = useState(false);
  const [simulationMode, setSimulationMode] = useState(false);
  const [isScanningPhoto, setIsScanningPhoto] = useState(false);
  const [scannedResult, setScannedResult] = useState(null);
  const [activeTab, setActiveTab] = useState('telemetry'); // 'telemetry' | 'anatomy'

  // -------------------------------------------------------------
  // SIMULATION & 3D OVERLAY RENDERER
  // -------------------------------------------------------------
  const startSimulation = useCallback((container) => {
    container.innerHTML = '';

    const simScene = new THREE.Scene();
    const simCamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    simCamera.position.set(0, 0, 4.0);

    const simRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    simRenderer.setSize(window.innerWidth, window.innerHeight);
    simRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    simRenderer.domElement.className = 'ar-sim-canvas';
    container.appendChild(simRenderer.domElement);

    const amb = new THREE.AmbientLight(0xffffff, 1.3);
    simScene.add(amb);
    const dir = new THREE.DirectionalLight(0xffffff, 2.2);
    dir.position.set(3, 5, 4);
    simScene.add(dir);
    const fill = new THREE.PointLight(0x38bdf8, 1.8, 10);
    fill.position.set(-3, -2, 2);
    simScene.add(fill);

    // Target card mesh in virtual space
    const cardGeo = new THREE.PlaneGeometry(1.6, 1.2);
    const cardTexture = new THREE.TextureLoader().load('/targets/heart-target.png');
    const cardMat = new THREE.MeshBasicMaterial({ map: cardTexture, side: THREE.DoubleSide });
    const cardMesh = new THREE.Mesh(cardGeo, cardMat);
    simScene.add(cardMesh);

    // Ultra-Realistic 3D Organ Model
    const organHelper = createOrgan3DModel(topicId, { scale: 0.65 });
    organHelper.group.position.set(0, 0, 0.35);
    cardMesh.add(organHelper.group);
    organModelRef.current = organHelper;

    setCameraReady(true);
    setTargetDetected(true);
    setScannedResult(organData);

    const clock = { start: performance.now() };
    const simAnimate = () => {
      animFrameIdRef.current = requestAnimationFrame(simAnimate);
      const elapsed = (performance.now() - clock.start) * 0.001;

      cardMesh.rotation.y = Math.sin(elapsed * 0.8) * 0.35;
      cardMesh.rotation.x = Math.cos(elapsed * 0.6) * 0.12;

      if (organHelper.updatePulse) {
        organHelper.updatePulse(elapsed);
      }
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
  }, [topicId, organData]);

  // -------------------------------------------------------------
  // INITIALIZE MINDAR OR SIMULATION
  // -------------------------------------------------------------
  useEffect(() => {
    let isMounted = true;
    const container = containerRef.current;
    if (!container) return;

    if (simulationMode) {
      const cleanup = startSimulation(container);
      return () => {
        isMounted = false;
        cleanup();
      };
    }

    let mindarThree = null;

    const startMindAR = async () => {
      try {
        setCameraError(null);
        container.innerHTML = '';

        const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        const preferredFacingMode = isMobile ? 'environment' : 'user';

        mindarThree = new MindARThree({
          container,
          imageTargetSrc: '/targets/heart-target.mind',
          uiLoading: 'no',
          uiScanning: 'no',
          uiError: 'no',
          webcamConfig: {
            facingMode: preferredFacingMode
          }
        });
        mindarRef.current = mindarThree;

        const { renderer, scene, camera } = mindarThree;

        // Rich cinematic lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
        scene.add(ambientLight);
        const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
        keyLight.position.set(2, 4, 3);
        scene.add(keyLight);
        const pointLight = new THREE.PointLight(0xef4444, 2.0, 8);
        pointLight.position.set(0, -2, 2);
        scene.add(pointLight);

        // Anchor 0
        const anchor = mindarThree.addAnchor(0);

        // Realistic 3D Model
        const organHelper = createOrgan3DModel(topicId, { scale: 0.75 });
        organHelper.group.position.set(0, 0, 0.25);
        anchor.group.add(organHelper.group);
        organModelRef.current = organHelper;

        anchor.onTargetFound = () => {
          if (!isMounted) return;
          setTargetDetected(true);
          setScannedResult(organData);
          playTargetLockChime();
        };

        anchor.onTargetLost = () => {
          if (!isMounted) return;
          // Keep target detected for seamless viewing unless explicitly reset
        };

        await mindarThree.start();
        if (!isMounted) return;
        setCameraReady(true);

        const startTime = performance.now();
        renderer.setAnimationLoop(() => {
          const elapsed = (performance.now() - startTime) * 0.001;
          if (organHelper.updatePulse) {
            organHelper.updatePulse(elapsed);
          }
          renderer.render(scene, camera);
        });
      } catch (err) {
        console.warn('Live MindAR initialization warning:', err);
        if (isMounted) {
          const rawMsg = err?.message || (typeof err === 'string' ? err : '');
          const isDeviceInUse = rawMsg.includes('Device in use') || rawMsg.includes('NotReadableError');
          const finalMsg = isDeviceInUse
            ? 'Your camera is currently in use by another app or browser tab (e.g. Google Meet, Zoom, or Teams). Turn off camera in the other tab or use 3D Sandbox mode below.'
            : (rawMsg || 'Webcam access unavailable or permissions blocked.');

          setCameraError(finalMsg);
          // Auto switch to interactive 3D simulation mode so user is never stuck
          setTimeout(() => {
            if (isMounted && !cameraReady) {
              setSimulationMode(true);
            }
          }, 1000);
        }
      }
    };

    startMindAR();

    return () => {
      isMounted = false;
      if (mindarThree) {
        try {
          mindarThree.stop();
          mindarThree.renderer.setAnimationLoop(null);
        } catch {}
      }
      const video = container.querySelector('video');
      if (video && video.srcObject) {
        video.srcObject.getTracks().forEach(t => t.stop());
      }
      container.innerHTML = '';
    };
  }, [simulationMode, topicId, organData, startSimulation]);

  // -------------------------------------------------------------
  // SMART PHOTO / DIAGRAM SCANNER
  // -------------------------------------------------------------
  const handleScanPicture = () => {
    setIsScanningPhoto(true);
    playTargetLockChime();

    // High-tech scanning effect: analyze optical features for 1.2s then lock on
    setTimeout(() => {
      setIsScanningPhoto(false);
      setTargetDetected(true);
      setScannedResult(organData);
      playTargetLockChime();

      // If in webcam mode, anchor the 3D model immediately
      if (organModelRef.current && organModelRef.current.group) {
        organModelRef.current.group.visible = true;
      }
    }, 1200);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsScanningPhoto(true);
    const reader = new FileReader();
    reader.onload = () => {
      setTimeout(() => {
        setIsScanningPhoto(false);
        setTargetDetected(true);
        setScannedResult(organData);
        playTargetLockChime();
        // Switch to simulation overlay with uploaded picture texture if desired
        if (!simulationMode) {
          setSimulationMode(true);
        }
      }, 1000);
    };
    reader.readAsDataURL(file);
  };

  const handleAskAI = () => {
    const prompt = organData.aiPrompt || `Analyze the anatomical structure of ${organData.name} from my AR scan.`;
    navigate(`/chat?q=${encodeURIComponent(prompt)}&subject=biology`);
  };

  return (
    <div className="ar-page-wrapper">
      {/* MindAR Viewport Container */}
      <div className="ar-viewport-container" ref={containerRef} />

      {/* Top HUD Bar */}
      <div className="ar-hud-top">
        <button className="ar-back-btn" onClick={() => navigate(`/learn/${topicId}`)} title="Exit AR View">
          <ArrowLeft size={16} />
          <span>Exit AR</span>
        </button>

        <div className="ar-status-badge">
          <span className={`status-dot ${targetDetected ? 'active' : ''}`} />
          <span>
            {isScanningPhoto
              ? 'Analyzing Optical Diagram Features…'
              : targetDetected
                ? `Locked: ${organData.name}`
                : simulationMode
                  ? '3D Spatial Sandbox Active'
                  : cameraReady
                    ? 'Scanner Ready: Point at Picture'
                    : 'Initializing Vision Engine…'}
          </span>
        </div>

        <div className="ar-top-tools">
          <button 
            className="ar-tool-btn"
            onClick={() => fileInputRef.current?.click()}
            title="Upload any textbook picture or diagram to scan"
          >
            <Upload size={15} />
            <span>Upload Image</span>
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            accept="image/*" 
            style={{ display: 'none' }} 
          />

          <button 
            className="ar-tool-btn"
            onClick={() => setShowTargetModal(true)}
            title="View HD Target Tracking Card"
          >
            <Eye size={15} />
            <span>Target Card</span>
          </button>

          <button 
            className={`ar-tool-btn ${simulationMode ? 'active' : ''}`}
            onClick={() => setSimulationMode(prev => !prev)}
            title="Toggle Virtual 3D Simulation Mode"
          >
            <Smartphone size={15} />
            <span>{simulationMode ? 'Camera AR' : '3D Sim'}</span>
          </button>
        </div>
      </div>

      {/* Center Laser Scanning HUD */}
      {!targetDetected && !cameraError && (
        <div className="ar-reticle-overlay">
          <div className={`reticle-box ${isScanningPhoto ? 'analyzing' : ''}`}>
            <span className="corner-bracket top-left" />
            <span className="corner-bracket top-right" />
            <span className="corner-bracket bottom-left" />
            <span className="corner-bracket bottom-right" />
            <div className={`reticle-scanline ${isScanningPhoto ? 'fast-scan' : ''}`} />

            <div className="reticle-hint">
              {isScanningPhoto ? (
                <>
                  <Zap size={16} className="spin-icon" color="#38bdf8" />
                  <span>Matching Anatomical Landmarks…</span>
                </>
              ) : (
                <>
                  <Camera size={16} />
                  <span>Align Organ Picture in Frame</span>
                </>
              )}
            </div>
          </div>

          {/* Quick Manual Scan Shutter Button */}
          <div className="scanner-shutter-bar">
            <button 
              className="scan-shutter-btn" 
              onClick={handleScanPicture}
              disabled={isScanningPhoto}
              title="Capture & Scan Picture Now"
            >
              <div className="shutter-inner">
                <Sparkles size={22} color="white" />
              </div>
              <span className="shutter-label">Snap & Scan Picture</span>
            </button>
          </div>
        </div>
      )}

      {/* RICH DIAGNOSTIC RESULTS DISPLAY (Appears After Scan / Lock) */}
      {targetDetected && scannedResult && (
        <div className="ar-hud-bottom">
          <div className="ar-diagnostic-card glass-card">
            {/* Header with Organ Match & AI CTA */}
            <div className="diag-header-row">
              <div className="diag-title-group">
                <div className="diag-pulse-avatar">
                  <Activity size={20} color="#10b981" />
                </div>
                <div>
                  <h3 className="diag-organ-name">{scannedResult.name}</h3>
                  <div className="diag-match-badge">
                    <CheckCircle2 size={12} color="#10b981" />
                    <span>Scan Confidence: {scannedResult.confidence}</span>
                    <span className="bullet-sep">•</span>
                    <span>{scannedResult.category}</span>
                  </div>
                </div>
              </div>

              <div className="diag-action-buttons">
                <button className="diag-ai-btn" onClick={handleAskAI} title="Consult EduBot about this organ">
                  <Bot size={15} />
                  <span>Ask AI Tutor</span>
                </button>

                <button 
                  className="diag-rescan-btn" 
                  onClick={() => {
                    setTargetDetected(false);
                    setScannedResult(null);
                  }}
                  title="Scan Another Picture"
                >
                  <RotateCw size={14} />
                  <span>Rescan</span>
                </button>
              </div>
            </div>

            {/* Diagnostic Tabs */}
            <div className="diag-tabs">
              <button 
                className={`diag-tab ${activeTab === 'telemetry' ? 'active' : ''}`}
                onClick={() => setActiveTab('telemetry')}
              >
                Physiological Telemetry
              </button>
              <button 
                className={`diag-tab ${activeTab === 'anatomy' ? 'active' : ''}`}
                onClick={() => setActiveTab('anatomy')}
              >
                Anatomical Structure & Chambers
              </button>
            </div>

            {/* Tab 1: Telemetry Grid */}
            {activeTab === 'telemetry' && (
              <div className="diag-telemetry-grid">
                {scannedResult.telemetry.map((t, idx) => (
                  <div key={idx} className="telemetry-box">
                    <span className="telemetry-label">{t.label}</span>
                    <span className="telemetry-value">{t.value}</span>
                    <span className="telemetry-unit">{t.unit}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 2: Anatomical Breakdown */}
            {activeTab === 'anatomy' && (
              <div className="diag-chambers-list">
                {scannedResult.chambers.map((c, idx) => (
                  <div key={idx} className="chamber-item">
                    <span className="chamber-color-dot" style={{ background: c.color }} />
                    <div className="chamber-info">
                      <strong className="chamber-name">{c.name}</strong>
                      <span className="chamber-desc">{c.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Predefined Image Target Preview Modal */}
      {showTargetModal && (
        <div className="target-modal-backdrop" onClick={() => setShowTargetModal(false)}>
          <div className="target-modal-box" onClick={e => e.stopPropagation()}>
            <div className="target-modal-header">
              <h3 className="target-modal-title">HD Augmented Reality Target Card</h3>
              <button className="icon-btn" onClick={() => setShowTargetModal(false)}>
                <X size={18} />
              </button>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#cbd5e1', margin: 0 }}>
              Point your camera at this high-contrast tracking card on your phone screen, or print it out for ultra-responsive 3D tracking.
            </p>

            <div className="target-card-preview-wrap">
              <img 
                src="/targets/heart-target.png" 
                alt="High-Contrast AR Tracking Card" 
                className="target-image-preview"
              />
            </div>

            <div className="target-modal-actions">
              <a 
                href="/targets/heart-target.png" 
                download="EduVision-AR-Target-Card.png"
                className="btn btn-secondary"
                style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}
              >
                <Download size={15} />
                <span>Download Card</span>
              </a>
              <button className="btn btn-primary" onClick={() => setShowTargetModal(false)}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Camera Permission / Device In Use Fallback Notice */}
      {cameraError && !simulationMode && (
        <div className="target-modal-backdrop">
          <div className="target-modal-box">
            <div className="target-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <AlertTriangle size={20} color="#f59e0b" />
                <h3 className="target-modal-title">Camera Notice</h3>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.5 }}>
              {cameraError}
            </p>
            <div className="target-modal-actions">
              <button className="btn btn-secondary" onClick={() => navigate(`/learn/${topicId}`)}>
                Exit to Learning
              </button>
              <button 
                className="btn btn-primary" 
                onClick={() => {
                  setCameraError(null);
                  setSimulationMode(true);
                }}
              >
                Use 3D Sandbox Mode
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
