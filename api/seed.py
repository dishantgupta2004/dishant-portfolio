"""
Database Seeding Script
Seeds the PostgreSQL database with portfolio data including updated experiences
"""
from datetime import date
from index import app
from models import db, Experience, Project, Publication, Course, Skill, Education


def seed_experiences():
    """Seed experience data with updated resume information"""
    experiences = [
        {
            'title': 'Field & Technology Intern',
            'company': 'Baker Hughes',
            'company_url': 'https://www.bakerhughes.com/',
            'location': 'Navi Mumbai, Maharashtra',
            'start_date': date(2026, 1, 1),
            'end_date': date(2026, 3, 31),
            'is_current': False,
            'description': 'Hands-on field engineering experience with focus on HSE compliance and equipment operations.',
            'highlights': [
                'Conducted regular HSE observations, identifying potential site hazards and ensuring strict compliance with safety protocols during high-pressure field tasks.',
                'Collaborated with senior field engineers to monitor equipment performance and assist in the logistical preparation of logging tools for offshore/onshore deployments.'
            ],
            'technologies': ['HSE Protocols', 'Field Engineering', 'Equipment Monitoring', 'Logging Tools'],
            'category': 'internship',
            'order': 1
        },
        {
            'title': 'Summer Research Intern - Metalens Design in SWIR Range',
            'company': 'Space Applications Centre (SAC), ISRO',
            'company_url': 'https://www.sac.gov.in/',
            'location': 'Ahmedabad, Gujarat',
            'start_date': date(2025, 6, 1),
            'end_date': date(2025, 8, 31),
            'is_current': False,
            'description': 'Research internship focused on designing and simulating metalenses for advanced imaging applications in the Short-Wave Infrared (SWIR) spectrum.',
            'highlights': [
                'Designed and simulated a large-scale metalens (up to 2 mm in diameter) tailored for advanced, highly compact imaging applications within the Short-Wave Infrared (SWIR) spectrum.',
                'Modeled and optimized complex sub-wavelength nanostructures by applying Rigorous Coupled-Wave Analysis (RCWA) utilizing Synopsys DiffractMOD.',
                'Evaluated and integrated the open-source optical design tool, OptiLand, to rigorously extract and analyze critical optical performance metrics, generating the MTF and PSF.'
            ],
            'technologies': ['RCWA', 'FDTD', 'Synopsys DiffractMOD', 'OptiLand', 'SWIR Optics', 'Metalens Design'],
            'category': 'research',
            'order': 2
        },
        {
            'title': 'Co-Founder & CTO',
            'company': 'Unisole Empower',
            'company_url': 'https://classplusapp.com/w/unisole-empower',
            'location': 'Hamirpur, India',
            'start_date': date(2023, 12, 1),
            'end_date': None,
            'is_current': True,
            'description': 'Building AI solutions for agriculture and education as Co-Founder and Chief Technology Officer.',
            'highlights': [
                'Led the development of an AI-automated hail prediction and anti-hail net deployment system for apple orchards, integrating radar sensing and physics-informed deep learning models.',
                'Conducted 15+ AI and machine learning workshops, mentoring over 1,000 students.',
                'Developing AI-driven radar systems for agricultural risk management.',
                'Taught online courses to 100+ students on Machine Learning and Deep Learning.'
            ],
            'technologies': ['TensorFlow', 'PyTorch', 'Python', 'Physics-Informed Neural Networks', 'Radar Systems', 'Deep Learning'],
            'category': 'work',
            'order': 3
        },
        {
            'title': 'Executive Member',
            'company': 'Robotic Society, NIT Hamirpur',
            'company_url': 'https://nith.ac.in/',
            'location': 'Hamirpur, India',
            'start_date': date(2024, 1, 1),
            'end_date': None,
            'is_current': True,
            'description': 'Leading robotics education initiatives and workshops for students.',
            'highlights': [
                'Organized workshops on robotics with 400+ student participation.',
                'Introduced basic robotics, sensors, and Arduino programming to first-year students.'
            ],
            'technologies': ['Arduino', 'Robotics', 'Sensors', 'Embedded Systems'],
            'category': 'leadership',
            'order': 4
        }
    ]
    
    for exp_data in experiences:
        existing = Experience.query.filter_by(
            title=exp_data['title'],
            company=exp_data['company']
        ).first()
        
        if not existing:
            experience = Experience(**exp_data)
            db.session.add(experience)
    
    db.session.commit()
    print(f"✓ Seeded {len(experiences)} experiences")


def seed_projects():
    """Seed project data"""
    projects = [
        {
            'title': 'AI-Driven Anti-Hailstorm System',
            'slug': 'ai-anti-hailstorm',
            'description': '''An advanced system that uses Physics-Informed Neural Networks (PINNs) to predict and mitigate hailstorm damage in agricultural settings.

This project combines cutting-edge deep learning techniques with physics-based modeling to create a real-time weather prediction and mitigation system.''',
            'short_description': 'Physics-Informed Neural Network for hailstorm prediction and agricultural protection.',
            'image': '/images/projects/hailstorm.jpeg',
            'github_url': 'https://github.com/dishantgupta2004/Radar-Hail-Prediction-Model',
            'technologies': ['TensorFlow', 'DeepXDE', 'Python', 'OpenFOAM'],
            'highlights': [
                'Engineering a PINN model to solve inverse problems related to hailstorm prediction',
                'Developing hailstorm impact mitigation using real-time weather data',
                'Applied numerical methods to optimize anti-hail net deployment'
            ],
            'category': 'research',
            'is_featured': True,
            'order': 1,
            'start_date': date(2024, 11, 1)
        },
        {
            'title': 'Computational Physics and AI Applications',
            'slug': 'computational-physics-ai',
            'description': '''Implementation of computational physics models to solve complex partial differential equations using Physics-Informed Neural Networks.

Includes solvers for Navier-Stokes equations, Schrödinger equation, and Graphene analysis for material science applications.''',
            'short_description': 'Solving complex PDEs using PINNs for fluid dynamics and quantum mechanics.',
            'github_url': 'https://github.com/dishantgupta2004/Computational_Physics_python',
            'technologies': ['DeepXDE', 'NumPy', 'SciPy', 'Matplotlib'],
            'highlights': [
                'Modeled Navier-Stokes equations using PINNs for fluid dynamics',
                'Conducted Graphene analysis for material science applications',
                'Implemented solvers for the Schrödinger equation'
            ],
            'category': 'research',
            'is_featured': True,
            'order': 2,
            'start_date': date(2023, 1, 1)
        },
        {
            'title': 'Langevin Dynamics Approach to PINNs',
            'slug': 'langevin-pinns',
            'description': '''Novel training framework based on Langevin dynamics for improved convergence in Physics-Informed Neural Networks.

Applied to chemical vapor deposition simulations with 40% faster convergence, improving efficiency in semiconductor manufacturing simulations.''',
            'short_description': 'Langevin dynamics-based training for faster PINN convergence.',
            'github_url': 'https://github.com/dishantgupta2004/LPINN-CVD',
            'technologies': ['Statistical Mechanics', 'Neural Networks', 'Python', 'TensorFlow'],
            'highlights': [
                'Applied to chemical vapor deposition with 40% faster convergence',
                'Developed adaptive noise scheduling techniques',
                'Improved efficiency in semiconductor manufacturing simulations'
            ],
            'category': 'research',
            'is_featured': True,
            'order': 3,
            'start_date': date(2025, 1, 1)
        },
        {
            'title': 'Crop Disease Detection System',
            'slug': 'crop-disease-detection',
            'description': '''AI-powered system integrating image-based disease detection with natural language guidance for farmers.

Features a custom CNN trained on 16 GB of crop image data with LLM integration for actionable farmer advice and multilingual support.''',
            'short_description': 'CNN + LLM system for crop disease detection and farmer guidance.',
            'github_url': 'https://github.com/moktagithub005/disease_crop_app',
            'technologies': ['CNN', 'LLM', 'TensorFlow', 'Flask'],
            'highlights': [
                'Custom CNN trained on 16 GB of crop image data',
                'LLM integration for actionable farmer advice',
                'Multilingual support for accessibility'
            ],
            'category': 'ai',
            'is_featured': False,
            'order': 4,
            'start_date': date(2024, 1, 1)
        }
    ]
    
    for proj_data in projects:
        existing = Project.query.filter_by(slug=proj_data['slug']).first()
        if not existing:
            project = Project(**proj_data)
            db.session.add(project)
    
    db.session.commit()
    print(f"✓ Seeded {len(projects)} projects")


def seed_publications():
    """Seed publication data"""
    publications = [
        {
            'title': 'Hybrid Transformer-Physics-GenAI Framework for Physics-Informed Hailstorm Prediction Using Deep Neural Operators',
            'authors': 'Gupta, D., & Mokta, A.',
            'abstract': '''This research introduces a novel architecture integrating transformer models with physics-informed neural operators for accurate hailstorm prediction. The proposed framework combines Fourier Neural Operators with generative AI to create an uncertainty-aware meteorological forecasting system, demonstrating superior performance over state-of-the-art baselines with 25% lower error rates in predicting extreme weather events.''',
            'publication_type': 'paper',
            'year': 2025,
            'status': 'in_development',
            'pdf_url': 'https://drive.google.com/file/d/1mqkH7C53NdqtAuNc7--GdHgjCOUyO6sN/view?usp=sharing',
            'highlights': [
                'Developed a novel architecture integrating transformer models with physics-informed neural operators',
                'Combined Fourier Neural Operators with generative AI for uncertainty-aware forecasting',
                'Demonstrated 25% lower error rates in predicting extreme weather events'
            ],
            'order': 1
        },
        {
            'title': 'Non-Equilibrium Statistical Analysis of Physics-Informed Neural Networks: Towards a Generalized Diffusion Model',
            'authors': 'Gupta, D.',
            'abstract': '''This work presents a physics-grounded theoretical framework that opens the "black box" of Physics-Informed Neural Networks (PINNs) by modeling their learning process as a non-equilibrium stochastic system governed by Langevin dynamics. Drawing parallels with neuronal ensembles in the brain, the study introduces an entropy-regularized loss and develops an Entropy-Langevin algorithm that enables interpretable training dynamics, improves convergence, and offers built-in uncertainty quantification.''',
            'publication_type': 'paper',
            'year': 2025,
            'status': 'in_development',
            'pdf_url': 'https://drive.google.com/file/d/1DGLh0IV4acIdIC0glQWhC1UaEJjbJxkG/view?usp=sharing',
            'highlights': [
                'Reframes PINNs as stochastic systems to interpret training via Langevin dynamics',
                'Introduces an entropy-regularized algorithm for better convergence and exploration',
                'Enables built-in uncertainty quantification and interpretability in PINN training'
            ],
            'order': 2
        }
    ]
    
    for pub_data in publications:
        existing = Publication.query.filter_by(title=pub_data['title']).first()
        if not existing:
            publication = Publication(**pub_data)
            db.session.add(publication)
    
    db.session.commit()
    print(f"✓ Seeded {len(publications)} publications")


def seed_courses():
    """Seed course data"""
    courses = [
        {
            'title': 'Python Programming',
            'description': '''Master Python programming from basics to advanced concepts. This comprehensive course covers:
            
- Python fundamentals and syntax
- Data structures and algorithms
- Object-Oriented Programming (OOP)
- File handling and exception management
- Working with libraries like NumPy, Pandas
- Real-world projects and assignments''',
            'short_description': 'Complete Python programming course from basics to advanced concepts with hands-on projects.',
            'url': 'https://classplusapp.com/w/unisole-empower/courses/751561?utm_source=other&utm_medium=tutor-course-referral&utm_campaign=course-overview-webapp',
            'price': 'Contact for pricing',
            'duration': 'Self-paced',
            'level': 'Beginner to Advanced',
            'features': [
                'Complete Python fundamentals',
                'Object-Oriented Programming',
                'Data structures & algorithms',
                'Real-world projects',
                'Certificate of completion',
                'Doubt clearing sessions'
            ],
            'is_featured': True,
            'order': 1
        },
        {
            'title': 'Full Stack Data Science Pro',
            'description': '''Become a complete Data Scientist with our comprehensive Full Stack Data Science Pro course. Learn:
            
- Python for Data Science
- Statistics and Probability
- Machine Learning algorithms
- Deep Learning with TensorFlow & PyTorch
- Natural Language Processing
- Computer Vision
- MLOps and deployment
- Real industry projects''',
            'short_description': 'Comprehensive Data Science course covering ML, DL, NLP, Computer Vision, and industry deployment practices.',
            'url': 'https://classplusapp.com/w/unisole-empower/courses/723989?utm_source=other&utm_medium=tutor-course-referral&utm_campaign=course-overview-webapp',
            'price': 'Contact for pricing',
            'duration': 'Self-paced',
            'level': 'Intermediate to Advanced',
            'features': [
                'Machine Learning fundamentals',
                'Deep Learning with TensorFlow/PyTorch',
                'Natural Language Processing',
                'Computer Vision projects',
                'MLOps and deployment',
                'Industry-ready portfolio',
                'Placement assistance',
                'Lifetime access'
            ],
            'is_featured': True,
            'order': 2
        }
    ]
    
    for course_data in courses:
        existing = Course.query.filter_by(title=course_data['title']).first()
        if not existing:
            course = Course(**course_data)
            db.session.add(course)
    
    db.session.commit()
    print(f"✓ Seeded {len(courses)} courses")


def seed_skills():
    """Seed skills data"""
    skills = [
        # Programming
        {'name': 'Python', 'category': 'Programming', 'proficiency': 95, 'order': 1},
        {'name': 'C++', 'category': 'Programming', 'proficiency': 80, 'order': 2},
        {'name': 'MATLAB', 'category': 'Programming', 'proficiency': 85, 'order': 3},
        
        # Computational Physics
        {'name': 'Machine Learning', 'category': 'Computational Physics', 'proficiency': 90, 'order': 1},
        {'name': 'Deep Learning', 'category': 'Computational Physics', 'proficiency': 90, 'order': 2},
        {'name': 'Physics-Informed Neural Networks', 'category': 'Computational Physics', 'proficiency': 95, 'order': 3},
        {'name': 'FEM', 'category': 'Computational Physics', 'proficiency': 80, 'order': 4},
        {'name': 'PDE Solvers', 'category': 'Computational Physics', 'proficiency': 85, 'order': 5},
        
        # Frameworks & Tools
        {'name': 'TensorFlow', 'category': 'Frameworks & Tools', 'proficiency': 90, 'order': 1},
        {'name': 'PyTorch', 'category': 'Frameworks & Tools', 'proficiency': 85, 'order': 2},
        {'name': 'DeepXDE', 'category': 'Frameworks & Tools', 'proficiency': 90, 'order': 3},
        {'name': 'NumPy', 'category': 'Frameworks & Tools', 'proficiency': 95, 'order': 4},
        {'name': 'SciPy', 'category': 'Frameworks & Tools', 'proficiency': 90, 'order': 5},
        {'name': 'Pandas', 'category': 'Frameworks & Tools', 'proficiency': 90, 'order': 6},
        {'name': 'OpenFOAM', 'category': 'Frameworks & Tools', 'proficiency': 75, 'order': 7},
    ]
    
    for skill_data in skills:
        existing = Skill.query.filter_by(name=skill_data['name']).first()
        if not existing:
            skill = Skill(**skill_data)
            db.session.add(skill)
    
    db.session.commit()
    print(f"✓ Seeded {len(skills)} skills")


def seed_education():
    """Seed education data"""
    education = [
        {
            'degree': 'B.Tech in Engineering Physics',
            'institution': 'National Institute of Technology, Hamirpur',
            'location': 'Hamirpur, India',
            'start_year': 2022,
            'end_year': 2026,
            'gpa': 'CGPA: 8.90',
            'description': 'Specializing in computational physics, machine learning, and physics-informed neural networks.',
            'order': 1
        },
        {
            'degree': 'Secondary Education (Class 12th)',
            'institution': 'St Soldier Divine Public School',
            'location': 'Hoshiarpur, India',
            'start_year': 2020,
            'end_year': 2022,
            'gpa': '95.8%',
            'description': 'Science stream with focus on Physics, Chemistry, and Mathematics.',
            'order': 2
        },
        {
            'degree': 'Secondary Education (Class 10th)',
            'institution': 'St Soldier Divine Public School',
            'location': 'Hoshiarpur, India',
            'start_year': 2018,
            'end_year': 2020,
            'gpa': '90.00%',
            'order': 3
        }
    ]
    
    for edu_data in education:
        existing = Education.query.filter_by(
            degree=edu_data['degree'],
            institution=edu_data['institution']
        ).first()
        if not existing:
            edu = Education(**edu_data)
            db.session.add(edu)
    
    db.session.commit()
    print(f"✓ Seeded {len(education)} education entries")


def seed_all():
    """Run all seed functions"""
    print("\n🌱 Seeding database...\n")
    
    with app.app_context():
        # Create all tables
        db.create_all()
        print("✓ Database tables created\n")
        
        seed_experiences()
        seed_projects()
        seed_publications()
        seed_courses()
        seed_skills()
        seed_education()
        
        print("\n✅ Database seeding complete!")


if __name__ == '__main__':
    seed_all()
