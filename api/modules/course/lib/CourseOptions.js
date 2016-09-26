'use strict';

const WEEK_DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

module.exports = class {
    /**
     * @param {Array<Object>} options
     */
    constructor(options) {
        /**
         * @type {Array<Object>}
         */
        this.options_ = this.formatOptions_(options);

        /**
         * @type {Array<Object>}
         */
        this.generalOptions_ = [{
            key: 'age',
            name: 'Возраст'
        }, {
            key: 'schedule',
            name: 'Расписание'
        }, {
            key: 'maxGroupSize',
            name: 'Группы'
        }];
    }

    /**
     * Get course's options which are the same
     * @return {Array<Object>}
     */
    getGeneralOptions() {
        return this.generalOptions_.map(generalOption =>
                this.getGeneralOptionValue_(generalOption)
            )
            .filter(generalOption => generalOption);
    }

    /**
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
            age: this.formatAge_(option.age),
            schedule: this.formatSchedule_(option.schedule),
            maxGroupSize: this.formatGroupSize_(option.maxGroupSize)
        }));
    }

    /**
     * @private
     * @param  {Array<number>} age
     * @return {string}
     */
    formatAge_(age) {
        return age[0] + '—' + age[age.length - 1] + ' лет';
    }

    /**
     * @private
     * @param  {Object} schedule
     * @return {string}
     */
    formatSchedule_(schedule) {
        return schedule.map(item =>
            WEEK_DAYS[item.day] + item.startTime + item.endTime
        ).join(', ');
    }

    /**
     * @private
     * @param  {string} time
     * @return {string}
     */
    formatTime_(time) {
        let result = time.split(':'),
            hour = result[0],
            minute = result[1];
        return hour + ':' + minute;
    }

    /**
     * @private
     * @param  {number} maxGroupSize
     * @return {string}
     */
    formatGroupSize_(maxGroupSize) {
        let result;
        if (maxGroupSize === 0) {
            result = 'Размер группы не указан';
        } else if (maxGroupSize === 1) {
            result = 'Индивидуальные занятия';
        } else {
            result = 'Не более ' + maxGroupSize + ' человек в группе';
        }
        return result;
    }
};
