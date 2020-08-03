CREATE TABLE IF NOT EXISTS landmarks (
    id serial PRIMARY KEY,
    id_landmark INTEGER NOT NULL,
    name_landmark VARCHAR NOT NULL UNIQUE,
    info VARCHAR NOT NULL,
    year_landmark INTEGER NOT NULL
);