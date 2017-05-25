"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NavigationPanelView {
    getForProgram(data) {
        const result = {
            items: []
        }, theme = 'sky', size = 'xl';
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
    makeNavigationPanelEntry_(creationParams) {
        const isActive = Boolean(creationParams.url), data = {
            url: creationParams.url,
            content: creationParams.name
        };
        const config = {
            size: creationParams.size,
            theme: creationParams.theme
        };
        if (!isActive) {
            Object.assign(config, {
                isSelected: true,
                disableHover: true
            });
        }
        return { data, config };
    }
}
exports.navigationPanelView = new NavigationPanelView();
