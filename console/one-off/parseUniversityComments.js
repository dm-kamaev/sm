"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const minimist = require("minimist");
const sequelize = require('../../app/components/db');
const logger = require('../../app/components/logger/logger')
    .getLogger('app');
const modules = require('../../api/modules'); // model association
const CommentsParser_1 = require("../modules/parseUniversityComments/CommentsParser");
function parse(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const universityCommentParser = new CommentsParser_1.CommentsLoader(logger);
        const normalizedPath = path_1.resolve(filePath);
        sequelize.options.logging = false;
        yield universityCommentParser.loadComments(normalizedPath);
    });
}
exports.parse = parse;
if (!module.parent) {
    const args = minimist(process.argv.slice(2));
    parse(args.path);
}
