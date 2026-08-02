# Database Migration & API Layer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate from static JSON data to PostgreSQL database with Express.js API layer, enabling multi-airport support.

**Architecture:**
- PostgreSQL database hosted on Render (cloud)
- Express.js REST API runs locally (connects to Render PostgreSQL)
- Frontend (Expo + Vite) queries through local API
- No Supabase, no Docker - pure Express.js + Render PostgreSQL

**Tech Stack:** PostgreSQL (Render), Express.js, TypeScript

**Database Connection:**
```
postgresql://sanbay_user:RNvTX7P74iUqKXBUu6D371TxVK7qxk4Y@dpg-d9hi3jnavr4c73ektbog-a.singapore-postgres.render.com/sanbay
```

---

## Global Constraints

- All user-facing text must be in Vietnamese
- Keep commits small and focused
- TDD: Write failing test before implementation
- Calculation engine in `core/calculation-engine/` remains pure functions

---

## File Structure

```
sanbaygo/
├── api/                           # NEW - Express.js API
│   ├── src/
│   │   ├── index.ts               # Entry point
│   │   ├── routes/
│   │   │   ├── airports.ts        # Airport routes
│   │   │   ├── terminals.ts       # Terminal routes
│   │   │   ├── busRoutes.ts       # Bus route routes
│   │   │   ├── destinations.ts     # Destination routes
│   │   │   ├── vehicles.ts        # Vehicle provider routes
│   │   │   └── calculate.ts       # Trip calculation endpoint
│   │   ├── services/
│   │   │   ├── airportService.ts
│   │   │   ├── busService.ts
│   │   │   ├── vehicleService.ts
│   │   │   └── calculationService.ts
│   │   ├── db/
│   │   │   ├── index.ts           # PostgreSQL connection
│   │   │   └── migrations/        # SQL migrations
│   │   └── types/
│   │       └── index.ts           # API types
│   ├── package.json
│   └── tsconfig.json
├── core/
│   ├── data/                      # Will be replaced by API calls
│   │   ├── airport.ts
│   │   ├── busSchedule.ts
│   │   ├── destinations.ts
│   │   ├── exitTimeEstimates.ts
│   │   └── grabEstimates.ts
│   └── calculation-engine/        # Unchanged - pure functions
├── docs/
│   └── superpowers/
│       └── plans/
│           └── 2026-07-24-database-migration-railway.md  # This plan
└── db/
    └── migrations/
        └── 001_initial_schema.sql # NEW - SQL migration
```

---

## Database Schema

```sql
-- airports
CREATE TABLE airports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  code VARCHAR(10) NOT NULL UNIQUE,  -- IATA code: HAN, DAD, SGN
  city VARCHAR(255) NOT NULL,
  timezone VARCHAR(50) DEFAULT 'Asia/Ho_Chi_Minh',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- terminals
CREATE TABLE terminals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  airport_id UUID REFERENCES airports(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(10) NOT NULL,  -- T1, T2
  type VARCHAR(20) NOT NULL CHECK (type IN ('domestic', 'international')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- bus_routes
CREATE TABLE bus_routes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  airport_id UUID REFERENCES airports(id) ON DELETE CASCADE,
  route_number VARCHAR(20) NOT NULL,
  ticket_price INTEGER NOT NULL,  -- VND
  operating_start TIME NOT NULL,  -- HH:mm
  operating_end TIME NOT NULL,    -- HH:mm
  walking_minutes INTEGER DEFAULT 5,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- bus_schedules
CREATE TABLE bus_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bus_route_id UUID REFERENCES bus_routes(id) ON DELETE CASCADE,
  departure_time TIME NOT NULL,  -- HH:mm
  travel_normal_min INTEGER NOT NULL,
  travel_normal_max INTEGER NOT NULL,
  travel_peak_min INTEGER NOT NULL,
  travel_peak_max INTEGER NOT NULL
);

-- destinations
CREATE TABLE destinations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  airport_id UUID REFERENCES airports(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  name_vi VARCHAR(255) NOT NULL,
  nearest_bus_stop VARCHAR(255),
  has_bus_coverage BOOLEAN DEFAULT false,
  walking_minutes INTEGER DEFAULT 5,
  travel_normal_min INTEGER NOT NULL,
  travel_normal_max INTEGER NOT NULL,
  travel_peak_min INTEGER NOT NULL,
  travel_peak_max INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- exit_time_estimates
CREATE TABLE exit_time_estimates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  airport_id UUID REFERENCES airports(id) ON DELETE CASCADE,
  terminal_type VARCHAR(20) NOT NULL CHECK (terminal_type IN ('domestic', 'international')),
  baggage_type VARCHAR(20) NOT NULL CHECK (baggage_type IN ('carry_on', 'checked')),
  min_minutes INTEGER NOT NULL,
  max_minutes INTEGER NOT NULL,
  notes VARCHAR(255)
);

-- vehicle_providers (static data)
CREATE TABLE vehicle_providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  name_vi VARCHAR(100) NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('motorbike', 'car')),
  logo_url VARCHAR(500),
  luggage_score INTEGER CHECK (luggage_score >= 1 AND luggage_score <= 5),
  comfort_score INTEGER CHECK (comfort_score >= 1 AND comfort_score <= 5),
  eco_friendly BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- provider_pricing (per airport pricing)
CREATE TABLE provider_pricing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID REFERENCES vehicle_providers(id) ON DELETE CASCADE,
  airport_id UUID REFERENCES airports(id) ON DELETE CASCADE,
  price_min INTEGER NOT NULL,  -- VND
  price_max INTEGER NOT NULL,  -- VND
  travel_normal_min INTEGER NOT NULL,
  travel_normal_max INTEGER NOT NULL,
  travel_peak_min INTEGER NOT NULL,
  travel_peak_max INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(provider_id, airport_id)
);
```

---

## Task List

### Phase 1: Database Setup

---

### Task 1: Environment Setup (COMPLETED)

**Status:** User already has Render PostgreSQL database

**Connection String:**
```
postgresql://sanbay_user:RNvTX7P74iUqKXBUu6D371TxVK7qxk4Y@dpg-d9hi3jnavr4c73ektbog-a.singapore-postgres.render.com/sanbay
```

**Files:**
- Create: `.env` in `api/` folder

**Interfaces:**
- Produces: `DATABASE_URL` environment variable for API

- [x] **Step 1: Create `.env` file**

```bash
DATABASE_URL="postgresql://sanbay_user:RNvTX7P74iUqKXBUu6D371TxVK7qxk4Y@dpg-d9hi3jnavr4c73ektbog-a.singapore-postgres.render.com/sanbay"
PORT=3000
NODE_ENV=development
```

- [x] **Step 2: Verify connection**

```bash
psql $DATABASE_URL -c "SELECT version();"
```

Expected: PostgreSQL version output

---

### Task 2: Database Migration

**Files:**
- Create: `db/migrations/001_initial_schema.sql`
- Modify: `api/src/db/index.ts` (create later)
- Test: `api/src/db/migration.test.ts`

**Interfaces:**
- Produces: Tables created in PostgreSQL
- Consumes: `DATABASE_URL` from Task 1

- [ ] **Step 1: Write migration SQL file**

```sql
-- db/migrations/001_initial_schema.sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- airports
CREATE TABLE airports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  code VARCHAR(10) NOT NULL UNIQUE,
  city VARCHAR(255) NOT NULL,
  timezone VARCHAR(50) DEFAULT 'Asia/Ho_Chi_Minh',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- terminals
CREATE TABLE terminals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  airport_id UUID REFERENCES airports(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(10) NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('domestic', 'international')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- bus_routes
CREATE TABLE bus_routes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  airport_id UUID REFERENCES airports(id) ON DELETE CASCADE,
  route_number VARCHAR(20) NOT NULL,
  ticket_price INTEGER NOT NULL,
  operating_start TIME NOT NULL,
  operating_end TIME NOT NULL,
  walking_minutes INTEGER DEFAULT 5,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- bus_schedules
CREATE TABLE bus_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bus_route_id UUID REFERENCES bus_routes(id) ON DELETE CASCADE,
  departure_time TIME NOT NULL,
  travel_normal_min INTEGER NOT NULL,
  travel_normal_max INTEGER NOT NULL,
  travel_peak_min INTEGER NOT NULL,
  travel_peak_max INTEGER NOT NULL
);

-- destinations
CREATE TABLE destinations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  airport_id UUID REFERENCES airports(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  name_vi VARCHAR(255) NOT NULL,
  nearest_bus_stop VARCHAR(255),
  has_bus_coverage BOOLEAN DEFAULT false,
  walking_minutes INTEGER DEFAULT 5,
  travel_normal_min INTEGER NOT NULL,
  travel_normal_max INTEGER NOT NULL,
  travel_peak_min INTEGER NOT NULL,
  travel_peak_max INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- exit_time_estimates
CREATE TABLE exit_time_estimates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  airport_id UUID REFERENCES airports(id) ON DELETE CASCADE,
  terminal_type VARCHAR(20) NOT NULL CHECK (terminal_type IN ('domestic', 'international')),
  baggage_type VARCHAR(20) NOT NULL CHECK (baggage_type IN ('carry_on', 'checked')),
  min_minutes INTEGER NOT NULL,
  max_minutes INTEGER NOT NULL,
  notes VARCHAR(255)
);

-- vehicle_providers
CREATE TABLE vehicle_providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  name_vi VARCHAR(100) NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('motorbike', 'car')),
  logo_url VARCHAR(500),
  luggage_score INTEGER CHECK (luggage_score >= 1 AND luggage_score <= 5),
  comfort_score INTEGER CHECK (comfort_score >= 1 AND comfort_score <= 5),
  eco_friendly BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- provider_pricing
CREATE TABLE provider_pricing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID REFERENCES vehicle_providers(id) ON DELETE CASCADE,
  airport_id UUID REFERENCES airports(id) ON DELETE CASCADE,
  price_min INTEGER NOT NULL,
  price_max INTEGER NOT NULL,
  travel_normal_min INTEGER NOT NULL,
  travel_normal_max INTEGER NOT NULL,
  travel_peak_min INTEGER NOT NULL,
  travel_peak_max INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(provider_id, airport_id)
);

-- Indexes for performance
CREATE INDEX idx_terminals_airport ON terminals(airport_id);
CREATE INDEX idx_bus_routes_airport ON bus_routes(airport_id);
CREATE INDEX idx_bus_schedules_route ON bus_schedules(bus_route_id);
CREATE INDEX idx_destinations_airport ON destinations(airport_id);
CREATE INDEX idx_exit_time_airport ON exit_time_estimates(airport_id);
CREATE INDEX idx_provider_pricing_airport ON provider_pricing(airport_id);
```

- [ ] **Step 2: Run migration**

```bash
psql $DATABASE_URL -f db/migrations/001_initial_schema.sql
```

Expected: `CREATE TABLE` outputs without errors

- [ ] **Step 3: Verify tables**

```bash
psql $DATABASE_URL -c "\dt"
```

Expected: List of 7 tables

---

### Task 3: Seed Noi Bai Airport Data

**Files:**
- Create: `db/migrations/002_seed_noibai.sql`

**Interfaces:**
- Consumes: Tables from Task 2
- Produces: Sample data for testing

- [ ] **Step 1: Write seed SQL**

```sql
-- db/migrations/002_seed_noibai.sql

-- Insert Noi Bai Airport
INSERT INTO airports (id, name, code, city, timezone) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Sân bay Nội Bài', 'HAN', 'Hà Nội', 'Asia/Ho_Chi_Minh');

-- Insert Terminals
INSERT INTO terminals (airport_id, name, code, type) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Nhà ga T1', 'T1', 'domestic'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Nhà ga T2', 'T2', 'international');

-- Insert Bus Route 86
INSERT INTO bus_routes (id, airport_id, route_number, ticket_price, operating_start, operating_end, walking_minutes) VALUES
  ('b1b2c3d4-e5f6-7890-abcd-ef1234567890', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '86', 50000, '06:40', '22:15', 5);

-- Insert Bus Schedules (26 departures)
INSERT INTO bus_schedules (bus_route_id, departure_time, travel_normal_min, travel_normal_max, travel_peak_min, travel_peak_max) VALUES
  ('b1b2c3d4-e5f6-7890-abcd-ef1234567890', '06:40', 50, 55, 65, 75),
  ('b1b2c3d4-e5f6-7890-abcd-ef1234567890', '07:20', 50, 55, 65, 75),
  ('b1b2c3d4-e5f6-7890-abcd-ef1234567890', '08:00', 50, 55, 65, 75),
  ('b1b2c3d4-e5f6-7890-abcd-ef1234567890', '08:40', 50, 55, 65, 75),
  ('b1b2c3d4-e5f6-7890-abcd-ef1234567890', '09:15', 50, 55, 65, 75),
  ('b1b2c3d4-e5f6-7890-abcd-ef1234567890', '09:40', 50, 55, 65, 75),
  ('b1b2c3d4-e5f6-7890-abcd-ef1234567890', '10:25', 50, 55, 65, 75),
  ('b1b2c3d4-e5f6-7890-abcd-ef1234567890', '11:00', 50, 55, 65, 75),
  ('b1b2c3d4-e5f6-7890-abcd-ef1234567890', '11:40', 50, 55, 65, 75),
  ('b1b2c3d4-e5f6-7890-abcd-ef1234567890', '12:20', 50, 55, 65, 75),
  ('b1b2c3d4-e5f6-7890-abcd-ef1234567890', '12:45', 50, 55, 65, 75),
  ('b1b2c3d4-e5f6-7890-abcd-ef1234567890', '13:15', 50, 55, 65, 75),
  ('b1b2c3d4-e5f6-7890-abcd-ef1234567890', '13:50', 50, 55, 65, 75),
  ('b1b2c3d4-e5f6-7890-abcd-ef1234567890', '14:30', 50, 55, 65, 75),
  ('b1b2c3d4-e5f6-7890-abcd-ef1234567890', '15:10', 50, 55, 65, 75),
  ('b1b2c3d4-e5f6-7890-abcd-ef1234567890', '15:40', 50, 55, 65, 75),
  ('b1b2c3d4-e5f6-7890-abcd-ef1234567890', '16:00', 50, 55, 65, 75),
  ('b1b2c3d4-e5f6-7890-abcd-ef1234567890', '16:45', 50, 55, 65, 75),
  ('b1b2c3d4-e5f6-7890-abcd-ef1234567890', '17:20', 50, 55, 65, 75),
  ('b1b2c3d4-e5f6-7890-abcd-ef1234567890', '17:55', 50, 55, 65, 75),
  ('b1b2c3d4-e5f6-7890-abcd-ef1234567890', '18:40', 50, 55, 65, 75),
  ('b1b2c3d4-e5f6-7890-abcd-ef1234567890', '19:20', 50, 55, 65, 75),
  ('b1b2c3d4-e5f6-7890-abcd-ef1234567890', '20:00', 50, 55, 65, 75),
  ('b1b2c3d4-e5f6-7890-abcd-ef1234567890', '20:45', 50, 55, 65, 75),
  ('b1b2c3d4-e5f6-7890-abcd-ef1234567890', '21:30', 50, 55, 65, 75),
  ('b1b2c3d4-e5f6-7890-abcd-ef1234567890', '22:15', 50, 55, 65, 75);

-- Insert Destinations
INSERT INTO destinations (airport_id, name, name_vi, nearest_bus_stop, has_bus_coverage, walking_minutes, travel_normal_min, travel_normal_max, travel_peak_min, travel_peak_max) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Old Quarter', 'Khu phố cổ Hà Nội', 'Đại lộ Thăng Long', true, 5, 50, 55, 65, 75),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Hoan Kiem District', 'Quận Hoàn Kiếm', 'Đại lộ Thăng Long', true, 5, 50, 55, 65, 75),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Dong Da District', 'Quận Đống Đa', 'Đại lộ Thăng Long', true, 5, 45, 50, 60, 70),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Ba Dinh District', 'Quận Ba Đình', 'Đại lộ Thăng Long', true, 5, 50, 55, 65, 75),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Cau Giay District', 'Quận Cầu Giấy', 'Đại lộ Thăng Long', true, 5, 40, 45, 55, 65),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Other Areas', 'Khu vực khác', 'Đại lộ Thăng Long', false, 5, 50, 55, 65, 75);

-- Insert Exit Time Estimates
INSERT INTO exit_time_estimates (airport_id, terminal_type, baggage_type, min_minutes, max_minutes, notes) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'domestic', 'carry_on', 10, 15, NULL),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'domestic', 'checked', 20, 30, NULL),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'international', 'carry_on', 15, 30, 'Immigration queue'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'international', 'checked', 35, 60, 'Immigration + baggage + customs');

-- Insert Vehicle Providers
INSERT INTO vehicle_providers (id, name, name_vi, type, luggage_score, comfort_score, eco_friendly) VALUES
  ('c1c2c3c4-e5f6-7890-abcd-ef1234567890', 'Grab', 'Grab', 'motorbike', 2, 3, false),
  ('d1d2d3d4-e5f6-7890-abcd-ef1234567890', 'GrabCar', 'GrabCar', 'car', 4, 4, false),
  ('e1e2e3e4-e5f6-7890-abcd-ef1234567890', 'Xanh SM', 'Xanh SM', 'motorbike', 2, 4, true),
  ('f1f2f3f4-e5f6-7890-abcd-ef1234567890', 'Be', 'Be', 'car', 4, 4, false);

-- Insert Provider Pricing for Noi Bai
INSERT INTO provider_pricing (provider_id, airport_id, price_min, price_max, travel_normal_min, travel_normal_max, travel_peak_min, travel_peak_max) VALUES
  ('c1c2c3c4-e5f6-7890-abcd-ef1234567890', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 80000, 120000, 40, 50, 60, 80),
  ('d1d2d3d4-e5f6-7890-abcd-ef1234567890', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 180000, 280000, 45, 60, 70, 90),
  ('e1e2e3e4-e5f6-7890-abcd-ef1234567890', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 70000, 100000, 40, 50, 60, 80),
  ('f1f2f3f4-e5f6-7890-abcd-ef1234567890', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 150000, 250000, 45, 60, 70, 90);
```

- [ ] **Step 2: Run seed**

```bash
psql $DATABASE_URL -f db/migrations/002_seed_noibai.sql
```

- [ ] **Step 3: Verify seed data**

```bash
psql $DATABASE_URL -c "SELECT name, code FROM airports;"
psql $DATABASE_URL -c "SELECT COUNT(*) FROM bus_schedules;"
```

Expected: 1 airport, 26 schedules

---

### Phase 2: API Layer

---

### Task 4: Initialize Express.js Project

**Files:**
- Create: `api/package.json`
- Create: `api/tsconfig.json`
- Create: `api/.env.example`

**Interfaces:**
- Produces: `api/` project ready for development

- [ ] **Step 1: Create `api/package.json`**

```json
{
  "name": "sanbaygo-api",
  "version": "1.0.0",
  "description": "SanBayGo API - Airport transportation calculator",
  "main": "dist/index.js",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2",
    "pg": "^8.11.3",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^20.10.0",
    "@types/pg": "^8.10.9",
    "@types/cors": "^2.8.17",
    "typescript": "^5.3.2",
    "tsx": "^4.6.0",
    "jest": "^29.7.0",
    "@types/jest": "^29.5.11"
  }
}
```

- [ ] **Step 2: Create `api/tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

- [ ] **Step 3: Create `api/.env.example`**

```bash
DATABASE_URL=postgresql://user:password@host:5432/sanbaygo
PORT=3000
NODE_ENV=development
```

- [ ] **Step 4: Install dependencies**

```bash
cd api && npm install
```

---

### Task 5: Database Connection

**Files:**
- Create: `api/src/db/index.ts`
- Create: `api/src/db/pool.ts`
- Create: `api/src/db/index.test.ts`

**Interfaces:**
- Produces: `pool` object for PostgreSQL queries
- Consumes: `DATABASE_URL` environment variable

- [ ] **Step 1: Create `api/src/db/pool.ts`**

```typescript
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export default pool;
```

- [ ] **Step 2: Create `api/src/db/index.ts`**

```typescript
export { default as pool } from './pool';
export { query, queryOne } from './queries';

import pool, { QueryResult } from './pool';

export async function query<T = any>(
  text: string,
  params?: any[]
): Promise<QueryResult<T>> {
  const start = Date.now();
  const res = await pool.query<T>(text, params);
  const duration = Date.now() - start;
  console.log('Executed query', { text: text.substring(0, 50), duration, rows: res.rowCount });
  return res;
}

export async function queryOne<T = any>(
  text: string,
  params?: any[]
): Promise<T | null> {
  const res = await query<T>(text, params);
  return res.rows[0] || null;
}
```

- [ ] **Step 3: Create test**

```typescript
import { query } from './index';

describe('Database Connection', () => {
  it('should connect and query airports', async () => {
    const result = await query('SELECT COUNT(*) as count FROM airports');
    expect(parseInt(result.rows[0].count)).toBeGreaterThanOrEqual(0);
  });
});
```

- [ ] **Step 4: Run test**

```bash
cd api && npm test
```

---

### Task 6: Airport Endpoints

**Files:**
- Create: `api/src/types/index.ts`
- Create: `api/src/services/airportService.ts`
- Create: `api/src/routes/airports.ts`
- Create: `api/src/services/airportService.test.ts`

**Interfaces:**
- Produces: GET `/api/airports`, GET `/api/airports/:id`
- Consumes: `query` from Task 5

- [ ] **Step 1: Create types**

```typescript
export interface Airport {
  id: string;
  name: string;
  code: string;
  city: string;
  timezone: string;
  is_active: boolean;
}

export interface Terminal {
  id: string;
  airport_id: string;
  name: string;
  code: string;
  type: 'domestic' | 'international';
}

export interface BusRoute {
  id: string;
  airport_id: string;
  route_number: string;
  ticket_price: number;
  operating_start: string;
  operating_end: string;
  walking_minutes: number;
}

export interface BusSchedule {
  id: string;
  bus_route_id: string;
  departure_time: string;
  travel_normal_min: number;
  travel_normal_max: number;
  travel_peak_min: number;
  travel_peak_max: number;
}

export interface Destination {
  id: string;
  airport_id: string;
  name: string;
  name_vi: string;
  nearest_bus_stop: string;
  has_bus_coverage: boolean;
  walking_minutes: number;
  travel_normal_min: number;
  travel_normal_max: number;
  travel_peak_min: number;
  travel_peak_max: number;
}

export interface ExitTimeEstimate {
  id: string;
  airport_id: string;
  terminal_type: 'domestic' | 'international';
  baggage_type: 'carry_on' | 'checked';
  min_minutes: number;
  max_minutes: number;
  notes: string | null;
}

export interface VehicleProvider {
  id: string;
  name: string;
  name_vi: string;
  type: 'motorbike' | 'car';
  logo_url: string | null;
  luggage_score: number;
  comfort_score: number;
  eco_friendly: boolean;
}

export interface ProviderPricing {
  id: string;
  provider_id: string;
  airport_id: string;
  price_min: number;
  price_max: number;
  travel_normal_min: number;
  travel_normal_max: number;
  travel_peak_min: number;
  travel_peak_max: number;
}
```

- [ ] **Step 2: Create airport service**

```typescript
import { query, queryOne } from '../db';
import { Airport, Terminal } from '../types';

export async function getAllAirports(): Promise<Airport[]> {
  const result = await query<Airport>(
    'SELECT * FROM airports WHERE is_active = true ORDER BY name'
  );
  return result.rows;
}

export async function getAirportById(id: string): Promise<Airport | null> {
  return queryOne<Airport>(
    'SELECT * FROM airports WHERE id = $1',
    [id]
  );
}

export async function getTerminalsByAirport(airportId: string): Promise<Terminal[]> {
  const result = await query<Terminal>(
    'SELECT * FROM terminals WHERE airport_id = $1 ORDER BY code',
    [airportId]
  );
  return result.rows;
}

export async function getAirportWithTerminals(id: string) {
  const airport = await getAirportById(id);
  if (!airport) return null;

  const terminals = await getTerminalsByAirport(id);

  return {
    ...airport,
    terminals,
  };
}
```

- [ ] **Step 3: Create airport routes**

```typescript
import { Router, Request, Response } from 'express';
import * as airportService from '../services/airportService';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const airports = await airportService.getAllAirports();
    res.json({ data: airports });
  } catch (error) {
    console.error('Error fetching airports:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const airport = await airportService.getAirportWithTerminals(req.params.id);
    if (!airport) {
      return res.status(404).json({ error: 'Airport not found' });
    }
    res.json({ data: airport });
  } catch (error) {
    console.error('Error fetching airport:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
```

- [ ] **Step 4: Create test**

```typescript
import * as airportService from './airportService';

describe('AirportService', () => {
  it('should return all active airports', async () => {
    const airports = await airportService.getAllAirports();
    expect(Array.isArray(airports)).toBe(true);
  });

  it('should return airport with terminals', async () => {
    const airports = await airportService.getAllAirports();
    if (airports.length > 0) {
      const result = await airportService.getAirportWithTerminals(airports[0].id);
      expect(result).toHaveProperty('terminals');
    }
  });
});
```

---

### Task 7: Bus Route Endpoints

**Files:**
- Create: `api/src/services/busService.ts`
- Create: `api/src/routes/busRoutes.ts`
- Create: `api/src/services/busService.test.ts`

**Interfaces:**
- Produces: GET `/api/airports/:id/bus-routes`, GET `/api/airports/:id/bus-routes/:routeId/schedules`
- Consumes: `query` from Task 5

- [ ] **Step 1: Create bus service**

```typescript
import { query, queryOne } from '../db';
import { BusRoute, BusSchedule } from '../types';

export async function getBusRoutesByAirport(airportId: string): Promise<BusRoute[]> {
  const result = await query<BusRoute>(
    'SELECT * FROM bus_routes WHERE airport_id = $1 ORDER BY route_number',
    [airportId]
  );
  return result.rows;
}

export async function getBusRouteById(id: string): Promise<BusRoute | null> {
  return queryOne<BusRoute>(
    'SELECT * FROM bus_routes WHERE id = $1',
    [id]
  );
}

export async function getSchedulesByRoute(routeId: string): Promise<BusSchedule[]> {
  const result = await query<BusSchedule>(
    `SELECT * FROM bus_schedules
     WHERE bus_route_id = $1
     ORDER BY departure_time::time`,
    [routeId]
  );
  return result.rows;
}

export async function getBusRouteWithSchedules(id: string) {
  const route = await getBusRouteById(id);
  if (!route) return null;

  const schedules = await getSchedulesByRoute(id);

  return {
    ...route,
    schedules,
  };
}
```

- [ ] **Step 2: Create bus routes**

```typescript
import { Router, Request, Response } from 'express';
import * as busService from '../services/busService';

const router = Router({ mergeParams: true });

router.get('/', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const routes = await busService.getBusRoutesByAirport(id);
    res.json({ data: routes });
  } catch (error) {
    console.error('Error fetching bus routes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:routeId', async (req: Request, res: Response) => {
  try {
    const route = await busService.getBusRouteWithSchedules(req.params.routeId);
    if (!route) {
      return res.status(404).json({ error: 'Bus route not found' });
    }
    res.json({ data: route });
  } catch (error) {
    console.error('Error fetching bus route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
```

---

### Task 8: Destination Endpoints

**Files:**
- Create: `api/src/services/destinationService.ts`
- Create: `api/src/routes/destinations.ts`

**Interfaces:**
- Produces: GET `/api/airports/:id/destinations`
- Consumes: `query` from Task 5

- [ ] **Step 1: Create destination service**

```typescript
import { query } from '../db';
import { Destination } from '../types';

export async function getDestinationsByAirport(airportId: string): Promise<Destination[]> {
  const result = await query<Destination>(
    'SELECT * FROM destinations WHERE airport_id = $1 ORDER BY name_vi',
    [airportId]
  );
  return result.rows;
}
```

- [ ] **Step 2: Create destination routes**

```typescript
import { Router, Request, Response } from 'express';
import * as destinationService from '../services/destinationService';

const router = Router({ mergeParams: true });

router.get('/', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const destinations = await destinationService.getDestinationsByAirport(id);
    res.json({ data: destinations });
  } catch (error) {
    console.error('Error fetching destinations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
```

---

### Task 9: Vehicle Provider Endpoints

**Files:**
- Create: `api/src/services/vehicleService.ts`
- Create: `api/src/routes/vehicles.ts`

**Interfaces:**
- Produces: GET `/api/airports/:id/vehicles`
- Consumes: `query` from Task 5

- [ ] **Step 1: Create vehicle service**

```typescript
import { query } from '../db';

interface VehicleWithPricing {
  id: string;
  name: string;
  name_vi: string;
  type: string;
  logo_url: string | null;
  luggage_score: number;
  comfort_score: number;
  eco_friendly: boolean;
  price_min: number;
  price_max: number;
  travel_normal_min: number;
  travel_normal_max: number;
  travel_peak_min: number;
  travel_peak_max: number;
}

export async function getVehiclesByAirport(airportId: string): Promise<VehicleWithPricing[]> {
  const result = await query<VehicleWithPricing>(
    `SELECT
      vp.id, vp.name, vp.name_vi, vp.type, vp.logo_url,
      vp.luggage_score, vp.comfort_score, vp.eco_friendly,
      pp.price_min, pp.price_max,
      pp.travel_normal_min, pp.travel_normal_max,
      pp.travel_peak_min, pp.travel_peak_max
     FROM vehicle_providers vp
     JOIN provider_pricing pp ON vp.id = pp.provider_id
     WHERE pp.airport_id = $1
     ORDER BY vp.type, vp.name`,
    [airportId]
  );
  return result.rows;
}
```

- [ ] **Step 2: Create vehicle routes**

```typescript
import { Router, Request, Response } from 'express';
import * as vehicleService from '../services/vehicleService';

const router = Router({ mergeParams: true });

router.get('/', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const vehicles = await vehicleService.getVehiclesByAirport(id);
    res.json({ data: vehicles });
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
```

---

### Task 10: Trip Calculation Endpoint

**Files:**
- Create: `api/src/routes/calculate.ts`
- Create: `api/src/services/calculationService.ts`
- Modify: `api/src/index.ts` (wire routes)

**Interfaces:**
- Produces: POST `/api/trips/calculate`
- Consumes: All services, calculation engine from `core/`

- [ ] **Step 1: Create calculation service**

```typescript
import { queryOne } from '../db';
import { ExitTimeEstimate } from '../types';

interface CalculateRequest {
  airportId: string;
  arrivalTime: string;
  terminalCode: string;
  baggageType: 'carry_on' | 'checked';
  destinationId: string;
}

interface ExitTime {
  minMinutes: number;
  maxMinutes: number;
}

export async function getExitTime(
  airportId: string,
  terminalType: string,
  baggageType: string
): Promise<ExitTime> {
  const result = await queryOne<ExitTimeEstimate>(
    `SELECT * FROM exit_time_estimates
     WHERE airport_id = $1 AND terminal_type = $2 AND baggage_type = $3`,
    [airportId, terminalType, baggageType]
  );

  if (!result) {
    return { minMinutes: 15, maxMinutes: 30 }; // Default fallback
  }

  return {
    minMinutes: result.min_minutes,
    maxMinutes: result.max_minutes,
  };
}

export function calculateReadyTime(
  arrivalTime: string,
  exitMinutes: number
): string {
  const [hours, minutes] = arrivalTime.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes + exitMinutes;
  const readyHours = Math.floor(totalMinutes / 60) % 24;
  const readyMinutes = totalMinutes % 60;
  return `${readyHours.toString().padStart(2, '0')}:${readyMinutes.toString().padStart(2, '0')}`;
}

export function isPeakHour(time: string): boolean {
  const [hours] = time.split(':').map(Number);
  const morningStart = 7;
  const morningEnd = 9;
  const eveningStart = 17;
  const eveningEnd = 19;
  return (
    (hours >= morningStart && hours < morningEnd) ||
    (hours >= eveningStart && hours < eveningEnd)
  );
}
```

- [ ] **Step 2: Create calculate route**

```typescript
import { Router, Request, Response } from 'express';
import * as calculationService from '../services/calculationService';
import * as busService from '../services/busService';
import * as destinationService from '../services/destinationService';
import * as vehicleService from '../services/vehicleService';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { airportId, arrivalTime, terminalCode, baggageType, destinationId } = req.body;

    // Get exit time
    const exitTime = await calculationService.getExitTime(airportId, terminalCode, baggageType);
    const readyTime = calculationService.calculateReadyTime(arrivalTime, exitTime.maxMinutes);
    const isPeak = calculationService.isPeakHour(arrivalTime);

    // Get bus routes
    const busRoutes = await busService.getBusRoutesByAirport(airportId);

    // Get destinations
    const destinations = await destinationService.getDestinationsByAirport(airportId);
    const destination = destinations.find(d => d.id === destinationId);

    // Get vehicles
    const vehicles = await vehicleService.getVehiclesByAirport(airportId);

    res.json({
      data: {
        metadata: {
          arrivalTime,
          readyTime,
          isPeakHour: isPeak,
          exitTime,
        },
        busRoutes,
        destination,
        vehicles,
      },
    });
  } catch (error) {
    console.error('Error calculating trip:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
```

- [ ] **Step 3: Create main index.ts**

```typescript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import airportsRouter from './routes/airports';
import busRoutesRouter from './routes/busRoutes';
import destinationsRouter from './routes/destinations';
import vehiclesRouter from './routes/vehicles';
import calculateRouter from './routes/calculate';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/airports', airportsRouter);
app.use('/api/airports/:id/bus-routes', busRoutesRouter);
app.use('/api/airports/:id/destinations', destinationsRouter);
app.use('/api/airports/:id/vehicles', vehiclesRouter);
app.use('/api/trips', calculateRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

### Task 11: Test API Endpoints

**Files:**
- Test all routes manually with curl or Postman

**Interfaces:**
- Consumes: All routes from Tasks 6-10

- [ ] **Step 1: Start dev server**

```bash
cd api && npm run dev
```

- [ ] **Step 2: Test endpoints**

```bash
# Health check
curl http://localhost:3000/health

# Get all airports
curl http://localhost:3000/api/airports

# Get airport with terminals (use actual UUID from seed)
curl http://localhost:3000/api/airports/a1b2c3d4-e5f6-7890-abcd-ef1234567890

# Get bus routes
curl http://localhost:3000/api/airports/a1b2c3d4-e5f6-7890-abcd-ef1234567890/bus-routes

# Get destinations
curl http://localhost:3000/api/airports/a1b2c3d4-e5f6-7890-abcd-ef1234567890/destinations

# Get vehicles
curl http://localhost:3000/api/airports/a1b2c3d4-e5f6-7890-abcd-ef1234567890/vehicles

# Calculate trip
curl -X POST http://localhost:3000/api/trips/calculate \
  -H "Content-Type: application/json" \
  -d '{"airportId":"a1b2c3d4-e5f6-7890-abcd-ef1234567890","arrivalTime":"14:00","terminalCode":"T1","baggageType":"carry_on","destinationId":"<destination-id>"}'
```

---

### Task 12: Deploy to Railway

**Status:** SKIPPED - Using Render PostgreSQL (cloud database already available)

**User has:**
- Render PostgreSQL at: `dpg-d9hi3jnavr4c73ektbog-a`
- Database: `sanbay`

**Local API:**
- Express.js runs locally with `npm run dev`
- Connects to Render PostgreSQL via `DATABASE_URL`
- For production: deploy Express.js to Railway/Render/Render Free tier

**Note:** When ready to deploy the API to production, create a separate Render Web Service pointing to the `api/` directory, or use Railway as the API host.

---

### Phase 3: Frontend Integration

---

### Task 13: Create API Client

**Files:**
- Create: `core/api/client.ts`
- Create: `core/api/airports.ts`
- Create: `core/api/calculate.ts`

**Interfaces:**
- Produces: API client for frontend
- Consumes: Local API running on port 3000

- [ ] **Step 1: Create API base client**

```typescript
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

interface ApiResponse<T> {
  data: T;
  error?: string;
}

async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  const result: ApiResponse<T> = await response.json();
  return result.data;
}

export { fetchApi };
```

- [ ] **Step 2: Create airport API**

```typescript
import { fetchApi } from './client';

export interface Airport {
  id: string;
  name: string;
  code: string;
  city: string;
}

export interface AirportWithTerminals extends Airport {
  terminals: Terminal[];
}

export interface Terminal {
  id: string;
  code: string;
  name: string;
  type: 'domestic' | 'international';
}

export async function getAirports(): Promise<Airport[]> {
  return fetchApi<Airport[]>('/api/airports');
}

export async function getAirport(id: string): Promise<AirportWithTerminals> {
  return fetchApi<AirportWithTerminals>(`/api/airports/${id}`);
}

export async function getBusRoutes(airportId: string) {
  return fetchApi(`/api/airports/${airportId}/bus-routes`);
}

export async function getDestinations(airportId: string) {
  return fetchApi(`/api/airports/${airportId}/destinations`);
}

export async function getVehicles(airportId: string) {
  return fetchApi(`/api/airports/${airportId}/vehicles`);
}
```

- [ ] **Step 3: Create calculate API**

```typescript
import { fetchApi } from './client';

export interface CalculateRequest {
  airportId: string;
  arrivalTime: string;
  terminalCode: string;
  baggageType: 'carry_on' | 'checked';
  destinationId: string;
}

export interface CalculateResponse {
  metadata: {
    arrivalTime: string;
    readyTime: string;
    isPeakHour: boolean;
    exitTime: {
      minMinutes: number;
      maxMinutes: number;
    };
  };
  busRoutes: any[];
  destination: any;
  vehicles: any[];
}

export async function calculateTrip(request: CalculateRequest): Promise<CalculateResponse> {
  return fetchApi<CalculateResponse>('/api/trips/calculate', {
    method: 'POST',
    body: JSON.stringify(request),
  });
}
```

---

### Task 14: Update Form to Use API

**Files:**
- Modify: `app/` screens (use API instead of static data)

**Interfaces:**
- Consumes: API client from Task 13
- Produces: Working form with dynamic data

- [ ] **Step 1: Update airport selector to fetch from API**

```typescript
// Example: Update airport selection screen
import { getAirports, getAirport } from '../../core/api/airports';

export async function fetchAirportData(airportId: string) {
  const airport = await getAirport(airportId);
  const busRoutes = await getBusRoutes(airportId);
  const destinations = await getDestinations(airportId);
  const vehicles = await getVehicles(airportId);

  return { airport, busRoutes, destinations, vehicles };
}
```

---

### Task 15: Cleanup Static Data

**Files:**
- Delete: `core/data/airport.ts`
- Delete: `core/data/busSchedule.ts`
- Delete: `core/data/destinations.ts`
- Delete: `core/data/exitTimeEstimates.ts`
- Delete: `core/data/grabEstimates.ts`

**Interfaces:**
- Consumes: None (static files removed)
- Produces: Cleaner codebase

- [ ] **Step 1: Remove static data files**

```bash
rm core/data/airport.ts
rm core/data/busSchedule.ts
rm core/data/destinations.ts
rm core/data/exitTimeEstimates.ts
rm core/data/grabEstimates.ts
```

- [ ] **Step 2: Verify imports**

```bash
npm run build
```

Fix any broken imports.

---

## Summary

| Task | Description | Status |
|------|-------------|--------|
| 1 | Railway Project Setup | Pending |
| 2 | Database Migration | Pending |
| 3 | Seed Noi Bai Data | Pending |
| 4 | Initialize Express.js | Pending |
| 5 | Database Connection | Pending |
| 6 | Airport Endpoints | Pending |
| 7 | Bus Route Endpoints | Pending |
| 8 | Destination Endpoints | Pending |
| 9 | Vehicle Endpoints | Pending |
| 10 | Calculation Endpoint | Pending |
| 11 | Test API | Pending |
| 12 | Deploy to Railway | Pending |
| 13 | Create API Client | Pending |
| 14 | Update Frontend | Pending |
| 15 | Cleanup Static Data | Pending |

---

## Next Steps

1. Add more airports (Da Nang, Tan Son Nhat) via SQL insert
2. Add real-time Grab pricing (future: webhook or scheduled sync)
3. Add user preferences storage
4. Add calculation history

---

## Notes

- All Vietnamese text must be preserved in API responses
- Calculation engine in `core/calculation-engine/` remains unchanged — can be used by API layer
- Consider adding Redis caching for production (Railway has Redis plugin)
