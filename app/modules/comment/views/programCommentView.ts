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

import {
    bCommentList
} from '../../../blocks/n-university/l-university/b-comment-list/params';
import {bSmComment} from '../../../blocks/n-common/b-sm-comment/params';

import {BackendProgramComment} from '../types/programComment';
import {BackendUser} from '../../user/types/user';

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
    };
    controlName: string;
}

type Evaluations = {
    title: string;
    items: Array<EvaluationItem>;
};

type DropdownData = {
    name: string;
    defaultOpenerText: string;
    contentItems: Array<DropdownItem>;
    selectedValue?: (string|number);
};

type InputData = {
    name: string;
    placeholder?: string;
    value?: (string|number);
};

type TextareaData = {
    title: string;
    name: string;
    value?: string;
};

type ModalRenderParams = {
    programId: number;
    comment?: BackendProgramComment;
};

type CommentsListParams = {
    comments: Array<BackendProgramComment>;
    users: Array<BackendUser>;
};

type CommentParams = {
    comment: BackendProgramComment;
    user: BackendUser;
};

class ProgramCommentView {
    private userTypes_: Array<DropdownItem>;
    private grades_: Array<DropdownItem>;
    private evaluationItems_: Array<EvaluationItem>;

    private commentHeaders_: {
        pros: string;
        cons: string;
        advice: string;
    };

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

        this.commentHeaders_ = {
            pros: 'Что понравилось',
            cons: 'Не понравилось',
            advice: 'Какой совет можешь дать поступающим?'
        };
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
    };


    public renderComment(params: CommentParams): bSmComment.Params.Data {
        const userTypeData: DropdownItem = this.userTypes_.find(item => {
            return item.value == params.comment.userType;
        });

        const userStatus: string = `${userTypeData.label} ` +
            params.comment.yearGraduate ||
            `${params.comment.grade} курса`;

        const textItems = [];

        params.comment.pros ? textItems.push({
            header: this.commentHeaders_.pros,
            description: params.comment.pros
        }) :
        null;

        params.comment.cons ? textItems.push({
            header: this.commentHeaders_.cons,
            description: params.comment.cons
        }) :
        null;

        params.comment.advice ? textItems.push({
            header: this.commentHeaders_.advice,
            description: params.comment.advice
        }) :
        null;

        return {
            author: {
                photoUrl: params.user ? params.user.photoUrl : null,
                name: params.user ? params.user.firstName : null,
                status: userStatus
            },
            score: params.comment.totalScore,
            text: textItems
        };
    };


    public renderCommentsList(
        params: CommentsListParams
    ): bCommentList.Params.Data {

        const items = params.comments ? params.comments.map(comment => {
            const userData = params.users ?
                params.users.find(user => user.id == comment.userId) :
                null;

            return this.renderComment({
                comment: comment || {},
                user: userData
            });
        }) :
        null;

        return {
            header: 'Отзывы – Менеджмент (НИУ–ВШЭ)',
            list: {
                items: items,
                itemType: 'smComment'
            }
        };
    };


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
                    title: this.commentHeaders_.pros,
                    name: 'pros',
                    value: comment.pros
                }),
                this.getTextareaParams_({
                    title: this.commentHeaders_.cons,
                    name: 'cons',
                    value: comment.cons
                }),
                this.getTextareaParams_({
                    title: this.commentHeaders_.advice,
                    name: 'advice',
                    value: comment.advice
                })
            ],
            evaluations: this.getEvaluations_(comment.score)
        };
    };


    private getDropdownParams_(params: DropdownData): Dropdown {
        let items = params.contentItems;

        if (params.selectedValue) {
            items = items.map(item => {
                item.isSelected = item.value == params.selectedValue;

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
        };
    };


    private getInputParams_(params: InputData): Input {
        return {
            data: {
                name: params.name,
                placeholder: params.placeholder,
                value: params.value
            },
            config: {
                theme: 'thin',
                validations: ['notEmpty', 'digits']
            },
            controlName: 'input'
        };
    };


    private getTextareaParams_(params: TextareaData): Textarea {
        return {
            data: {
                title: params.title,
                name: params.name,
                placeholder: 'Ваш комментарий',
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
            });
        }

        return {
            title: 'Ваши оценки',
            items: items
        };
    };
}

export const programCommentView = new ProgramCommentView();
