import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { createRealisticHeartModel } from './organ3DModels';

/**
 * Creates an ultra-realistic anatomical 3D heart group for Three.js / MindAR scenes.
 * Either loads a custom GLB model from /models/heart.glb, or builds
 * the realistic sculpted anatomical heart with coronary vasculature and PBR materials.
 */
export function createHeart3DModel(options = {}) {
  const { 
    scale = 1.0, 
    onLoaded = null,
    enablePulse = true 
  } = options;

  const heartRoot = new THREE.Group();
  heartRoot.name = 'heartRootGroup';

  const realisticHeart = createRealisticHeartModel(scale);
  heartRoot.add(realisticHeart.group);

  // Try loading GLB first if user placed heart.glb
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

      heartRoot.remove(realisticHeart.group);
      heartRoot.add(model);

      if (onLoaded) {
        onLoaded({ type: 'glb', root: heartRoot });
      }
    },
    undefined,
    () => {
      if (onLoaded) {
        onLoaded({ type: 'procedural-realistic', root: heartRoot });
      }
    }
  );

  return {
    group: heartRoot,
    updatePulse: (elapsedTime) => {
      if (!enablePulse) return;
      realisticHeart.updatePulse(elapsedTime);
    }
  };
}
