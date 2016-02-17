// This file was automatically generated from b-validate.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace gorod.ValidateTemplate.
 */

if (typeof gorod == 'undefined') { var gorod = {}; }
if (typeof gorod.ValidateTemplate == 'undefined') { gorod.ValidateTemplate = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
gorod.ValidateTemplate.render = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  var output = '<div class="b-validate" data-error-hash="' + soy.$$escapeHtmlAttribute(((opt_data.params == null) ? null : opt_data.params.hash) != null ? ((opt_data.params == null) ? null : opt_data.params.hash) : '') + '"><div class="b-validate__message ' + soy.$$escapeHtmlAttribute(((opt_data.params == null) ? null : opt_data.params.message) ? '' : 'i-utils__hidden') + '">';
  if ((opt_data.params == null) ? null : opt_data.params.message) {
    var messageList675 = (opt_data.params == null) ? null : opt_data.params.message;
    var messageListLen675 = messageList675.length;
    for (var messageIndex675 = 0; messageIndex675 < messageListLen675; messageIndex675++) {
      var messageData675 = messageList675[messageIndex675];
      output += soy.$$escapeHtml(messageData675) + '<br/>';
    }
  }
  output += '</div></div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  gorod.ValidateTemplate.render.soyTemplateName = 'gorod.ValidateTemplate.render';
}
