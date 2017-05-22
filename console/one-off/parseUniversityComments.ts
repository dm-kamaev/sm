import {resolve as pathResolve} from 'path';
import * as commander from 'commander';
import * as minimist from 'minimist';

const sequelize = require('../../app/components/db');
const logger = require('../../app/components/logger/logger')
    .getLogger('app');

const modules = require('../../api/modules'); // model association

import {
    CommentsLoader
} from '../modules/parseUniversityComments/CommentsParser';

async function parse(filePath: string): Promise<void> {
    const universityCommentParser = new CommentsLoader(logger);
    const normalizedPath = pathResolve(filePath);
    sequelize.options.logging = false;
    await universityCommentParser.loadComments(normalizedPath);
}

export {parse};

if (!module.parent) {
    const args = minimist(process.argv.slice(2));
    parse(args.path);
}
