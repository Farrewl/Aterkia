-- ============================================================================
-- ATERKIA ASV DATABASE SCHEMA (PostgreSQL / Supabase)
-- ============================================================================

-- 1. Tabel Sponsor & Mitra
CREATE TABLE IF NOT EXISTS sponsors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    logo_url TEXT,
    tier VARCHAR(50) DEFAULT 'Gold', -- Platinum, Gold, Silver, Institutional & Academic
    tier_color VARCHAR(30) DEFAULT 'cyan',
    role VARCHAR(255),
    website VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabel Fleet Robot Aterkia
CREATE TABLE IF NOT EXISTS robots (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    code VARCHAR(50) NOT NULL,
    version VARCHAR(50) NOT NULL,
    hull_type VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'Active', -- Competition Ready, Active Research, In Development
    status_color VARCHAR(30) DEFAULT 'cyan',
    is_flagship BOOLEAN DEFAULT FALSE,
    length_cm INT NOT NULL,
    width_cm INT,
    weight_kg FLOAT,
    speed_knots FLOAT NOT NULL,
    autonomy_level VARCHAR(100),
    propulsion VARCHAR(255),
    battery_capacity VARCHAR(255),
    payload_sensors TEXT,
    processing_unit VARCHAR(255),
    telemetry_spec VARCHAR(255),
    waterproof_rating VARCHAR(50),
    description TEXT,
    mission_highlights JSONB DEFAULT '[]'::jsonb,
    awards JSONB DEFAULT '[]'::jsonb,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabel Anggota Tim (Team Members)
CREATE TABLE IF NOT EXISTS team_members (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    role VARCHAR(150) NOT NULL,
    division VARCHAR(50) NOT NULL, -- Leadership, Software, Electrical, Mechanical, Media & Non-Tech
    sub_division VARCHAR(100),
    photo_url TEXT,
    bio TEXT,
    specialty VARCHAR(255),
    linkedin_url TEXT,
    github_url TEXT,
    instagram_url TEXT,
    email VARCHAR(150),
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tabel Berita / News & Dispatches
CREATE TABLE IF NOT EXISTS news (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL, -- Competition, R&D Innovation, Achievement, Community
    snippet TEXT,
    content TEXT NOT NULL,
    author VARCHAR(150),
    read_time VARCHAR(50) DEFAULT '3 Menit Baca',
    tags JSONB DEFAULT '[]'::jsonb,
    image_url TEXT,
    published_at DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Tabel Pesan Kontak & Kolaborasi (Inquiries)
CREATE TABLE IF NOT EXISTS contact_inquiries (
    id SERIAL PRIMARY KEY,
    sender_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    organization VARCHAR(150),
    category VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);