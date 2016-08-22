const ONLINE = {
    true: 'only',
    false: null,
    null: 'available'
};

/**
 * @param {Array<Object>} courses
 * @return {Object}
 */
exports.list = function(courses) {
    return courses.reduce((prev, curr, i) => {
        var coursePosition = prev.findIndex(course => course.id === curr.id);
        if (coursePosition !== -1) {
            var foundCourse = prev[coursePosition],
                foundCost = foundCourse.cost,
                foundOnline = foundCourse.online;

            if (curr.optionCost < foundCost) {
                foundCourse.cost = curr.optionCost;
            }
            if (foundOnline === false && curr.optionOnline !== ONLINE.false) {
                foundCourse.online = ONLINE.null;
            } else if (
                foundOnline === true && curr.optionOnline !== ONLINE.true
            ) {
                foundCourse.online = ONLINE.null;
            }

            if (!foundCourse.area.find(area => area.id === curr.areaId)) {
                foundCourse.area.push({
                    id: curr.areaId,
                    name: curr.areaName
                });
            }
            if (!foundCourse.metro.find(metro => metro.id === curr.metroId)) {
                foundCourse.metro.push({
                    id: curr.metroId,
                    name: curr.metroName
                });
            }
        } else {
            prev.push({
                id: curr.id,
                name: {light: curr.name},
                description: curr.description,
                brand: curr.brand,
                score: {
                    marks: {
                        primary: {
                            name: 'Средняя оценка',
                            value: curr.totalScore
                        }
                    }
                },
                cost: curr.optionCost,
                online: ONLINE[curr.optionOnline],
                metro: [{
                    id: curr.metroId,
                    name: curr.metroName
                }],
                area: [{
                    id: curr.areaId,
                    name: curr.areaName
                }]
            });
        }
        return prev;
    }, []);
};
