-- Users table
CREATE TABLE users
(
    id           VARCHAR(255) NOT NULL,
    email        VARCHAR(255),
    first_name   VARCHAR(255),
    last_name    VARCHAR(255),
    city_name    VARCHAR(255),
    phone_number VARCHAR(255),
    user_type    VARCHAR(255),
    preferred_lang VARCHAR(255),
    native_lang   VARCHAR(255),
    create_time   TIMESTAMP,
    PRIMARY KEY (id)
);

-- Tasks table
CREATE TABLE tasks
(
    idBIGINT            NOT NULL AUTO_INCREMENT,
    name                VARCHAR(255),
    task_type           VARCHAR(255),
    task_category       VARCHAR(255)
    max_number_of_users bigint,
    input               TEXT,
    status              VARCHAR(255) NOT NULL,
    location            POINT,
    currency            VARCHAR(10),
    price               DOUBLE PRECISION,
    is_available        boolean default true,
    create_time         TIMESTAMP,
    last_updated_time   TIMESTAMP,
    due_time            TIMESTAMP,
    start_time          TIMESTAMP,
    city                VARCHAR(255),
    lang            VARCHAR(255),
    PRIMARY KEY (id)
);
-- CREATE SPATIAL INDEX idx_tasks_location ON tasks(location);

-- UserTasks table
CREATE TABLE user_tasks
(
    id              BIGINT       NOT NULL AUTO_INCREMENT,
    user_id         VARCHAR(255) NOT NULL,
    task_id         BIGINT       NOT NULL,
    status          VARCHAR(255) NOT NULL,
    output          TEXT,
    use_input_as_output boolean default false,
    output_desc     TEXT,
    start_time      TIMESTAMP,
    completion_time TIMESTAMP,
    last_updated_time  TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (task_id) REFERENCES tasks (id),
    UNIQUE KEY unique_user_task_status (user_id, task_id, status)
);

-- UserIssues table
CREATE TABLE user_issues
(
    id              BIGINT       NOT NULL AUTO_INCREMENT,
    user_id         VARCHAR(255) NOT NULL,
    task_type       VARCHAR(255),
    summary         VARCHAR(255) NOT NULL,
    description     TEXT,
    create_time     TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE user_events
(
    id              BIGINT       NOT NULL AUTO_INCREMENT,
    user_id         VARCHAR(255) NOT NULL,
    session_id      VARCHAR(255),
    page            VARCHAR(255),
    actions         VARCHAR(255),
    city            VARCHAR(255),
    properties      VARCHAR(255),
    other_details   VARCHAR(255),
    user_agent      VARCHAR(255),
    create_time     TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);


CREATE TABLE user_survey
(
    id              BIGINT       NOT NULL AUTO_INCREMENT,
    user_id         VARCHAR(255) NOT NULL,
    status          VARCHAR(255),
    survey          JSON,
    create_time     TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

-- creating index
CREATE INDEX idx_user_tasks_user_id ON user_tasks (user_id);
CREATE INDEX idx_user_tasks_task_id ON user_tasks (task_id);

CREATE INDEX idx_user_issues_user_id ON user_issues (user_id);
CREATE INDEX idx_user_events_user_id ON user_events (user_id);

------------------ DATA ------------------
------------------ Tasks ------------------
-- AUDIO_TO_AUDIO
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Barkatpura', 'AUDIO_TO_AUDIO', 3,  'barkatpura.mp3', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
-- RECEIPT_DIGITIZATION
INSERT INTO tasks (name, task_type, task_category, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('H-E-B 1'        , 'RECEIPT_DIGITIZATION', 'RECEIPT_DIGITIZATION', 5,  'h-e-b1.jpg', 'NEW', 'USD', 1.0, '2024-02-01 00:00:00', null);
INSERT INTO tasks (name, task_type, task_category, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('H-E-B 2'        , 'RECEIPT_DIGITIZATION', 'RECEIPT_DIGITIZATION', 5,  'h-e-b2.jpeg', 'NEW', 'USD', 1.0, '2024-02-01 00:00:00', null);
INSERT INTO tasks (name, task_type, task_category, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('H-E-B 3'        , 'RECEIPT_DIGITIZATION', 'RECEIPT_DIGITIZATION', 5,  'h-e-b3.jpg', 'NEW', 'USD', 1.0, '2024-02-01 00:00:00', null);
INSERT INTO tasks (name, task_type, task_category, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('H-E-B 4'        , 'RECEIPT_DIGITIZATION', 'RECEIPT_DIGITIZATION', 5,  'h-e-b4.jpg', 'NEW', 'USD', 1.0, '2024-02-01 00:00:00', null);
INSERT INTO tasks (name, task_type, task_category, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Auto Cobro 1', 'RECEIPT_DIGITIZATION', 'RECEIPT_DIGITIZATION', 5,  'auto_cobro_1.jpg', 'NEW', 'USD', 1.0, '2024-02-01 00:00:00', null);
INSERT INTO tasks (name, task_type, task_category, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Auto Cobro 2', 'RECEIPT_DIGITIZATION', 'RECEIPT_DIGITIZATION', 5,  'auto_cobro_2.jpg', 'NEW', 'USD', 1.0, '2024-02-01 00:00:00', null);

-- IMAGE_TO_TEXT
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Barkatpura', 'AUDIO_TO_AUDIO', 3,  'barkatpura.mp3', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
-- TEXT_TO_AUDIO
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Hyderabad', 'TEXT_TO_AUDIO', 3,  'Hyderabad', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');



---------------------- Users ------------------
INSERT INTO users (id, email, first_name, last_name, phone_number) VALUES ('n0SAEOWwzVSzeT6v06XdBCaTxUL2', 'sameer@abc.com', "Sameer1", "Mishra", '+919693582143');
INSERT INTO users (id, email, first_name, last_name, phone_number) VALUES ('soSm43aGWeZAlwv2rP7lpA0DgcB2', 'sameer2@abc.com', "Sameer2", "Mishra", '+918686478524');
INSERT INTO users (id, email, first_name, last_name, phone_number) VALUES ('ea2zfNjMEqWqwKctfF5aPcNMnfA2', 'jaswant@abc.com', "Jaswant", "Vemulapalli", '+917675957989');
INSERT INTO users (id, email, first_name, last_name, phone_number) VALUES ('3kllbPzzBHSZW3uKp8Jk9xXJNVY2', 'vinay@abc.com', "Vinay", "Lakkam", '+917702277716');
INSERT INTO users (id, email, first_name, last_name, phone_number) VALUES ('tFOOrAUHbbQriw5ADwlbM3QIqo92', 'ankush@abc.com', "Ankush", "Kalra", '+918708508949');
INSERT INTO users (id, email, first_name, last_name, phone_number) VALUES ('iRazlValeQam87NDtUHJfMj6DWm1', 'mala@abc.com', "Mala Reddy", "Tonangi", '+918897745775');
