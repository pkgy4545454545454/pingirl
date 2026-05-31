# Titelli - Product Requirements Document

## Original Problem Statement
Titelli is a Swiss marketplace platform connecting service providers (enterprises) with clients. The platform features enterprise listings, product catalogs, job postings, training courses, and a cashback system. The user's production backend runs at `api.titelli.ch`.

## User Persona
- Swiss French-speaking business owners and clients
- Language: French

## Core Requirements
- Dynamic category/subcategory fetching from MongoDB
- Simplified enterprise cards (no logos, +, green dots, city names)
- Montserrat font globally
- Dual enterprise registration: "Activer" (existing) vs "Inscrire" (new, en_attente)
- Background videos for product categories (blocked on Sora 2 credits)

## Architecture
- Frontend: React + Tailwind CSS + Craco
- Backend: FastAPI + MongoDB (Motor)
- Database: MongoDB Atlas
- Deployment: User manually deploys via ZIP to their VPS

## What's Been Implemented
- [DONE] Fixed category/subcategory navigation (was showing "undefined")
- [DONE] Dynamic subcategories from MongoDB
- [DONE] ProductCategoryCard component with video backgrounds
- [DONE] Simplified EnterpriseCard UI
- [DONE] Global Montserrat font
- [DONE] Dual registration flow (Activer/Inscrire)
- [DONE] Backend router: /api/auth/register-new-enterprise
- [DONE] SplashScreen pulse animation fix
- [DONE] HomePage Avantages section layout fix (removed orphaned code causing crash)
- [DONE] Mobile search bar placeholder fix
- [DONE] "Inscrire mon entreprise" form - white background with blue fields

## Key API Endpoints
- POST /api/auth/register-new-enterprise - Register unlisted enterprise
- GET /api/enterprise-subcategories/{category} - Dynamic subcategories
- GET /api/categories/products - Mapped product categories

## DB Schema
- enterprises: {business_name, category, subcategory, activation_status, display_status, pending_owner_id}
- registration_requests: {user_id, enterprise_id, status, is_new_enterprise}
- users: {user_type, status}

## Prioritized Backlog
### P0
- Admin dashboard to approve "en_attente" registration requests

### P1
- Investigate corrupted images

### P2
- Regenerate video #107 without people
- Fix monetisation brochure design
- Redesign provider profiles (based on user sketches)

### P3
- Create CDC (Cahier des Charges)

## Blocked Items
- Sora 2 video generation (insufficient credits)
- Git sync for user deployment (user relies on ZIP downloads)
