"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:max-file-line-count */
// Made by anedashkovsky for store some params in view
// TODO: enable this rule
const pageName = require('../../common/enums/pageName');
const entityType_1 = require("../../common/enums/entityType");
const Layout_1 = require("../../common/lib/Layout");
const UniversitySubHeader_1 = require("./UniversitySubHeader");
const UniversityFooter_1 = require("./UniversityFooter");
const FormatUtils_1 = require("../../common/lib/FormatUtils");
const LinksFormatter_1 = require("../../common/lib/LinksFormatter");
const utils_1 = require("../../common/lib/utils");
const courseView_1 = require("../../course/views/courseView");
const ProgramCommentView_1 = require("../../comment/views/ProgramCommentView");
const navigationPanelView_1 = require("./navigationPanelView");
const UniversityImageSize_1 = require("../constants/UniversityImageSize");
const CourseImageSize_1 = require("../../course/constants/CourseImageSize");
const staticImgPath = '/static/images/n-common/b-sm-item/b-sm-item_entity/images/';
const relapImgPath = '/static/images/n-university/relap.png';
const formatter = new FormatUtils_1.FormatUtils();
const programNameMaxLength = 50;
class InformationView extends Layout_1.LayoutView {
    constructor() {
        super(entityType_1.entityType.PROGRAM);
        this.views.subHeader = UniversitySubHeader_1.UniversitySubHeader;
        this.views.footer = UniversityFooter_1.UniversityFooter;
        this.pageName = pageName.INFORMATION;
        this.subHeader = {
            isLogoRedirect: true,
            isSearchRedirect: true,
            isBottomLine: true
        };
        this.subunitType = 'Программа обучения';
    }
    render(params) {
        return super.render(params);
    }
    setParams(params) {
        super.setParams(params);
        this.setEntityData_(params.data, params.data.userComment);
        this.setSubscribeBoard_(params.data);
        this.setNavigationPanel_(params.data);
        this.setComments_(params.data, params.data.userComment);
        this.setSimilarPrograms_(params.data);
        this.setUsefulCourses_(params.data);
        this.setModalComment_(params.data.program.id, params.data.userComment);
    }
    getParams() {
        return this.params;
    }
    setSeo(data) {
        const seoData = this.getDefaultSeoData_(data);
        this.params.data.seo = {
            metaTitle: data.pageMeta.tabTitle || seoData.title,
            metaDescription: data.pageMeta.seoDescription || seoData.description
        };
    }
    setOpenGraph(config, data) {
        super.setOpenGraph(config, data);
        const seoData = this.getDefaultSeoData_(data), pageMeta = data.pageMeta;
        const description = pageMeta.openGraphDescription ||
            pageMeta.seoDescription ||
            seoData.description;
        this.params.data.openGraph.title = pageMeta.tabTitle || seoData.title;
        this.params.data.openGraph.description = description;
        this.params.data.openGraph.relapTag = this.subunitType;
        let relapImage;
        if (data.university.relapImageUrl) {
            relapImage = utils_1.utils.getImageUrl(data.university.relapImageUrl, UniversityImageSize_1.UniversityImageSize.RELAP);
        }
        else {
            relapImage = relapImgPath;
        }
        this.params.data.openGraph.image = relapImage;
        this.params.data.openGraph.relapImage = relapImage;
    }
    setEntityData_(data, userComment) {
        this.params.data.entityData = {
            id: data.program.id,
            name: data.university.name,
            abbreviation: data.university.abbreviation,
            category: 'major',
            subunitName: data.program.name,
            subunitType: this.subunitType,
            description: data.program.description,
            sketch: this.getSketchParams_(data, userComment),
            cutDescription: this.getCutDescription_(data.program.description),
            descriptionList: this.getDescriptionListParams_(data),
            summaryBoard: this.getSummaryBoardParams_(data),
            banner: this.getBannerParams_(data),
            entityRelation: this.getEntityRelationParams_(data),
        };
    }
    getDefaultSeoData_(data) {
        const oksoCode = data.program.oksoCode ?
            `(${data.program.oksoCode}) ` :
            '';
        let description;
        if (data.program.description) {
            description = data.program.description;
            const formatUtils = new FormatUtils_1.FormatUtils();
            while (~description.indexOf('.')) {
                description = formatUtils.cutText(description, description.length - 1, '.');
            }
        }
        else {
            description = `${data.program.name} в ` +
                data.university.abbreviation;
        }
        return {
            title: `${data.program.name} ${oksoCode}– ` +
                data.university.abbreviation,
            description: description
        };
    }
    getSketchParams_(data, userComment) {
        const universityName = data.university.name, backendImageUrl = data.university.imageUrl;
        const imageUrlDefault = utils_1.utils.getImageUrl(backendImageUrl, UniversityImageSize_1.UniversityImageSize.MEDIUM);
        const imageUrlSizeL = utils_1.utils.getImageUrl(backendImageUrl, UniversityImageSize_1.UniversityImageSize.DEFAULT);
        const buttonText = Object.keys(userComment).length ?
            'Изменить отзыв' :
            'Оставить отзыв';
        const sources = backendImageUrl ?
            [{
                    url: utils_1.utils.getImageUrl(backendImageUrl, UniversityImageSize_1.UniversityImageSize.MEDIUM),
                    size: 'default'
                }, {
                    url: utils_1.utils.getImageUrl(backendImageUrl, UniversityImageSize_1.UniversityImageSize.DEFAULT),
                    size: 'l'
                }] :
            [{
                    url: staticImgPath + 'placeholder_parthenon.png',
                    size: 'default'
                }];
        return {
            description: universityName,
            picture: {
                altText: universityName,
                sources: sources
            },
            button: {
                data: {
                    content: buttonText
                },
                config: {
                    theme: 'neptune',
                    borderRoundSize: 'xl'
                }
            }
        };
    }
    getCutDescription_(text) {
        let result = {
            cutText: null,
            fullText: null
        };
        if (text && text.length > InformationView.FULL_DESCRIPTION_LENGTH) {
            const formatUtils = new FormatUtils_1.FormatUtils();
            const cutText = formatUtils.cutText(text, InformationView.FULL_DESCRIPTION_LENGTH, ' ');
            result.fullText = [text];
            result.cutText = [cutText];
        }
        else if (text) {
            result.cutText = [text];
        }
        else {
            result = null;
        }
        return result;
    }
    getDescriptionListParams_(data) {
        const result = {
            items: []
        };
        if ((data.egeExams && data.egeExams.length > 0) ||
            (data.program.extraExam && data.program.extraExam.length > 0)) {
            let entranceTests = data.egeExams.map(exam => `${exam.subjectName} (ЕГЭ)`);
            if (data.program.extraExam && data.program.extraExam.length > 0) {
                entranceTests = entranceTests.concat(data.program.extraExam);
            }
            result.items.push({
                data: {
                    header: 'Вступительные испытания',
                    subitems: entranceTests
                },
                config: {
                    inline: true
                }
            });
        }
        if (data.program.links && data.program.links.length > 0) {
            const linksFormatter = new LinksFormatter_1.LinksFormatter();
            const links = data.program.links.map(link => ({
                url: link,
                content: linksFormatter.getContent(link)
            }));
            result.items.push({
                data: {
                    header: 'Полезные ссылки',
                    subitems: links
                },
                config: {
                    inline: false
                }
            });
        }
        if (data.program.specializations &&
            data.program.specializations.length > 0) {
            result.items.push({
                data: {
                    header: 'Специализации',
                    subitems: data.program.specializations
                },
                config: {
                    inline: false
                }
            });
        }
        return result;
    }
    getSummaryBoardParams_(data) {
        const neptuneTheme = 'neptune';
        let itemHeader, itemDescription;
        const cost = data.entranceStatistic.cost;
        if (cost) {
            const formattedCost = this.formatCost(cost);
            itemHeader = 'Стоимость / год';
            itemDescription = `${formattedCost} ₽`;
        }
        const item = {
            data: {
                header: itemHeader,
                description: itemDescription
            },
            config: {
                theme: neptuneTheme
            }
        };
        const buttonLink = {
            data: {
                url: '',
                content: 'Проконсультироваться'
            },
            config: {
                theme: neptuneTheme,
                size: 'xxl',
                borderRoundSize: 'm'
            }
        };
        const listItems = [], formatUtils = new FormatUtils_1.FormatUtils(), egePassScore = data.entranceStatistic.egePassScore;
        let phrase;
        if (egePassScore) {
            const egeExamsAmount = data.egeExams.length;
            let description;
            if (egeExamsAmount) {
                phrase = formatUtils.declensionPrint(egeExamsAmount, {
                    'nom': 'экзамен',
                    'gen': 'экзамена',
                    'plu': 'экзаменов'
                });
                description = `за ${egeExamsAmount} ${phrase}`;
            }
            else {
                description = 'По сумме всех экзаменов';
            }
            listItems.push({
                data: {
                    header: `${data.entranceStatistic.egePassScore} баллов`,
                    description: description
                },
                config: {
                    theme: 'neptune'
                }
            });
        }
        const budgetPlaces = data.entranceStatistic.budgetPlaces;
        if (budgetPlaces >= 0 && budgetPlaces !== null) {
            phrase = formatUtils.declensionPrint(budgetPlaces, {
                'nom': 'бюджетное место',
                'gen': 'бюджетных места',
                'plu': 'бюджетных мест'
            });
            listItems.push({
                data: {
                    header: budgetPlaces,
                    description: phrase
                }
            });
        }
        const commercialPlaces = data.entranceStatistic.commercialPlaces;
        if (commercialPlaces >= 0 && commercialPlaces !== null) {
            phrase = formatUtils.declensionPrint(commercialPlaces, {
                'nom': 'платное место',
                'gen': 'платных места',
                'plu': 'платных мест'
            });
            listItems.push({
                data: {
                    header: commercialPlaces,
                    description: phrase
                }
            });
        }
        if (budgetPlaces &&
            data.entranceStatistic.competition &&
            data.entranceStatistic.competition != 0) {
            listItems.push({
                data: {
                    header: data.entranceStatistic.competition,
                    description: 'человек на место'
                },
                config: {
                    iconType: 'people'
                }
            });
        }
        const list = [{
                header: 'Главное',
                items: listItems
            }];
        return { item, list, buttonLink };
    }
    formatCost(cost) {
        const costStr = cost.toString();
        return costStr.length ?
            this.formatCost(costStr.substr(0, costStr.length - 3)) + ' ' +
                costStr.slice(-3) : '';
    }
    getBannerParams_(data) {
        return {
            data: {
                header: 'Сомневаешься?',
                description: 'Поможем с выбором и поступлением',
                buttonLink: {
                    data: {
                        url: '',
                        content: 'Подробнее'
                    },
                    config: {
                        theme: 'neptune-reverse',
                        size: 'xxl'
                    }
                }
            },
            config: {
                theme: 'neptune-compact'
            }
        };
    }
    getEntityRelationParams_(data) {
        return {
            data: {
                items: [{
                        data: {
                            content: 'ВУЗ'
                        }
                    }, {
                        data: {
                            content: data.university.city.name
                        }
                    }]
            }
        };
    }
    setComments_(data, userComment) {
        const programName = data.program.name, abbreviation = data.university.abbreviation;
        const programCommentView = new ProgramCommentView_1.ProgramCommentView();
        this.params.data.comments = programCommentView.renderCommentsList({
            title: `Отзывы – ${programName} (${abbreviation})`,
            comments: data.comments,
            userComment: userComment,
            users: data.users
        });
    }
    setSimilarPrograms_(data) {
        this.params.data.similarPrograms = data.similarPrograms.length ? {
            header: {
                default: 'Похожие программы обучения',
                sizeXS: 'Похожие программы'
            },
            data: {
                countItemsPerPage: 4,
                items: data.similarPrograms.map(program => this.getSimilarProgramItem_(program)),
                itemType: 'smInformationCard'
            }
        } :
            null;
    }
    getSimilarProgramItem_(similarProgram) {
        return {
            id: similarProgram.id,
            type: entityType_1.entityType.PROGRAM,
            name: similarProgram.name.length > programNameMaxLength ?
                formatter.getFormattedCutName(similarProgram.name, programNameMaxLength) :
                similarProgram.name,
            link: {
                data: {
                    content: 'Программа',
                    url: similarProgram.url
                },
                config: {
                    size: 'xl'
                }
            },
            buttonLink: {
                data: {
                    icon: 'arrow-circle',
                    iconType: 'svg',
                    url: similarProgram.url
                }
            }
        };
    }
    setUsefulCourses_(data) {
        this.params.data.usefulCourses = data.usefulCourses.length ? {
            header: 'Полезные курсы',
            data: {
                countItemsPerPage: 3,
                items: data.usefulCourses.map(course => this.getUsefulCourseParams_(course)),
                itemType: 'smItemCompact',
                itemConfig: {
                    theme: 'neptune-imaged',
                    enableCover: true,
                    isDescriptionLink: true,
                    nameLinkSize: 'xl',
                    nameLinkTheme: 'default',
                    isLinksInNewTab: true
                }
            }
        } :
            null;
    }
    getUsefulCourseParams_(data) {
        const imageUrl = utils_1.utils.getImageUrl(data.imageUrl, CourseImageSize_1.CourseImageSize.LARGE);
        return {
            id: data.id,
            type: 'course',
            name: {
                light: data.categoryName
            },
            description: `${data.name}`,
            picture: imageUrl ? {
                sources: [{
                        url: imageUrl,
                        size: 'default'
                    }],
                altText: data.categoryName,
            } : null,
            url: courseView_1.courseView.getLink(data.url),
            nameLinkUrl: courseView_1.courseView.getLink(data.categoryUrl),
            placeholder: {
                url: '/static/images/n-common/b-sm-item/b-sm-item_entity' +
                    '/images/placeholder.png'
            }
        };
    }
    setSubscribeBoard_(data) {
        this.params.data.subscribeBoard = {
            data: {
                entityId: data.program.id,
                entityType: entityType_1.entityType.PROGRAM
            }
        };
    }
    setNavigationPanel_(data) {
        this.params.data.navigationPanel =
            navigationPanelView_1.navigationPanelView.getForProgram(data);
    }
    setModalComment_(programId, userComment) {
        const programCommentView = new ProgramCommentView_1.ProgramCommentView();
        this.params.data.modalComment = programCommentView.renderModal({
            programId: programId,
            comment: userComment
        });
    }
}
InformationView.FULL_DESCRIPTION_LENGTH = 280;
exports.informationView = new InformationView();
