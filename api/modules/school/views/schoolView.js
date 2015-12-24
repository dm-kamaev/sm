var services = require.main.require('./app/components/services').all;

var schoolView = {};

/**
 * Default
 * @param {Object} schoolInstance
 */
schoolView.default = function(schoolInstance) {
    var data = {},
        sumScore = countSumScore(schoolInstance.ratings);

    var typeConvert = {
        'Parent': 'родитель',
        'Graduate': 'выпускник',
        'Scholar': 'ученик'
    };

    var ratings = [];
    /*Check that position in Mel's rating exists and less than 100*/
    if (schoolInstance.rating && schoolInstance.rating <= 100) {
        ratings.push({
            name: 'Рейтинг пользователей «Мела»',
            place: schoolInstance.rating,
            href: '/search'
        });
    }

    /*Check that position in Moscow education dept.
      rating exists and less than 100*/
    if (schoolInstance.rank && schoolInstance.rank <= 100) {
        ratings.push({
            name: 'Рейтинг Департамента образования Москвы',
            place: schoolInstance.rank
        });
    }

    var addresses =
            services.department.addressesFilter(schoolInstance.addresses),
        commentGroup = schoolInstance.commentGroup ?
            schoolInstance.commentGroup.comments : [],
        metroStations = getSchoolMetro(addresses);

    data = {
        id: schoolInstance.id,
        schoolName: schoolInstance.name,
        schoolType: '',
        schoolDescr: '',
        features: '',
        directorName: schoolInstance.director,
        schoolQuote : 'Мел',
        extendedDayCost: '',
        dressCode: '',
        classes: educationIntervalToString(schoolInstance.educationInterval),
        social:[],
        metroStations: Object.keys(metroStations)
            .map(function(key) {
                return metroStations[key];
            }),
        sites:[{
            name: 'Перейти на сайт школы',
            href: 'http://' + schoolInstance.site,
            link: schoolInstance.site
        }],
        activities: [],
        specializedClasses: [],
        contacts:{
            address: addresses.map(address => {
                return {
                    title: '',
                    description: address.name,
                    metro: address.metroStations.map(metro => {
                        return metro.name;
                    })
                };
            }),
            phones: schoolInstance.phones || ''
        },
        comments: commentGroup
            .filter(comment => comment.text)
            .map(comment => {
            return {
                author: '',
                rank: typeConvert[comment.userType],
                text: comment.text,
                sections: comment.rating ? comment.rating.score.map((score, index) => {
                    var type = [
                        'Образование',
                        'Преподаватели',
                        'Инфраструктура',
                        'Атмосфера'
                    ];
                    return {
                        name: type[index],
                        rating: score
                    };
                }) : []
            };
        }),
        coords: addresses.map(adr => {
            return {
                lat: adr.coords[0],
                lng: adr.coords[1]
            };
        }),
        ratings: ratings,
        score: sumScore,
        totalScore: sumScore.reduce((context, value) => {
            if (value) {
                context.sum += value;
                context.count++;
                context.res = context.sum / context.count;
            }
            return context;
        }, {
            sum: 0,
            count: 0,
            res: 0
        }).res
    };

    return data;
};

var countSumScore = function(ratings) {
    return ratings
        .map(rating => rating.score)
        .reduce((context, coords) => {
            coords.forEach((value, index) => {
                if (value) {
                    context.count[index]++;
                    context.sum[index] += value;
                    context.res[index] = context.sum[index] / context.count[index];
                }
            });

            return context;
        }, {
            sum: [0, 0, 0, 0],
            count: [0, 0, 0, 0],
            res: [0, 0, 0, 0]
        }).res;
};

var educationIntervalToString = (interval) => {
    var res = '';

    if (interval) {
        var begin = interval[0],
            end = interval[interval.length - 1];

        res += begin ? begin : 'Детский сад';

        if (end > begin) {
            res += '–';
            res += end;
            res += begin ? ' классы' : ' класс';
        }
    }

    return res;
};

var getSchoolMetro = (addresses) => {
    var metro = {};
    addresses.forEach(address => {
        address.metroStations.forEach(m => {
            metro[m.id] = m.name;
        });
    });
    return metro;
};

module.exports = schoolView;
