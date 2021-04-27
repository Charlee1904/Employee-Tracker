drop table if exists employee_DB;
create database employee_DB;

use employee_DB;

create table department (
	id int auto_increment,
    name varchar(30),
    primary key(id)
);

create table role(
	id int auto_increment,
    title varchar(30),
    salary decimal,
    department_id int,
    primary key(id)
);

create table employee (
 id int auto_increment,
 first_name varchar(30) not null,
 last_name varchar(30),
 role_id int,
 manager_id int,
 primary key(id)
);

insert into department
(id,name)
values (id,"Sales Lead");


insert into department
(id,name)
values (id,"Salesperson");

insert into department
(id,name)
values (id,"Lead Engineer");

insert into department
(id,name)
values (id,"Software Engineer");

insert into department
(id,name)
values (id,"Account Manager");

insert into department
(id,name)
values (id,"Accountant");


insert into employee
(id,first_name,last_name,role_id)
values (id,"Charles","Lee",3);