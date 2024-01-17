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
    output_desc     TEXT,
    start_time      TIMESTAMP,
    completion_time TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (task_id) REFERENCES tasks (id)
);

------------------ DATA ------------------
------------------ Tasks ------------------
-- TEXT_TO_AUDIO
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task1', 'TEXT_TO_AUDIO', 3,  'Hyderabad', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task2', 'TEXT_TO_AUDIO', 3,  'Pocharam', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task3', 'TEXT_TO_AUDIO', 3,  'Mallapur', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task4', 'TEXT_TO_AUDIO', 3,  'Kukatpally', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task5', 'TEXT_TO_AUDIO', 3,  'Barkatpura', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task6', 'TEXT_TO_AUDIO', 3,  'Nallagandla', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task7', 'TEXT_TO_AUDIO', 3,  'Tiruvananthapuram', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task8', 'TEXT_TO_AUDIO', 3,  'Choutuppal', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task9', 'TEXT_TO_AUDIO', 3,  'Khairatabad', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task10', 'TEXT_TO_AUDIO', 3, 'Sanathnagar', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task11', 'TEXT_TO_AUDIO', 3, 'Bharat Nagar', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task12', 'TEXT_TO_AUDIO', 3, 'Erragadda', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task13', 'TEXT_TO_AUDIO', 3, 'Borabanda', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task14', 'TEXT_TO_AUDIO', 3, 'Moti Nagar', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task15', 'TEXT_TO_AUDIO', 3, 'Secunderabad', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task16', 'TEXT_TO_AUDIO', 3, 'Chilkalguda', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task17', 'TEXT_TO_AUDIO', 3, 'Kavadiguda', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task18', 'TEXT_TO_AUDIO', 3, 'MG Road (James Street)', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task19', 'TEXT_TO_AUDIO', 3, 'Madannapet', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task20', 'TEXT_TO_AUDIO', 3, 'Minister Road', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task21', 'TEXT_TO_AUDIO', 3, 'Mylargadda', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task22', 'TEXT_TO_AUDIO', 3, 'Namalagundu', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task23', 'TEXT_TO_AUDIO', 3, 'Padmarao Nagar', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task24', 'TEXT_TO_AUDIO', 3, 'Pan bazar', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task25', 'TEXT_TO_AUDIO', 3, 'Parsigutta', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task26', 'TEXT_TO_AUDIO', 3, 'Patny', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task27', 'TEXT_TO_AUDIO', 3, 'Rani Gunj', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task28', 'TEXT_TO_AUDIO', 3, 'RP Road', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task29', 'TEXT_TO_AUDIO', 3, 'Sindhi Colony', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task30', 'TEXT_TO_AUDIO', 3, 'Sitaphalmandi', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task31', 'TEXT_TO_AUDIO', 3, 'Tarnaka', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task32', 'TEXT_TO_AUDIO', 3, 'Warsiguda', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task33', 'TEXT_TO_AUDIO', 3, 'Addagutta', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task34', 'TEXT_TO_AUDIO', 3, 'Tukaramgate', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task35', 'TEXT_TO_AUDIO', 3, 'Jubilee Hills', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task36', 'TEXT_TO_AUDIO', 3, 'Banjara Hills', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task37', 'TEXT_TO_AUDIO', 3, 'Film Nagar', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task38', 'TEXT_TO_AUDIO', 3, 'Yousufguda', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task39', 'TEXT_TO_AUDIO', 3, 'Srinagar colony', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task40', 'TEXT_TO_AUDIO', 3, 'Afzal Gunj', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task41', 'TEXT_TO_AUDIO', 3, 'Aliabad', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task42', 'TEXT_TO_AUDIO', 3, 'Alijah Kotla', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task43', 'TEXT_TO_AUDIO', 3, 'Asif Nagar', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task44', 'TEXT_TO_AUDIO', 3, 'Azampura', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task45', 'TEXT_TO_AUDIO', 3, 'Barkas', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task46', 'TEXT_TO_AUDIO', 3, 'Bazarghat', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task47', 'TEXT_TO_AUDIO', 3, 'Begum Bazaar', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task48', 'TEXT_TO_AUDIO', 3, 'Chaderghat', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task49', 'TEXT_TO_AUDIO', 3, 'Chanchalguda', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task50', 'TEXT_TO_AUDIO', 3, 'Chandrayan Gutta', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');

INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task51', 'TEXT_TO_AUDIO', 3, 'Chatta Bazaar', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task52', 'TEXT_TO_AUDIO', 3, 'Dabirpura', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task53', 'TEXT_TO_AUDIO', 3, 'Dar-ul-Shifa', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task54', 'TEXT_TO_AUDIO', 3, 'Dhoolpet', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task55', 'TEXT_TO_AUDIO', 3, 'Edi Bazar', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task56', 'TEXT_TO_AUDIO', 3, 'Falaknuma', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task57', 'TEXT_TO_AUDIO', 3, 'Karwan', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task58', 'TEXT_TO_AUDIO', 3, 'Malakpet', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task59', 'TEXT_TO_AUDIO', 3, 'Moghalpura', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task60', 'TEXT_TO_AUDIO', 3, 'Jahanuma', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task61', 'TEXT_TO_AUDIO', 3, 'Laad Bazaar', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task62', 'TEXT_TO_AUDIO', 3, 'Lal Darwaza', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task63', 'TEXT_TO_AUDIO', 3, 'Madina, Hyderabad', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task64', 'TEXT_TO_AUDIO', 3, 'Maharajgunj', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task65', 'TEXT_TO_AUDIO', 3, 'Mehboob ki Mehendi', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task66', 'TEXT_TO_AUDIO', 3, 'Mir Alam Tank', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task67', 'TEXT_TO_AUDIO', 3, 'Mozamjahi Market', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task68', 'TEXT_TO_AUDIO', 3, 'Nawab Saheb Kunta', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task69', 'TEXT_TO_AUDIO', 3, 'Nayapul', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task70', 'TEXT_TO_AUDIO', 3, 'Noorkhan Bazar', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task71', 'TEXT_TO_AUDIO', 3, 'Pisal Banda', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task72', 'TEXT_TO_AUDIO', 3, 'Purana pul', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task73', 'TEXT_TO_AUDIO', 3, 'Putlibowli', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task74', 'TEXT_TO_AUDIO', 3, 'Rein Bazar', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task75', 'TEXT_TO_AUDIO', 3, 'Shahran Market', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task76', 'TEXT_TO_AUDIO', 3, 'Shah Ali Banda', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task77', 'TEXT_TO_AUDIO', 3, 'Sultan Bazar', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task78', 'TEXT_TO_AUDIO', 3, 'Udden Gadda', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task79', 'TEXT_TO_AUDIO', 3, 'Uppuguda', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task80', 'TEXT_TO_AUDIO', 3, 'Yakutpura', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task81', 'TEXT_TO_AUDIO', 3, 'alkajgiri', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task82', 'TEXT_TO_AUDIO', 3, 'Malkajgiri', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task83', 'TEXT_TO_AUDIO', 3, 'Anandbagh', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task84', 'TEXT_TO_AUDIO', 3, 'Ammuguda', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task85', 'TEXT_TO_AUDIO', 3, 'Gautham Nagar', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task86', 'TEXT_TO_AUDIO', 3, 'Kakatiya Nagar', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task87', 'TEXT_TO_AUDIO', 3, 'Vinayak Nagar', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task88', 'TEXT_TO_AUDIO', 3, 'Moula-Ali', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task89', 'TEXT_TO_AUDIO', 3, 'Neredmet', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task90', 'TEXT_TO_AUDIO', 3, 'Old Neredmet', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task91', 'TEXT_TO_AUDIO', 3, 'Safilguda', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task92', 'TEXT_TO_AUDIO', 3, 'Sainikpuri', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task93', 'TEXT_TO_AUDIO', 3, 'Yapral', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task94', 'TEXT_TO_AUDIO', 3, 'Uppal', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task95', 'TEXT_TO_AUDIO', 3, 'Habsiguda', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task96', 'TEXT_TO_AUDIO', 3, 'Ramanthapur', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task97', 'TEXT_TO_AUDIO', 3, 'Boduppal', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task98', 'TEXT_TO_AUDIO', 3, 'Nagole', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task99', 'TEXT_TO_AUDIO', 3, 'Nacharam', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task100', 'TEXT_TO_AUDIO', 3, 'Mallapur', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
-- AUDIO_TO_AUDIO
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('ATask1', 'AUDIO_TO_AUDIO', 3,  'barkatpura.mp3', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('ATask2', 'AUDIO_TO_AUDIO', 3,  'chilkalguda.mp3', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('ATask3', 'AUDIO_TO_AUDIO', 3,  'choutuppal.mp3', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('ATask4', 'AUDIO_TO_AUDIO', 3,  'kavadiguda.mp3', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('ATask5', 'AUDIO_TO_AUDIO', 3,  'khairatabad.mp3', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('ATask6', 'AUDIO_TO_AUDIO', 3,  'mylargadda.mp3', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('ATask7', 'AUDIO_TO_AUDIO', 3,  'nallagandla.mp3', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('ATask8', 'AUDIO_TO_AUDIO', 3,  'namalagundu.mp3', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('ATask9', 'AUDIO_TO_AUDIO', 3,  'padmaraonagar.mp3', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('ATask10', 'AUDIO_TO_AUDIO', 3, 'tiruvananthapuram.mp3', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');



---------------------- Users ------------------
INSERT INTO users (id, email, first_name, last_name, phone_number) VALUES ('n0SAEOWwzVSzeT6v06XdBCaTxUL2', 'sameer@abc.com', "Sameer1", "Mishra", '+919693582143');
INSERT INTO users (id, email, first_name, last_name, phone_number) VALUES ('soSm43aGWeZAlwv2rP7lpA0DgcB2', 'sameer2@abc.com', "Sameer2", "Mishra", '+918686478524');
INSERT INTO users (id, email, first_name, last_name, phone_number) VALUES ('ea2zfNjMEqWqwKctfF5aPcNMnfA2', 'jaswant@abc.com', "Jaswant", "Vemulapalli", '+917675957989');
INSERT INTO users (id, email, first_name, last_name, phone_number) VALUES ('3kllbPzzBHSZW3uKp8Jk9xXJNVY2', 'vinay@abc.com', "Vinay", "Lakkam", '+917702277716');
