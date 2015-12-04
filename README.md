## Структура проекта ##
Исходные файлы хранятся в соответствующих папках блоков в `app/blocks`.
После пулла не забываем прописывать `npm install`. Сервер запускается командой `npm start`,
галп - командой `gulp`.
В продакшн проект собирается с ключом `--production`.

## Управление скриптами через CLI ##
Появилась возможность использовать utility-скрипты из командной строки - для
этого используется модуль `commander`. Скрипты следует хранить в папке `console`
в корне проекта.

Настройки для каждого скрипта прописываются в самих скриптах и экспортируются
посредством `exports.Command`. Эти настройки необходимо вставить в файл `commander.js`,
находящийся в корне проекта посредством `require('./console/scriptname.js').Command`.
Присваивать `require` переменной не нужно!

Скрипт можно запустить из корня проекта командой `node ./commander scriptname`
(или `npm run cli scriptname`, но в этом случае при использовании ключей перед ними надо писать --).
Помощь генерируется автоматически на основе настроек из `Command`, вызывается ключом `-h, --help`.
`node ./commander -h` дает список существующих скриптов.
Доки: https://github.com/tj/commander.js

**TLDR:**  
`node commander -h` - список скриптов c описаниями  
`node commander **scriptname**` - запуск скрипта  

## Список скриптов необходимых для работы фронтенда ##
parse - парсинг экселевского файла с школами  
geocord - получение координат для адресов школ  
~~metro - получение ближайших станций метро для адресов~~  
updateSearch - актуализация поисковой таблицы  


## Тулзы ##
/apidoc - доки по запросам к бэкэнду  
/debug - удобная форма для теста запросов к бэкэнду. Требует собраные доки (gulp doc)  
/doc - документация по проекту  
 
## Миграции ##
Теперь все изменения в бд происходят через миграции. Чтобы накатить все 
непримененные миграции следует выполнить **gulp migrate** на виртуалке. 
**Внимание:** при первом применении миграций все таблицы в бд будут дропнуты
 и созданы с нуля.
 Если вы хотите каким-либо образом изменить структуру бд вам необходимо помимо изменения модели создать миграцию.
 Миграции лежат в api/modules/\*/migrations/. Число в начале - таймстамп времени создания. 
 Он влияет на очередность применения миграций к бд, т.е туда руками надо вбить время создания чтобы миграция была последней в списке.
  Инфа по миграциям: http://docs.sequelizejs.com/en/latest/docs/migrations/

## Дампы БД ##
`node commander dump` позволяет создавать дампы бд привязаные к ветке к гите и переключаться между ними

## Cхема БД ##
https://wiki.cochanges.com/pages/viewpage.action?pageId=22085766  
При изменении структуры БД надо так же поменять assets/schema.er  
