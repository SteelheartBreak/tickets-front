# TechCorp Tickets — Full Stack Challenge
A minimal, elegant ticket management system built with Next.js, TypeScript, Auth0, Supabase (PostgreSQL), and Metabase for BI visualization.

This project was developed as part of the TechCorp Full Stack Developer Challenge to demonstrate architecture, implementation, and problem-solving skills.

## Overview
TechCorp Tickets allows authenticated users to view, create, and filter support tickets, update their status, and feed structured data into a BI dashboard built with Metabase.

### Tech Stack
•	Frontend: Next.js 14 (App Router) + TypeScript
•	Styling: TailwindCSS + shadcn/ui
•	Authentication: Auth0
•	Database: Supabase (PostgreSQL)
•	ORM: Prisma
•	Hosting: Vercel
•	BI Dashboard: Metabase

### Features
✅ Auth0-secured routes
✅ Ticket list with filters and create modal
✅ Update status from dropdown
✅ Elegant, minimalist UI using Tailwind + shadcn/ui
✅ Responsive design

### Database Schema (Supabase / PostgreSQL)
```
CREATE TABLE tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL,
  status TEXT NOT NULL,
  priority TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  resolved_at TIMESTAMPTZ
);

ALTER TABLE tickets 
ADD COLUMN IF NOT EXISTS external_id TEXT UNIQUE;

CREATE INDEX IF NOT EXISTS idx_tickets_external_id ON tickets(external_id);
```

### Data Pipeline
The ingestion pipeline reads a public CSV/JSON source, normalizes data, prevents duplicates via external_id, and can be executed manually or via a Vercel Cron job.

### BI Dashboard (Metabase)
Metabase connects directly to the same Supabase database. The dashboard includes KPIs such as total tickets, tickets created per day, tickets by type, and average resolution time.
Dashboard setup and export JSON are detailed in /metabase/README_METABASE.md.

## Setup Instructions
1. Clone the repository
•	git clone https://github.com/SteelheartBreak/tickets-front.git
•	cd tickets-front
2. Install dependencies
•	npm install
3. Configure environment variables (.env.local)
4. Run locally
•	npm run dev
## Deployment
The app is deployed on Vercel with Auth0 authentication and environment variables configured. Live demo: https://techcorp-tickets.vercel.app
Technical Decisions
Auth0 for secure login, Supabase for persistence, Prisma ORM for type-safe DB access, Tailwind + shadcn/ui for elegant UI, and Metabase for analytics.


Author
Moises — Full Stack Developer (Next.js / TypeScript / BI)
Email: moisesquin7@gmail.com
GitHub: https://github.com/SteelheartBreak
