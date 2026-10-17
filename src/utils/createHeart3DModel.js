import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

/**
 * Creates an anatomical 3D heart group for Three.js / MindAR scenes.
 * Either loads a custom GLB model from /models/heart.glb, or builds
 * the procedural 4-chamber anatomical heart model with vascular arches.
 */
export function createHeart3DModel(options = {}) {
  const { 
    scale = 1.0, 
    onLoaded = null,
    enablePulse = true 
  } = options;

  const heartRoot = new THREE.Group();
  heartRoot.name = 'heartRootGroup';

  // Procedural 4-Chamber Anatomical Heart Construction
  const buildProcedural = () => {
    const proceduralGroup = new THREE.Group();

    const createMat = (hex, roughness = 0.35) => {
      return new THREE.MeshStandardMaterial({
        color: new THREE.Color(hex),
        roughness,
        metalness: 0.1,
        emissive: new THREE.Color(hex),
        emissiveIntensity: 0.1
      });
    };

    // 1. Left Ventricle (Apex cone / oval)
    const lvGeo = new THREE.SphereGeometry(0.72, 32, 32);
    lvGeo.scale(0.8, 1.2, 0.85);
    const lvMesh = new THREE.Mesh(lvGeo, createMat(0xef4444));
    lvMesh.position.set(0.35, -0.45, 0.15);
    lvMesh.rotation.z = -0.22;
    lvMesh.name = 'left-ventricle';
    proceduralGroup.add(lvMesh);

    // 2. Right Ventricle
    const rvGeo = new THREE.SphereGeometry(0.64, 32, 32);
    rvGeo.scale(0.85, 1.05, 0.8);
    const rvMesh = new THREE.Mesh(rvGeo, createMat(0x3b82f6));
    rvMesh.position.set(-0.45, -0.35, 0.35);
    rvMesh.rotation.z = 0.18;
    rvMesh.name = 'right-ventricle';
    proceduralGroup.add(rvMesh);

    // 3. Left Atrium
    const laGeo = new THREE.SphereGeometry(0.52, 28, 28);
    laGeo.scale(0.9, 0.8, 0.95);
    const laMesh = new THREE.Mesh(laGeo, createMat(0xdc2626));
    laMesh.position.set(0.48, 0.42, -0.15);
    laMesh.name = 'left-atrium';
    proceduralGroup.add(laMesh);

    // 4. Right Atrium
    const raGeo = new THREE.SphereGeometry(0.56, 28, 28);
    raGeo.scale(0.95, 0.85, 0.9);
    const raMesh = new THREE.Mesh(raGeo, createMat(0x2563eb));
    raMesh.position.set(-0.55, 0.38, 0.2);
    raMesh.name = 'right-atrium';
    proceduralGroup.add(raMesh);

    // 5. Aorta
    const aortaCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.15, 0.3, 0.05),
      new THREE.Vector3(0.1, 0.9, 0.1),
      new THREE.Vector3(-0.05, 1.25, 0.0),
      new THREE.Vector3(-0.4, 1.15, -0.2),
      new THREE.Vector3(-0.5, 0.7, -0.3)
    ]);
    const aortaGeo = new THREE.TubeGeometry(aortaCurve, 24, 0.18, 16, false);
    const aortaMat = new THREE.MeshStandardMaterial({
      color: 0xf87171,
      roughness: 0.3,
      metalness: 0.15
    });
    const aortaMesh = new THREE.Mesh(aortaGeo, aortaMat);
    proceduralGroup.add(aortaMesh);

    // Arterial branch stumps
    [-0.15, 0.0, 0.15].forEach((xOff, idx) => {
      const branchGeo = new THREE.CylinderGeometry(0.045, 0.05, 0.35, 12);
      const branchMesh = new THREE.Mesh(branchGeo, aortaMat);
      branchMesh.position.set(xOff, 1.35 + (idx === 1 ? 0.05 : 0), -0.05);
      branchMesh.rotation.z = (idx - 1) * -0.15;
      proceduralGroup.add(branchMesh);
    });

    // 6. Superior Vena Cava
    const svcGeo = new THREE.CylinderGeometry(0.14, 0.15, 0.8, 16);
    const svcMat = new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.4 });
    const svcMesh = new THREE.Mesh(svcGeo, svcMat);
    svcMesh.position.set(-0.58, 0.95, 0.1);
    proceduralGroup.add(svcMesh);

    // 7. Pulmonary Artery Trunk
    const paCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.2, 0.1, 0.45),
      new THREE.Vector3(-0.1, 0.55, 0.3),
      new THREE.Vector3(0.2, 0.75, 0.05),
      new THREE.Vector3(0.45, 0.8, -0.25)
    ]);
    const paGeo = new THREE.TubeGeometry(paCurve, 20, 0.16, 16, false);
    const paMat = new THREE.MeshStandardMaterial({ color: 0x6366f1, roughness: 0.35 });
    const paMesh = new THREE.Mesh(paGeo, paMat);
    proceduralGroup.add(paMesh);

    // Scale and angle
    proceduralGroup.scale.setScalar(scale);
    proceduralGroup.rotation.y = 0.25;
    proceduralGroup.rotation.x = 0.15;

    heartRoot.add(proceduralGroup);

    if (onLoaded) {
      onLoaded({ type: 'procedural', root: heartRoot });
    }
  };

  // Try loading GLB first
  const loader = new GLTFLoader();
  loader.load(
    '/models/heart.glb',
    (gltf) => {
      const model = gltf.scene;
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const s = (2.2 / (maxDim || 1)) * scale;

      model.scale.setScalar(s);
      model.position.sub(center.multiplyScalar(s));
      heartRoot.add(model);

      if (onLoaded) {
        onLoaded({ type: 'glb', root: heartRoot });
      }
    },
    undefined,
    () => {
      // Fallback
      buildProcedural();
    }
  );

  return {
    group: heartRoot,
    updatePulse: (elapsedTime) => {
      if (!enablePulse) return;
      const cycle = (elapsedTime * 1.2) % 1;
      let pulse = 0;
      if (cycle < 0.15) {
        pulse = Math.sin((cycle / 0.15) * Math.PI) * 0.05;
      } else if (cycle >= 0.2 && cycle < 0.35) {
        pulse = Math.sin(((cycle - 0.2) / 0.15) * Math.PI) * 0.035;
      }
      const s = 1.0 + pulse;
      heartRoot.scale.set(s, s, s);
    }
  };
}
