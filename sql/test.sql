INSERT INTO university VALUES (DEFAULT, 'МИЭМ') RETURNING *;
INSERT INTO comment_group VALUES (DEFAULT) RETURNING *;

INSERT INTO program_major VALUES (
 DEFAULT,
 'экономист',
 CURRENT_TIMESTAMP,
 CURRENT_TIMESTAMP
) RETURNING *;

INSERT INTO program VALUES
(
 DEFAULT,
 'Прикладная математика',
 62,
 'факультет прикладной математике',
 369,
 'something',
 '{http://yandex.ru/1,http://yandex.ru/2}',
 '{прикладная математика,химия}',
 1,
 1.2,
 12000,
'{100 отжиманий,рисование}',
 CURRENT_TIMESTAMP,
 CURRENT_TIMESTAMP,
 TRUE,
 1
) RETURNING *;

INSERT INTO program VALUES
(
 DEFAULT,
 'Экономика',
 62,
 'кафедра экономики',
 369,
 'somethng2',
 '{https://hse.ru/1,https://hse.ru/2}',
 '{математика,экономика}',
 1,
 1.2,
 12000,
'{иностранный язык,программирование}',
 CURRENT_TIMESTAMP,
 CURRENT_TIMESTAMP,
 FALSE,
 1
) RETURNING *;


INSERT INTO program_page VALUES
(
 DEFAULT,
 1,
 1,
 CURRENT_TIMESTAMP,
 CURRENT_TIMESTAMP
) RETURNING *;

INSERT INTO program_ege_exam VALUES
(
  DEFAULT,
  3,
  2,
  FALSE,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
) RETURNING *;

INSERT INTO entrance_statistic VALUES
(
  DEFAULT,
  3,
  1979
) RETURNING *;


INSERT INTO university_page VALUES
(
 DEFAULT,
 6,
 1,
 CURRENT_TIMESTAMP,
 CURRENT_TIMESTAMP
) RETURNING *;


INSERT INTO region VALUES(DEFAULT, 'центральный') RETURNING *;

UPDATE university SET
  name='Научно Исследовательский Институт Высшей Школы Экономики',
  abbreviation='НИУ ВШЭ МИЭМ',
  description='экономический вуз',
  image_url='http://hse.ru/image',
  links=ARRAY['http://hse.ru/1', 'http://hse.ru/2'],
  type='университет',
  military_department=TRUE,
  dormitory=FALSE,
  city_id=2,
  created_at=CURRENT_TIMESTAMP,
  updated_at=CURRENT_TIMESTAMP,
  relap_image_url='http://hse.ru/image_relap'
WHERE id=62 RETURNING *;


COPY university(id,name,abbreviation,description,image_url,links,military_department,dormitory,city_id,created_at,updated_at,relap_image_url)
FROM '/home/gorod/l3_school-market/assets/universities/university.csv'
WITH CSV HEADER DELIMITER '|';



INSERT INTO university_profile VALUES(DEFAULT, 64, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
INSERT INTO profile VALUES(1, 'экономика', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)


SELECT university.id
, university.name
 , university.abbreviation
 , city.name AS "cityName"
 , COUNT(program.id) AS "programCount"
 , university.updated_at AS "updatedAt"
 , university_profile.id
 FROM university
 LEFT JOIN city ON (university.city_id = city.id)
 LEFT JOIN program ON (university.id = program.university_id)
 GROUP BY university.id, city.name

-- ВЫТАШИТЬ ПРОФИЛИ ВУЗА
SELECT u.id, p.name FROM university as u
LEFT JOIN university_profile as up ON u.id = up.university_id
LEFT JOIN profile as p ON up.profile_id = p.id
WHERE u.id=64

INSERT INTO program_page_meta_information VALUES(DEFAULT, 12, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO page_meta_information VALUES(DEFAULT, 'TEST TITLE');


INSERT INTO program_page_meta_information VALUES(
  DEFAULT,
  12,
  'test_keywords',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP,
  'test_title',
  'test_description',
  'open_graph_description'
)


INSERT INTO program_ege_exam VALUES(
  DEFAULT,
  3,
  13,
  TRUE,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
) RETURNING *;

INSERT INTO program_ege_exam VALUES(
  DEFAULT,
  5,
  13,
  TRUE,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
) RETURNING *;

INSERT INTO program_ege_exam VALUES(
  DEFAULT,
  5,
  12,
  TRUE,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
) RETURNING *;

INSERT INTO program_ege_exam VALUES(
  DEFAULT,
  1,
  13,
  TRUE,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
) RETURNING *;

INSERT INTO program_ege_exam VALUES(
  DEFAULT,
  2,
  14,
  TRUE,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
) RETURNING *;

INSERT INTO program_ege_exam VALUES(
  DEFAULT,
  3,
  15,
  TRUE,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
) RETURNING *;


SELECT
  DISTINCT entity_id AS "entityId",
  entity_type AS "entityType"
FROM text_search_data
WHERE
  (entity_type IN ('course',
    'metro',
    'area',
    'district')
  ) AND (formatted_text LIKE '%pro%') LIMIT 10


INSERT INTO text_search_data VALUES(
  DEFAULT,
  12,
  'program',
  'прикладная математика',
  'Прикладная математика',
  'name',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
) RETURNING *;
INSERT INTO text_search_data VALUES(
  DEFAULT,
  13,
  'program',
  'экономика',
  'Экономика',
  'name',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
) RETURNING *;


SELECT * FROM university WHERE id > 120

SELECT * FROM university WHERE id = 130
SELECT COUNT(*) FROM university WHERE id > 120;

--  удалить универы
DELETE FROM university WHERE id > 120; ALTER SEQUENCE university_id_seq RESTART WITH 121; DELETE FROM page WHERE entity_id > 120 AND entity_type='university';
-- удалить города все кроме москвы и питера
DELETE FROM city WHERE id > 6; ALTER SEQUENCE city_id_seq RESTART WITH 5;
--  удалить программы
DELETE FROM program WHERE id > 19; ALTER SEQUENCE program_id_seq RESTART WITH 20; DELETE FROM page WHERE entity_id > 19 AND entity_type='program';
--  удалить статистику
DELETE FROM entrance_statistic WHERE id > 8; ALTER SEQUENCE entrance_statistic_id_seq RESTART WITH 9;
--  удалить егэ для программ
DELETE FROM program_ege_exam WHERE id > 26; ALTER SEQUENCE program_ege_exam_id_seq RESTART WITH 27;
-- удалить доп экзамены для программ
UPDATE program SET extra_exam = ARRAY[]::VARCHAR[]


SELECT
  u.abbreviation,
  p.name,
  p.extra_exam[1] as extra1,
  p.extra_exam[2] as extra2,
  p.extra_exam[3] as extra3,
  s.name as subject_name
FROM program_ege_exam as pee
LEFT JOIN program as p ON p.id = pee.program_id
LEFT JOIN university as u ON p.university_id = u.id
LEFT JOIN subject as s ON s.id = pee.subject_id
WHERE
  p.id IN (SELECT id FROM program as p WHERE id > 19 AND p.extra_exam[1] IS NOT NULL ORDER BY RANDOM() LIMIT 4);
-- WHERE p.id = 11469;

-- Прочекать программы
SELECT
  u.name as university_name,
  u.abbreviation,
  p.links,
  u.military_department,
  u.dormitory,
  c.name as city_name,
  p.name as program_name,
  p.description,
  p.comment_group_id,
  p.duration,
  pm.name as program_major,
  p.okso_code,
  p.extra_exam,
  es.year,
  es.competition,
  es.budget_places,
  es.commercial_places,
  es.cost,
  es.ege_pass_score
FROM program as p
LEFT JOIN university as u ON u.id = p.university_id
LEFT JOIN entrance_statistic as es ON p.id = es.program_id
LEFT JOIN program_major as pm ON p.program_major_id = pm.id
LEFT JOIN city as c ON u.city_id = c.id
WHERE p.id>19 AND es.year = 2016 ORDER BY RANDOM() LIMIT 10

-- проверить формат okso_code
SELECT okso_code FROM program WHERE id > 19 AND okso_code !~'^\d+\.\d+\.\d+$'


-- qa.lan похожие специальности
SELECT * FROM program WHERE id=27 OR id = 18
SELECT * FROM entrance_statistic WHERE program_id=18 OR program_id=27


SELECT * FROM
  course as c
LEFT JOIN course_option  as co ON co.course_id = c.id
LEFT JOIN course_schedule as cs ON co.id = cs.course_option_id
WHERE c.id=310


-- example: запрос на поиск по фильтрам
SELECT
  DISTINCT course_id
FROM course_search_data
WHERE
(course_search_data.type = 'age' AND course_search_data.values &&
ARRAY ['12']::INTEGER[] OR course_search_data.type = 'category' AND course_search_data.values &&
ARRAY ['1']::INTEGER[])
GROUP BY
  course_id
HAVING
 (COUNT(DISTINCT id) = 2)


SELECT * FROM course_search_data WHERE course_id=14;
INSERT INTO course_search_data VALUES(DEFAULT, 14, ARRAY[1,4], 'season', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO course_search_data VALUES(DEFAULT, 14, ARRAY[0], 'custom_region', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO course_search_data VALUES(DEFAULT, 14, ARRAY[0, 2], 'shift_duration', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

SELECT
  DISTINCT course_id
FROM course_search_data
WHERE (
  course_search_data.type = 'age' AND course_search_data.values &&  ARRAY ['12']::INTEGER[]  OR
  course_search_data.type = 'category' AND course_search_data.values && ARRAY ['1']::INTEGER[] OR
  course_search_data.type = 'season'  AND course_search_data.values &&  ARRAY ['1']::INTEGER[] OR
  course_search_data.type = 'custom_region' AND course_search_data.values &&  ARRAY ['0']::INTEGER[]
)
GROUP BY
  course_id
HAVING (COUNT(DISTINCT id) = 4)

UPDATE admin_user SET "accessAttributes"=jsonb_set("accessAttributes", '{brandId}', '"6"', false) where id=1;

-- удалить вузы некотрые
DELETE FROM  university WHERE id BETWEEN 109 AND 150;
DELETE FROM page WHERE entity_type='university' AND entity_id BETWEEN 109 AND 150;

SELECT * FROM university ORDER BY created_at DESC LIMIT 3;
SELECT * FROM page ORDER BY created_at DESC LIMIT 3

-- удалить university_profile
DELETE FROM university_profile; ALTER SEQUENCE university_profile_id_seq RESTART WITH 1;
--  удалить профили
DELETE FROM profile; ALTER SEQUENCE profile_id_seq RESTART WITH 1;


-- выташить МЭИ
SELECT * FROM university WHERE id=63; SELECT * FROM page WHERE entity_id=63 AND entity_type='university';
-- вытащить для МЭИ программы
SELECT
  p.name,
  page.alias
FROM program as p
LEFT JOIN page ON p.id=page.entity_id
WHERE
  p.university_id=63 AND
  p.program_major_id=9 AND
  page.entity_type='program'

+--------------------------------------------------------------+---------------------------------------------------------------+
| name                                                         | alias                                                         |
|--------------------------------------------------------------+---------------------------------------------------------------|
| Автоматизированные системы обработки информации и управления | avtomatizirovannye-sistemy-obrabotki-informacii-i-upravlenija |
| Вычислительные машины, комплексы, системы и сети             | vychislitelnye-mashiny%2C-kompleksy%2C-sistemy-i-seti         |
| Прикладная информатика в экономике                           | prikladnaja-informatika-v-ekonomike                           |
+--------------------------------------------------------------+---------------------------------------------------------------+



--  удалить универы
DELETE FROM university; ALTER SEQUENCE university_id_seq RESTART WITH 1; DELETE FROM page WHERE entity_type='university';
-- удалить города все кроме москвы и питера
DELETE FROM city WHERE id > 2; ALTER SEQUENCE city_id_seq RESTART WITH 3;
--  удалить программы
DELETE FROM program; ALTER SEQUENCE program_id_seq RESTART WITH 1; DELETE FROM page WHERE entity_type='program';
--  удалить статистику
DELETE FROM entrance_statistic; ALTER SEQUENCE entrance_statistic_id_seq RESTART WITH 1;
--  удалить егэ для программ
DELETE FROM program_ege_exam; ALTER SEQUENCE program_ege_exam_id_seq RESTART WITH 1;


-- где 3 экзамена и проходной 150 или меньше
SELECT res.subject_id FROM
  (SELECT
    p.id,
    p.name,
    p.university_id,
    pee.subject_id,
    -- COUNT(pee.subject_id),
    -- u.name as university_name,
    es.ege_pass_score
  FROM program as p
  -- LEFT JOIN university as u ON p.university_id = u.id
  LEFT JOIN program_ege_exam as pee ON p.id = pee.program_id
  LEFT JOIN entrance_statistic as es ON p.id = es.program_id
  WHERE es.ege_pass_score <= 150) as res
GROUP BY res.subject_id
-- HAVING COUNT(res.subject_id) =3


SELECT
    p.id,
    p.name,
    p.university_id,
    COUNT(p.id),
    u.name as university_name,
    es.ege_pass_score
FROM program as p
LEFT JOIN university as u ON p.university_id = u.id
LEFT JOIN program_ege_exam as pee ON p.id = pee.program_id
LEFT JOIN entrance_statistic as es ON p.id = es.program_id
WHERE es.ege_pass_score <= 150
GROUP BY
    p.id,
    p.name,
    p.university_id,
    u.name,
    es.ege_pass_score
HAVING COUNT(p.id)=3
LIMIT 5


-- SELECT COUNT(*) FROM (SELECT
-- ..............     p.id,
-- ..............     p.name,
-- ..............     p.university_id,
-- ..............     COUNT(p.id),
-- ..............     u.name as university_name,
-- ..............     es.ege_pass_score
-- .............. FROM program as p
-- .............. LEFT JOIN university as u ON p.university_id = u.id
-- .............. LEFT JOIN program_ege_exam as pee ON p.id = pee.program_id
-- .............. LEFT JOIN entrance_statistic as es ON p.id = es.program_id
-- .............. WHERE es.ege_pass_score <= 150
-- .............. GROUP BY
-- ..............     p.id,
-- ..............     p.name,
-- ..............     p.university_id,
-- ..............     -- pee.subject_id,
-- ..............     u.name,
-- ..............     es.ege_pass_score
-- .............. HAVING COUNT(p.id)=3) as res