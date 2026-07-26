-- Seed Noi Bai Airport Data
-- Migration: 002_seed_noibai.sql
-- Description: Seeds the database with Noi Bai Airport data, terminals, bus routes, schedules, destinations, exit times, and vehicle providers

BEGIN;

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

COMMIT;
