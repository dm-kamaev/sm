'use strict';

const await = require('asyncawait/await');
const async = require('asyncawait/async');
const squel = require('squel');
const sequelize = require('../../app/components/db');

module.exports = {
    up: async(function() {
        var sqlQuery = squel.update()
            .table('school')
            .set('director', 'Евдокимов Евгений Олегович')
            .where('id = 420')
            .toString() + '; ';

        sqlQuery += squel.update()
            .table('address')
            .set('name', 'Глебовская улица, дом 10Б')
            .where('id = 2570')
            .toString() + '; ';

        sqlQuery += squel.delete()
            .from('department')
            .where('id = 3848')
            .toString() + '; ';

        sqlQuery += squel.insert()
            .into('department')
            .set('address_id', 4316)
            .set('stage', 'Дошкольное образование')
            .toString() + ';';



        await(sequelize.query(sqlQuery));

        var createAddressQuery = squel.insert()
            .into('address')
            .set('name', '7-я северная, дом 13, строение 1')
            .set('coords', '{55.938052, 37.549714}')
            .set('school_id', 644)
            .set('area_id', 87)
            .set('is_school', true)
            .toString() + ' RETURNING *;';

        var addresses = await(sequelize.query(
            createAddressQuery,
            {
                type: sequelize.QueryTypes.INSERT
            }
        ));
        var addressId = addresses[0].id;
        var createDepartmentQuery = squel.insert()
            .into('department')
            .set('stage', 'Основное и среднее')
            .set('address_id', addressId)
            .toString() + ';';
        await(sequelize.query(createDepartmentQuery));
        sqlQuery = squel.update()
            .table('school')
            .set('director', 'Фишбейн Дмитрий Ефимович')
            .set('education_interval', '{10, 11}')
            .where('id = 656')
            .toString() + '; ';
        await(sequelize.query(sqlQuery));

        createAddressQuery = squel.insert()
            .into('address')
            .set('name', 'Живописная улица, дом 11, корпус 3')
            .set('coords', '{55.784972, 37.451752}')
            .set('school_id', 127)
            .set('area_id', 77)
            .set('is_school', true)
            .toString() + ' RETURNING *;';

        addresses = await(sequelize.query(
            createAddressQuery,
            {
                type: sequelize.QueryTypes.INSERT
            }
        ));
        addressId = addresses[0].id;
        createDepartmentQuery = squel.insert()
            .into('department')
            .set('stage', 'Начальное образование')
            .set('address_id', addressId)
            .toString() + ';';
        await(sequelize.query(createDepartmentQuery));

        sqlQuery = squel.insert()
            .into('department')
            .set('stage', 'Основное и среднее')
            .set('address_id', 600)
            .toString() + ';';

        sqlQuery += squel.update()
            .table('school')
            .set(
                'specialized_classes',
                '{{10, Медицинский}, ' +
                '{10, Инженерный}, ' +
                '{10, Экономико-правовой},' +
                '{10, Гуманитарный},' +
                '{10, Кадетский},' +
                '{10, Лингвистический},' +
                '{10, Информационные технологии},' +
                '{10, Инженерный дизайн},' +
                '{10, Социально-гуманитарный},' +
                '{10, Востоковедение},' +
                '{10, Социально-экономический},' +
                '{10, Психологический},' +
                '{1, Английский язык},' +
                '{1, Китайский язык},' +
                '{5, Английский язык},' +
                '{5, Китайский язык},' +
                '{5, Кадетский}}'
            )
            .where('id = 127')
            .toString() + ';';

        await(sequelize.query(sqlQuery));
    }),
    down: async(function(queryInterface) {

    })
};
