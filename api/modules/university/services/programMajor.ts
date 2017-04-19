import {
    Model as ProgramMajorModel,
    ProgramMajorInstance
} from '../models/ProgramMajor';

class ProgramMajor {
    public async search(name: string): Promise<Array<ProgramMajorInstance>> {
        return ProgramMajorModel.findAll({
            where: {
                name: {
                    $ilike: `%${name}%`
                }
            }
        });
    }
}

export const service = new ProgramMajor();
