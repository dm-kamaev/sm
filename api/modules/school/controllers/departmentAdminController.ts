import {service as departmentService} from '../../geo/services/department';
import {departmentView} from '../../geo/views/departmentView';

import {LegacyController} from '../../../components/interface';

import {SchoolNotFound as SchoolNotFoundError} from './errors/SchoolNotFound';
import {DepartmentNotFound as DepartmentNotFoundError}
    from './errors/DepartmentNotFound';
import {AddressDoesNotExist as AddressDoesNotExistError}
    from './errors/AddressDoesNotExist';
import {AddressIsNotUnique as AddressIsNotUniqueError}
    from './errors/AddressIsNotUnique';
import {AddressDepartmentExist}
    from './errors/AddressDepartmentExist';

const Controller: LegacyController = require('nodules/controller').Controller;

class DepartmentAdminController extends Controller {
    public errors: Object;

    constructor() {
        super();

        this.errors = {
            SchoolNotFoundException: SchoolNotFoundError,
            DepartmentNotFoundException: DepartmentNotFoundError,
            AddressDoesNotExistException: AddressDoesNotExistError,
            AddressIsNotUniqueException: AddressIsNotUniqueError,
            AddressDepartmentExist
        };
    }

    /**
     * @api {get} /api/admin/school/:schoolId/department
     *     Get all school's departments
     * @apiVersion 1.0.0
     * @apiName getAllDepartments
     * @apiGroup School Department
     *
     * @apiParam {Number} schoolId School's id.
     *
     * @apiSuccess {Object[]} -                   Response body.
     * @apiSuccess {Number}   -.id                Id.
     * @apiSuccess {String}   -.name              Name.
     * @apiSuccess {Number[]} -.educationalGrades Studying classes.
     * @apiSuccess {Data}     -.updatedAt         Data of update.
     * @apiSuccess {String}   -.addressName       Address' name.
     *
     * @apiError (404) SchoolNotFound School with schoolId not found.
     */
    public async actionList(actionContext: any, schoolId: string) {
        const departments = await departmentService.getBySchoolId(
            Number(schoolId)
        );
        return departmentView.adminRenderList(departments);
    }

    /**
     * @api {get} /api/admin/school/:schoolId/department/:id
     *     Get department
     * @apiVersion 1.0.0
     * @apiName getDepartment
     * @apiGroup School Department
     *
     * @apiParam {Number} schoolId School's id.
     * @apiParam {Number} id       Department's id.
     *
     * @apiSuccess {Number}   id                Id.
     * @apiSuccess {String}   name              Name.
     * @apiSuccess {Number[]} educationalGrades Studying classes.
     * @apiSuccess {Data}     updatedAt         Data of update.
     * @apiSuccess {String}   addressName       Address' name.
     *
     * @apiError (404) DepartmentNotFound Department with given Id not found.
     */
    public async actionGet(
        actionContext: any, schoolId: string, id: string
    ) {
        const department = await departmentService.getById(Number(id));
        return departmentView.adminRender(department);
    }

    /**
     * @api {post} /api/admin/school/:schoolId/department
     *     Create department
     * @apiVersion 1.0.0
     * @apiName createDepartment
     * @apiGroup School Department
     *
     * @apiParam {Number} schoolId School's id.
     *
     * @apiParamExample {json} Request-Example:
     * {
     *     "addressName": "улица Воздвиженка, 4/7",
     *
     * }
     *
     * @apiParam {String}   name              Name.
     * @apiParam {Number[]} educationalGrades Studying classes.
     * @apiParam {String}   addressName       Address' name.
     *
     * @apiSuccessExample
     *     HTTP/1.1 201 OK
     *
     * @apiError (404) SchoolNotFound      School with schoolId not found.
     * @apiError (422) AddressDoesNotExist Specified address does not exist.
     * @apiError (422) AddressDepartmentExist
     *     Address already bind to another departhment
     */
    public async actionCreate(actionContext: any, schoolId: string) {
        const body = actionContext.request.body;
        actionContext.status = 201;
        return await departmentService.addDepartment(
            parseInt(schoolId, 10),
            body.addressName,
            body
        );
    }

    /**
     * @api {put} /api/admin/school/:schoolId/department/:id
     *     Update department
     * @apiVersion 1.0.0
     * @apiName updateDepartment
     * @apiGroup School Department
     *
     * @apiParam {number} schoolId School's id.
     * @apiParam {number} id       Department's id.
     *
     * @apiParam {String}   name              Name.
     * @apiParam {Number[]} educationalGrades Studying classes.
     * @apiParam {String}   addressName       Address' name.
     *
     * @apiSuccessExample
     *     HTTP/1.1 200 OK
     *
     * @apiError (404) DepartmentNotFound Department with given Id not found.
     * @apiError (422) AddressDoesNotExist Specified address does not exist.
     */
    public async actionUpdate(
        actionContext: any, schoolId: string, departmentId: string
    ) {
        const body = actionContext.request.body;
        return await departmentService.update(
            parseInt(departmentId, 10),
            body, {
                schoolId: parseInt(schoolId, 10),
                address: body.addressName.trim(),
            }
        );
    }

    /**
     * @api {delete} /api/admin/school/:schoolId/department/:id
     *     Delete department
     * @apiVersion 1.0.0
     * @apiName deleteDepartment
     * @apiGroup School Department
     *
     * @apiParam {Number} schoolId School's id.
     * @apiParam {Number} id       Department's id.
     *
     * @apiSuccessExample
     *     HTTP/1.1 204 OK
     *
     * @apiError (404) DepartmentNotFound Department with given Id not found.
     */
    public async actionDelete(
        actionContext: any, schoolId: string, id: string
    ) {
        await departmentService.delete(Number(id));
        actionContext.status = 204;
    }
}

export {DepartmentAdminController};
