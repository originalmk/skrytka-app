DROP TABLE IF EXISTS osp_unit CASCADE;
CREATE TABLE osp_unit (
    id SERIAL PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    locality VARCHAR(64) NOT NULL CHECK(locality SIMILAR TO '[A-ZĄĆĘŁŃÓŚŹŻ][A-zĄĆĘŁŃÓŚŹŻząćęłńóśźż. ]+')
);

DROP TABLE IF EXISTS fire_truck CASCADE;
CREATE TABLE fire_truck (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    image_path VARCHAR(128) CHECK(image_path ~ '^([0-9a-z_]+/?)*[0-9a-z_]+\.((png)|(jpg)|(jpeg)|(webp))$'),
    osp_unit_id INTEGER NOT NULL REFERENCES osp_unit ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS truck_side CASCADE;
CREATE TABLE truck_side (
    id SERIAL PRIMARY KEY,
    image_path VARCHAR(128) NOT NULL CHECK(image_path ~ '^([0-9a-z_]+/?)*[0-9a-z_]+\.((png)|(jpg)|(jpeg))$'),
    ordinal_number INTEGER NOT NULL,
    fire_truck_id INTEGER REFERENCES fire_truck ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS cache CASCADE;
CREATE TABLE cache (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64),
    rectangle BOX NOT NULL CHECK(
        (rectangle[0])[0] <= 1 AND (rectangle[0])[0] >= 0 AND
        (rectangle[0])[1] <= 1 AND (rectangle[0])[1] >= 0 AND
        (rectangle[1])[0] <= 1 AND (rectangle[1])[0] >= 0 AND
        (rectangle[1])[1] <= 1 AND (rectangle[1])[1] >= 0
    ),
    truck_side INTEGER NOT NULL REFERENCES truck_side ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS account CASCADE;
CREATE TABLE account (
    nickname VARCHAR(32) CHECK(nickname SIMILAR TO '[0-9A-z_żółćęśąźńŻÓŁĆĘŚĄŹŃ]{3,}') PRIMARY KEY,
    name VARCHAR(32) CHECK(name SIMILAR TO '[A-ZŻÓŁĆĘŚĄŹŃ][a-zżółćęśąźń]+'),
    surname VARCHAR(64) CHECK(surname SIMILAR TO '[A-ZŻÓŁĆĘŚĄŹŃ][a-zżółćęśąźń]+'),
    pass_hash CHAR(72) NOT NULL, -- Tu należy dostosować odpowiednio dla wybranego sposobu hashowania
    default_osp INTEGER REFERENCES osp_unit ON DELETE SET NULL ON UPDATE CASCADE
);

DROP TABLE IF EXISTS equipment CASCADE;
CREATE TABLE equipment (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL CHECK(LENGTH(name) > 0),
    cache_id INTEGER NOT NULL REFERENCES cache ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS score;
CREATE TABLE score (
    id SERIAL PRIMARY KEY,
    account_nickname VARCHAR(32) REFERENCES account ON DELETE CASCADE ON UPDATE CASCADE,
    acquisition_timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    fire_truck_id INTEGER NOT NULL REFERENCES fire_truck ON DELETE CASCADE ON UPDATE CASCADE,
    points INTEGER NOT NULL CHECK(points BETWEEN 0 AND 10),
    seconds INTEGER NOT NULL CHECK(seconds > 0)
);

DROP TABLE IF EXISTS permission CASCADE;
CREATE TABLE permission (
    code VARCHAR(64) CHECK(code ~ '^[0-9A-Z_]{3,}$') PRIMARY KEY,
    name VARCHAR(64) CHECK(LENGTH(name) >= 3),
    description VARCHAR(128)
);

-- PYTANIE: Czy aktualizować permission code przy zmianie czy na NULL?
DROP TABLE IF EXISTS accounts_permissions CASCADE;
CREATE TABLE accounts_permissions (
    account_nickname VARCHAR(32) REFERENCES account ON DELETE CASCADE ON UPDATE CASCADE,
    permission_code VARCHAR(64) REFERENCES permission ON DELETE CASCADE ON UPDATE CASCADE,
    osp_unit_id INTEGER REFERENCES osp_unit ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT pk_users_permissions PRIMARY KEY (account_nickname, permission_code, osp_unit_id)
);

DROP TABLE IF EXISTS event CASCADE;
CREATE TABLE event (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL CHECK(LENGTH(name) >= 3),
    details VARCHAR(128),
    report_time TIMESTAMP WITH TIME ZONE
        CHECK(report_time <= NOW() AND DATE_PART('hour', CURRENT_TIMESTAMP - report_time) < 1),
    -- Chcemy zachować spójność dziennika zdarzeń, nawet jak użytkownik usunie konto:
    account_nickname VARCHAR(32) REFERENCES account ON DELETE SET NULL ON UPDATE CASCADE,
    osp_unit_id INTEGER REFERENCES osp_unit ON DELETE CASCADE ON UPDATE CASCADE
);