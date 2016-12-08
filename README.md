## Структура проекта ##
Исходные файлы хранятся в соответствующих папках блоков в `app/blocks`.
После пулла не забываем прописывать `npm install`. Сервер запускается командой
`npm start`, галп - командой `gulp`.
В продакшн проект собирается с ключом `--production`.

## Управление скриптами через CLI ##
Появилась возможность использовать utility-скрипты из командной строки - для
этого используется модуль `commander`. Скрипты следует хранить в папке `console`
в корне проекта.

Настройки для каждого скрипта прописываются в самих скриптах и экспортируются
посредством `exports.Command`. Эти настройки необходимо вставить в файл
`commander.js`, находящийся в корне проекта посредством
`require('./console/scriptname.js').Command`.
Присваивать `require` переменной не нужно!

Скрипт можно запустить из корня проекта командой `node ./commander scriptname`
(или `npm run cli scriptname`, но в этом случае при использовании ключей перед
ними надо писать --).
Помощь генерируется автоматически на основе настроек из `Command`, вызывается
ключом `-h, --help`. `node ./commander -h` дает список существующих скриптов.
Доки: https://github.com/tj/commander.js

**TLDR:**  
`node commander -h` - список скриптов c описаниями  
`node commander **scriptname**` - запуск скрипта  

## Обновление места школы в рейтинге и поисковой таблицы ##
`node commander search`  
`node commander ranks`  
Чтобы добавить автоматическое обновление, нужно в терминале виртуалки набрать
`crontab -e` и дописать в конец файла  
`PATH=/usr/local/bin:/usr/bin:/bin:/usr/local/sbin:/usr/sbin:/sbin`  
`0 */12 * * * cd /home/gorod/l3_school-market/ &&
./console/cron/updateSearch.sh`  
`0 */12 * * * cd /home/gorod/l3_school-market/ && ./console/cron/updateRank.sh`
Для того, чтобы добавить автоматическую отправку уведомлений о новых
комментариях необходимо дописать:
`*/15 * * * * cd /home/gorod/l3_school-market/ &&
./console/cron/sendNotifications.sh`
где **/home/gorod/l3_school-market/** - путь к проекту на виртуалке.

## Список скриптов необходимых для работы фронтенда ##
updateSearch - актуализация поисковой таблицы  
## Одноразовые скрипты ##
В папке `console/one-off` находятся одноразовые скрипты, которые необходимо
запустить при разворачивании проекта. Запускаются скрипты с помощью ноды,
например: `node console/one-off/loadCourses.js`.  
**Список скриптов:**  
`loadCourses.js` – загрузка первоначальных курсов. Доступные аргументы:  
\-\-path – путь к папке с xlsx файлами, по умолчанию `assets/coursesData`;  
`clearCourses.js` – удаление всех данных о курсах;  
`categoryData.js` – загрузка метатегов для курсов. Доступные аргументы:  
\-\-path – путь к папке с xlsx файлами, по умолчанию
`assets/categorySeoData.json`;  
`courseStaticImages.js` – присваивание изображений курсам.
Доступные аргументы:  
\-\-path – путь к папке с xlsx файлами, по умолчанию
`app/blocks/n-course/cover-images`.
## Именование рейтингов у школы ##
**rank** - 1, 2, 3, 4, 4, 4, 4 - "Рейтинг пользователей мела", вычисляется по
средним оценкам  
**score** - [1,3,4,2], [2,4,5,1], [1,2.3,3,0] - средние оценки по группам.
Нули не считаются. Если стоит 0 - нет оценок  
**totalScore** - 3.2, 2.1, 0, 5 - Средняя оценка школы. ( avg(score) )  
**scoreCount** - [100, 0, 25, 80], [20, 40, 40, 81] - Количество оценок в
каждой категории. Нули не считаются  
**reviewCount** - 0, 92, 302 - Количество пользователей, давших оценку  
**rankDogm** - Ранк на сайте dogm.mos.ru  

## Тулзы ##
/apidoc - доки по запросам к бэкэнду  
/debug - удобная форма для теста запросов к бэкэнду. Требует собраные доки
(gulp doc)  
/doc - документация по проекту  

## Микросервис авторизации/сессии ##
Если есть необходимость в собственном конфиге, то создать папки **local** в
`app/config`, `environment/config/authorization` и `environment/config/user`.  
В **app/config/local** создать `config.db.json`, `config.json`,  
а в **environment/config/authorization/local** `config.json`.  
Структура файлов:  
**app/config/config.json**  
```javascript
{
    "port": 3000,
    "environment": "development",
    "url": {
        "protocol": "http",
        "host": "www21.lan"
    },
    "redirectUri": "www21.lan"
}
```  
**app/config/config.db.json**  
```javascript
{
    "host": "localhost",
    "port": "5432",
    "username": "gorod",
    "password": "123qwe",
    "database": "school_market",
    "dialect": "postgres"
}
```  
## nginx ##
Для того, чтобы доступ к одной node js был с двух хостов (schools.hostname.lan и
courses.hostname.lan), необходимо настроить nginx. Для этого нужно сделать копию
файла `environment/nginx/example.conf` в этой же папке с именем
`schools-local.conf` и поменять все переменные `%HOST_NAME%` на хост виртуальной
машины.  
Далее сделать symlink:
`ln -s %PATH_TO_PROJECT%/environment/nginx/schools-local.conf
/etc/nginx/sites-enabled/schools-local.conf`, где `%PATH_TO_PROJECT%` – путь к
проекту на виртуалке.  
Потом выполнить команду `sudo service nginx configtest` и если все ok, то
`sudo service nginx restart`.
## Миграции ##
Теперь все изменения в бд происходят через миграции. Чтобы накатить все
непримененные миграции следует выполнить **gulp migrate** на виртуалке.
**Внимание:** при первом применении миграций все таблицы в бд будут дропнуты
 и созданы с нуля.
 Если вы хотите каким-либо образом изменить структуру бд вам необходимо помимо
 изменения модели создать миграцию.
 Миграции лежат в api/modules/\*/migrations/. Число в начале - таймстамп времени
 создания.
 Он влияет на очередность применения миграций к бд, т.е туда руками надо вбить
 время создания чтобы миграция была последней в списке.
 Инфа по миграциям: http://docs.sequelizejs.com/en/latest/docs/migrations/

## Управление дампами бд ##
###### Запуск скрипта #####
`node commander dump`
###### Пароль от хоста ######
    gTgCuHrHuEnNnacpxStR
###### Дампы по http ######
http://repo.dfarm.lan/db/  
###### Как добавить свой ключ на хост и не вводить каждый раз пароль: ######
1) Убедиться, что у вас есть rsa ключ. Если его нет, то создать: https://help.github.com/articles/generating-ssh-keys/  
2) Забрать файл с допущенными ключами с хоста:
`scp uploader@repo.dfarm.lan:~/.ssh/authorized_keys ./`   
3) Записать туда свой публичный ключ: `cat ~/.ssh/id_rsa.pub >> authorized_keys`  
4) Закинуть файл с допущенными ключами обратно на сервер: `scp authorized_keys uploader@repo.dfarm.lan:~/.ssh/authorized_keys`  


## Cхема БД ##
https://wiki.cochanges.com/pages/viewpage.action?pageId=22085766  
При изменении структуры БД надо так же поменять assets/schema.er  


# Деплоймент на QA и продакшен

# Инициализация после установки пакета
QA:
```sh
sudo ln -s /etc/nginx/sites-available/schools /etc/nginx/sites-enabled/schools
```
Продакшен:
```sh
sudo ln -s /etc/nginx/sites-available/schools.mel.fm /etc/nginx/sites-enabled/schools.mel.fm
```

## Логи ошибок
Forever пишет такие логи:
* /opt/school-market/current/runtime/node.forever.log - Forever output
* /opt/school-market/current/runtime/node.out.log - stdout from app.js
* /opt/school-market/current/runtime/node.error.log - stderr from app.js

## logger
logger пишет в файл `/opt/school-market/current/runtime/node.forever.log`
сообщения уровней `WARN`, `ERROR` и `CRITICAL`

В dev-режиме дополнительно выводятся в консоль сообщения уровней `TRACE`,
`VERBOSE`, `DEBUG` и `INFO`

Для работы логгера **ОБЯЗАТЕЛЬНО** наличие директории `runtime` в корне проекта

## Advanced compilation ##
Для дебага скриптов в режиме Advanced compilation нужно запустить комманду
```sh
gulp debug
```
Для того, чтобы собрать отдельный лейаут можно воспользоваться параметром
`layout`
```sh
gulp debug --layout l-doc
```
или
```sh
gulp debug --layout l-doc.js
```
