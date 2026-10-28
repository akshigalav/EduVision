import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

/**
 * Creates procedural organic textures for realistic anatomical tissue shading.
 */
function createMyocardiumTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Base muscular gradient
  const grad = ctx.createRadialGradient(256, 256, 10, 256, 256, 256);
  grad.addColorStop(0, '#a82028');
  grad.addColorStop(0.5, '#85161c');
  grad.addColorStop(1, '#5c0d12');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  // Muscular striations and fibrous bands
  ctx.strokeStyle = 'rgba(239, 68, 68, 0.18)';
  ctx.lineWidth = 1.5;
  for (let i = 0; i < 200; i++) {
    ctx.beginPath();
    const y = Math.random() * 512;
    ctx.moveTo(0, y);
    ctx.bezierCurveTo(
      170, y + (Math.random() - 0.5) * 40,
      340, y + (Math.random() - 0.5) * 40,
      512, y
    );
    ctx.stroke();
  }

  // Micro-capillaries / fine blood vessels
  ctx.strokeStyle = 'rgba(255, 100, 100, 0.25)';
  ctx.lineWidth = 0.8;
  for (let i = 0; i < 80; i++) {
    ctx.beginPath();
    let x = Math.random() * 512;
    let y = Math.random() * 512;
    ctx.moveTo(x, y);
    for (let s = 0; s < 4; s++) {
      x += (Math.random() - 0.5) * 35;
      y += (Math.random() - 0.5) * 35;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

function createBrainTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#c9b1a5';
  ctx.fillRect(0, 0, 512, 512);

  // Cortical sulcal fissures
  ctx.strokeStyle = 'rgba(92, 64, 53, 0.25)';
  ctx.lineWidth = 3;
  for (let i = 0; i < 90; i++) {
    ctx.beginPath();
    let x = Math.random() * 512;
    let y = Math.random() * 512;
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(
      x + (Math.random() - 0.5) * 80, y + (Math.random() - 0.5) * 80,
      x + (Math.random() - 0.5) * 80, y + (Math.random() - 0.5) * 80,
      x + (Math.random() - 0.5) * 80, y + (Math.random() - 0.5) * 80
    );
    ctx.stroke();
  }

  // Pia mater micro-vessels
  ctx.strokeStyle = 'rgba(180, 40, 40, 0.35)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 60; i++) {
    ctx.beginPath();
    let x = Math.random() * 512;
    let y = Math.random() * 512;
    ctx.moveTo(x, y);
    ctx.lineTo(x + (Math.random() - 0.5) * 40, y + (Math.random() - 0.5) * 40);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

/**
 * 1. Ultra-Realistic Anatomical Human Heart
 */
export function createRealisticHeartModel(scale = 1.0) {
  const heartGroup = new THREE.Group();
  heartGroup.name = 'realisticHeartGroup';

  const myoTexture = createMyocardiumTexture();

  // Premium anatomical materials
  const lvMat = new THREE.MeshStandardMaterial({
    color: 0x9e1a22,
    map: myoTexture,
    roughness: 0.32,
    metalness: 0.08,
    bumpMap: myoTexture,
    bumpScale: 0.03,
  });

  const rvMat = new THREE.MeshStandardMaterial({
    color: 0x8a1820,
    map: myoTexture,
    roughness: 0.35,
    metalness: 0.08,
    bumpMap: myoTexture,
    bumpScale: 0.02,
  });

  const laMat = new THREE.MeshStandardMaterial({
    color: 0xb5222c,
    map: myoTexture,
    roughness: 0.38,
    metalness: 0.05,
  });

  const raMat = new THREE.MeshStandardMaterial({
    color: 0x7c1f26,
    map: myoTexture,
    roughness: 0.4,
    metalness: 0.05,
  });

  const aortaMat = new THREE.MeshStandardMaterial({
    color: 0xd9383a,
    roughness: 0.28,
    metalness: 0.12,
  });

  const venaCavaMat = new THREE.MeshStandardMaterial({
    color: 0x224488,
    roughness: 0.35,
    metalness: 0.1,
  });

  const pulmonaryMat = new THREE.MeshStandardMaterial({
    color: 0x3b5998,
    roughness: 0.32,
    metalness: 0.1,
  });

  const fatPadMat = new THREE.MeshStandardMaterial({
    color: 0xd4c28d, // Epicardial adipose fat tissue
    roughness: 0.7,
    metalness: 0.02,
  });

  const arteryMat = new THREE.MeshStandardMaterial({
    color: 0xef233c,
    roughness: 0.2,
    metalness: 0.15,
  });

  const veinMat = new THREE.MeshStandardMaterial({
    color: 0x2b6cb0,
    roughness: 0.2,
    metalness: 0.15,
  });

  // Ventricular Myocardium Cone (Anatomical Apex)
  // Left Ventricle (apex, thick myocardium)
  const lvGeo = new THREE.SphereGeometry(0.78, 36, 36);
  // Deform geometry into asymmetrical anatomical apex
  const pos = lvGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);
    if (y < 0) {
      // Taper toward pointed cardiac apex
      const taper = 1.0 + y * 0.42;
      pos.setX(i, pos.getX(i) * taper * 0.85);
      pos.setZ(i, pos.getZ(i) * taper * 0.85);
    }
  }
  lvGeo.computeVertexNormals();
  lvGeo.scale(0.88, 1.25, 0.82);

  const lvMesh = new THREE.Mesh(lvGeo, lvMat);
  lvMesh.position.set(0.28, -0.42, 0.12);
  lvMesh.rotation.set(0.1, 0, -0.22);
  lvMesh.name = 'left-ventricle';
  heartGroup.add(lvMesh);

  // Right Ventricle (crescent wraparound anterior-lateral)
  const rvGeo = new THREE.SphereGeometry(0.68, 32, 32);
  rvGeo.scale(0.82, 1.1, 0.75);
  const rvMesh = new THREE.Mesh(rvGeo, rvMat);
  rvMesh.position.set(-0.42, -0.32, 0.32);
  rvMesh.rotation.set(-0.08, 0.15, 0.16);
  rvMesh.name = 'right-ventricle';
  heartGroup.add(rvMesh);

  // Left Atrium & Auricle
  const laGeo = new THREE.SphereGeometry(0.55, 30, 30);
  laGeo.scale(0.92, 0.85, 0.96);
  const laMesh = new THREE.Mesh(laGeo, laMat);
  laMesh.position.set(0.44, 0.42, -0.18);
  laMesh.name = 'left-atrium';
  heartGroup.add(laMesh);

  // Right Atrium & Auricle
  const raGeo = new THREE.SphereGeometry(0.58, 30, 30);
  raGeo.scale(0.96, 0.88, 0.9);
  const raMesh = new THREE.Mesh(raGeo, raMat);
  raMesh.position.set(-0.52, 0.38, 0.18);
  raMesh.name = 'right-atrium';
  heartGroup.add(raMesh);

  // Interventricular Sulcus Fat Pads
  const fatCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.05, 0.2, 0.45),
    new THREE.Vector3(-0.02, -0.15, 0.48),
    new THREE.Vector3(0.08, -0.55, 0.38),
    new THREE.Vector3(0.22, -0.92, 0.22)
  ]);
  const fatGeo = new THREE.TubeGeometry(fatCurve, 20, 0.08, 12, false);
  const fatMesh = new THREE.Mesh(fatGeo, fatPadMat);
  heartGroup.add(fatMesh);

  // Coronary Arteries (Left Anterior Descending - LAD)
  const ladCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.02, 0.25, 0.47),
    new THREE.Vector3(0.02, -0.1, 0.51),
    new THREE.Vector3(0.12, -0.5, 0.41),
    new THREE.Vector3(0.24, -0.88, 0.24)
  ]);
  const ladGeo = new THREE.TubeGeometry(ladCurve, 24, 0.035, 10, false);
  const ladMesh = new THREE.Mesh(ladGeo, arteryMat);
  heartGroup.add(ladMesh);

  // Diagonal arterial micro-branches
  [
    { from: new THREE.Vector3(0.02, -0.1, 0.51), to: new THREE.Vector3(0.28, -0.22, 0.42) },
    { from: new THREE.Vector3(0.12, -0.5, 0.41), to: new THREE.Vector3(0.35, -0.62, 0.32) },
    { from: new THREE.Vector3(0.02, -0.1, 0.51), to: new THREE.Vector3(-0.25, -0.25, 0.48) }
  ].forEach(branch => {
    const bCurve = new THREE.CatmullRomCurve3([branch.from, branch.to]);
    const bGeo = new THREE.TubeGeometry(bCurve, 8, 0.02, 8, false);
    heartGroup.add(new THREE.Mesh(bGeo, arteryMat));
  });

  // Great Cardiac Vein (accompanying LAD)
  const gcvCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.08, 0.22, 0.46),
    new THREE.Vector3(-0.03, -0.12, 0.49),
    new THREE.Vector3(0.06, -0.48, 0.4),
    new THREE.Vector3(0.18, -0.82, 0.24)
  ]);
  const gcvGeo = new THREE.TubeGeometry(gcvCurve, 20, 0.028, 8, false);
  const gcvMesh = new THREE.Mesh(gcvGeo, veinMat);
  heartGroup.add(gcvMesh);

  // Aortic Arch with realistic anatomical curve
  const aortaCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.1, 0.2, 0.08),
    new THREE.Vector3(0.08, 0.75, 0.12),
    new THREE.Vector3(-0.06, 1.22, 0.02),
    new THREE.Vector3(-0.42, 1.15, -0.22),
    new THREE.Vector3(-0.52, 0.65, -0.32)
  ]);
  const aortaGeo = new THREE.TubeGeometry(aortaCurve, 32, 0.19, 20, false);
  const aortaMesh = new THREE.Mesh(aortaGeo, aortaMat);
  heartGroup.add(aortaMesh);

  // Three Great Arch Branches (Brachiocephalic, Common Carotid, Subclavian)
  const branches = [
    { pos: new THREE.Vector3(-0.24, 1.25, -0.12), rot: 0.18 },
    { pos: new THREE.Vector3(-0.06, 1.28, 0.02), rot: 0.0 },
    { pos: new THREE.Vector3(0.12, 1.22, 0.1), rot: -0.18 },
  ];
  branches.forEach(b => {
    const bGeo = new THREE.CylinderGeometry(0.05, 0.058, 0.42, 16);
    const bMesh = new THREE.Mesh(bGeo, aortaMat);
    bMesh.position.copy(b.pos);
    bMesh.position.y += 0.18;
    bMesh.rotation.z = b.rot;
    heartGroup.add(bMesh);
  });

  // Superior Vena Cava
  const svcGeo = new THREE.CylinderGeometry(0.15, 0.16, 0.85, 20);
  const svcMesh = new THREE.Mesh(svcGeo, venaCavaMat);
  svcMesh.position.set(-0.58, 0.98, 0.08);
  heartGroup.add(svcMesh);

  // Inferior Vena Cava
  const ivcGeo = new THREE.CylinderGeometry(0.14, 0.15, 0.55, 18);
  const ivcMesh = new THREE.Mesh(ivcGeo, venaCavaMat);
  ivcMesh.position.set(-0.54, -0.75, -0.05);
  heartGroup.add(ivcMesh);

  // Pulmonary Trunk & Bifurcation
  const paCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.18, 0.15, 0.42),
    new THREE.Vector3(-0.12, 0.6, 0.32),
    new THREE.Vector3(0.15, 0.82, 0.05),
    new THREE.Vector3(0.48, 0.85, -0.22)
  ]);
  const paGeo = new THREE.TubeGeometry(paCurve, 24, 0.17, 18, false);
  const paMesh = new THREE.Mesh(paGeo, pulmonaryMat);
  heartGroup.add(paMesh);

  // Left Pulmonary Artery Branch
  const lpaCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.15, 0.82, 0.05),
    new THREE.Vector3(-0.35, 0.82, -0.28)
  ]);
  const lpaGeo = new THREE.TubeGeometry(lpaCurve, 12, 0.12, 14, false);
  heartGroup.add(new THREE.Mesh(lpaGeo, pulmonaryMat));

  // 4 Pulmonary Veins (entering Left Atrium)
  [
    new THREE.Vector3(0.68, 0.52, -0.28),
    new THREE.Vector3(0.68, 0.32, -0.28),
    new THREE.Vector3(0.25, 0.52, -0.45),
    new THREE.Vector3(0.25, 0.32, -0.45),
  ].forEach(vPos => {
    const pvGeo = new THREE.CylinderGeometry(0.065, 0.07, 0.3, 14);
    const pvMesh = new THREE.Mesh(pvGeo, aortaMat); // Oxygenated scarlet
    pvMesh.position.copy(vPos);
    pvMesh.rotation.z = Math.PI / 2.5;
    heartGroup.add(pvMesh);
  });

  heartGroup.scale.setScalar(scale);
  heartGroup.rotation.y = 0.25;
  heartGroup.rotation.x = 0.12;

  return {
    group: heartGroup,
    type: 'heart',
    chambers: {
      'left-ventricle': lvMesh,
      'right-ventricle': rvMesh,
      'left-atrium': laMesh,
      'right-atrium': raMesh
    },
    updatePulse: (elapsed) => {
      const cycle = (elapsed * 1.2) % 1;
      let pulse = 0;
      if (cycle < 0.15) {
        pulse = Math.sin((cycle / 0.15) * Math.PI) * 0.055; // Lub
      } else if (cycle >= 0.2 && cycle < 0.35) {
        pulse = Math.sin(((cycle - 0.2) / 0.15) * Math.PI) * 0.04; // Dub
      }
      const s = scale * (1.0 + pulse);
      heartGroup.scale.set(s, s * (1.0 - pulse * 0.4), s);
    }
  };
}

/**
 * 2. Ultra-Realistic Anatomical Human Brain
 */
export function createRealisticBrainModel(scale = 1.0) {
  const brainGroup = new THREE.Group();
  brainGroup.name = 'realisticBrainGroup';

  const brainTex = createBrainTexture();

  const cortexMat = new THREE.MeshStandardMaterial({
    color: 0xdec6bb,
    map: brainTex,
    roughness: 0.38,
    metalness: 0.05,
    bumpMap: brainTex,
    bumpScale: 0.04,
  });

  const cerebellumMat = new THREE.MeshStandardMaterial({
    color: 0xc4aba0,
    roughness: 0.45,
    metalness: 0.05,
  });

  const stemMat = new THREE.MeshStandardMaterial({
    color: 0xecd9cb,
    roughness: 0.35,
    metalness: 0.06,
  });

  // Left Cerebral Hemisphere (sculpted gyri and sulci)
  const leftGeo = new THREE.SphereGeometry(0.85, 40, 40);
  const leftPos = leftGeo.attributes.position;
  for (let i = 0; i < leftPos.count; i++) {
    const x = leftPos.getX(i);
    const y = leftPos.getY(i);
    const z = leftPos.getZ(i);
    // Procedural undulating gyral convolutions
    const gyri = Math.sin(x * 12) * Math.cos(y * 12) * Math.sin(z * 10) * 0.065;
    leftPos.setXYZ(i, x + gyri, y + gyri * 0.8, z + gyri);
  }
  leftGeo.computeVertexNormals();
  leftGeo.scale(0.75, 0.95, 1.25);

  const leftHemi = new THREE.Mesh(leftGeo, cortexMat);
  leftHemi.position.set(-0.46, 0.18, 0);
  leftHemi.name = 'left-hemisphere';
  brainGroup.add(leftHemi);

  // Right Cerebral Hemisphere
  const rightGeo = leftGeo.clone();
  const rightHemi = new THREE.Mesh(rightGeo, cortexMat);
  rightHemi.position.set(0.46, 0.18, 0);
  rightHemi.name = 'right-hemisphere';
  brainGroup.add(rightHemi);

  // Cerebellum (posterior-inferior with folia ridges)
  const cereGeo = new THREE.SphereGeometry(0.55, 32, 32);
  const cerePos = cereGeo.attributes.position;
  for (let i = 0; i < cerePos.count; i++) {
    const y = cerePos.getY(i);
    const folia = Math.sin(y * 35) * 0.025;
    cerePos.setY(i, y + folia);
  }
  cereGeo.computeVertexNormals();
  cereGeo.scale(1.2, 0.65, 0.85);

  const cerebellum = new THREE.Mesh(cereGeo, cerebellumMat);
  cerebellum.position.set(0, -0.45, -0.65);
  cerebellum.name = 'cerebellum';
  brainGroup.add(cerebellum);

  // Brainstem (Pons & Medulla Oblongata)
  const stemCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, -0.2, -0.15),
    new THREE.Vector3(0, -0.6, -0.25),
    new THREE.Vector3(0, -1.15, -0.32)
  ]);
  const stemGeo = new THREE.TubeGeometry(stemCurve, 20, 0.18, 18, false);
  const brainstem = new THREE.Mesh(stemGeo, stemMat);
  brainstem.name = 'brainstem';
  brainGroup.add(brainstem);

  // Neural Synaptic Glow Particles
  const particleGeo = new THREE.BufferGeometry();
  const particleCount = 45;
  const pPos = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = 0.85 + Math.random() * 0.12;
    pPos[i * 3] = (Math.random() > 0.5 ? 0.45 : -0.45) + r * Math.sin(phi) * Math.cos(theta) * 0.6;
    pPos[i * 3 + 1] = 0.18 + r * Math.sin(phi) * Math.sin(theta) * 0.8;
    pPos[i * 3 + 2] = r * Math.cos(phi) * 1.1;
  }
  particleGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0x38bdf8,
    size: 0.06,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  });
  const particles = new THREE.Points(particleGeo, particleMat);
  brainGroup.add(particles);

  brainGroup.scale.setScalar(scale);
  brainGroup.rotation.y = 0.35;

  return {
    group: brainGroup,
    type: 'brain',
    updatePulse: (elapsed) => {
      // Subtle neural respiration and particle flicker
      const pulse = Math.sin(elapsed * 2.5) * 0.015;
      brainGroup.scale.set(scale + pulse, scale + pulse, scale + pulse);
      particleMat.opacity = 0.5 + Math.sin(elapsed * 5.0) * 0.4;
    }
  };
}

/**
 * 3. Ultra-Realistic 3D Plant Cell Cutaway Model
 */
export function createRealisticPlantCellModel(scale = 1.0) {
  const cellGroup = new THREE.Group();
  cellGroup.name = 'realisticPlantCellGroup';

  // 1. Rigid Cellulose Cell Wall (Prismatic cutaway)
  const wallMat = new THREE.MeshStandardMaterial({
    color: 0x84cc16,
    roughness: 0.65,
    metalness: 0.05,
    transparent: true,
    opacity: 0.65,
    side: THREE.DoubleSide
  });

  const wallGeo = new THREE.CylinderGeometry(1.2, 1.25, 0.9, 6, 1, true);
  const wallMesh = new THREE.Mesh(wallGeo, wallMat);
  cellGroup.add(wallMesh);

  // Cytoplasm base plate
  const cytoGeo = new THREE.CylinderGeometry(1.15, 1.15, 0.15, 6);
  const cytoMat = new THREE.MeshStandardMaterial({
    color: 0xa3e635,
    roughness: 0.4,
    metalness: 0.05,
    transparent: true,
    opacity: 0.45
  });
  const cytoMesh = new THREE.Mesh(cytoGeo, cytoMat);
  cytoMesh.position.y = -0.35;
  cellGroup.add(cytoMesh);

  // 2. Large Central Vacuole (luminous turquoise turgor)
  const vacGeo = new THREE.SphereGeometry(0.55, 32, 32);
  vacGeo.scale(1.2, 0.8, 1.0);
  const vacMat = new THREE.MeshPhysicalMaterial({
    color: 0x06b6d4,
    roughness: 0.1,
    transmission: 0.85,
    thickness: 0.6,
    ior: 1.33,
    transparent: true,
    opacity: 0.85
  });
  const vacMesh = new THREE.Mesh(vacGeo, vacMat);
  vacMesh.position.set(-0.25, 0.05, -0.15);
  vacMesh.name = 'central-vacuole';
  cellGroup.add(vacMesh);

  // 3. Nucleus & Nucleolus
  const nucGeo = new THREE.SphereGeometry(0.35, 28, 28);
  const nucMat = new THREE.MeshStandardMaterial({
    color: 0x8b5cf6,
    roughness: 0.35,
    metalness: 0.1
  });
  const nucMesh = new THREE.Mesh(nucGeo, nucMat);
  nucMesh.position.set(0.52, 0.08, 0.32);
  nucMesh.name = 'nucleus';
  cellGroup.add(nucMesh);

  // Nucleolus core
  const nucCoreGeo = new THREE.SphereGeometry(0.14, 16, 16);
  const nucCoreMat = new THREE.MeshStandardMaterial({ color: 0x4c1d95 });
  const nucCore = new THREE.Mesh(nucCoreGeo, nucCoreMat);
  nucCore.position.set(0.52, 0.14, 0.32);
  cellGroup.add(nucCore);

  // 4. Chloroplasts (with interior thylakoid grana discs)
  const chloroMat = new THREE.MeshStandardMaterial({
    color: 0x15803d,
    roughness: 0.3,
    metalness: 0.05
  });
  const granaMat = new THREE.MeshStandardMaterial({ color: 0x22c55e });

  const chloroPositions = [
    new THREE.Vector3(-0.75, 0.02, 0.45),
    new THREE.Vector3(0.12, 0.02, 0.65),
    new THREE.Vector3(-0.65, 0.02, -0.55),
    new THREE.Vector3(0.68, 0.02, -0.42),
  ];

  chloroPositions.forEach((cPos, idx) => {
    const cGroup = new THREE.Group();
    const cGeo = new THREE.SphereGeometry(0.22, 20, 20);
    cGeo.scale(1.3, 0.6, 0.8);
    const cMesh = new THREE.Mesh(cGeo, chloroMat);
    cGroup.add(cMesh);

    // Visible thylakoid grana disc stack
    for (let d = -1; d <= 1; d++) {
      const discGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.02, 10);
      const disc = new THREE.Mesh(discGeo, granaMat);
      disc.position.set(d * 0.09, 0, 0);
      cGroup.add(disc);
    }

    cGroup.position.copy(cPos);
    cGroup.rotation.y = idx * 0.8;
    cellGroup.add(cGroup);
  });

  // 5. Mitochondria (sausage organelle with cristae folds)
  const mitoPositions = [
    new THREE.Vector3(-0.15, -0.05, 0.62),
    new THREE.Vector3(0.72, -0.05, 0.05),
  ];
  const mitoMat = new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.4 });
  mitoPositions.forEach(mPos => {
    const mGeo = new THREE.CapsuleGeometry(0.1, 0.22, 12, 12);
    mGeo.scale(1.2, 0.8, 0.9);
    const mMesh = new THREE.Mesh(mGeo, mitoMat);
    mMesh.position.copy(mPos);
    mMesh.rotation.z = Math.PI / 3;
    cellGroup.add(mMesh);
  });

  cellGroup.scale.setScalar(scale);
  cellGroup.rotation.x = 0.45;
  cellGroup.rotation.y = 0.3;

  return {
    group: cellGroup,
    type: 'cell',
    updatePulse: (elapsed) => {
      // Cytoplasmic turgor breathing
      const pulse = Math.sin(elapsed * 1.5) * 0.02;
      vacMesh.scale.set(1.2 + pulse, 0.8 + pulse, 1.0 + pulse);
    }
  };
}

/**
 * 4. Physics: Solar System & Planetary Orbits
 */
export function createRealisticSolarSystemModel(scale = 1.0) {
  const systemGroup = new THREE.Group();
  systemGroup.name = 'realisticSolarSystemGroup';

  // Sun
  const sunGeo = new THREE.SphereGeometry(0.55, 32, 32);
  const sunMat = new THREE.MeshStandardMaterial({
    color: 0xffaa00,
    emissive: 0xff7700,
    emissiveIntensity: 0.8,
    roughness: 0.2
  });
  const sunMesh = new THREE.Mesh(sunGeo, sunMat);
  sunMesh.name = 'sun-core';
  systemGroup.add(sunMesh);

  // Sun Corona Glow
  const coronaGeo = new THREE.SphereGeometry(0.68, 24, 24);
  const coronaMat = new THREE.MeshBasicMaterial({
    color: 0xffdd44,
    transparent: true,
    opacity: 0.25,
    wireframe: true
  });
  const coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
  systemGroup.add(coronaMesh);

  // Planets definition [name, distance, size, color, speed, hasRings, hasMoon]
  const planetsConfig = [
    { id: 'mercury', dist: 0.9, size: 0.08, color: 0x9ca3af, speed: 2.2 },
    { id: 'venus', dist: 1.25, size: 0.12, color: 0xf59e0b, speed: 1.6 },
    { id: 'earth-moon', dist: 1.65, size: 0.14, color: 0x38bdf8, speed: 1.2, hasMoon: true },
    { id: 'mars', dist: 2.05, size: 0.1, color: 0xef4444, speed: 0.95 },
    { id: 'jupiter', dist: 2.7, size: 0.32, color: 0xd97706, speed: 0.65 },
    { id: 'saturn-rings', dist: 3.4, size: 0.26, color: 0xfbbf24, speed: 0.48, hasRings: true },
    { id: 'uranus', dist: 4.0, size: 0.18, color: 0x06b6d4, speed: 0.35 },
    { id: 'neptune', dist: 4.5, size: 0.17, color: 0x2563eb, speed: 0.28 }
  ];

  const planetNodes = [];

  planetsConfig.forEach(p => {
    // Orbital path ring
    const orbitGeo = new THREE.RingGeometry(p.dist - 0.008, p.dist + 0.008, 64);
    const orbitMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide
    });
    const orbitMesh = new THREE.Mesh(orbitGeo, orbitMat);
    orbitMesh.rotation.x = Math.PI / 2;
    orbitMesh.name = 'planetary-orbits';
    systemGroup.add(orbitMesh);

    // Planet pivot group
    const pivot = new THREE.Group();
    systemGroup.add(pivot);

    // Planet sphere
    const pGeo = new THREE.SphereGeometry(p.size, 24, 24);
    const pMat = new THREE.MeshStandardMaterial({
      color: p.color,
      roughness: 0.5,
      metalness: 0.1
    });
    const pMesh = new THREE.Mesh(pGeo, pMat);
    pMesh.position.x = p.dist;
    pMesh.name = p.id;
    pivot.add(pMesh);

    // Moon for Earth
    let moonPivot = null;
    if (p.hasMoon) {
      moonPivot = new THREE.Group();
      moonPivot.position.x = p.dist;
      pivot.add(moonPivot);

      const moonGeo = new THREE.SphereGeometry(0.04, 12, 12);
      const moonMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db });
      const moonMesh = new THREE.Mesh(moonGeo, moonMat);
      moonMesh.position.x = 0.25;
      moonPivot.add(moonMesh);
    }

    // Saturn Rings
    if (p.hasRings) {
      const ringGeo = new THREE.RingGeometry(p.size * 1.4, p.size * 2.5, 32);
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0xe5e7eb,
        roughness: 0.6,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2.8;
      pMesh.add(ringMesh);
    }

    planetNodes.push({ pivot, pMesh, speed: p.speed, moonPivot });
  });

  systemGroup.scale.setScalar(scale * 0.7);
  systemGroup.rotation.x = 0.45;

  return {
    group: systemGroup,
    type: 'solar-system',
    updatePulse: (elapsed) => {
      coronaMesh.rotation.y = elapsed * 0.2;
      coronaMesh.scale.setScalar(1 + Math.sin(elapsed * 2) * 0.03);

      planetNodes.forEach((node, idx) => {
        node.pivot.rotation.y = elapsed * node.speed * 0.5 + idx;
        node.pMesh.rotation.y = elapsed * 1.5;
        if (node.moonPivot) {
          node.moonPivot.rotation.y = elapsed * 4.0;
        }
      });
    }
  };
}

/**
 * 5. Physics: Electromagnetic Induction & Motors
 */
export function createRealisticElectromagnetismModel(scale = 1.0) {
  const emGroup = new THREE.Group();
  emGroup.name = 'realisticElectromagnetismGroup';

  // Central Soft Iron Core
  const coreGeo = new THREE.CylinderGeometry(0.35, 0.35, 2.2, 32);
  const coreMat = new THREE.MeshStandardMaterial({
    color: 0x475569,
    metalness: 0.85,
    roughness: 0.25
  });
  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  coreMesh.rotation.z = Math.PI / 2;
  emGroup.add(coreMesh);

  // Copper Solenoid Coil Windings
  const coilGroup = new THREE.Group();
  coilGroup.name = 'solenoid-coil';
  const copperMat = new THREE.MeshStandardMaterial({
    color: 0xf97316,
    metalness: 0.9,
    roughness: 0.15
  });

  const turns = 10;
  for (let i = 0; i < turns; i++) {
    const torusGeo = new THREE.TorusGeometry(0.48, 0.05, 16, 32);
    const torus = new THREE.Mesh(torusGeo, copperMat);
    torus.position.x = (i - (turns - 1) / 2) * 0.18;
    torus.rotation.y = Math.PI / 2;
    coilGroup.add(torus);
  }
  emGroup.add(coilGroup);

  // Stator Magnetic Field Pole Shoes (N in Red, S in Blue)
  const poleGroup = new THREE.Group();
  poleGroup.name = 'pole-magnets';

  const poleGeo = new THREE.BoxGeometry(0.35, 1.1, 1.1);
  const northMat = new THREE.MeshStandardMaterial({ color: 0xef4444, metalness: 0.4, roughness: 0.3 });
  const southMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, metalness: 0.4, roughness: 0.3 });

  const northPole = new THREE.Mesh(poleGeo, northMat);
  northPole.position.set(-1.25, 0, 0);
  poleGroup.add(northPole);

  const southPole = new THREE.Mesh(poleGeo, southMat);
  southPole.position.set(1.25, 0, 0);
  poleGroup.add(southPole);
  emGroup.add(poleGroup);

  // Rotating Rotor Armature inside
  const rotorGroup = new THREE.Group();
  rotorGroup.name = 'rotor-armature';
  const rotorGeo = new THREE.BoxGeometry(0.18, 0.7, 0.7);
  const rotorMat = new THREE.MeshStandardMaterial({ color: 0xa855f7, metalness: 0.7, roughness: 0.2 });
  const rotorMesh = new THREE.Mesh(rotorGeo, rotorMat);
  rotorGroup.add(rotorMesh);
  emGroup.add(rotorGroup);

  // Magnetic B-Field Vector Lines
  const fluxGroup = new THREE.Group();
  fluxGroup.name = 'magnetic-flux';
  const fluxMat = new THREE.MeshBasicMaterial({
    color: 0x06b6d4,
    wireframe: true,
    transparent: true,
    opacity: 0.45
  });

  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const curve = new THREE.EllipseCurve(0, 0, 1.4, 0.75 + Math.sin(i) * 0.15, 0, 2 * Math.PI, false, 0);
    const points = curve.getPoints(50);
    const fluxGeo = new THREE.BufferGeometry().setFromPoints(points);
    const fluxLine = new THREE.Line(fluxGeo, fluxMat);
    fluxLine.rotation.x = angle;
    fluxGroup.add(fluxLine);
  }
  emGroup.add(fluxGroup);

  emGroup.scale.setScalar(scale);

  return {
    group: emGroup,
    type: 'electromagnetism',
    updatePulse: (elapsed) => {
      // Rotate central rotor armature
      rotorGroup.rotation.x = elapsed * 3.5;
      // Pulse flux lines
      fluxGroup.rotation.x = elapsed * 0.4;
    }
  };
}

/**
 * 6. Physics: Wave Optics & Light Refraction
 */
export function createRealisticOpticsPrismModel(scale = 1.0) {
  const opticsGroup = new THREE.Group();
  opticsGroup.name = 'realisticOpticsPrismGroup';

  // Triangular Equilateral Prism
  const prismGeo = new THREE.CylinderGeometry(0.9, 0.9, 1.4, 3, 1);
  const prismMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transmission: 0.92,
    roughness: 0.05,
    ior: 1.52,
    thickness: 1.2,
    transparent: true,
    opacity: 0.88
  });
  const prismMesh = new THREE.Mesh(prismGeo, prismMat);
  prismMesh.rotation.y = Math.PI / 6;
  prismMesh.name = 'glass-prism';
  opticsGroup.add(prismMesh);

  // Collimated White Incident Ray
  const incidentGroup = new THREE.Group();
  incidentGroup.name = 'white-beam';
  const whiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const inRayGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.8, 12);
  const inRay = new THREE.Mesh(inRayGeo, whiteMat);
  inRay.position.set(-1.3, -0.2, 0);
  inRay.rotation.z = Math.PI / 3;
  incidentGroup.add(inRay);
  opticsGroup.add(incidentGroup);

  // Reflected Ray
  const refGroup = new THREE.Group();
  refGroup.name = 'reflected-ray';
  const refMat = new THREE.MeshBasicMaterial({ color: 0x94a3b8, transparent: true, opacity: 0.6 });
  const refRayGeo = new THREE.CylinderGeometry(0.025, 0.025, 1.4, 12);
  const refRay = new THREE.Mesh(refRayGeo, refMat);
  refRay.position.set(-0.9, 0.65, 0);
  refRay.rotation.z = -Math.PI / 3;
  refGroup.add(refRay);
  opticsGroup.add(refGroup);

  // Refracted Spectral Rainbow Fan
  const fanGroup = new THREE.Group();
  fanGroup.name = 'dispersion-fan';

  const spectralColors = [
    { color: 0xef4444, angle: 0.35 }, // Red (Least bent)
    { color: 0xf97316, angle: 0.38 }, // Orange
    { color: 0xeab308, angle: 0.41 }, // Yellow
    { color: 0x22c55e, angle: 0.44 }, // Green
    { color: 0x3b82f6, angle: 0.47 }, // Blue
    { color: 0xa855f7, angle: 0.51 }  // Violet (Most bent)
  ];

  spectralColors.forEach(item => {
    const rayGeo = new THREE.CylinderGeometry(0.028, 0.028, 2.0, 12);
    const rayMat = new THREE.MeshBasicMaterial({ color: item.color });
    const rayMesh = new THREE.Mesh(rayGeo, rayMat);
    rayMesh.position.set(1.2, item.angle * 0.9 - 0.2, 0);
    rayMesh.rotation.z = -item.angle * 1.5;
    fanGroup.add(rayMesh);
  });
  opticsGroup.add(fanGroup);

  opticsGroup.scale.setScalar(scale);

  return {
    group: opticsGroup,
    type: 'optics-refraction',
    updatePulse: (elapsed) => {
      // Subtle optical shimmer
      prismMesh.rotation.y = Math.PI / 6 + Math.sin(elapsed * 0.8) * 0.03;
    }
  };
}

/**
 * 7. Chemistry: Water Molecule (H₂O) & Hydrogen Bonds
 */
export function createRealisticWaterMoleculeModel(scale = 1.0) {
  const molGroup = new THREE.Group();
  molGroup.name = 'realisticWaterMoleculeGroup';

  // Central Oxygen Atom
  const oGeo = new THREE.SphereGeometry(0.5, 32, 32);
  const oMat = new THREE.MeshStandardMaterial({
    color: 0xef4444,
    roughness: 0.25,
    metalness: 0.1
  });
  const oMesh = new THREE.Mesh(oGeo, oMat);
  oMesh.name = 'oxygen-atom';
  molGroup.add(oMesh);

  // Hydrogen Atoms (Exact 104.45° Bent Angle)
  const hGroup = new THREE.Group();
  hGroup.name = 'hydrogen-atoms';
  const hGeo = new THREE.SphereGeometry(0.3, 24, 24);
  const hMat = new THREE.MeshStandardMaterial({
    color: 0xe0f2fe,
    roughness: 0.2,
    metalness: 0.05
  });

  const halfAngle = (104.45 * Math.PI) / 360; // 52.225 deg
  const bondDist = 0.85;

  const h1 = new THREE.Mesh(hGeo, hMat);
  h1.position.set(Math.sin(halfAngle) * bondDist, -Math.cos(halfAngle) * bondDist, 0);
  hGroup.add(h1);

  const h2 = new THREE.Mesh(hGeo, hMat);
  h2.position.set(-Math.sin(halfAngle) * bondDist, -Math.cos(halfAngle) * bondDist, 0);
  hGroup.add(h2);

  // Covalent Bond Cylinders
  const bondMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.4, roughness: 0.3 });
  const bGeo = new THREE.CylinderGeometry(0.08, 0.08, bondDist, 16);

  const b1 = new THREE.Mesh(bGeo, bondMat);
  b1.position.set(h1.position.x / 2, h1.position.y / 2, 0);
  b1.rotation.z = -halfAngle;
  hGroup.add(b1);

  const b2 = new THREE.Mesh(bGeo, bondMat);
  b2.position.set(h2.position.x / 2, h2.position.y / 2, 0);
  b2.rotation.z = halfAngle;
  hGroup.add(b2);

  molGroup.add(hGroup);

  // Lone Electron Pair Orbitals
  const loneGroup = new THREE.Group();
  loneGroup.name = 'lone-pairs';
  const loneGeo = new THREE.SphereGeometry(0.24, 16, 16);
  loneGeo.scale(0.8, 1.4, 0.8);
  const loneMat = new THREE.MeshPhysicalMaterial({
    color: 0xa855f7,
    transparent: true,
    opacity: 0.5,
    roughness: 0.1
  });

  const l1 = new THREE.Mesh(loneGeo, loneMat);
  l1.position.set(0.28, 0.48, 0.3);
  l1.rotation.z = -0.4;
  loneGroup.add(l1);

  const l2 = new THREE.Mesh(loneGeo, loneMat);
  l2.position.set(-0.28, 0.48, 0.3);
  l2.rotation.z = 0.4;
  loneGroup.add(l2);
  molGroup.add(loneGroup);

  // Neighboring Hydrogen Lattice Ghost Molecules
  const latticeGroup = new THREE.Group();
  latticeGroup.name = 'hydrogen-lattice';
  const ghostMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.3 });

  const neighborPositions = [
    new THREE.Vector3(1.6, 0.7, -0.5),
    new THREE.Vector3(-1.6, 0.7, -0.5),
  ];

  neighborPositions.forEach(pos => {
    const nMesh = new THREE.Mesh(new THREE.SphereGeometry(0.25, 16, 16), ghostMat);
    nMesh.position.copy(pos);
    latticeGroup.add(nMesh);

    // Dashed electrostatic H-bond line
    const lineGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), pos]);
    const lineMat = new THREE.LineDashedMaterial({ color: 0x06b6d4, dashSize: 0.1, gapSize: 0.05 });
    const hBond = new THREE.Line(lineGeo, lineMat);
    hBond.computeLineDistances();
    latticeGroup.add(hBond);
  });
  molGroup.add(latticeGroup);

  molGroup.scale.setScalar(scale);

  return {
    group: molGroup,
    type: 'water-molecule',
    updatePulse: (elapsed) => {
      // Quantum bond vibration (stretching & bending)
      const vib = Math.sin(elapsed * 8.0) * 0.03;
      h1.position.x = Math.sin(halfAngle) * (bondDist + vib);
      h2.position.x = -Math.sin(halfAngle) * (bondDist + vib);
      molGroup.rotation.y = elapsed * 0.4;
    }
  };
}

/**
 * 8. Chemistry: Atomic Structure & Quantum Orbitals
 */
export function createRealisticAtomOrbitalsModel(scale = 1.0) {
  const atomGroup = new THREE.Group();
  atomGroup.name = 'realisticAtomOrbitalsGroup';

  // Dense Central Nucleus (Protons & Neutrons)
  const nucleusGroup = new THREE.Group();
  nucleusGroup.name = 'atomic-nucleus';

  const pMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.3 }); // Protons
  const nMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.3 }); // Neutrons

  for (let i = 0; i < 14; i++) {
    const geo = new THREE.SphereGeometry(0.12, 16, 16);
    const mesh = new THREE.Mesh(geo, i % 2 === 0 ? pMat : nMat);
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = Math.random() * 0.22;
    mesh.position.set(r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi));
    nucleusGroup.add(mesh);
  }
  atomGroup.add(nucleusGroup);

  // Spherical 1s Electron Orbital Shell
  const sOrbGeo = new THREE.SphereGeometry(0.7, 32, 32);
  const sOrbMat = new THREE.MeshPhysicalMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.22,
    roughness: 0.1
  });
  const sOrbMesh = new THREE.Mesh(sOrbGeo, sOrbMat);
  sOrbMesh.name = 's-orbital';
  atomGroup.add(sOrbMesh);

  // 3 Dumbbell p-Orbitals (px along X, py along Y, pz along Z)
  const pOrbGroup = new THREE.Group();
  pOrbGroup.name = 'p-orbitals';

  const makeDumbbell = (axisVector, color) => {
    const dGroup = new THREE.Group();
    const lobeGeo = new THREE.SphereGeometry(0.35, 20, 20);
    lobeGeo.scale(1.4, 0.8, 0.8);
    const dMat = new THREE.MeshStandardMaterial({
      color,
      transparent: true,
      opacity: 0.45,
      roughness: 0.3
    });

    const l1 = new THREE.Mesh(lobeGeo, dMat);
    l1.position.x = 0.55;
    dGroup.add(l1);

    const l2 = new THREE.Mesh(lobeGeo, dMat);
    l2.position.x = -0.55;
    dGroup.add(l2);

    if (axisVector.y === 1) dGroup.rotation.z = Math.PI / 2;
    if (axisVector.z === 1) dGroup.rotation.y = Math.PI / 2;
    return dGroup;
  };

  pOrbGroup.add(makeDumbbell(new THREE.Vector3(1, 0, 0), 0xec4899)); // px
  pOrbGroup.add(makeDumbbell(new THREE.Vector3(0, 1, 0), 0xa855f7)); // py
  pOrbGroup.add(makeDumbbell(new THREE.Vector3(0, 0, 1), 0x06b6d4)); // pz
  atomGroup.add(pOrbGroup);

  // Valence Orbiting Electrons with Trails
  const valGroup = new THREE.Group();
  valGroup.name = 'valence-electrons';
  const eMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });
  const eNodes = [];

  for (let i = 0; i < 4; i++) {
    const eGeo = new THREE.SphereGeometry(0.06, 12, 12);
    const eMesh = new THREE.Mesh(eGeo, eMat);
    valGroup.add(eMesh);
    eNodes.push({ mesh: eMesh, speed: 2.5 + i * 0.7, r: 1.25 + (i % 2) * 0.3, tilt: i * 0.8 });
  }
  atomGroup.add(valGroup);

  atomGroup.scale.setScalar(scale);

  return {
    group: atomGroup,
    type: 'periodic-table',
    updatePulse: (elapsed) => {
      // Rapid electron revolutions
      eNodes.forEach(e => {
        const a = elapsed * e.speed;
        e.mesh.position.set(
          Math.cos(a) * e.r,
          Math.sin(a) * Math.cos(e.tilt) * e.r,
          Math.sin(a) * Math.sin(e.tilt) * e.r
        );
      });
      // Slow orbital rotation
      pOrbGroup.rotation.y = elapsed * 0.3;
      sOrbMesh.scale.setScalar(1 + Math.sin(elapsed * 3) * 0.02);
    }
  };
}

/**
 * 9. Chemistry: Reaction Kinetics & Thermodynamics
 */
export function createRealisticChemicalReactionsModel(scale = 1.0) {
  const rxGroup = new THREE.Group();
  rxGroup.name = 'realisticChemicalReactionsGroup';

  // 3D Activation Energy Barrier Landscape Curve
  const curvePoints = [];
  for (let x = -1.6; x <= 1.6; x += 0.08) {
    // Energy curve: reactant base (0), peak at x=0 (Ea = 1.1), product base (x > 0.6 => -0.6)
    const y = Math.exp(-x * x * 3.5) * 1.3 - (x > 0 ? x * 0.4 : 0);
    curvePoints.push(new THREE.Vector3(x, y - 0.2, 0));
  }
  const curveGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
  const curveMat = new THREE.LineBasicMaterial({ color: 0x6366f1, linewidth: 3 });
  const curveLine = new THREE.Line(curveGeo, curveMat);
  rxGroup.add(curveLine);

  // Catalytic Lower Barrier (Alternative lower hill)
  const catPoints = [];
  for (let x = -1.6; x <= 1.6; x += 0.08) {
    const y = Math.exp(-x * x * 3.5) * 0.75 - (x > 0 ? x * 0.4 : 0);
    catPoints.push(new THREE.Vector3(x, y - 0.2, 0.4));
  }
  const catGeo = new THREE.BufferGeometry().setFromPoints(catPoints);
  const catMat = new THREE.LineDashedMaterial({ color: 0xec4899, dashSize: 0.08, gapSize: 0.05 });
  const catLine = new THREE.Line(catGeo, catMat);
  catLine.computeLineDistances();
  catLine.name = 'catalytic-surface';
  rxGroup.add(catLine);

  // Reactant Molecules State (A₂ + B₂)
  const reactGroup = new THREE.Group();
  reactGroup.name = 'reactants-complex';
  reactGroup.position.set(-1.4, -0.3, 0);

  const r1 = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), new THREE.MeshStandardMaterial({ color: 0x3b82f6 }));
  r1.position.x = -0.15;
  const r2 = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), new THREE.MeshStandardMaterial({ color: 0x3b82f6 }));
  r2.position.x = 0.15;
  reactGroup.add(r1);
  reactGroup.add(r2);
  rxGroup.add(reactGroup);

  // Transition State Complex at Peak [A···B]‡
  const transGroup = new THREE.Group();
  transGroup.name = 'transition-state';
  transGroup.position.set(0, 1.05, 0);

  const tMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xd97706, emissiveIntensity: 0.5 });
  for (let i = 0; i < 4; i++) {
    const tSphere = new THREE.Mesh(new THREE.SphereGeometry(0.14, 16, 16), tMat);
    tSphere.position.set(((i % 2) - 0.5) * 0.35, (Math.floor(i / 2) - 0.5) * 0.35, 0);
    transGroup.add(tSphere);
  }
  rxGroup.add(transGroup);

  // Formed Product Molecules (2 AB) in Exothermic Valley
  const prodGroup = new THREE.Group();
  prodGroup.name = 'products-state';
  prodGroup.position.set(1.4, -0.75, 0);

  const p1 = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), new THREE.MeshStandardMaterial({ color: 0x10b981 }));
  p1.position.x = -0.15;
  const p2 = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), new THREE.MeshStandardMaterial({ color: 0x06b6d4 }));
  p2.position.x = 0.15;
  prodGroup.add(p1);
  prodGroup.add(p2);
  rxGroup.add(prodGroup);

  rxGroup.scale.setScalar(scale);

  return {
    group: rxGroup,
    type: 'chemical-reactions',
    updatePulse: (elapsed) => {
      // Transition state molecular vibration
      transGroup.scale.setScalar(1 + Math.sin(elapsed * 9.0) * 0.08);
      // Reactant collision oscillation
      reactGroup.rotation.y = elapsed * 1.5;
      prodGroup.rotation.y = elapsed * 1.5;
    }
  };
}

/**
 * 10. Mathematics: Pythagorean Theorem & Trigonometry
 */
export function createRealisticPythagoreanModel(scale = 1.0) {
  const pyGroup = new THREE.Group();
  pyGroup.name = 'realisticPythagoreanGroup';

  // Triangle Core (Sides a=3, b=4, c=5 scaled)
  const a = 0.9;
  const b = 1.2;
  const c = 1.5;

  const triGroup = new THREE.Group();
  triGroup.name = 'triangle-core';
  const triMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.3 });

  // Leg a (Vertical)
  const legAGeo = new THREE.CylinderGeometry(0.04, 0.04, a, 12);
  const legA = new THREE.Mesh(legAGeo, triMat);
  legA.position.set(-b / 2, a / 2, 0);
  triGroup.add(legA);

  // Leg b (Horizontal)
  const legBGeo = new THREE.CylinderGeometry(0.04, 0.04, b, 12);
  const legB = new THREE.Mesh(legBGeo, triMat);
  legB.position.set(0, 0, 0);
  legB.rotation.z = Math.PI / 2;
  triGroup.add(legB);

  // Hypotenuse c
  const legCGeo = new THREE.CylinderGeometry(0.04, 0.04, c, 12);
  const legC = new THREE.Mesh(legCGeo, triMat);
  legC.position.set(0, a / 2, 0);
  legC.rotation.z = -Math.atan2(b, a);
  triGroup.add(legC);
  pyGroup.add(triGroup);

  // Square a² (3x3 grid = 9 cubes)
  const sqAGroup = new THREE.Group();
  sqAGroup.name = 'square-a';
  const aCubeMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.4 });
  for (let r = 0; r < 3; r++) {
    for (let col = 0; col < 3; col++) {
      const cube = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.26, 0.08), aCubeMat);
      cube.position.set(-b / 2 - 0.15 - col * 0.28, 0.15 + r * 0.28, 0);
      sqAGroup.add(cube);
    }
  }
  pyGroup.add(sqAGroup);

  // Square b² (4x4 grid = 16 cubes)
  const sqBGroup = new THREE.Group();
  sqBGroup.name = 'square-b';
  const bCubeMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.4 });
  for (let r = 0; r < 4; r++) {
    for (let col = 0; col < 4; col++) {
      const cube = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.26, 0.08), bCubeMat);
      cube.position.set(-b / 2 + 0.15 + col * 0.28, -0.15 - r * 0.28, 0);
      sqBGroup.add(cube);
    }
  }
  pyGroup.add(sqBGroup);

  // Square c² (5x5 grid = 25 cubes) on Hypotenuse
  const sqCGroup = new THREE.Group();
  sqCGroup.name = 'square-c';
  const cCubeMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.4 });
  const cAngle = Math.atan2(a, b);

  for (let r = 0; r < 5; r++) {
    for (let col = 0; col < 5; col++) {
      const cube = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.26, 0.08), cCubeMat);
      const localX = (col - 2) * 0.28;
      const localY = (r + 0.5) * 0.28;
      cube.position.set(
        localX * Math.cos(cAngle) - localY * Math.sin(cAngle),
        a / 2 + localX * Math.sin(cAngle) + localY * Math.cos(cAngle),
        0
      );
      cube.rotation.z = cAngle;
      sqCGroup.add(cube);
    }
  }
  pyGroup.add(sqCGroup);

  pyGroup.scale.setScalar(scale * 0.9);

  return {
    group: pyGroup,
    type: 'pythagorean-theorem',
    updatePulse: (elapsed) => {
      pyGroup.rotation.y = Math.sin(elapsed * 0.6) * 0.25;
    }
  };
}

/**
 * 11. Mathematics: 3D Vectors & Coordinate Geometry
 */
export function createRealisticCoordinateGeometryModel(scale = 1.0) {
  const coordGroup = new THREE.Group();
  coordGroup.name = 'realisticCoordinateGeometryGroup';

  // Axes Frame (X Red, Y Green, Z Blue)
  const axesGroup = new THREE.Group();
  axesGroup.name = 'cartesian-axes';

  const makeAxis = (dir, color) => {
    const aGroup = new THREE.Group();
    const shaft = new THREE.Mesh(
      new THREE.CylinderGeometry(0.035, 0.035, 2.2, 16),
      new THREE.MeshStandardMaterial({ color, roughness: 0.3 })
    );
    shaft.position.y = 1.1;
    aGroup.add(shaft);

    const tip = new THREE.Mesh(
      new THREE.ConeGeometry(0.09, 0.25, 16),
      new THREE.MeshStandardMaterial({ color })
    );
    tip.position.y = 2.2;
    aGroup.add(tip);

    if (dir === 'x') aGroup.rotation.z = -Math.PI / 2;
    if (dir === 'z') aGroup.rotation.x = Math.PI / 2;
    return aGroup;
  };

  axesGroup.add(makeAxis('x', 0xef4444)); // X-Axis
  axesGroup.add(makeAxis('y', 0x10b981)); // Y-Axis
  axesGroup.add(makeAxis('z', 0x3b82f6)); // Z-Axis
  coordGroup.add(axesGroup);

  // Projection Grid Plane (XY Grid)
  const gridGroup = new THREE.Group();
  gridGroup.name = 'projection-planes';
  const gridHelper = new THREE.GridHelper(3.0, 10, 0x6366f1, 0x334155);
  gridGroup.add(gridHelper);
  coordGroup.add(gridGroup);

  // Position Vector V = (x, y, z)
  const vecGroup = new THREE.Group();
  vecGroup.name = 'position-vector';
  const vMat = new THREE.MeshStandardMaterial({ color: 0xa855f7, emissive: 0x7c3aed, emissiveIntensity: 0.4 });
  const vShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 1.8, 16), vMat);
  vShaft.position.set(0.6, 0.7, 0.5);
  vShaft.rotation.set(-0.4, 0.2, -0.6);
  vecGroup.add(vShaft);
  coordGroup.add(vecGroup);

  // Cross Product Normal Vector (A x B)
  const crossGroup = new THREE.Group();
  crossGroup.name = 'cross-product-vector';
  const cShaft = new THREE.Mesh(
    new THREE.CylinderGeometry(0.045, 0.045, 1.6, 16),
    new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xd97706, emissiveIntensity: 0.5 })
  );
  cShaft.position.set(-0.5, 1.1, -0.3);
  cShaft.rotation.set(0.3, 0, 0.4);
  crossGroup.add(cShaft);
  coordGroup.add(crossGroup);

  coordGroup.scale.setScalar(scale);

  return {
    group: coordGroup,
    type: 'coordinate-geometry',
    updatePulse: (elapsed) => {
      vecGroup.rotation.y = elapsed * 0.4;
      crossGroup.rotation.y = elapsed * 0.4;
    }
  };
}

/**
 * 12. Mathematics: Calculus: Derivatives & Integrals
 */
export function createRealisticCalculusDerivativesModel(scale = 1.0) {
  const calcGroup = new THREE.Group();
  calcGroup.name = 'realisticCalculusDerivativesGroup';

  // 3D Continuous Ripple Surface z = f(x, y)
  const surfGeo = new THREE.PlaneGeometry(2.6, 2.6, 32, 32);
  const pos = surfGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = 0.35 * Math.sin(x * 2.2) * Math.cos(y * 2.2);
    pos.setZ(i, z);
  }
  surfGeo.computeVertexNormals();

  const surfMat = new THREE.MeshStandardMaterial({
    color: 0x6366f1,
    roughness: 0.35,
    metalness: 0.1,
    side: THREE.DoubleSide,
    wireframe: false
  });
  const surfMesh = new THREE.Mesh(surfGeo, surfMat);
  surfMesh.rotation.x = -Math.PI / 2.4;
  surfMesh.name = 'calculus-surface';
  calcGroup.add(surfMesh);

  // Tangent Plane at Inspection Point
  const tanGeo = new THREE.PlaneGeometry(0.9, 0.9);
  const tanMat = new THREE.MeshPhysicalMaterial({
    color: 0xf59e0b,
    transparent: true,
    opacity: 0.65,
    roughness: 0.2,
    side: THREE.DoubleSide
  });
  const tanMesh = new THREE.Mesh(tanGeo, tanMat);
  tanMesh.position.set(0.4, 0.45, 0.2);
  tanMesh.rotation.set(-0.8, 0.3, 0.2);
  tanMesh.name = 'tangent-plane';
  calcGroup.add(tanMesh);

  // Gradient Vector Arrow (Max ascent)
  const gradGroup = new THREE.Group();
  gradGroup.name = 'gradient-vector';
  const gradShaft = new THREE.Mesh(
    new THREE.CylinderGeometry(0.03, 0.03, 0.6, 12),
    new THREE.MeshStandardMaterial({ color: 0xec4899 })
  );
  gradShaft.position.set(0.4, 0.75, 0.2);
  gradGroup.add(gradShaft);
  calcGroup.add(gradGroup);

  // Riemann Volume Slices under curve
  const slicesGroup = new THREE.Group();
  slicesGroup.name = 'riemann-slices';
  const sliceMat = new THREE.MeshStandardMaterial({ color: 0x10b981, transparent: true, opacity: 0.5 });
  for (let ix = -1.0; ix <= 1.0; ix += 0.5) {
    for (let iy = -1.0; iy <= 1.0; iy += 0.5) {
      const colHeight = Math.max(0.15, 0.35 + 0.2 * Math.sin(ix * 2) * Math.cos(iy * 2));
      const colGeo = new THREE.BoxGeometry(0.4, colHeight, 0.4);
      const colMesh = new THREE.Mesh(colGeo, sliceMat);
      colMesh.position.set(ix, -0.3 + colHeight / 2, iy);
      slicesGroup.add(colMesh);
    }
  }
  calcGroup.add(slicesGroup);

  calcGroup.scale.setScalar(scale);

  return {
    group: calcGroup,
    type: 'calculus-derivatives',
    updatePulse: (elapsed) => {
      // Oscillate inspection point and tangent plane
      tanMesh.position.x = 0.4 + Math.sin(elapsed) * 0.2;
      tanMesh.rotation.z = Math.sin(elapsed) * 0.3;
      gradGroup.position.x = tanMesh.position.x;
    }
  };
}

/**
 * 13. Computer Science: Binary Trees & Graph Algorithms
 */
export function createRealisticBinarySearchTreeModel(scale = 1.0) {
  const bstGroup = new THREE.Group();
  bstGroup.name = 'realisticBinarySearchTreeGroup';

  const nodeMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.2, metalness: 0.2 });
  const rootMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.2, emissive: 0xd97706, emissiveIntensity: 0.3 });
  const branchMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.5 });

  const treeNodes = [
    { id: 'root', val: 50, x: 0, y: 1.1, z: 0, isRoot: true },
    { id: 'n25', val: 25, x: -1.0, y: 0.4, z: 0, parent: 'root' },
    { id: 'n75', val: 75, x: 1.0, y: 0.4, z: 0, parent: 'root' },
    { id: 'n12', val: 12, x: -1.5, y: -0.3, z: 0, parent: 'n25' },
    { id: 'n37', val: 37, x: -0.5, y: -0.3, z: 0, parent: 'n25' },
    { id: 'n62', val: 62, x: 0.5, y: -0.3, z: 0, parent: 'n75' },
    { id: 'n87', val: 87, x: 1.5, y: -0.3, z: 0, parent: 'n75' }
  ];

  const nodeMap = {};

  treeNodes.forEach(node => {
    const geo = new THREE.SphereGeometry(0.18, 20, 20);
    const mesh = new THREE.Mesh(geo, node.isRoot ? rootMat : nodeMat);
    mesh.position.set(node.x, node.y, node.z);
    mesh.name = node.isRoot ? 'root-node' : (node.x < 0 ? 'left-subtree' : 'right-subtree');
    bstGroup.add(mesh);
    nodeMap[node.id] = mesh;

    // Branch from parent
    if (node.parent && nodeMap[node.parent]) {
      const pMesh = nodeMap[node.parent];
      const start = pMesh.position;
      const end = mesh.position;
      const dist = start.distanceTo(end);
      const bGeo = new THREE.CylinderGeometry(0.04, 0.04, dist, 12);
      const branch = new THREE.Mesh(bGeo, branchMat);
      branch.position.copy(start).lerp(end, 0.5);
      branch.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), end.clone().sub(start).normalize());
      bstGroup.add(branch);
    }
  });

  // Animated Traversal Pulse Orb
  const pulseOrb = new THREE.Mesh(
    new THREE.SphereGeometry(0.1, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0x10b981 })
  );
  pulseOrb.name = 'traversal-path';
  bstGroup.add(pulseOrb);

  bstGroup.scale.setScalar(scale);

  return {
    group: bstGroup,
    type: 'binary-search-tree',
    updatePulse: (elapsed) => {
      // Cycle traversal pulse through inorder path: 12 -> 25 -> 37 -> 50 -> 62 -> 75 -> 87
      const path = [treeNodes[3], treeNodes[1], treeNodes[4], treeNodes[0], treeNodes[5], treeNodes[2], treeNodes[6]];
      const totalSteps = path.length;
      const t = (elapsed * 1.5) % totalSteps;
      const step = Math.floor(t);
      const frac = t - step;
      const nextStep = (step + 1) % totalSteps;

      const p1 = new THREE.Vector3(path[step].x, path[step].y, path[step].z);
      const p2 = new THREE.Vector3(path[nextStep].x, path[nextStep].y, path[nextStep].z);
      pulseOrb.position.copy(p1).lerp(p2, frac);

      bstGroup.rotation.y = Math.sin(elapsed * 0.4) * 0.2;
    }
  };
}

/**
 * 14. Computer Science: CPU Architecture & Execution Cycle
 */
export function createRealisticCpuArchitectureModel(scale = 1.0) {
  const cpuGroup = new THREE.Group();
  cpuGroup.name = 'realisticCpuArchitectureGroup';

  // Silicon Carrier Substrate & Gold Contacts
  const subGeo = new THREE.BoxGeometry(2.4, 0.15, 2.4);
  const subMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4, metalness: 0.5 });
  const subMesh = new THREE.Mesh(subGeo, subMat);
  cpuGroup.add(subMesh);

  // Silicon Core Die
  const dieGeo = new THREE.BoxGeometry(1.6, 0.1, 1.6);
  const dieMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.1, metalness: 0.8 });
  const dieMesh = new THREE.Mesh(dieGeo, dieMat);
  dieMesh.position.y = 0.1;
  cpuGroup.add(dieMesh);

  // Microarchitectural Blocks:
  // 1. ALU Block (Arithmetic Logic Unit)
  const aluGeo = new THREE.BoxGeometry(0.65, 0.12, 0.65);
  const aluMat = new THREE.MeshStandardMaterial({ color: 0xef4444, metalness: 0.6, roughness: 0.2 });
  const aluMesh = new THREE.Mesh(aluGeo, aluMat);
  aluMesh.position.set(0.42, 0.18, 0.42);
  aluMesh.name = 'alu-block';
  cpuGroup.add(aluMesh);

  // 2. Control Unit & Decoder
  const cuGeo = new THREE.BoxGeometry(0.65, 0.12, 0.65);
  const cuMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, metalness: 0.6, roughness: 0.2 });
  const cuMesh = new THREE.Mesh(cuGeo, cuMat);
  cuMesh.position.set(-0.42, 0.18, 0.42);
  cuMesh.name = 'control-unit';
  cpuGroup.add(cuMesh);

  // 3. Register File Array
  const regGeo = new THREE.BoxGeometry(0.65, 0.12, 0.65);
  const regMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.6, roughness: 0.2 });
  const regMesh = new THREE.Mesh(regGeo, regMat);
  regMesh.position.set(0.42, 0.18, -0.42);
  regMesh.name = 'registers-array';
  cpuGroup.add(regMesh);

  // 4. L1/L2 High-Speed Cache & Bus
  const cacheGeo = new THREE.BoxGeometry(0.65, 0.12, 0.65);
  const cacheMat = new THREE.MeshStandardMaterial({ color: 0x10b981, metalness: 0.6, roughness: 0.2 });
  const cacheMesh = new THREE.Mesh(cacheGeo, cacheMat);
  cacheMesh.position.set(-0.42, 0.18, -0.42);
  cacheMesh.name = 'cache-bus';
  cpuGroup.add(cacheMesh);

  // Pulsing Binary Data Bus Interconnect Lines
  const busGroup = new THREE.Group();
  const busMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
  const bus1 = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.04, 0.08), busMat);
  bus1.position.set(0, 0.22, 0);
  busGroup.add(bus1);
  const bus2 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.04, 1.5), busMat);
  bus2.position.set(0, 0.22, 0);
  busGroup.add(bus2);
  cpuGroup.add(busGroup);

  cpuGroup.scale.setScalar(scale);

  return {
    group: cpuGroup,
    type: 'cpu-architecture',
    updatePulse: (elapsed) => {
      // Clock cycle frequency pulse
      const clockPulse = (Math.sin(elapsed * 12.0) + 1) * 0.5;
      busMat.color.setRGB(0.2 + clockPulse * 0.8, 0.7 + clockPulse * 0.3, 1.0);
      aluMat.emissiveIntensity = clockPulse * 0.4;
      cpuGroup.rotation.y = elapsed * 0.25;
    }
  };
}

/**
 * 15. Computer Science: Sorting Algorithms & Big-O Complexity
 */
export function createRealisticSortingAlgorithmsModel(scale = 1.0) {
  const sortGroup = new THREE.Group();
  sortGroup.name = 'realisticSortingAlgorithmsGroup';

  const barCount = 12;
  const initialHeights = [0.3, 0.9, 0.45, 1.4, 0.7, 1.8, 0.55, 1.2, 0.8, 1.6, 0.4, 1.0];
  const bars = [];

  const defaultMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.3, metalness: 0.2 });
  const pivotMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xd97706, emissiveIntensity: 0.4 });
  const compareMat = new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xb91c1c, emissiveIntensity: 0.4 });
  const sortedMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.3 });

  const arenaGeo = new THREE.BoxGeometry(2.8, 0.1, 1.0);
  const arenaMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 });
  const arena = new THREE.Mesh(arenaGeo, arenaMat);
  arena.position.y = -0.05;
  sortGroup.add(arena);

  for (let i = 0; i < barCount; i++) {
    const h = initialHeights[i];
    const bGeo = new THREE.BoxGeometry(0.16, h, 0.3);
    const bMesh = new THREE.Mesh(bGeo, defaultMat);
    bMesh.position.set((i - (barCount - 1) / 2) * 0.22, h / 2, 0);
    bMesh.name = i === 5 ? 'pivot-element' : (i < 3 ? 'sorted-partition' : 'active-comparisons');
    sortGroup.add(bMesh);
    bars.push({ mesh: bMesh, originalHeight: h });
  }

  // Active Comparison Floating Cursor Pointer
  const pointer = new THREE.Mesh(
    new THREE.ConeGeometry(0.1, 0.22, 16),
    new THREE.MeshBasicMaterial({ color: 0xef4444 })
  );
  pointer.rotation.x = Math.PI;
  pointer.position.set(0, 2.1, 0);
  pointer.name = 'swapping-animation';
  sortGroup.add(pointer);

  sortGroup.scale.setScalar(scale);

  return {
    group: sortGroup,
    type: 'sorting-algorithms',
    updatePulse: (elapsed) => {
      // Animate active comparison cursor scanning through bars
      const scanIdx = Math.floor((elapsed * 3.0) % barCount);
      const curBar = bars[scanIdx];
      pointer.position.x = curBar.mesh.position.x;
      pointer.position.y = curBar.mesh.scale.y * curBar.originalHeight + 0.35;

      bars.forEach((b, idx) => {
        if (idx === 5) {
          b.mesh.material = pivotMat; // Pivot
        } else if (idx === scanIdx) {
          b.mesh.material = compareMat; // Actively compared
        } else if (idx < 3) {
          b.mesh.material = sortedMat; // Sorted partition
        } else {
          b.mesh.material = defaultMat;
        }
      });
    }
  };
}

/**
 * Universal Model Loader Dispatcher
 * Automatically dispatches the ultra-realistic 3D model for ANY of the 15 curriculum topics.
 */
export function createOrgan3DModel(topicId = 'human-heart', options = {}) {
  const { scale = 1.0, onLoaded = null } = options;

  let helper;
  switch (topicId) {
    // Biology
    case 'human-brain':
      helper = createRealisticBrainModel(scale);
      break;
    case 'plant-cell':
      helper = createRealisticPlantCellModel(scale);
      break;
    case 'human-heart':
      helper = createRealisticHeartModel(scale);
      break;

    // Physics
    case 'solar-system':
      helper = createRealisticSolarSystemModel(scale);
      break;
    case 'electromagnetism':
      helper = createRealisticElectromagnetismModel(scale);
      break;
    case 'optics-refraction':
      helper = createRealisticOpticsPrismModel(scale);
      break;

    // Chemistry
    case 'water-molecule':
      helper = createRealisticWaterMoleculeModel(scale);
      break;
    case 'periodic-table':
      helper = createRealisticAtomOrbitalsModel(scale);
      break;
    case 'chemical-reactions':
      helper = createRealisticChemicalReactionsModel(scale);
      break;

    // Mathematics
    case 'pythagorean-theorem':
      helper = createRealisticPythagoreanModel(scale);
      break;
    case 'coordinate-geometry':
      helper = createRealisticCoordinateGeometryModel(scale);
      break;
    case 'calculus-derivatives':
      helper = createRealisticCalculusDerivativesModel(scale);
      break;

    // Computer Science
    case 'binary-search-tree':
      helper = createRealisticBinarySearchTreeModel(scale);
      break;
    case 'cpu-architecture':
      helper = createRealisticCpuArchitectureModel(scale);
      break;
    case 'sorting-algorithms':
      helper = createRealisticSortingAlgorithmsModel(scale);
      break;

    default:
      helper = createRealisticHeartModel(scale);
      break;
  }

  // Attempt custom GLB load if available for topic
  const glbPath = `/models/${topicId}.glb`;
  const loader = new GLTFLoader();
  loader.load(
    glbPath,
    (gltf) => {
      const model = gltf.scene;
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const s = (2.4 / (maxDim || 1)) * scale;

      model.scale.setScalar(s);
      model.position.sub(center.multiplyScalar(s));

      while (helper.group.children.length > 0) {
        helper.group.remove(helper.group.children[0]);
      }
      helper.group.add(model);

      if (onLoaded) onLoaded({ type: 'glb', root: helper.group });
    },
    undefined,
    () => {
      if (onLoaded) onLoaded({ type: 'procedural-realistic', root: helper.group });
    }
  );

  return helper;
}

