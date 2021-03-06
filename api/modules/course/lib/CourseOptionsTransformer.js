'use strict';

const lodash = require('lodash');

const metroView = require('../../geo/views/metroView');

const WEEK_DAYS = [
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
        'Воскресенье'
    ],
    MONTHS = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря'
    ],
    BUTTON_TEXT = 'Хочу этот курс';

module.exports = class {
    /**
     * @param {Array<Object>} options
     * @param {string}        costField
     */
    constructor(options, costField) {
        /**
         * @private
         * @type {Array<Object>}
         */
        this.options_ = this.formatOptions_(options);

        /**
         * @private
         * @type {Array<Object>}
         */
        this.availableOptions_ = [{
            key: 'age',
            name: 'Возраст'
        }, {
            key: 'totalCost',
            name: 'Стоимость за курс'
        }, {
            key: 'costPerHour',
            name: 'Стоимость за час'
        }, {
            key: 'schedule',
            name: 'Расписание'
        }, {
            key: 'maxGroupSize',
            name: 'Группы'
        }, {
            key: 'regularity',
            name: 'Регулярность занятий'
        }, {
            key: 'online',
            name: 'Форма обучения'
        }, {
            key: 'duration',
            name: 'Длительность занятия'
        }, {
            key: 'startDate',
            name: 'Начало занятий'
        }, {
            key: 'name',
            name: 'Пакет'
        }];

        /**
         * @private
         * @type {Array<string>}
         */
        this.globalOptions_ = ['totalCost', 'name', 'costPerHour'];

        /**
         * @private
         * @type {string}
         */
        this.costField_ = costField;
    }

    /**
     * Get course's options which are the same
     * @return {Array<Object>}
     */
    getGeneralOptions() {
        return this.availableOptions_.map(generalOption =>
                this.getGeneralOptionValue_(generalOption)
            )
            .filter(generalOption =>
                generalOption && generalOption.description);
    }

    /**
     * @param  {Array<Object>} generalOptions
     * @return {Array<Object>}
     */
    getUniqueOptions(generalOptions) {
        let uniqueOptionValues = this.getUniqueOptionValues_(generalOptions),
            uniqueOptions = this.options_
                .map(option =>
                    this.getUniqueOptionValue_(option, uniqueOptionValues));

        return this.groupByDepartments_(uniqueOptions);
    }

    /**
     * @private
     * @param  {Array<Object>} generalOptions
     * @return {Array<string>}
     */
    getUniqueOptionValues_(generalOptions) {
        let notUniqueOptions = this.removeRequiredFields_(generalOptions);
        return this.availableOptions_.map(availableOption =>
                this.isOptionUnique_(availableOption, notUniqueOptions) ?
                    availableOption : null
            )
            .filter(item => item);
    }

    /**
     * @private
     * @param  {Object} option
     * @param  {Array<Object>} notUniqueOptions
     * @return {(Object|null)}
     */
    isOptionUnique_(option, notUniqueOptions) {
        return notUniqueOptions.every(notUniqueOption =>
            notUniqueOption.key != option.key
        );
    }

    /**
     * @private
     * @param  {Array<Object>} generalOptions
     * @return {Array<Object>}
     */
    removeRequiredFields_(generalOptions) {
        this.globalOptions_.map(globalOption => {
            let globalOptionIndex = generalOptions.findIndex(generalOption =>
                generalOption.key == globalOption);
            if (~globalOptionIndex) {
                generalOptions.splice(globalOptionIndex, 1);
            }
        });
        return generalOptions;
    }

    /**
     * @private
     * @param  {Object} option
     * @param  {Array<Object>} uniqueOptionValues
     * @return {Object}
     */
    getUniqueOptionValue_(option, uniqueOptionValues) {
        let result = {};

        uniqueOptionValues.map(uniqueOptionValue => {
            let key = uniqueOptionValue.key;
            if (option[key]) {
                result[key] = option[key];
            }
        });
        result.departments = option.departments;

        return result;
    }

    /**
     * @private
     * @param  {Array<Object>} options
     * @return {Array<Object>}
     */
    groupByDepartments_(options) {
        let addresses = {};
        options.map(option =>
            option.departments.map(department => {
                let addressId = department.addressId;
                if (addresses[addressId]) {
                    addresses[addressId].options.push(
                        this.transformOption_(option)
                    );
                } else {
                    addresses[addressId] =
                        this.transformDepartment_(department, option);
                }
            })
        );
        return lodash.values(addresses);
    }

    /**
     * @private
     * @param  {Object} department
     * @param  {Object} option
     * @return {Object}
     */
    transformDepartment_(department, option) {
        return {
            name: department.addressName,
            metros: department.metros,
            options: [this.transformOption_(option)]
        };
    }

    /**
     * @private
     * @param  {Object} option
     * @return {Object}
     */
    transformOption_(option) {
        let costKey = this.costField_ || this.globalOptions_[0],
            titleKey = this.globalOptions_[1];
        return {
            title: {
                key: titleKey,
                name: this.getName_(titleKey),
                value: option[titleKey]
            },
            cost: {
                key: costKey,
                name: this.getName_(costKey),
                value: option[costKey]
            },
            buttonText: BUTTON_TEXT,
            features: this.transformFeature_(option)
        };
    }

    /**
     * @private
     * @param  {Object} option
     * @return {Object}
     */
    transformFeature_(option) {
        let keys = Object.keys(option);
        return keys.map(key => {
            let feature;
            if (!~this.globalOptions_.indexOf(key) && key !== 'departments') {
                feature = {
                    key: key,
                    value: option[key],
                    name: this.getName_(key)
                };
            }
            return feature;
        }).filter(feature => feature);
    }

    /**
     * @private
     * @param  {Object} generalOption
     * @return {(Object|null)}
     */
    getGeneralOptionValue_(generalOption) {
        let result = Object.assign({}, generalOption);

        this.options_.forEach(option => {
            result = this.getComparedValue_(
                result,
                option[generalOption.key]
            );
        });

        return result;
    }

    /**
     * @private
     * @param  {Object} generalOption
     * @param  {string} value
     * @return {Object}
     */
    getComparedValue_(generalOption, value) {
        let result = Object.assign({}, generalOption);

        if (!generalOption) {
            result = null;
        } else if (!generalOption.hasOwnProperty('description')) {
            result.description = value;
        } else if (generalOption.description != value) {
            result = null;
        }

        return result;
    }

    /**
     * @private
     * @param  {Object} options
     * @return {Object}
     */
    formatOptions_(options) {
        return options.map(option => ({
            departments: this.formatDepartments_(option.departments),
            age: this.formatAge_(option.age),
            schedule: this.formatSchedule_(option.schedule),
            maxGroupSize: this.formatGroupSize_(option.maxGroupSize),
            totalCost: this.formatTotalCost_(option.totalCost),
            costPerHour: this.formatCostPerHour_(option.costPerHour),
            regularity: this.formatRegularity_(option.schedule),
            online: this.formatOnline_(option.online),
            duration: this.formatDuration_(option.duration),
            startDate: this.formatStartDate_(option.startDate),
            name: option.name
        }));
    }

    /**
     * @private
     * @param  {Array<Object>} departments
     * @return {Array<Object>}
     */
    formatDepartments_(departments) {
        return departments.map(department => {
            let address = department.address;
            return {
                addressId: address.id,
                addressName: address.name,
                metros: address.metroStations.map(metro =>
                    metroView.formatName(metro.name))
            };
        });
    }

    /**
     * @private
     * @param  {Array<number>} age
     * @return {string}
     */
    formatAge_(age) {
        let result,
            firstAge = age[0],
            lastDigit = firstAge % 10;

        if (age.length > 1) {
            result = `${firstAge}—${age[age.length - 1]} лет`;
        } else if (firstAge >= 11 && firstAge <= 14) {
            result = `${firstAge} лет`;
        } else if (lastDigit == 1) {
            result = `${firstAge} год`;
        } else if (lastDigit >= 2 && lastDigit <= 4) {
            result = `${firstAge} года`;
        } else {
            result = `${firstAge} лет`;
        }

        return result;
    }

    /**
     * @private
     * @param  {Object} schedule
     * @return {string}
     */
    formatSchedule_(schedule) {
        return schedule
            .sort((previousSchedule, currentSchedule) =>
                previousSchedule.day > currentSchedule.day
            )
            .map(item => {
                let weekday = WEEK_DAYS[item.day],
                    startTime = this.formatTime_(item.startTime),
                    endTime = item.endTime ?
                        `—${this.formatTime_(item.endTime)}` :
                        '';
                return `${weekday} ${startTime}${endTime}`;
            })
            .join(', ');
    }

    /**
     * @private
     * @param  {string} time
     * @return {string|null}
     */
    formatTime_(time) {
        let result = time && time.split(':') || ['', ''],
            hour = result[0],
            minute = result[1];
        return time ? hour + ':' + minute : null;
    }

    /**
     * @private
     * @param  {number} maxGroupSize
     * @return {string}
     */
    formatGroupSize_(maxGroupSize) {
        let result;
        if (!maxGroupSize) {
            result = 'Размер группы не указан';
        } else if (maxGroupSize === 1) {
            result = 'Индивидуальные занятия';
        } else {
            result = 'Не более ' + maxGroupSize + ' человек в группе';
        }
        return result;
    }

    /**
     * @private
     * @param  {number} cost
     * @return {string}
     */
    formatTotalCost_(cost) {
        const totalType = 'курс';
        return this.formatCost_(cost, totalType);
    }

    /**
     * @private
     * @param  {number} cost
     * @return {string}
     */
    formatCostPerHour_(cost) {
        const perHourType = 'час';
        return this.formatCost_(cost, perHourType);
    }

    /**
     * @private
     * @param  {number} cost
     * @param  {string} type
     * @return {string}
     */
    formatCost_(cost, type) {
        let result;
        if (cost === 0) {
            result = 'Бесплатно';
        } else if (cost > 0) {
            result = `${cost} руб. / ${type}`;
        } else {
            result = ''; // 'Цена не указана';
        }
        return result;
    }

    /**
     * @private
     * @param  {Array<Object>} schedule
     * @return {string}
     */
    formatRegularity_(schedule) {
        let count = schedule.length,
            result;
        if (count == 0) {
            result = 'По желанию';
        } else if (count < 2 || count > 4) {
            result = count + ' раз в неделю';
        } else {
            result = count + ' раза в неделю';
        }
        return result;
    }

    /**
     * @private
     * @param  {boolean} online
     * @return {string}
     */
    formatOnline_(online) {
        return online ? 'Онлайн' : 'Очная';
    }

    /**
     * @private
     * @param  {number} duration
     * @return {string}
     */
    formatDuration_(duration) {
        let result;
        if (duration < 2) {
            result = '1 час';
        } else if (duration < 5) {
            result = duration + ' часа';
        } else {
            result = duration + ' часов';
        }
        return result;
    }

    /**
     * @private
     * @param  {Date} startDate
     * @return {string}
     */
    formatStartDate_(startDate) {
        return startDate ?
            startDate.getDate() + ' ' + MONTHS[startDate.getMonth()] :
            null;
    }

    /**
     * @private
     * @param  {string} key
     * @return {string}
     */
    getName_(key) {
        let option = this.availableOptions_.find(option => option.key == key);
        return option.name;
    }
};
