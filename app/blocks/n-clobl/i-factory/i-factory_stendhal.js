goog.provide('sm.iFactory.FactoryStendhal');

goog.require('cl.iFactory.Factory');
goog.require('sm.bAuthorizationLink.AuthorizationLink');
goog.require('sm.bAuthorizationLink.View');
goog.require('sm.bBanner.Banner');
goog.require('sm.bBanner.View');
goog.require('sm.bDataBlock.DataBlockFeatures');
goog.require('sm.bDataBlock.DataBlockFeaturesView');
goog.require('sm.bFavorite.Favorite');
goog.require('sm.bFavorite.View');
goog.require('sm.bFavoriteLink.FavoriteLink');
goog.require('sm.bFavoriteLink.View');
goog.require('sm.bHeader.Header');
goog.require('sm.bHeader.View');
goog.require('sm.bPopularSchools.PopularSchools');
goog.require('sm.bPopularSchools.View');
goog.require('sm.bSchoolListPaged.SchoolListPaged');
goog.require('sm.bSchoolListPaged.View');
goog.require('sm.bSearchPanel.SearchPanel');
goog.require('sm.bSearchPanel.View');
goog.require('sm.bSmBadge.SmBadge');
goog.require('sm.bSmBadge.View');
goog.require('sm.bSmBalloon.SmBalloon');
goog.require('sm.bSmBalloon.View');
goog.require('sm.bSmCheckbox.SmCheckbox');
goog.require('sm.bSmCheckbox.View');
goog.require('sm.bSmCollapsedText.SmCollapsedText');
goog.require('sm.bSmCollapsedText.View');
goog.require('sm.bSmExpander.SmExpander');
goog.require('sm.bSmExpander.View');
goog.require('sm.bSmFavorite.SmFavorite');
goog.require('sm.bSmFavorite.View');
goog.require('sm.bSmFooter.SmFooter');
goog.require('sm.bSmFooter.View');
goog.require('sm.bSmHeader.SmHeader');
goog.require('sm.bSmHeader.View');
goog.require('sm.bSmItem.SmItem');
goog.require('sm.bSmItem.SmItemEntity');
goog.require('sm.bSmItem.View');
goog.require('sm.bSmItem.ViewEntity');
goog.require('sm.bSmItemList.SmItemList');
goog.require('sm.bSmItemList.View');
goog.require('sm.bSmLink.SmLink');
goog.require('sm.bSmLink.View');
goog.require('sm.bSmListPaged.SmListPaged');
goog.require('sm.bSmListPaged.View');
goog.require('sm.bSmMap.SmMap');
goog.require('sm.bSmMap.View');
goog.require('sm.bSmRadioButton.SmRadioButton');
goog.require('sm.bSmRadioButton.View');
goog.require('sm.bSmScore.SmScore');
goog.require('sm.bSmScore.SmScoreBrief');
goog.require('sm.bSmScore.View');
goog.require('sm.bSmScore.ViewBrief');
goog.require('sm.bSmSearchPanel.SmSearchPanel');
goog.require('sm.bSmSearchPanel.View');
goog.require('sm.bSmStars.SmStars');
goog.require('sm.bSmStars.View');
goog.require('sm.bSmSubheader.SmSubheader');
goog.require('sm.bSmSubheader.View');
goog.require('sm.gAuthSocial.ViewStendhal');
goog.require('sm.gDropdown.DropdownListLinks');
goog.require('sm.gDropdown.DropdownSelect');
goog.require('sm.gDropdown.DropdownSelectLegacy');
goog.require('sm.gDropdown.ViewListLinks');
goog.require('sm.gDropdown.ViewSelectLegacy');
goog.require('sm.gInput.DigitInput');
goog.require('sm.gInput.DigitInputView');
goog.require('sm.gInput.InputPhone');
goog.require('sm.gInput.InputStendhal');
goog.require('sm.gInput.ViewPhone');
goog.require('sm.gInput.ViewStendhal');
goog.require('sm.gList.List.Select');
goog.require('sm.gList.ListLinks');
goog.require('sm.gList.ListStendhal');
goog.require('sm.gList.ViewLinks');
goog.require('sm.gList.ViewSelect');
goog.require('sm.gList.ViewStendhal');
goog.require('sm.gModal.ModalEnrollment');
goog.require('sm.gModal.ModalFeedback');
goog.require('sm.gModal.ModalSideMenu');
goog.require('sm.gModal.ModalSideMenuView');
goog.require('sm.gModal.ModalStendhal');
goog.require('sm.gModal.ModalSuccess');
goog.require('sm.gModal.ViewEnrollment');
goog.require('sm.gModal.ViewFeedback');
goog.require('sm.gModal.ViewStendhal');
goog.require('sm.gModal.ViewSuccess');
goog.require('sm.gTextarea.TextareaStendhal');
goog.require('sm.gTextarea.ViewStendhal');
goog.require('sm.iFactory.TemplateFactoryStendhal');
goog.require('sm.lCourse.bDepartment.Department');
goog.require('sm.lCourse.bDepartment.View');
goog.require('sm.lCourse.bOption.Option');
goog.require('sm.lCourse.bOption.View');
goog.require('sm.lCourse.bUserInteraction.UserInteraction');
goog.require('sm.lCourse.bUserInteraction.View');
goog.require('sm.lInformation.bFeedbackBoard.FeedbackBoard');
goog.require('sm.lInformation.bFeedbackBoard.View');
goog.require('sm.lInformation.bInformationBoard.InformationBoard');
goog.require('sm.lInformation.bInformationBoard.View');
goog.require('sm.lSchool.bFoldList.FoldList');
goog.require('sm.lSchool.bFoldList.View');
goog.require('sm.lSearch.bFilter.Filter');
goog.require('sm.lSearch.bFilter.FilterClasses');
goog.require('sm.lSearch.bFilter.FilterDropdown');
goog.require('sm.lSearch.bFilter.FilterExtended');
goog.require('sm.lSearch.bFilter.FilterInput');
goog.require('sm.lSearch.bFilter.FilterLabels');
goog.require('sm.lSearch.bFilter.FilterSwitch');
goog.require('sm.lSearch.bFilter.FilterSwitchLabels');
goog.require('sm.lSearch.bFilter.View');
goog.require('sm.lSearch.bFilter.ViewClasses');
goog.require('sm.lSearch.bFilter.ViewDropdown');
goog.require('sm.lSearch.bFilter.ViewExtended');
goog.require('sm.lSearch.bFilter.ViewInput');
goog.require('sm.lSearch.bFilter.ViewLabels');
goog.require('sm.lSearch.bFilter.ViewSwitch');
goog.require('sm.lSearch.bFilter.ViewSwitchLabels');
goog.require('sm.lSearch.bFilterPanel.FilterPanel');
goog.require('sm.lSearch.bFilterPanel.View');
goog.require('sm.lSearch.bLabel.Label');
goog.require('sm.lSearch.bLabel.View');
goog.require('sm.lSearch.bSearchResults.SearchResults');
goog.require('sm.lSearch.bSearchResults.View');
goog.require('sm.lSearch.bSuggestFilter.SuggestFilter');
goog.require('sm.lSearch.bSuggestFilter.View');



/**
 * FactoryStendhal
 * @constructor
 * @extends {cl.iFactory.Factory}
 */
sm.iFactory.FactoryStendhal = function() {
    var templateFactory = sm.iFactory.TemplateFactoryStendhal;

    sm.iFactory.FactoryStendhal.base(
        this, 'constructor', templateFactory.getInstance(), 'stendhal'
    );

    this.setControlListItem('dropdown-select-legacy', {
            control: sm.gDropdown.DropdownSelectLegacy,
            view: sm.gDropdown.ViewSelectLegacy
        })
        .setControlListItem('list-select', {
            control: sm.gList.List.Select,
            view: sm.gList.ViewSelect
        })
        .setControlListItem('input', {
            control: sm.gInput.InputStendhal,
            view: sm.gInput.ViewStendhal
        })
        .setControlListItem('digit-input', {
            control: sm.gInput.DigitInput,
            view: sm.gInput.DigitInputView
        })
        .setControlListItem('textarea', {
            control: sm.gTextarea.TextareaStendhal,
            view: sm.gTextarea.ViewStendhal
        })
        .setControlListItem('modal', {
            control: sm.gModal.ModalStendhal,
            view: sm.gModal.ViewStendhal
        })
        .setControlListItem('feedback-modal', {
            control: sm.gModal.ModalFeedback,
            view: sm.gModal.ViewFeedback
        })
        .setControlListItem('auth-social', {
            view: sm.gAuthSocial.ViewStendhal
        })
        .setControlListItem('header', {
            control: sm.bHeader.Header,
            view: sm.bHeader.View
        })
        .setControlListItem('banner', {
            control: sm.bBanner.Banner,
            view: sm.bBanner.View
        })
        .setControlListItem('popular-schools', {
            control: sm.bPopularSchools.PopularSchools,
            view: sm.bPopularSchools.View
        })
        .setControlListItem('search-panel', {
            control: sm.bSearchPanel.SearchPanel,
            view: sm.bSearchPanel.View
        })
        .setControlListItem('data-block-features', {
            control: sm.bDataBlock.DataBlockFeatures,
            view: sm.bDataBlock.DataBlockFeaturesView
        })
        .setControlListItem('fold-list', {
            control: sm.lSchool.bFoldList.FoldList,
            view: sm.lSchool.bFoldList.View
        })
        .setControlListItem('authorization-link', {
            control: sm.bAuthorizationLink.AuthorizationLink,
            view: sm.bAuthorizationLink.View
        })
        .setControlListItem('favorite', {
            control: sm.bFavorite.Favorite,
            view: sm.bFavorite.View
        })
        .setControlListItem('school-list-paged', {
            control: sm.bSchoolListPaged.SchoolListPaged,
            view: sm.bSchoolListPaged.View
        })
        .setControlListItem('favorite-link', {
            control: sm.bFavoriteLink.FavoriteLink,
            view: sm.bFavoriteLink.View
        })
        .setControlListItem('sideMenuModal', {
            control: sm.gModal.ModalSideMenu,
            view: sm.gModal.ModalSideMenuView
        });

    /** Heirs of the clobl blocks */
    this.setControlListItem('phone-input', {
            control: sm.gInput.InputPhone,
            view: sm.gInput.ViewPhone
        })
        .setControlListItem('modal-enrollment', {
            control: sm.gModal.ModalEnrollment,
            view: sm.gModal.ViewEnrollment
        })
        .setControlListItem('modal-success', {
            control: sm.gModal.ModalSuccess,
            view: sm.gModal.ViewSuccess
        })
        .setControlListItem('list', {
            control: sm.gList.ListStendhal,
            view: sm.gList.ViewStendhal
        })
        .setControlListItem('list-links', {
            control: sm.gList.ListLinks,
            view: sm.gList.ViewLinks
        })
        .setControlListItem('dropdown-select', {
            control: sm.gDropdown.DropdownSelect,
            view: sm.gDropdown.ViewSelect
        })
        .setControlListItem('dropdown-list-links', {
            control: sm.gDropdown.DropdownListLinks,
            view: sm.gDropdown.ViewListLinks
        });

    /** Common blocks and their heirs **/
    this.setControlListItem('smSubheader', {
            control: sm.bSmSubheader.SmSubheader,
            view: sm.bSmSubheader.View
        })
        .setControlListItem('smFooter', {
            control: sm.bSmFooter.SmFooter,
            view: sm.bSmFooter.View
        })
        .setControlListItem('smScore', {
            control: sm.bSmScore.SmScore,
            view: sm.bSmScore.View
        })
        .setControlListItem('smScoreBrief', {
            control: sm.bSmScore.SmScoreBrief,
            view: sm.bSmScore.ViewBrief
        })
        .setControlListItem('smItem', {
            control: sm.bSmItem.SmItem,
            view: sm.bSmItem.View
        })
        .setControlListItem('smItemEntity', {
            control: sm.bSmItem.SmItemEntity,
            view: sm.bSmItem.ViewEntity
        })
        .setControlListItem('smItemList', {
            control: sm.bSmItemList.SmItemList,
            view: sm.bSmItemList.View
        })
        .setControlListItem('smListPaged', {
            control: sm.bSmListPaged.SmListPaged,
            view: sm.bSmListPaged.View
        })
        .setControlListItem('smBadge', {
            control: sm.bSmBadge.SmBadge,
            view: sm.bSmBadge.View
        })
        .setControlListItem('smCollapsedText', {
            control: sm.bSmCollapsedText.SmCollapsedText,
            view: sm.bSmCollapsedText.View
        })
        .setControlListItem('smCheckbox', {
            control: sm.bSmCheckbox.SmCheckbox,
            view: sm.bSmCheckbox.View
        })
        .setControlListItem('smRadioButton', {
            control: sm.bSmRadioButton.SmRadioButton,
            view: sm.bSmRadioButton.View
        })
        .setControlListItem('smMap', {
            control: sm.bSmMap.SmMap,
            view: sm.bSmMap.View
        })
        .setControlListItem('smBalloon', {
            control: sm.bSmBalloon.SmBalloon,
            view: sm.bSmBalloon.View
        })
        .setControlListItem('smLink', {
            control: sm.bSmLink.SmLink,
            view: sm.bSmLink.View
        })
        .setControlListItem('smStars', {
            control: sm.bSmStars.SmStars,
            view: sm.bSmStars.View
        })
        .setControlListItem('smFavorite', {
            control: sm.bSmFavorite.SmFavorite,
            view: sm.bSmFavorite.View
        })
        .setControlListItem('smExpander', {
            control: sm.bSmExpander.SmExpander,
            view: sm.bSmExpander.View
        })
        .setControlListItem('smHeader', {
            control: sm.bSmHeader.SmHeader,
            view: sm.bSmHeader.View
        })
        .setControlListItem('smSearchPanel', {
            control: sm.bSmSearchPanel.SmSearchPanel,
            view: sm.bSmSearchPanel.View
        });

    /** l-information blocks **/
    this.setControlListItem('lInformation-informationBoard', {
            control: sm.lInformation.bInformationBoard.InformationBoard,
            view: sm.lInformation.bInformationBoard.View
        })
        .setControlListItem('lInformation-feedbackBoard', {
            control: sm.lInformation.bFeedbackBoard.FeedbackBoard,
            view: sm.lInformation.bFeedbackBoard.View
        });

    /** l-search blocks **/
    this.setControlListItem('lSearch-filterPanel', {
            control: sm.lSearch.bFilterPanel.FilterPanel,
            view: sm.lSearch.bFilterPanel.View
        })
        .setControlListItem('lSearch-filter', {
            control: sm.lSearch.bFilter.Filter,
            view: sm.lSearch.bFilter.View
        })
        .setControlListItem('lSearch-filterExtended', {
            control: sm.lSearch.bFilter.FilterExtended,
            view: sm.lSearch.bFilter.ViewExtended
        })
        .setControlListItem('lSearch-filterSwitch', {
            control: sm.lSearch.bFilter.FilterSwitch,
            view: sm.lSearch.bFilter.ViewSwitch
        })
        .setControlListItem('lSearch-filterInput', {
            control: sm.lSearch.bFilter.FilterInput,
            view: sm.lSearch.bFilter.ViewInput
        })
        .setControlListItem('lSearch-filterLabels', {
            control: sm.lSearch.bFilter.FilterLabels,
            view: sm.lSearch.bFilter.ViewLabels
        })
        .setControlListItem('lSearch-filterSwitchLabels', {
            control: sm.lSearch.bFilter.FilterSwitchLabels,
            view: sm.lSearch.bFilter.ViewSwitchLabels
        })
        .setControlListItem('lSearch-filterDropdown', {
            control: sm.lSearch.bFilter.FilterDropdown,
            view: sm.lSearch.bFilter.ViewDropdown
        })
        .setControlListItem('lSearch-filterClasses', {
            control: sm.lSearch.bFilter.FilterClasses,
            view: sm.lSearch.bFilter.ViewClasses
        })
        .setControlListItem('lSearch-label', {
            control: sm.lSearch.bLabel.Label,
            view: sm.lSearch.bLabel.View
        })
        .setControlListItem('lSearch-suggestFilter', {
            control: sm.lSearch.bSuggestFilter.SuggestFilter,
            view: sm.lSearch.bSuggestFilter.View
        })
        .setControlListItem('lSearch-searchResults', {
            control: sm.lSearch.bSearchResults.SearchResults,
            view: sm.lSearch.bSearchResults.View
        });

    /** l-course blocks */
    this.setControlListItem('lCourse-option', {
            control: sm.lCourse.bOption.Option,
            view: sm.lCourse.bOption.View
        })
        .setControlListItem('lCourse-department', {
            control: sm.lCourse.bDepartment.Department,
            view: sm.lCourse.bDepartment.View
        })
        .setControlListItem('lCourse-userInteraction', {
            control: sm.lCourse.bUserInteraction.UserInteraction,
            view: sm.lCourse.bUserInteraction.View
        });
};
goog.inherits(sm.iFactory.FactoryStendhal, cl.iFactory.Factory);
goog.addSingletonGetter(sm.iFactory.FactoryStendhal);

goog.scope(function() {
    var Factory = sm.iFactory.FactoryStendhal;
    //debugger;
    /**
     * Important!
     */
    Factory.getInstance().attachToManager();
});  // goog.scope
