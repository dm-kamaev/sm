import departmentService from '../../geo/services/department';
import departmentView from '../../geo/views/departmentView';

import {LegacyController} from '../../../components/interface';

import SchoolNotFoundError from './errors/SchoolNotFound';
import DepartmentNotFoundError from './errors/DepartmentNotFound';
import AddressDoesNotExistError from './errors/AddressDoesNotExist';

const Controller: LegacyController = require('nodules/controller').Controller;

class DepartmentAdminController extends Controller {
    public errors: Object;

    constructor() {
        super();

        this.errors = {
            SchoolNotFoundException: SchoolNotFoundError,
            DepartmentNotFoundException: DepartmentNotFoundError,
            AddressDoesNotExistException: AddressDoesNotExistError
        };
    }

    /**
     * @api {get} /api/school/:schoolId/department Get all school's departments
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
     * @api {get} /api/school/:schoolId/department/:id Get department
     * @apiVersion 1.0.0
     * @apiName getDepartment
     * @apiGroup School Department
     *
     * @apiParam {Number} schoolId     School's id.
     * @apiParam {Number} departmentId Department's id.
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
        actionContext: any, schoolId: number, departmentId: number
    ) {
        let department = await departmentService.getById(departmentId);
        return departmentView.adminRender(department);
    }

    /**
     * @api {post} /api/school/:schoolId/department/:id Create department
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
     * @apiError (404) SchoolNotFound      School with schoolId not found.
     * @apiError (422) AddressDoesNotExist Specified address does not exist.
     */
    async actionCreate(actionContext: any, schoolId: number) {
        let body = actionContext.request.body;
        await departmentService.addDepartment(
            schoolId,
            body.addressName,
            body
        );
        actionContext.response.status(201);
    }
}

export {DepartmentAdminController};
