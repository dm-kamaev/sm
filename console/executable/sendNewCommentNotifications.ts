/**
 * @fileOverview Send notifications about new comments for schools and
 * programs
 */
import {
    UniversityNewCommentNotifier
} from '../modules/newCommentNotifier/UniversityNewCommentNotifier';
import {
    SchoolNewCommentNotifier
} from '../modules/newCommentNotifier/SchoolNewCommentNotifier';

const logger = require('../../app/components/logger/logger').getLogger('app');
const db = require('../../app/components/db');

const start = async() => {
    try {
        const initialLogging = db.options.logging;
        db.options.logging = false;

        const universityNotifier = new UniversityNewCommentNotifier(),
            schoolNotifier = new SchoolNewCommentNotifier();

        await universityNotifier.start();
        await schoolNotifier.start();

        db.options.logging  = initialLogging;
    } catch (error) {
        logger.critical(error);
    }
};

export = start();
