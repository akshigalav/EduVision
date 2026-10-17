/**
 * EduVision AR - Core Educational Dataset (Phase 1)
 * Structured data for subjects, topics, and interactive 3D/AR modules.
 */

export const SUBJECTS = [
  {
    id: 'biology',
    name: 'Biology',
    description: 'Explore anatomical structures, cellular biology, and complex living organisms through 3D models and AR spatial viewing.',
    iconName: 'Dna',
    topicsCount: 3,
    status: 'active',
    statusLabel: 'Active Lab',
    badgeVariant: 'badge-emerald',
    accentColor: '#10b981',
    gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(6, 182, 212, 0.05) 100%)'
  },
  {
    id: 'physics',
    name: 'Physics',
    description: 'Visualize classical mechanics, electromagnetic field vectors, and quantum phenomena in interactive 3D space.',
    iconName: 'Atom',
    topicsCount: 0,
    status: 'coming_soon',
    statusLabel: 'Phase 2',
    badgeVariant: 'badge-primary',
    accentColor: '#6366f1',
    gradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.05) 100%)'
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    description: 'Rotate complex organic molecules, crystalline lattices, and observe simulated chemical bond reactions.',
    iconName: 'FlaskConical',
    topicsCount: 0,
    status: 'coming_soon',
    statusLabel: 'Phase 2',
    badgeVariant: 'badge-cyan',
    accentColor: '#06b6d4',
    gradient: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(16, 185, 129, 0.05) 100%)'
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    description: 'Interact with multivariable calculus surfaces, 3D coordinate geometry, and topological transformations.',
    iconName: 'Sigma',
    topicsCount: 0,
    status: 'coming_soon',
    statusLabel: 'Phase 3',
    badgeVariant: 'badge-amber',
    accentColor: '#f59e0b',
    gradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(244, 63, 94, 0.05) 100%)'
  },
  {
    id: 'computer-science',
    name: 'Computer Science',
    description: 'Step through 3D binary trees, graph theory node networks, and computer architecture CPU pipelines.',
    iconName: 'Cpu',
    topicsCount: 0,
    status: 'coming_soon',
    statusLabel: 'Phase 3',
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
    description: 'Ask contextual questions anytime while exploring. Receive instant, student-tailored explanations and breakdown of complex concepts.',
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
