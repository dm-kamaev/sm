var MultiGeocoder = require('multi-geocoder');
var modules = require.main.require('./api/modules');
var commander = require('commander');
var geocoder = new MultiGeocoder({ coordorder: 'latlong', lang: 'ru-RU' });

var start = () => {
    var School = modules.school.models.School;
    School.findAll().then(schools => {
        console.log('\nPatience, my friend');
        schools.forEach(school => {
            var cordArr = [],
                adressArr = school.addresses;
            geocoder.geocode(adressArr).then(res => {
                res.result.features.forEach(item => cordArr.push(item.geometry.coordinates));
                school.update({coords:cordArr}).then();
            });
        })
    });
}
commander
     .command('geocord')
     .description('gets cords from yandex api')
     .action(() => start());
