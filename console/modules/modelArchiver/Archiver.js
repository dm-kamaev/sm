'use strict';
const fs = require('fs-extra');
const targz = require('tar.gz');
const Decompress = require('decompress');
const await = require('asyncawait/await');
const common = require('../../common');
const path = require('path');


/**
 * This class can be used standalone from ModelArchiver.
 * Sequence of decompress -> your code with that file -> deleteUnarchivedFile
 * can be usefull with migrations based on straight csv uploading to postgres.
 *
 * To achieve this goal you need to:
 *     1) initiate an object of Archiver with path to your archived .csv file;
 *     2) use decompress function with %directory% that will store an
 *         uncompressed file;
 *     3) run the following SQL query:
 *         "COPY table_name[(csv_headers)] FROM '%directory%/archiver.tmpName'
 *         WITH CSV HEADER DELIMITER '|';";
 *     4) invoke deleteUnarchivedFile with %directory% that store a file.
 * You can see an example at
 * api/modules/school/migrations/20160512165600-additional-education-data.js
 */
class Archiver {

    /**
     * @public
     * @param {string} relativePath
     */
    constructor(fullPath) {
        this.path_ = fullPath;
        this.archiveFolder_ = './.archive/';
        this.tmpName_ = 'archive.tmp';
    }

    get tmpName() {
        return this.tmpName_;
    }

    /**
     * @public
     * @param {string=} opt_outputFilePath
     * @return {string}
     */
    decompress(opt_outputFilePath) {
        if (!common.fileExists(this.path_))
            throw new Error('Can\'t find archive ' + this.path_);

        var archiveFolder = opt_outputFilePath || this.archiveFolder_;

        try {
            fs.emptyDirSync(this.archiveFolder_);
            await(this.decompressPromise_(opt_outputFilePath));
            var res = common.readText(path.join(archiveFolder, this.tmpName_));
            return res;
        } catch(e) {
            console.log(e.message);
        } finally {
            if (!opt_outputFilePath) {
                this.cleanFolder_();
            }
        }
    }

    /**
     * @public
     * @param {string} text
     * @param {string} path
     */
    compress(text) {
        try
        {
            this.prepareArchive_(text);
            await(this.compressPromise_());
        } catch(e) {
            console.log(e.message);
        } finally {
            this.cleanFolder_();
        }
    }

    /**
     * @public
     * @param {string} directory
     */
    deleteUnarchivedFile(directory) {
        try {
            fs.removeSync(path.join(directory, this.tmpName_));
        } catch (e) {}
    }

    /**
     * @private
     * @param {string=} opt_outputFilePath
     * @return {promise}
     */
    decompressPromise_(opt_outputFilePath) {
        // var path = this.path_;
        // return new Promise(function(resolve, reject) {
        //     targz().extract(path, './',function(err) {
        //         if(err)
        //             reject(err);
        //         //bug in tar.gz extract(). Callback called to early
        //         setTimeout(function() {resolve('succsess');}, 1000);
        //     });
        // });
        var filePath = this.path_;
        var archiveFolder = opt_outputFilePath || this.archiveFolder_;
        return new Promise(function(resolve, reject) {
            new Decompress()
                .src(filePath)
                .dest(archiveFolder)
                .use(Decompress.targz({strip: 1}))
                .run(function(err) {
                    if (err)
                        reject(err);
                    resolve('succsess');
                });
        });
    }

    /**
     * @private
     * @return {promise}
     */
    compressPromise_() {
        var filePath = this.path_;
        var archiveFolder = this.archiveFolder_;
        return new Promise(function(resolve, reject) {
            targz().compress(archiveFolder, filePath, function(err) {
                if (err)
                    reject(err);
                resolve('success');
            });
        });
    }

    /**
     * @private
     * @param {string} text
     */
    prepareArchive_(text) {
        fs.emptyDirSync(this.archiveFolder_);
        fs.writeFileSync(this.archiveFolder_ + this.tmpName_, text);
    }

    /**
     * @private
     */
    cleanFolder_() {
        try {
            fs.removeSync(this.archiveFolder_);
        } catch (e) {} // error if there is no dir
    }
}

module.exports = Archiver;
