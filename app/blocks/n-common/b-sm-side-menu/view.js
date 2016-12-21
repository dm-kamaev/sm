goog.provide('sm.bSmSideMenu.View');

goog.require('cl.iControl.View');
goog.require('goog.dom.classlist');
goog.require('goog.events');



goog.scope(function() {
  /**
   * View for Side menu block
   *
   * @param {Object=} opt_params
   * @param {string=} opt_type
   * @param {String=} opt_modifier
   * @constructor
   * @extends {cl.iControl.View}
   */
  sm.bSmSideMenu.View = function(opt_params, opt_type, opt_modifier) {
      sm.bSmSideMenu.View.base(
          this, 'constructor', opt_params, opt_type, opt_modifier
      );

      /**
       * Dom elements
       * @type {Element}
       */
      this.dom = {};
  };
  goog.inherits(sm.bSmSideMenu.View, cl.iControl.View);
  var View = sm.bSmSideMenu.View;

  /**
   * List of CSS classes
   * @enum {string}
   * @const
   */
  View.CssClass = {
      ROOT: 'b-sm-side-menu',
      LINK: 'b-sm-side-menu__link',
      FOOTER_LINK: 'b-sm-side-menu__footer-link',
      CLOSE_ICON: 'b-sm-side-menu__close-icon'
  };

  /**
   * Events
   * @enum
   * @const
   */
  View.Event = {
      MENU_IS_CLOSED: goog.events.getUniqueId('menuIsClosed'),
      MENU_IS_OPENED: goog.events.getUniqueId('menuIsClosed')
  };

  /**
   * Shows side menu
   * @public
   */
  View.prototype.showMenu = function() {
    var element = this.getElement();
    goog.dom.classlist.remove(
        element,
        cl.iUtils.Utils.CssClass.HIDDEN
    );
    this.dispatchEvent(View.Event.MENU_IS_OPENED);
  };

  /**
   * Hides side menu
   * @public
   */
  View.prototype.hideMenu = function() {
    var element = this.getElement();
    goog.dom.classlist.add(
        element,
        cl.iUtils.Utils.CssClass.HIDDEN
    );
    this.dispatchEvent(View.Event.MENU_IS_CLOSED);
  };

  /**
   * @override
   * @param {Element} element
   * @protected
   */
  View.prototype.decorateInternal = function(element) {
      View.base(this, 'decorateInternal', element);

      this.initDom_();
  };

  /**
   * @override
   * @protected
   */
  View.prototype.enterDocument = function() {
      View.base(this, 'enterDocument');

      this.initCloseIconListener_();
  };

  /**
   * @private
   */
  View.prototype.initCloseIconListener_ = function() {
      this.getHandler().listen(
          this.dom.closeIcon,
          goog.events.EventType.CLICK,
          this.onCloseIconClick_
      );
  };

  /**
   * On close icon click
   * @private
   */
  View.prototype.onCloseIconClick_ = function() {
      this.hideMenu();
  };

  /**
   * Dom elements initialization
   * @private
   */
  View.prototype.initDom_ = function() {
      this.dom.links = this.getElementsByClass(
          View.CssClass.LINK
      );

      this.dom.closeIcon = this.getElementByClass(
          View.CssClass.CLOSE_ICON
      );

      this.dom.footerLinks = this.getElementsByClass(
          View.CssClass.FOOTER_LINK
      );
  };
});  // goog.scope
