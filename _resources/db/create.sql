create table role
(
    id          serial      not null
        constraint role_pk
            primary key,
    name        varchar(20) not null,
    permissions json        not null
);

alter table role
    owner to gem;

INSERT INTO public.role (id, name, permissions) VALUES (1, 'admin', '{"all": 1}');
INSERT INTO public.role (id, name, permissions) VALUES (2, 'guest', '{}');

create table "user"
(
    id              serial       not null
        constraint user_pkey
            primary key,
    username        varchar(250) not null,
    full_name       varchar(250),
    email           varchar(50)  not null,
    hashed_password varchar(100) not null,
    disabled        boolean      not null
);

alter table "user"
    owner to gem;

INSERT INTO public."user" (id, username, full_name, email, hashed_password, disabled) VALUES (0, 'Secretary', 'Secretary', 'johndoe@example.com', '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', false);