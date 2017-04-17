class ProgramsView {

    public list = function() {
        return [
            this.getListPrograms()
        ];
    };

    protected getListPrograms = function() {
        return {
            id: '1',
            imageUrl: 'http://vuzopedia.ru/themes/vuzopedia/assets/images' +
                '/logo/342.png',
            name: {light: 'Менеджмент'},
            score: 4,
            description: [
                '– Программы обмена (Великобритания, Нидерланды)',
                '– Нет вступительных испытаний'
            ],
            company: {
                abbreviation: 'НИУ-ВШЭ',
                city: 'Москва',
                name: 'Национальный исследовательский университет – ' +
                'Высшая школа экономики'
            },
            nicety: [
                {
                    title: {
                        text: 'Бюджетных мест: 100',
                        textForMobile: 'Бюджетных: 100',
                        selected: true
                    },
                    value: 'от 374 баллов'
                },
                {
                    title: {
                        text: 'Платных мест: 100',
                        textForMobile: 'Платных: 100'
                    },
                    value: 'от 170 тыс./год'
                }
            ],
            buttonLink: {
                data: {
                    content: 'Подробности',
                    url: '123'
                },
                config: {
                    borderRoundSize: 'm',
                    size: 'l',
                    theme: 'neptune-reverse'
                }
            }
        };
    };
}

export const programsView = new ProgramsView();
