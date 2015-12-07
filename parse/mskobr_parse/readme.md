Организация файлов:
Скрипты лежат в корне, файлы с данными - в папке base.


Скрипты:
get-html.js
отправляет запросы на сайт mskobr.ru для получения html данных по адресам из БД.
В файл html-data-from-site.json записывается строка, содержащая html и host сайтов, которые разделены набором симолов для дальнейшей обработки.

parse-html.js
Парсит данные из html-data-from-site.json
Выбирается информация о названиях зданий учреждений, их адреса и ступени образования.
Результат записывается в parse-html-data.json

parse-data.js
сравнивает данные из parse-html-data.json с данными БД.
Результат записывается в compare-addresses.json


Файлы с данными:
html-data-from-site.json
содержит html данные с сайта mskobr.ru

parse-html-data.json
содержит данные о названиях зданий учреждений, их адреса и ступени образования, полученные из html-data-from-site.json

compare-addresses.json
содержит результат сравнения данных из parse-html-data.json и данными БД.

Для преобразования json в xlsx использовался on-line converter:
http://www.convertcsv.com/json-to-csv.htm