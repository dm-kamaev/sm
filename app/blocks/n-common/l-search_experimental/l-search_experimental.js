/**
 * @fileoverview Page with filters and results of search
 */
goog.provide('sm.lSearch.SearchExperimental');


goog.require('sm.bSmMap.SmMap');
goog.require('sm.iCloblFactory.FactoryExperimental');
goog.require('sm.lSearch.Search');
goog.require('sm.lSearch.TemplateExperimental');
goog.require('sm.lSearch.ViewExperimental');



goog.scope(function() {


    /**
     * Constructor
     * @param {Object} view
     * @param {Object=} opt_domHelper
     * @constructor
     * @extends {sm.lSearch.Search}
     */
    sm.lSearch.SearchExperimental = function(view, opt_domHelper) {
        sm.lSearch.SearchExperimental.base(this, 'constructor',
            view, opt_domHelper);
    };
    goog.inherits(sm.lSearch.SearchExperimental, sm.lSearch.Search);
    var SearchExperimental = sm.lSearch.SearchExperimental;

    /**
     * Name of this element in factory
     */
    SearchExperimental.NAME = sm.lSearch.TemplateExperimental.NAME();

    sm.iCloblFactory.FactoryExperimental.getInstance().register(
        SearchExperimental.NAME, {
            control: SearchExperimental,
            view: sm.lSearch.ViewExperimental
        }
    );

    /**
     * Map data load event handler
     * @param {sm.lSearch.iSearchService.MapDataLoadedEvent} event
     * @override
     * @protected
     */
    SearchExperimental.prototype.onMapDataLoaded = function(event) {
        var params = this.paramsManager.getParams();

        var itemGroups = event.getItemGroups();

        var isShow = itemGroups.some(function(group) {
            return group.items.length;
        }) &&
        (params.metroId || params.areaId || params.districtId);

        this.getView().setSectionMapVisibility(isShow);

        this.map_.addItems(itemGroups);
        this.map_.center(event.getPosition());
    };
});  // goog.scope
