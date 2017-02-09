export const departmentExtractor = function(request, response, next) {
    request.body.brandId = request.params.brandId;
    next();
};
