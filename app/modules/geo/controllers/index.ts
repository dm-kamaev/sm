import * as express from 'express';

const router = express.Router();

import {CityController} from './CityController';
const cityController = new CityController();

router.get('/cities/program', cityController.actionProgramList);
router.get('/cities', cityController.actionSearch);

export {router};
