/**
 * EduVision AR - Phase 2 Heart Anatomical Data
 * Details for the 4 core cardiac chambers and blood flow pathways.
 */

export const CHAMBER_DATA = [
  {
    id: 'right-atrium',
    name: 'Right Atrium',
    shortName: 'RA',
    oxygenated: false,
    color: '#3b82f6',
    position: [-0.75, 0.45, 0.4], // 3D anchor coordinate
    cameraFocus: { x: -1.2, y: 0.6, z: 3.2 },
    summary: 'Receives deoxygenated blood from the superior & inferior vena cava and passes it into the Right Ventricle.',
    vessels: 'Superior & Inferior Vena Cava',
    valve: 'Tricuspid Valve'
  },
  {
    id: 'left-atrium',
    name: 'Left Atrium',
    shortName: 'LA',
    oxygenated: true,
    color: '#ef4444',
    position: [0.75, 0.5, -0.2],
    cameraFocus: { x: 1.2, y: 0.6, z: 3.2 },
    summary: 'Receives oxygen-rich blood returning from the lungs through four pulmonary veins and funnels it into the Left Ventricle.',
    vessels: '4 Pulmonary Veins',
    valve: 'Bicuspid (Mitral) Valve'
  },
  {
    id: 'right-ventricle',
    name: 'Right Ventricle',
    shortName: 'RV',
    oxygenated: false,
    color: '#60a5fa',
    position: [-0.55, -0.4, 0.65],
    cameraFocus: { x: -0.9, y: -0.3, z: 3.5 },
    summary: 'Muscular chamber that propels oxygen-depleted blood under moderate pressure through the pulmonary valve toward both lungs.',
    vessels: 'Pulmonary Artery / Trunk',
    valve: 'Pulmonary Semilunar Valve'
  },
  {
    id: 'left-ventricle',
    name: 'Left Ventricle',
    shortName: 'LV',
    oxygenated: true,
    color: '#f87171',
    position: [0.65, -0.5, 0.4],
    cameraFocus: { x: 1.0, y: -0.4, z: 3.5 },
    summary: 'The thickest and most powerful chamber; contracts forcefully to drive oxygenated blood through the aorta across the entire body.',
    vessels: 'Aorta (Ascending & Systemic Arch)',
    valve: 'Aortic Semilunar Valve'
  }
];
