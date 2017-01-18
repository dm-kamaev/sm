import departmentService from '../../geo/services/department';
import departmentView from '../../geo/views/departmentView';

import {LegacyController} from '../../../components/interface';

import SchoolNotFoundError from './errors/SchoolNotFound';
import DepartmentNotFoundError from './errors/DepartmentNotFound';
import AddressDoesNotExistError from './errors/AddressDoesNotExist';
import AddressIsNotUniqueError from './errors/AddressIsNotUnique';

const Controller: LegacyController = require('nodules/controller').Controller;

class DepartmentAdminController extends Controller {
    public errors: Object;

    constructor() {
        super();

        this.errors = {
            SchoolNotFoundException: SchoolNotFoundError,
            DepartmentNotFoundException: DepartmentNotFoundError,
            AddressDoesNotExistException: AddressDoesNotExistError,
            AddressIsNotUniqueException: AddressIsNotUniqueError
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
    async actionList(actionContext: any, schoolId: number) {
        let departments = await departmentService.getBySchoolId(schoolId);
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
    async actionGet(
        actionContext: any, schoolId: number, id: number
    ) {
        let department = await departmentService.getById(id);
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
     * @apiParam {String}   name              Name.
     * @apiParam {Number[]} educationalGrades Studying classes.
     * @apiParam {String}   addressName       Address' name.
     *
     * @apiSuccessExample
     *     HTTP/1.1 201 OK
     *
     * @apiError (404) SchoolNotFound      School with schoolId not found.
     * @apiError (422) AddressDoesNotExist Specified address does not exist.
     */
    async actionCreate(actionContext: any, schoolId: number) {
        let body = actionContext.request.body;
        actionContext.status = 201;
        return await departmentService.addDepartment(
            schoolId,
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
     *     HTTP/1.1 204 OK
     *
     * @apiError (404) DepartmentNotFound Department with given Id not found.
     * @apiError (422) AddressDoesNotExist Specified address does not exist.
     */
    async actionUpdate(
        actionContext: any, schoolId: number, id: number
    ) {
        let body = actionContext.request.body;
        await departmentService.update(
            id,
            body, {
                schoolId: schoolId,
                address: body.addressName
            }
        );
        actionContext.status = 204;
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
    async actionDelete(
        actionContext: any, schoolId: number, id: number
    ) {
        await departmentService.delete(id);
        actionContext.status = 204;
    }
}

export {DepartmentAdminController};
