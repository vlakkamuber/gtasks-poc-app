-- Users table
CREATE TABLE users
(
    id           VARCHAR(255) NOT NULL,
    email        VARCHAR(255),
    first_name   VARCHAR(255),
    last_name    VARCHAR(255),
    city_name    VARCHAR(255),
    phone_number VARCHAR(255),
    PRIMARY KEY (id)
);

-- Tasks table
CREATE TABLE tasks
(
    idBIGINT       NOT NULL AUTO_INCREMENT,
    name                VARCHAR(255),
    task_type           VARCHAR(255),
    max_number_of_users bigint,
    input               TEXT,
    status              VARCHAR(255) NOT NULL,
    location            POINT,
    currency            VARCHAR(10),
    price               DOUBLE PRECISION,
    is_available        boolean default true,
    create_time         TIMESTAMP,
    due_time            TIMESTAMP,
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
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (task_id) REFERENCES tasks (id)
);

CREATE TABLE user_issues
(
    id              BIGINT       NOT NULL AUTO_INCREMENT,
    user_id         VARCHAR(255) NOT NULL,
    description     TEXT,
    create_time     TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

------------------ DATA ------------------
------------------ Tasks ------------------
-- TEXT_TO_AUDIO
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Hyderabad', 'TEXT_TO_AUDIO', 3,  'Hyderabad', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Pocharam', 'TEXT_TO_AUDIO', 3,  'Pocharam', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Mallapur', 'TEXT_TO_AUDIO', 3,  'Mallapur', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Kukatpally', 'TEXT_TO_AUDIO', 3,  'Kukatpally', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Barkatpura', 'TEXT_TO_AUDIO', 3,  'Barkatpura', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Nallagandla', 'TEXT_TO_AUDIO', 3,  'Nallagandla', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Tiruvananthapuram', 'TEXT_TO_AUDIO', 3,  'Tiruvananthapuram', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Choutuppal', 'TEXT_TO_AUDIO', 3,  'Choutuppal', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Khairatabad', 'TEXT_TO_AUDIO', 3,  'Khairatabad', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Sanathnagar', 'TEXT_TO_AUDIO', 3, 'Sanathnagar', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Bharat Nagar', 'TEXT_TO_AUDIO', 3, 'Bharat Nagar', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Erragadda', 'TEXT_TO_AUDIO', 3, 'Erragadda', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Borabanda', 'TEXT_TO_AUDIO', 3, 'Borabanda', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Moti Nagar', 'TEXT_TO_AUDIO', 3, 'Moti Nagar', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Secunderabad', 'TEXT_TO_AUDIO', 3, 'Secunderabad', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Chilkalguda', 'TEXT_TO_AUDIO', 3, 'Chilkalguda', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Kavadiguda', 'TEXT_TO_AUDIO', 3, 'Kavadiguda', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('MG Road (James Street)', 'TEXT_TO_AUDIO', 3, 'MG Road (James Street)', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Madannapet', 'TEXT_TO_AUDIO', 3, 'Madannapet', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Minister Road', 'TEXT_TO_AUDIO', 3, 'Minister Road', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Mylargadda', 'TEXT_TO_AUDIO', 3, 'Mylargadda', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Namalagundu', 'TEXT_TO_AUDIO', 3, 'Namalagundu', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Padmarao Nagar', 'TEXT_TO_AUDIO', 3, 'Padmarao Nagar', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Pan bazar', 'TEXT_TO_AUDIO', 3, 'Pan bazar', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Parsigutta', 'TEXT_TO_AUDIO', 3, 'Parsigutta', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Patny', 'TEXT_TO_AUDIO', 3, 'Patny', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Rani Gunj', 'TEXT_TO_AUDIO', 3, 'Rani Gunj', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('RP Road', 'TEXT_TO_AUDIO', 3, 'RP Road', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Sindhi Colony', 'TEXT_TO_AUDIO', 3, 'Sindhi Colony', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Sitaphalmandi', 'TEXT_TO_AUDIO', 3, 'Sitaphalmandi', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Tarnaka', 'TEXT_TO_AUDIO', 3, 'Tarnaka', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Warsiguda', 'TEXT_TO_AUDIO', 3, 'Warsiguda', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Addagutta', 'TEXT_TO_AUDIO', 3, 'Addagutta', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Tukaramgate', 'TEXT_TO_AUDIO', 3, 'Tukaramgate', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Jubilee Hills', 'TEXT_TO_AUDIO', 3, 'Jubilee Hills', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Banjara Hills', 'TEXT_TO_AUDIO', 3, 'Banjara Hills', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Film Nagar', 'TEXT_TO_AUDIO', 3, 'Film Nagar', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Yousufguda', 'TEXT_TO_AUDIO', 3, 'Yousufguda', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Srinagar colony', 'TEXT_TO_AUDIO', 3, 'Srinagar colony', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Afzal Gunj', 'TEXT_TO_AUDIO', 3, 'Afzal Gunj', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Aliabad', 'TEXT_TO_AUDIO', 3, 'Aliabad', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Alijah Kotla', 'TEXT_TO_AUDIO', 3, 'Alijah Kotla', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Asif Nagar', 'TEXT_TO_AUDIO', 3, 'Asif Nagar', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Azampura', 'TEXT_TO_AUDIO', 3, 'Azampura', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Barkas', 'TEXT_TO_AUDIO', 3, 'Barkas', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Bazarghat', 'TEXT_TO_AUDIO', 3, 'Bazarghat', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Begum Bazaar', 'TEXT_TO_AUDIO', 3, 'Begum Bazaar', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Chaderghat', 'TEXT_TO_AUDIO', 3, 'Chaderghat', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Chanchalguda', 'TEXT_TO_AUDIO', 3, 'Chanchalguda', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Chandrayan Gutta', 'TEXT_TO_AUDIO', 3, 'Chandrayan Gutta', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');

INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Chatta Bazaar', 'TEXT_TO_AUDIO', 3, 'Chatta Bazaar', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Dabirpura', 'TEXT_TO_AUDIO', 3, 'Dabirpura', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Dar-ul-Shifa', 'TEXT_TO_AUDIO', 3, 'Dar-ul-Shifa', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Dhoolpet', 'TEXT_TO_AUDIO', 3, 'Dhoolpet', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Edi Bazar', 'TEXT_TO_AUDIO', 3, 'Edi Bazar', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Falaknuma', 'TEXT_TO_AUDIO', 3, 'Falaknuma', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Karwan', 'TEXT_TO_AUDIO', 3, 'Karwan', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Malakpet', 'TEXT_TO_AUDIO', 3, 'Malakpet', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Moghalpura', 'TEXT_TO_AUDIO', 3, 'Moghalpura', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Jahanuma', 'TEXT_TO_AUDIO', 3, 'Jahanuma', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Laad Bazaar', 'TEXT_TO_AUDIO', 3, 'Laad Bazaar', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Lal Darwaza', 'TEXT_TO_AUDIO', 3, 'Lal Darwaza', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Madina, Hyderabad', 'TEXT_TO_AUDIO', 3, 'Madina, Hyderabad', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Maharajgunj', 'TEXT_TO_AUDIO', 3, 'Maharajgunj', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Mehboob ki Mehendi', 'TEXT_TO_AUDIO', 3, 'Mehboob ki Mehendi', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Mir Alam Tank', 'TEXT_TO_AUDIO', 3, 'Mir Alam Tank', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Mozamjahi Market', 'TEXT_TO_AUDIO', 3, 'Mozamjahi Market', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Nawab Saheb Kunta', 'TEXT_TO_AUDIO', 3, 'Nawab Saheb Kunta', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Nayapul', 'TEXT_TO_AUDIO', 3, 'Nayapul', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Noorkhan Bazar', 'TEXT_TO_AUDIO', 3, 'Noorkhan Bazar', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Pisal Banda', 'TEXT_TO_AUDIO', 3, 'Pisal Banda', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Purana pul', 'TEXT_TO_AUDIO', 3, 'Purana pul', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Putlibowli', 'TEXT_TO_AUDIO', 3, 'Putlibowli', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Rein Bazar', 'TEXT_TO_AUDIO', 3, 'Rein Bazar', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Shahran Market', 'TEXT_TO_AUDIO', 3, 'Shahran Market', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Shah Ali Banda', 'TEXT_TO_AUDIO', 3, 'Shah Ali Banda', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Sultan Bazar', 'TEXT_TO_AUDIO', 3, 'Sultan Bazar', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Udden Gadda', 'TEXT_TO_AUDIO', 3, 'Udden Gadda', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Uppuguda', 'TEXT_TO_AUDIO', 3, 'Uppuguda', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Yakutpura', 'TEXT_TO_AUDIO', 3, 'Yakutpura', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('alkajgiri', 'TEXT_TO_AUDIO', 3, 'alkajgiri', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Malkajgiri', 'TEXT_TO_AUDIO', 3, 'Malkajgiri', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Anandbagh', 'TEXT_TO_AUDIO', 3, 'Anandbagh', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Ammuguda', 'TEXT_TO_AUDIO', 3, 'Ammuguda', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Gautham Nagar', 'TEXT_TO_AUDIO', 3, 'Gautham Nagar', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Kakatiya Nagar', 'TEXT_TO_AUDIO', 3, 'Kakatiya Nagar', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Vinayak Nagar', 'TEXT_TO_AUDIO', 3, 'Vinayak Nagar', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Moula-Ali', 'TEXT_TO_AUDIO', 3, 'Moula-Ali', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Neredmet', 'TEXT_TO_AUDIO', 3, 'Neredmet', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Old Neredmet', 'TEXT_TO_AUDIO', 3, 'Old Neredmet', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Safilguda', 'TEXT_TO_AUDIO', 3, 'Safilguda', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Sainikpuri', 'TEXT_TO_AUDIO', 3, 'Sainikpuri', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Yapral', 'TEXT_TO_AUDIO', 3, 'Yapral', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Uppal', 'TEXT_TO_AUDIO', 3, 'Uppal', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Habsiguda', 'TEXT_TO_AUDIO', 3, 'Habsiguda', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Ramanthapur', 'TEXT_TO_AUDIO', 3, 'Ramanthapur', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Boduppal', 'TEXT_TO_AUDIO', 3, 'Boduppal', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Nagole', 'TEXT_TO_AUDIO', 3, 'Nagole', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Nacharam', 'TEXT_TO_AUDIO', 3, 'Nacharam', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Mallapur', 'TEXT_TO_AUDIO', 3, 'Mallapur', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
-- AUDIO_TO_AUDIO
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Barkatpura', 'AUDIO_TO_AUDIO', 3,  'barkatpura.mp3', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Chilkalguda', 'AUDIO_TO_AUDIO', 3,  'chilkalguda.mp3', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Choutuppal', 'AUDIO_TO_AUDIO', 3,  'choutuppal.mp3', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Kavadiguda', 'AUDIO_TO_AUDIO', 3,  'kavadiguda.mp3', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Khairatabad', 'AUDIO_TO_AUDIO', 3,  'khairatabad.mp3', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Mylargadda', 'AUDIO_TO_AUDIO', 3,  'mylargadda.mp3', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Nallagandla', 'AUDIO_TO_AUDIO', 3,  'nallagandla.mp3', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Namalagundu', 'AUDIO_TO_AUDIO', 3,  'namalagundu.mp3', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Padmarao Nagar', 'AUDIO_TO_AUDIO', 3,  'padmaraonagar.mp3', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Tiruvananthapuram', 'AUDIO_TO_AUDIO', 3, 'tiruvananthapuram.mp3', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');

INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Birla Mandir', 'AUDIO_TO_AUDIO', 3, 'birla_mandir.mp3', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Chowmohallah Palace', 'AUDIO_TO_AUDIO', 3, 'chowmohallah_palace.mp3', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Golconda Fort', 'AUDIO_TO_AUDIO', 3, 'golconda_fort.mp3', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('GVK One Mall', 'AUDIO_TO_AUDIO', 3, 'gvk_one_mall.mp3', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Hussain Sagar Lake', 'AUDIO_TO_AUDIO', 3, 'hussain_sagar_lake.mp3', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Laad Bazaar', 'AUDIO_TO_AUDIO', 3, 'lad_bazaar.mp3', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Lumbini Park', 'AUDIO_TO_AUDIO', 3, 'lumbini_park.mp3', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Mecca Masjid', 'AUDIO_TO_AUDIO', 3, 'mecca_masjid.mp3', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Necklace Road', 'AUDIO_TO_AUDIO', 3, 'necklace_road.mp3', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Nehru Zoological Park', 'AUDIO_TO_AUDIO', 3, 'nehru_zoological_park.mp3', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Qutub Shahi Tombs', 'AUDIO_TO_AUDIO', 3, 'qutub_shahi_tombs.mp3', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Salar Jung Museum', 'AUDIO_TO_AUDIO', 3, 'salar_jung_museum.mp3', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');

-- IMAGE_TO_TEXT
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Charminar', 'IMAGE_TO_TEXT', 3,  'Charminar.jpeg', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Street image 1', 'IMAGE_TO_TEXT', 3,  'Street_1.jpg', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-25 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Street image 2', 'IMAGE_TO_TEXT', 3,  'Street_2.png', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-25 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Street image 3', 'IMAGE_TO_TEXT', 3,  'Street_3.png', 'NEW', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-25 00:00:00');



---------------------- Users ------------------
INSERT INTO users (id, email, first_name, last_name, phone_number) VALUES ('n0SAEOWwzVSzeT6v06XdBCaTxUL2', 'sameer@abc.com', "Sameer1", "Mishra", '+919693582143');
INSERT INTO users (id, email, first_name, last_name, phone_number) VALUES ('soSm43aGWeZAlwv2rP7lpA0DgcB2', 'sameer2@abc.com', "Sameer2", "Mishra", '+918686478524');
INSERT INTO users (id, email, first_name, last_name, phone_number) VALUES ('ea2zfNjMEqWqwKctfF5aPcNMnfA2', 'jaswant@abc.com', "Jaswant", "Vemulapalli", '+917675957989');
INSERT INTO users (id, email, first_name, last_name, phone_number) VALUES ('3kllbPzzBHSZW3uKp8Jk9xXJNVY2', 'vinay@abc.com', "Vinay", "Lakkam", '+917702277716');
INSERT INTO users (id, email, first_name, last_name, phone_number) VALUES ('tFOOrAUHbbQriw5ADwlbM3QIqo92', 'ankush@abc.com', "Ankush", "Kalra", '+918708508949');
INSERT INTO users (id, email, first_name, last_name, phone_number) VALUES ('iRazlValeQam87NDtUHJfMj6DWm1', 'mala@abc.com', "Mala Reddy", "Tonangi", '+918897745775');
