const courseService = require('../../../services/course');

export const optionExtractor = async function(request, response, next) {
    const course = await courseService.getById(request.body.courseId);
    request.body.brandId = course.brandId;
    next();
};
