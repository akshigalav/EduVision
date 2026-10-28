import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RotateCw, ZoomIn, ZoomOut, RotateCcw, Play, Pause, Sparkles, Eye } from 'lucide-react';
import { createOrgan3DModel } from '../utils/organ3DModels';
import './HeartModelViewer.css';

export default function GeneralOrganViewer({ topicId, title }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const organRef = useRef(null);
  const animationFrameId = useRef(null);

  const [autoRotate, setAutoRotate] = useState(true);
  const [loading, setLoading] = useState(true);

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
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;

    // 4. OrbitControls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 1.6;
    controls.maxDistance = 8.0;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 1.4;
    controlsRef.current = controls;

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.2);
    dirLight1.position.set(5, 8, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 1.0);
    dirLight2.position.set(-5, -2, -4);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xa855f7, 2.0, 10);
    pointLight.position.set(0, 3, 2);
    scene.add(pointLight);

    // 6. Build Organ 3D Model
    const organHelper = createOrgan3DModel(topicId, {
      scale: 1.0,
      onLoaded: () => setLoading(false)
    });
    scene.add(organHelper.group);
    organRef.current = organHelper;
    setLoading(false);

    // 7. Render Loop
    const startTime = performance.now();
    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startTime) * 0.001;

      if (controlsRef.current) {
        controlsRef.current.update();
      }

      if (organRef.current && organRef.current.updatePulse) {
        organRef.current.updatePulse(elapsed);
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
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      renderer.dispose();
    };
  }, [topicId]);

  // Toggle Auto Rotate
  const toggleAutoRotate = () => {
    setAutoRotate(prev => {
      const next = !prev;
      if (controlsRef.current) controlsRef.current.autoRotate = next;
      return next;
    });
  };

  const resetCamera = () => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(0, 0.4, 4.0);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  };

  return (
    <div className="heart-viewer-wrapper" ref={containerRef}>
      {loading && (
        <div className="viewer-loading-overlay">
          <div className="spinner"></div>
          <span>Rendering High-Fidelity 3D {title}…</span>
        </div>
      )}

      <canvas ref={canvasRef} className="heart-viewer-canvas" />

      {/* Floating Controls Overlay */}
      <div className="viewer-controls-overlay">
        <button
          className={`control-circle-btn ${autoRotate ? 'active' : ''}`}
          onClick={toggleAutoRotate}
          title={autoRotate ? 'Pause Rotation' : 'Auto Rotate'}
        >
          {autoRotate ? <Pause size={17} /> : <Play size={17} />}
        </button>

        <button
          className="control-circle-btn"
          onClick={resetCamera}
          title="Reset View"
        >
          <RotateCcw size={17} />
        </button>
      </div>

      <div className="viewer-model-pill" title="Ultra-Realistic 3D Organ Visualization">
        <Sparkles size={14} />
        <span>3D Spatial Medical Render</span>
      </div>

      <div className="viewer-hint-bar">
        <span>Drag to rotate 360° • Pinch / Scroll to zoom • Interactive 3D Anatomy</span>
      </div>
    </div>
  );
}
