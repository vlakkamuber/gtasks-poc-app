Alter table tasks
    add column is_trial boolean default false;
Alter table tasks
    add column answer json;


Alter table users
    add column country varchar(50) default 'INDIA';
Alter table users
    add column currency varchar(10) default 'INR';
