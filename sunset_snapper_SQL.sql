create database sunset_snapper;

use sunset_snapper;

CREATE TABLE photos (
    photo_id    INT AUTO_INCREMENT PRIMARY KEY,
    username    VARCHAR(16) NOT NULL references users(username),
    photo       TEXT NOT NULL,
    country     VARCHAR(64) NOT NULL,
    city        VARCHAR(64) NOT NULL,
    details     TEXT NOT NULL,
    likes       INT
);

create table photos (
	photo_id	int auto_increment,		
	user_id		int not null,
	username 	varchar(16) not null,
    photo		text not null,
    country		varchar(64) not null,
    city		varchar(64) not null,
    details		text not null,
    likes		int,
    constraint pk_photo_id primary key (photo_id),
    constraint fk_user_id foreign key (user_id) references users(user_id)
);

create table users (
	user_id		int auto_increment not null,
    username	varchar(16) not null,
    
    constraint pk_user_id primary key (user_id)
);

select * from photos;
select * from users;
insert into users (username, password, email) values ('shawn', 'shawnpassword', 'shawn@email.com');

alter table users drop column password;
delete from photos where photo_id = 34;

select user_id, username from users where username = 'shawn';
