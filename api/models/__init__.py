"""
Database Models for Portfolio API
Using SQLAlchemy with PostgreSQL
"""
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import JSON

db = SQLAlchemy()


class Experience(db.Model):
    """Work experience and internships"""
    __tablename__ = 'experiences'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    company = db.Column(db.String(255), nullable=False)
    company_url = db.Column(db.String(500))
    location = db.Column(db.String(255))
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date)  # NULL means "Present"
    is_current = db.Column(db.Boolean, default=False)
    description = db.Column(db.Text)
    highlights = db.Column(JSON)  # Array of bullet points
    technologies = db.Column(JSON)  # Array of tech tags
    category = db.Column(db.String(100))  # "internship", "work", "research"
    order = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'company': self.company,
            'company_url': self.company_url,
            'location': self.location,
            'start_date': self.start_date.isoformat() if self.start_date else None,
            'end_date': self.end_date.isoformat() if self.end_date else None,
            'is_current': self.is_current,
            'description': self.description,
            'highlights': self.highlights or [],
            'technologies': self.technologies or [],
            'category': self.category,
            'order': self.order,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
        }


class Project(db.Model):
    """Portfolio projects"""
    __tablename__ = 'projects'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    slug = db.Column(db.String(255), unique=True, nullable=False)
    description = db.Column(db.Text, nullable=False)
    short_description = db.Column(db.String(500))
    image = db.Column(db.String(500))
    github_url = db.Column(db.String(500))
    live_url = db.Column(db.String(500))
    technologies = db.Column(JSON)
    highlights = db.Column(JSON)
    category = db.Column(db.String(100))
    is_featured = db.Column(db.Boolean, default=False)
    order = db.Column(db.Integer, default=0)
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'slug': self.slug,
            'description': self.description,
            'short_description': self.short_description,
            'image': self.image,
            'github_url': self.github_url,
            'live_url': self.live_url,
            'technologies': self.technologies or [],
            'highlights': self.highlights or [],
            'category': self.category,
            'is_featured': self.is_featured,
            'order': self.order,
            'start_date': self.start_date.isoformat() if self.start_date else None,
            'end_date': self.end_date.isoformat() if self.end_date else None,
        }


class Publication(db.Model):
    """Research publications"""
    __tablename__ = 'publications'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(500), nullable=False)
    authors = db.Column(db.String(500), nullable=False)
    abstract = db.Column(db.Text)
    publication_type = db.Column(db.String(100))  # "paper", "poster", "thesis"
    journal = db.Column(db.String(255))
    year = db.Column(db.Integer)
    doi = db.Column(db.String(255))
    pdf_url = db.Column(db.String(500))
    status = db.Column(db.String(100))  # "published", "in_review", "in_development"
    highlights = db.Column(JSON)
    order = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'authors': self.authors,
            'abstract': self.abstract,
            'publication_type': self.publication_type,
            'journal': self.journal,
            'year': self.year,
            'doi': self.doi,
            'pdf_url': self.pdf_url,
            'status': self.status,
            'highlights': self.highlights or [],
            'order': self.order,
        }


class BlogPost(db.Model):
    """Blog posts"""
    __tablename__ = 'blog_posts'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    subtitle = db.Column(db.String(255))
    slug = db.Column(db.String(255), unique=True, nullable=False)
    content = db.Column(db.Text, nullable=False)
    excerpt = db.Column(db.Text)
    category = db.Column(db.String(100))
    category_name = db.Column(db.String(100))
    thumbnail = db.Column(db.String(500))
    featured_image = db.Column(db.String(500))
    tags = db.Column(JSON)
    published = db.Column(db.Boolean, default=True)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'subtitle': self.subtitle,
            'slug': self.slug,
            'content': self.content,
            'excerpt': self.excerpt,
            'category': self.category,
            'category_name': self.category_name,
            'thumbnail': self.thumbnail,
            'featured_image': self.featured_image,
            'tags': self.tags or [],
            'published': self.published,
            'date': self.date.isoformat() if self.date else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
        }


class Course(db.Model):
    """Courses offered"""
    __tablename__ = 'courses'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    short_description = db.Column(db.String(500))
    image = db.Column(db.String(500))
    url = db.Column(db.String(500))
    price = db.Column(db.String(100))
    duration = db.Column(db.String(100))
    level = db.Column(db.String(50))
    features = db.Column(JSON)
    is_featured = db.Column(db.Boolean, default=False)
    order = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'short_description': self.short_description,
            'image': self.image,
            'url': self.url,
            'price': self.price,
            'duration': self.duration,
            'level': self.level,
            'features': self.features or [],
            'is_featured': self.is_featured,
            'order': self.order,
        }


class ContactMessage(db.Model):
    """Contact form submissions"""
    __tablename__ = 'contact_messages'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    subject = db.Column(db.String(255))
    message = db.Column(db.Text, nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    read = db.Column(db.Boolean, default=False)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'subject': self.subject,
            'message': self.message,
            'date': self.date.isoformat() if self.date else None,
            'read': self.read,
        }


class Skill(db.Model):
    """Skills and expertise"""
    __tablename__ = 'skills'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(100), nullable=False)  # "programming", "frameworks", "tools"
    proficiency = db.Column(db.Integer, default=80)  # 0-100
    order = db.Column(db.Integer, default=0)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'category': self.category,
            'proficiency': self.proficiency,
            'order': self.order,
        }


class Education(db.Model):
    """Educational background"""
    __tablename__ = 'education'
    
    id = db.Column(db.Integer, primary_key=True)
    degree = db.Column(db.String(255), nullable=False)
    institution = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(255))
    start_year = db.Column(db.Integer)
    end_year = db.Column(db.Integer)
    gpa = db.Column(db.String(50))
    description = db.Column(db.Text)
    order = db.Column(db.Integer, default=0)
    
    def to_dict(self):
        return {
            'id': self.id,
            'degree': self.degree,
            'institution': self.institution,
            'location': self.location,
            'start_year': self.start_year,
            'end_year': self.end_year,
            'gpa': self.gpa,
            'description': self.description,
            'order': self.order,
        }
