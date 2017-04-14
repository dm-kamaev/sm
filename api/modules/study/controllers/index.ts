const express = require('express');
const router = express.Router();

import {SubjectController} from './SubjectController';
const subjectController = new SubjectController();

import {EgeController} from './EgeController';
const egeController = new EgeController();

router.get('/subject/search', subjectController.actionSearch);

router.get('/subject/ege', egeController.actionGetAllSorted);

export {router};
