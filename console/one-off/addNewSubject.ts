const logger = require('../../app/components/logger/logger.js')
    .getLogger('app');
const sequelize = require('../../app/components/db.js');

const SUBJECT = 'Иностранный язык';
const SUBJECT_ALIAS = 'foreign-lang';

class SubjectAdder {
    private subjectName: string;
    private subjectAlias: string;

    constructor(subjectName: string, subjectAlias: string) {
        this.subjectName = subjectName;
        this.subjectAlias = subjectAlias;
    }

    public async addIfNotExist() {
        const option = {type: sequelize.QueryTypes.SELECT};
        let query: string = `SELECT id FROM subject
    WHERE display_name = '${this.subjectName}' LIMIT 1`;
        const foundSubjects = await sequelize.query(
            query,
            option
        );
        if (!foundSubjects.length) {
            query = `INSERT INTO subject
    VALUES (
        DEFAULT,
        '${this.subjectName.toLowerCase()}',
        '${this.subjectName}',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP,
        '${this.subjectAlias}'
    );`;
            await sequelize.query(query, option);
            logger.info(`${this.subjectName} added`);
        }
    }
}

export {SubjectAdder};

if (!module.parent) {
    (async() => {
        const foreignLangAdder = new SubjectAdder(SUBJECT, SUBJECT_ALIAS);
        await foreignLangAdder.addIfNotExist();
    })();
}
