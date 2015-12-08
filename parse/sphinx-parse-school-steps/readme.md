Организация файлов:
Скрипты лежат в корне, файлы с данными - в папке base.


Скрипты:
compare-school-path
Сравнивает адреса сайтов учреждений из БД с адресами сайтов из данных, которые отдает mskobr.ru через sphinx по запросу:

http://map.production.mskobr.ru/api/eduoffices/sphinx.json?area=&by_legal=1&district=&limit=1330&metro=&page=1&program=-1,1,2,3,4,5,6,7,8,9&search=

Поле program в запросе, содержит указание на поиск по всем сткпеням образования.
Также уточняется поле limit.


Файлы с данными:
sphinx-data-school-steps.json
содержит json данные, полученные с сайта mskobr.ru

compare-school-path.json
содержит результат сравнения данных из БД с данными из sphinx-data-school-steps.json


Для преобразования json в xlsx использовался on-line converter:
http://www.convertcsv.com/json-to-csv.htm