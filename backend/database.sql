-- Users table (couples creating events)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Subscription Tiers (must be before wedding_events)
CREATE TABLE subscription_tiers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2),
  max_guests INTEGER,
  features JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Wedding Events
CREATE TABLE wedding_events (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  groom_name VARCHAR(100) NOT NULL,
  bride_name VARCHAR(100) NOT NULL,
  wedding_date DATE NOT NULL,
  wedding_time TIME,
  location VARCHAR(255),
  password VARCHAR(255),
  is_published BOOLEAN DEFAULT FALSE,
  slug VARCHAR(255) UNIQUE,
  description TEXT,
  theme VARCHAR(50),
  tier_id INTEGER REFERENCES subscription_tiers(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Vendors (partnerships - must be before products)
CREATE TABLE vendors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20),
  category VARCHAR(100),
  description TEXT,
  website VARCHAR(500),
  location VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE,
  commission_percentage DECIMAL(5, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- E-commerce Products
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  price DECIMAL(10, 2),
  image_url VARCHAR(500),
  stock_quantity INTEGER,
  vendor_id INTEGER REFERENCES vendors(id),
  is_own_product BOOLEAN DEFAULT TRUE,
  customizable BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Product Categories
CREATE TABLE product_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  icon VARCHAR(255)
);

-- Guests list
CREATE TABLE guests (
  id SERIAL PRIMARY KEY,
  wedding_id INTEGER REFERENCES wedding_events(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  relationship VARCHAR(100),
  dietary_requirements TEXT,
  address VARCHAR(255),
  rsvp_status VARCHAR(50) DEFAULT 'pending',
  rsvp_count INTEGER DEFAULT 1,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Save the Date / Invitations
CREATE TABLE save_the_dates (
  id SERIAL PRIMARY KEY,
  wedding_id INTEGER REFERENCES wedding_events(id) ON DELETE CASCADE,
  template_id INTEGER,
  sent_at TIMESTAMP,
  recipients TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Wedding Checklist
CREATE TABLE checklists (
  id SERIAL PRIMARY KEY,
  wedding_id INTEGER REFERENCES wedding_events(id) ON DELETE CASCADE,
  item_name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  is_completed BOOLEAN DEFAULT FALSE,
  due_date DATE,
  priority VARCHAR(50),
  assigned_to VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  total_amount DECIMAL(10, 2),
  status VARCHAR(50),
  payment_method VARCHAR(50),
  shipping_address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order Items
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER,
  price DECIMAL(10, 2),
  customization_details JSONB
);

-- Wedding Timeline/Schedule
CREATE TABLE timeline_items (
  id SERIAL PRIMARY KEY,
  wedding_id INTEGER REFERENCES wedding_events(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  start_time TIME,
  end_time TIME,
  location VARCHAR(255),
  category VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Wedding Budget
CREATE TABLE budget_items (
  id SERIAL PRIMARY KEY,
  wedding_id INTEGER REFERENCES wedding_events(id) ON DELETE CASCADE,
  category VARCHAR(100),
  description VARCHAR(255),
  budgeted_amount DECIMAL(10, 2),
  actual_amount DECIMAL(10, 2),
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Wedding Gallery
CREATE TABLE gallery (
  id SERIAL PRIMARY KEY,
  wedding_id INTEGER REFERENCES wedding_events(id) ON DELETE CASCADE,
  image_url VARCHAR(500) NOT NULL,
  caption TEXT,
  category VARCHAR(100),
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Gift Registry
CREATE TABLE gift_registry (
  id SERIAL PRIMARY KEY,
  wedding_id INTEGER REFERENCES wedding_events(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id),
  quantity_needed INTEGER,
  quantity_received INTEGER DEFAULT 0,
  gift_url VARCHAR(500),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seating Arrangement
CREATE TABLE seating_arrangements (
  id SERIAL PRIMARY KEY,
  wedding_id INTEGER REFERENCES wedding_events(id) ON DELETE CASCADE,
  table_number INTEGER,
  capacity INTEGER,
  guests TEXT[],
  table_name VARCHAR(100),
  special_notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- FAQ
CREATE TABLE faq (
  id SERIAL PRIMARY KEY,
  wedding_id INTEGER REFERENCES wedding_events(id) ON DELETE CASCADE,
  question VARCHAR(500) NOT NULL,
  answer TEXT NOT NULL,
  category VARCHAR(100),
  order_index INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_wedding_user_id ON wedding_events(user_id);
CREATE INDEX idx_guests_wedding_id ON guests(wedding_id);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_timeline_wedding_id ON timeline_items(wedding_id);
CREATE INDEX idx_budget_wedding_id ON budget_items(wedding_id);
