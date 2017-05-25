"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userType_1 = require("../enums/userType");
class ProgramCommentView {
    constructor() {
        this.userTypes_ = [{
                label: 'Выпускник',
                value: userType_1.userType.GRADUATE
            },
            {
                label: 'Студент',
                value: userType_1.userType.STUDENT
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
                name: 'Образование'
            }, {
                name: 'Преподаватели'
            }, {
                name: 'Атмосфера'
            }, {
                name: 'Инфраструктура'
            }];
        this.commentHeaders_ = {
            pros: 'Что понравилось',
            cons: 'Не понравилось',
            advice: 'Какой совет можешь дать поступающим?'
        };
    }
    renderModal(params) {
        const buttonText = Object.keys(params.comment).length ?
            'Изменить отзыв' :
            'Оставить отзыв';
        const button = {
            data: {
                content: buttonText
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
    ;
    renderComment(params) {
        const userTypeData = this.userTypes_.find(item => {
            return item.value == params.comment.userType;
        });
        const userStatus = `${userTypeData.label} ` +
            (params.comment.yearGraduate || `${params.comment.grade} курса`);
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
        const userName = params.user ?
            params.user.firstName :
            (params.comment.username || null);
        return {
            author: {
                photoUrl: params.user ? params.user.photoUrl : null,
                name: userName,
                status: userStatus,
                grade: params.comment.grade
            },
            score: params.comment.totalScore,
            text: textItems
        };
    }
    ;
    renderCommentsList(params) {
        const buttonText = Object.keys(params.userComment).length ?
            'Изменить отзыв' :
            'Оставить отзыв';
        const items = params.comments ? params.comments
            .filter(comment => this.isEmptyCommentText_(comment))
            .map(comment => {
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
            header: params.title,
            leaveCommentButton: {
                content: buttonText
            },
            list: {
                items: items,
                itemType: 'smComment'
            }
        };
    }
    ;
    isEmptyCommentText_(programComment) {
        return Boolean(programComment.pros ||
            programComment.cons ||
            programComment.advice);
    }
    getModalContent_(comment) {
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
    }
    ;
    getDropdownParams_(params) {
        let items = [].concat(params.contentItems);
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
                openerArrowIcon: {
                    down: {
                        default: {
                            iconName: 'blue-arrow',
                            iconType: 'icon-svg',
                        }
                    }
                },
                theme: 'light'
            },
            controlName: 'dropdown-select'
        };
    }
    ;
    getInputParams_(params) {
        return {
            data: {
                name: params.name,
                placeholder: params.placeholder,
                value: params.value,
                maxLength: 4
            },
            config: {
                theme: 'thin',
                validations: ['notEmpty', 'digits']
            },
            controlName: 'input'
        };
    }
    ;
    getTextareaParams_(params) {
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
    }
    ;
    getEvaluations_(score) {
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
    }
    ;
}
exports.ProgramCommentView = ProgramCommentView;
