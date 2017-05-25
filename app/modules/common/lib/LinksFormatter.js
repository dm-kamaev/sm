"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url = require('url');
const MAX_LENGTH_LINK_CONTENT = 36;
class LinksFormatter {
    constructor() {
        this.maxLength_ = MAX_LENGTH_LINK_CONTENT;
    }
    get maxLength() {
        return this.maxLength_;
    }
    set maxLength(maxLength) {
        this.maxLength_ = maxLength;
    }
    getContent(link) {
        return this.getCutContent(this.getFullContent(link));
    }
    getFullContent(link) {
        const result = url.parse(link);
        const host = result.host || '';
        return host + result.pathname;
    }
    getCutContent(link) {
        return link.length > this.maxLength ?
            link.slice(0, this.maxLength - 3) + '...' : link;
    }
}
exports.LinksFormatter = LinksFormatter;
;
