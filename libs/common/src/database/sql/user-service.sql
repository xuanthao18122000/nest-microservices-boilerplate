CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    phone_number VARCHAR(255),
    address TEXT,
    avatar VARCHAR(255),
    password VARCHAR(255),
    status INT DEFAULT 1,
    last_logout_date TIMESTAMP,
    role_id INT,
    creator_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    "key" VARCHAR(255) UNIQUE NOT NULL,
    "name" TEXT NOT NULL,
    status INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
