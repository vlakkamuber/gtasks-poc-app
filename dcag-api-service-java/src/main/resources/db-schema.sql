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
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task1', '1', 3,  'Hyderabad', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task2', '1', 3,  'Pocharam', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task3', '1', 3,  'Mallapur', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task4', '1', 3,  'Kukatpally', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task5', '1', 3,  'Barkatpura', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task6', '1', 3,  'Nallagandla', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task7', '1', 3,  'Tiruvananthapuram', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task8', '1', 3,  'Choutuppal', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task9', '1', 3,  'Khairatabad', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task10', '1', 3, 'Sanathnagar', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task11', '1', 3, 'Bharat Nagar', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task12', '1', 3, 'Erragadda', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task13', '1', 3, 'Borabanda', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task14', '1', 3, 'Moti Nagar', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task15', '1', 3, 'Secunderabad', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task16', '1', 3, 'Chilkalguda', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task17', '1', 3, 'Kavadiguda', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task18', '1', 3, 'MG Road (James Street)', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task19', '1', 3, 'Madannapet', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task20', '1', 3, 'Minister Road', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task21', '1', 3, 'Mylargadda', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task22', '1', 3, 'Namalagundu', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task23', '1', 3, 'Padmarao Nagar', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task24', '1', 3, 'Pan bazar', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task25', '1', 3, 'Parsigutta', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task26', '1', 3, 'Patny', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task27', '1', 3, 'Rani Gunj', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task28', '1', 3, 'RP Road', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task29', '1', 3, 'Sindhi Colony', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task30', '1', 3, 'Sitaphalmandi', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task31', '1', 3, 'Tarnaka', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task32', '1', 3, 'Warsiguda', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task33', '1', 3, 'Addagutta', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task34', '1', 3, 'Tukaramgate', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task35', '1', 3, 'Jubilee Hills', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task36', '1', 3, 'Banjara Hills', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task37', '1', 3, 'Film Nagar', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task38', '1', 3, 'Yousufguda', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task39', '1', 3, 'Srinagar colony', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task40', '1', 3, 'Afzal Gunj', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task41', '1', 3, 'Aliabad', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task42', '1', 3, 'Alijah Kotla', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task43', '1', 3, 'Asif Nagar', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task44', '1', 3, 'Azampura', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task45', '1', 3, 'Barkas', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task46', '1', 3, 'Bazarghat', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task47', '1', 3, 'Begum Bazaar', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task48', '1', 3, 'Chaderghat', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task49', '1', 3, 'Chanchalguda', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task50', '1', 3, 'Chandrayan Gutta', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');

INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task51', '1', 3, 'Chatta Bazaar', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task52', '1', 3, 'Dabirpura', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task53', '1', 3, 'Dar-ul-Shifa', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task54', '1', 3, 'Dhoolpet', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task55', '1', 3, 'Edi Bazar', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task56', '1', 3, 'Falaknuma', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task57', '1', 3, 'Karwan', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task58', '1', 3, 'Malakpet', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task59', '1', 3, 'Moghalpura', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task60', '1', 3, 'Jahanuma', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task61', '1', 3, 'Laad Bazaar', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task62', '1', 3, 'Lal Darwaza', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task63', '1', 3, 'Madina, Hyderabad', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task64', '1', 3, 'Maharajgunj', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task65', '1', 3, 'Mehboob ki Mehendi', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task66', '1', 3, 'Mir Alam Tank', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task67', '1', 3, 'Mozamjahi Market', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task68', '1', 3, 'Nawab Saheb Kunta', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task69', '1', 3, 'Nayapul', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task70', '1', 3, 'Noorkhan Bazar', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task71', '1', 3, 'Pisal Banda', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task72', '1', 3, 'Purana pul', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task73', '1', 3, 'Putlibowli', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task74', '1', 3, 'Rein Bazar', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task75', '1', 3, 'Shahran Market', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task76', '1', 3, 'Shah Ali Banda', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task77', '1', 3, 'Sultan Bazar', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task78', '1', 3, 'Udden Gadda', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task79', '1', 3, 'Uppuguda', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task80', '1', 3, 'Yakutpura', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task81', '1', 3, 'alkajgiri', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task82', '1', 3, 'Malkajgiri', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task83', '1', 3, 'Anandbagh', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task84', '1', 3, 'Ammuguda', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task85', '1', 3, 'Gautham Nagar', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task86', '1', 3, 'Kakatiya Nagar', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task87', '1', 3, 'Vinayak Nagar', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task88', '1', 3, 'Moula-Ali', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task89', '1', 3, 'Neredmet', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task90', '1', 3, 'Old Neredmet', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task91', '1', 3, 'Safilguda', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task92', '1', 3, 'Sainikpuri', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task93', '1', 3, 'Yapral', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task94', '1', 3, 'Uppal', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task95', '1', 3, 'Habsiguda', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task96', '1', 3, 'Ramanthapur', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task97', '1', 3, 'Boduppal', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task98', '1', 3, 'Nagole', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task99', '1', 3, 'Nacharam', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('Task100', '1', 3, 'Mallapur', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
-- AUDIO_TO_AUDIO
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('ATask1', '2', 3,  'barkatpura.mp3', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('ATask2', '2', 3,  'chilkalguda.mp3', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('ATask3', '2', 3,  'choutuppal.mp3', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('ATask4', '2', 3,  'kavadiguda.mp3', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('ATask5', '2', 3,  'khairatabad.mp3', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('ATask6', '2', 3,  'mylargadda.mp3', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('ATask7', '2', 3,  'nallagandla.mp3', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('ATask8', '2', 3,  'namalagundu.mp3', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('ATask9', '2', 3,  'padmaraonagar.mp3', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');
INSERT INTO tasks (name, task_type, max_number_of_users, input, status, currency, price, create_time, due_time) VALUES ('ATask10', '2', 3, 'tiruvananthapuram.mp3', '0', 'USD', 2.0, '2024-01-12 00:00:00', '2024-01-16 00:00:00');



---------------------- Users ------------------
INSERT INTO users (id, email, first_name, last_name, phone_number) VALUES ('n0SAEOWwzVSzeT6v06XdBCaTxUL2', 'sameer@abc.com', "Sameer1", "Mishra", '+919693582143');
INSERT INTO users (id, email, first_name, last_name, phone_number) VALUES ('soSm43aGWeZAlwv2rP7lpA0DgcB2', 'sameer2@abc.com', "Sameer2", "Mishra", '+918686478524');
INSERT INTO users (id, email, first_name, last_name, phone_number) VALUES ('ea2zfNjMEqWqwKctfF5aPcNMnfA2', 'jaswant@abc.com', "Jaswant", "Vemulapalli", '+917675957989');
INSERT INTO users (id, email, first_name, last_name, phone_number) VALUES ('3kllbPzzBHSZW3uKp8Jk9xXJNVY2', 'vinay@abc.com', "Vinay", "Lakkam", '+917702277716');
