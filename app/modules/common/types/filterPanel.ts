export type Option = {
    id?: (string|number);
    name?: (string|number);
    label: string;
    value: (number|string);
    isChecked?: boolean;
};

export type OptionModel = {
    id: (number|string);
    name: string;
    displayName?: string;
};

export type InputOption = {
    label: string;
    name?: (string|number);
    placeholder?: string;
    value: (string|number|undefined);
    type?: string;
    maxLength?: number;
};
