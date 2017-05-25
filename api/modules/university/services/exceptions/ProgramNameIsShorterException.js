"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exception = require('nodules/controller/ServiceException');
class ProgramNameIsShorterException extends Exception {
    constructor(programName, mustLength) {
        programName = programName || '';
        mustLength = mustLength || 2;
        const message = `
            The length of program name for
            search should be greater than or equal to "${mustLength}",\n
            but now length is "${programName.length}"
        `;
        super(message);
        this.name = 'ProgramNameIsShorterException';
    }
}
exports.ProgramNameIsShorterException = ProgramNameIsShorterException;
