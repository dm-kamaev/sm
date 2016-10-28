/**
 * @fileoverview Create presets yandex maps
 */
goog.provide('sm.bSmMap.IPresetGenerator');

goog.scope(function() {



    /**
     * @constructor
     */
    sm.bSmMap.IPresetGenerator = function() {};
    var PresetGenerator = sm.bSmMap.IPresetGenerator;


    /**
     * Icon directory
     * @type {string}
     */
    PresetGenerator.ICON_DIR = '/static/images/n-common/b-sm-map/icons/';


    /**
     * Map presets names enum
     * @enum {string}
     */
    PresetGenerator.PresetName = {
        DEFAULT: 'default',
        GREEN: 'green',
        YELLOW: 'yellow',
        RED: 'red'
    };


    /**
     * Map presets types enum
     * @enum {string}
     */
    PresetGenerator.PresetType = {
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
    PresetGenerator.TypeSettings = {
        PIN: {
            prefix: PresetGenerator.PresetType.PIN,
            iconImageSize: [38, 40],
            iconImageOffset: [-12, -39],
            balloonOffset: [0, -30],
            zIndex: 230
        },
        POINT: {
            prefix: PresetGenerator.PresetType.POINT,
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
    PresetGenerator.PresetState = {
        DEFAULT: '',
        ACTIVE: 'active'
    };


    /**
     * Preset state options
     * @enum {Object}
     */
    PresetGenerator.StateSettings = {
        DEFAULT: {
            postfix: PresetGenerator.PresetState.DEFAULT,
            zIndex: 0
        },
        ACTIVE: {
            postfix: PresetGenerator.PresetState.ACTIVE,
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
    PresetGenerator.PresetSettings;


    /**
     * @typedef {{
     *     name: string,
     *     settings: sm.bSmMap.IPresetGenerator.PresetSettings
     * }}
     */
    PresetGenerator.Preset;

    /**
     * Generate preset name by score and view type
     * @param {number} score
     * @param {sm.bSmMap.IPresetGenerator.PresetType} presetType
     * @return {string}
     * @public
     */
    PresetGenerator.prototype.generatePresetNameByEntityParameters = function(
        score, presetType) {
        var presetName;

        if (score >= 4) {
            presetName = PresetGenerator.PresetName.GREEN;
        } else if (score >= 3) {
            presetName = PresetGenerator.PresetName.YELLOW;
        } else if (score > 0) {
            presetName = PresetGenerator.PresetName.RED;
        } else {
            presetName = PresetGenerator.PresetName.DEFAULT;
        }

        return presetType + '-' + presetName;
    };


    /**
     * Generate unactive state preset name from given preset name
     * @param {string} preset
     * @return {string}
     * @public
     */
    PresetGenerator.prototype.generateDefaultStatePresetName = function(
        preset) {
        var activeStateNamePart = '-' + PresetGenerator.PresetState.ACTIVE;

        return preset.replace(activeStateNamePart, '');
    };

    /**
     * Generate active preset name from given preset name
     * @param {string} preset
     * @return {string}
     */
    PresetGenerator.prototype.generateActiveStatePresetName = function(preset) {
        var result;

        if (~preset.indexOf(PresetGenerator.PresetState.ACTIVE)) {
            result = preset;
        } else {
            var activeStateNamePart = '-' + PresetGenerator.PresetState.ACTIVE;
            result = preset + activeStateNamePart;
        }
        return result;
    };


    /**
     * Generate presets for yandex map
     * @return {Array<sm.bSmMap.SmMap.Preset>}
     * @public
     */
    PresetGenerator.prototype.generate = function() {
        var generatedPresets = this.generatePresets_();

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
    PresetGenerator.prototype.generatePresets_ = function() {
        var typePresetsSettings = goog.object.getValues(
            PresetGenerator.TypeSettings
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
    PresetGenerator.prototype.generatePresetsByTypeSettings_ = function(
        typeSettings) {
        var statePresetsSettings = goog.object.getValues(
            PresetGenerator.StateSettings
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
    PresetGenerator.prototype.generatePresetsByStateSettings_ = function(
        typeSettings, stateSettings) {
        var presetNames = goog.object.getValues(PresetGenerator.PresetName);
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
    PresetGenerator.prototype.generatePresetsByName_ = function(
        typeSettings, stateSettings, presetName) {
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
    PresetGenerator.prototype.generateIconHref_ = function(prefix, name) {
        return PresetGenerator.ICON_DIR + 'map-' + prefix + '-' + name +
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
    PresetGenerator.prototype.generatePresetName_ = function(
        name, prefix, postfix) {
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
    PresetGenerator.prototype.generatePresetSettings_ = function(
        imageHref, typeSettings, stateSettings) {
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
