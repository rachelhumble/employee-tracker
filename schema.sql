Drop database if exists company_db;
create database company_db;
use company_db;

create table employee (
    id int auto_increment,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    roll_id int not null,
    manager_id int,
    primary key (id)
);

drop table roll;
create table roll (
    id int auto_increment,
    title varchar(30),
    salary int,
    department_id int,
    primary key (id)   
);

create table department (
    id int auto_increment,
    name varchar(30),
    primary key (id)
);