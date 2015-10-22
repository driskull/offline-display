/*global Offline, O */
define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/string",
    "dojo/on",
    "dojo/dom",
    "esri/graphic",
    "offline/offline-edit-min"
], function (
  declare,
  lang,
  string,
  on,
  dom,
  Graphic
) {
  return declare(null, {
    // create class
    constructor: function (options) {
      // save defaults
      this.defaults = options;
      // create offline manager
      this.offlineFeaturesManager = O.esri.Edit.OfflineFeaturesManager();
      if(this.defaults.proxy){
        this.offlineFeaturesManager.proxyPath = this.defaults.proxy;
      }
      // enable offline attachments
      //this.offlineFeaturesManager.initAttachments();
      // once layer is loaded
      if (this.defaults.layer.loaded) {
        this.initEditor();
      } else {
        on.once(this.defaults.layer, 'load', lang.hitch(this, this.initEditor));
      }
    },

    // setup editing
    initEditor: function () {
      /* extend layer with offline detection functionality */
      this.offlineFeaturesManager.extend(this.defaults.layer, function () {});
    }
  });
});