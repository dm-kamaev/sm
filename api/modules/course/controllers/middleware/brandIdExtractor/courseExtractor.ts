const courseService = require('../../../services/course');

export const courseExtractor = async function(request, response, next) {
    const courseId = Number(request.body.id);
    let course;
    if (courseId) {
        course = await courseService.getById(courseId);
    }
    request.body.brandId = course ? course.brandId : request.body.brandId;
    next();
};
