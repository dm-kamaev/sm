'use strict';
const fs = require('fs-extra');
const targz = require('tar.gz');
const Decompress = require('decompress');
const await = require('asyncawait/await');
const common = require('../../common');

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

    /**
     * @public
     * @return {string}
     */
    decompress() {
        if (!common.fileExists(this.path_))
            throw new Error('Can\'t find archive ' + this.path_);
        try {
            fs.emptyDirSync(this.archiveFolder_);
            await(this.decompressPromise_());
            var res = common.readText(this.archiveFolder_ + this.tmpName_);
            return res;
        } catch(e) {
            console.log(e.message);
        } finally {
            this.cleanFolder_();
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
     * @private
     * @return {promise}
     */
    decompressPromise_() {
        // var path = this.path_;
        // return new Promise(function(resolve, reject) {
        //     targz().extract(path, './',function(err) {
        //         if(err)
        //             reject(err);
        //         //bug in tar.gz extract(). Callback called to early
        //         setTimeout(function() {resolve('succsess');}, 1000); 
        //     });
        // });
        var path = this.path_;
        var archiveFolder = this.archiveFolder_;
        return new Promise(function(resolve, reject) {
            new Decompress()
                .src(path)
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
        var path = this.path_;
        var archiveFolder = this.archiveFolder_;
        return new Promise(function(resolve, reject) {
            targz().compress(archiveFolder, path, function(err) {
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
