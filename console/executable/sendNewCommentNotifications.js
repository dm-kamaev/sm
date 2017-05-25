"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @fileOverview Send notifications about new comments for schools and
 * programs
 */
const ProgramNewCommentNotifier_1 = require("../modules/newCommentNotifier/ProgramNewCommentNotifier");
const SchoolNewCommentNotifier_1 = require("../modules/newCommentNotifier/SchoolNewCommentNotifier");
const logger = require('../../app/components/logger/logger').getLogger('app');
const db = require('../../app/components/db');
const start = () => __awaiter(this, void 0, void 0, function* () {
    try {
        const initialLogging = db.options.logging;
        db.options.logging = false;
        const universityNotifier = new ProgramNewCommentNotifier_1.ProgramNewCommentNotifier(), schoolNotifier = new SchoolNewCommentNotifier_1.SchoolNewCommentNotifier();
        yield universityNotifier.start();
        yield schoolNotifier.start();
        db.options.logging = initialLogging;
    }
    catch (error) {
        logger.critical(error);
    }
});
module.exports = start();
