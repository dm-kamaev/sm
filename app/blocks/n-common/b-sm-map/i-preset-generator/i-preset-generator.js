/**
 * @fileoverview Create presets yandex maps
 */
goog.provide('sm.bSmMap.IPresetGenerator');

goog.scope(function() {



    /**
     * @constructor
     */
    sm.bSmMap.IPresetGenerator = function() {};
    var PresetCreator = sm.bSmMap.IPresetGenerator;


    /**
     * Icon directory
     * @type {string}
     */
    PresetCreator.ICON_DIR = '/images/n-school/b-map/icons/';


    /**
     * Map presets names enum
     * @enum {string}
     */
    PresetCreator.PresetName = {
        DEFAULT: 'default',
        GREEN: 'green',
        YELLOW: 'yellow',
        RED: 'red'
    };


    /**
     * Map presets types enum
     * @enum {string}
     */
    PresetCreator.PresetType = {
        PIN: 'pin',
        POINT: 'point'
    };


    /**
     * Preset type options enum
     * @enum {{
     *     prefix: string,
     *     iconImageSize: Array<number>,
     *     iconImageOffset: Array<number>,
     *     balloonOffset:
     * }}
     */
    PresetCreator.TypeSettings = {
        PIN: {
            prefix: PresetCreator.PresetType.PIN,
            iconImageSize: [38, 40],
            iconImageOffset: [-12, -39],
            balloonOffset: [0, -30],
            zIndex: 230
        },
        POINT: {
            prefix: PresetCreator.PresetType.POINT,
            iconImageSize: [13, 13],
            iconImageOffset: [-6, -6],
            balloonOffset: [0, -1],
            zIndex: 210
        }
    };


    /**
     * Map presets states enum
     * @enum {string}
     */
    PresetCreator.PresetState = {
        DEFAULT: '',
        ACTIVE: 'active'
    };


    /**
     * Preset state options
     * @enum {Object}
     */
    PresetCreator.StateSettings = {
        DEFAULT: {
            postfix: PresetCreator.PresetState.DEFAULT,
            zIndex: 0
        },
        ACTIVE: {
            postfix: PresetCreator.PresetState.ACTIVE,
            zIndex: 1200
        }
    };


    /**
     * @typedef {{
     *     balloonOffset: Array<number>,
     *     iconImageHref: string,
     *     iconImageSize: Array<number>,
     *     iconImageOffset: Array<number>,
     *     iconLayout: string,
     *     zIndex: number,
     *     zIndexHover: number
     * }}
     */
    PresetCreator.PresetSettings;


    /**
     * @typedef {{
     *     name: string,
     *     settings: sm.bSmMap.IPresetGenerator.PresetSettings
     * }}
     */
    PresetCreator.Preset;

    /**
     * Generate preset name by score and object type
     * @param {number} score
     * @param {sm.bSmMap.IPresetGenerator.PresetType} presetType
     * @return {string}
     */
    PresetCreator.prototype.generateNameByEntityScore = function(
        score,
        presetType) {
        var presetName;

        if (score >= 4) {
            presetName = PresetCreator.PresetName.GREEN;
        } else if (score >= 3) {
            presetName = PresetCreator.PresetName.YELLOW;
        } else if (score > 0) {
            presetName = PresetCreator.PresetName.RED;
        } else {
            presetName = PresetCreator.PresetName.DEFAULT;
        }

        return presetType + '-' + presetName;
    };


    /**
     * Generate unactive state preset name from given preset name
     * @param {string} preset
     * @return {string}
     */
    PresetCreator.generateUnactiveStatePresetName = function(preset) {
        var activeStateNamePart = '-' + PresetCreator.PresetState.ACTIVE;

        return preset.replace(activeStateNamePart, '');
    };


    /**
     * Generate presets for yandex map
     * @return {Array<sm.bSmMap.SmMap.Preset>}
     */
    PresetCreator.prototype.generate = function() {
        var generatedPresets = this.generatedPresets_();

        return goog.array.flatten(generatedPresets);
    };


    /**
     * Generate presets
     * @return {Array<
     *     Array<
     *         Array<
     *             Array<sm.bMap.Preset>
     *         >
     *     >
     * >} [description]
     * @private
     */
    PresetCreator.prototype.generatedPresets_ = function() {
        var typePresetsSettings = goog.object.getValues(
            PresetCreator.TypeSettings
        );

        return typePresetsSettings.map(
            this.generatePresetsByTypeSettings_.bind(this)
        );
    };


    /**
     * Generates yandex map presets for given type option
     * @param {sm.bMap.PresetTypeSettings} typeSettings
     * @return {Array<
     *     Array<
     *         Array<sm.bMap.Preset>
     *     >
     * >}
     * @private
     */
    PresetCreator.prototype.generatePresetsByTypeSettings_ = function(
        typeSettings) {
        var statePresetsSettings = goog.object.getValues(
            PresetCreator.StateSettings
        );

        return statePresetsSettings.map(
            this.generatePresetsByStateSettings_.bind(this, typeSettings)
        );
    };


    /**
     * @param {sm.bSmMap.IPresetGenerator.TypeSettings} typeSettings
     * @param {sm.bSmMap.IPresetGenerator.StateSettings} stateSettings
     * @return {Array<
     *     Array<sm.bMap.Preset>
     * >}
     * @private
     */
    PresetCreator.prototype.generatePresetsByStateSettings_ = function(
        typeSettings,
        stateSettings) {
        var presetNames = goog.object.getValues(PresetCreator.PresetName);
        return presetNames.map(
            this.generatePresetsByName_.bind(
                this,
                typeSettings,
                stateSettings
            )
        );
    };


    /**
     * @param {sm.bSmMap.IPresetGenerator.TypeSettings} typeSettings
     * @param {sm.bSmMap.IPresetGenerator.StateSettings} stateSettings
     * @param {sm.bSmMap.IPresetGenerator.PresetName} presetName
     * @return {sm.bSmMap.IPresetGenerator.Preset}
     * @private
     */
    PresetCreator.prototype.generatePresetsByName_ = function(
        typeSettings,
        stateSettings,
        presetName) {
        var prefix = typeSettings.prefix;
        var postfix = stateSettings.postfix;

        var iconHref = this.generateIconHref_(presetName, prefix);

        return {
            name: this.generatePresetName_(presetName, prefix, postfix),
            settings: this.generatePresetSettings_(
                iconHref, typeSettings, stateSettings
            )
        };
    };


    /**
     * Generate icon href for given preset name and prefix
     * @param  {string} prefix
     * @param  {string} name
     * @return {string}
     * @private
     */
    PresetCreator.prototype.generateIconHref_ = function(prefix, name) {
        return PresetCreator.ICON_DIR + 'map-' + prefix + '-' + name +
            '-th.png';
    };


    /**
     * Generate preset name from name prefix and postfix
     * @param {string} name
     * @param {string} prefix
     * @param {string} postfix
     * @return {string}
     * @private
     */
    PresetCreator.prototype.generatePresetName_ = function(
        name,
        prefix,
        postfix) {
        var namePrefix = prefix != '' ? prefix + '-' : '';
        var namePostfix = postfix != '' ? '-' + postfix : '';

        return namePrefix + name + namePostfix;
    };


    /**
     * Generate
     * @param {string} imageHref   [description]
     * @param {sm.bSmMap.IPresetGenerator.TypeSettings} typeSettings
     * @param {sm.bSmMap.IPresetGenerator.StateSettings} stateSettings
     * @return {sm.bSmMap.IPresetGenerator.PresetSettings}
     * @private
     */
    PresetCreator.prototype.generatePresetSettings_ = function(
        imageHref,
        typeSettings,
        stateSettings) {
        return {
            'balloonOffset': typeSettings.balloonOffset,
            'iconImageHref': imageHref,
            'iconImageSize': typeSettings.iconImageSize,
            'iconImageOffset': typeSettings.iconImageOffset,
            'iconLayout': 'default#image',
            'zIndex': typeSettings.zIndex + stateSettings.zIndex,
            'zIndexHover': typeSettings.zIndex + 100 + stateSettings.zIndex
        };
    };
});  // goog.scope
