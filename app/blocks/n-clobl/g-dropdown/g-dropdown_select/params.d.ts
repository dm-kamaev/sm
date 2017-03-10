declare namespace Params {
    /*
     * sm.gDropdown.ParamsSelect.Data
     */
    interface Data {
        opener: (string|undefined),
        defaultOpenerText: (string|undefined),
        name: (string|undefined),
        content: any,
        contentConfig: (any|undefined)
    }

    /*
     * sm.gDropdown.ParamsSelect.Config
     */
    interface Config {
        stylizationModifier: string,
        iconName: (string|undefined),
        iconType: (string|undefined),
        customClasses: (Array<string>|undefined),
        theme: (string|undefined)
    }

    /*
     * sm.gDropdown.ParamsSelect
     */
    interface Params {
        data: Data;
        config: Config;
    }
}

export = Params;
