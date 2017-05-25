"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProgramMetaView {
    render(programMeta, alias) {
        const meta = programMeta;
        return {
            id: meta.id,
            programId: meta.programId,
            url: alias || '',
            keywords: meta.keywords || '',
            tabTitle: meta.tabTitle || '',
            seoDescription: meta.seoDescription || '',
            openGraphDescription: meta.openGraphDescription || '',
            createdAt: meta.createdAt,
            updatedAt: meta.updatedAt,
        };
    }
}
exports.programMetaView = new ProgramMetaView();
