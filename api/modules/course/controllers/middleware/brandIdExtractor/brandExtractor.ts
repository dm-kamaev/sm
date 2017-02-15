export const brandExtractor = function(request, response, next) {
    request.body.brandId = request.body.id;
    next();
};
