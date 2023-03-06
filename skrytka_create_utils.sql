DROP VIEW IF EXISTS units_list;
CREATE VIEW units_list AS
    SELECT id, name, locality FROM osp_unit;
 
DROP FUNCTION IF EXISTS get_units_list;
CREATE FUNCTION get_units_list(prefix VARCHAR) RETURNS TABLE (id INTEGER, name VARCHAR, locality VARCHAR)
AS
$func$
    SELECT * FROM units_list
    WHERE LOWER(locality) LIKE LOWER('%' || prefix || '%')
       OR LOWER(name) LIKE LOWER('%' || prefix || '%')
    ORDER BY locality, name LIMIT 3;
$func$
LANGUAGE SQL;

DROP FUNCTION IF EXISTS get_trucks_list_with_scores;
CREATE FUNCTION get_trucks_list_with_scores(osp_unit INTEGER, nickname VARCHAR, last_scores_num INTEGER = 3)
    RETURNS TABLE (id INTEGER, name VARCHAR, image_path VARCHAR, avg_percent FLOAT) AS
$func$
    SELECT ft.id, name, image_path, ROUND(AVG(s.points) * 10, 2) AS avg_percent
    FROM fire_truck ft
    JOIN score s ON ft.id = s.fire_truck_id AND s.account_nickname = nickname
    WHERE ft.osp_unit_id = osp_unit AND s.id IN (
        SELECT sc.id FROM score sc
        WHERE sc.account_nickname = nickname AND sc.fire_truck_id = ft.id
        ORDER BY sc.acquisition_timestamp DESC
        LIMIT last_scores_num
    ) GROUP BY ft.id, name, image_path
    UNION
    (SELECT ft.id, name, image_path, 0
        FROM fire_truck ft
        WHERE ft.osp_unit_id = osp_unit AND
            ft.id NOT IN (SELECT fire_truck_id FROM score WHERE account_nickname = nickname))
    ORDER BY 1;
$func$
LANGUAGE SQL;

DROP FUNCTION IF EXISTS get_quiz_data_for_truck;
CREATE FUNCTION get_quiz_data_for_truck(truck_id INTEGER)
    RETURNS TABLE (side_id INTEGER, side_image_path VARCHAR, cache_id INTEGER,
        cache_rectangle BOX, cache_name VARCHAR) AS
$func$
    SELECT ts.id, ts.image_path, c.id, c.rectangle, c.name
    FROM fire_truck
        JOIN truck_side ts on fire_truck.id = ts.fire_truck_id
        JOIN cache c on ts.id = c.truck_side
    WHERE fire_truck.id = truck_id
    ORDER BY ts.ordinal_number;
$func$
LANGUAGE SQL;

DROP FUNCTION IF EXISTS get_random_question;
CREATE FUNCTION get_random_question(truck_id INTEGER)
    RETURNS TABLE (cache_id INTEGER, equipment_name VARCHAR) AS
$func$
    SELECT c.id, e.name
    FROM truck_side ts
    JOIN cache c on ts.id = c.truck_side
    JOIN equipment e on c.id = e.cache_id
    WHERE ts.fire_truck_id = truck_id
    ORDER BY RANDOM()
    LIMIT 1;
$func$
LANGUAGE SQL;

DROP VIEW IF EXISTS trucks_list;
CREATE VIEW trucks_list AS
    SELECT id, name, image_path FROM fire_truck;