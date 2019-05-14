create table role
(
    id          serial      not null
        constraint role_pkey
            primary key,
    name        varchar(20) not null,
    permissions json        not null,
    rid int        not null
);

alter table role
    owner to gem;

INSERT INTO public.role (id, name, permissions, rid) VALUES (3, 'gbc', '{"user_list": 1, "user_create": 1}', 3);
INSERT INTO public.role (id, name, permissions, rid) VALUES (2, 'secretary', '{"user_list": 1, "user_create": 1, "user_edit": 1}', 4);
INSERT INTO public.role (id, name, permissions, rid) VALUES (1, 'admin', '{"all": 1}', 1);
create table "user"
(
    id              serial       not null
        constraint user_pkey
            primary key,
    username        varchar(250) not null,
    full_name       varchar(250),
    email           varchar(50)  not null,
    hashed_password varchar(100) not null,
    disabled        boolean      not null,
    role_id         serial       not null
);

alter table "user"
    owner to gem;

INSERT INTO public."user" (id, username, full_name, email, hashed_password, disabled, role_id) VALUES (1, 'admin', 'Admin', 'admin@example.com', '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', false, 1);
INSERT INTO public."user" (id, username, full_name, email, hashed_password, disabled, role_id) VALUES (2, 'secretary', 'John Smith', 'secretary@example.com', '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', false, 2);