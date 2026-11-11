# EZY Zenith LLC - Official Website & Management Portal

Modern, responsive web platform for **EZY Zenith LLC** (Property Preservation, Maintenance & Listing Support Services). Built with **Next.js 14**, **React**, **Tailwind CSS**, and **cPanel MySQL Database integration**.

---

## 🌟 Key Highlights & Architecture

- **Branding & Visual Design**:
  - Official EZY Zenith branding: Executive Slate Navy (`#182333`), Warm Zenith Amber/Gold (`#fda12b`), crisp white, and subtle real-estate accents.
  - Authentic downloaded logos and service photos from `ezyzenith.com`.
  - Fully responsive on mobile, tablet, and widescreen desktop.

- **Content & Conversion Strategy**:
  - **Dynamic Hero Slider**: Auto-advancing with custom badges, headlines, subheadlines, and call-to-action buttons.
  - **Key Trust Stats**: 10+ Years Experience, 5,400+ Projects Completed, Multi-Market Coverage, <24h Fast Response.
  - **Value Proposition**: Single Point of Coordination, Fast Response for Inspection Repairs, 100% Photo Proof of Work, Licensed Trade Subcontractors.
  - **Comprehensive Services Directory**: Property Preservation, Listing Prep & Inspection Repairs, Tenant Turnover & Make-Ready, Trash-Out, Roofing, Landscaping, Power Washing, Carpentry, Flooring, Gutters, Electrical Coordination, Appliance Maintenance.
  - **Interactive Before & After Slider**: Draggable photo comparison showcasing real preservation and turnover work.
  - **5-Step Operational Workflow**: Request ➔ Scope & Review ➔ Upfront Estimate ➔ Dispatch ➔ Photo Reporting.
  - **Google Reviews & Rating Badge**: Live 5.0 Star Google Rating badge with verified client testimonials.
  - **Targeted Realtor Support Page**: Dedicated specifically to listing agents, home inspection amendment punch-lists, and closing repair deadlines.
  - **Property Management Page**: Make-ready turns, vacancy reduction, and security deposit photo sign-offs.
  - **Coverage Areas Directory**: State-by-state search and coverage verification tool.
  - **Become a Vendor Portal**: Subcontractor onboarding form with trade selection, W-9 and insurance confirmations.
  - **Request Service Engine**: Lead capture form with address, trade selection, urgency, lockbox access notes, and photo/PDF upload.
  - **Compliance & Insurance Notice**: General Liability, Workers' Comp, and clear disclosure regarding licensed trade subcontractors.

- **Admin Management Dashboard (`/dashboard`)**:
  - 🔄 **Hero Slider Photos & Text**: Change slide images (upload from computer or enter URL), headlines, subheadlines, badges, and toggle visibility.
  - 🛠️ **Services & Service Photos**: Change photos for any trade, edit descriptions, features checklist, turnaround time, category, or add new services.
  - ⭐ **Google Reviews**: Add new Google reviews with author name, role/location, 1-5 star rating, avatar photo, review date, and verified badge. Edit or delete existing reviews.
  - 📥 **Work Orders & Leads CRM**: View incoming service requests and vendor applications with full address, urgency, customer info, and status management (New, In Progress, Completed).
  - ⚙️ **Company Profile Settings**: Update phone (`302-244-5523`), email (`contact@ezyzenith.com`), operating hours, and entity disclaimer.
  - 🗄️ **cPanel MySQL Database Tool**: Live connection testing, host details, and import helper.

---

## 🗄️ cPanel MySQL Database Setup

The app is built to connect seamlessly to MySQL on your cPanel server while automatically falling back to resilient local JSON storage when offline or during initial configuration.

### 1. Create the Database in cPanel
1. Log in to your cPanel hosting account.
2. Under **Databases**, open **MySQL Databases** (or **MySQL Database Wizard**).
3. Create a new database, e.g. `youruser_ezyzenith_db`.
4. Create a new user with a strong password, e.g. `youruser_zenithuser`.
5. Under **Add User To Database**, select both, click **Add**, and check **ALL PRIVILEGES**.

### 2. Import `database.sql` via phpMyAdmin
1. In cPanel, click **phpMyAdmin**.
2. Click your newly created database in the left panel.
3. Click the **Import** tab in the top navigation bar.
4. Click **Choose File** and select `database.sql` from this project's root folder.
5. Click **Go / Import** at the bottom.
6. All 6 tables (`company_settings`, `hero_slides`, `services`, `google_reviews`, `leads`, `before_after_gallery`) will be created and seeded with full initial content!

### 3. Connect via `.env.local` or cPanel Environment Variables
In your project directory or cPanel Node.js App settings, set:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=youruser_zenithuser
DB_PASSWORD=your_mysql_password
DB_NAME=youruser_ezyzenith_db
```

Test the connection anytime inside the **Admin Dashboard** (`/dashboard` ➔ **cPanel MySQL Guide** ➔ **Test Live Connection**)!

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser:
http://localhost:3000
# To access Dashboard:
http://localhost:3000 (Click "Admin Dashboard" in top bar or navigate to /dashboard)
```

---

## 📦 Production Build & cPanel Deployment

```bash
# Build Next.js production bundle
npm run build

# Start production server
npm run start
```

In cPanel:
1. Go to **Setup Node.js App**.
2. Click **Create Application**.
3. Set **Node.js version** to 18, 20, or 22.
4. Set **Application root** to the directory where files are placed.
5. Set **Application startup file** to `node_modules/next/dist/bin/next` with argument `start -p 3000` (or `server.js`).
6. Add the MySQL environment variables.
7. Click **Run NPM Install** and then **Restart Application**.

