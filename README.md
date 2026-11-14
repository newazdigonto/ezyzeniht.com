# EZY Zenith LLC - Official Web Platform & Operations Portal

[![Current Version](https://img.shields.io/badge/version-1.7.0-orange.svg?style=flat-square)](https://github.com/newazdigonto/ezyzeniht.com/releases/tag/v1.7.0)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black.svg?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC.svg?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0%20Compatible-4479A1.svg?style=flat-square&logo=mysql)](https://www.mysql.com/)
[![Production Build](https://img.shields.io/badge/build-passing-brightgreen.svg?style=flat-square)](https://github.com/newazdigonto/ezyzeniht.com)

Modern, executive web platform for **EZY Zenith LLC** (Property Preservation, Maintenance & Listing Support Services). Built with **Next.js 14 App Router**, **React**, **Tailwind CSS**, and **cPanel MySQL Database integration**.

---

## 📌 Release Stages & Version History

All stages and releases are tagged and published in this repository:

| Version | Release Stage | Key Features & Changes | Date |
|:-------:|:-------------:|:-----------------------|:----:|
| **[`v1.7.0`](https://github.com/newazdigonto/ezyzeniht.com/releases/tag/v1.7.0)** | **2-Color Logo & Compact Non-Overlapping Hero** *(Latest)* | • High-contrast 2-color brand logo (`logo-white-orange.png`): Radiant Zenith Orange (`#f5932d`) + crisp white lettering with **zero white background box** and safe margin to eliminate edge clipping.<br>• Compact above-the-fold Hero Slider (`max-h-[720px]`) fitting 100% into a single viewport with **no scrolling required**.<br>• Relocated interactive slide and service selector chips to the left column, completely eliminating collisions with the right-side lead intake form.<br>• Enhanced background property photo brightness (98%) with smooth directional scrim.<br>• Symmetrical padding across all `PageHero` subpages. | Nov 14, 2026 |
| **[`v1.6.0`](https://github.com/newazdigonto/ezyzeniht.com/releases/tag/v1.6.0)** | **Compact Hero & Transparent Menu Logo** | • Streamlined HeroSlider height constraints and tightened lead intake form inputs.<br>• Removed white background box from navbar logo. | Nov 14, 2026 |
| **[`v1.5.0`](https://github.com/newazdigonto/ezyzeniht.com/releases/tag/v1.5.0)** | **Dedicated `/admin` Backend & Light Dashboard** | • Dedicated standalone backend route at `/admin` with persistent Left Sidebar navigation and clean executive Light Theme.<br>• Removed all admin dashboard buttons and portal links from public frontend pages.<br>• Full CRUD management for hero slides, services, Google reviews, and leads CRM. | Nov 11, 2026 |
| **[`v1.4.0`](https://github.com/newazdigonto/ezyzeniht.com/releases/tag/v1.4.0)** | **PageHero Architecture & Subpage Showcase** | • Built reusable interactive `PageHero` component with live verified photo previews and thumbnail selectors across all 8 inner subpages.<br>• Added breadcrumb navigation and instant hotline dialer. | Nov 11, 2026 |
| **[`v1.3.0`](https://github.com/newazdigonto/ezyzeniht.com/releases/tag/v1.3.0)** | **Hero Overhaul & Fast Lead Intake Desk** | • Scroll-fixed transparent navigation bar with frosted glass transition.<br>• Above-the-fold fast property work order intake card with urgency selection. | Nov 11, 2026 |
| **[`v1.2.0`](https://github.com/newazdigonto/ezyzeniht.com/releases/tag/v1.2.0)** | **Official Brand Colors & Animated Accents** | • Established official brand palette: Deep Slate Navy (`#0f2446`) and Radiant Zenith Orange (`#f5932d`).<br>• Custom CSS animated glowing borders (`.animated-gradient-border-dark` & `.animate-border-pulse`). | Nov 11, 2026 |
| **[`v1.1.0`](https://github.com/newazdigonto/ezyzeniht.com/releases/tag/v1.1.0)** | **Multi-Role Authentication & Leads CRM** | • Multi-role authentication gates (Admin, Vendor, Client).<br>• Real-time lead capture and work order management CRM with status tracking. | Nov 11, 2026 |
| **[`v1.0.0`](https://github.com/newazdigonto/ezyzeniht.com/releases/tag/v1.0.0)** | **Core Foundation & Architecture** | • Initial Next.js 14 App Router project setup.<br>• Resilient dual-mode database engine (MySQL connection pool + auto JSON fallback).<br>• 12 public views, responsive design, and cPanel setup documentation. | Nov 11, 2026 |

---

## 🌟 Key Highlights & Architecture

- **Branding & Visual Identity**:
  - Official EZY Zenith 2-color identity: Deep Slate Navy (`#0f2446`) & Vibrant Zenith Orange (`#f5932d`).
  - Transparent 2-color brand logo with zero background box clutter, rendered razor-sharp on both dark and light headers.
  - Fully responsive across mobile, tablet, laptop, and ultrawide screens.

- **Content & Conversion Strategy**:
  - **Dynamic Hero Slider**: Compact above-the-fold layout fitting 100% without scrolling.
  - **Fast Dispatch Intake Desk**: Lead capture form embedded directly in the hero with service and urgency selection.
  - **Key Trust Stats**: 10+ Years Experience, 5,400+ Projects Completed, Multi-Market Coverage, Rapid 24h Response.
  - **Comprehensive Services Directory**: Property Preservation, Listing Prep & Inspection Repairs, Tenant Turnover & Make-Ready, Trash-Out, Roofing, Landscaping, Power Washing, Carpentry, Flooring, Gutters, Electrical Coordination.
  - **Interactive Before & After Slider**: Draggable photo comparison showcasing real preservation and turnover work.
  - **Google Reviews & Rating Badge**: Live 5.0 Star Google Rating badge with verified client testimonials.
  - **Targeted Subpages**: Dedicated pages for Realtors, Property Managers, Coverage Areas, Vendor Onboarding, and Contact.

- **Dedicated Admin Backend Portal (`/admin`)**:
  - 📂 **Left Sidebar Navigation**: Structured, persistent navigation with badge counts and live indicators.
  - 🔄 **Hero Slider Photos & Text**: Change slide images, titles, subtitles, badges, and ordering.
  - 🛠️ **Services & Scopes**: Edit descriptions, turnaround times, checklists, categories, or add new services.
  - ⭐ **Google Reviews**: Add, edit, or delete customer reviews with star ratings and reviewer avatars.
  - 📥 **Work Orders & Leads CRM**: Track incoming service requests and subcontractor applications.
  - ⚙️ **Company Profile**: Update emergency dispatch phone (`302-244-5523`), email, and entity disclosures.
  - 🗄️ **cPanel MySQL Management**: Live connection health check, status indicator, and schema migration helper.

---

## 🗄️ cPanel MySQL Database Setup

The platform connects directly to MySQL on your cPanel server while automatically falling back to resilient local JSON storage when offline or during initial configuration.

### 1. Create the Database in cPanel
1. Log in to your cPanel hosting account.
2. Under **Databases**, open **MySQL Databases**.
3. Create a new database, e.g. `youruser_ezyzenith_db`.
4. Create a new user with a strong password, e.g. `youruser_zenithuser`.
5. Under **Add User To Database**, select both, click **Add**, and check **ALL PRIVILEGES**.

### 2. Import `database.sql` via phpMyAdmin
1. In cPanel, open **phpMyAdmin**.
2. Select your newly created database in the left panel.
3. Click the **Import** tab in the top navigation bar.
4. Click **Choose File** and select `database.sql` from this repository's root folder.
5. Click **Go / Import** at the bottom to create and seed all 6 tables (`company_settings`, `hero_slides`, `services`, `google_reviews`, `leads`, `before_after_gallery`).

### 3. Connect via `.env.local`
In your project root or cPanel Node.js App settings, set:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=youruser_zenithuser
DB_PASSWORD=your_mysql_password
DB_NAME=youruser_ezyzenith_db
```

Test the connection anytime inside the **Admin Portal** (`/admin` ➔ **cPanel MySQL Status** ➔ **Test Live Connection**)!

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser:
# Public Website:
http://localhost:3000

# Dedicated Admin Portal:
http://localhost:3000/admin
```

---

## 📦 Production Build & Deployment

```bash
# Build Next.js production bundle
npm run build

# Start production server
npm run start
```
