import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  RotateCw, 
  RotateCcw, 
  Play, 
  Pause, 
  Sparkles, 
  Eye, 
  Maximize2, 
  Minimize2, 
  Layers, 
  Gauge,
  Zap,
  CheckCircle2,
  Activity,
  Crosshair
} from 'lucide-react';
import { createOrgan3DModel } from '../utils/organ3DModels';
import { MODEL_COMPONENTS_DATA } from '../data/modelComponentsData';
import './HeartModelViewer.css';

/**
 * GeneralOrganViewer - The Universal 3D Visualization Lab Viewer
 * Renders high-fidelity, interactive, animated 3D WebGL models for all 15 curriculum topics.
 * Features:
 * - OrbitControls with smooth damping & auto-rotate
 * - Component-targeted smooth camera focus & dissection
 * - Wireframe X-Ray mode vs Solid PBR shading
 * - Simulation speed controller (0.5x, 1x, 2x, Pause)
 * - Explode / Dissect 3D view toggle
 * - Screen-space 3D interactive hotspot pins
 * - Fullscreen immersive laboratory mode
 * - Scientific telemetry metrics HUD
 */
export default function GeneralOrganViewer({ 
  topicId = 'human-heart', 
  title = '3D Model', 
  activeComponent = null, 
  onSelectComponent = () => {} 
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const organRef = useRef(null);
  const animationFrameId = useRef(null);

  // Viewport Interactive States
  const [autoRotate, setAutoRotate] = useState(true);
  const [wireframe, setWireframe] = useState(false);
  const [simSpeed, setSimSpeed] = useState(1.0); // 0, 0.5, 1, 2
  const [exploded, setExploded] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hoveredName, setHoveredName] = useState(null);
  const [hotspotPositions, setHotspotPositions] = useState([]);

  // Topic Metadata & Components
  const topicData = MODEL_COMPONENTS_DATA[topicId] || MODEL_COMPONENTS_DATA['human-heart'];
  const componentsList = topicData?.components || [];

  // Smooth Camera Animation Target Refs
  const targetCamPos = useRef(new THREE.Vector3(0, 0.4, 4.0));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const isTransitioningCam = useRef(false);

  // Initialize Scene & 3D Model
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 480;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 4.0);
    cameraRef.current = camera;
    targetCamPos.current.copy(camera.position);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;

    // 4. OrbitControls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 1.2;
    controls.maxDistance = 10.0;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 1.4;
    controlsRef.current = controls;

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.4);
    dirLight1.position.set(5, 8, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 1.2);
    dirLight2.position.set(-5, -2, -4);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xa855f7, 2.0, 12);
    pointLight.position.set(0, 3, 2);
    scene.add(pointLight);

    // Subtle 3D Laboratory Floor Grid
    const grid = new THREE.GridHelper(8, 20, 0x6366f1, 0x1e293b);
    grid.position.y = -1.2;
    scene.add(grid);

    // 6. Build High-Fidelity Topic 3D Model
    setLoading(true);
    const organHelper = createOrgan3DModel(topicId, {
      scale: 1.0,
      onLoaded: () => setLoading(false)
    });
    scene.add(organHelper.group);
    organRef.current = organHelper;
    setLoading(false);

    // 7. Raycaster for Interactive Hover
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      if (organRef.current?.group) {
        const intersects = raycaster.intersectObjects(organRef.current.group.children, true);
        if (intersects.length > 0) {
          let obj = intersects[0].object;
          let matched = null;
          while (obj && obj !== organRef.current.group) {
            if (obj.name && componentsList.some(c => c.id === obj.name)) {
              matched = componentsList.find(c => c.id === obj.name);
              break;
            }
            obj = obj.parent;
          }
          setHoveredName(matched ? matched.name : null);
        } else {
          setHoveredName(null);
        }
      }
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    // 8. Main Render Loop
    let lastTime = performance.now();
    let accumulatedElapsed = 0;

    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      const now = performance.now();
      const delta = (now - lastTime) * 0.001;
      lastTime = now;

      // Accumulate simulation time based on speed multiplier
      accumulatedElapsed += delta * simSpeed;

      // Smooth Camera Transitions
      if (isTransitioningCam.current) {
        camera.position.lerp(targetCamPos.current, 0.08);
        controls.target.lerp(targetLookAt.current, 0.08);
        if (camera.position.distanceTo(targetCamPos.current) < 0.02) {
          isTransitioningCam.current = false;
        }
      }

      controls.update();

      // Update 3D Model Dynamics & Animations
      if (organRef.current && organRef.current.updatePulse) {
        organRef.current.updatePulse(accumulatedElapsed);
      }

      // Project 3D Hotspot Coordinates to 2D Screen Space
      if (componentsList.length > 0 && container) {
        const rect = container.getBoundingClientRect();
        const positions = componentsList.map(comp => {
          if (!comp.focus) return null;
          const pos3D = new THREE.Vector3(comp.focus[0], comp.focus[1], comp.focus[2]);
          pos3D.project(camera);

          // Check if behind camera
          if (pos3D.z > 1) return null;

          const screenX = ((pos3D.x + 1) * rect.width) / 2;
          const screenY = ((-pos3D.y + 1) * rect.height) / 2;
          return { id: comp.id, name: comp.name, color: comp.color, x: screenX, y: screenY };
        }).filter(Boolean);
        setHotspotPositions(positions);
      }

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      renderer.dispose();
    };
  }, [topicId, simSpeed]);

  // Handle Camera Focus on Active Component
  useEffect(() => {
    if (!controlsRef.current || !cameraRef.current) return;

    if (activeComponent) {
      const comp = componentsList.find(c => c.id === activeComponent);
      if (comp && comp.focus) {
        targetLookAt.current.set(comp.focus[0], comp.focus[1], comp.focus[2]);
        targetCamPos.current.set(
          comp.focus[0] * 1.2, 
          comp.focus[1] + 0.3, 
          comp.focus[2] + 2.2
        );
        isTransitioningCam.current = true;
        if (controlsRef.current) controlsRef.current.autoRotate = false;
        setAutoRotate(false);
      }
    } else {
      targetLookAt.current.set(0, 0, 0);
      targetCamPos.current.set(0, 0.4, 4.0);
      isTransitioningCam.current = true;
    }
  }, [activeComponent, componentsList]);

  // Handle Wireframe Toggle
  const toggleWireframe = () => {
    setWireframe(prev => {
      const next = !prev;
      if (organRef.current?.group) {
        organRef.current.group.traverse(child => {
          if (child.isMesh && child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach(m => m.wireframe = next);
            } else {
              child.material.wireframe = next;
            }
          }
        });
      }
      return next;
    });
  };

  // Handle Explode / Dissect Toggle
  const toggleExplode = () => {
    setExploded(prev => {
      const next = !prev;
      if (organRef.current?.group) {
        const factor = next ? 1.4 : 1.0;
        organRef.current.group.children.forEach(child => {
          if (child.isGroup || child.isMesh) {
            child.scale.setScalar(factor);
          }
        });
      }
      return next;
    });
  };

  // Toggle Auto Rotate
  const toggleAutoRotate = () => {
    setAutoRotate(prev => {
      const next = !prev;
      if (controlsRef.current) controlsRef.current.autoRotate = next;
      return next;
    });
  };

  // Cycle Simulation Speed
  const cycleSimSpeed = () => {
    const speeds = [1.0, 2.0, 0.0, 0.5];
    const nextIdx = (speeds.indexOf(simSpeed) + 1) % speeds.length;
    setSimSpeed(speeds[nextIdx]);
  };

  // Reset Camera View
  const resetCamera = () => {
    if (cameraRef.current && controlsRef.current) {
      targetLookAt.current.set(0, 0, 0);
      targetCamPos.current.set(0, 0.4, 4.0);
      isTransitioningCam.current = true;
      onSelectComponent(null);
    }
  };

  return (
    <div 
      className={`heart-viewer-wrapper ${fullscreen ? 'viewer-fullscreen-active' : ''}`} 
      ref={containerRef}
      style={fullscreen ? {
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        width: '100vw',
        height: '100vh',
        borderRadius: 0
      } : {}}
    >
      {loading && (
        <div className="viewer-loading-overlay">
          <div className="viewer-spinner"></div>
          <span className="viewer-loading-text">Rendering 3D Spatial {title}…</span>
        </div>
      )}

      {/* Background Spatial Grid Overlay */}
      <div className="viewer-grid-overlay" />

      {/* Three.js Canvas */}
      <div className="heart-canvas-container">
        <canvas ref={canvasRef} className="heart-three-canvas" />

        {/* 3D Hotspot Screen Pins */}
        {hotspotPositions.map(pin => {
          const isSelected = activeComponent === pin.id;
          return (
            <div
              key={pin.id}
              className={`chamber-hotspot ${isSelected ? 'active' : ''}`}
              style={{
                left: `${pin.x}px`,
                top: `${pin.y}px`,
                display: pin.x < 10 || pin.x > (containerRef.current?.clientWidth - 10) ? 'none' : 'flex'
              }}
              onClick={() => onSelectComponent(isSelected ? null : pin.id)}
            >
              <span className="chamber-hotspot-label">{pin.name}</span>
              <div 
                className="chamber-hotspot-pin" 
                style={{ backgroundColor: pin.color, boxShadow: `0 0 10px ${pin.color}` }}
              />
            </div>
          );
        })}
      </div>

      {/* Top Left: Topic & Model Identity Pill */}
      <div className="viewer-model-pill" title="Active 3D Spatial Learning Lab">
        <span className="pill-dot" />
        <span>{topicData.system}</span>
        <span style={{ opacity: 0.5 }}>•</span>
        <span style={{ color: '#a5b4fc' }}>{topicData.renderBadge}</span>
      </div>

      {/* Top Right: Advanced 3D Lab Tools Bar */}
      <div className="viewer-top-controls">
        {/* Simulation Speed */}
        <button
          className="viewer-control-btn"
          onClick={cycleSimSpeed}
          title="Toggle Simulation Speed"
        >
          <Gauge size={14} />
          <span>{simSpeed === 0 ? 'Paused' : `${simSpeed}x Speed`}</span>
        </button>

        {/* Wireframe Mode */}
        <button
          className={`viewer-control-btn ${wireframe ? 'active' : ''}`}
          onClick={toggleWireframe}
          title="Toggle X-Ray Wireframe Mode"
        >
          <Layers size={14} />
          <span>{wireframe ? 'Solid' : 'Wireframe'}</span>
        </button>

        {/* Dissect / Explode */}
        <button
          className={`viewer-control-btn ${exploded ? 'active' : ''}`}
          onClick={toggleExplode}
          title="Toggle Exploded Dissection View"
        >
          <Crosshair size={14} />
          <span>{exploded ? 'Assembled' : 'Dissect'}</span>
        </button>

        {/* Auto Rotate */}
        <button
          className={`viewer-control-btn ${autoRotate ? 'active' : ''}`}
          onClick={toggleAutoRotate}
          title={autoRotate ? 'Pause Rotation' : 'Auto Rotate'}
        >
          {autoRotate ? <Pause size={14} /> : <Play size={14} />}
        </button>

        {/* Reset Camera */}
        <button
          className="viewer-control-btn"
          onClick={resetCamera}
          title="Reset 3D Camera"
        >
          <RotateCcw size={14} />
          <span>Reset</span>
        </button>

        {/* Fullscreen Toggle */}
        <button
          className="viewer-control-btn"
          onClick={() => setFullscreen(!fullscreen)}
          title={fullscreen ? 'Exit Fullscreen' : 'Fullscreen 3D Lab'}
        >
          {fullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
        </button>
      </div>

      {/* Hovered Component Tooltip (When Cursor Over 3D Mesh) */}
      {hoveredName && (
        <div style={{
          position: 'absolute',
          top: '54px',
          left: '14px',
          zIndex: 6,
          background: 'rgba(15, 23, 42, 0.9)',
          border: '1px solid #6366f1',
          padding: '4px 10px',
          borderRadius: '6px',
          fontSize: '0.75rem',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          boxShadow: '0 0 12px rgba(99, 102, 241, 0.5)'
        }}>
          <Sparkles size={12} color="#a5b4fc" />
          <span>Inspecting: <strong>{hoveredName}</strong></span>
        </div>
      )}

      {/* Quick Telemetry Mini-Strip (Top right under controls) */}
      {topicData.telemetry && (
        <div style={{
          position: 'absolute',
          top: '54px',
          right: '12px',
          zIndex: 4,
          display: 'flex',
          gap: '6px',
          flexWrap: 'wrap',
          maxWidth: '380px',
          justifyContent: 'flex-end',
          pointerEvents: 'none'
        }}>
          {topicData.telemetry.slice(0, 2).map((item, idx) => (
            <div key={idx} style={{
              background: 'rgba(15, 23, 42, 0.75)',
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '6px',
              padding: '3px 8px',
              fontSize: '0.7rem',
              color: '#cbd5e1'
            }}>
              <span style={{ color: '#94a3b8', marginRight: '4px' }}>{item.label}:</span>
              <strong style={{ color: '#38bdf8' }}>{item.value}</strong>
            </div>
          ))}
        </div>
      )}

      {/* Bottom Component Selector Bar */}
      {componentsList.length > 0 && (
        <div className="viewer-chamber-selector">
          {componentsList.map(comp => {
            const isSelected = activeComponent === comp.id;
            return (
              <button
                key={comp.id}
                className={`chamber-chip-btn ${isSelected ? 'active' : ''}`}
                onClick={() => onSelectComponent(isSelected ? null : comp.id)}
                title={`Focus on ${comp.name}`}
              >
                <span 
                  className="chamber-color-indicator" 
                  style={{ backgroundColor: comp.color, boxShadow: `0 0 6px ${comp.color}` }}
                />
                <span>{comp.name}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Help text footer */}
      <div className="viewer-interaction-hint">
        <span>Drag to rotate 360° • Pinch / Scroll to zoom • Click any pin or chip to isolate component</span>
      </div>
    </div>
  );
}
