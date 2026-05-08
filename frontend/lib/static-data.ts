/**
 * Static fallback data
 *
 * This data is bundled at build time and rendered on the server, so pages
 * load instantly even when the API is cold or unreachable. The API still
 * serves the source of truth — components can hydrate over this data
 * client-side if they want fresher content (e.g. new blog posts), but
 * nothing on the page is *blocked* on the API.
 *
 * Keep this in sync with api/seed.py.
 */

import type { Project, Publication, Experience, Education, Skill, SkillsGrouped, Course, BlogPost } from './api'

export const STATIC_PROJECTS: Project[] = [
  {
    id: 1,
    title: 'AI-Driven Anti-Hailstorm System',
    slug: 'ai-anti-hailstorm',
    description: 'An advanced system that uses Physics-Informed Neural Networks (PINNs) to predict and mitigate hailstorm damage in agricultural settings. This project combines cutting-edge deep learning techniques with physics-based modeling to create a real-time weather prediction and mitigation system.',
    short_description: 'Physics-Informed Neural Network for hailstorm prediction and agricultural protection.',
    image: '/images/projects/hailstorm.jpeg',
    github_url: 'https://github.com/dishantgupta2004/Radar-Hail-Prediction-Model',
    live_url: null,
    technologies: ['TensorFlow', 'DeepXDE', 'Python', 'OpenFOAM'],
    highlights: [
      'Engineering a PINN model to solve inverse problems related to hailstorm prediction',
      'Developing hailstorm impact mitigation using real-time weather data',
      'Applied numerical methods to optimize anti-hail net deployment',
    ],
    category: 'research',
    is_featured: true,
    order: 1,
    start_date: '2024-11-01',
    end_date: null,
  },
  {
    id: 2,
    title: 'Computational Physics and AI Applications',
    slug: 'computational-physics-ai',
    description: 'Implementation of computational physics models to solve complex partial differential equations using Physics-Informed Neural Networks. Includes solvers for Navier-Stokes equations, Schrödinger equation, and Graphene analysis for material science applications.',
    short_description: 'Solving complex PDEs using PINNs for fluid dynamics and quantum mechanics.',
    image: null,
    github_url: 'https://github.com/dishantgupta2004/Computational_Physics_python',
    live_url: null,
    technologies: ['DeepXDE', 'NumPy', 'SciPy', 'Matplotlib'],
    highlights: [
      'Modeled Navier-Stokes equations using PINNs for fluid dynamics',
      'Conducted Graphene analysis for material science applications',
      'Implemented solvers for the Schrödinger equation',
    ],
    category: 'research',
    is_featured: true,
    order: 2,
    start_date: '2023-01-01',
    end_date: null,
  },
  {
    id: 3,
    title: 'Langevin Dynamics Approach to PINNs',
    slug: 'langevin-pinns',
    description: 'Novel training framework based on Langevin dynamics for improved convergence in Physics-Informed Neural Networks. Applied to chemical vapor deposition simulations with 40% faster convergence, improving efficiency in semiconductor manufacturing simulations.',
    short_description: 'Langevin dynamics-based training for faster PINN convergence.',
    image: null,
    github_url: 'https://github.com/dishantgupta2004/LPINN-CVD',
    live_url: null,
    technologies: ['Statistical Mechanics', 'Neural Networks', 'Python', 'TensorFlow'],
    highlights: [
      'Applied to chemical vapor deposition with 40% faster convergence',
      'Developed adaptive noise scheduling techniques',
      'Improved efficiency in semiconductor manufacturing simulations',
    ],
    category: 'research',
    is_featured: true,
    order: 3,
    start_date: '2025-01-01',
    end_date: null,
  },
  {
    id: 4,
    title: 'MetaOptics — Metalens Design & Simulation',
    slug: 'metaoptics',
    description: 'Open-source toolkit for designing, simulating, and optimizing metalenses and sub-wavelength nanostructure arrays. Built in collaboration with NSK AI Labs, this project implements Rigorous Coupled-Wave Analysis (RCWA) and FDTD pipelines to model diffractive optical elements for SWIR and visible-spectrum imaging applications.',
    short_description: 'Open-source metalens design and simulation toolkit using RCWA and FDTD methods.',
    image: null,
    github_url: 'https://github.com/NSKAILABS/metacode',
    live_url: null,
    technologies: ['Python', 'RCWA', 'FDTD', 'NumPy', 'SciPy', 'Synopsys DiffractMOD'],
    highlights: [
      'Designed metalenses up to 2 mm diameter for SWIR imaging applications',
      'Implemented RCWA-based simulation pipeline for sub-wavelength nanostructures',
      'Extracted optical performance metrics including MTF and PSF for design validation',
      'Collaboration with NSK AI Labs on next-generation flat optics',
    ],
    category: 'research',
    is_featured: true,
    order: 4,
    start_date: '2025-06-01',
    end_date: null,
  },
  {
    id: 5,
    title: 'LLM Reasoning Research',
    slug: 'llm-reasoning-research',
    description: "Research project investigating reasoning capabilities and failure modes of Large Language Models on structured problem-solving tasks. Currently exploring prompt-conditioning strategies, chain-of-thought robustness, and evaluation harnesses based on EleutherAI's lm-evaluation-harness and the APPS benchmark. The work aims to characterize where LLMs systematically fail at multi-step reasoning and to design diagnostics that separate retrieval-style answering from genuine inference.",
    short_description: 'Investigating reasoning capabilities and failure modes of Large Language Models (in development).',
    image: null,
    github_url: 'https://github.com/dishantgupta2004/LLM_Reasoning_Research',
    live_url: null,
    technologies: ['Python', 'PyTorch', 'HuggingFace Transformers', 'lm-evaluation-harness', 'APPS Benchmark'],
    highlights: [
      'Building evaluation harness for systematic LLM reasoning analysis',
      'Investigating chain-of-thought robustness across problem categories',
      'Designing diagnostics to separate retrieval from genuine multi-step inference',
      'Currently in active development',
    ],
    category: 'ai',
    is_featured: true,
    order: 5,
    start_date: '2025-09-01',
    end_date: null,
  },
  {
    id: 6,
    title: 'Laser Aerosol PM Sensor',
    slug: 'laser-aerosol-pm',
    description: 'Low-cost laser-scattering particulate matter (PM) sensor for real-time air quality monitoring. This project combines optical sensing hardware with signal-processing pipelines to estimate PM2.5 / PM10 concentrations from forward-scattered laser light. Includes calibration routines against reference instruments and embedded firmware for continuous data logging — designed with deployability and field robustness in mind.',
    short_description: 'Low-cost laser-scattering particulate matter sensor for real-time air quality monitoring.',
    image: null,
    github_url: 'https://github.com/dishantgupta2004/laser_aerosol_pm',
    live_url: null,
    technologies: ['Python', 'C++', 'Embedded Systems', 'Signal Processing', 'Optical Sensing'],
    highlights: [
      'Designed laser-scattering optical front-end for PM2.5/PM10 detection',
      'Implemented signal-processing pipeline for concentration estimation',
      'Built calibration routines against reference-grade instruments',
      'Embedded firmware for continuous field deployment and logging',
    ],
    category: 'hardware',
    is_featured: false,
    order: 6,
    start_date: '2025-03-01',
    end_date: null,
  },
]

export const STATIC_PUBLICATIONS: Publication[] = [
  {
    id: 1,
    title: 'Hybrid Transformer-Physics-GenAI Framework for Physics-Informed Hailstorm Prediction Using Deep Neural Operators',
    authors: 'Gupta, D., & Mokta, A.',
    abstract: 'This research introduces a novel architecture integrating transformer models with physics-informed neural operators for accurate hailstorm prediction. The proposed framework combines Fourier Neural Operators with generative AI to create an uncertainty-aware meteorological forecasting system, demonstrating superior performance over state-of-the-art baselines with 25% lower error rates in predicting extreme weather events.',
    publication_type: 'paper',
    journal: null,
    year: 2025,
    doi: null,
    pdf_url: 'https://drive.google.com/file/d/1mqkH7C53NdqtAuNc7--GdHgjCOUyO6sN/view?usp=sharing',
    status: 'in_development',
    highlights: [
      'Developed a novel architecture integrating transformer models with physics-informed neural operators',
      'Combined Fourier Neural Operators with generative AI for uncertainty-aware forecasting',
      'Demonstrated 25% lower error rates in predicting extreme weather events',
    ],
    order: 1,
  },
  {
    id: 2,
    title: 'Non-Equilibrium Statistical Analysis of Physics-Informed Neural Networks: Towards a Generalized Diffusion Model',
    authors: 'Gupta, D.',
    abstract: 'This work presents a physics-grounded theoretical framework that opens the "black box" of Physics-Informed Neural Networks (PINNs) by modeling their learning process as a non-equilibrium stochastic system governed by Langevin dynamics. Drawing parallels with neuronal ensembles in the brain, the study introduces an entropy-regularized loss and develops an Entropy-Langevin algorithm that enables interpretable training dynamics, improves convergence, and offers built-in uncertainty quantification.',
    publication_type: 'paper',
    journal: null,
    year: 2025,
    doi: null,
    pdf_url: 'https://drive.google.com/file/d/1DGLh0IV4acIdIC0glQWhC1UaEJjbJxkG/view?usp=sharing',
    status: 'in_development',
    highlights: [
      'Reframes PINNs as stochastic systems to interpret training via Langevin dynamics',
      'Introduces an entropy-regularized algorithm for better convergence and exploration',
      'Enables built-in uncertainty quantification and interpretability in PINN training',
    ],
    order: 2,
  },
]

export const STATIC_EXPERIENCES: Experience[] = [
  {
    id: 1,
    title: 'Field & Technology Intern',
    company: 'Baker Hughes',
    company_url: 'https://www.bakerhughes.com/',
    location: 'Navi Mumbai, Maharashtra',
    start_date: '2026-01-01',
    end_date: '2026-03-31',
    is_current: false,
    description: 'Hands-on field engineering experience with focus on HSE compliance and equipment operations.',
    highlights: [
      'Conducted regular HSE observations, identifying potential site hazards and ensuring strict compliance with safety protocols during high-pressure field tasks.',
      'Collaborated with senior field engineers to monitor equipment performance and assist in the logistical preparation of logging tools for offshore/onshore deployments.',
    ],
    technologies: ['HSE Protocols', 'Field Engineering', 'Equipment Monitoring', 'Logging Tools'],
    category: 'internship',
    order: 1,
  },
  {
    id: 2,
    title: 'Summer Research Intern - Metalens Design in SWIR Range',
    company: 'Space Applications Centre (SAC), ISRO',
    company_url: 'https://www.sac.gov.in/',
    location: 'Ahmedabad, Gujarat',
    start_date: '2025-06-01',
    end_date: '2025-08-31',
    is_current: false,
    description: 'Research internship focused on designing and simulating metalenses for advanced imaging applications in the Short-Wave Infrared (SWIR) spectrum.',
    highlights: [
      'Designed and simulated a large-scale metalens (up to 2 mm in diameter) tailored for advanced, highly compact imaging applications within the Short-Wave Infrared (SWIR) spectrum.',
      'Modeled and optimized complex sub-wavelength nanostructures by applying Rigorous Coupled-Wave Analysis (RCWA) utilizing Synopsys DiffractMOD.',
      'Evaluated and integrated the open-source optical design tool, OptiLand, to rigorously extract and analyze critical optical performance metrics, generating the MTF and PSF.',
    ],
    technologies: ['RCWA', 'FDTD', 'Synopsys DiffractMOD', 'OptiLand', 'SWIR Optics', 'Metalens Design'],
    category: 'research',
    order: 2,
  },
  {
    id: 3,
    title: 'Co-Founder & CTO',
    company: 'Unisole Empower',
    company_url: 'https://classplusapp.com/w/unisole-empower',
    location: 'Hamirpur, India',
    start_date: '2023-12-01',
    end_date: null,
    is_current: true,
    description: 'Building AI solutions for agriculture and education as Co-Founder and Chief Technology Officer.',
    highlights: [
      'Led the development of an AI-automated hail prediction and anti-hail net deployment system for apple orchards, integrating radar sensing and physics-informed deep learning models.',
      'Conducted 30+ AI and machine learning workshops, mentoring over 2,000 students.',
      'Developing AI-driven radar systems for agricultural risk management.',
      'Taught online courses to 100+ students on Machine Learning and Deep Learning.',
    ],
    technologies: ['TensorFlow', 'PyTorch', 'Python', 'Physics-Informed Neural Networks', 'Radar Systems', 'Deep Learning'],
    category: 'work',
    order: 3,
  },
  {
    id: 4,
    title: 'Executive Member',
    company: 'Robotic Society, NIT Hamirpur',
    company_url: 'https://nith.ac.in/',
    location: 'Hamirpur, India',
    start_date: '2024-01-01',
    end_date: null,
    is_current: true,
    description: 'Leading robotics education initiatives and workshops for students.',
    highlights: [
      'Organized workshops on robotics with 400+ student participation.',
      'Introduced basic robotics, sensors, and Arduino programming to first-year students.',
    ],
    technologies: ['Arduino', 'Robotics', 'Sensors', 'Embedded Systems'],
    category: 'leadership',
    order: 4,
  },
]

export const STATIC_EDUCATION: Education[] = [
  {
    id: 1,
    degree: 'B.Tech in Engineering Physics',
    institution: 'National Institute of Technology, Hamirpur',
    location: 'Hamirpur, India',
    start_year: 2022,
    end_year: 2026,
    gpa: 'CGPA: 8.90',
    description: 'Specializing in computational physics, machine learning, and physics-informed neural networks.',
    order: 1,
  },
  {
    id: 2,
    degree: 'Secondary Education (Class 12th)',
    institution: 'St Soldier Divine Public School',
    location: 'Hoshiarpur, India',
    start_year: 2020,
    end_year: 2022,
    gpa: '95.8%',
    description: 'Science stream with focus on Physics, Chemistry, and Mathematics.',
    order: 2,
  },
  {
    id: 3,
    degree: 'Secondary Education (Class 10th)',
    institution: 'St Soldier Divine Public School',
    location: 'Hoshiarpur, India',
    start_year: 2018,
    end_year: 2020,
    gpa: '90.00%',
    description: null,
    order: 3,
  },
]

export const STATIC_SKILLS: SkillsGrouped = {
  'Programming': [
    { id: 1, name: 'Python', category: 'Programming', proficiency: 95, order: 1 },
    { id: 2, name: 'C++', category: 'Programming', proficiency: 80, order: 2 },
    { id: 3, name: 'MATLAB', category: 'Programming', proficiency: 85, order: 3 },
  ],
  'Computational Physics': [
    { id: 4, name: 'Machine Learning', category: 'Computational Physics', proficiency: 90, order: 1 },
    { id: 5, name: 'Deep Learning', category: 'Computational Physics', proficiency: 90, order: 2 },
    { id: 6, name: 'Physics-Informed Neural Networks', category: 'Computational Physics', proficiency: 95, order: 3 },
    { id: 7, name: 'FEM', category: 'Computational Physics', proficiency: 80, order: 4 },
    { id: 8, name: 'PDE Solvers', category: 'Computational Physics', proficiency: 85, order: 5 },
  ],
  'Frameworks & Tools': [
    { id: 9, name: 'TensorFlow', category: 'Frameworks & Tools', proficiency: 90, order: 1 },
    { id: 10, name: 'PyTorch', category: 'Frameworks & Tools', proficiency: 85, order: 2 },
    { id: 11, name: 'DeepXDE', category: 'Frameworks & Tools', proficiency: 90, order: 3 },
    { id: 12, name: 'NumPy', category: 'Frameworks & Tools', proficiency: 95, order: 4 },
    { id: 13, name: 'SciPy', category: 'Frameworks & Tools', proficiency: 90, order: 5 },
    { id: 14, name: 'Pandas', category: 'Frameworks & Tools', proficiency: 90, order: 6 },
  ],
}

export const STATIC_COURSES: Course[] = [
  {
    id: 1,
    title: 'Python Programming',
    description: null,
    short_description: 'Complete Python programming course from basics to advanced concepts with hands-on projects.',
    image: null,
    url: 'https://classplusapp.com/w/unisole-empower/courses/751561',
    price: 'Contact for pricing',
    duration: 'Self-paced',
    level: 'Beginner to Advanced',
    features: [
      'Complete Python fundamentals',
      'Object-Oriented Programming',
      'Data structures & algorithms',
      'Real-world projects',
      'Certificate of completion',
      'Doubt clearing sessions',
    ],
    is_featured: true,
    order: 1,
  },
  {
    id: 2,
    title: 'Full Stack Data Science Pro',
    description: null,
    short_description: 'Comprehensive Data Science course covering ML, DL, NLP, Computer Vision, and industry deployment practices.',
    image: null,
    url: 'https://classplusapp.com/w/unisole-empower/courses/723989',
    price: 'Contact for pricing',
    duration: 'Self-paced',
    level: 'Intermediate to Advanced',
    features: [
      'Machine Learning fundamentals',
      'Deep Learning with TensorFlow/PyTorch',
      'Natural Language Processing',
      'Computer Vision projects',
      'MLOps and deployment',
      'Industry-ready portfolio',
      'Placement assistance',
      'Lifetime access',
    ],
    is_featured: true,
    order: 2,
  },
]

export const STATIC_BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'Computational Physics in Python: A Working Library',
    subtitle: 'PDE solvers, FEM, eigenvalue problems, and more',
    slug: 'computational-physics-python-library',
    excerpt: 'A walkthrough of my open-source Python library covering PDE solvers, eigenvalue problems, FEM, Lorentz equations, interpolation, and curve fitting — built up over years of coursework and research.',
    content: `<p>This repository is a working library of physics computation routines I have built up across coursework and research. It covers the core numerical primitives that show up repeatedly in computational physics:</p>
<ul>
<li><strong>PDE solvers</strong> — finite difference and finite element approaches</li>
<li><strong>Eigenvalue problems</strong> — for quantum mechanics and structural analysis</li>
<li><strong>Lorentz equations</strong> — chaotic dynamical systems</li>
<li><strong>Interpolation and curve fitting</strong> — including spline and least-squares methods</li>
<li><strong>FEM (Finite Element Method)</strong> — for solving boundary value problems</li>
</ul>
<p>The intent is pedagogical as much as practical: each module is written so that the underlying math is visible in the code, not buried behind a black-box library call.</p>
<p><a href="https://github.com/dishantgupta2004/Computational_Physics_python" target="_blank" rel="noopener noreferrer">View the repository on GitHub →</a></p>`,
    category: 'research',
    category_name: 'Computational Physics',
    thumbnail: null,
    featured_image: null,
    tags: ['Computational Physics', 'Python', 'FEM', 'PDE'],
    published: true,
    date: '2024-06-01T00:00:00',
    updated_at: '2024-06-01T00:00:00',
  },
  {
    id: 2,
    title: 'Gen-AI: End-to-End Generative AI Projects',
    subtitle: 'LangChain pipelines, RAG systems, and academic paper analysis',
    slug: 'gen-ai-projects',
    excerpt: 'A collection of end-to-end generative AI projects: LangChain/LangGraph pipelines, search engines, academic paper analysis tools, and Retrieval-Augmented Generation (RAG) systems.',
    content: `<p>This repository collects several end-to-end generative AI projects I have built. The focus is on production-style pipelines rather than isolated notebooks — each project ships with the orchestration, retrieval, and evaluation glue that real systems need.</p>
<ul>
<li><strong>LangChain / LangGraph pipelines</strong> — multi-step agent workflows with tool use</li>
<li><strong>Search engines</strong> — semantic search over custom corpora</li>
<li><strong>Academic paper analysis tools</strong> — extracting structured information from PDFs</li>
<li><strong>RAG systems</strong> — retrieval-augmented generation with vector stores</li>
</ul>
<p>Working on these projects taught me that the gap between a working LLM demo and a robust system is mostly about handling failure modes: empty retrievals, malformed tool calls, and prompt drift over long conversations.</p>
<p><a href="https://github.com/dishantgupta2004/Gen-AI" target="_blank" rel="noopener noreferrer">View the repository on GitHub →</a></p>`,
    category: 'ai',
    category_name: 'Generative AI',
    thumbnail: null,
    featured_image: null,
    tags: ['Generative AI', 'LangChain', 'RAG', 'LLMs'],
    published: true,
    date: '2024-09-01T00:00:00',
    updated_at: '2024-09-01T00:00:00',
  },
  {
    id: 3,
    title: 'Building a GPT From Scratch — UniTransformer Workshop',
    subtitle: 'A complete transformer implementation built for the workshop at Unisole Empower',
    slug: 'unitransformer-workshop',
    excerpt: 'A complete, from-scratch transformer (GPT) implementation in PyTorch, built as the teaching artifact for a workshop I conducted at Unisole Empower.',
    content: `<p>This is the codebase behind a hands-on transformer workshop I taught at Unisole Empower. It implements a GPT-style language model end-to-end in PyTorch, with no shortcuts to high-level APIs — every component is written out so participants can read, modify, and break things.</p>
<ul>
<li><strong>Tokenization</strong> — BPE and character-level options</li>
<li><strong>Attention</strong> — scaled dot-product, multi-head, and causal masking</li>
<li><strong>Transformer blocks</strong> — with explicit residuals and layer norm</li>
<li><strong>Training loop</strong> — including learning-rate warmup and gradient clipping</li>
<li><strong>Generation</strong> — temperature, top-k, and top-p sampling</li>
</ul>
<p>The goal of the workshop was to demystify the architecture: to show that a GPT is fundamentally a stack of well-understood operations rather than magic.</p>
<p><a href="https://github.com/dishantgupta2004/UniTransformerWorkshop" target="_blank" rel="noopener noreferrer">View the repository on GitHub →</a></p>`,
    category: 'ai',
    category_name: 'Deep Learning',
    thumbnail: null,
    featured_image: null,
    tags: ['Transformers', 'GPT', 'PyTorch', 'Education'],
    published: true,
    date: '2024-12-01T00:00:00',
    updated_at: '2024-12-01T00:00:00',
  },
]