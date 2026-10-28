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
 * Universal Organ Model Loader
 * Automatically dispatches the ultra-realistic 3D model for the selected topic.
 */
export function createOrgan3DModel(topicId = 'human-heart', options = {}) {
  const { scale = 1.0, onLoaded = null } = options;

  let helper;
  switch (topicId) {
    case 'human-brain':
      helper = createRealisticBrainModel(scale);
      break;
    case 'plant-cell':
      helper = createRealisticPlantCellModel(scale);
      break;
    case 'human-heart':
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

      // Clear procedural children and replace with GLB
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
