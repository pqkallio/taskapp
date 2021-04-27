CREATE TABLE IF NOT EXISTS Note (
    id      serial primary key,
    title   varchar(100) NOT NULL,
    content varchar(6000) NOT NULL DEFAULT '',
    created timestamp NOT NULL,
    done    timestamp
);
