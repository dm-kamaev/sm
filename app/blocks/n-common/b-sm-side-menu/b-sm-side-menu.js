goog.provide('sm.bSmSideMenu.SideMenu');

goog.require('cl.iControl.Control');
goog.require('goog.ui.Component');


goog.scope(function() {
  /**
   * Side menu block

   * @param {cl.iControl.View} view
   * @param {goog.dom.DomHelper=} opt_domHelper
   * @constructor
   * @extends {cl.iControl.Control}
   */
  sm.bSmSideMenu.SideMenu = function(view, opt_domHelper) {
      sm.bSmSideMenu.SideMenu.base(this, 'constructor', view, opt_domHelper);

      /**
       * Instances of links
       * @type {Array<sm.bSmLink.SmLink>}
       * @private
       */
       this.links_ = null;

      /**
       * Instances of footer links
       * @type {Array<sm.bSmLink.SmLink>}
       * @private
       */
       this.footerLinks_ = null;
  };
  goog.inherits(sm.bSmSideMenu.SideMenu, cl.iControl.Control);
  var SideMenu = sm.bSmSideMenu.SideMenu;
  var View = sm.bSmSideMenu.View;


  /**
   * List of Side menu events
   * @enum {string}
   * @const
   */
  SideMenu.Event = {
      MENU_IS_CLOSED: View.Event.MENU_IS_CLOSED,
      MENU_IS_OPENED: View.Event.MENU_IS_OPENED
  };


  /**
   * @override
   */
  SideMenu.prototype.enterDocument = function() {
      SideMenu.base(this, 'enterDocument');

      this.initViewDispatching_();
  };

  /**
   * @override
   * @param {Element} element
   * @protected
   */
  SideMenu.prototype.decorateInternal = function(element) {
      SideMenu.base(this, 'decorateInternal', element);

      this.initLinks_();
      this.initFooterLinks_();
  };

  /**
   * Links initialization
   * @private
   */
  SideMenu.prototype.initLinks_ = function() {
      var links = this.getView().getDom().links;
      this.links_ = this.decorateChildren('smLink', links);
  };

  /**
   * Footer links initialization
   * @private
   */
  SideMenu.prototype.initFooterLinks_ = function() {
      var links = this.getView().getDom().footerLinks;
      this.footerLinks_ = this.decorateChildren('smLink', links);
  };

  /**
   * Initialisation view events bubbling
   * @private
   */
  SideMenu.prototype.initViewDispatching_ = function() {
      this.autoDispatch(View.Event.MENU_IS_CLOSED);
      this.autoDispatch(View.Event.MENU_IS_OPENED);
  };

  /**
   * Shows menu
   * @public
   */
  SideMenu.prototype.showMenu = function() {
      this.getView().showMenu();
  };

  /**
   * Hides menu
   * @public
   */
  SideMenu.prototype.hideMenu = function() {
      this.getView().hideMenu();
  };

});  // goog.scope
