-- =======================================================================
-- EZY ZENITH LLC - Complete MySQL Database Schema & Seed Data
-- Designed for cPanel MySQL / phpMyAdmin & Next.js Backend
-- Compatible with MySQL 5.7+, MySQL 8.0+, MariaDB 10.3+
-- =======================================================================

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `company_settings`;
DROP TABLE IF EXISTS `hero_slides`;
DROP TABLE IF EXISTS `services`;
DROP TABLE IF EXISTS `google_reviews`;
DROP TABLE IF EXISTS `leads`;
DROP TABLE IF EXISTS `before_after_gallery`;
SET FOREIGN_KEY_CHECKS = 1;

-- -----------------------------------------------------------------------
-- 1. Table: company_settings
-- -----------------------------------------------------------------------
CREATE TABLE `company_settings` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `company_name` VARCHAR(150) NOT NULL DEFAULT 'EZY Zenith LLC',
  `tagline` VARCHAR(255) NOT NULL DEFAULT 'Property Preservation, Maintenance & Listing Support Services',
  `phone` VARCHAR(50) NOT NULL DEFAULT '302-244-5523',
  `email` VARCHAR(100) NOT NULL DEFAULT 'contact@ezyzenith.com',
  `support_email` VARCHAR(100) NOT NULL DEFAULT 'info@ezyzenith.com',
  `website` VARCHAR(100) NOT NULL DEFAULT 'www.ezyzenith.com',
  `hours` VARCHAR(100) NOT NULL DEFAULT '24/7 Coordination & Dispatch Support',
  `address` VARCHAR(255) NOT NULL DEFAULT 'Nationwide Field Coordination | U.S. Registered Entity',
  `logo` VARCHAR(255) NOT NULL DEFAULT '/images/logo.png',
  `experience_years` VARCHAR(20) NOT NULL DEFAULT '10+',
  `disclaimer` TEXT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `company_settings` (`id`, `company_name`, `tagline`, `phone`, `email`, `support_email`, `website`, `hours`, `address`, `logo`, `experience_years`, `disclaimer`) 
VALUES (1, 
  'EZY Zenith LLC', 
  'Property Preservation, Maintenance & Listing Support Services', 
  '302-244-5523', 
  'contact@ezyzenith.com', 
  'info@ezyzenith.com', 
  'www.ezyzenith.com', 
  '24/7 Coordination & Dispatch Support', 
  'Nationwide Field Coordination | U.S. Registered Entity', 
  '/images/logo.png', 
  '10+', 
  'EZY Zenith LLC coordinates field services through qualified independent vendors and subcontractors. Any licensed trade work (electrical, plumbing, HVAC, roofing) is strictly performed by properly licensed and insured subcontractors where required by state and local law.'
);

-- -----------------------------------------------------------------------
-- 2. Table: hero_slides
-- -----------------------------------------------------------------------
CREATE TABLE `hero_slides` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `slide_key` VARCHAR(50) NOT NULL UNIQUE,
  `badge` VARCHAR(100) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `subtitle` TEXT NOT NULL,
  `image_url` VARCHAR(500) NOT NULL,
  `primary_cta` VARCHAR(50) NOT NULL DEFAULT 'Request Service',
  `primary_link` VARCHAR(100) NOT NULL DEFAULT 'request-service',
  `secondary_cta` VARCHAR(50) NOT NULL DEFAULT 'Partner With Us',
  `secondary_link` VARCHAR(100) NOT NULL DEFAULT 'become-vendor',
  `sort_order` INT NOT NULL DEFAULT 1,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `hero_slides` (`slide_key`, `badge`, `title`, `subtitle`, `image_url`, `primary_cta`, `primary_link`, `secondary_cta`, `secondary_link`, `sort_order`, `is_active`) VALUES
('slide-1', 'Trusted Nationwide Field Services', 'Property Preservation, Maintenance & Listing Support', 'EZY Zenith LLC helps Realtors, property managers, investors, and asset managers coordinate fast, reliable property maintenance, inspection repairs, turnover services, and preservation work across multiple U.S. markets.', '/images/Securing-Service-740x556.jpg', 'Request Service', 'request-service', 'Partner With Us', 'become-vendor', 1, 1),
('slide-2', 'For Realtors & Listing Agents', 'Listing Preparation & Inspection Repair Coordination', 'Eliminate the headache of managing contractors before closing. We provide punch-list repairs, curb appeal cleanup, fast estimates, and certified trade coordination.', '/images/Painting-and-siding-repairs-740x556.jpg', 'Send Inspection Repair List', 'realtor-support', 'Schedule Intro Call', 'contact', 2, 1),
('slide-3', 'Fast Tenant Turnover', 'Property Management Maintenance & Make-Ready Turns', 'Speed up unit turns with single-point dispatch. Complete interior refreshes, painting, flooring, locks, and detailed photo documentation upon completion.', '/images/Flooring-repairs-and-installations-740x556.jpg', 'Request Turnover Support', 'property-management', 'Explore Services', 'services', 3, 1),
('slide-4', 'Preservation & Asset Protection', 'Securing, Trash-Out, Lawn Care & Winterization', 'Protect vacant, foreclosed, and distressed assets. Full board-up, rekey, debris removal, lawn maintenance, and compliance photo reporting.', '/images/Trush-Out-740x556.jpg', 'Submit Work Order', 'request-service', 'Check Coverage', 'coverage', 4, 1);

-- -----------------------------------------------------------------------
-- 3. Table: services
-- -----------------------------------------------------------------------
CREATE TABLE `services` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `service_key` VARCHAR(50) NOT NULL UNIQUE,
  `title` VARCHAR(150) NOT NULL,
  `category` VARCHAR(50) NOT NULL,
  `badge` VARCHAR(50) NULL,
  `image_url` VARCHAR(500) NOT NULL,
  `short_description` VARCHAR(255) NOT NULL,
  `full_description` TEXT NOT NULL,
  `features_json` JSON NOT NULL,
  `turnaround` VARCHAR(50) NOT NULL DEFAULT '24-48 Hours',
  `sort_order` INT NOT NULL DEFAULT 1,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `services` (`service_key`, `title`, `category`, `badge`, `image_url`, `short_description`, `full_description`, `features_json`, `turnaround`, `sort_order`, `is_active`) VALUES
('serv-1', 'Property Preservation', 'Preservation', 'Core Specialty', '/images/Securing-Service-740x556.jpg', 'Preserve, secure, and maintain vacant, foreclosed, or distressed properties with compliance photo reporting.', 'We help preserve, secure, and maintain vacant or distressed properties. Services include initial inspections, lock changes, lockbox support, boarding coordination, lawn maintenance, debris removal, winterization/de-winterization, and comprehensive condition reporting.', '["Initial & Ongoing Inspections", "Lock Changes & Lockbox Installation", "Emergency Boarding & Securing", "Winterization & De-Winterization", "Complete Before & After Photo Logs"]', '24-48 Hours', 1, 1),
('serv-2', 'Listing Prep & Inspection Repairs', 'Realtor Support', 'Highest Converting', '/images/Painting-and-siding-repairs-740x556.jpg', 'Full punch-list repairs, cosmetic fixes, and contractor coordination before listing or closing.', 'We help Realtors reduce the stress of managing contractors before listing, closing, inspection response, or repair deadlines. Support includes punch-list repairs, handyman coordination, curb appeal work, clean-outs, lock changes, exterior cleanup, and fast estimates.', '["Home Inspection Report Punch-Lists", "Curb Appeal & Exterior Cleanup", "Drywall, Patching & Fresh Paint", "Quick Repair Estimates for Closing Credits", "Dedicated Coordinator per Property"]', 'Fast Track Available', 2, 1),
('serv-3', 'Tenant Turnover & Make-Ready', 'Property Management', 'High Demand', '/images/Flooring-repairs-and-installations-740x556.jpg', 'Rapid unit turnaround, repair punch lists, deep cleaning, and make-ready services for rental portfolios.', 'We support property managers with turns, make-ready services, vendor follow-up, photo documentation, and work order processing. Minimize vacancy days with synchronized trade scheduling.', '["Move-out Inspection Walkthroughs", "Drywall, Paint & Trim Touch-ups", "Hardware, Fixture & Lock Replacements", "Deep Sanitization & Trash Removal", "Photo Sign-off for Security Deposits"]', '3-5 Business Days', 3, 1),
('serv-4', 'Trash-Out & Debris Removal', 'Preservation', 'Heavy Duty', '/images/Trush-Out-740x556.jpg', 'Interior and exterior cleanouts, bulk item hauling, shed removal, and broom-sweep sanitization.', 'Fast debris and trash removal for foreclosures, tenant evictions, hoarding conditions, and abandoned properties. Complete hauling, disposal compliance, and hazardous material flagging.', '["Full House Trash-Outs & Bulk Hauling", "Broom-Clean Finish & Sanitization", "Yard Waste, Branches & Tire Removal", "Hazardous Material Documentation", "Before/After Disposal Weight Slips & Photos"]', '24-72 Hours', 4, 1),
('serv-5', 'Roofing Inspections & Repairs', 'Maintenance', 'Subcontracted Trade', '/images/Roofing-740x556.jpg', 'Tarping, emergency leak patching, shingle replacement, flashing repair, and roof condition documentation.', 'Protect the asset envelope from water intrusion. We coordinate licensed roofing contractors for emergency tarping, missing shingle repairs, gutter apron fixes, and drone/ladder roof inspections.', '["Emergency Blue Tarp Securing", "Shingle & Flashing Repair Coordination", "Chimney & Vent Boot Sealing", "Leak Source Diagnostics & Photos", "Qualified Licensed Subcontractor Work"]', 'Same-Day Emergency Tarping', 5, 1),
('serv-6', 'Landscaping & Lawn Maintenance', 'Preservation', 'Curb Appeal', '/images/Landscaping-740x556.jpg', 'Regular grass cuts, weed trimming, hedge pruning, lot clearing, and HOA violation abatement.', 'Keep properties compliant with city codes, HOA regulations, and market presentation standards. Initial cut, bi-weekly recurring lawn maintenance, shrub pruning, and tree limb trimming away from roofs.', '["Initial Overgrowth Cut & Lot Clearing", "Bi-Weekly Recurring Mow & Edge", "Shrub, Bush & Vine Trimming", "HOA Code Violation Abatement", "Time-Stamped Photo Verification"]', 'Scheduled or Urgent', 6, 1),
('serv-7', 'Power Washing Services', 'Maintenance', 'Exterior Polish', '/images/Power-washing-driveways-sidewalks-and-building-exteriors-740x556.jpg', 'High-pressure cleaning for driveways, sidewalks, siding, decks, and stucco to restore curb appeal.', 'Remove dirt, algae, mold, and oil stains from exterior building surfaces, concrete driveways, walkways, fences, and patios. Essential for listing preparation and rental showings.', '["Concrete Driveways, Steps & Sidewalks", "Siding, Vinyl & Stucco Wash", "Decks, Patios & Porches", "Oil & Grease Stain Treatment", "Eco-Safe Surface Cleaners"]', '1-2 Business Days', 7, 1),
('serv-8', 'Interior Carpentry & Handyman', 'Maintenance', 'Multi-Skill', '/images/Interior-Carpentry--740x556.jpg', 'Repairing doors, windows, cabinets, baseboards, trim, shelving, and general structural cosmetic fixes.', 'Skilled carpentry coordination for doors that stick, damaged subfloors, broken kitchen cabinets, closet rods, molding, stair railings, and general handyman punch-list items.', '["Interior & Exterior Door Hanging & Locks", "Window Hardware & Screen Repairs", "Cabinet Hinge, Drawer & Shelf Repairs", "Baseboards, Quarter-Round & Trim", "Stair Treads & Handrail Securing"]', '2-3 Business Days', 8, 1),
('serv-9', 'Flooring Repairs & Installation', 'Maintenance', 'Value Booster', '/images/Flooring-repairs-and-installations-740x556.jpg', 'LVP, laminate, carpet replacement, subfloor patch repair, and transition strips.', 'Modernize tired floors or repair pet-damaged, water-damaged surfaces. We coordinate durable luxury vinyl plank (LVP), laminate, tile repairs, and carpet stretch/replacement.', '["Luxury Vinyl Plank (LVP) Installation", "Subfloor Rot & Squeak Repairs", "Transition Strips & Thresholds", "Carpet Removal & Haul-away", "Tile Regrouting & Patching"]', '3-4 Business Days', 9, 1),
('serv-10', 'Gutter Cleaning & Maintenance', 'Maintenance', 'Preventative', '/images/Gutter-cleaning-and-maintenance-740x556.jpg', 'Clearing debris, re-attaching loose gutters, downspout flushing, and gutter guard installation.', 'Prevent water foundation damage and roof overflow. Comprehensive gutter cleaning, debris bagging, downspout snaking, and seam re-caulking.', '["Full Gutter Debris Cleanout & Bagging", "Downspout Flushing & Extension Checks", "Spike & Ferrule Re-Securing", "Seam & End Cap Leak Caulking", "Before/After Aerial & Ladder Photos"]', '1-2 Days', 10, 1),
('serv-11', 'Electrical Service Coordination', 'Trades', 'Licensed Trades', '/images/Electrical-service-740x556.jpg', 'Coordinating licensed electricians for panel inspections, GFCI upgrades, light fixtures, and smoke detectors.', 'Ensure safety code compliance for home inspections and tenant move-ins. Coordinated with verified, licensed electrical subcontractors in your jurisdiction.', '["GFCI Outlet Installation in Wet Areas", "Smoke & Carbon Monoxide Detector Compliance", "Light Fixtures, Ceiling Fans & Switches", "Breaker Panel Troubleshooting Coordination", "Subcontracted to Licensed Electricians"]', 'Scheduled by Trade', 11, 1),
('serv-12', 'Appliance Maintenance & Installs', 'Maintenance', 'Turnover Essential', '/images/Appliance-maintenance-and-repairs-740x556.jpg', 'Diagnostic coordination, refrigerator, stove, dishwasher, microwave repairs, hookups, and haul-away.', 'Fast diagnostic and replacement coordination for essential household appliances. We handle delivery coordination, basic installations, testing, and old unit disposal.', '["Stove, Range, Oven & Microwave Diagnostics", "Refrigerator Defrost & Gasket Checks", "Dishwasher Leak Check & Water Line Connect", "Washer & Dryer Vent Cleaning / Hookup", "Old Appliance Hauling & Recycling"]', '24-48 Hours', 12, 1);

-- -----------------------------------------------------------------------
-- 4. Table: google_reviews
-- -----------------------------------------------------------------------
CREATE TABLE `google_reviews` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `review_key` VARCHAR(50) NOT NULL UNIQUE,
  `author_name` VARCHAR(100) NOT NULL,
  `author_role` VARCHAR(150) NOT NULL,
  `location` VARCHAR(100) NOT NULL,
  `rating` INT NOT NULL DEFAULT 5,
  `review_date` VARCHAR(50) NOT NULL,
  `avatar_url` VARCHAR(500) NOT NULL,
  `review_text` TEXT NOT NULL,
  `is_verified` TINYINT(1) NOT NULL DEFAULT 1,
  `source_platform` VARCHAR(50) NOT NULL DEFAULT 'Google Review',
  `sort_order` INT NOT NULL DEFAULT 1,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `google_reviews` (`review_key`, `author_name`, `author_role`, `location`, `rating`, `review_date`, `avatar_url`, `review_text`, `is_verified`, `source_platform`, `sort_order`, `is_active`) VALUES
('rev-1', 'Sarah Jenkins', 'Top Producer Realtor, Keller Williams', 'Dallas, TX', 5, '2 weeks ago', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', 'EZY Zenith is my secret weapon for listing deadlines! When my client received a 14-item inspection repair amendment just 6 days before closing, EZY Zenith handled the entire punch-list, provided before/after photos for the buyer\'s agent, and saved our deal. Invaluable partner!', 1, 'Google Review', 1, 1),
('rev-2', 'Marcus Sterling', 'Senior Asset Manager, Vanguard Capital REO', 'Atlanta, GA', 5, '1 month ago', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', 'Managing over 80 foreclosed assets across multiple counties requires speed, clear photos, and zero excuses. EZY Zenith secures properties within 24 hours, takes meticulous photo documentation, and their winterizations are flawless. Best coordination service in the U.S.', 1, 'Google Review', 2, 1),
('rev-3', 'Elena Rodriguez', 'Director of Property Management, Coastal Living Rentals', 'Tampa, FL', 5, '2 months ago', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', 'Turnover season used to be a nightmare of calling 10 different contractors who never showed up. With EZY Zenith, I submit one work order and they coordinate drywall, painting, deep cleaning, and rekeying. Our average turnover downtime dropped from 14 days to 4 days.', 1, 'Google Review', 3, 1),
('rev-4', 'David Chen', 'Real Estate Investor & Flipping Partner', 'Charlotte, NC', 5, '3 months ago', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', 'I bought a distressed 3-bedroom property with hoarding conditions. EZY Zenith did the full trash-out in 48 hours, landscaped the overgrown yard, and pressure washed the driveway. Professional, honest pricing, and constant updates.', 1, 'Google Review', 4, 1),
('rev-5', 'Rachel Vance', 'Managing Broker, Premier Realty Group', 'Philadelphia, PA', 5, '3 months ago', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80', 'Their communication is outstanding. In this business, knowing when a contractor is on-site and seeing immediate proof of work via time-stamped photos is everything. EZY Zenith sets the gold standard for property service coordination.', 1, 'Google Review', 5, 1);

-- -----------------------------------------------------------------------
-- 5. Table: leads (Service Requests & Work Orders)
-- -----------------------------------------------------------------------
CREATE TABLE `leads` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(50) NOT NULL DEFAULT 'service_request',
  `name` VARCHAR(150) NOT NULL,
  `company` VARCHAR(150) NULL,
  `email` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `property_address` VARCHAR(255) NULL,
  `service_needed` VARCHAR(150) NULL,
  `urgency` VARCHAR(50) NULL DEFAULT 'Standard (2-3 days)',
  `access_notes` TEXT NULL,
  `attachments_json` JSON NULL,
  `notes` TEXT NULL,
  `status` VARCHAR(50) NOT NULL DEFAULT 'New',
  `admin_notes` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `leads` (`type`, `name`, `company`, `email`, `phone`, `property_address`, `service_needed`, `urgency`, `access_notes`, `notes`, `status`) VALUES
('service_request', 'Jonathan Vance', 'Coldwell Banker Realty', 'jvance@cbrealty.com', '302-555-0192', '482 Highland Ave, Wilmington, DE', 'Realtor Listing Prep & Inspection Repairs', 'Urgent (< 48 hrs)', 'Lockbox on front porch: 4892. Gate code: 1102', 'Home inspection response deadline this Friday. Need 3 GFCI outlets, drywall patch in hallway, and handrail secured.', 'In Progress'),
('vendor_application', 'Carlos Mendez', 'Tri-State Maintenance Pros LLC', 'carlos@tristatemaintenance.com', '404-555-8831', 'Atlanta, GA Metro Area', 'Trash-out, Lawn Care & Handyman', 'Ready to Onboard', 'Covering Fulton, Gwinnett, Cobb, DeKalb counties', 'Experienced REO preservation crew with 3 trucks, W-9 and 2M GL insurance ready.', 'New');

-- -----------------------------------------------------------------------
-- 6. Table: before_after_gallery
-- -----------------------------------------------------------------------
CREATE TABLE `before_after_gallery` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(150) NOT NULL,
  `category` VARCHAR(50) NOT NULL,
  `before_img` VARCHAR(500) NOT NULL,
  `after_img` VARCHAR(500) NOT NULL,
  `description` TEXT NOT NULL,
  `sort_order` INT NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `before_after_gallery` (`title`, `category`, `before_img`, `after_img`, `description`, `sort_order`) VALUES
('Foreclosure Trash-Out & Deep Clean', 'Preservation', '/images/Trush-Out-740x556.jpg', '/images/Cleaning-service-740x556.jpg', 'Severe debris removal, full bulk trash-out, and commercial sanitization ready for appraiser walkthrough.', 1),
('Curb Appeal & Overgrown Lawn Restoration', 'Landscaping', '/images/Securing-Service-740x556.jpg', '/images/Landscaping-740x556.jpg', 'Cleared 4-foot weeds, trimmed trees away from roofline, edged sidewalks, and cleared HOA violations.', 2),
('Exterior Siding & Pressure Washing Polish', 'Exterior', '/images/Painting-and-siding-repairs-740x556.jpg', '/images/Power-washing-driveways-sidewalks-and-building-exteriors-740x556.jpg', 'Repaired loose siding boards, treated mildew, and power-washed the full exterior facade and driveway.', 3);

