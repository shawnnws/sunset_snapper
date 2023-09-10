create database sunset_snapper;

use sunset_snapper;

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
    constraint fk_user_id foreign key (user_id) references users(user_id),
    constraint fk_username foreign key (username) references users(username)
);

create table users (
	user_id		int auto_increment not null,
    username	varchar(16) not null,
    password	varchar(16) not null,
    
    constraint pk_user_id primary key (user_id)
);

