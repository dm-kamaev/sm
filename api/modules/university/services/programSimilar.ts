/**
 * @fileoverview Service for make operations over programSimilar model
 */
import {ProgramSimilarInstance} from '../types/programSimilar';
import {ProgramInstance} from '../types/program';
import {Model as ProgramSimilarModel} from '../models/ProgramSimilar';
import {Model as ProgramModel} from '../models/Program';


class ProgramSimilarService {
    public async getByProgramId(
            programId: number): Promise<ProgramInstance[]> {
        const programSimilar: ProgramSimilarInstance[] =
            await ProgramSimilarModel.findAll({
                attributes: ['mainProgramId', 'relatedProgramId'],
                where: {
                    mainProgramId: programId
                },
                include: [{
                    model: ProgramModel,
                    as: 'relatedProgram'
                }]
            });

        return programSimilar.map(similar => similar.relatedProgram);
    }
}

export const service = new ProgramSimilarService();
