goog.provide('sm.iFactory.TemplateFactoryStendhal');
goog.provide('sm.iFactory.TemplateFactoryStendhal.INSTANCE');

goog.require('cl.iFactory.TemplateFactory');
goog.require('sm.bAuthorizationLink.Template');
goog.require('sm.bBanner.Template');
goog.require('sm.bFavorite.Template');
goog.require('sm.bFavoriteLink.Template');
goog.require('sm.bHeader.Template');
goog.require('sm.bPopularSchools.Template');
goog.require('sm.bSchoolCatalog.Template');
goog.require('sm.bSchoolListPaged.Template');
goog.require('sm.bSearchPanel.Template');
goog.require('sm.bSmBadge.Template');
goog.require('sm.bSmBalloon.Template');
goog.require('sm.bSmCatalog.Template');
goog.require('sm.bSmCheckbox.Template');
goog.require('sm.bSmCollapsedText.Template');
goog.require('sm.bSmContacts.Template');
goog.require('sm.bSmEmbed.Template');
goog.require('sm.bSmExpander.Template');
goog.require('sm.bSmFavorite.Template');
goog.require('sm.bSmFooter.Template');
goog.require('sm.bSmHeadedList.Template');
goog.require('sm.bSmHeader.Template');
goog.require('sm.bSmItem.Template');
goog.require('sm.bSmItem.TemplateEntity');
goog.require('sm.bSmItemList.Template');
goog.require('sm.bSmLink.Template');
goog.require('sm.bSmListPaged.Template');
goog.require('sm.bSmMap.Template');
goog.require('sm.bSmMark.Template');
goog.require('sm.bSmRadioButton.Template');
goog.require('sm.bSmScore.Template');
goog.require('sm.bSmScore.TemplateBrief');
goog.require('sm.bSmSearchPanel.Template');
goog.require('sm.bSmSketch.Template');
goog.require('sm.bSmStars.Template');
goog.require('sm.bSmSubheader.Template');
goog.require('sm.gAuthSocial.TemplateStendhal');
goog.require('sm.gAuthSocialModal.TemplateStendhal');
goog.require('sm.gButton.TemplateSocialStendhal');
goog.require('sm.gButton.TemplateStendhal');
goog.require('sm.gDropdown.TemplateListLinks');
goog.require('sm.gDropdown.TemplateSelect');
goog.require('sm.gDropdown.TemplateSelectLegacy');
goog.require('sm.gHint.TemplateStendhal');
goog.require('sm.gIcon.TemplateStendhal');
goog.require('sm.gIcon.TemplateSvg');
goog.require('sm.gInput.DigitInputTemplate');
goog.require('sm.gInput.TemplatePhone');
goog.require('sm.gInput.TemplateStendhal');
goog.require('sm.gList.TemplateLinks');
goog.require('sm.gList.TemplateSelect');
goog.require('sm.gList.TemplateStendhal');
goog.require('sm.gModal.TemplateEnrollment');
goog.require('sm.gModal.TemplateFeedback');
goog.require('sm.gModal.TemplateSideMenu');
goog.require('sm.gModal.TemplateStendhal');
goog.require('sm.gModal.TemplateSuccess');
goog.require('sm.gTab.TemplateCatalog');
goog.require('sm.gTab.TemplateStendhal');
goog.require('sm.gTextarea.TemplateStendhal');
goog.require('sm.lCourse.bDepartment.Template');
goog.require('sm.lCourse.bInformationBoard.Template');
goog.require('sm.lCourse.bOption.Template');
goog.require('sm.lCourse.bUserInteraction.Template');
goog.require('sm.lInformation.bFeedbackBoard.Template');
goog.require('sm.lInformation.bInformationBoard.Template');
goog.require('sm.lSchool.bDate.Template');
goog.require('sm.lSchool.bFoldList.Template');
goog.require('sm.lSchoolHome.bArticleLink.Template');
goog.require('sm.lSchoolHome.bArticleLinks.Template');
goog.require('sm.lSearch.bFilter.Template');
goog.require('sm.lSearch.bFilter.TemplateClasses');
goog.require('sm.lSearch.bFilter.TemplateDropdown');
goog.require('sm.lSearch.bFilter.TemplateExtended');
goog.require('sm.lSearch.bFilter.TemplateInput');
goog.require('sm.lSearch.bFilter.TemplateLabels');
goog.require('sm.lSearch.bFilter.TemplateSwitch');
goog.require('sm.lSearch.bFilter.TemplateSwitchLabels');
goog.require('sm.lSearch.bFilterPanel.Template');
goog.require('sm.lSearch.bLabel.Template');
goog.require('sm.lSearch.bSearchResults.Template');
goog.require('sm.lSearch.bSuggestFilter.Template');
goog.require('sm.lUniversity.bDescriptionList.Template');



/**
 * Template factory
 * @constructor
 * @extends {cl.iFactory.TemplateFactory}
 */
sm.iFactory.TemplateFactoryStendhal = function() {
    sm.iFactory.TemplateFactoryStendhal.base(
        this, 'constructor', 'stendhal'
    );

    this.setTemplateListItem(
            'tab',
            sm.gTab.TemplateStendhal.tab
        )
        .setTemplateListItem(
            'textarea',
            sm.gTextarea.TemplateStendhal.textarea
        )
        .setTemplateListItem(
            'hint',
            sm.gHint.TemplateStendhal.hint
        )
        .setTemplateListItem(
            'input',
            sm.gInput.TemplateStendhal.input
        )
        .setTemplateListItem(
            'modal',
            sm.gModal.TemplateStendhal.modal
        )
        .setTemplateListItem(
            'feedback-modal',
            sm.gModal.TemplateFeedback.modal
        )
        .setTemplateListItem(
            'dropdown-select-legacy',
            sm.gDropdown.TemplateSelectLegacy.dropdown
        )
        .setTemplateListItem(
            'list-select',
            sm.gList.TemplateSelect.list
        )
        .setTemplateListItem(
            'digit-input',
            sm.gInput.DigitInputTemplate.input
        )
        .setTemplateListItem(
            'button-social',
            sm.gButton.TemplateSocialStendhal.button
        )
        .setTemplateListItem(
            'auth-social',
            sm.gAuthSocial.TemplateStendhal.authSocial
        )
        .setTemplateListItem(
            'auth-social-modal',
            sm.gAuthSocialModal.TemplateStendhal.authSocialModal
        )
        .setTemplateListItem(
            'header',
            sm.bHeader.Template.base
        )
        .setTemplateListItem(
            'banner',
            sm.bBanner.Template.banner
        )
        .setTemplateListItem(
            'button',
            sm.gButton.TemplateStendhal.button
        )
        .setTemplateListItem(
            'popular-schools',
            sm.bPopularSchools.Template.base
        )
        .setTemplateListItem(
            'school-catalog',
            sm.bSchoolCatalog.Template.info
        )
        .setTemplateListItem(
            'search-panel',
            sm.bSearchPanel.Template.seachPanel
        )
        .setTemplateListItem(
            'fold-list',
            sm.lSchool.bFoldList.Template.foldList
        )
        .setTemplateListItem(
            'article-links',
            sm.lSchoolHome.bArticleLinks.Template.articleLinks
        )
        .setTemplateListItem(
            'article-link',
            sm.lSchoolHome.bArticleLink.Template.articleLink
        )
        .setTemplateListItem(
            'date',
            sm.lSchool.bDate.Template.date
        )
        .setTemplateListItem(
            'authorization-link',
            sm.bAuthorizationLink.Template.authorizationLink
        )
        .setTemplateListItem(
            'favorite',
            sm.bFavorite.Template.favorite
        )
        .setTemplateListItem(
            'school-list-paged',
            sm.bSchoolListPaged.Template.schoolListPaged
        )
        .setTemplateListItem(
            'favorite-link',
            sm.bFavoriteLink.Template.favoriteLink
        )
        .setTemplateListItem(
            'tab-catalog',
            sm.gTab.TemplateCatalog.tab
        );

    /** Heirs of the clobl blocks */
    this.setTemplateListItem(
            'icon',
            sm.gIcon.TemplateStendhal.icon
        )
        .setTemplateListItem(
            'icon-svg',
            sm.gIcon.TemplateSvg.icon
        )
        .setTemplateListItem(
            'phone-input',
            sm.gInput.TemplatePhone.input
        )
        .setTemplateListItem(
            'modal-enrollment',
            sm.gModal.TemplateEnrollment.modal
        )
        .setTemplateListItem(
            'modal-success',
            sm.gModal.TemplateSuccess.modal
        )
        .setTemplateListItem(
            'list',
            sm.gList.TemplateStendhal.list
        )
        .setTemplateListItem(
            'list-links',
            sm.gList.TemplateLinks.list
        )
        .setTemplateListItem(
            'dropdown-select',
            sm.gDropdown.TemplateSelect.dropdown
        )
        .setTemplateListItem(
            'dropdown-list-links',
            sm.gDropdown.TemplateListLinks.dropdown
        )
        .setTemplateListItem(
            'side-menu',
            sm.gModal.TemplateSideMenu.modal
        );

    /** Global blocks an their heirs **/
    this.setTemplateListItem(
            'smFooter',
            sm.bSmFooter.Template.footer
        )
        .setTemplateListItem(
            'smSubheader',
            sm.bSmSubheader.Template.subheader
        )
        .setTemplateListItem(
            'smItem',
            sm.bSmItem.Template.item
        )
        .setTemplateListItem(
            'smScore',
            sm.bSmScore.Template.score
        )
        .setTemplateListItem(
            'smScoreBrief',
            sm.bSmScore.TemplateBrief.score
        )
        .setTemplateListItem(
            'smItemEntity',
            sm.bSmItem.TemplateEntity.item
        )
        .setTemplateListItem(
            'smItemList',
            sm.bSmItemList.Template.itemList
        )
        .setTemplateListItem(
            'smListPaged',
            sm.bSmListPaged.Template.listPaged
        )
        .setTemplateListItem(
            'smBadge',
            sm.bSmBadge.Template.badge
        )
        .setTemplateListItem(
            'smCollapsedText',
            sm.bSmCollapsedText.Template.collapsedText
        )
        .setTemplateListItem(
            'smCheckbox',
            sm.bSmCheckbox.Template.checkbox
        )
        .setTemplateListItem(
            'smRadioButton',
            sm.bSmRadioButton.Template.radioButton
        )
        .setTemplateListItem(
            'smMap',
            sm.bSmMap.Template.map
        )
        .setTemplateListItem(
            'smBalloon',
            sm.bSmBalloon.Template.balloon
        )
        .setTemplateListItem(
            'smLink',
            sm.bSmLink.Template.link
        )
        .setTemplateListItem(
            'smMark',
            sm.bSmMark.Template.mark
        )
        .setTemplateListItem(
            'smStars',
            sm.bSmStars.Template.stars
        )
        .setTemplateListItem(
            'smFavorite',
            sm.bSmFavorite.Template.favorite
        )
        .setTemplateListItem(
            'smExpander',
            sm.bSmExpander.Template.expander
        )
        .setTemplateListItem(
            'smEmbed',
            sm.bSmEmbed.Template.embed
        )
        .setTemplateListItem(
            'smContacts',
            sm.bSmContacts.Template.contacts
        )
        .setTemplateListItem(
            'smHeader',
            sm.bSmHeader.Template.header
        )
        .setTemplateListItem(
            'smSearchPanel',
            sm.bSmSearchPanel.Template.searchPanel
        )
        .setTemplateListItem(
            'smCatalog',
            sm.bSmCatalog.Template.catalog
        )
        .setTemplateListItem(
            'smHeadedList',
            sm.bSmHeadedList.Template.headedList
        )
        .setTemplateListItem(
            'smSketch',
            sm.bSmSketch.Template.sketch
        );

    /** l-information blocks **/
    this.setTemplateListItem(
            'lInformation-informationBoard',
            sm.lInformation.bInformationBoard.Template.informationBoard
        )
        .setTemplateListItem(
            'lInformation-feedbackBoard',
            sm.lInformation.bFeedbackBoard.Template.feedbackBoard
        );

    /** l-search blocks **/
    this.setTemplateListItem(
            'lSearch-filterPanel',
            sm.lSearch.bFilterPanel.Template.filterPanel
        )
        .setTemplateListItem(
            'lSearch-filter',
            sm.lSearch.bFilter.Template.filter
        )
        .setTemplateListItem(
            'lSearch-filterExtended',
            sm.lSearch.bFilter.TemplateExtended.filter
        )
        .setTemplateListItem(
            'lSearch-filterSwitch',
            sm.lSearch.bFilter.TemplateSwitch.filter
        )
        .setTemplateListItem(
            'lSearch-filterInput',
            sm.lSearch.bFilter.TemplateInput.filter
        )
        .setTemplateListItem(
            'lSearch-filterLabels',
            sm.lSearch.bFilter.TemplateLabels.filter
        )
        .setTemplateListItem(
            'lSearch-filterSwitchLabels',
            sm.lSearch.bFilter.TemplateSwitchLabels.filter
        )
        .setTemplateListItem(
            'lSearch-filterDropdown',
            sm.lSearch.bFilter.TemplateDropdown.filter
        )
        .setTemplateListItem(
            'lSearch-filterClasses',
            sm.lSearch.bFilter.TemplateClasses.filter
        )
        .setTemplateListItem(
            'lSearch-label',
            sm.lSearch.bLabel.Template.label
        )
        .setTemplateListItem(
            'lSearch-suggestFilter',
            sm.lSearch.bSuggestFilter.Template.suggestFilter
        )
        .setTemplateListItem(
            'lSearch-searchResults',
            sm.lSearch.bSearchResults.Template.searchResults
        );

        /** l-course blocks */
    this.setTemplateListItem(
            'lCourse-informationBoard',
            sm.lCourse.bInformationBoard.Template.informationBoard
        )
        .setTemplateListItem(
            'lCourse-option',
            sm.lCourse.bOption.Template.option
        )
        .setTemplateListItem(
            'lCourse-department',
            sm.lCourse.bDepartment.Template.address
        )
        .setTemplateListItem(
            'lCourse-userInteraction',
            sm.lCourse.bUserInteraction.Template.userInteraction
        );

    /** l-university blocks */
    this.setTemplateListItem(
            'lUniversity-descriptionList',
            sm.lUniversity.bDescriptionList.Template.descriptionList
        );
};
goog.inherits(sm.iFactory.TemplateFactoryStendhal, cl.iFactory.TemplateFactory);
goog.addSingletonGetter(sm.iFactory.TemplateFactoryStendhal);

goog.scope(function() {
    var TemplateFactory = sm.iFactory.TemplateFactoryStendhal;
    /**
     * Instance
     */
    TemplateFactory.INSTANCE = TemplateFactory.getInstance();

    /**
     * Important!
     */
    TemplateFactory.getInstance().attachToManager();
});  // goog.scope
