const url = require('url');

const MAX_LENGTH_LINK_CONTENT = 36;

class LinksFormatter {

    private maxLength_: number;

    constructor() {
        this.maxLength_ = MAX_LENGTH_LINK_CONTENT;
    }

    get maxLength(): number {
        return this.maxLength_;
    }

    set maxLength(maxLength: number) {
        this.maxLength_ = maxLength;
    }

    public getContent(link: string): string {
        return this.getCutContent(this.getFullContent(link));
    }

    private getFullContent(link: string): string {
        const result = url.parse(link);
        const host = result.host || '';
        return host + result.pathname;
    }

    private getCutContent(link: string): string {
        return link.length > this.maxLength ?
            link.slice(0, this.maxLength - 3) + '...' : link;
    }
};

export {LinksFormatter};
