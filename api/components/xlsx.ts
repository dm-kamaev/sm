import * as xlsxj from 'xlsx-to-json';

type Option = {sheet?: string};
export const xlsx: any = {};

xlsx.getJson = function(path: string, options?: Option): Promise<any[]> {
    options = options || {};
    return new Promise((resolve, reject) => {
        xlsxj({
            input: path,
            output: null,
            sheet: options.sheet
        }, function(err, res: any[]) {
            if (err) {
                return reject(err);
            }
            resolve(res);
        });
    });
};

