"""
Flask API Configuration
Supports PostgreSQL for Vercel/Supabase deployment
"""
import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    """Base configuration"""
    SECRET_KEY = os.getenv('SECRET_KEY', os.urandom(24).hex())
    
    # PostgreSQL Database Configuration
    # Supports Vercel Postgres, Supabase, or any PostgreSQL instance
    DATABASE_URL = os.getenv('DATABASE_URL')
    
    # Handle Vercel Postgres URL format (postgres:// -> postgresql://)
    #if DATABASE_URL.startswith('postgres://'):
    #    DATABASE_URL = DATABASE_URL.replace('postgres://', 'postgresql://', 1)
    
    SQLALCHEMY_DATABASE_URI = DATABASE_URL 
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ENGINE_OPTIONS = {
        'pool_recycle': 280,
        'pool_pre_ping': True,
        'pool_size': 5,
        'max_overflow': 10,
    }
    
    # CORS Settings
    CORS_ORIGINS = os.getenv('CORS_ORIGINS', '*').split(',')
    
    # Mail Configuration
    MAIL_SERVER = os.getenv('MAIL_SERVER', 'smtp.gmail.com')
    MAIL_PORT = int(os.getenv('MAIL_PORT', 587))
    MAIL_USE_TLS = os.getenv('MAIL_USE_TLS', 'True') == 'True'
    MAIL_USERNAME = os.getenv('MAIL_USERNAME')
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD')
    
    # Admin Credentials
    ADMIN_USERNAME = os.getenv('ADMIN_USERNAME', 'admin')
    ADMIN_PASSWORD = os.getenv('ADMIN_PASSWORD', 'password')


class DevelopmentConfig(Config):
    """Development configuration"""
    DEBUG = True


class ProductionConfig(Config):
    """Production configuration"""
    DEBUG = False


config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
