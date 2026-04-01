# Dishant Gupta's Portfolio - Modern Stack

A modern, decoupled portfolio website built with **Next.js 14** (App Router) and **Flask** (REST API), deployable on **Vercel** with **PostgreSQL** database.

## 🏗️ Architecture

```
portfolio-modern/
├── api/                      # Flask REST API (Python 3.11)
│   ├── models/               # SQLAlchemy models
│   │   └── __init__.py       # Database models
│   ├── config.py             # Configuration settings
│   ├── index.py              # Main Flask app (Vercel entry point)
│   ├── seed.py               # Database seeding script
│   └── requirements.txt      # Python dependencies
│
├── frontend/                 # Next.js 14 App (TypeScript)
│   ├── app/                  # App Router pages
│   │   ├── about/
│   │   ├── projects/
│   │   ├── publications/
│   │   ├── courses/
│   │   ├── blog/
│   │   ├── contact/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/           # React components
│   │   ├── layout/           # Header, Footer
│   │   ├── sections/         # Page sections
│   │   └── ui/               # Reusable UI components
│   ├── lib/                  # Utilities
│   │   ├── api.ts            # API client
│   │   └── utils.ts          # Helper functions
│   ├── public/               # Static assets
│   └── package.json
│
├── vercel.json               # Vercel deployment config
├── package.json              # Monorepo scripts
├── .env.example              # Environment variables template
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Python 3.11+
- PostgreSQL database (local or cloud)

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/dishantgupta2004/myportfolio.git
cd myportfolio

# Install all dependencies
npm run install:all
```

### 2. Set Up Environment Variables

```bash
# Copy example env file
cp .env.example .env

# Edit with your values
nano .env
```

Required variables:
```env
DATABASE_URL=postgresql://user:password@host:5432/portfolio_db
SECRET_KEY=your-secret-key
```

### 3. Initialize Database

```bash
# Seed the database with your data
npm run seed
```

### 4. Run Development Server

```bash
# Run both frontend and API concurrently
npm run dev
```

- Frontend: http://localhost:3000
- API: http://localhost:5000/api

## 📦 Deployment on Vercel

### 1. Set Up PostgreSQL

**Option A: Vercel Postgres**
1. Go to your Vercel dashboard
2. Navigate to Storage → Create Database → Postgres
3. Copy the connection string

**Option B: Supabase**
1. Create a project at [supabase.com](https://supabase.com)
2. Go to Settings → Database → Connection string
3. Use the "URI" format

### 2. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### 3. Configure Environment Variables

In Vercel Dashboard → Settings → Environment Variables:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Your PostgreSQL connection string |
| `SECRET_KEY` | Random secure string |
| `ADMIN_USERNAME` | Admin login username |
| `ADMIN_PASSWORD` | Admin login password |

### 4. Seed Production Database

```bash
# Connect to production and seed
vercel env pull .env.production
python api/seed.py
```

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api` | Health check |
| GET | `/api/experiences` | List all experiences |
| GET | `/api/experiences?category=internship` | Filter by category |
| GET | `/api/projects` | List all projects |
| GET | `/api/projects?featured=true` | Featured projects |
| GET | `/api/projects/:slug` | Single project |
| GET | `/api/publications` | List publications |
| GET | `/api/courses` | List courses |
| GET | `/api/skills` | Skills grouped by category |
| GET | `/api/education` | Education history |
| GET | `/api/blog` | Blog posts (paginated) |
| GET | `/api/blog/:slug` | Single blog post |
| GET | `/api/profile` | Complete profile data |
| POST | `/api/contact` | Submit contact form |

## 📝 Updated Experience Data

The following experiences are included in the seed data:

### Field & Technology Intern @ Baker Hughes
**Jan 2026 - Mar 2026 | Navi Mumbai, Maharashtra**
- Conducted regular HSE observations, identifying potential site hazards
- Collaborated with senior field engineers on equipment monitoring

### Summer Research Intern @ ISRO (SAC)
**Jun 2025 - Aug 2025 | Ahmedabad, Gujarat**
- Designed metalenses for SWIR imaging applications (up to 2mm diameter)
- Applied RCWA using Synopsys DiffractMOD
- Integrated OptiLand for MTF and PSF analysis

### Co-Founder & CTO @ Unisole Empower
**Dec 2023 - Present | Hamirpur, India**
- Led AI-automated hail prediction system development
- Conducted 15+ AI/ML workshops for 1,000+ students

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

### Backend
- **Framework**: Flask 3.0
- **ORM**: SQLAlchemy 2.0
- **Database**: PostgreSQL
- **Language**: Python 3.11

### Deployment
- **Platform**: Vercel
- **Functions**: Python Serverless Functions
- **Database**: Vercel Postgres / Supabase

## 📁 Key Files

| File | Purpose |
|------|---------|
| `vercel.json` | Routes API to Flask, frontend to Next.js |
| `api/index.py` | Flask app entry point for Vercel |
| `api/models/__init__.py` | SQLAlchemy database models |
| `api/seed.py` | Seeds database with portfolio data |
| `frontend/lib/api.ts` | Type-safe API client |
| `frontend/app/layout.tsx` | Root layout with fonts |

## 🔄 Adding New Data

### Add a New Experience

Edit `api/seed.py` and add to the `experiences` list:

```python
{
    'title': 'Your Title',
    'company': 'Company Name',
    'location': 'City, State',
    'start_date': date(2024, 1, 1),
    'end_date': None,  # None for current
    'is_current': True,
    'highlights': [
        'Achievement 1',
        'Achievement 2',
    ],
    'technologies': ['Python', 'TensorFlow'],
    'category': 'work',  # work, internship, research, leadership
    'order': 1,
}
```

Then run:
```bash
npm run seed
```

## 🎨 Customization

### Colors
Edit `frontend/tailwind.config.ts` to change the color palette.

### Fonts
Modify `frontend/app/layout.tsx` to use different Google Fonts.

### Content
Update the seed data in `api/seed.py` or use the admin dashboard.

## 📄 License

MIT License - feel free to use this as a template for your own portfolio!

---

Built with ❤️ by Dishant Gupta
