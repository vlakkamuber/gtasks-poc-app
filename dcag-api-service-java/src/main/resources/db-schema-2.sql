Alter table tasks
    add column is_trial boolean default false;
Alter table tasks
    add column answer json;


Alter table users
    add column country varchar(50) default 'INDIA';
Alter table users
    add column currency varchar(10) default 'INR';


create table gigs
(
    id        BIGINT NOT NULL AUTO_INCREMENT,
    task_type VARCHAR(255),
    PRIMARY KEY (id)
);

insert into gigs (task_type)
values ('RECEIPT_DIGITIZATION');
insert into gigs (task_type)
values ('RECORD_AUDIO');
insert into gigs (task_type)
values ('LOCALIZATION_QUALITY');
insert into gigs (task_type)
values ('IMAGE_LABELLING');
insert into gigs (task_type)
values ('MENU_PHOTO_REVIEW');
insert into gigs (task_type)
values ('RECORD_SURVEY');


Alter table gigs add column status VARCHAR(50) NOT NULL default 'ENABLED';