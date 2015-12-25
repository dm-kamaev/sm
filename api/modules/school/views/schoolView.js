var services = require.main.require('./app/components/services').all;

var schoolView = {};

/**
 * Default
 * @param {Object} schoolInstance
 */
schoolView.default = function(schoolInstance) {

    var addresses =
            services.department.addressesFilter(schoolInstance.addresses),
        comments = schoolInstance.commentGroup ?
            schoolInstance.commentGroup.comments : [],
        score = schoolInstance.score || [0, 0, 0, 0];

    return {
        id: schoolInstance.id,
        schoolName: schoolInstance.name,
        schoolType: schoolInstance.schoolType,
        schoolDescr: '',
        features: [],
        directorName: schoolInstance.director,
        schoolQuote : 'Мел',
        extendedDayCost: '',
        dressCode: '',
        classes: getEducationInterval(schoolInstance.educationInterval),
        social: [],
        metroStations: services.address.getMetro(addresses),
        sites: getSites(schoolInstance.site),
        activities: [],
        specializedClasses: [],
        contacts: getContacts(addresses,schoolInstance.phones),
        comments: getComments(comments),
        coords: services.address.getCoords(addresses),
        ratings: getRatings(schoolInstance.rating, schoolInstance.rank),
        score: score,
        totalScore: getTotalScore(score)
    };
};

/**
 *  @param {array<number>} interval
 *  @return {string}
 */
var getEducationInterval = function(interval) {
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

/**
 *  @param {string} site
 *  @return {array<object>}
 */
var getSites = function(site) {
    return [{
        name: 'Перейти на сайт школы',
        href: 'http://' + site,
        link: site
    }];
};

/**
 *  @param {array<object>} addresses
 *  @param {array<string>} phones
 *  @return {object}
 */
var getContacts = function(addresses, phones) {
    return {
        address: getAddress(addresses),
        phones: phones || ''
    };
};

/**
 *  @param {array<object>} addresses
 *  @return {array<object>}
 */
var getAddress = function(addresses) {
    return addresses.map(address => {
        return {
            title: '',
            description: address.name,
            metro: services.address.getMetro(address)
        };
    });
};

/**
 *  @param {array<object>} comments
 *  @return {array<object>}
 */
var getComments = function(comments) {
    var typeConvert = {
        'Parent': 'родитель',
        'Graduate': 'выпускник',
        'Scholar': 'ученик'
    };

    return comments
        .filter(comment => comment.text)
        .map(comment => {
            return {
                author: '',
                rank: typeConvert[comment.userType],
                text: comment.text,
                sections: getSections(comment.rating)
            };
        });
};

/**
 *  @param {array<object>} rating
 *  @return {array<object>}
 */
var getSections = function(rating) {
    return rating ? rating.score.map((score, index) => {
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
    }) : [];
};

/**
 *  @param {number} rating
 *  @param {number} rank
 *  @return {array<object>}
 */
var getRatings = function(rating, rank) {
    var ratings = [];
    /*Check that position in Mel's rating exists and less than 100*/
    if (rating && rating <= 100) {
        ratings.push({
            name: 'Рейтинг пользователей «Мела»',
            place: rating,
            href: '/search'
        });
    }

    /*Check that position in Moscow education dept.
      rating exists and less than 100*/
    if (rank && rank <= 100) {
        ratings.push({
            name: 'Рейтинг Департамента образования Москвы',
            place: rank
        });
    }

    return ratings;
};

/**
 *  @param {array<number>} score
 *  @return {number}
 */
var getTotalScore = function(score) {
    return score.reduce((context, value) => {
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
    }).res;
};

module.exports = schoolView;
