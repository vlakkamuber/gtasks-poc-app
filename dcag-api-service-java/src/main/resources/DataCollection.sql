
-- Creating User Table
CREATE TABLE users (
    id VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    city_name VARCHAR(255),
    phone_number VARCHAR(255),
    PRIMARY KEY (id)
);

-- Creating Task Table
CREATE TABLE tasks (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    task_type VARCHAR(255),
    input TEXT,
    location POINT,
    currency VARCHAR(10),
    price DOUBLE PRECISION,
    create_time TIMESTAMP,
    due_time TIMESTAMP,
    PRIMARY KEY (id)
);


-- CREATE SPATIAL INDEX idx_tasks_location ON tasks(location);


-- Creating User Task Table
CREATE TABLE user_tasks (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_id VARCHAR(255) NOT NULL,
    task_id BIGINT NOT NULL,
    status VARCHAR(255) NOT NULL,
    output TEXT,
    output_desc TEXT,
    start_time TIMESTAMP,
    completion_time TIMESTAMP,  -- Corrected the data type name
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (task_id) REFERENCES tasks(id)
);