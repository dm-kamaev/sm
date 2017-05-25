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
const ProgramSimilar_1 = require("../models/ProgramSimilar");
const Program_1 = require("../models/Program");
class ProgramSimilarService {
    getByProgramId(programId) {
        return __awaiter(this, void 0, void 0, function* () {
            const programSimilar = yield ProgramSimilar_1.Model.findAll({
                attributes: ['mainProgramId', 'relatedProgramId'],
                where: {
                    mainProgramId: programId
                },
                include: [{
                        model: Program_1.Model,
                        as: 'relatedProgram'
                    }]
            });
            return programSimilar.map(similar => similar.relatedProgram);
        });
    }
}
exports.service = new ProgramSimilarService();
