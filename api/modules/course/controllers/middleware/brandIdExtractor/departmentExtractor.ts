const departmentService = require('../../../services/courseDepartment');

export const departmentExtractor = async function(request, response, next) {
    const departmentId = Number(request.body.id);
    let department;
    if (departmentId) {
        department = await departmentService.getById(departmentId);
    }
    request.body.brandId = department ?
        department.brandId :
        request.params.brandId;
    next();
};
