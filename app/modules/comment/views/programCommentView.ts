import {
    gModalInteraction
} from '../../../blocks/n-clobl/g-modal/g-modal_interaction/params';
import {gButtonStendhal} from '../../../blocks/n-clobl/g-button/params';
import {gTextareaStendhal} from '../../../blocks/n-clobl/g-textarea/params';
import {
    gDropdownSelect
} from '../../../blocks/n-clobl/g-dropdown/g-dropdown_select/params';
import {gInputStendhal} from '../../../blocks/n-clobl/g-input/params';
import {
    bSmInteractionForm
} from '../../../blocks/n-common/b-sm-interaction-form/params';


import {BackendProgramComment} from '../../university/types/programComment';

import {userType} from '../enums/userType';

type DropdownItem = {
    label: (string|number);
    value: (string|number);
    isSelected?: boolean;
};

type EvaluationItem = {
    name: string;
    description: string;
    selectedAmount?: number;
};

type Input = {
    data: gInputStendhal.Params.Data;
    config: gInputStendhal.Params.Config;
    controlName: string;
};

type Dropdown = {
    data: gDropdownSelect.Params.Data;
    config: gDropdownSelect.Params.Config;
    controlName: string;
};

interface Textarea extends gTextareaStendhal.Params {
    data: {
        title?: string;
        placeholder?: string;
        value?: string;
        name?: string;
        maxLength?: number;
    },
    config: gTextareaStendhal.Params.Config;
    controlName: string;
}

type Evaluations = {
    title: string;
    items: Array<EvaluationItem>;
};

type ModalRenderParams = {
    programId: number;
    comment?: BackendProgramComment;
};

class ProgramCommentView {
    private userTypes_: Array<DropdownItem>;
    private grades_: Array<DropdownItem>;
    private evaluationItems_: Array<EvaluationItem>;

    constructor() {
        this.userTypes_ = [{
            label: 'Выпускник',
            value: userType.GRADUATE
        },
        {
            label: 'Студент',
            value: userType.STUDENT
        }];

        this.grades_ = [{
            label: 1,
            value: 1
        },
        {
            label: 2,
            value: 2
        },
        {
            label: 3,
            value: 3
        },
        {
            label: 4,
            value: 4
        },
        {
            label: 5,
            value: 5
        },
        {
            label: 6,
            value: 6
        }];


        this.evaluationItems_ = [{
            name: 'Образование',
            description: `Достигают ли ученики высоких
                результатов на государственных экзаменах,
                олимпиадах и вступительных испытаниях в ВУЗах?`
        }, {
            name: 'Преподаватели',
            description: `Являются ли учителя квалифицированными
                специалистами, которые любят свою работу, хорошо
                общаются с детьми и помогают им получать
                отличные знания?`
        }, {
            name: 'Атмосфера',
            description: `Созданы ли в школе комфортная для
                получения знаний атмосфера и доверительные
                отношения между учениками, учителями,
                родителями и администрацией?`
        }, {
            name: 'Инфраструктура',
            description: `Хорошо ли оборудована школа, есть ли
                в ней всё для комфортного обучения и
                всестороннего развития детей?`
        }];
    }

    public renderModal(
        params: ModalRenderParams
    ): gModalInteraction.Params.Data {

        const button: gButtonStendhal.Params = {
            data: {
                content: 'Оставить отзыв'
            },
            config: {
                theme: 'neptune-reverse',
                borderRoundSize: 'xl',
                size: 'xl'
            }
        };

        return {
            id: params.comment.id,
            api: `/program/${params.programId}/comment`,
            header: {
                text: 'Оставьте ваш отзыв'
            },
            content: this.getModalContent_(params.comment),
            contentName: 'smInteractionFormComment',
            button: button,
            closer: {
                iconName: 'blue-close',
                iconType: 'icon-svg'
            }
        };
    }

    private getModalContent_(
        comment?: BackendProgramComment
    ): (bSmInteractionForm.Params.Data|any) {

        return {
            userFields: {
                userType: this.getDropdownParams_({
                    name: 'userType',
                    defaultOpenerText: 'Кто вы?',
                    contentItems: this.userTypes_,
                    selectedValue: comment.userType
                }),
                yearGraduate: this.getInputParams_({
                    name: 'yearGraduate',
                    placeholder: 'Укажите год выпуска',
                    value: comment.yearGraduate
                }),
                grade: this.getDropdownParams_({
                    name: 'grade',
                    defaultOpenerText: 'Укажите курс',
                    contentItems: this.grades_,
                    selectedValue: comment.grade
                })
            },
            fields: [
                this.getTextareaParams_({
                    title: 'Что понравилось',
                    name: 'pros',
                    placeholder: 'Ваш комментарий',
                    value: comment.pros
                }),
                this.getTextareaParams_({
                    title: 'Не понравилось',
                    name: 'cons',
                    placeholder: 'Ваш комментарий',
                    value: comment.cons
                }),
                this.getTextareaParams_({
                    title: 'Какой совет можешь дать поступающим?',
                    name: 'advice',
                    placeholder: 'Ваш комментарий',
                    value: comment.advice
                })
            ],
            evaluations: this.getEvaluations_(comment.score)
        }
    };


    private getDropdownParams_(params): Dropdown {
        let items = params.contentItems;

        if (params.selectedValue) {
            items = items.map(item => {
                item.isSelected = item.value == params.selectedValue ?
                    true :
                    false;

                return item;
            });
        }

        return {
            data: {
                name: params.name,
                defaultOpenerText: params.defaultOpenerText,
                content: {
                    items: items
                },
                contentConfig: {
                    size: 'm'
                }
            },
            config: {
                iconName: 'blue-arrow',
                iconType: 'icon-svg',
                theme: 'light'
            },
            controlName: 'dropdown-select'
        }
    };


    private getInputParams_(params): Input {
        return {
            data: {
                name: params.name,
                placeholder: params.placeholder,
                value: params.value
            },
            config: {
                theme: 'thin',
                validations: ['notEmpty']
            },
            controlName: 'input'
        };
    };


    private getTextareaParams_(params): Textarea {
        return {
            data: {
                title: params.title,
                name: params.name,
                placeholder: params.placeholder,
                maxLength: 500,
                value: params.value
            },
            config: {
                showCounter: true,
                autoHeight: true,
                theme: 'thin',
                minHeight: 'large'
            },
            controlName: 'textarea'
        };
    };


    private getEvaluations_(score: Array<number>): Evaluations {
        let items = this.evaluationItems_;

        if (score && score.length) {
            items = items.map((item, index) => {
                item.selectedAmount = score[index];
                return item;
            })
        }

        return {
            title: 'Ваши оценки',
            items: items
        };
    };
};

export const programCommentView = new ProgramCommentView();
