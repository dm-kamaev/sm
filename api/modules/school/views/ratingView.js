var ratingView = {};

/**
 * Rating view for school page
 * @param {number} rankMel
 * @param {number} rankDogm
 * @return {array<object>}
 */

ratingView.ratingSchoolView = function(rankMel, rankDogm) {
    var ratings = [];
    if (checkPlace(rankMel)) {
        ratings.push({
            name: 'Рейтинг пользователей «Мела»',
            place: rankMel,
            href: '/school'
        });
    }

    if (checkPlace(rankDogm)) {
        ratings.push({
            name: 'Рейтинг Департамента образования Москвы',
            place: rankDogm
        });
    }
    return ratings;
};


/**
 * Rating view for resuts page
 * @param {number} rankDogm
 * @return {array<string>}
 */
ratingView.ratingResultView = function(rankDogm) {
    var ratings = [];
    if (checkPlace(rankDogm)) {
        ratings.push({
            name: '100 лучших школ Москвы'
        });
    }
    return ratings;
};


/**
 * Check that position in rating exists and less than 100
 * @param {number} rank
 * @return {boolean}
 */
var checkPlace = function(rank) {
    return (rank <= 100 && rank);
};

module.exports = ratingView;
