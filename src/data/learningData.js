/**
 * EduVision AR - Core Educational Dataset
 * Structured data for subjects, topics, and interactive 3D/AR modules with AI Smart Tutor.
 */

export const SUBJECTS = [
  {
    id: 'biology',
    name: 'Biology',
    description: 'Explore anatomical structures, cellular biology, and complex living organisms through 3D models and AR spatial viewing.',
    iconName: 'Dna',
    topicsCount: 3,
    status: 'active',
    statusLabel: 'Active AI Lab',
    badgeVariant: 'badge-emerald',
    accentColor: '#10b981',
    gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(6, 182, 212, 0.05) 100%)'
  },
  {
    id: 'physics',
    name: 'Physics',
    description: 'Visualize classical mechanics, electromagnetic field vectors, and quantum phenomena in interactive 3D space.',
    iconName: 'Atom',
    topicsCount: 3,
    status: 'active',
    statusLabel: 'Active AI Lab',
    badgeVariant: 'badge-primary',
    accentColor: '#6366f1',
    gradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.05) 100%)'
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    description: 'Rotate complex organic molecules, crystalline lattices, and observe simulated chemical bond reactions.',
    iconName: 'FlaskConical',
    topicsCount: 3,
    status: 'active',
    statusLabel: 'Active AI Lab',
    badgeVariant: 'badge-cyan',
    accentColor: '#06b6d4',
    gradient: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(16, 185, 129, 0.05) 100%)'
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    description: 'Interact with multivariable calculus surfaces, 3D coordinate geometry, and topological transformations.',
    iconName: 'Sigma',
    topicsCount: 3,
    status: 'active',
    statusLabel: 'Active AI Lab',
    badgeVariant: 'badge-amber',
    accentColor: '#f59e0b',
    gradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(244, 63, 94, 0.05) 100%)'
  },
  {
    id: 'computer-science',
    name: 'Computer Science',
    description: 'Step through 3D binary trees, graph theory node networks, and computer architecture CPU pipelines.',
    iconName: 'Cpu',
    topicsCount: 3,
    status: 'active',
    statusLabel: 'Active AI Lab',
    badgeVariant: 'badge-primary',
    accentColor: '#818cf8',
    gradient: 'linear-gradient(135deg, rgba(129, 140, 248, 0.15) 0%, rgba(6, 182, 212, 0.05) 100%)'
  }
];

export const TOPICS = {
  biology: [
    {
      id: 'human-heart',
      title: 'Human Heart',
      category: 'Anatomy & Physiology',
      tagline: 'The Muscular Engine of the Circulatory System',
      description: 'The human heart is a muscular four-chambered organ roughly the size of a fist. It rhythmically contracts to pump oxygenated blood to all organs and returns deoxygenated blood to the lungs.',
      difficulty: 'Intermediate',
      estimatedTime: '15 Mins',
      modelType: '3D Spatial Organ',
      icon: 'HeartPulse',
      overview: 'Positioned in the thoracic cavity between both lungs, the heart pumps approximately 7,200 liters of blood each day through an intricate 100,000-kilometer network of vessels.',
      keyPoints: [
        {
          title: 'Four Chambers',
          desc: 'Divided into two upper receiving chambers (Right & Left Atria) and two lower pumping chambers (Right & Left Ventricles).'
        },
        {
          title: 'One-Way Valve System',
          desc: 'Tricuspid, Pulmonary, Mitral (Bicuspid), and Aortic valves prevent backflow of blood during powerful ventricular systole.'
        },
        {
          title: 'Electrical Conduction System',
          desc: 'The Sinoatrial (SA) node acts as the natural cardiac pacemaker, triggering synchronized contractions across the myocardial muscle.'
        },
        {
          title: 'Double Circulation Pathway',
          desc: 'Pulmonary circulation shuttles blood to the alveolar beds for oxygenation, while systemic circulation distributes nutrient-rich blood throughout the body.'
        }
      ],
      aiPromptSuggestion: 'Explain how the Sinoatrial (SA) node coordinates heartbeats like an electrical circuit.',
      quizCount: 5
    },
    {
      id: 'human-brain',
      title: 'Human Brain',
      category: 'Neuroscience & Cognition',
      tagline: 'The Master Command Center of the Nervous System',
      description: 'The human brain contains approximately 86 billion interconnected neurons. It oversees motor functions, sensory perception, decision-making, consciousness, and autonomic vitality.',
      difficulty: 'Advanced',
      estimatedTime: '20 Mins',
      modelType: '3D Neural Mesh',
      icon: 'Brain',
      overview: 'Weighing approximately 1.4 kilograms, the brain consumes about 20 percent of the body’s total glucose and oxygen while orchestrating electro-chemical signaling across trillions of synapses.',
      keyPoints: [
        {
          title: 'Cerebral Hemispheres & Lobes',
          desc: 'Comprises Frontal (reasoning/speech), Parietal (touch/spatial processing), Temporal (auditory/memory), and Occipital (vision) lobes.'
        },
        {
          title: 'Cerebellum Coordination',
          desc: 'Nestled beneath the cerebrum, it is essential for fine motor coordination, muscular balance, and motor memory.'
        },
        {
          title: 'The Brainstem',
          desc: 'Composed of the Midbrain, Pons, and Medulla Oblongata, regulating vital autonomic functions like respiration, heartbeat, and blood pressure.'
        },
        {
          title: 'Limbic System & Hippocampus',
          desc: 'Central command for emotional processing, motivation, and the consolidation of short-term experiences into long-term memories.'
        }
      ],
      aiPromptSuggestion: 'How do neurotransmitters cross the synaptic cleft between neurons?',
      quizCount: 5
    },
    {
      id: 'plant-cell',
      title: 'Plant Cell',
      category: 'Cellular Biology',
      tagline: 'The Autotrophic Engine of the Plant Kingdom',
      description: 'Plant cells are eukaryotic structures uniquely adapted to synthesize sugars through sunlight. Encased in protective cellulose walls, they maintain structural rigidity through turgor pressure.',
      difficulty: 'Beginner',
      estimatedTime: '12 Mins',
      modelType: '3D Cellular Cross-Section',
      icon: 'Leaf',
      overview: 'Unlike animal cells, plant cells contain specialized organelles like chloroplasts, a rigid cellulose wall, and a colossal central vacuole that allows plants to stand upright without skeletons.',
      keyPoints: [
        {
          title: 'Rigid Cellulose Cell Wall',
          desc: 'Surrounds the plasma membrane, providing mechanical tensile strength, shape definition, and resistance against osmotic bursting.'
        },
        {
          title: 'Chloroplasts & Thylakoids',
          desc: 'Contains chlorophyll pigments that capture photonic energy to convert carbon dioxide and water into glucose through photosynthesis.'
        },
        {
          title: 'Large Central Vacuole',
          desc: 'Takes up to 80-90% of cellular volume, storing water, enzymes, and ions while generating essential hydrostatic turgor pressure.'
        },
        {
          title: 'Mitochondria & Nucleus',
          desc: 'The nucleus houses genetic DNA templates, while mitochondria synthesize ATP required for cellular biosynthesis.'
        }
      ],
      aiPromptSuggestion: 'Compare the function of chloroplasts with mitochondria in plant energy metabolism.',
      quizCount: 5
    }
  ],
  physics: [
    {
      id: 'solar-system',
      title: 'Solar System & Planetary Orbits',
      category: 'Astrophysics & Mechanics',
      tagline: 'Gravitational Dynamics & Keplerian Mechanics',
      description: 'Explore our heliocentric solar system where gravitational forces govern planetary orbits according to Kepler’s laws of planetary motion and Newton’s universal gravitation.',
      difficulty: 'Intermediate',
      estimatedTime: '15 Mins',
      modelType: '3D Planetary Simulation',
      icon: 'Orbit',
      overview: 'The Sun accounts for 99.86% of the solar system’s mass, exerting a gravitational pull that keeps eight planets and countless asteroids in elliptical orbits.',
      keyPoints: [
        {
          title: "Kepler's First Law (Ellipses)",
          desc: 'All planets move in elliptical orbits with the Sun located at one of the two focal points.'
        },
        {
          title: "Kepler's Second Law (Equal Areas)",
          desc: 'A line segment joining a planet and the Sun sweeps out equal areas during equal intervals of time, meaning planets travel faster near perihelion.'
        },
        {
          title: 'Gravitational Force Equation',
          desc: 'Newtonian gravity is inversely proportional to the square of distance: F = G*(m1*m2)/r².'
        },
        {
          title: 'Escape Velocity & Orbits',
          desc: 'The speed required to overcome a celestial body’s gravitational influence without further propulsion.'
        }
      ],
      aiPromptSuggestion: 'Explain how Kepler’s three laws explain why planets move faster when closer to the Sun.',
      quizCount: 5
    },
    {
      id: 'electromagnetism',
      title: 'Electromagnetic Induction & Motors',
      category: 'Electromagnetism',
      tagline: 'Converting Electrical Energy into Mechanical Force',
      description: 'Investigate how changing magnetic flux induces electromotive force (Faraday’s Law) and how Lorentz forces generate rotational torque in electric motors.',
      difficulty: 'Advanced',
      estimatedTime: '18 Mins',
      modelType: '3D Electromagnetic Coil',
      icon: 'Zap',
      overview: 'Electromagnetism unifies electricity and magnetism, providing the foundational principles behind electric generators, transformers, and industrial motors.',
      keyPoints: [
        {
          title: "Faraday's Law of Induction",
          desc: 'The induced electromotive force in any closed circuit equals the negative rate of change of magnetic flux through the circuit.'
        },
        {
          title: "Lenz's Law & Conservation of Energy",
          desc: 'The direction of induced current opposes the change in magnetic flux that produces it, preserving energy conservation.'
        },
        {
          title: 'Lorentz Force on Conductors',
          desc: 'A current-carrying wire placed inside a magnetic field experiences a perpendicular force F = I*(L x B).'
        },
        {
          title: 'Stator, Rotor & Commutator',
          desc: 'Key components of DC/AC electric motors that coordinate continuous rotational torque.'
        }
      ],
      aiPromptSuggestion: 'How does Lenz’s Law ensure the law of conservation of energy in electric generators?',
      quizCount: 5
    },
    {
      id: 'optics-refraction',
      title: 'Wave Optics & Light Refraction',
      category: 'Optics & Wave Physics',
      tagline: 'Bending Light Through Prisms and Lenses',
      description: 'Discover Snell’s law, chromatic dispersion, total internal reflection, and wave interference that govern lenses, fiber optics, and optical instruments.',
      difficulty: 'Beginner',
      estimatedTime: '12 Mins',
      modelType: '3D Optical Prism',
      icon: 'Sun',
      overview: 'Light changes velocity when transitioning between different media, leading to beam bending, diffraction patterns, and color dispersion.',
      keyPoints: [
        {
          title: "Snell's Law of Refraction",
          desc: 'Quantifies the angle of refraction: n1 * sin(θ1) = n2 * sin(θ2) based on refractive indices.'
        },
        {
          title: 'Total Internal Reflection',
          desc: 'When entering a less dense medium past the critical angle, all light reflects internally—powering fiber optic communications.'
        },
        {
          title: 'Prism Dispersion & Wavelengths',
          desc: 'Different frequencies of visible light refract at slightly different angles, splitting white light into the full rainbow spectrum.'
        },
        {
          title: 'Convex vs Concave Lenses',
          desc: 'Converging (convex) lenses form real or virtual images, while diverging (concave) lenses spread parallel rays.'
        }
      ],
      aiPromptSuggestion: 'Why does total internal reflection occur in fiber optic cables and diamonds?',
      quizCount: 5
    }
  ],
  chemistry: [
    {
      id: 'water-molecule',
      title: 'Water Molecule & Hydrogen Bonds',
      category: 'Molecular Structure',
      tagline: 'Polarity, Hydrogen Bonding & Anomalous Properties',
      description: 'Analyze H₂O molecular geometry (104.5° bond angle), electronegativity differences, dipole moments, and the hydrogen bonding lattice that makes water the universal solvent.',
      difficulty: 'Beginner',
      estimatedTime: '12 Mins',
      modelType: '3D Ball-and-Stick Molecule',
      icon: 'Droplet',
      overview: 'Due to oxygen’s high electronegativity, water forms strong intermolecular hydrogen bonds responsible for high surface tension, specific heat capacity, and ice floating on water.',
      keyPoints: [
        {
          title: 'Bent Molecular Geometry',
          desc: 'Two lone pairs on the central oxygen atom repel bonding pairs, narrowing the tetrahedral angle from 109.5° down to 104.5°.'
        },
        {
          title: 'Electronegativity & Net Dipole',
          desc: 'Oxygen attracts electrons far more than hydrogen, creating partial negative (δ-) and partial positive (δ+) poles.'
        },
        {
          title: 'Hydrogen Bonding Network',
          desc: 'Electrostatic attractions between δ- oxygen of one molecule and δ+ hydrogen of another create dynamic crystalline clusters.'
        },
        {
          title: 'Universal Solvent Properties',
          desc: 'Polar water molecules easily form hydration shells around ionic lattices like NaCl to dissolve solutes.'
        }
      ],
      aiPromptSuggestion: 'Why does ice float on liquid water, and how does hydrogen bonding explain this anomaly?',
      quizCount: 5
    },
    {
      id: 'periodic-table',
      title: 'Atomic Structure & Electron Orbitals',
      category: 'Quantum Chemistry',
      tagline: 'Subatomic Particles, Electron Configurations & Trends',
      description: 'Explore the quantum mechanical model of the atom, including protons, neutrons, electrons, s/p/d/f orbitals, and periodic trends like electronegativity and ionization energy.',
      difficulty: 'Intermediate',
      estimatedTime: '15 Mins',
      modelType: '3D Quantum Orbital Cloud',
      icon: 'Compass',
      overview: 'Atomic characteristics are dictated by atomic number (Z), electron configuration according to the Aufbau principle, and quantum electron probability densities.',
      keyPoints: [
        {
          title: 'Nucleus & Subatomic Particles',
          desc: 'Concentrates virtually all atomic mass in protons (positive) and neutrons (neutral) bound by the strong nuclear force.'
        },
        {
          title: 'Quantum Orbitals (s, p, d, f)',
          desc: 'Probability density clouds where electrons are most likely to be found, governed by Schrödinger wavefunctions.'
        },
        {
          title: 'Aufbau Principle & Hund’s Rule',
          desc: 'Electrons occupy the lowest available energy subshells first, maximizing total spin before pairing.'
        },
        {
          title: 'Periodic Trends',
          desc: 'Ionization energy, electron affinity, and electronegativity increase across a period and decrease down a group.'
        }
      ],
      aiPromptSuggestion: 'How does electron configuration determine whether an element acts as a metal, non-metal, or noble gas?',
      quizCount: 5
    },
    {
      id: 'chemical-reactions',
      title: 'Reaction Kinetics & Thermodynamics',
      category: 'Physical Chemistry',
      tagline: 'Activation Energy, Catalysis & Le Chatelier’s Principle',
      description: 'Study collision theory, exothermic vs endothermic energy profiles, reaction rates, catalysts, and dynamic equilibrium shifts under stress.',
      difficulty: 'Advanced',
      estimatedTime: '18 Mins',
      modelType: '3D Energy Transition State',
      icon: 'Flame',
      overview: 'Chemical reactions require sufficient collision energy and proper spatial orientation to surmount activation energy barriers and form products.',
      keyPoints: [
        {
          title: 'Collision Theory & Activation Energy',
          desc: 'Reactant molecules must collide with energy greater than or equal to Ea and appropriate molecular geometry.'
        },
        {
          title: 'Exothermic vs Endothermic Enthalpy',
          desc: 'Exothermic releases net heat (ΔH < 0), while endothermic absorbs heat from the surrounding environment (ΔH > 0).'
        },
        {
          title: 'Catalytic Action',
          desc: 'Catalysts provide an alternative reaction pathway with a lower activation energy barrier without being consumed.'
        },
        {
          title: 'Le Chatelier’s Principle',
          desc: 'A system in dynamic equilibrium adjusts to partially counteract any applied perturbation in concentration, temperature, or pressure.'
        }
      ],
      aiPromptSuggestion: 'How do biological enzymes lower activation energy compared to inorganic industrial catalysts?',
      quizCount: 5
    }
  ],
  mathematics: [
    {
      id: 'pythagorean-theorem',
      title: 'Pythagorean Theorem & Trigonometry',
      category: 'Geometry & Trigonometry',
      tagline: 'Right-Angled Triangles, Unit Circle & Sine Waves',
      description: 'Uncover the geometric proofs of a² + b² = c², sine/cosine ratios, the Cartesian unit circle, and harmonic wave propagation.',
      difficulty: 'Beginner',
      estimatedTime: '12 Mins',
      modelType: '3D Geometric Triangle & Unit Circle',
      icon: 'Triangle',
      overview: 'Fundamental to Euclidean geometry and modern navigation, trigonometry relates triangle angle measures to side length ratios.',
      keyPoints: [
        {
          title: 'Geometric Proof of a² + b² = c²',
          desc: 'The area of the square erected upon the hypotenuse equals the sum of the areas of the squares on the remaining two legs.'
        },
        {
          title: 'Trigonometric Ratios (SOH CAH TOA)',
          desc: 'Defines sine, cosine, and tangent as ratios of opposite, adjacent, and hypotenuse side lengths in right triangles.'
        },
        {
          title: 'The Unit Circle',
          desc: 'A circle of radius 1 centered at origin where coordinates (x, y) directly give (cos θ, sin θ) for any real angle.'
        },
        {
          title: 'Harmonic Oscillations',
          desc: 'Sine and cosine functions model real-world cyclical phenomena such as sound waves, alternating current, and pendulums.'
        }
      ],
      aiPromptSuggestion: 'Explain how the unit circle connects right triangle geometry to recurring periodic sine waves.',
      quizCount: 5
    },
    {
      id: 'coordinate-geometry',
      title: '3D Vectors & Coordinate Geometry',
      category: 'Spatial Mathematics',
      tagline: 'Dot Products, Cross Products & Hyperplanes',
      description: 'Visualize 3D space with basis vectors (i, j, k), scalar dot products for angles, cross products for normal vectors, and plane equations.',
      difficulty: 'Intermediate',
      estimatedTime: '15 Mins',
      modelType: '3D Vector Coordinate Plane',
      icon: 'Layers',
      overview: '3D coordinate systems form the backbone of computer graphics, robotics kinematics, satellite navigation, and physics vector fields.',
      keyPoints: [
        {
          title: 'Right-Handed Cartesian System',
          desc: 'Defined by three mutually orthogonal axes (X, Y, Z) describing points in three-dimensional space.'
        },
        {
          title: 'Dot Product (Scalar Projection)',
          desc: 'Measures directional alignment: A · B = |A||B| cos(θ). Equals zero when two vectors are perpendicular.'
        },
        {
          title: 'Cross Product (Vector Product)',
          desc: 'Generates a new vector perpendicular to both input vectors with magnitude equal to the parallelogram area.'
        },
        {
          title: 'Equation of a 3D Plane',
          desc: 'Expressed as Ax + By + Cz + D = 0, where normal vector n = (A, B, C) defines spatial orientation.'
        }
      ],
      aiPromptSuggestion: 'How does the cross product of two 3D vectors find applications in 3D computer graphics lighting?',
      quizCount: 5
    },
    {
      id: 'calculus-derivatives',
      title: 'Calculus: Derivatives & Integrals',
      category: 'Mathematical Analysis',
      tagline: 'Instantaneous Rate of Change & Accumulation',
      description: 'Master the concept of limits, slopes of tangent lines (derivatives), area under curves (definite integrals), and the Fundamental Theorem of Calculus.',
      difficulty: 'Advanced',
      estimatedTime: '20 Mins',
      modelType: '3D Tangent Slope Surface',
      icon: 'TrendingUp',
      overview: 'Calculus provides the mathematical language to describe continuously changing systems—from rocket trajectory acceleration to neural network backpropagation.',
      keyPoints: [
        {
          title: 'Limits & Continuity',
          desc: 'The foundational concept that analyzes what value a function approaches as input arbitrarily nears a specific threshold.'
        },
        {
          title: 'The Derivative as Tangent Slope',
          desc: 'Represents instantaneous rate of change: f’(x) = lim(h->0) [f(x+h) - f(x)] / h.'
        },
        {
          title: 'Definite Integral as Sum of Slices',
          desc: 'Riemann sums sum infinitesimally narrow rectangles beneath a curve to compute total accumulated area.'
        },
        {
          title: 'Fundamental Theorem of Calculus',
          desc: 'Unifies differentiation and integration as exact mathematical inverse operations.'
        }
      ],
      aiPromptSuggestion: 'How does the Fundamental Theorem of Calculus prove differentiation and integration are inverses?',
      quizCount: 5
    }
  ],
  'computer-science': [
    {
      id: 'binary-search-tree',
      title: 'Binary Trees & Graph Algorithms',
      category: 'Data Structures & Algorithms',
      tagline: 'Hierarchical Storage, BST Invariants & Graph Traversals',
      description: 'Explore recursive tree structures, balanced binary search trees (AVL/Red-Black), tree traversals (Inorder/Preorder/Postorder), and BFS/DFS graph exploration.',
      difficulty: 'Intermediate',
      estimatedTime: '15 Mins',
      modelType: '3D Node Network Hierarchy',
      icon: 'GitBranch',
      overview: 'Hierarchical node data structures offer efficient O(log n) search, insertion, and deletion capabilities foundational to database indexing and operating system kernels.',
      keyPoints: [
        {
          title: 'Binary Search Tree Property',
          desc: 'Every node satisfies: left subtree values < node value < right subtree values.'
        },
        {
          title: 'Tree Traversals (DFS & BFS)',
          desc: 'Inorder traversal visits nodes in ascending sorted sequence; BFS explores level-by-level using a queue.'
        },
        {
          title: 'Self-Balancing Trees',
          desc: 'AVL and Red-Black trees perform rotational rebalances to avoid pathological O(n) degeneration.'
        },
        {
          title: 'Dijkstra & Shortest Path',
          desc: 'Greedy algorithm computing the shortest path from a source vertex to all other vertices in weighted graphs.'
        }
      ],
      aiPromptSuggestion: 'Why does an inorder traversal of a Binary Search Tree always yield elements in sorted ascending order?',
      quizCount: 5
    },
    {
      id: 'cpu-architecture',
      title: 'CPU Architecture & Execution Cycle',
      category: 'Computer Systems',
      tagline: 'Registers, ALU, Control Unit & Instruction Pipelines',
      description: 'Step inside the Central Processing Unit: discover the Von Neumann architecture, arithmetic logic units, registers, instruction caching, and pipelining.',
      difficulty: 'Advanced',
      estimatedTime: '18 Mins',
      modelType: '3D Silicon Microprocessor Die',
      icon: 'Cpu',
      overview: 'Billions of microscopic transistors synchronized by high-frequency clock cycles process machine code through pipelined execution stages.',
      keyPoints: [
        {
          title: 'Fetch-Decode-Execute Cycle',
          desc: 'CPU fetches instruction from RAM/cache, decodes binary opcodes, and executes via registers or ALU.'
        },
        {
          title: 'Arithmetic Logic Unit (ALU)',
          desc: 'Executes fundamental bitwise logic operations (AND, OR, XOR) and arithmetic additions/subtractions.'
        },
        {
          title: 'Registers & Memory Hierarchy',
          desc: 'L1/L2/L3 caches and high-speed registers minimize latency bottlenecks between RAM and CPU cores.'
        },
        {
          title: 'Instruction Pipelining & Branch Hazards',
          desc: 'Executes multiple overlapping instruction phases concurrently to maximize throughput per clock cycle.'
        }
      ],
      aiPromptSuggestion: 'How does instruction pipelining boost CPU throughput, and what are branch prediction hazards?',
      quizCount: 5
    },
    {
      id: 'sorting-algorithms',
      title: 'Sorting Algorithms & Big-O Complexity',
      category: 'Algorithm Analysis',
      tagline: 'Divide & Conquer, Quicksort, Mergesort & Complexity',
      description: 'Analyze comparative sorting algorithms: Quicksort partitioning, Mergesort recursion, Heap sort, and algorithmic time/space bounds.',
      difficulty: 'Beginner',
      estimatedTime: '12 Mins',
      modelType: '3D Bar Chart Visualizer',
      icon: 'BarChart2',
      overview: 'Sorting is a benchmark algorithmic problem proving the lower bound of comparison-based sorting is Ω(n log n).',
      keyPoints: [
        {
          title: 'Big-O Asymptotic Notation',
          desc: 'Characterizes algorithm execution time or memory requirements as input size n grows asymptotically.'
        },
        {
          title: 'Quicksort (Pivot Partitioning)',
          desc: 'Selects a pivot, partitions elements into smaller and larger subsets, and sorts recursively (average O(n log n)).'
        },
        {
          title: 'Mergesort (Divide and Conquer)',
          desc: 'Splits arrays in half recursively and merges sorted halves with guaranteed stable O(n log n) complexity.'
        },
        {
          title: 'Comparison Lower Bound Ω(n log n)',
          desc: 'Decision tree analysis mathematically proves no comparison sort can run faster than n log n in the worst case.'
        }
      ],
      aiPromptSuggestion: 'Compare Quicksort and Mergesort in terms of time complexity, space complexity, and stability.',
      quizCount: 5
    }
  ]
};

export const FEATURES = [
  {
    id: '3d-learning',
    title: '3D Spatial Learning',
    description: 'Inspect intricate biological and physical systems from any angle with smooth 360° rotation, cross-sectional views, and zoom controls.',
    badge: 'Visual Experience',
    iconName: 'Box',
    accentColor: '#6366f1'
  },
  {
    id: 'augmented-reality',
    title: 'Augmented Reality (AR)',
    description: 'Bring educational models right onto your study desk or classroom table through web camera tracking without needing specialized headsets.',
    badge: 'Immersive Tech',
    iconName: 'Glasses',
    accentColor: '#06b6d4'
  },
  {
    id: 'ai-assistant',
    title: 'AI Smart Tutor',
    description: 'Ask contextual questions anytime across Biology, Physics, Chemistry, Math, and CS. Receive instant, student-tailored explanations.',
    badge: 'Intelligent Guidance',
    iconName: 'Bot',
    accentColor: '#10b981'
  },
  {
    id: 'interactive-quiz',
    title: 'Gamified Quizzes',
    description: 'Validate your conceptual understanding right after each 3D exploration session with automated scoring and instant feedback.',
    badge: 'Knowledge Check',
    iconName: 'HelpCircle',
    accentColor: '#f59e0b'
  }
];
