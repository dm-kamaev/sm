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
goog.require('sm.bSmFeedbackBoard.Template');
goog.require('sm.bSmFooter.Template');
goog.require('sm.bSmInformationBoard.Template');
goog.require('sm.bSmItem.Template');
goog.require('sm.bSmItem.TemplateEntity');
goog.require('sm.bSmItemList.Template');
goog.require('sm.bSmListPaged.Template');
goog.require('sm.bSmScore.Template');
goog.require('sm.bSmScore.TemplateBrief');
goog.require('sm.bSmSubheader.Template');
goog.require('sm.gAuthSocial.TemplateStendhal');
goog.require('sm.gAuthSocialModal.TemplateStendhal');
goog.require('sm.gButton.TemplateSocialStendhal');
goog.require('sm.gButton.TemplateStendhal');
goog.require('sm.gDropdown.TemplateSelect');
goog.require('sm.gHint.TemplateStendhal');
goog.require('sm.gIcon.TemplateStendhal');
goog.require('sm.gInput.DigitInputTemplate');
goog.require('sm.gList.TemplateSelect');
goog.require('sm.gModal.TemplateFeedback');
goog.require('sm.gModal.TemplateStendhal');
goog.require('sm.gTab.TemplateCatalog');
goog.require('sm.gTab.TemplateStendhal');
goog.require('sm.gTextarea.TemplateStendhal');
goog.require('sm.lCourse.bInformationBoard.Template');
goog.require('sm.lSchool.bDate.Template');
goog.require('sm.lSchool.bFoldList.Template');
goog.require('sm.lSchoolHome.bArticleLink.Template');
goog.require('sm.lSchoolHome.bArticleLinks.Template');
goog.require('sm.lSearchResult.bFilterSearch.Template');



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
            'modal',
            sm.gModal.TemplateStendhal.modal
        ).
        setTemplateListItem(
            'feedback-modal',
            sm.gModal.TemplateFeedback.modal
        )
        .setTemplateListItem(
            'dropdown-select',
            sm.gDropdown.TemplateSelect.dropdown
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
            'icon',
            sm.gIcon.TemplateStendhal.icon
        )
        .setTemplateListItem(
            'filter-search',
            sm.lSearchResult.bFilterSearch.Template.filterSearch
        )
        .setTemplateListItem(
            'tab-catalog',
            sm.gTab.TemplateCatalog.tab
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
            'smInformationBoard',
            sm.bSmInformationBoard.Template.informationBoard
        )
        .setTemplateListItem(
            'smFeedbackBoard',
            sm.bSmFeedbackBoard.Template.feedbackBoard
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
        );

    /** l-course blocks */
    this.setTemplateListItem(
            'lCourse-informationBoard',
            sm.lCourse.bInformationBoard.Template.informationBoard
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
