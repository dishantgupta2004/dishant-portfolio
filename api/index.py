"""
Flask API Entry Point for Vercel Serverless Deployment
Main application factory and routes
"""
from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import date
import os

from config import config
from models import db, Experience, Project, Publication, BlogPost, Course, ContactMessage, Skill, Education


def create_app(config_name='default'):
    """Application factory pattern"""
    app = Flask(__name__)
    
    # Load configuration
    env = os.getenv('FLASK_ENV', 'production')
    app.config.from_object(config.get(env, config['default']))
    
    # Initialize extensions
    db.init_app(app)
    CORS(app, origins=app.config.get('CORS_ORIGINS', '*'))
    
    # Register routes
    register_routes(app)
    
    return app


def register_routes(app):
    """Register all API routes"""
    
    # ============== HEALTH CHECK ==============
    @app.route('/api', methods=['GET'])
    @app.route('/api/', methods=['GET'])
    def api_health():
        return jsonify({
            'status': 'healthy',
            'message': 'Dishant Gupta Portfolio API',
            'version': '2.0.0',
            'endpoints': {
                'experiences': '/api/experiences',
                'projects': '/api/projects',
                'publications': '/api/publications',
                'courses': '/api/courses',
                'skills': '/api/skills',
                'education': '/api/education',
                'blog': '/api/blog',
                'contact': '/api/contact',
            }
        })
    
    # ============== EXPERIENCES ==============
    @app.route('/api/experiences', methods=['GET'])
    def get_experiences():
        """Get all experiences, ordered by date (most recent first)"""
        try:
            category = request.args.get('category')
            query = Experience.query.order_by(Experience.order.asc(), Experience.start_date.desc())
            
            if category:
                query = query.filter_by(category=category)
            
            experiences = query.all()
            return jsonify({
                'success': True,
                'data': [exp.to_dict() for exp in experiences],
                'count': len(experiences)
            })
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)}), 500
    
    @app.route('/api/experiences/<int:id>', methods=['GET'])
    def get_experience(id):
        """Get a single experience by ID"""
        try:
            experience = Experience.query.get_or_404(id)
            return jsonify({'success': True, 'data': experience.to_dict()})
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)}), 404
    
    # ============== PROJECTS ==============
    @app.route('/api/projects', methods=['GET'])
    def get_projects():
        """Get all projects"""
        try:
            featured_only = request.args.get('featured', '').lower() == 'true'
            category = request.args.get('category')
            
            query = Project.query.order_by(Project.order.asc(), Project.created_at.desc())
            
            if featured_only:
                query = query.filter_by(is_featured=True)
            if category:
                query = query.filter_by(category=category)
            
            projects = query.all()
            return jsonify({
                'success': True,
                'data': [proj.to_dict() for proj in projects],
                'count': len(projects)
            })
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)}), 500
    
    @app.route('/api/projects/<slug>', methods=['GET'])
    def get_project(slug):
        """Get a single project by slug"""
        try:
            project = Project.query.filter_by(slug=slug).first_or_404()
            return jsonify({'success': True, 'data': project.to_dict()})
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)}), 404
    
    # ============== PUBLICATIONS ==============
    @app.route('/api/publications', methods=['GET'])
    def get_publications():
        """Get all publications"""
        try:
            status = request.args.get('status')
            query = Publication.query.order_by(Publication.order.asc(), Publication.year.desc())
            
            if status:
                query = query.filter_by(status=status)
            
            publications = query.all()
            return jsonify({
                'success': True,
                'data': [pub.to_dict() for pub in publications],
                'count': len(publications)
            })
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)}), 500
    
    # ============== COURSES ==============
    @app.route('/api/courses', methods=['GET'])
    def get_courses():
        """Get all courses"""
        try:
            featured_only = request.args.get('featured', '').lower() == 'true'
            query = Course.query.order_by(Course.order.asc())
            
            if featured_only:
                query = query.filter_by(is_featured=True)
            
            courses = query.all()
            return jsonify({
                'success': True,
                'data': [course.to_dict() for course in courses],
                'count': len(courses)
            })
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)}), 500
    
    # ============== SKILLS ==============
    @app.route('/api/skills', methods=['GET'])
    def get_skills():
        """Get all skills grouped by category"""
        try:
            skills = Skill.query.order_by(Skill.category, Skill.order).all()
            
            # Group by category
            grouped = {}
            for skill in skills:
                if skill.category not in grouped:
                    grouped[skill.category] = []
                grouped[skill.category].append(skill.to_dict())
            
            return jsonify({
                'success': True,
                'data': grouped,
                'count': len(skills)
            })
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)}), 500
    
    # ============== EDUCATION ==============
    @app.route('/api/education', methods=['GET'])
    def get_education():
        """Get education history"""
        try:
            education = Education.query.order_by(Education.order.asc(), Education.end_year.desc()).all()
            return jsonify({
                'success': True,
                'data': [edu.to_dict() for edu in education],
                'count': len(education)
            })
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)}), 500
    
    # ============== BLOG ==============
    @app.route('/api/blog', methods=['GET'])
    def get_blog_posts():
        """Get all published blog posts"""
        try:
            page = request.args.get('page', 1, type=int)
            per_page = request.args.get('per_page', 10, type=int)
            category = request.args.get('category')
            
            query = BlogPost.query.filter_by(published=True).order_by(BlogPost.date.desc())
            
            if category:
                query = query.filter_by(category=category)
            
            pagination = query.paginate(page=page, per_page=per_page, error_out=False)
            
            return jsonify({
                'success': True,
                'data': [post.to_dict() for post in pagination.items],
                'pagination': {
                    'page': pagination.page,
                    'pages': pagination.pages,
                    'total': pagination.total,
                    'has_prev': pagination.has_prev,
                    'has_next': pagination.has_next,
                }
            })
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)}), 500
    
    @app.route('/api/blog/<slug>', methods=['GET'])
    def get_blog_post(slug):
        """Get a single blog post by slug"""
        try:
            post = BlogPost.query.filter_by(slug=slug, published=True).first_or_404()
            return jsonify({'success': True, 'data': post.to_dict()})
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)}), 404
    
    # ============== CONTACT ==============
    @app.route('/api/contact', methods=['POST'])
    def submit_contact():
        """Submit a contact form message"""
        try:
            data = request.get_json()
            
            if not data:
                return jsonify({'success': False, 'error': 'No data provided'}), 400
            
            required_fields = ['name', 'email', 'message']
            for field in required_fields:
                if not data.get(field):
                    return jsonify({'success': False, 'error': f'{field} is required'}), 400
            
            message = ContactMessage(
                name=data['name'],
                email=data['email'],
                subject=data.get('subject', 'No Subject'),
                message=data['message']
            )
            db.session.add(message)
            db.session.commit()
            
            return jsonify({
                'success': True,
                'message': 'Message sent successfully!',
                'data': message.to_dict()
            }), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({'success': False, 'error': str(e)}), 500
    
    # ============== PROFILE / ABOUT ==============
    @app.route('/api/profile', methods=['GET'])
    def get_profile():
        """Get complete profile data"""
        try:
            experiences = Experience.query.order_by(Experience.order.asc()).all()
            education = Education.query.order_by(Education.order.asc()).all()
            skills = Skill.query.order_by(Skill.category, Skill.order).all()
            
            # Group skills by category
            skills_grouped = {}
            for skill in skills:
                if skill.category not in skills_grouped:
                    skills_grouped[skill.category] = []
                skills_grouped[skill.category].append(skill.to_dict())
            
            return jsonify({
                'success': True,
                'data': {
                    'name': 'Dishant Gupta',
                    'title': 'Computational Physics & AI Researcher',
                    'tagline': 'Physics-Informed ML & Computational Physics',
                    'email': '22bph016@nith.ac.in',
                    'phone': '+91-7087328423',
                    'location': 'Hoshiarpur, Punjab, India',
                    'bio': 'Co-founder at Unisole Empower – building AI solutions for agriculture and education alongside research in Artificial Intelligence, Machine Learning, and Computational Modeling for solving complex scientific challenges.',
                    'social': {
                        'github': 'https://github.com/dishantgupta2004',
                        'linkedin': 'https://www.linkedin.com/in/dishant-gupta-44067926a/',
                        'email': 'mailto:22bph016@nith.ac.in',
                    },
                    'experiences': [exp.to_dict() for exp in experiences],
                    'education': [edu.to_dict() for edu in education],
                    'skills': skills_grouped,
                }
            })
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)}), 500


# Create the Flask app
app = create_app()


# Vercel serverless handler
def handler(request):
    """Vercel serverless function handler"""
    with app.app_context():
        return app


# For local development
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5000)
