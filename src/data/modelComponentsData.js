/**
 * Comprehensive 3D Model Components & Scientific Telemetry Dataset
 * Provides anatomical, physical, chemical, mathematical, and computational breakdown
 * for all 15 EduVision curriculum topics across Biology, Physics, Chemistry, Math, and CS.
 */

export const MODEL_COMPONENTS_DATA = {
  // =========================================================================
  // BIOLOGY
  // =========================================================================
  'human-heart': {
    title: 'Human Heart',
    system: 'Cardiovascular Circulation',
    renderBadge: 'PBR Muscle Striation & Dual Pulse',
    telemetry: [
      { label: 'Cardiac Output', value: '5.2 L/min', unit: 'Systemic flow' },
      { label: 'Rhythm Rate', value: '72 BPM', unit: 'SA Pacemaker' },
      { label: 'Mean Arterial BP', value: '93 mmHg', unit: '120/80 Systolic/Diastolic' },
      { label: 'Myocardial Stroke', value: '70 mL', unit: 'Per ventricular contraction' }
    ],
    components: [
      {
        id: 'left-ventricle',
        name: 'Left Ventricle',
        category: 'Systemic Pumping Chamber',
        tag: 'High Pressure (O₂-Rich)',
        color: '#ef4444',
        focus: [0.35, -0.2, 0.2],
        summary: 'The thickest muscular chamber of the heart. Generates high contractile force to pump oxygenated blood into the aorta.',
        specs: { 'Wall Thickness': '10-15 mm', 'Ejection Pressure': '120 mmHg', 'Valve': 'Aortic Semilunar', 'Outflow': 'Systemic Aorta' }
      },
      {
        id: 'right-ventricle',
        name: 'Right Ventricle',
        category: 'Pulmonary Pumping Chamber',
        tag: 'Low Pressure (CO₂-Rich)',
        color: '#3b82f6',
        focus: [-0.35, -0.15, 0.3],
        summary: 'Crescent-shaped chamber that ejects venous blood into the pulmonary trunk toward the lungs for gas exchange.',
        specs: { 'Wall Thickness': '3-5 mm', 'Ejection Pressure': '25 mmHg', 'Valve': 'Pulmonary Semilunar', 'Outflow': 'Pulmonary Artery' }
      },
      {
        id: 'aortic-arch',
        name: 'Aortic Arch & Brachiocephalic Branches',
        category: 'Primary Arterial Trunk',
        tag: 'High Velocity Conduit',
        color: '#f43f5e',
        focus: [0.0, 0.75, -0.1],
        summary: 'The main trunk of the systemic arterial system, arching superiorly and giving rise to carotid and subclavian vessels.',
        specs: { 'Diameter': '25-30 mm', 'Elastic Recoil': 'Windkessel Effect', 'Flow Velocity': '0.9 - 1.2 m/s', 'Origin': 'Aortic Vestibule' }
      },
      {
        id: 'vena-cava',
        name: 'Superior & Inferior Vena Cava',
        category: 'Great Venous Return',
        tag: 'Venous Return (CO₂-Rich)',
        color: '#2563eb',
        focus: [-0.45, 0.5, -0.3],
        summary: 'Large systemic veins returning deoxygenated blood from upper and lower extremities directly into the right atrium.',
        specs: { 'Central Venous Pressure': '2-6 mmHg', 'Flow Type': 'Low-resistance continuous', 'Tributaries': 'Jugular & Hepatic', 'Insertion': 'Right Atrium' }
      }
    ]
  },

  'human-brain': {
    title: 'Human Brain',
    system: 'Central Nervous System',
    renderBadge: 'Cortical Sulci & Synaptic Firing Mesh',
    telemetry: [
      { label: 'Neuron Count', value: '~86 Billion', unit: 'Somatic Nodes' },
      { label: 'Synaptic Connections', value: '~100 Trillion', unit: 'Dendritic Junctions' },
      { label: 'Cerebral Blood Flow', value: '750 mL/min', unit: '15% Cardiac Output' },
      { label: 'Cerebrospinal Fluid', value: '150 mL', unit: 'Subarachnoid Volume' }
    ],
    components: [
      {
        id: 'frontal-lobe',
        name: 'Frontal Lobe & Prefrontal Cortex',
        category: 'Executive Command Center',
        tag: 'Cognition & Voluntary Motor',
        color: '#38bdf8',
        focus: [0.0, 0.3, 0.6],
        summary: 'Houses the prefrontal cortex for planning, reasoning, impulse control, working memory, and the primary motor strip.',
        specs: { 'Dominant Functions': 'Executive control, speech (Broca)', 'Sulcal Boundary': 'Central Sulcus', 'Brodmann Areas': '4, 6, 8, 9, 10, 44', 'Blood Supply': 'Anterior Cerebral Artery' }
      },
      {
        id: 'cerebellum',
        name: 'Cerebellum ("Little Brain")',
        category: 'Motor Calibration & Balance',
        tag: 'High-Density Purkinje Cells',
        color: '#a855f7',
        focus: [0.0, -0.4, -0.55],
        summary: 'Contains over 50% of all neurons in the brain. Coordinates voluntary movements, fine motor agility, balance, and motor learning.',
        specs: { 'Neuron Share': '50-80% of total brain', 'Cell Architecture': 'Purkinje & Granule cells', 'Afferents': 'Vestibular & Proprioceptive', 'Peduncles': 'Superior, Middle, Inferior' }
      },
      {
        id: 'brainstem',
        name: 'Brainstem (Midbrain, Pons, Medulla)',
        category: 'Autonomic Vitality Core',
        tag: 'Life Support Hub',
        color: '#f59e0b',
        focus: [0.0, -0.7, -0.2],
        summary: 'Connects the cerebrum to the spinal cord. Regulates critical autonomic functions including respiration, heart rate, and blood pressure.',
        specs: { 'Cranial Nerves': 'III through XII', 'Reticular Formation': 'Arousal & Consciousness', 'Cardiac Center': 'Medullary Vasomotor', 'Respiratory Center': 'Dorsal/Ventral Medullary' }
      },
      {
        id: 'cerebral-hemispheres',
        name: 'Cerebral Cortex & Hemispheres',
        category: 'Higher Cognitive Integration',
        tag: 'Bilateral Processing',
        color: '#ec4899',
        focus: [0.4, 0.2, 0.1],
        summary: 'Divided into left and right hemispheres connected by the corpus callosum. Oversees perception, language, spatial awareness, and memory.',
        specs: { 'Surface Area': '2,200 cm² (Folded)', 'Cortical Layers': '6 Neocortical Laminae', 'Fissure': 'Longitudinal Medial Fissure', 'Myelination': 'Dense White Matter Tracts' }
      }
    ]
  },

  'plant-cell': {
    title: 'Plant Eukaryotic Cell',
    system: 'Cellular Plant Biology',
    renderBadge: 'Hexagonal Cutaway with Internal Organelles',
    telemetry: [
      { label: 'Turgor Pressure', value: '0.7 MPa', unit: 'Vacuolar Hydrostatic' },
      { label: 'Chloroplast Count', value: '40-100', unit: 'Per Photosynthetic Cell' },
      { label: 'Cell Wall Elasticity', value: '1.2 GPa', unit: 'Tensile Modulus' },
      { label: 'Cytoplasmic Streaming', value: '5-10 µm/s', unit: 'Actin-Myosin Flow' }
    ],
    components: [
      {
        id: 'central-vacuole',
        name: 'Large Central Vacuole',
        category: 'Hydrostatic Turgor Engine',
        tag: 'Tonoplast Encased',
        color: '#06b6d4',
        focus: [-0.25, 0.05, -0.15],
        summary: 'Occupies up to 80-90% of cellular volume. Maintains hydrostatic turgor pressure that keeps stems and leaves upright.',
        specs: { 'Membrane': 'Tonoplast (Selective)', 'Contents': 'Cell Sap, Hydrated Ions', 'Function': 'Osmotic Rigidity, Nutrient Storage', 'Volume Share': 'Up to 90%' }
      },
      {
        id: 'chloroplasts',
        name: 'Chloroplasts & Thylakoid Grana',
        category: 'Photosynthetic Sugar Factory',
        tag: 'Photonic Conversion',
        color: '#15803d',
        focus: [-0.75, 0.02, 0.45],
        summary: 'Double-membraned organelle containing thylakoid discs stacked into grana. Converts sunlight, H₂O, and CO₂ into glucose.',
        specs: { 'Pigment': 'Chlorophyll a and b', 'Internal Structure': 'Thylakoids & Stroma', 'Reaction': '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂', 'Genome': 'Circular Plastid DNA' }
      },
      {
        id: 'cell-wall',
        name: 'Cellulose Cell Wall',
        category: 'Structural Exoskeleton',
        tag: 'Cellulose Microfibrils',
        color: '#84cc16',
        focus: [0.0, 0.35, 0.6],
        summary: 'Rigid outer layer composed of crystalline cellulose microfibrils embedded in pectin and hemicellulose. Prevents osmotic lysis.',
        specs: { 'Composition': 'Cellulose, Hemicellulose, Pectin', 'Pores': 'Plasmodesmata Channels', 'Thickness': '0.1 - 10 µm', 'Mechanical Role': 'Withstands Tensile Turgor' }
      },
      {
        id: 'nucleus',
        name: 'Eukaryotic Nucleus & Nucleolus',
        category: 'Genomic Control Center',
        tag: 'DNA Transcription Hub',
        color: '#8b5cf6',
        focus: [0.52, 0.08, 0.32],
        summary: 'Enclosed in a perforated double membrane (nuclear envelope). Contains chromatin fibers and a dark nucleolus for ribosome assembly.',
        specs: { 'Envelope': 'Double Lipid Bilayer with Pores', 'Core': 'Nucleolus (rRNA Synthesis)', 'Genome': 'Linear Chromosomal DNA', 'Regulation': 'Transcriptional Gating' }
      }
    ]
  },

  // =========================================================================
  // PHYSICS
  // =========================================================================
  'solar-system': {
    title: 'Solar System & Planetary Orbits',
    system: 'Astrophysics & Keplerian Gravitation',
    renderBadge: 'Keplerian Orbits & Rotating Celestial Spheres',
    telemetry: [
      { label: 'Solar Mass Share', value: '99.86%', unit: 'Total System Mass' },
      { label: 'Earth Orbital Speed', value: '29.78 km/s', unit: 'Helio-centric velocity' },
      { label: 'Kepler Constant', value: 'T²/a³ = const', unit: 'Harmonic Law' },
      { label: '1 Astronomical Unit', value: '149.6M km', unit: 'Sun-to-Earth distance' }
    ],
    components: [
      {
        id: 'sun-core',
        name: 'The Sun (Sol)',
        category: 'G-Type Main Sequence Star',
        tag: 'Thermonuclear Fusion',
        color: '#f59e0b',
        focus: [0.0, 0.0, 0.0],
        summary: 'The central gravitational anchor of our system. Fuses 600 million tons of hydrogen into helium every second in its core.',
        specs: { 'Core Temperature': '15,000,000 K', 'Photosphere Temp': '5,778 K', 'Mass': '1.989 × 10³⁰ kg', 'Gravitational Pull': '274 m/s²' }
      },
      {
        id: 'earth-moon',
        name: 'Earth & Luna Orbit',
        category: 'Terrestrial Habitable Planet',
        tag: 'Liquid Water & Atmosphere',
        color: '#0284c7',
        focus: [1.2, 0.0, 0.4],
        summary: 'Third planet from the Sun. Possesses a dynamic hydrosphere, nitrogen-oxygen atmosphere, and a stabilizing large natural satellite.',
        specs: { 'Distance from Sun': '1.0 AU (149.6M km)', 'Orbital Period': '365.25 Days', 'Axial Tilt': '23.44°', 'Escape Velocity': '11.19 km/s' }
      },
      {
        id: 'saturn-rings',
        name: 'Saturn & Ring System',
        category: 'Gas Giant with Ring System',
        tag: 'Ice & Rock Debris Rings',
        color: '#d97706',
        focus: [-2.1, 0.0, -1.0],
        summary: 'Spectacular gas giant famous for its extensive ring system spanning up to 282,000 kilometers yet only tens of meters thick.',
        specs: { 'Ring Diameter': '282,000 km', 'Ring Thickness': '~10 meters', 'Orbital Period': '29.4 Earth Years', 'Composition': '96% H₂, 3% He, trace ice' }
      },
      {
        id: 'planetary-orbits',
        name: 'Keplerian Elliptical Orbits',
        category: 'Orbital Mechanics Path',
        tag: 'Inverse Square Law',
        color: '#6366f1',
        focus: [0.0, 0.8, 1.5],
        summary: 'Stable concentric elliptical paths governed by Newton’s universal gravitation and Kepler’s three laws of planetary motion.',
        specs: { 'Law 1': 'Orbits are ellipses with Sun at focus', 'Law 2': 'Equal area swept in equal time', 'Law 3': 'T² is proportional to r³', 'Gravitation': 'F = G·(m₁m₂)/r²' }
      }
    ]
  },

  'electromagnetism': {
    title: 'Electromagnetic Induction & Motors',
    system: 'Classical Electrodynamics',
    renderBadge: 'B-Field Vector Stream & Lorentz Rotor',
    telemetry: [
      { label: 'Magnetic Flux (Φ)', value: 'B · A · cos(θ)', unit: 'Webers (Wb)' },
      { label: 'Induced EMF (ε)', value: '-N (dΦ/dt)', unit: 'Faraday-Lenz Law' },
      { label: 'Lorentz Force', value: 'I (L × B)', unit: 'Rotational Torque' },
      { label: 'Motor Efficiency', value: '94.2%', unit: 'Electrical to Mech' }
    ],
    components: [
      {
        id: 'solenoid-coil',
        name: 'Copper Solenoid Windings',
        category: 'Induction Coil Geometry',
        tag: 'Current-Carrying Loop',
        color: '#f97316',
        focus: [0.0, 0.0, 0.0],
        summary: 'Tightly wound insulated copper wire loops that produce a uniform internal magnetic field B = μ₀·n·I when energized.',
        specs: { 'Turn Density (n)': '800 turns/m', 'Conductivity': '5.96 × 10⁷ S/m', 'Internal Field': 'B = μ₀ · n · I', 'Self-Inductance': 'L = μ₀ · N² · A / l' }
      },
      {
        id: 'magnetic-flux',
        name: 'Magnetic B-Field Lines',
        category: 'Flux Vector Field',
        tag: 'Divergence-Free Field',
        color: '#06b6d4',
        focus: [0.0, 0.5, 0.6],
        summary: 'Continuous closed-loop magnetic vector lines emerging from the North pole and returning through the South pole.',
        specs: { 'Gauss Law': '∇ · B = 0 (No monopoles)', 'Field Direction': 'North to South externally', 'Field Intensity': 'Tesla (T) or Gauss', 'Flux Density': 'Webers per m²' }
      },
      {
        id: 'rotor-armature',
        name: 'Rotating Rotor Armature',
        category: 'Electromechanical Core',
        tag: 'Lorentz Torque Generation',
        color: '#a855f7',
        focus: [0.0, 0.0, 0.3],
        summary: 'The central rotating element of an electric motor experiencing continuous torque τ = m × B generated by Lorentz forces.',
        specs: { 'Lorentz Force': 'F = q(E + v × B)', 'Torque Equation': 'τ = N · I · A · B · sin(θ)', 'Commutator Role': 'Reverses current polarity', 'Speed': '1,500 - 3,000 RPM' }
      },
      {
        id: 'pole-magnets',
        name: 'Stator Field Poles (N & S)',
        category: 'Stator Magnetic Field Source',
        tag: 'Permanent Neodymium Magnets',
        color: '#ef4444',
        focus: [-0.9, 0.0, 0.0],
        summary: 'Opposing magnetic poles providing the external uniform magnetic flux required for electromagnetic interaction.',
        specs: { 'Pole Material': 'NdFeB Neodymium Grade N52', 'Remanence (Br)': '1.45 Tesla', 'Coercivity': '≥ 860 kA/m', 'Curie Temperature': '310 °C' }
      }
    ]
  },

  'optics-refraction': {
    title: 'Wave Optics & Light Refraction',
    system: 'Wave & Geometric Optics',
    renderBadge: 'Dispersion Prism with Multi-Spectrum Rays',
    telemetry: [
      { label: 'Snell Index n₁', value: '1.000', unit: 'Ambient Air' },
      { label: 'Prism Index n₂', value: '1.517', unit: 'Crown Optical Glass' },
      { label: 'Critical Angle θc', value: '41.14°', unit: 'Total Internal Reflection' },
      { label: 'Dispersion Spread', value: 'Δθ = 2.4°', unit: 'Red 700nm to Violet 400nm' }
    ],
    components: [
      {
        id: 'glass-prism',
        name: 'Equilateral Dispersive Prism',
        category: 'Refractive Optical Medium',
        tag: 'Dielectric Crown Glass',
        color: '#38bdf8',
        focus: [0.0, 0.0, 0.0],
        summary: 'A precision-ground triangular glass block exhibiting chromatic dispersion due to wavelength-dependent refractive indices.',
        specs: { 'Refractive Index': 'n = 1.517 (Sodium D)', 'Apex Angle': '60.0° Equilateral', 'Material': 'Borosilicate BK7 / Flint', 'Abbe Number': 'Vd = 64.17' }
      },
      {
        id: 'white-beam',
        name: 'Collimated White Incident Ray',
        category: 'Polychromatic Source',
        tag: 'Composite Wavefront',
        color: '#ffffff',
        focus: [-0.8, -0.2, 0.2],
        summary: 'A narrow collimated beam of electromagnetic radiation containing all visible frequencies spanning 380 nm to 750 nm.',
        specs: { 'Wavelength Range': '380 - 750 nm', 'Angle of Incidence': 'θ₁ = 45.0°', 'Velocity in Air': '2.997 × 10⁸ m/s', 'Photon Energies': '1.65 - 3.26 eV' }
      },
      {
        id: 'dispersion-fan',
        name: 'Refracted Spectral Rainbow Fan',
        category: 'Chromatic Dispersion',
        tag: 'Wavelength Differential Bending',
        color: '#ec4899',
        focus: [0.7, 0.2, -0.2],
        summary: 'Because shorter wavelengths (violet, 400 nm) travel slower in glass than longer wavelengths (red, 700 nm), they bend more sharply.',
        specs: { 'Violet Bending': 'Maximum (n ≈ 1.530)', 'Red Bending': 'Minimum (n ≈ 1.510)', 'Cauchy Formula': 'n(λ) = A + B/λ² + C/λ⁴', 'Spectrum': 'Red, Orange, Yellow, Green, Blue, Violet' }
      },
      {
        id: 'reflected-ray',
        name: 'Fresnel Partial Reflection Ray',
        category: 'Boundary Reflection',
        tag: 'Fresnel Equations',
        color: '#94a3b8',
        focus: [-0.4, 0.6, 0.2],
        summary: 'At any dielectric boundary, a fraction of incoming photonic energy reflects at an angle equal to the incident angle: θr = θi.',
        specs: { 'Law of Reflection': 'θ_reflection = θ_incidence', 'Fresnel Reflectance': 'R ≈ 4.2% at normal incidence', 'Phase Shift': '180° upon denser medium', 'Polarization': 'Brewster angle polarization' }
      }
    ]
  },

  // =========================================================================
  // CHEMISTRY
  // =========================================================================
  'water-molecule': {
    title: 'Water Molecule & Hydrogen Bonds',
    system: 'Chemical Bonding & Molecular Geometry',
    renderBadge: '104.5° Bent Ball-and-Stick with Lone Pairs',
    telemetry: [
      { label: 'H-O-H Bond Angle', value: '104.45°', unit: 'Bent Tetrahedral Repulsion' },
      { label: 'O-H Bond Length', value: '95.84 pm', unit: '0.958 Ångströms' },
      { label: 'Net Dipole Moment', value: '1.854 D', unit: 'Debyes Polar Vector' },
      { label: 'H-Bond Energy', value: '23.3 kJ/mol', unit: 'Intermolecular Cohesion' }
    ],
    components: [
      {
        id: 'oxygen-atom',
        name: 'Central Oxygen Atom (δ-)',
        category: 'Electronegative Core',
        tag: 'High Electronegativity (3.44)',
        color: '#ef4444',
        focus: [0.0, 0.1, 0.0],
        summary: 'Strongly pulls shared covalent electron pairs toward its nucleus, generating a concentrated partial negative charge (δ-).',
        specs: { 'Electronegativity': '3.44 (Pauling Scale)', 'Atomic Radius': '66 pm', 'Valence Electrons': '6 (2s² 2p⁴)', 'Hybridization': 'sp³ modified' }
      },
      {
        id: 'hydrogen-atoms',
        name: 'Hydrogen Atoms (δ+)',
        category: 'Electropositive Termini',
        tag: 'Partial Positive Charge (δ+)',
        color: '#38bdf8',
        focus: [0.65, -0.4, 0.0],
        summary: 'Two proton nuclei with stripped electron clouds positioned at an angle of 104.45°, forming the foundation for hydrogen bonding.',
        specs: { 'Electronegativity': '2.20 (Pauling Scale)', 'Atomic Number': '1 (1s¹)', 'Bond Energy': '463 kJ/mol (O-H Covalent)', 'Partial Charge': '+0.41 e each' }
      },
      {
        id: 'lone-pairs',
        name: 'Non-Bonding Lone Electron Pairs',
        category: 'Steric Orbital Clouds',
        tag: 'VSEPR Repulsion Lobes',
        color: '#a855f7',
        focus: [-0.3, 0.55, 0.35],
        summary: 'Two localized electron pairs in sp³ hybrid orbitals that exert powerful repulsive force, squeezing the bond angle from 109.5° to 104.5°.',
        specs: { 'VSEPR Geometry': 'Bent / Angular (AX₂E₂)', 'Steric Number': '4 (2 bonds, 2 lone pairs)', 'Repulsion Hierarchy': 'Lone Pair-Lone Pair > Lone Pair-Bond', 'Basicity': 'Acts as Lewis Base' }
      },
      {
        id: 'hydrogen-lattice',
        name: 'Intermolecular Hydrogen Bonding Lattice',
        category: 'Intermolecular Network',
        tag: 'Universal Solvent Matrix',
        color: '#06b6d4',
        focus: [0.9, 0.5, -0.6],
        summary: 'Electrostatic attractions between oxygen of one molecule and hydrogen of neighbor molecules create dynamic tetrahedral clusters.',
        specs: { 'H-Bond Lifetime': '1 - 20 picoseconds', 'Coordination Number': '3.6 (Liquid) to 4.0 (Ice)', 'Thermal Property': 'High Specific Heat (4.184 J/g°C)', 'Density Anomaly': 'Max density at 3.98 °C' }
      }
    ]
  },

  'periodic-table': {
    title: 'Atomic Structure & Quantum Orbitals',
    system: 'Quantum Chemistry & Wave Mechanics',
    renderBadge: 'Bohr Nucleus with 3D Spherical & Dumbbell Orbitals',
    telemetry: [
      { label: 'Principal Quantum (n)', value: '1, 2, 3...', unit: 'Energy Level Shells' },
      { label: 'Orbital Angular (l)', value: '0(s), 1(p), 2(d)', unit: 'Subshell Shape' },
      { label: 'Magnetic Quantum (mₗ)', value: '-l ... 0 ... +l', unit: 'Spatial Orientation' },
      { label: 'Electron Spin (mₛ)', value: '± ½', unit: 'Pauli Exclusion' }
    ],
    components: [
      {
        id: 'atomic-nucleus',
        name: 'Dense Atomic Nucleus',
        category: 'Subatomic Core',
        tag: 'Protons & Neutrons',
        color: '#ef4444',
        focus: [0.0, 0.0, 0.0],
        summary: 'Concentrates 99.95% of total atomic mass in a femtometer-scale sphere bound by the fundamental strong nuclear force.',
        specs: { 'Nuclear Diameter': '~10⁻¹⁵ meters (1 fm)', 'Binding Force': 'Residual Strong Force (Gluons)', 'Constituents': 'Z Protons + N Neutrons', 'Density': '2.3 × 10¹⁷ kg/m³' }
      },
      {
        id: 's-orbital',
        name: 'Spherical s-Orbital (l = 0)',
        category: 'Spherically Symmetric Cloud',
        tag: 'Zero Angular Momentum',
        color: '#38bdf8',
        focus: [0.0, 0.4, 0.4],
        summary: 'A completely spherical probability density distribution ψ² where electron presence is radially symmetric around the nucleus.',
        specs: { 'Quantum Number': 'l = 0, mₗ = 0', 'Capacity': 'Max 2 electrons (spin paired)', 'Radial Nodes': 'n - l - 1 nodes', 'Wavefunction': 'ψ(r) ∝ e^(-Zr/a₀)' }
      },
      {
        id: 'p-orbitals',
        name: 'Dumbbell p-Orbitals (px, py, pz)',
        category: 'Directional Angular Clouds',
        tag: 'Three Orthogonal Lobes',
        color: '#a855f7',
        focus: [0.6, 0.0, 0.0],
        summary: 'Three mutually perpendicular dumbbell-shaped lobes (px along X, py along Y, pz along Z) with a nodal plane at the nucleus.',
        specs: { 'Quantum Number': 'l = 1, mₗ = -1, 0, +1', 'Capacity': 'Max 6 electrons across subshell', 'Nodal Plane': 'ψ = 0 at the nucleus', 'Hybridization': 'Mixes into sp, sp², sp³' }
      },
      {
        id: 'valence-electrons',
        name: 'Valence Electron Shell',
        category: 'Reactive Outer Envelope',
        tag: 'Chemical Reactivity Drivers',
        color: '#f59e0b',
        focus: [0.8, -0.6, 0.4],
        summary: 'Outermost electrons that participate in chemical bonding, determine oxidation states, and define periodic trends.',
        specs: { 'Aufbau Rule': 'Lower energy subshells fill first', 'Hund’s Rule': 'Maximum multiplicity before pairing', 'Octet Rule': 'Strives for 8 valence electrons', 'Ionization Energy': 'Decreases down groups' }
      }
    ]
  },

  'chemical-reactions': {
    title: 'Reaction Kinetics & Thermodynamics',
    system: 'Chemical Energetics & Reaction Dynamics',
    renderBadge: '3D Activation Energy Barrier & Molecular Collisions',
    telemetry: [
      { label: 'Activation Energy (Ea)', value: '64.5 kJ/mol', unit: 'Arrhenius Energy Barrier' },
      { label: 'Reaction Enthalpy (ΔH)', value: '-89.2 kJ/mol', unit: 'Exothermic Release' },
      { label: 'Rate Constant (k)', value: 'A · e^(-Ea/RT)', unit: 'Arrhenius Law' },
      { label: 'Equilibrium (Keq)', value: '[Products] / [Reactants]', unit: 'Law of Mass Action' }
    ],
    components: [
      {
        id: 'reactants-complex',
        name: 'Reactant Molecules State (A₂ + B₂)',
        category: 'Initial Ground State',
        tag: 'Collision Theory Substrates',
        color: '#3b82f6',
        focus: [-0.9, -0.3, 0.0],
        summary: 'Stable molecular reactants colliding with thermal kinetic energy and specific spatial trajectories.',
        specs: { 'Collision Theory': 'Rate ∝ Collision frequency × Orientation factor × Energy factor', 'Bond Orders': 'Original reactant bonds intact', 'Potential Energy': 'Ground state baseline', 'Thermal Energy': 'E_kin = 3/2 k_B T' }
      },
      {
        id: 'transition-state',
        name: 'Activated Transition Complex [A···B]‡',
        category: 'High-Energy Peak (Ea)',
        tag: 'Unstable Quasi-Symmetric State',
        color: '#f59e0b',
        focus: [0.0, 0.8, 0.0],
        summary: 'The highest energy configuration along the reaction coordinate where old bonds are half-broken and new bonds half-formed.',
        specs: { 'Lifetime': 'Femtosecond scale (~10⁻¹⁴ s)', 'Peak Energy': 'Activation Barrier (Ea)', 'Vibrational Mode': 'Imaginary frequency along reaction path', 'Catalyst Impact': 'Lowers this peak barrier' }
      },
      {
        id: 'products-state',
        name: 'Formed Product Molecules (2 AB)',
        category: 'Final Thermally Stable State',
        tag: 'Exothermic Energy Well',
        color: '#10b981',
        focus: [0.9, -0.6, 0.0],
        summary: 'Thermodynamically stable product molecules formed after overcoming the activation barrier and releasing net heat.',
        specs: { 'Enthalpy (ΔH)': 'Negative (Exothermic release)', 'Gibbs Free Energy': 'ΔG = ΔH - TΔS < 0 (Spontaneous)', 'Bond Strength': 'New product bonds stronger than reactants', 'Distribution': 'Boltzmann distribution' }
      },
      {
        id: 'catalytic-surface',
        name: 'Catalytic Surface & Alternative Pathway',
        category: 'Kinetic Accelerator',
        tag: 'Enzyme / Metal Adsorption',
        color: '#ec4899',
        focus: [0.0, 0.2, 0.5],
        summary: 'Provides an alternative reaction mechanism with a lower activation energy, accelerating reaction velocity without being consumed.',
        specs: { 'Mechanism': 'Substrate adsorption and strain', 'Activation Shift': 'Reduces Ea by 30-70%', 'Rate Enhancement': 'Up to 10⁶ to 10¹² fold', 'Equilibrium Effect': 'Does NOT shift Keq' }
      }
    ]
  },

  // =========================================================================
  // MATHEMATICS
  // =========================================================================
  'pythagorean-theorem': {
    title: 'Pythagorean Theorem & Trigonometry',
    system: 'Euclidean Geometry & Trigonometric Analysis',
    renderBadge: '3D Geometric Square Proofs (a² + b² = c²) & Unit Circle',
    telemetry: [
      { label: 'Hypotenuse (c)', value: '√(a² + b²)', unit: 'c = 5.0 units' },
      { label: 'Sine Function', value: 'Opposite / Hypotenuse', unit: 'sin(θ) = 3/5 = 0.6' },
      { label: 'Cosine Function', value: 'Adjacent / Hypotenuse', unit: 'cos(θ) = 4/5 = 0.8' },
      { label: 'Identity', value: 'sin²(θ) + cos²(θ) = 1', unit: 'Fundamental Trig' }
    ],
    components: [
      {
        id: 'triangle-core',
        name: 'Right-Angled Base Triangle (3-4-5)',
        category: 'Euclidean Right Triangle',
        tag: '90° Orthogonal Vertex',
        color: '#f59e0b',
        focus: [0.0, 0.0, 0.0],
        summary: 'The central right triangle with leg a = 3, leg b = 4, and hypotenuse c = 5 satisfying the invariant a² + b² = c².',
        specs: { 'Leg a': '3.0 units', 'Leg b': '4.0 units', 'Hypotenuse c': '5.0 units (3² + 4² = 9 + 16 = 25)', 'Right Angle': '90° (π/2 radians)' }
      },
      {
        id: 'square-a',
        name: 'Square on Leg a (Area = 9 units²)',
        category: 'Geometric Area Platform',
        tag: '3 × 3 Grid Lattice',
        color: '#ef4444',
        focus: [-0.65, 0.45, 0.0],
        summary: 'Square erected on the vertical leg of length 3, composed of 9 modular unit cubes demonstrating geometric area visually.',
        specs: { 'Side Length': 'a = 3', 'Geometric Area': 'a² = 9 square units', 'Grid Dimensions': '3 × 3 unit cells', 'Modular Composition': '9 volume cubes' }
      },
      {
        id: 'square-b',
        name: 'Square on Leg b (Area = 16 units²)',
        category: 'Geometric Area Platform',
        tag: '4 × 4 Grid Lattice',
        color: '#3b82f6',
        focus: [0.35, -0.65, 0.0],
        summary: 'Square erected on the horizontal base leg of length 4, containing exactly 16 unit tiles.',
        specs: { 'Side Length': 'b = 4', 'Geometric Area': 'b² = 16 square units', 'Grid Dimensions': '4 × 4 unit cells', 'Modular Composition': '16 volume cubes' }
      },
      {
        id: 'square-c',
        name: 'Hypotenuse Square c (Area = 25 units²)',
        category: 'Conservation of Area Result',
        tag: '5 × 5 Combined Sum',
        color: '#10b981',
        focus: [0.6, 0.55, 0.0],
        summary: 'Square erected on the hypotenuse whose area precisely equals the sum of the other two squares: 9 + 16 = 25.',
        specs: { 'Side Length': 'c = 5', 'Area Equation': 'c² = a² + b² = 25', 'Grid Dimensions': '5 × 5 unit cells', 'Proof Mechanism': 'Euclidean area dissection' }
      }
    ]
  },

  'coordinate-geometry': {
    title: '3D Vectors & Coordinate Geometry',
    system: 'Multidimensional Vector Algebra',
    renderBadge: 'Orthogonal X, Y, Z Coordinate Frames with Cross Product',
    telemetry: [
      { label: 'Dot Product', value: 'A · B = |A||B| cos(θ)', unit: 'Scalar Projection' },
      { label: 'Cross Product', value: 'A × B = |A||B| sin(θ) n̂', unit: 'Normal Vector' },
      { label: 'Euclidean Norm', value: '|V| = √(x² + y² + z²)', unit: 'Vector Magnitude' },
      { label: 'Plane Equation', value: 'Ax + By + Cz + D = 0', unit: 'Hyperplane' }
    ],
    components: [
      {
        id: 'cartesian-axes',
        name: 'Orthogonal Axis Frame (X, Y, Z)',
        category: 'Right-Handed Coordinate Basis',
        tag: 'Mutual 90° Orthogonality',
        color: '#f43f5e',
        focus: [0.0, 0.0, 0.0],
        summary: 'Three mutually perpendicular axes establishing a complete 3D spatial reference system according to the right-hand rule.',
        specs: { 'X-Axis': 'Crimson Vector (1, 0, 0)', 'Y-Axis': 'Emerald Vector (0, 1, 0)', 'Z-Axis': 'Sapphire Vector (0, 0, 1)', 'Metric': 'Euclidean metric ds² = dx² + dy² + dz²' }
      },
      {
        id: 'position-vector',
        name: 'Position Vector V = (x, y, z)',
        category: 'Spatial State Vector',
        tag: 'Direction & Magnitude',
        color: '#a855f7',
        focus: [0.5, 0.7, 0.4],
        summary: 'A directed line segment from origin to coordinates (x, y, z) with spatial projections onto all three orthogonal planes.',
        specs: { 'Coordinates': 'P = (1.2, 1.5, 0.9)', 'Magnitude': '|V| = √(1.2² + 1.5² + 0.9²) ≈ 2.12', 'Direction Cosines': 'cos α, cos β, cos γ', 'Unit Vector': 'v̂ = V / |V|' }
      },
      {
        id: 'cross-product-vector',
        name: 'Cross Product Vector (A × B)',
        category: 'Orthogonal Normal Vector',
        tag: 'Perpendicular to Plane',
        color: '#f59e0b',
        focus: [0.0, 1.1, -0.4],
        summary: 'A new vector strictly perpendicular to both vector A and vector B with magnitude equal to the spanned parallelogram area.',
        specs: { 'Right-Hand Rule': 'Fingers curl A to B, thumb points A × B', 'Magnitude': '|A × B| = Area of parallelogram', 'Anticommutative': 'A × B = -(B × A)', 'Parallel Condition': 'A × B = 0 if A ∥ B' }
      },
      {
        id: 'projection-planes',
        name: 'Projection Planes (XY, YZ, ZX)',
        category: 'Coordinate Hyperplanes',
        tag: 'Orthogonal Projections',
        color: '#38bdf8',
        focus: [0.0, 0.0, 0.0],
        summary: 'Reference grid planes allowing visualization of 2D shadows and projections of 3D spatial geometry.',
        specs: { 'XY Plane': 'z = 0', 'YZ Plane': 'x = 0', 'ZX Plane': 'y = 0', 'Grid Divisions': 'Metric unit increments' }
      }
    ]
  },

  'calculus-derivatives': {
    title: 'Calculus: Derivatives & Integrals',
    system: 'Mathematical Analysis & Differential Geometry',
    renderBadge: 'Dynamic 3D Ripple Surface with Tangent Plane & Slices',
    telemetry: [
      { label: 'Derivative', value: 'df/dx = lim(Δx→0) Δy/Δx', unit: 'Instantaneous Slope' },
      { label: 'Gradient Vector', value: '∇f = (∂f/∂x, ∂f/∂y)', unit: 'Direction of Max Ascent' },
      { label: 'Definite Integral', value: '∫∫ f(x,y) dA', unit: 'Accumulated 3D Volume' },
      { label: 'Fundamental Theorem', value: 'd/dx ∫ f(t) dt = f(x)', unit: 'Inversion Principle' }
    ],
    components: [
      {
        id: 'calculus-surface',
        name: '3D Parametric Continuous Surface z = f(x, y)',
        category: 'Continuous Differentiable Manifold',
        tag: 'Smooth Curvature Surface',
        color: '#6366f1',
        focus: [0.0, 0.2, 0.0],
        summary: 'A continuous multivariable mathematical function demonstrating smooth elevation variations, hills, and saddle points.',
        specs: { 'Function': 'z = 0.5 · (sin(2x) · cos(2y))', 'Continuity': 'C² Smooth (Twice differentiable)', 'Critical Points': '∇f = 0 (Maxima, Minima, Saddles)', 'Domain': 'x ∈ [-2, 2], y ∈ [-2, 2]' }
      },
      {
        id: 'tangent-plane',
        name: 'Tangent Plane at Inspection Point',
        category: 'First-Order Linear Approximation',
        tag: 'Local Flatness Manifold',
        color: '#f59e0b',
        focus: [0.3, 0.5, 0.3],
        summary: 'The best local linear approximation to the surface at point P, spanned by directional derivatives fx and fy.',
        specs: { 'Equation': 'z - z₀ = fx(x - x₀) + fy(y - y₀)', 'Normal Vector': 'n = (-fx, -fy, 1)', 'Slope fx': '∂z/∂x (Rate along X)', 'Slope fy': '∂z/∂y (Rate along Y)' }
      },
      {
        id: 'riemann-slices',
        name: 'Riemann Volume Slices (Integration)',
        category: 'Integral Calculus Volume Slices',
        tag: 'Accumulated Volume',
        color: '#10b981',
        focus: [0.0, -0.4, 0.0],
        summary: 'Prismatic rectangular volume slices beneath the curve whose sum converges to the exact definite integral.',
        specs: { 'Method': 'Double Riemann Sum', 'Limit': 'lim(ΔA→0) Σ f(xᵢ, yⱼ) ΔA', 'Volume Interpretation': 'Total mass or probability volume', 'Fubini Theorem': 'Iterated integration ∫ [∫ f dy] dx' }
      },
      {
        id: 'gradient-vector',
        name: 'Gradient Vector (∇f)',
        category: 'Maximum Ascent Vector',
        tag: 'Orthogonal to Contours',
        color: '#ec4899',
        focus: [0.3, 0.8, 0.3],
        summary: 'A 2D/3D vector pointing in the direction of the greatest rate of increase of the scalar function.',
        specs: { 'Definition': '∇f = (∂f/∂x) î + (∂f/∂y) ĵ', 'Magnitude': '|∇f| = Maximum slope rate', 'Contour Relation': 'Perpendicular to level curves', 'Machine Learning': 'Used in Gradient Descent' }
      }
    ]
  },

  // =========================================================================
  // COMPUTER SCIENCE
  // =========================================================================
  'binary-search-tree': {
    title: 'Binary Trees & Graph Algorithms',
    system: 'Data Structures & Algorithms',
    renderBadge: '3D Hierarchical Node Mesh with Traversal Glow',
    telemetry: [
      { label: 'Search Complexity', value: 'O(log n) Avg', unit: 'O(n) Worst case' },
      { label: 'Tree Height', value: 'h = ⌊log₂ n⌋', unit: 'Balanced Height' },
      { label: 'Inorder Sequence', value: 'Ascending Sorted', unit: 'BST Property' },
      { label: 'Node Count', value: '15 Nodes', unit: '4 Complete Levels' }
    ],
    components: [
      {
        id: 'root-node',
        name: 'Root Node (Value: 50)',
        category: 'Hierarchy Entry Point',
        tag: 'Tree Origin Anchor',
        color: '#f59e0b',
        focus: [0.0, 0.8, 0.0],
        summary: 'The topmost node of the tree hierarchy from which all child subtrees branch downward.',
        specs: { 'Value': '50 (Median)', 'Depth': '0', 'Children': 'Left: 25, Right: 75', 'Pointer Structure': 'left_child*, right_child*' }
      },
      {
        id: 'left-subtree',
        name: 'Left Subtree (Values < 50)',
        category: 'BST Invariant Lower Partition',
        tag: 'Strictly Smaller Values',
        color: '#38bdf8',
        focus: [-0.7, 0.1, 0.0],
        summary: 'All nodes in the left subtree satisfy key < root_key, guaranteeing efficient logarithmic search pruning.',
        specs: { 'Values': '[25, 12, 37, 6, 18, 31, 43]', 'Search Rule': 'If target < node, branch left', 'Balance Factor': 'Height(Left) - Height(Right)', 'Subtree Height': '3 levels' }
      },
      {
        id: 'right-subtree',
        name: 'Right Subtree (Values > 50)',
        category: 'BST Invariant Upper Partition',
        tag: 'Strictly Greater Values',
        color: '#a855f7',
        focus: [0.7, 0.1, 0.0],
        summary: 'All nodes in the right subtree satisfy key > root_key, maintaining hierarchical order.',
        specs: { 'Values': '[75, 62, 87, 56, 68, 81, 94]', 'Search Rule': 'If target > node, branch right', 'Max Element': 'Rightmost leaf node (94)', 'Min Element': 'Leftmost leaf of root' }
      },
      {
        id: 'traversal-path',
        name: 'Active Traversal Path (DFS / BFS Pulse)',
        category: 'Algorithmic Graph Flow',
        tag: 'Animated Search Wave',
        color: '#10b981',
        focus: [0.0, 0.0, 0.4],
        summary: 'Dynamic glowing pulses traveling down directional branch edges simulating recursive in-order tree traversal.',
        specs: { 'Inorder (LNR)': 'Yields strictly sorted values', 'Preorder (NLR)': 'Used for tree serialization', 'Postorder (LRN)': 'Used for bottom-up node deletion', 'BFS Level-Order': 'Explores queue-based layers' }
      }
    ]
  },

  'cpu-architecture': {
    title: 'CPU Architecture & Execution Cycle',
    system: 'Computer Architecture & Digital Logic',
    renderBadge: '3D Silicon Die with Microarchitectural Blocks & Pulsing Buses',
    telemetry: [
      { label: 'Clock Frequency', value: '4.2 GHz', unit: 'Internal Oscillator' },
      { label: 'IPC Throughput', value: '3.8 Instructions', unit: 'Per clock cycle' },
      { label: 'L1 Cache Latency', value: '0.9 ns', unit: '4 Clock Cycles' },
      { label: 'Data Bus Width', value: '64-Bit', unit: 'Internal Datapath' }
    ],
    components: [
      {
        id: 'alu-block',
        name: 'Arithmetic Logic Unit (ALU)',
        category: 'Computational Execution Core',
        tag: 'Math & Logic Gates',
        color: '#ef4444',
        focus: [0.4, 0.0, 0.35],
        summary: 'Executes all integer arithmetic operations (addition, subtraction) and bitwise Boolean logic (AND, OR, XOR, shifts).',
        specs: { 'Operations': 'ADD, SUB, AND, OR, XOR, SHL, SHR', 'Status Flags': 'Zero (ZF), Carry (CF), Sign (SF), Overflow (OF)', 'Width': '64-bit integer datapath', 'Latency': '1 single clock cycle' }
      },
      {
        id: 'control-unit',
        name: 'Control Unit & Instruction Decoder',
        category: 'Pipeline Conductor',
        tag: 'Fetch & Decode Engine',
        color: '#3b82f6',
        focus: [-0.4, 0.0, 0.35],
        summary: 'Fetches binary machine opcodes from instruction cache, decodes micro-operations, and orchestrates datapath control signals.',
        specs: { 'Cycle Phases': 'Fetch → Decode → Execute → Writeback', 'Branch Predictor': 'Two-level adaptive branch predictor', 'Micro-op Cache': 'Caches decoded RISC micro-ops', 'Interrupt Handler': 'Prioritized interrupt controller' }
      },
      {
        id: 'registers-array',
        name: 'High-Speed Register File (RAX - R15)',
        category: 'Zero-Latency Storage',
        tag: 'Static Flip-Flop Array',
        color: '#f59e0b',
        focus: [0.0, 0.0, 0.0],
        summary: 'Extremely fast on-chip storage locations directly connected to the ALU for immediate operand manipulation.',
        specs: { 'General Purpose': '16 × 64-bit registers (x86-64)', 'Special Registers': 'RIP (Instruction Pointer), RSP (Stack Pointer)', 'Read/Write Ports': 'Multiple parallel read/write ports', 'Access Time': '< 0.25 nanoseconds' }
      },
      {
        id: 'cache-bus',
        name: 'L1/L2 SRAM Cache & Internal Bus System',
        category: 'Memory Hierarchy Conduit',
        tag: 'Pulsing Binary Datapath',
        color: '#10b981',
        focus: [0.0, 0.0, -0.4],
        summary: 'High-speed SRAM caches and interconnect buses that feed instructions and operands to prevent memory latency stalls.',
        specs: { 'L1 Data Cache': '32 - 48 KB (Fastest SRAM)', 'L2 Unified Cache': '512 KB - 1 MB per core', 'Bus Protocol': 'Point-to-point coherent interconnect', 'Bit Pulse Speed': 'Synchronized to master clock' }
      }
    ]
  },

  'sorting-algorithms': {
    title: 'Sorting Algorithms & Big-O Complexity',
    system: 'Algorithm Design & Analysis',
    renderBadge: '3D Comparative Bar Visualizer with Animated Partition Swaps',
    telemetry: [
      { label: 'Quicksort Time', value: 'O(n log n) Avg', unit: 'Pivot Partitioning' },
      { label: 'Mergesort Time', value: 'O(n log n) Best/Worst', unit: 'Guaranteed Stable' },
      { label: 'Bubble Sort Time', value: 'O(n²) Worst', unit: 'Adjacent Swapping' },
      { label: 'Lower Bound', value: 'Ω(n log n)', unit: 'Comparison Decision Tree' }
    ],
    components: [
      {
        id: 'pivot-element',
        name: 'Pivot Element (Quicksort)',
        category: 'Partition Anchor',
        tag: 'Dividing Benchmark',
        color: '#f59e0b',
        focus: [0.0, 0.4, 0.0],
        summary: 'The reference element chosen to partition the array: smaller elements move left, greater elements move right.',
        specs: { 'Selection Strategy': 'Median-of-three or random pivot', 'Partition Property': 'Pivot placed in its final sorted index', 'Recursion': 'Quicksort left and right sub-arrays', 'Complexity': 'O(n log n) average, O(n²) worst' }
      },
      {
        id: 'sorted-partition',
        name: 'Sorted Partition (Emerald Bars)',
        category: 'Completed Elements',
        tag: 'Monotonically Non-Decreasing',
        color: '#10b981',
        focus: [-0.7, 0.2, 0.0],
        summary: 'Array elements that have reached their verified sorted positions and will not be moved again.',
        specs: { 'Invariant': 'A[i] ≤ A[i+1] for all sorted indices', 'Verification': 'O(n) linear validation pass', 'Color Coding': 'Emerald Green state', 'Stability': 'Preserves relative order in Mergesort' }
      },
      {
        id: 'active-comparisons',
        name: 'Active Comparison Pointers (i & j)',
        category: 'Dynamic Cursor Indicators',
        tag: 'Real-Time Evaluation',
        color: '#ef4444',
        focus: [0.4, 0.6, 0.0],
        summary: 'Pointers scanning inward from both sides of the partition, comparing elements against the pivot.',
        specs: { 'Operation': 'If A[i] > pivot and A[j] < pivot, swap(i, j)', 'Comparison Count': 'C(n) ≈ 2n ln(n) on average', 'Cache Efficiency': 'High spatial locality in sequential scans', 'Branch Prediction': 'Optimized comparator branching' }
      },
      {
        id: 'swapping-animation',
        name: 'Element Swapping Arc',
        category: 'Kinetic Data Reordering',
        tag: 'Memory Value Transfer',
        color: '#a855f7',
        focus: [0.2, 0.5, 0.2],
        summary: 'Visualized trajectory of two array elements exchanging memory indices to maintain partition invariants.',
        specs: { 'Primitive Operation': 'temp = a; a = b; b = temp;', 'Swaps in Quicksort': 'Approximately n/3 swaps per partition', 'Space Complexity': 'O(log n) call stack in-place', 'Parallelizability': 'Dual-pivot concurrent execution' }
      }
    ]
  }
};
