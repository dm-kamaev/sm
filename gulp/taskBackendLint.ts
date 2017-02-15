import {Lint} from 'nodules';
import * as path from 'path';

const lintParams: Lint.LinterParams = {
    projectRoot: path.resolve(__dirname, '../'),
    excludeGlob: [
        'api-debug/**',
        'app/blocks/**',
        'app/modules/doc/**',
        'console/browser/**',
        'build/**',
        'doc/**',
        'node_modules/**',
        'parse/**',
        'public/**',
        'typings/**'
    ]
};
const execParams: Lint.ExecutionParams = {
    showResults: true,
    throwOnErrors: false
};
const executor = new Lint.LintExecutor(lintParams, execParams);

export const task = function() {
    return executor
        .addEslintLinter()
        .addTslintLinter()
        .runLinters();
};
