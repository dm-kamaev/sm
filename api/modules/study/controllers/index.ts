const express = require('express');
const router = express.Router();

import {SubjectController} from './SubjectController';
const subjectController = new SubjectController();

router.get('/subject/search', subjectController.actionSearch);

export {router};
