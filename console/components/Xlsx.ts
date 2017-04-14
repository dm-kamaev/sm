import * as xlsxj from 'xlsx-to-json';

export class Xlsx {
    constructor() {

    }

    public getJson(path: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            xlsxj({
                input: path,
                output: null,
            }, function(err, res: any[]) {
                if (err) {
                    return reject(err);
                }
                resolve(res);
            });
        });
    }
}

