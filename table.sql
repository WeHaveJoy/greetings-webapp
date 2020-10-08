create table greeting_t (
	id serial not null primary key,
    name text not null,
	counter int default 0
);