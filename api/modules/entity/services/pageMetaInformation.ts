/**
 * @fileOverview Page meta service. Make CRUD operations on PageMeta model
 */
import {
    PageMetaInformationAttributes,
    PageMetaInformationInstance
} from '../types/pageMetaInterfaces';

import {PageMetaInformationNotFound}
    from './exceptions/pageMetaInformationNotFound';

import {Model as PageMetaModel} from '../models/pageMetaInformation'

class PageMetaService {
    public readonly name = 'pageMeta';

    public async update(
            pageMetaId: number, data: PageMetaInformationAttributes
    ): Promise<PageMetaInformationInstance> {
        const pageMeta = await this.getOne(pageMetaId);

        return await pageMeta.update(data);
    }

    public async getOne(
            pageMetaId: number): Promise<PageMetaInformationInstance> {
        const pageMeta = await this.silentGetOne_(pageMetaId);

        if(!pageMeta) {
            throw new PageMetaInformationNotFound(pageMetaId);
        }

        return pageMeta;
    }

    public async delete(pageMetaId: number): Promise<number> {
        return await PageMetaModel.destroy({
            where: {
                id: pageMetaId
            }
        });
    }

    public async create(
            data: PageMetaInformationAttributes
    ): Promise<PageMetaInformationInstance> {
        return await PageMetaModel.create(data);
    }

    /**
     * Get one page meta instance without throwing an error
     */
    private async silentGetOne_(
            pageMetaId: number): Promise<PageMetaInformationInstance> {
        return await PageMetaModel.findOne({
            where: {
                id: pageMetaId
            }
        });
    }
}

export const service = new PageMetaService();
