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
goog.require('sm.bSmFeedbackBoard.SmFeedbackBoard');
goog.require('sm.bSmFeedbackBoard.View');
goog.require('sm.bSmInformationBoard.SmInformationBoard');
goog.require('sm.bSmInformationBoard.View');
goog.require('sm.bSmItem.SmItem');
goog.require('sm.bSmItem.View');
goog.require('sm.bSmScore.SmScore');
goog.require('sm.bSmScore.View');
goog.require('sm.bSmScore.ViewBrief');
goog.require('sm.bSmSubheader.SmSubheader');
goog.require('sm.bSmSubheader.View');
goog.require('sm.gAuthSocial.ViewStendhal');
goog.require('sm.gDropdown.DropdownSelect');
goog.require('sm.gDropdown.DropdownSelectView');
goog.require('sm.gInput.DigitInput');
goog.require('sm.gInput.DigitInputView');
goog.require('sm.gList.SelectList');
goog.require('sm.gList.SelectListView');
goog.require('sm.gModal.ModalFeedback');
goog.require('sm.gModal.ModalStendhal');
goog.require('sm.gModal.ViewFeedback');
goog.require('sm.gModal.ViewStendhal');
goog.require('sm.gTextarea.TextareaStendhal');
goog.require('sm.gTextarea.ViewStendhal');
goog.require('sm.lSchool.bFoldList.FoldList');
goog.require('sm.lSchool.bFoldList.View');
goog.require('sm.lSearchResult.bFilterSearch.FilterSearch');
goog.require('sm.lSearchResult.bFilterSearch.View');



/**
 * FactoryStendhal
 * @constructor
 * @extends {cl.iFactory.Factory}
 */
sm.iFactory.FactoryStendhal = function() {
    var templateFactory = sm.iFactory.TemplateFactoryStendhal.getInstance();

    goog.base(this, templateFactory, 'stendhal');

    this.setControlListItem('dropdown-select', {
            control: sm.gDropdown.DropdownSelect,
            view: sm.gDropdown.DropdownSelectView
        })
        .setControlListItem('list-select', {
            control: sm.gList.SelectList,
            view: sm.gList.SelectListView
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
        .setControlListItem('filter-search', {
            control: sm.lSearchResult.bFilterSearch.FilterSearch,
            view: sm.lSearchResult.bFilterSearch.View
        });

    /** Common blocks and their heirs **/
    this.setControlListItem('smSubheader', {
            control: sm.bSmSubheader.SmSubheader,
            view: sm.bSmSubheader.View
        })
        .setControlListItem('smInformationBoard', {
            control: sm.bSmInformationBoard.SmInformationBoard,
            view: sm.bSmInformationBoard.View
        })
        .setControlListItem('smFeedbackBoard', {
            control: sm.bSmFeedbackBoard.SmFeedbackBoard,
            view: sm.bSmFeedbackBoard.View
        })
        .setControlListItem('smScore', {
            control: sm.bSmScore.SmScore,
            view: sm.bSmScore.View
        })
        .setControlListItem('smScoreBrief', {
            control: sm.bSmScore.SmScore,
            view: sm.bSmScore.ViewBrief
        })
        .setControlListItem('smItem', {
            control: sm.bSmItem.SmItem,
            view: sm.bSmItem.View
        });
};
goog.inherits(sm.iFactory.FactoryStendhal, cl.iFactory.Factory);
goog.addSingletonGetter(sm.iFactory.FactoryStendhal);

goog.scope(function() {
    var Factory = sm.iFactory.FactoryStendhal;

    /**
     * Important!
     */
    Factory.getInstance().attachToManager();
});  // goog.scope
