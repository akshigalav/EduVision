/**
 * EduVision AR - Complete Curriculum Quiz Question Bank
 * Provides 5 scientifically rigorous, multiple-choice questions with detailed explanations
 * for all 15 curriculum topics across Biology, Physics, Chemistry, Mathematics, and Computer Science.
 */

export const QUIZ_DATA = {
  // =========================================================================
  // BIOLOGY
  // =========================================================================
  'human-heart': [
    {
      id: 'hh-1',
      question: 'Which heart chamber has the thickest muscular myocardium and why?',
      options: [
        'Right Atrium, because it receives blood from the superior vena cava',
        'Right Ventricle, because it pumps blood against high pulmonary resistance',
        'Left Ventricle, because it must generate high pressure to pump oxygenated blood into systemic circulation',
        'Left Atrium, because it receives blood directly from the pulmonary veins'
      ],
      correctIndex: 2,
      explanation: 'The left ventricle has a myocardium roughly 3 times thicker (10-15 mm) than the right ventricle because it must overcome systemic arterial resistance (120 mmHg) to pump blood through the entire body via the aorta.',
      difficulty: 'Medium',
      relatedConcept: 'Myocardial Architecture'
    },
    {
      id: 'hh-2',
      question: 'What is the primary role of the Sinoatrial (SA) node in cardiac physiology?',
      options: [
        'It prevents the backflow of blood between the atria and ventricles',
        'It serves as the natural cardiac pacemaker by generating spontaneous action potentials',
        'It delivers oxygenated blood directly to the myocardium through coronary arteries',
        'It filters deoxygenated blood returning through the coronary sinus'
      ],
      correctIndex: 1,
      explanation: 'The Sinoatrial (SA) node, situated in the superior posterolateral wall of the right atrium, exhibits spontaneous electrical depolarization (automaticity), setting the baseline rhythm of approximately 60-100 beats per minute.',
      difficulty: 'Easy',
      relatedConcept: 'Electrical Conduction System'
    },
    {
      id: 'hh-3',
      question: 'During ventricular systole, which heart valves are actively open and closed?',
      options: [
        'AV valves (Tricuspid/Mitral) are closed; Semilunar valves (Aortic/Pulmonary) are open',
        'AV valves are open; Semilunar valves are closed',
        'All four heart valves are simultaneously open to maximize cardiac output',
        'Aortic valve is open; Pulmonary valve is closed'
      ],
      correctIndex: 0,
      explanation: 'During ventricular systole, high intraventricular pressure snaps the atrioventricular (Tricuspid and Mitral) valves shut to prevent regurgitation into the atria, while forcing the Aortic and Pulmonary semilunar valves open for ejection.',
      difficulty: 'Medium',
      relatedConcept: 'Cardiac Cycle & Valves'
    },
    {
      id: 'hh-4',
      question: 'Which blood vessel carries oxygen-rich blood directly from the lungs into the left atrium?',
      options: [
        'Superior Vena Cava',
        'Pulmonary Artery',
        'Pulmonary Veins',
        'Coronary Sinus'
      ],
      correctIndex: 2,
      explanation: 'Uniquely in the human circulatory system, the four pulmonary veins carry oxygenated blood from the alveolar capillary beds of the lungs back into the left atrium of the heart.',
      difficulty: 'Easy',
      relatedConcept: 'Double Circulation Pathway'
    },
    {
      id: 'hh-5',
      question: 'What anatomical phenomenon causes the classical "Lub-Dub" (S1 and S2) heart sounds?',
      options: [
        'The rush of high-velocity blood through the coronary arteries',
        'Turbulent vibration caused by the closure of AV valves (S1) followed by closure of semilunar valves (S2)',
        'Contraction of the diaphragm against the thoracic cavity',
        'Electrical firing of the Purkinje fibers across the ventricular septum'
      ],
      correctIndex: 1,
      explanation: 'The first heart sound "Lub" (S1) results from reverberation following closure of the atrioventricular (Mitral/Tricuspid) valves at onset of systole. The second sound "Dub" (S2) results from closure of the semilunar (Aortic/Pulmonary) valves at onset of diastole.',
      difficulty: 'Hard',
      relatedConcept: 'Auscultation & Hemodynamics'
    }
  ],

  'human-brain': [
    {
      id: 'hb-1',
      question: 'Which cerebral lobe is primarily responsible for executive decision-making, planning, and voluntary motor control?',
      options: [
        'Occipital Lobe',
        'Temporal Lobe',
        'Frontal Lobe',
        'Parietal Lobe'
      ],
      correctIndex: 2,
      explanation: 'The frontal lobe houses the prefrontal cortex, which governs executive function, abstract reasoning, future planning, and moral judgment, as well as the primary motor cortex (Brodmann Area 4).',
      difficulty: 'Easy',
      relatedConcept: 'Cortical Lobes'
    },
    {
      id: 'hb-2',
      question: 'What is the primary function of the cerebellum in the central nervous system?',
      options: [
        'Initiating conscious emotion and fear conditioning',
        'Calibrating fine motor coordination, muscular balance, and motor memory',
        'Regulating basal metabolic temperature and sleep circadian cycles',
        'Synthesizing cerebrospinal fluid in the choroid plexus'
      ],
      correctIndex: 1,
      explanation: 'The cerebellum ("little brain") contains over 50% of the brain\'s neurons. It compares motor intentions from the cortex with sensory proprioceptive feedback to ensure smooth, precise, and balanced muscular movement.',
      difficulty: 'Medium',
      relatedConcept: 'Cerebellar Coordination'
    },
    {
      id: 'hb-3',
      question: 'Which brainstem structure houses the vital autonomic centers controlling heartbeat and respiration?',
      options: [
        'Medulla Oblongata',
        'Corpus Callosum',
        'Thalamus',
        'Hippocampus'
      ],
      correctIndex: 0,
      explanation: 'The medulla oblongata contains the cardiac inhibitory/accelerator centers, the medullary respiratory rhythmicity group, and the vasomotor center controlling systemic vascular tone.',
      difficulty: 'Medium',
      relatedConcept: 'Autonomic Regulation'
    },
    {
      id: 'hb-4',
      question: 'How does an action potential cross the synaptic cleft between two consecutive neurons?',
      options: [
        'Direct physical contact between myelin sheaths',
        'Voltage-gated release of chemical neurotransmitters from pre-synaptic vesicles into the synaptic cleft',
        'Thermal electromagnetic radiant waves emitted by mitochondria',
        'Hydraulic pressure waves through cerebrospinal fluid'
      ],
      correctIndex: 1,
      explanation: 'Depolarization reaches the axon terminal, causing voltage-gated calcium influx that triggers exocytosis of neurotransmitters (e.g., glutamate, GABA, acetylcholine) into the synaptic cleft to bind post-synaptic receptors.',
      difficulty: 'Hard',
      relatedConcept: 'Synaptic Transmission'
    },
    {
      id: 'hb-5',
      question: 'Damage to the hippocampus would most severely impair which cognitive capability?',
      options: [
        'Voluntary blinking of the eyes',
        'Consolidation of short-term experiences into long-term declarative memories',
        'Ability to perceive red versus green visible wavelengths',
        'Autonomic breathing while sleeping'
      ],
      correctIndex: 1,
      explanation: 'The hippocampus, located in the medial temporal lobe, is essential for memory consolidation (converting short-term memories into permanent long-term storage in the neocortex), famously demonstrated in patient H.M.',
      difficulty: 'Hard',
      relatedConcept: 'Limbic System & Memory'
    }
  ],

  'plant-cell': [
    {
      id: 'pc-1',
      question: 'What primary structural polymer confers mechanical rigidity and tensile strength to plant cell walls?',
      options: [
        'Glycogen',
        'Cellulose',
        'Chitin',
        'Keratin'
      ],
      correctIndex: 1,
      explanation: 'Cellulose is a linear polysaccharide of β-1,4-linked D-glucose units organized into crystalline microfibrils, providing immense tensile strength against internal osmotic turgor pressure.',
      difficulty: 'Easy',
      relatedConcept: 'Cell Wall Composition'
    },
    {
      id: 'pc-2',
      question: 'Which plant organelle contains stacks of thylakoid discs (grana) for photonic energy conversion?',
      options: [
        'Mitochondria',
        'Endoplasmic Reticulum',
        'Chloroplast',
        'Peroxisome'
      ],
      correctIndex: 2,
      explanation: 'Chloroplasts possess thylakoid membranes organized into grana stacks embedded with chlorophyll pigments and ATP synthase complexes that drive light-dependent photosynthetic reactions.',
      difficulty: 'Easy',
      relatedConcept: 'Photosynthetic Organelles'
    },
    {
      id: 'pc-3',
      question: 'Why do non-woody herbaceous plants wilt when deprived of water?',
      options: [
        'The cellulose cell wall completely dissolves in dry air',
        'Loss of water from the large central vacuole reduces hydrostatic turgor pressure',
        'The cell nucleus halts DNA transcription completely',
        'Chloroplasts release acid that digests cellular proteins'
      ],
      correctIndex: 1,
      explanation: 'Herbaceous plants rely on hydrostatic turgor pressure (~0.7 MPa) exerted by the fluid-filled central vacuole against the rigid cell wall. In drought, vacuoles lose water, reducing turgidity and causing wilting.',
      difficulty: 'Medium',
      relatedConcept: 'Vacuolar Turgor Mechanics'
    },
    {
      id: 'pc-4',
      question: 'What are plasmodesmata in plant tissues?',
      options: [
        'Microscopic cytoplasmic channels traversing cell walls that allow direct intercellular transport',
        'Receptors that trigger apoptosis during leaf abscission',
        'Protein anchors that fasten roots into soil particles',
        'Enzymatic clusters that synthesize cuticle wax on leaf epidermis'
      ],
      correctIndex: 0,
      explanation: 'Plasmodesmata are microscopic cytoplasmic bridges spanning adjacent cell walls, establishing the symplastic pathway for passive and active movement of ions, sugars, and signaling molecules.',
      difficulty: 'Medium',
      relatedConcept: 'Intercellular Communication'
    },
    {
      id: 'pc-5',
      question: 'How do the metabolic roles of chloroplasts and mitochondria differ in plant cells?',
      options: [
        'Chloroplasts synthesize glucose using photonic energy, while mitochondria break down sugars to generate ATP for cellular work',
        'Chloroplasts operate only in roots, while mitochondria operate in leaves',
        'Chloroplasts synthesize proteins, while mitochondria synthesize lipids',
        'Plant cells do not have mitochondria; chloroplasts perform both functions'
      ],
      correctIndex: 0,
      explanation: 'Plant cells require both organelles: chloroplasts are anabolic photoautotrophic factories synthesizing carbohydrates from CO₂ and H₂O, whereas mitochondria perform catabolic cellular respiration to supply ATP 24/7.',
      difficulty: 'Hard',
      relatedConcept: 'Bioenergetics'
    }
  ],

  // =========================================================================
  // PHYSICS
  // =========================================================================
  'solar-system': [
    {
      id: 'ss-1',
      question: 'According to Kepler’s First Law of Planetary Motion, what geometric shape describe planetary orbits?',
      options: [
        'Perfect concentric circles with the Sun located at the geometric center',
        'Ellipses with the Sun located at one of the two focal points',
        'Parabolic trajectories that repeat periodically',
        'Epicycles rotating around an imaginary deferent circle'
      ],
      correctIndex: 1,
      explanation: 'Kepler\'s First Law states that every planet moves in an elliptical orbit around the Sun, with the Sun situated at one of the two foci (not the center), resulting in variable orbital distance (perihelion and aphelion).',
      difficulty: 'Easy',
      relatedConcept: 'Kepler\'s Laws'
    },
    {
      id: 'ss-2',
      question: 'What consequence directly follows from Kepler’s Second Law (Equal Areas in Equal Times)?',
      options: [
        'Planets travel fastest when closest to the Sun (perihelion)',
        'All planets have identical orbital periods regardless of distance',
        'Planets experience zero gravitational pull at aphelion',
        'Planetary orbital velocity remains perfectly constant throughout the year'
      ],
      correctIndex: 0,
      explanation: 'Kepler\'s Second Law reflects conservation of angular momentum: to sweep out equal geometric area in equal time intervals, a planet must travel with higher linear orbital velocity when close to the Sun (perihelion).',
      difficulty: 'Medium',
      relatedConcept: 'Orbital Velocity Dynamics'
    },
    {
      id: 'ss-3',
      question: 'If the distance between Earth and the Sun were doubled, by what factor would the gravitational force between them change?',
      options: [
        'Halved (1/2)',
        'Reduced to one-fourth (1/4)',
        'Doubled (2x)',
        'Reduced to one-eighth (1/8)'
      ],
      correctIndex: 1,
      explanation: 'Newton’s Law of Universal Gravitation (F = G*m1*m2/r²) follows an inverse-square relationship. Doubling distance (r -> 2r) scales gravitational force by 1/(2²) = 1/4.',
      difficulty: 'Medium',
      relatedConcept: 'Newtonian Gravitation'
    },
    {
      id: 'ss-4',
      question: 'What is the physical definition of escape velocity from a celestial body?',
      options: [
        'The speed needed to match the speed of light in vacuum',
        'The minimum initial velocity needed for an unpropelled projectile to escape a body\'s gravitational field to infinity',
        'The velocity required to maintain a permanent circular low orbit',
        'The speed of solar wind particles leaving coronal holes'
      ],
      correctIndex: 1,
      explanation: 'Escape velocity (v_esc = √(2GM/R)) is the minimum speed an object without continued thrust must possess at the surface of a mass M to overcome its gravitational potential energy well completely.',
      difficulty: 'Medium',
      relatedConcept: 'Escape Velocity'
    },
    {
      id: 'ss-5',
      question: 'Kepler’s Third Law relates which two orbital parameters for bodies orbiting the Sun?',
      options: [
        'Orbital eccentricity and planet mass',
        'The square of orbital period (T²) is proportional to the cube of semi-major axis (a³)',
        'Axial rotation period and surface atmospheric pressure',
        'Orbital inclination angle and distance from the galactic core'
      ],
      correctIndex: 1,
      explanation: 'Kepler\'s Harmonic Law states T²/a³ = constant (for all planets orbiting the Sun), proving that distant outer planets require exponentially longer periods to complete a single orbital revolution.',
      difficulty: 'Hard',
      relatedConcept: 'Harmonic Orbital Law'
    }
  ],

  'electromagnetism': [
    {
      id: 'em-1',
      question: 'Faraday’s Law of Electromagnetic Induction states that induced electromotive force (EMF) is proportional to:',
      options: [
        'The static resistance of the copper wire',
        'The rate of change of magnetic flux through the closed circuit over time',
        'The temperature of the permanent magnet',
        'The static electrostatic charge on the surrounding chassis'
      ],
      correctIndex: 1,
      explanation: 'Faraday\'s Law mathematically expresses ε = -N (dΦ_B/dt): an electromotive force (voltage) is generated whenever the magnetic flux linking a circuit changes over time.',
      difficulty: 'Easy',
      relatedConcept: 'Faraday\'s Law'
    },
    {
      id: 'em-2',
      question: 'What physical law dictates the negative sign in Faraday’s equation (ε = -dΦ/dt)?',
      options: [
        'Coulomb\'s Law',
        'Lenz\'s Law (Conservation of Energy)',
        'Ohm\'s Law',
        'Hooke\'s Law'
      ],
      correctIndex: 1,
      explanation: 'Lenz’s Law states that an induced current always flows in such a direction that its magnetic field opposes the change in magnetic flux that produced it, preserving the law of conservation of energy.',
      difficulty: 'Medium',
      relatedConcept: 'Lenz\'s Law'
    },
    {
      id: 'em-3',
      question: 'A current-carrying wire of length L carrying current I is placed perpendicular to a magnetic field B. What force does it experience?',
      options: [
        'F = 0',
        'F = I * L * B',
        'F = (I * B) / L',
        'F = I² * R'
      ],
      correctIndex: 1,
      explanation: 'The magnetic component of the Lorentz force on a straight conductor is F = I (L x B). When perpendicular (sin 90° = 1), the magnitude simplifies directly to F = I * L * B.',
      difficulty: 'Medium',
      relatedConcept: 'Lorentz Force'
    },
    {
      id: 'em-4',
      question: 'Inside an ideal long solenoid with n turns per unit length carrying current I, what is the magnetic field strength?',
      options: [
        'B = μ₀ * n * I',
        'B = 0',
        'B = (μ₀ * I) / (2πr)',
        'B = n * I / μ₀'
      ],
      correctIndex: 0,
      explanation: 'Applying Ampere’s Law to an ideal solenoid reveals that the internal magnetic field is uniform and directed parallel to the cylinder axis with magnitude B = μ₀ * n * I, where μ₀ is the permeability of free space.',
      difficulty: 'Hard',
      relatedConcept: 'Solenoid Magnetic Field'
    },
    {
      id: 'em-5',
      question: 'What is the functional role of the split-ring commutator in a direct current (DC) electric motor?',
      options: [
        'It increases the electrical resistance of the armature windings',
        'It reverses the direction of current in the rotor coils every half-turn to maintain unidirectional rotational torque',
        'It stores magnetic field energy in electrostatic capacitor plates',
        'It prevents the stator neodymium magnets from demagnetizing'
      ],
      correctIndex: 1,
      explanation: 'As the rotor loop rotates past vertical equilibrium, the split-ring commutator flips electrical brush contact, reversing current polarity and allowing Lorentz torque to drive rotation in the same direction continuously.',
      difficulty: 'Hard',
      relatedConcept: 'DC Motor Principles'
    }
  ],

  'optics-refraction': [
    {
      id: 'or-1',
      question: 'When light passes from air (lower refractive index) into glass (higher refractive index) at an oblique angle, the refracted ray:',
      options: [
        'Bends away from the normal line',
        'Bends toward the normal line and slows down',
        'Continues in a straight line without velocity change',
        'Reflects 100% back without entering the glass'
      ],
      correctIndex: 1,
      explanation: 'According to Snell\'s law (n1 sin θ1 = n2 sin θ2), because n2 > n1, the angle of refraction θ2 must be smaller than the angle of incidence θ1, bending the ray toward the surface normal as phase velocity decreases.',
      difficulty: 'Easy',
      relatedConcept: 'Snell\'s Law'
    },
    {
      id: 'or-2',
      question: 'What optical condition is required for Total Internal Reflection (TIR) to occur?',
      options: [
        'Light must travel from a medium of higher refractive index into one of lower refractive index at an angle greater than the critical angle',
        'Light must travel from air into water at an angle of 0 degrees',
        'The surface must be coated with opaque metallic silver paint',
        'Light must have a frequency below the human audible threshold'
      ],
      correctIndex: 0,
      explanation: 'Total Internal Reflection requires: 1) light propagates from a dense medium (n1) toward a rarer medium (n2 < n1), and 2) the incident angle exceeds the critical angle θc = arcsin(n2/n1).',
      difficulty: 'Medium',
      relatedConcept: 'Total Internal Reflection'
    },
    {
      id: 'or-3',
      question: 'Why does an optical glass prism separate white light into a rainbow spectrum (chromatic dispersion)?',
      options: [
        'The prism absorbs all colors except red and violet',
        'Different wavelengths have slightly different speeds and refractive indices in glass, causing violet to bend more than red',
        'Light atoms collide with glass atoms and gain kinetic mass',
        'Thermal friction inside the glass shifts photonic frequencies'
      ],
      correctIndex: 1,
      explanation: 'In dispersive media, shorter wavelengths (violet ~400 nm) experience a higher refractive index and lower phase velocity than longer wavelengths (red ~700 nm), refracting more sharply and fanning out into a rainbow.',
      difficulty: 'Medium',
      relatedConcept: 'Chromatic Dispersion'
    },
    {
      id: 'or-4',
      question: 'What is the speed of light inside crown glass with a refractive index of n = 1.50?',
      options: [
        '3.00 × 10⁸ m/s',
        '2.00 × 10⁸ m/s',
        '1.50 × 10⁸ m/s',
        '4.50 × 10⁸ m/s'
      ],
      correctIndex: 1,
      explanation: 'By definition, refractive index n = c / v. Therefore, v = c / n = (3.00 × 10⁸ m/s) / 1.50 = 2.00 × 10⁸ m/s.',
      difficulty: 'Medium',
      relatedConcept: 'Speed of Light in Media'
    },
    {
      id: 'or-5',
      question: 'Which technology directly relies on Total Internal Reflection to transmit high-speed data across oceans?',
      options: [
        'Copper coaxial television cables',
        'Fiber optic cables',
        'Radio dipole broadcast towers',
        'Cathode ray tube monitors'
      ],
      correctIndex: 1,
      explanation: 'Fiber optic cables utilize high-purity silica glass cores surrounded by lower-index cladding. Laser light pulses undergo continuous total internal reflection along the core, transmitting terabits of data per second with minimal attenuation.',
      difficulty: 'Easy',
      relatedConcept: 'Fiber Optics Applications'
    }
  ],

  // =========================================================================
  // CHEMISTRY
  // =========================================================================
  'water-molecule': [
    {
      id: 'wm-1',
      question: 'What is the exact equilibrium H-O-H bond angle in an isolated gaseous water molecule?',
      options: [
        '180.0° (Linear)',
        '109.5° (Ideal Tetrahedral)',
        '104.45° (Bent / Angular)',
        '90.0° (Orthogonal)'
      ],
      correctIndex: 2,
      explanation: 'According to VSEPR theory, the central oxygen atom has four electron pairs (two bonding pairs and two lone pairs). Strong lone pair-lone pair repulsion compresses the tetrahedral angle from 109.5° down to 104.45°.',
      difficulty: 'Easy',
      relatedConcept: 'VSEPR Molecular Geometry'
    },
    {
      id: 'wm-2',
      question: 'Why is water a polar molecule with a significant net dipole moment (~1.85 Debyes)?',
      options: [
        'Oxygen has a much higher electronegativity (3.44) than hydrogen (2.20), creating an asymmetric charge distribution',
        'Hydrogen atoms contain more neutrons than the oxygen atom',
        'Water molecules carry a permanent net positive ionic charge',
        'The hydrogen bonds completely cancel each other out in 3D space'
      ],
      correctIndex: 0,
      explanation: 'Oxygen\'s high electronegativity draws shared covalent electron density away from hydrogen nuclei. Because the molecule is bent rather than linear, individual bond dipoles do not cancel, producing a strong net dipole vector.',
      difficulty: 'Medium',
      relatedConcept: 'Molecular Polarity'
    },
    {
      id: 'wm-3',
      question: 'Why does solid ice float on liquid water?',
      options: [
        'Ice absorbs atmospheric nitrogen gas that acts as miniature floatation balloons',
        'Hydrogen bonds lock water molecules into an open hexagonal crystalline lattice with greater volume and lower density than liquid water',
        'Water molecules lose mass as they freeze into ice crystals',
        'Liquid water contains high concentrations of dissolved heavy metals'
      ],
      correctIndex: 1,
      explanation: 'Below 4°C, hydrogen bonding organizes H₂O molecules into an open hexagonal tetrahedral crystal cage. This increases empty structural space, making ice ~9% less dense than liquid water.',
      difficulty: 'Medium',
      relatedConcept: 'Density Anomaly & Hydrogen Bonds'
    },
    {
      id: 'wm-4',
      question: 'What type of intermolecular force is primarily responsible for water’s high surface tension and specific heat capacity?',
      options: [
        'London dispersion forces only',
        'Intermolecular hydrogen bonding',
        'Covalent ionic cross-linking',
        'Gravitational tidal attraction'
      ],
      correctIndex: 1,
      explanation: 'Each water molecule can form up to four hydrogen bonds with neighboring molecules. Breaking this extensive electrostatic lattice requires substantial energy (high specific heat = 4.184 J/g°C) and creates strong surface tension.',
      difficulty: 'Easy',
      relatedConcept: 'Hydrogen Bonding Properties'
    },
    {
      id: 'wm-5',
      question: 'How does water dissolve ionic compounds like table salt (NaCl)?',
      options: [
        'By chemical oxidation of chlorine into chlorine gas',
        'By forming hydration shells: δ- oxygen atoms solvate Na⁺ cations while δ+ hydrogen atoms solvate Cl⁻ anions',
        'By boiling the sodium crystals through nuclear fission',
        'By polymerizing sodium and chlorine into organic hydrocarbon chains'
      ],
      correctIndex: 1,
      explanation: 'Water acts as a universal solvent for ionic solutes by surrounding dissolved ions with oriented hydration spheres (ion-dipole interactions) that overcome the crystal lattice energy of NaCl.',
      difficulty: 'Hard',
      relatedConcept: 'Solvation Thermodynamics'
    }
  ],

  'periodic-table': [
    {
      id: 'pt-1',
      question: 'What does the principal quantum number (n) determine in the quantum mechanical model of the atom?',
      options: [
        'The electron\'s intrinsic spin direction (± 1/2)',
        'The primary energy level and average radial distance of the electron from the nucleus',
        'The 3D spatial orientation of the orbital in space (m_l)',
        'The number of neutrons in the isotope'
      ],
      correctIndex: 1,
      explanation: 'The principal quantum number n (n = 1, 2, 3...) designates the principal electron shell, dictating both the electron’s overall energy state and orbital radius from the nucleus.',
      difficulty: 'Easy',
      relatedConcept: 'Quantum Numbers'
    },
    {
      id: 'pt-2',
      question: 'What is the spatial shape of a 2p electron orbital?',
      options: [
        'Spherically symmetric cloud',
        'Dumbbell-shaped with two lobes and a nodal plane at the nucleus',
        'Toroidal donut with four intersecting rings',
        'Cubic prism'
      ],
      correctIndex: 1,
      explanation: 'Orbitals with angular momentum quantum number l = 1 (p-orbitals) form dumbbell-shaped lobes (px, py, pz) oriented along orthogonal Cartesian axes, with zero electron probability density (nodal plane) at the nucleus.',
      difficulty: 'Easy',
      relatedConcept: 'Orbital Geometry'
    },
    {
      id: 'pt-3',
      question: 'What fundamental quantum principle states that no two electrons in an atom can have the exact same four quantum numbers?',
      options: [
        'Heisenberg Uncertainty Principle',
        'Pauli Exclusion Principle',
        'Hund\'s Rule of Maximum Multiplicity',
        'Aufbau Principle'
      ],
      correctIndex: 1,
      explanation: 'The Pauli Exclusion Principle dictates that an orbital can hold a maximum of two electrons, and they must have opposite intrinsic spins (m_s = +1/2 and -1/2).',
      difficulty: 'Medium',
      relatedConcept: 'Pauli Exclusion'
    },
    {
      id: 'pt-4',
      question: 'Across a period from left to right on the periodic table, what generally happens to first ionization energy?',
      options: [
        'It decreases steadily due to shielding',
        'It increases due to increasing effective nuclear charge (Z_eff) pulling valence electrons tighter',
        'It drops to zero for all non-metals',
        'It remains perfectly constant'
      ],
      correctIndex: 1,
      explanation: 'As atomic number Z increases across a period, electrons are added to the same valence shell while protons accumulate in the nucleus. Effective nuclear charge increases, holding valence electrons more tightly and requiring greater energy to ionize.',
      difficulty: 'Medium',
      relatedConcept: 'Periodic Trends'
    },
    {
      id: 'pt-5',
      question: 'According to Hund’s Rule, how are degenerate orbitals (e.g. 2px, 2py, 2pz) filled with electrons?',
      options: [
        'One orbital is completely filled with two paired electrons before any other orbital receives an electron',
        'Electrons occupy orbitals singly with parallel spins first before any pairing occurs',
        'Electrons avoid p-orbitals and jump directly into the 3d subshell',
        'Electrons must have anti-parallel spins even when occupying separate orbitals'
      ],
      correctIndex: 1,
      explanation: 'Hund\'s rule minimizes electron-electron Coulombic repulsion by maximizing total spin: electrons singly occupy each degenerate subshell orbital with parallel spins before doubly occupying any single orbital.',
      difficulty: 'Hard',
      relatedConcept: 'Electron Configuration Rules'
    }
  ],

  'chemical-reactions': [
    {
      id: 'cr-1',
      question: 'What is activation energy (Ea) in chemical kinetics?',
      options: [
        'The total heat released when a reaction reaches thermodynamic completion',
        'The minimum threshold kinetic energy colliding reactant molecules must possess for a reaction to occur',
        'The electrostatic energy required to melt a platinum catalyst',
        'The kinetic energy of solvent molecules at absolute zero'
      ],
      correctIndex: 1,
      explanation: 'Activation energy (Ea) is the energy barrier separating reactants from the high-energy activated transition state. Only collisions exceeding Ea with proper steric orientation form products.',
      difficulty: 'Easy',
      relatedConcept: 'Activation Energy Barrier'
    },
    {
      id: 'cr-2',
      question: 'How does a catalyst accelerate the rate of a chemical reaction?',
      options: [
        'By providing an alternative reaction pathway with a lower activation energy without being consumed',
        'By shifting the chemical equilibrium position to produce 100% yield',
        'By raising the temperature of the entire solution by 50 degrees',
        'By increasing the enthalpy of reaction (ΔH)'
      ],
      correctIndex: 0,
      explanation: 'A catalyst lowers the activation energy barrier for both forward and reverse reactions by stabilizing the transition state complex, accelerating reaction velocity without shifting equilibrium constant Keq.',
      difficulty: 'Medium',
      relatedConcept: 'Catalytic Action'
    },
    {
      id: 'cr-3',
      question: 'If a reaction has a negative enthalpy change (ΔH < 0), it is classified as:',
      options: [
        'Endothermic (absorbs thermal energy from surroundings)',
        'Exothermic (releases net heat energy to surroundings)',
        'Isothermal (experiences zero molecular motion)',
        'Adiabatic (cannot exchange matter)'
      ],
      correctIndex: 1,
      explanation: 'When ΔH < 0, the chemical bonds formed in products are more stable and release more energy than the energy absorbed to break reactant bonds, releasing net thermal energy as an exothermic reaction.',
      difficulty: 'Easy',
      relatedConcept: 'Enthalpy & Thermochemistry'
    },
    {
      id: 'cr-4',
      question: 'According to Le Chatelier’s Principle, what happens to an exothermic equilibrium reaction (A + B ⇌ C + Heat) if temperature is increased?',
      options: [
        'The equilibrium shifts to the left toward reactants to absorb added heat',
        'The equilibrium shifts to the right toward products to create more heat',
        'The reaction immediately ceases and decomposes completely',
        'The equilibrium constant Keq remains entirely unchanged'
      ],
      correctIndex: 0,
      explanation: 'Le Chatelier\'s principle states that a system at equilibrium responds to minimize external stress. Increasing temperature acts like adding a product in an exothermic reaction, shifting equilibrium toward the endothermic reverse direction (reactants).',
      difficulty: 'Hard',
      relatedConcept: 'Le Chatelier\'s Principle'
    },
    {
      id: 'cr-5',
      question: 'The Arrhenius equation k = A * e^(-Ea / RT) proves that reaction rate constant k increases when:',
      options: [
        'Temperature (T) increases or activation energy (Ea) decreases',
        'Temperature approaches absolute zero',
        'Activation energy is doubled',
        'The universal gas constant R is set to zero'
      ],
      correctIndex: 0,
      explanation: 'In the Arrhenius relationship, the exponential term e^(-Ea/RT) represents the fraction of collisions possessing energy ≥ Ea. Higher temperature T or lower Ea increases this fraction, exponentially boosting rate constant k.',
      difficulty: 'Hard',
      relatedConcept: 'Arrhenius Kinetics'
    }
  ],

  // =========================================================================
  // MATHEMATICS
  // =========================================================================
  'pythagorean-theorem': [
    {
      id: 'pt-geom-1',
      question: 'For a Euclidean right-angled triangle with leg lengths a and b and hypotenuse c, which relation is always true?',
      options: [
        'a + b = c',
        'a² + b² = c²',
        'a * b = c²',
        'a² - b² = c²'
      ],
      correctIndex: 1,
      explanation: 'The Pythagorean Theorem states that in any right triangle, the area of the square erected upon the hypotenuse (c²) equals the sum of the areas of the squares on the two legs (a² + b²).',
      difficulty: 'Easy',
      relatedConcept: 'Pythagorean Equation'
    },
    {
      id: 'pt-geom-2',
      question: 'If a right-angled triangle has legs of length a = 6 and b = 8, what is the length of hypotenuse c?',
      options: [
        '14',
        '10',
        '12',
        '√28'
      ],
      correctIndex: 1,
      explanation: 'c² = a² + b² = 6² + 8² = 36 + 64 = 100. Therefore, c = √100 = 10 (a scaling of the primitive 3-4-5 Pythagorean triple).',
      difficulty: 'Easy',
      relatedConcept: 'Pythagorean Triples'
    },
    {
      id: 'pt-geom-3',
      question: 'On a Cartesian Unit Circle of radius 1 centered at the origin, the coordinates (x, y) corresponding to angle θ are:',
      options: [
        '(tan θ, cot θ)',
        '(cos θ, sin θ)',
        '(sin θ, cos θ)',
        '(sec θ, csc θ)'
      ],
      correctIndex: 1,
      explanation: 'In a unit circle where hypotenuse r = 1, adjacent x = r cos θ = cos θ, and opposite y = r sin θ = sin θ. Substituting into x² + y² = 1 proves the fundamental identity cos² θ + sin² θ = 1.',
      difficulty: 'Medium',
      relatedConcept: 'Unit Circle Trigonometry'
    },
    {
      id: 'pt-geom-4',
      question: 'Which of the following is a primitive Pythagorean triple (coprime integers satisfying a² + b² = c²)?',
      options: [
        '3, 4, 5',
        '5, 12, 13',
        '8, 15, 17',
        'All of the above'
      ],
      correctIndex: 3,
      explanation: 'All three sets are fundamental primitive Pythagorean triples: 3²+4²=9+16=25=5²; 5²+12²=25+144=169=13²; 8²+15²=64+225=289=17².',
      difficulty: 'Medium',
      relatedConcept: 'Integer Triples'
    },
    {
      id: 'pt-geom-5',
      question: 'How does the Law of Cosines generalize the Pythagorean Theorem for non-right triangles with angle C?',
      options: [
        'c² = a² + b² - 2ab cos(C)',
        'c² = a² + b² + 2ab sin(C)',
        'c² = (a + b)² / cos(C)',
        'c² = a² - b²'
      ],
      correctIndex: 0,
      explanation: 'The Law of Cosines states c² = a² + b² - 2ab cos(C). When C = 90° (π/2 radians), cos(90°) = 0, reducing the general equation back to c² = a² + b².',
      difficulty: 'Hard',
      relatedConcept: 'Law of Cosines'
    }
  ],

  'coordinate-geometry': [
    {
      id: 'cg-1',
      question: 'What is the scalar dot product of two mutually perpendicular (orthogonal) non-zero vectors in 3D space?',
      options: [
        '1',
        '0',
        '-1',
        'Infinity'
      ],
      correctIndex: 1,
      explanation: 'The scalar dot product is defined as A · B = |A| |B| cos(θ). When two vectors are perpendicular, θ = 90° and cos(90°) = 0, making the dot product exactly zero.',
      difficulty: 'Easy',
      relatedConcept: 'Dot Product & Orthogonality'
    },
    {
      id: 'cg-2',
      question: 'The cross product of two 3D vectors A × B produces a resulting vector that is:',
      options: [
        'Parallel to vector A',
        'Perpendicular to both vector A and vector B',
        'Always zero in magnitude',
        'Collinear with the X-axis'
      ],
      correctIndex: 1,
      explanation: 'By definition, the vector cross product A × B produces a vector strictly normal (orthogonal) to the plane spanned by A and B, with orientation determined by the right-hand rule.',
      difficulty: 'Easy',
      relatedConcept: 'Cross Product Normal'
    },
    {
      id: 'cg-3',
      question: 'What is the Euclidean distance between points P1(1, 2, 3) and P2(4, 6, 3) in 3D Cartesian coordinates?',
      options: [
        '5',
        '7',
        '25',
        '√7'
      ],
      correctIndex: 0,
      explanation: 'Distance d = √[(x2 - x1)² + (y2 - y1)² + (z2 - z1)²] = √[(4-1)² + (6-2)² + (3-3)²] = √[3² + 4² + 0] = √[9 + 16] = √25 = 5.',
      difficulty: 'Medium',
      relatedConcept: '3D Euclidean Distance'
    },
    {
      id: 'cg-4',
      question: 'In the general 3D plane equation Ax + By + Cz + D = 0, what does the vector n = (A, B, C) represent?',
      options: [
        'A vector lying completely inside the plane',
        'A vector strictly perpendicular (normal) to the plane',
        'The origin of the coordinate system',
        'The area of the plane'
      ],
      correctIndex: 1,
      explanation: 'In Cartesian 3D geometry, the coefficients (A, B, C) define the normal vector n perpendicular to any line segment connecting two points on the plane: n · (P - P0) = 0.',
      difficulty: 'Medium',
      relatedConcept: 'Equation of a Plane'
    },
    {
      id: 'cg-5',
      question: 'The magnitude |A × B| of the cross product geometrically equals:',
      options: [
        'The perimeter of the triangle spanned by A and B',
        'The area of the parallelogram spanned by vectors A and B',
        'The volume of the surrounding sphere',
        'The sum of the lengths |A| + |B|'
      ],
      correctIndex: 1,
      explanation: 'Geometrically, |A × B| = |A| |B| sin(θ), which is precisely the formula for the area of a parallelogram with sides |A| and |B| separated by interior angle θ.',
      difficulty: 'Hard',
      relatedConcept: 'Geometric Interpretation of Cross Product'
    }
  ],

  'calculus-derivatives': [
    {
      id: 'calc-1',
      question: 'What is the geometric meaning of the first derivative f’(x) of a function at point x?',
      options: [
        'The total accumulated area under the curve from 0 to x',
        'The slope of the tangent line touching the curve at (x, f(x))',
        'The curvature of the osculating circle',
        'The point where the function crosses the y-axis'
      ],
      correctIndex: 1,
      explanation: 'The derivative f’(x) = lim(h→0) [f(x+h) - f(x)] / h computes the instantaneous rate of change, which represents the exact slope of the tangent line to the function graph at point x.',
      difficulty: 'Easy',
      relatedConcept: 'Derivative as Tangent Slope'
    },
    {
      id: 'calc-2',
      question: 'What is the derivative of f(x) = x³ with respect to x using the power rule?',
      options: [
        '3x²',
        'x⁴ / 4',
        '3x',
        '6x'
      ],
      correctIndex: 0,
      explanation: 'Applying the power rule d/dx [x^n] = n * x^(n-1) yields d/dx [x³] = 3 * x^(3-1) = 3x².',
      difficulty: 'Easy',
      relatedConcept: 'Power Rule Differentiation'
    },
    {
      id: 'calc-3',
      question: 'What does the Fundamental Theorem of Calculus prove about differentiation and integration?',
      options: [
        'They are independent procedures invented in different centuries',
        'Differentiation and integration are inverse operations of each other',
        'Integration can only be computed for polynomial functions',
        'The derivative of any integral is always equal to zero'
      ],
      correctIndex: 1,
      explanation: 'The Fundamental Theorem of Calculus bridges differential and integral calculus by showing d/dx [∫(a to x) f(t) dt] = f(x), establishing integration and differentiation as exact mathematical inverse processes.',
      difficulty: 'Medium',
      relatedConcept: 'Fundamental Theorem of Calculus'
    },
    {
      id: 'calc-4',
      question: 'In multivariable calculus, what does the gradient vector ∇f(x, y) point toward?',
      options: [
        'The direction of steepest decrease of the scalar field',
        'The direction of maximum rate of increase (steepest ascent) of the function',
        'Parallel to the level curves where f is constant',
        'Straight down toward the origin'
      ],
      correctIndex: 1,
      explanation: 'The gradient vector ∇f = (∂f/∂x, ∂f/∂y) points in the direction of greatest instantaneous increase of scalar field f, with its magnitude |∇f| equal to that maximal rate of increase (foundational to gradient descent in AI).',
      difficulty: 'Hard',
      relatedConcept: 'Multivariable Gradient Vector'
    },
    {
      id: 'calc-5',
      question: 'What is the value of the definite integral ∫(0 to 2) 3x² dx?',
      options: [
        '6',
        '8',
        '12',
        '4'
      ],
      correctIndex: 1,
      explanation: 'The antiderivative of 3x² is x³. Evaluating at the limits: [x³] from 0 to 2 = 2³ - 0³ = 8 - 0 = 8.',
      difficulty: 'Medium',
      relatedConcept: 'Definite Integration'
    }
  ],

  // =========================================================================
  // COMPUTER SCIENCE
  // =========================================================================
  'binary-search-tree': [
    {
      id: 'bst-1',
      question: 'What invariant property defines a valid Binary Search Tree (BST)?',
      options: [
        'Every node has exactly two children and the root must be even',
        'For any node X, all keys in its left subtree are strictly less than X, and all keys in its right subtree are strictly greater than X',
        'All leaf nodes must reside on the same horizontal level',
        'Nodes are sorted alphabetically regardless of numerical value'
      ],
      correctIndex: 1,
      explanation: 'The BST invariant guarantees that for any node with key K: all elements in its left subtree have keys < K, and all elements in its right subtree have keys > K, enabling efficient binary partition search.',
      difficulty: 'Easy',
      relatedConcept: 'BST Invariant Property'
    },
    {
      id: 'bst-2',
      question: 'Which tree traversal algorithm visits nodes of a Binary Search Tree in strictly ascending sorted order?',
      options: [
        'Pre-order Traversal (Root, Left, Right)',
        'In-order Traversal (Left, Root, Right)',
        'Post-order Traversal (Left, Right, Root)',
        'Breadth-First Search (Level-order)'
      ],
      correctIndex: 1,
      explanation: 'In-order traversal recursively visits the Left subtree (smaller elements), then the Root node itself, then the Right subtree (larger elements), yielding keys in strictly ascending sorted order.',
      difficulty: 'Easy',
      relatedConcept: 'Tree Traversals'
    },
    {
      id: 'bst-3',
      question: 'What is the average-case and worst-case time complexity of searching for an element in an unbalanced Binary Search Tree?',
      options: [
        'Average: O(1), Worst: O(n)',
        'Average: O(log n), Worst: O(n) (degenerate linked list)',
        'Average: O(n log n), Worst: O(n²)',
        'Average: O(log n), Worst: O(log n)'
      ],
      correctIndex: 1,
      explanation: 'In a reasonably balanced BST, each comparison halves search space (O(log n)). However, inserting sorted elements sequentially degrades the tree into a pathological linear linked list of height n, yielding worst-case O(n).',
      difficulty: 'Medium',
      relatedConcept: 'BST Complexity Analysis'
    },
    {
      id: 'bst-4',
      question: 'How do self-balancing trees (such as AVL trees or Red-Black trees) prevent worst-case O(n) degeneration?',
      options: [
        'By deleting all odd-numbered nodes',
        'By performing tree rotations (left/right) when balance factors exceed permitted thresholds',
        'By converting the tree into a hash table at runtime',
        'By capping maximum tree depth to 4'
      ],
      correctIndex: 1,
      explanation: 'Self-balancing trees monitor height or color invariants. Upon insertion/deletion, if imbalance occurs, they execute O(1) pointer rotations (single or double rotations) to maintain height h ≤ c * log₂(n).',
      difficulty: 'Medium',
      relatedConcept: 'Self-Balancing Rotations'
    },
    {
      id: 'bst-5',
      question: 'What data structure is utilized under the hood to perform Breadth-First Search (BFS) / Level-Order traversal of a tree?',
      options: [
        'Stack (LIFO)',
        'Queue (FIFO)',
        'Min-Heap priority queue',
        'Doubly linked circular list'
      ],
      correctIndex: 1,
      explanation: 'BFS explores node level by level. A First-In-First-Out (FIFO) Queue stores discovered children so nodes on the current level are fully processed before advancing to the next tier.',
      difficulty: 'Medium',
      relatedConcept: 'BFS Queue Mechanics'
    }
  ],

  'cpu-architecture': [
    {
      id: 'cpu-1',
      question: 'What are the three fundamental phases of the classical CPU machine instruction cycle?',
      options: [
        'Compile, Link, Run',
        'Fetch, Decode, Execute',
        'Read, Write, Delete',
        'Push, Pop, Swap'
      ],
      correctIndex: 1,
      explanation: 'The CPU instruction cycle repeatedly performs: 1) Fetch (retrieves instruction opcode from memory/cache via PC), 2) Decode (instruction decoder parses opcode), and 3) Execute (ALU or registers perform operation).',
      difficulty: 'Easy',
      relatedConcept: 'Instruction Execution Cycle'
    },
    {
      id: 'cpu-2',
      question: 'What is the primary function of the Arithmetic Logic Unit (ALU)?',
      options: [
        'Storing permanent files on solid state storage',
        'Executing fundamental arithmetic additions/subtractions and bitwise logic operations (AND, OR, XOR)',
        'Translating human speech into text',
        'Cooling the microprocessor substrate'
      ],
      correctIndex: 1,
      explanation: 'The ALU is the digital combinational circuit core that computes integer arithmetic (ADD, SUB, MUL) and bitwise Boolean logic operations (AND, OR, NOT, XOR, bit shifts), updating status condition flags (ZF, CF, SF, OF).',
      difficulty: 'Easy',
      relatedConcept: 'ALU Operations'
    },
    {
      id: 'cpu-3',
      question: 'Why does CPU architecture employ a multi-level cache hierarchy (L1, L2, L3 SRAM) between CPU registers and main RAM?',
      options: [
        'To prevent memory address collisions between different software processes',
        'To bridge the severe latency speed gap between ultra-fast CPU clock cycles (~GHz) and relatively slow DRAM access times',
        'Because RAM cannot store binary 1s and 0s',
        'To reduce the total electrical wattage of the monitor'
      ],
      correctIndex: 1,
      explanation: 'Registers access data in <1 cycle, L1 cache in ~4 cycles, whereas main DRAM requires 200+ cycles. Small, fast SRAM caches exploit spatial and temporal locality to minimize pipeline stalls caused by memory latency.',
      difficulty: 'Medium',
      relatedConcept: 'Memory Hierarchy'
    },
    {
      id: 'cpu-4',
      question: 'What is instruction pipelining in modern CPU microarchitecture?',
      options: [
        'Water cooling copper pipes running across the CPU package',
        'Overlapping the execution of multiple instructions across consecutive pipeline stages to increase throughput',
        'Encrypting instructions using 256-bit AES algorithms',
        'Transferring instructions directly over fiber cables'
      ],
      correctIndex: 1,
      explanation: 'Pipelining divides instruction processing into discrete stages (Fetch, Decode, Execute, Memory, Writeback). While instruction N is executing, instruction N+1 is being decoded and N+2 is being fetched, maximizing instruction throughput per clock cycle.',
      difficulty: 'Medium',
      relatedConcept: 'Instruction Pipelining'
    },
    {
      id: 'cpu-5',
      question: 'What constitutes a "Control Hazard" (Branch Hazard) in an instruction pipeline?',
      options: [
        'A physical short circuit in the power supply rail',
        'A conditional branch instruction whose target address is unknown until execution, potentially wasting prefetched pipeline instructions',
        'Two instructions attempting to write to the same register in the same clock cycle',
        'A floating-point division by zero'
      ],
      correctIndex: 1,
      explanation: 'When a conditional branch (like `if (x > 0) jmp target`) occurs, the CPU doesn\'t know which instruction to fetch next until the condition evaluates. Branch predictors mitigate this; mispredictions force a pipeline flush.',
      difficulty: 'Hard',
      relatedConcept: 'Pipeline Hazards & Branch Prediction'
    }
  ],

  'sorting-algorithms': [
    {
      id: 'sort-1',
      question: 'What is the mathematically proven lower bound for any comparison-based sorting algorithm in the worst case?',
      options: [
        'O(1)',
        'O(n)',
        'Ω(n log n)',
        'O(n²)'
      ],
      correctIndex: 2,
      explanation: 'Decision tree analysis mathematically demonstrates that any comparison-based sort must have at least n! leaf nodes (all possible permutations). The minimum tree height is log₂(n!) = Ω(n log n).',
      difficulty: 'Medium',
      relatedConcept: 'Comparison Sort Lower Bound'
    },
    {
      id: 'sort-2',
      question: 'How does Quicksort achieve an average-case time complexity of O(n log n)?',
      options: [
        'By comparing every element with every other element in nested loops',
        'By choosing a pivot, partitioning elements into smaller and larger subsets, and sorting recursively',
        'By building a 2D matrix and computing eigenvalues',
        'By counting the frequency of occurrences of integers in an auxiliary array'
      ],
      correctIndex: 1,
      explanation: 'Quicksort selects a pivot, rearranges the array so elements < pivot are left and elements > pivot are right (partitioning in O(n)), and recursively sorts both partitions (log n levels average).',
      difficulty: 'Easy',
      relatedConcept: 'Quicksort Partitioning'
    },
    {
      id: 'sort-3',
      question: 'Which sorting algorithm guarantees stable O(n log n) performance in all cases (best, average, and worst)?',
      options: [
        'Bubble Sort',
        'Mergesort',
        'Quicksort',
        'Selection Sort'
      ],
      correctIndex: 1,
      explanation: 'Mergesort consistently divides arrays in half (depth log₂ n) and merges sorted halves in linear O(n) time, guaranteeing O(n log n) in all cases and preserving relative order of equal elements (stability).',
      difficulty: 'Medium',
      relatedConcept: 'Mergesort Divide & Conquer'
    },
    {
      id: 'sort-4',
      question: 'What is the worst-case time complexity of standard Quicksort, and when does it occur?',
      options: [
        'O(n log n), when the array is randomly shuffled',
        'O(n²), when the pivot is consistently the smallest or largest element (e.g. sorted input with end pivot)',
        'O(n), when all elements are duplicates',
        'O(log n), when the array length is a power of two'
      ],
      correctIndex: 1,
      explanation: 'If unbalanced pivots are selected (e.g., partitioning an already sorted array with the last element as pivot), partition sizes become n-1 and 0. This creates n recursion levels instead of log n, producing O(n²) worst-case.',
      difficulty: 'Hard',
      relatedConcept: 'Quicksort Degeneration'
    },
    {
      id: 'sort-5',
      question: 'Why is Mergesort often preferred over Quicksort for sorting linked lists?',
      options: [
        'Linked lists do not allow random O(1) index access needed for quicksort pivots, but allow O(1) merge pointer rewiring without extra memory allocation',
        'Mergesort runs in O(n) time on linked lists',
        'Quicksort cannot be implemented in C or JavaScript',
        'Linked lists cannot store numerical values'
      ],
      correctIndex: 0,
      explanation: 'In arrays, Mergesort requires auxiliary O(n) memory. But in linked lists, elements can be spliced and merged by simply updating pointer links in O(1) extra space without requiring random access indexing.',
      difficulty: 'Hard',
      relatedConcept: 'Data Structure Specific Sorting'
    }
  ]
};

/**
 * Helper to fetch quiz questions for any topic with safe fallback
 */
export function getQuizForTopic(topicId = 'human-heart') {
  return QUIZ_DATA[topicId] || QUIZ_DATA['human-heart'];
}
