import {
    ProgramPageMetaInformationInstance,
    ProgramMetaAdmin,
} from
'../types/programPageMetaInformation';


class ProgramMetaView {
    public render(
        programMeta: ProgramPageMetaInformationInstance | {},
        alias: string
    ): ProgramMetaAdmin {
        const meta = programMeta as ProgramMetaAdmin;
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

export const programMetaView = new ProgramMetaView();
