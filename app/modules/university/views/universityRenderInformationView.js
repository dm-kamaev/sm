"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FormatUtils = require('../../../../api/modules/entity/lib/FormatUtils');
const pageName = require('../../common/enums/pageName');
const entityType_1 = require("../../common/enums/entityType");
const Layout_1 = require("../../common/lib/Layout");
const UniversitySubHeader_1 = require("./UniversitySubHeader");
const UniversityFooter_1 = require("./UniversityFooter");
const LinksFormatter_1 = require("../../common/lib/LinksFormatter");
const utils_1 = require("../../common/lib/utils");
const ProgramCommentView_1 = require("../../comment/views/ProgramCommentView");
const informationCommonView_1 = require("./informationCommonView");
const UniversityImageSize_1 = require("../constants/UniversityImageSize");
class UniversityRenderInformationView extends Layout_1.LayoutView {
    constructor() {
        super();
        this.views.subHeader = UniversitySubHeader_1.UniversitySubHeader;
        this.views.footer = UniversityFooter_1.UniversityFooter;
        this.entityType = entityType_1.entityType.UNIVERSITY;
        this.pageName = pageName.INFORMATION;
        this.subHeader = {
            isLogoRedirect: true,
            isSearchRedirect: true,
            isBottomLine: true
        };
        this.type = 'Информация о вузе';
    }
    setParams(params) {
        super.setParams(params);
        this.setEntityData_(params.data);
        this.setSubscribeBoard_(params.data);
        this.setNavigationPanel_(params.data);
        this.setComments_(params.data);
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
        this.params.data.openGraph.relapTag = this.type;
        const relapImage = utils_1.utils.getImageUrl(data.university.imageUrl, UniversityImageSize_1.UniversityImageSize.RELAP);
        this.params.data.openGraph.image = relapImage;
        this.params.data.openGraph.relapImage = relapImage;
    }
    setEntityData_(data) {
        this.params.data.entityData = {
            id: data.university.id,
            name: data.university.name,
            type: this.type,
            description: data.university.description,
            sketch: this.getSketchParams_(data),
            cutDescription: informationCommonView_1.informationCommonView.getCutDescription(data.university.description),
            descriptionList: this.getDescriptionListParams_(data),
            summaryBoard: this.getSummaryBoardParams_(data),
            banner: informationCommonView_1.informationCommonView.getBannerParams(),
            entityRelation: informationCommonView_1.informationCommonView.getEntityRelationParams(data.university.city.name)
        };
    }
    getDefaultSeoData_(data) {
        let description = '';
        if (data.university.description) {
            description = data.university.description;
            const formatUtils = new FormatUtils();
            while (~description.indexOf('.')) {
                description = formatUtils.cutText(description, description.length - 1, '.');
            }
        }
        return {
            title: data.university.name,
            description: description
        };
    }
    getSketchParams_(data) {
        const params = {
            description: 'Remove',
            imageAltText: data.university.name,
            imageUrl: data.university.imageUrl,
            buttonText: 'Remove'
        };
        return informationCommonView_1.informationCommonView.getSketchParams(params);
    }
    getDescriptionListParams_(data) {
        const result = {
            items: []
        };
        if (data.university.links && data.university.links.length > 0) {
            const linksFormatter = new LinksFormatter_1.LinksFormatter();
            const links = data.university.links.map(link => ({
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
        return result;
    }
    getSummaryBoardParams_(data) {
        const neptuneTheme = 'neptune';
        let itemHeader, itemDescription;
        const cost = 'min cost';
        if (cost) {
            itemHeader = 'Стоимость / год';
            itemDescription = `от ${cost} ₽`;
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
        const list = [{
                header: 'Главное',
                items: []
            }];
        return { item, list, buttonLink };
    }
    setComments_(data) {
        const programCommentView = new ProgramCommentView_1.ProgramCommentView();
        this.params.data.comments = programCommentView.renderCommentsList({
            comments: data.comments,
            users: data.users
        });
    }
    setSubscribeBoard_(data) {
        this.params.data.subscribeBoard = {
            data: {
                entityId: data.university.id,
                entityType: this.entityType,
                header: {
                    textL: 'Подписка на новости этого Вуза:',
                    textS: 'Подписка на новости:'
                }
            }
        };
    }
    setNavigationPanel_(data) {
        // this.params.data.navigationPanel =
        //     navigationPanelView.getForProgram(data);
    }
}
UniversityRenderInformationView.FULL_DESCRIPTION_LENGTH = 280;
exports.universityRenderInformationView = new UniversityRenderInformationView();
