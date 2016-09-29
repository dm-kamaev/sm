'use strict';

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
    ];

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
        this.availableOptions_ = [{
            key: 'age',
            name: 'Возраст'
        }, {
            key: 'costPerHour',
            name: 'Стоимость'
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
            name: 'Продолжительность занятия'
        }, {
            key: 'startDate',
            name: 'Начало занятий'
        }];

        this.uniqueOptions_ = [];
    }

    /**
     * Get course's options which are the same
     * @return {Array<Object>}
     */
    getGeneralOptions() {
        return this.availableOptions_.map(generalOption =>
                this.getGeneralOptionValue_(generalOption)
            )
            .filter(generalOption => generalOption);
    }

    /**
     * @param  {Array<Object>} generalOptions
     * @return {Array<Object>}
     */
    getUniqueOptions(generalOptions) {
        let uniqueKeys = this.getUniqueKeys_(generalOptions);
        return this.options_.map(option => this.getUniqueOptionValue_(option));
    }

    /**
     * @private
     * @param  {Array<Object>} generalOptions
     * @return {Array<string>}
     */
    getUniqueKeys_(generalOptions) {
        return this.availableOptions_.map(availableOption =>
                generalOptions.every(generalOption =>
                    generalOption.key != availableOption.key
                ) ? availableOption : null
            )
            .filter(item => item);
    }

    /**
     * @private
     * @param  {Object} option
     * @return {Object}
     */
    getUniqueOptionValue_() {
        // console.log(this.options_[0]);
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
            departments: option.departments.map(d => d.address.toJSON()),
            age: this.formatAge_(option.age),
            schedule: this.formatSchedule_(option.schedule),
            maxGroupSize: this.formatGroupSize_(option.maxGroupSize),
            costPerHour: this.formatCost_(option.costPerHour),
            regularity: this.formatRegularity_(option.schedule),
            online: this.formatOnline_(option.online),
            duration: this.formatDuration_(option.duration),
            startDate: this.formatStartDate_(option.startDate)
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
            WEEK_DAYS[item.day] + ' ' + this.formatTime_(item.startTime) +
                '—' + this.formatTime_(item.endTime)
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

    /**
     * @private
     * @param  {number} cost
     * @return {string}
     */
    formatCost_(cost) {
        let result;
        if (cost === 0) {
            result = 'Бесплатно';
        } else if (cost > 0) {
            result = cost + ' руб. / час';
        } else {
            result = 'Цена не указана';
        }
        return result;
    }

    /**
     * @private
     * @param  {Array<Object>} schedule
     * @return {string}
     */
    formatRegularity_(schedule) {
        let count = schedule.length;
        return count < 2 || count > 4 ? count + ' раз в неделю' :
            count + ' раза в неделю';
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
        return startDate.getDate() + ' ' + MONTHS[startDate.getMonth()];
    }
};
