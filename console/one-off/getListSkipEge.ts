'use strict';

// author: dm-kamaev
// node ./console/one-off/getListSkipEge.js
// get list program for which hide ege_pass_score

import * as fs from 'fs';
import * as path from 'path';
const logger = require('../../app/components/logger/logger.js').getLogger('app');
const sequelize = require('../../app/components/db.js');

class AddedNewProgramMajor {
    constructor() {}

    public async start() {
        logger.info('--------START-------');
        const option = {type: sequelize.QueryTypes.SELECT};
        let query: string = `
          SELECT
              p.id,
              p.name,
              p.university_id,
              COUNT(p.id),
              u.name as university_name,
              es.ege_pass_score
          FROM program as p
          LEFT JOIN university as u ON p.university_id = u.id
          LEFT JOIN program_ege_exam as pee ON p.id = pee.program_id
          LEFT JOIN entrance_statistic as es ON p.id = es.program_id
          WHERE es.ege_pass_score <= 150
          GROUP BY
              p.id,
              p.name,
              p.university_id,
              u.name,
              es.ege_pass_score
          HAVING COUNT(p.id)=3
        `;
       const programs = await sequelize.query(query, option);
       console.log('programs.length=', programs.length);
       const hash = {};
       programs.forEach(program => {
         hash[program.university_name+'::::'+program.name] = program;
       });
       console.log('hash.length=', Object.keys(hash).length);
       const fullPath: string =
         path.join(__dirname, '../../assets/universities/skipEge.json');
       fs.writeFileSync(
           fullPath,
           JSON.stringify(hash)
       );
       logger.info('--------END-------');
    }
};

(async function () {
  await new AddedNewProgramMajor().start();
})();
