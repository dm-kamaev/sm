/**
 * @fileOverview View for create params for bread crubms block
 */
import {bSmRowLinks} from '../../../blocks/n-common/b-sm-row-links/params';
import {bSmLink} from '../../../blocks/n-common/b-sm-link/params';

import {
    BackendData as InformationBackendData
} from '../types/programInformationLayout';

type NavigationPanelItemCreationParams = {
    url?: string;
    name: string;
    theme: string;
    size: string;
};

class NavigationPanelView {
    public getForProgram(
            data: InformationBackendData): bSmRowLinks.Params.Data {
        const result: bSmRowLinks.Params.Data = {
                items: []
            },
            theme: string = 'sky',
            size: string = 'xl';

        result.items.push(this.makeNavigationPanelEntry_({
            name: data.university.city.name,
            theme,
            size
        }));

        if (data.university.profiles.length > 0) {
            result.items.push(this.makeNavigationPanelEntry_({
                name: data.university.profiles[0].name,
                theme,
                size
            }));
        }

        result.items.push(this.makeNavigationPanelEntry_({
            name: data.university.abbreviation,
            theme,
            size
        }));

        result.items.push(this.makeNavigationPanelEntry_({
            name: data.program.name,
            theme,
            size
        }));

        return result;
    }

    private makeNavigationPanelEntry_(
            creationParams: NavigationPanelItemCreationParams): bSmLink.Params {
        const isActive: boolean = Boolean(creationParams.url),
            data: bSmLink.Params.Data = {
                url: creationParams.url,
                content: creationParams.name
            };
        const config: bSmLink.Params.Config = {
            size: creationParams.size,
            theme: creationParams.theme
        };

        if (!isActive) {
            Object.assign(config, {
                isSelected: true,
                disableHover: true
            });
        }

        return {data, config};
    }
}

export const navigationPanelView = new NavigationPanelView();
