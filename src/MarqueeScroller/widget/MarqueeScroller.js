/*jslint white:true, nomen: true, plusplus: true */
/*global mx, define, require, browser, devel, console, document, jQuery */
/*mendix */
/*
    MarqueeScroller
    ========================

    @file      : MarqueeScroller.js
    @version   : 0.1
    @author    : Russell Hite
    @date      : Tue, 02 Jun 2015 14:20:09 GMT
    @copyright : Mendix
    @license   : Apache

    Documentation
    ========================
    Describe your widget here.
*/

// Required module list. Remove unnecessary modules, you can always get them back from the boilerplate.
define([
    'dojo/_base/declare', 'mxui/widget/_WidgetBase', 'dijit/_TemplatedMixin',
    'mxui/dom', 'dojo/dom', 'dojo/query', 'dojo/dom-prop', 'dojo/dom-geometry', 'dojo/dom-class', 'dojo/dom-style', 'dojo/dom-construct', 'dojo/_base/array', 'dojo/_base/lang', 'dojo/text', 'dojo/html', 'dojo/_base/event',
    'MarqueeScroller/lib/jquery-1.11.2.min', 'MarqueeScroller/lib/jmarquee-min', 'dojo/text!MarqueeScroller/widget/template/MarqueeScroller.html'
], function (declare, _WidgetBase, _TemplatedMixin, dom, dojoDom, domQuery, domProp, domGeom, domClass, domStyle, domConstruct, dojoArray, lang, text, html, event, _jQuery, _jmarquee, widgetTemplate) {
    'use strict';

    var $ = jQuery.noConflict(true);

    // Declare widget's prototype.
    return declare('MarqueeScroller.widget.MarqueeScroller', [_WidgetBase, _TemplatedMixin], {

        // _TemplatedMixin will create our dom node using this HTML template.
        templateString: widgetTemplate,

        // Parameters configured in the Modeler.
        marqueeTextAttr: "",
        marqueeDirection: "",
        duration: "",
        delayBeforeStart: "",
        pauseOnHover: "",

        // Internal variables. Non-primitives created in the prototype are shared between all widget instances.
        _handles: null,
        _contextObj: null,
        _alertDiv: null,

        // dojo.declare.constructor is called to construct the widget instance. Implement to initialize non-primitive properties.
        constructor: function () {
            this._handles = [];
        },

        // dijit._WidgetBase.postCreate is called after constructing the widget. Implement to do extra setup work.
        postCreate: function () {
            console.log(this.id + '.postCreate');
            this._updateRendering();
            this._setupEvents();
        },

        // mxui.widget._WidgetBase.update is called when context is changed or initialized. Implement to re-render and / or fetch data.
        update: function (obj, callback) {
            console.log(this.id + '.update');

            this._contextObj = obj;
            this._resetSubscriptions();
            this._updateRendering();

            callback();
        },

        // mxui.widget._WidgetBase.enable is called when the widget should enable editing. Implement to enable editing if widget is input widget.
        enable: function () {},

        // mxui.widget._WidgetBase.enable is called when the widget should disable editing. Implement to disable editing if widget is input widget.
        disable: function () {},

        // mxui.widget._WidgetBase.resize is called when the page's layout is recalculated. Implement to do sizing calculations. Prefer using CSS instead.
        resize: function (box) {},

        // mxui.widget._WidgetBase.uninitialize is called when the widget is destroyed. Implement to do special tear-down work.
        uninitialize: function () {
            // Clean up listeners, helper objects, etc. There is no need to remove listeners added with this.connect / this.subscribe / this.own.
        },

        // We want to stop events on a mobile device
        _stopBubblingEventOnMobile: function (e) {
            if (typeof document.ontouchstart !== 'undefined') {
                event.stop(e);
            }
        },

        // Attach events to HTML dom elements
        _setupEvents: function () {



        },

        // Rerender the interface.
        _updateRendering: function () {


            if (this._contextObj !== null) {

                domStyle.set(this.domNode, 'display', 'block');

                var _marqueeText = this._contextObj.get(this.marqueeTextAttr);
                html.set(this.domNode, _marqueeText);

                $(this.domNode).marquee({
                    direction: this.marqueeDirection,
                    duration: this.duration,
                    pauseOnHover: true,
                    delayBeforeStart: 1200,
                    pauseOnCycle: true
                });


            } else {
                domStyle.set(this.domNode, 'display', 'none');
            }

            // Important to clear all validations!

        },

        // Handle validations.
        _handleValidation: function (_validations) {

        },

        // Clear validations.
        _clearValidations: function () {

        },

        // Show an error message.
        _showError: function (message) {

        },

        // Add a validation.
        _addValidation: function (message) {

        },

        // Reset subscriptions.
        _resetSubscriptions: function () {
            var _objectHandle = null,
                _attrHandle = null;


            // Release handles on previous object, if any.
            if (this._handles) {
                this._handles.forEach(function (handle, i) {
                    mx.data.unsubscribe(handle);
                });
                this._handles = [];
            }

            // When a mendix object exists create subscribtions. 
            if (this._contextObj) {

                _objectHandle = this.subscribe({
                    guid: this._contextObj.getGuid(),
                    callback: lang.hitch(this, function (guid) {
                        this._updateRendering();
                    })
                });

                _attrHandle = this.subscribe({
                    guid: this._contextObj.getGuid(),
                    attr: this.marqueeTextAttr,
                    callback: lang.hitch(this, function (guid, attr, attrValue) {
                        this._updateRendering();
                    })
                });


                this._handles = [_objectHandle, _attrHandle];
            }
        }
    });
});
require(['MarqueeScroller/widget/MarqueeScroller'], function () {
    'use strict';
});