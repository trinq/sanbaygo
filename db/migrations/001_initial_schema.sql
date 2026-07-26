-- SanBayGo Initial Schema Migration
-- Creates all tables for airport ground transportation service

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

-- Indexes for performance
CREATE INDEX idx_terminals_airport ON terminals(airport_id);
CREATE INDEX idx_bus_routes_airport ON bus_routes(airport_id);
CREATE INDEX idx_bus_schedules_route ON bus_schedules(bus_route_id);
CREATE INDEX idx_destinations_airport ON destinations(airport_id);
CREATE INDEX idx_exit_time_airport ON exit_time_estimates(airport_id);
CREATE INDEX idx_provider_pricing_airport ON provider_pricing(airport_id);
