import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Play, 
  Pause, 
  Check, 
  Info,
  Maximize2
} from 'lucide-react';
import { CHAMBER_DATA } from '../data/heartData';
import { createRealisticHeartModel } from '../utils/organ3DModels';
import './HeartModelViewer.css';

export default function HeartModelViewer({ activeChamber, onSelectChamber }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Three.js instance references
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const heartGroupRef = useRef(null);
  const chamberMeshesRef = useRef({});
  const animationFrameId = useRef(null);

  // Camera target animation state
  const targetCameraPos = useRef(new THREE.Vector3(0, 0.3, 4.2));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  // Component UI state
  const [loading, setLoading] = useState(true);
  const [modelType, setModelType] = useState('placeholder'); // 'glb' or 'placeholder'
  const [autoRotate, setAutoRotate] = useState(true);
  const [hotspotCoords, setHotspotCoords] = useState({});

  // Default camera configuration
  const DEFAULT_CAM_POS = new THREE.Vector3(0, 0.3, 4.2);
  const DEFAULT_LOOK_AT = new THREE.Vector3(0, 0, 0);

  // Setup Three.js Scene
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
    camera.position.copy(DEFAULT_CAM_POS);
    cameraRef.current = camera;

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    rendererRef.current = renderer;

    // 4. OrbitControls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 1.8;
    controls.maxDistance = 8.5;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 1.2;
    controls.target.copy(DEFAULT_LOOK_AT);
    controlsRef.current = controls;

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(5, 8, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x93c5fd, 1.0);
    fillLight.position.set(-5, 2, -4);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xf43f5e, 2.5, 12);
    rimLight.position.set(0, -3, 3);
    scene.add(rimLight);

    // Root Group for the heart model
    const heartGroup = new THREE.Group();
    scene.add(heartGroup);
    heartGroupRef.current = heartGroup;

    // Helper: Build ultra-realistic sculpted anatomical 3D heart
    const buildProceduralHeart = () => {
      const realisticHeart = createRealisticHeartModel(1.0);
      heartGroup.add(realisticHeart.group);
      chamberMeshesRef.current = realisticHeart.chambers;
    };

    // 6. Attempt to load GLB/GLTF from /models/heart.glb
    const loader = new GLTFLoader();
    const modelUrl = '/models/heart.glb';

    loader.load(
      modelUrl,
      (gltf) => {
        // Success: Use custom GLB model
        const loadedModel = gltf.scene;
        
        // Auto-scale & center bounding box
        const box = new THREE.Box3().setFromObject(loadedModel);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.4 / (maxDim || 1);
        
        loadedModel.scale.setScalar(scale);
        loadedModel.position.sub(center.multiplyScalar(scale));
        
        heartGroup.add(loadedModel);
        setModelType('glb');
        setLoading(false);
      },
      undefined,
      () => {
        // Fallback: Build procedural anatomical 3D heart placeholder
        buildProceduralHeart();
        setModelType('placeholder');
        setLoading(false);
      }
    );

    // 7. Animation Loop with Lub-Dub Pulsing & Hotspot Tracking
    const startTime = performance.now();

    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);

      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Smooth camera position interpolation
      if (cameraRef.current) {
        cameraRef.current.position.lerp(targetCameraPos.current, 0.06);
      }
      if (controlsRef.current) {
        controlsRef.current.target.lerp(targetLookAt.current, 0.06);
        controlsRef.current.update();
      }

      // Cardiac lub-dub rhythmic pulsation
      if (heartGroupRef.current) {
        // Double beat simulation (atrial systole then ventricular systole)
        const cycle = (elapsedTime * 1.2) % 1;
        let pulse = 0;
        if (cycle < 0.15) {
          pulse = Math.sin((cycle / 0.15) * Math.PI) * 0.045; // First beat (Lub)
        } else if (cycle >= 0.2 && cycle < 0.35) {
          pulse = Math.sin(((cycle - 0.2) / 0.15) * Math.PI) * 0.035; // Second beat (Dub)
        }
        
        const scaleVal = 1.0 + pulse;
        heartGroupRef.current.scale.set(scaleVal, scaleVal, scaleVal);
      }

      // Project 3D Chamber Anchors onto 2D Screen Space
      if (cameraRef.current && containerRef.current) {
        const contRect = containerRef.current.getBoundingClientRect();
        const coords = {};

        CHAMBER_DATA.forEach(chamber => {
          const v = new THREE.Vector3(...chamber.position);
          
          // Apply heart group transformation
          if (heartGroupRef.current) {
            v.applyMatrix4(heartGroupRef.current.matrixWorld);
          }
          
          // Project to normalized device coordinates (-1 to +1)
          v.project(cameraRef.current);

          // Check if anchor is in front of camera
          const isFront = v.z < 1.0;
          const x = (v.x * 0.5 + 0.5) * contRect.width;
          const y = (-(v.y * 0.5) + 0.5) * contRect.height;

          coords[chamber.id] = {
            x,
            y,
            visible: isFront && x >= 30 && x <= contRect.width - 30 && y >= 30 && y <= contRect.height - 40
          };
        });

        setHotspotCoords(coords);
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    // 8. Responsive Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;

      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Cleanup on unmount
    return () => {
      resizeObserver.disconnect();
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  // Update Auto-Rotate in Controls
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
    }
  }, [autoRotate]);

  // Update Highlight & Camera Focus on Chamber Select
  useEffect(() => {
    // 1. Highlight selected mesh
    const meshes = chamberMeshesRef.current;
    Object.keys(meshes).forEach(id => {
      const mesh = meshes[id];
      if (!mesh || !mesh.material) return;
      
      if (activeChamber && id === activeChamber) {
        mesh.material.emissiveIntensity = 0.5;
      } else {
        mesh.material.emissiveIntensity = 0.08;
      }
    });

    // 2. Camera focus
    if (activeChamber) {
      const found = CHAMBER_DATA.find(c => c.id === activeChamber);
      if (found) {
        targetCameraPos.current.set(found.cameraFocus.x, found.cameraFocus.y, found.cameraFocus.z);
        targetLookAt.current.set(found.position[0] * 0.4, found.position[1] * 0.4, found.position[2] * 0.4);
        setAutoRotate(false);
      }
    }
  }, [activeChamber]);

  // User Actions: Zoom In
  const handleZoomIn = useCallback(() => {
    if (!cameraRef.current) return;
    const dir = new THREE.Vector3();
    cameraRef.current.getWorldDirection(dir);
    cameraRef.current.position.addScaledVector(dir, 0.6);
    targetCameraPos.current.copy(cameraRef.current.position);
  }, []);

  // User Actions: Zoom Out
  const handleZoomOut = useCallback(() => {
    if (!cameraRef.current) return;
    const dir = new THREE.Vector3();
    cameraRef.current.getWorldDirection(dir);
    cameraRef.current.position.addScaledVector(dir, -0.6);
    targetCameraPos.current.copy(cameraRef.current.position);
  }, []);

  // User Actions: Reset Camera
  const handleResetCamera = useCallback(() => {
    targetCameraPos.current.copy(DEFAULT_CAM_POS);
    targetLookAt.current.copy(DEFAULT_LOOK_AT);
    setAutoRotate(true);
    if (onSelectChamber) {
      onSelectChamber(null);
    }
  }, [onSelectChamber]);

  const toggleAutoRotate = () => {
    setAutoRotate(prev => !prev);
  };

  return (
    <div className="heart-viewer-wrapper" ref={containerRef}>
      {/* 3D Canvas */}
      <div className="heart-canvas-container">
        <canvas ref={canvasRef} className="heart-three-canvas" />
        <div className="viewer-grid-overlay" />
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="viewer-loading-overlay">
          <div className="viewer-spinner" />
          <span className="viewer-loading-text">Initializing Three.js WebGL Engine...</span>
        </div>
      )}

      {/* Model Status Pill (Top Left) */}
      <div className="viewer-model-pill" title={modelType === 'glb' ? 'Loaded from public/models/heart.glb' : 'Using Three.js Anatomical Heart. Add heart.glb to public/models/ to replace.'}>
        <span className={`pill-dot ${modelType === 'placeholder' ? 'placeholder' : ''}`} />
        <span>{modelType === 'glb' ? 'GLB Model Loaded' : 'Procedural 3D Heart'}</span>
      </div>

      {/* Viewport Control Tools (Top Right) */}
      <div className="viewer-top-controls">
        <button 
          className={`viewer-control-btn ${autoRotate ? 'active' : ''}`}
          onClick={toggleAutoRotate}
          title={autoRotate ? 'Pause 360° Rotation' : 'Enable 360° Rotation'}
        >
          {autoRotate ? <Pause size={13} /> : <Play size={13} />}
          <span>{autoRotate ? 'Rotating' : 'Rotate'}</span>
        </button>

        <button 
          className="viewer-control-btn"
          onClick={handleZoomIn}
          title="Zoom In (+)"
        >
          <ZoomIn size={13} />
        </button>

        <button 
          className="viewer-control-btn"
          onClick={handleZoomOut}
          title="Zoom Out (-)"
        >
          <ZoomOut size={13} />
        </button>

        <button 
          className="viewer-control-btn"
          onClick={handleResetCamera}
          title="Reset Camera to default viewpoint"
        >
          <RotateCcw size={13} />
          <span>Reset Camera</span>
        </button>
      </div>

      {/* 3D Pin Hotspots over each Chamber */}
      {CHAMBER_DATA.map(chamber => {
        const coords = hotspotCoords[chamber.id];
        if (!coords || !coords.visible) return null;
        const isSelected = activeChamber === chamber.id;

        return (
          <div
            key={chamber.id}
            className={`chamber-hotspot ${isSelected ? 'active' : ''}`}
            style={{
              left: `${coords.x}px`,
              top: `${coords.y}px`
            }}
            onClick={() => onSelectChamber && onSelectChamber(chamber.id)}
            title={`Click to inspect ${chamber.name}`}
          >
            <span className="chamber-hotspot-label">{chamber.shortName}</span>
            <div className={`chamber-hotspot-pin ${!chamber.oxygenated ? 'deox' : ''}`} />
          </div>
        );
      })}

      {/* Interaction Hint */}
      <div className="viewer-interaction-hint">
        Drag to rotate • Scroll to zoom • Click a chamber pin to inspect
      </div>

      {/* Bottom Chamber Selector Filter Bar */}
      <div className="viewer-chamber-selector">
        {CHAMBER_DATA.map(chamber => {
          const isSelected = activeChamber === chamber.id;
          return (
            <button
              key={chamber.id}
              className={`chamber-chip-btn ${isSelected ? 'active' : ''}`}
              onClick={() => {
                if (onSelectChamber) {
                  onSelectChamber(isSelected ? null : chamber.id);
                }
              }}
            >
              <span className={`chamber-color-indicator ${chamber.oxygenated ? 'indicator-oxygenated' : 'indicator-deoxygenated'}`} />
              <span>{chamber.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
