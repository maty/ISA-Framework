(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
    "bar.css" : '.topbar {position: fixed;top: -60px;left: 0;right: 0;height: 60px;background: rgba(0,0,0,0.4);-webkit-transition: top 0.3s, background 0.5s; -moz-transition: top 0.3s, background 0.5s;-ms-transition: top 0.3s, background 0.5s; -o-transition: top 0.3s, background 0.5s;transition: top 0.3s, background 0.5s;color: white;font-family: adobe-clean, sans-serif;z-index: 1;}.topbar:before {content: \'\';position: absolute;left: 0;top: 0;right: 0;height: 100px;background: none;-webkit-transition: background 0.5s; -moz-transition: background 0.5s;-ms-transition: background 0.5s; -o-transition: background 0.5s;transition: background 0.5s;}.topbar.show {top: 0;}.topbar.above-the-fold {background: none;}.topbar.above-the-fold:before {background: rgba(0,0,0,0.6);background: -moz-linear-gradient(top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 85%);background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(0,0,0,0.6)), color-stop(85%, rgba(0,0,0,0)));background: -webkit-linear-gradient(top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 85%);background: -o-linear-gradient(top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 85%);background: -ms-linear-gradient(top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 85%);background: linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 85%);}.topbar .logo {position: absolute;left: 15px;height: 100%;padding-left: 50px;background-image: url(https://s3.amazonaws.com/adobe-luca-prod-ue1-assets/experiments/base/logo.png);background-repeat: no-repeat;background-position: left;background-size: 41px 40px;}.topbar .logo:before {content: "";display: inline-block;height: 100%;width: 1px;vertical-align: middle;}.topbar .logo span {display: inline-block;vertical-align: middle;padding-top: 0px;font-size: 1.25rem;font-weight: 300;}.topbar .action {position: absolute;right: 32px;top: 0;height: 100%;text-align: right;width: 50%;}.topbar .action:before {content: \'\';display: inline-block;vertical-align: middle;height: 100%;width: 0;}.topbar .action a {display: inline-block;vertical-align: middle;color: rgba(255,255,255,0.75);border: 1px solid rgba(255,255,255,0.75);text-decoration: none;font-weight: 300;font-size: 0.9rem;padding: 8px 20px 10px 20px;border-radius: 5px;margin-left: 10px;-webkit-transition: color 0.3s, border-color 0.3s; -moz-transition: color 0.3s, border-color 0.3s;-ms-transition: color 0.3s, border-color 0.3s; -o-transition: color 0.3s, border-color 0.3s;transition: color 0.3s, border-color 0.3s;}.topbar .action a:hover {color: rgba(255,255,255,1);border-color: rgba(255,255,255,1);}/* iPhone */@media only screen and (max-width: 480px),screen and (min-device-width : 320px) and (max-device-width : 568px) and (orientation : landscape) {.topbar {top: -40px;height: 40px;}.topbar .logo {padding-left: 37px;background-size: 30px 30px;}.topbar .logo span {font-size: 2rem;}.topbar .action a {padding: 4px 10px 5px 10px;font-size: 1.2rem;}}',
	"bar" : '',
	"bumper" : '',
	"report_abuse.css" : '.report-abuse-dialog .header h1 {font-family: adobe-clean, "Helvetica Neueu", Helvetica, Arial, sans-serif;}.report-abuse-dialog {font-family: adobe-clean, "Helvetica Neueu", Helvetica, Arial, sans-serif;}.report-abuse-form input[type=text],.report-abuse-form input[type=email],.report-abuse-form textarea {font-family:adobe-clean,"Helvetica Neue",Helvetica,Arial,sans-serif;}.banner {font-family:adobe-clean,"Helvetica Neue",Helvetica,Arial,sans-serif;}.report-abuse-dialog .invalid-message, .report-abuse-dialog .required-message {color: red;margin-left: 5px;display: none;}.report-abuse-dialog .field.invalid .invalid-message {display: inline;}.report-abuse-dialog .field.required .required-message {display: inline;}',
	"report_abuse" : '<div class="report-abuse-dialog js-report-abuse-dialog"><div class="report-abuse-dialog-scrim"></div><div class="report-abuse-dialog-content"><div class="spinner-modal js-spinner-modal"><div class="spinner-modal-spinner"></div></div><div class="header"><h1>Report Abuse</h1><button title="Close" class="btn-close btn-reportabuse-close js-report-abuse-close"><em class="sprite30x30">Close</em></button></div><div class="report-abuse-dialog-content-inner"><div class="article"><div class="report-abuse-dialog-article-contents"><form class="report-abuse-form js-report-abuse-form"><p>If you feel that this video content violates the Adobe <a href="http://www.adobe.com/go/tou" target="_blank">Terms of Use</a>, you may report this content by filling out this quick form.</p><ul class="group info"><li class="field" data-required="true" data-type="email"><label id="email-label" for="email"><strong>Your Email</strong> <strong class="required-message">Required</strong> <strong class="invalid-message">Invalid</strong><b></b></label><input id="email" name="email" type="email"></li><li class="field" data-required="true"><label id="name-label" for="name"><strong>Your Name</strong> <strong class="required-message">Required</strong><b></b></label><input id="name" name="name" type="text"></li></ul><p></p><div class="field" data-required="true"><label id="radio-label"><strong>Why are you reporting this content?</strong> <strong class="required-message">Required</strong><b></b></label><ul class="radio"><li><input type="radio" id="def" name="type" value="defamation"><label for="def">Defamation</label></li><li><input type="radio" id="tra" name="type" value="trademark"><label for="tra">Trademark Infringement</label></li><li><input type="radio" id="off" name="type" value="vulgar"><label for="off">Offensive Content</label></li><li><input type="radio" id="rac" name="type" value="hate"><label for="rac">Racist or Hate Content</label></li><li><input type="radio" id="exp" name="type" value="pornography"><label for="exp">Sexually Explicit Content</label></li><li><input type="radio" id="oth" name="type" value="other"><label for="oth">Other</label></li></ul></div><ul><li class="field" data-required="true"><label id="desc-label"><strong>Please provide a description of your concern.</strong> <strong class="required-message">Required</strong><b></b></label><textarea maxlength="1024" name="description" rows="4" id="description"></textarea></li></ul><p class="notice">To report a Copyright Violation, please follow Section 17 in the <a href="http://www.adobe.com/go/tou" target="_blank">Terms of Use</a>.</p><div class="buttons"><button type="button" class="button cancel js-report-abuse-cancel">Cancel </button><input type="submit" class="button" value="Report Abuse" ></div></form></div><!--dialog-article-contents--></div><!--article--></div><!--dialog-content-inner--></div><!--dialog-content--></div><!--report-abuse-dialog-->',
	"spark_bumper_ios" : '<div class="section spark-bumper-section visible" data-section-behavior="spark-bumper" data-layer-name="under"><div class="section-view"><!--BUMPER-CONTENT-START--><div class="bumper-content"><div class="bumper-content-container"><span class="made-with">Made with</span><a class="spark-page-logo logo" href="http://www.adobe.com/go/slate-home" data-analytics-get-slate=""></a><span class="adobe-spark-page">Adobe Spark Page</span><span class="tag-line">Turn words and images into beautiful web stories&mdash;in minutes <a class="learn-more inline" href="#">Learn more.</a></span><a class="get-spark-page button" href="https://itunes.apple.com/us/app/adobe-slate-make-your-words/id968433730?mt=8" data-analytics-get-slate="">Get Spark Page</a><a class="learn-more block" href="#">Learn more.</a></div></div><!--BUMPER-CONTENT-END--><!--FOOTER-START--><div class="footer"><span class="copyright">© 2016 Adobe Systems Incorporated. All rights reserved.</span><span class="tos"><a target="_blank" href="http://www.adobe.com/go/slate-terms-of-use">Terms of Service</a></span><span class="privacy"><a target="_blank" href="http://www.adobe.com/go/privacy">Privacy Policy</a></span><span class="report-abuse"><a class="js-report-abuse" href="#" target="_blank">Report Abuse</a></span><span class="adobe-logo"></span></div><!--FOOTER-END--></div></div>',
	"spark_bumper.css" : '.sections-article-layout {/* bumper-section */ }.sections-article-layout .spark-bumper-section {max-height: 100%;bottom: auto;background-color: #35414d;/* section-view */ }.sections-article-layout .spark-bumper-section .section-view {position: relative; }/* sections-article-layout */.spark-bumper-section {font-family: adobe-clean, sans-serif;font-size: 12px;font-weight: 300;line-height: 1;color: #82939d;/* bumper-content *//* footer */ }.spark-bumper-section .bumper-content {padding: 62px 0;text-align: center;/* button */ }.spark-bumper-section .bumper-content .made-with {display: block; }.spark-bumper-section .bumper-content .adobe-spark-page {display: inline-block;/* Needed for transforms */font-size: 28px;font-weight: 400;color: #e6eaed;vertical-align: middle; }.spark-bumper-section .bumper-content .logo {display: inline-block;margin-right: 10px;width: 42px;height: 42px;background-size: 100% 100%;background-repeat: no-repeat;vertical-align: middle; }.spark-bumper-section .bumper-content .spark-logo {background-image: url(https://s3.amazonaws.com/adobe-luca-prod-ue1-assets/experiments/base/images/spark_logo@2x.png); }.spark-bumper-section .bumper-content .spark-page-logo {background-image: url(https://s3.amazonaws.com/adobe-luca-prod-ue1-assets/experiments/base/images/spark_page_logo@2x.png); }.spark-bumper-section .bumper-content .tag-line {display: block;margin: 18px 0 31px 0;font-size: 16px;line-height: 1.5; }.spark-bumper-section .bumper-content .learn-more {color: #82939d;text-decoration: underline; }.spark-bumper-section .bumper-content .learn-more.block {display: none;margin-top: 28px;font-size: 16px; }.spark-bumper-section .bumper-content a.button {display: inline-block;cursor: pointer;-webkit-appearance: none;outline: none;margin-left: 0;border-radius: 1.5em;border: none;padding-left: 1.25em;padding-right: 1.25em;padding-top: 0.45em;padding-bottom: 0.6em;background-color: #dce0e3;color: #27475e;line-height: 1;font-family: inherit;font-size: 16px;font-weight: 600;white-space: pre;text-decoration: none;-webkit-transition: background-color 0.2s, color 0.2s;-moz-transition: background-color 0.2s, color 0.2s;transition: background-color 0.2s, color 0.2s; }.spark-bumper-section .bumper-content a.button:hover {background-color: #fff;color: #20282f; }.spark-bumper-section .footer {padding: 1.5rem 0.5rem;max-width: none;margin: 0 5%;font-size: 12px;line-height: 1.5;color: #82939d;border-top: 1px solid #6e7a86;display: -webkit-box;display: -moz-box;display: box;display: -webkit-flex;display: -moz-flex;display: -ms-flexbox;display: flex;-webkit-box-pack: justify;-moz-box-pack: justify;box-pack: justify;-webkit-justify-content: space-between;-moz-justify-content: space-between;-ms-justify-content: space-between;-o-justify-content: space-between;justify-content: space-between;-ms-flex-pack: justify;-webkit-box-align: center;-moz-box-align: center;box-align: center;-webkit-align-items: center;-moz-align-items: center;-ms-align-items: center;-o-align-items: center;align-items: center;-ms-flex-align: center;/* adobe-logo */ }.spark-bumper-section .footer > * {color: #82939d;font-weight: 300;padding: 0 0.5rem 0 0; }.spark-bumper-section .footer a {color: #82939d;text-decoration: none;font-weight: inherit; }.spark-bumper-section .footer > *:last-child {padding-right: 0; }.spark-bumper-section .footer .privacy {-webkit-box-flex: initial;-moz-box-flex: initial;box-flex: initial;-webkit-flex: initial;-moz-flex: initial;-ms-flex: initial;flex: initial; }.spark-bumper-section .footer .report-abuse {-webkit-box-flex: 1;-moz-box-flex: 1;box-flex: 1;-webkit-flex: 1;-moz-flex: 1;-ms-flex: 1;flex: 1; }.spark-bumper-section .footer .adobe-logo {position: relative; }.spark-bumper-section .footer .adobe-logo:before {content: \'\';display: inline-block;width: 70px;height: 16px;vertical-align: middle;background-size: cover;background-image: url(https://s3.amazonaws.com/adobe-luca-prod-ue1-assets/experiments/base/images/adobe-logo-gray.png); }/* spark-bumper-section*/@media only screen and (max-width: 680px) {/* spark-bumper-content */.spark-bumper-section {/* footer */ }.spark-bumper-section .footer {display: block;padding-top: 17px;padding-bottom: 30px; }.spark-bumper-section .footer .copyright {display: block;margin-bottom: 8px; }.spark-bumper-section .footer > * {padding-right: 16px; }.spark-bumper-section .footer .adobe-logo {float: right; }.spark-bumper-section .footer a {text-decoration: underline; } }@media only screen and (max-width: 480px), screen and (min-device-width: 320px) and (max-device-width: 568px) and (orientation: landscape) { }@media only screen and (max-height: 400px) { }@media only screen and (max-width: 480px) {/* spark-bumper-content */.spark-bumper-section {/* bumper-content */ }.spark-bumper-section .bumper-content {padding-bottom: 42px; }.spark-bumper-section .bumper-content .logo {display: block;margin: 20px auto 13px auto;width: 54px;height: 54px; }.spark-bumper-section .bumper-content .learn-more.inline {display: none; }.spark-bumper-section .bumper-content .learn-more.block {display: block;margin-top: 24px; }.spark-bumper-section .bumper-content .tag-line {margin-top: 17px;margin-bottom: 47px;margin-right: auto;margin-left: auto;max-width: 14em; } }.sections-article-layout .section.credits-section {background-color: #35414d;color: #82939d;}',"spark_bumper" : '<div class="section spark-bumper-section visible" data-section-behavior="spark-bumper" data-layer-name="under"><div class="section-view"><!--BUMPER-CONTENT-START--><div class="bumper-content"><div class="bumper-content-container"><span class="made-with">Made with</span><a class="spark-logo logo" href="http://www.adobe.com/go/slate-home" data-analytics-get-slate=""></a><span class="adobe-spark-page">Adobe Spark Page</span><span class="tag-line">Part of the Adobe Spark Family. <a class="learn-more inline" href="#">Learn more.</a></span><a class="create-your-own button" href="http://www.adobe.com/go/slate-home" data-analytics-get-slate="">Create your own</a><a class="learn-more block" href="#">Learn more.</a></div></div><!--BUMPER-CONTENT-END--><!--FOOTER-START--><div class="footer"><span class="copyright">© 2016 Adobe Systems Incorporated. All rights reserved.</span><span class="tos"><a target="_blank" href="http://www.adobe.com/go/slate-terms-of-use">Terms of Service</a></span><span class="privacy"><a target="_blank" href="http://www.adobe.com/go/privacy">Privacy Policy</a></span><span class="report-abuse"><a class="js-report-abuse" href="#" target="_blank">Report Abuse</a></span><span class="adobe-logo"></span></div><!--FOOTER-END--></div></div>',
    "done": "true"
  };
},{}],2:[function(require,module,exports){
var templates = require( '../../dist/base/templates' );
var Mustache = require( 'mustache' );

require( './spark-bumper' );

var sameDomainIframe = function() {
    try {
        return window.top && window.top != window.self && window.top.location.host == window.location.host;
    } catch (err) {
        return false;
    }
};

var queryParams = WebPro.Utils.parseQueryParams( window.location.toString() );

var isIOS = function() {
    return window.navigator.userAgent.search( /ipad|iphone|ipod/i ) >= 0;
};

var iOSSample = function() {
    return queryParams.trackingId == 'iPadExplore' || queryParams.trackingId == 'iPhoneExplore';
};

var topBar = function( trackingId, buttonText, linkToWelcome ) {
    $( document.body ).on( 'luca-publication-viewer-ready', function(){

        var initialShowTime = 3000;
        var backtrackDistance = 100;
        var showClassName = 'show';
        var aboveTheFoldClassName = 'above-the-fold';

        var $injectHTML = null;
        var animator = $( '.article' ).data( 'animator' );
        var lastScrollPosition = 0;
        var showReason = null;

        var show = function( reason ){
            showReason = reason;
            $injectHTML.addClass( showClassName );
        };

        var hide = function(){
            showReason = null;
            $injectHTML.removeClass( showClassName );
        }

        /*
        if (linkToWelcome) {
            // inject markup
            $injectHTML = $( Mustache.render( templates.bar, {
                path: '/welcome',
                trackingId: trackingId,
                buttonText: buttonText
            }));
        } else {
            // inject markup
            $injectHTML = $( Mustache.render( templates.bar, {
                trackingId: trackingId,
                buttonText: buttonText,
                postPath: '#login'
            }));
        }
        */

        $injectHTML = $(".topbar");

        // TODO: Ideally we put this at the .publication-view level, but that will mean the scrollbar
        // is on top of the top bar.  For now we put it next to the scrollbar in the article panel which
        // will cause problems when we support multiple articles.
        $( '.article-panel' ).append( $injectHTML );
        $( 'body' ).append( '<style type="text/css">' + templates[ 'bar.css' ] + '</style>' );

        // auto hide at startup
        setTimeout( function(){
            hide();
        }, initialShowTime );

        // show the bar on hover
   /*     $( document ).on( 'vmousemove', function( e ){
            if ( e.pageY <= $injectHTML.height() ){
                show( 'mousemove' );
            } else {
                if ( showReason == 'mousemove' ){
                    hide();
                }
            }
        });
*/
        animator.$element.on( 'article-scroll', function ( e ){
            var viewportHeight = window.innerHeight;
            var newScrollPosition = animator.scrollTop();
            var distanceDelta = newScrollPosition - lastScrollPosition;

            // detect if we're above the fold or not
            if ( newScrollPosition < viewportHeight ){
                $injectHTML.addClass( aboveTheFoldClassName );
            } else {
                $injectHTML.removeClass( aboveTheFoldClassName );
            }

            // only show the bar if you scroll back a certain distance
            if ( distanceDelta < 0 ){
                if ( landmarkScrollPosition < 0 ){
                    landmarkScrollPosition = newScrollPosition;
                }

                if ( landmarkScrollPosition - newScrollPosition > backtrackDistance ){
                    show();
                }
            } else if ( distanceDelta > 0 ){
                landmarkScrollPosition = -1;
                hide();
            }

            lastScrollPosition = newScrollPosition;
        });

        // Analytics
        var scPageName = 'adb.page.pageinfo.pagename';
        var scProductCategory = 'adb.page.pageinfo.productcategory';
        var scSourceApp = 'adb.sourceapp.value';
        var scNamespace = 'adb.page.pageInfo.namespace';
        var scLanguage = 'adb.page.pageInfo.language';
        var scAction = 'a.action';

        // this is the hash of the page
        var scPageValue = 'adb.page.value';
        var scPageViewed = 'adb.page.viewed';
        var scPageURL = 'adb.page.pageinfo.pageurl';

        var Analytics = {
            init: function() {
                s.contextData[ scPageURL ] = document.location.href;
                s.contextData[ scProductCategory ] = 'PUBSERVER';
                s.contextData[ scSourceApp ] = 'slate';
                s.contextData[ scNamespace ] = 'pubserver';
                s.contextData[ scLanguage ] = 'en_US';
                s.trackOffline = true;

                // clear out 'action' and 'pagename' before every call and set if needed
                s.contextData[ scAction ] = '';
                s.contextData[ scPageName ] = '';
                s.contextData[ scPageValue ] = '';
            },

            setHash: function() {
                var url = document.location.href;
                var urlArr = url.split( '/' );
                var hash = urlArr[ urlArr.length - 1 ];
                hash = hash.split( '?' )[ 0 ].split( '#' )[ 0 ]; //remove all query and hash params
                s.contextData[scPageValue] = hash;
            },

            clickCreateYourOwn: function() {
                this.init();
                this.setHash();
                s.tl( this, 'o', 'create-your-own' );
            }
        };

        $( '.create-your-own' ).on( 'click', function( e ) {
            Analytics.clickCreateYourOwn();
        });

    });
};

var Form = WebPro.Widget.build( 'Widget.Form', WebPro.Widget, {
    _widgetName: 'form',

    defaultOptions: {
        validationEvent: 'blur',
        errorStateSensitivity: 'low',
        ajaxSubmit: true,
        onSubmit: undefined,
        fieldWrapperClass: 'field',
        formErrorClass: 'form-error',
        formSubmittedClass: 'form-submitted',
        formDeliveredClass: 'form-delivered',
        focusClass: 'focus',
        notEmptyClass: 'not-empty',
        emptyClass: 'empty',
        validClass: 'valid',
        invalidClass: 'invalid',
        requiredClass: 'required'
    },

    validationTypes: {
        'always-valid': /.*/,

        email: /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,

        'min-8': /.{8}.*/,

        alpha: /^[A-z\s]+$/,

        numeric: /^[0-9]+$/,

        phone: /^([0-9])?(\s)?(\([0-9]{3}\)|[0-9]{3}(\-)?)(\s)?[0-9]{3}(\s|\-)?[0-9]{4}(\s|\sext|\sx)?(\s)?[0-9]*$/,

        url: /((([A-Za-z]{3,9}:(?:\/\/)?)?(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[.\!\/\\w]*))?)/,

        time: function( $field ) {
            var time = $field.val().replace( /[^0-9:APM]/g, '' );
            if ( time.indexOf( ':' ) != -1 && time.match( /:/ ).length == 1 ) {
                var timeArr = time.split( ':' ),
                    hour = parseInt( timeArr[0] ),
                    minute = parseInt( timeArr[1] );

                if ( hour < 0 || hour > 24 ) {
                    return true;
                }

                if ( minute < 0 || minute > 59 ) {
                    return true;
                }
            } else {
                return false;
            }
            $field.val( time );
            return true;
        }
    },

    _extractData: function() {
        //shortening variable names
        this.event = this.options.validationEvent;
        this.errorSensitivity = this.options.errorStateSensitivity;
        this.onSubmit = this.options.onSubmit;
        this.classNames = {
            focus: this.options.focusClass,
            blur: this.options.emptyClass,
            keydown: this.options.notEmptyClass
        };
    },

    _attachBehavior: function() {
        var self = this;

        this.$element.find( 'input, textarea' ).each( function() {
            if ( $( this ).val() != 'empty' ) {
                $( this ).removeClass( self.options.emptyClass );
            }
        });

        this.$element.find( '.' + this.options.fieldWrapperClass ).each( function() {
            var control = $( this ).find( 'input, textarea' );
            if ( control.val() != '' ) {
                $( this ).addClass( self.classNames.keydown );
            }
        });

        this.$element.on( 'focus focusin blur focusout keydown change propertychange', 'input, textarea', function(e) {
            var className = self.classNames[ e.type ],
                focus = self.classNames[ 'focus' ],
                keydown = self.classNames[ 'keydown' ],
                blur = self.classNames[ 'blur' ],
                $this = $( this ),
                $field = $this.closest( '.' + self.options.fieldWrapperClass );

            switch ( e.type ) {
                case 'focusin':
                case 'focus':
                    $field.addClass( focus ).removeClass( blur );
                    break;
                case 'focusout':
                case 'blur':
                    $field.removeClass( focus );
                    if ( $this.val() == '' ) {
                        $field.addClass( blur ).removeClass( keydown );
                    }
                    break;
                case 'keydown':
                    $field.addClass( className ).removeClass( blur );
                    break;
                case 'change':
                case 'propertychange':
                    if ( $this.val() != '' ) {
                        $field.addClass( keydown ).removeClass( blur );
                    } else {
                        $field.addClass( blur ).removeClass( keydown );
                    }
                default:
                    break;
            }
        });

        switch ( this.event ) {
            case 'blur':
            case 'keyup':
                this.$element.on( this.event, '.' + this.options.fieldWrapperClass + ' input, .' + this.options.fieldWrapperClass + ' textarea', function() {
                    self._validate( $( this ).closest( '.' + self.options.fieldWrapperClass ) );
                });
            case 'submit':
                this.$element.submit( function(e) {
                    var idx = 0, formValid = true,
                        $fields = self.$element.find( '.' + self.options.fieldWrapperClass );

                    $fields.each( function() {
                        formValid = self._validate( $( this ) ) && formValid;
                    });

                    if ( formValid ) {
                        if ( self.onSubmit ) {
                            self.onSubmit.call( this, e );
                        }
                        if ( self.options.ajaxSubmit ) {
                            e.preventDefault();
                            self._submitForm();
                        }
                    } else {
                        e.preventDefault();
                    }
                });
                break;
            default:
                break;
        }
    },

    _submitForm: function() {
        var self = this,
            submitted = this.options.formSubmittedClass,
            delivered = this.options.formDeliveredClass,
            error = this.options.formErrorClass,
            allClasses = submitted + ' ' + delivered + ' ' + error,
            buttons = this.$element.find( 'input[type=submit], button' );
        $.ajax({
            url: this.$element.attr( 'action' ),
            type: 'post',
            data: this.$element.serialize(),
            beforeSend: function() {
                self.$element.removeClass( allClasses );
                self.$element.addClass( submitted );
                self.$element.find( '.' + self.options.fieldWrapperClass ).removeClass( self.options.focusClass );
                buttons.attr( 'disabled', 'disabled' );
            },
            success: function( response ) {
                self.$element.addClass( delivered ).removeClass( submitted );
                self.$element.find( 'input:not([type=submit]), textarea' ).each( function() {
                    $( this ).val( '' );
                })
                buttons.removeAttr( 'disabled' );
            },
            error: function( response ) {
                self.$element.addClass( error ).removeClass( submitted )
                buttons.removeAttr( 'disabled' );
            }
        })
    },

    _validate: function( $field, requiredOnly ) {
        var type = $field.attr( 'data-type' ) || 'always-valid';
        var control = $field.find( 'input, textarea' );
        var requiredOnly = requiredOnly || false;
        var validObj = this.validationTypes[ type ];
        var isRequired = $field.attr( 'data-required' ) === 'true';
        var value = control.length > 1 ? this._getRadioValue( control ) : control.val();
        var isEmpty = value == '';
        var isValid = (validObj instanceof RegExp) ? Boolean( value.match( validObj ) ) : validObj( control );

        if ( isRequired && isEmpty ) {
            return this._switchState( 'required', $field );
        }
        if ( !isValid && !requiredOnly ) {
            return this._switchState( 'invalid', $field );
        }

        return this._switchState( 'valid', $field );
    },

    _getRadioValue: function( $list ) {
        var value = '';
        $list.each( function( i, button ) {
            if ( button.checked ) {
                value = button.value;
                return false;
            }
        });

        return value;
    },

    _switchState: function( state, $field ) {
        var valid = this.options.validClass,
            invalid = this.options.invalidClass,
            required = this.options.requiredClass,
            allClasses = valid + ' ' + invalid + ' ' + required;

        $field.removeClass( allClasses );
        if ( state == 'required' || state == 'invalid' ) {
            if ( state == 'invalid' ) {
                $field.addClass( invalid );
            } else {
                $field.addClass( required );
                var requiredOnly = true;
            }
            if ( this.errorSensitivity != 'low' ) {
                var self = this,
                    event;
                if ( this.errorSensitivity == 'high' ) {
                    event = 'keyup';
                } else {
                    //medium
                    event = 'blur';
                }

                if ( !$field.data( 'error-state' ) ) {
                    $field.data( 'error-state', true );
                    $field.on( event, 'input, textarea', function() {
                        self._validate( $field, requiredOnly );
                    });
                }
            }
            return false;
        }
        if ( $field.data( 'error-state' ) ) {
            if ( this.errorSensitivity == 'high' ) {
                if ( this.event != 'keyup' ) {
                    $field.data( 'error-state', false ).find( 'input, textarea' ).unbind( 'keyup' );
                }
            } else if ( this.errorSensitivity == 'medium' ) {
                //medium
                if ( this.event != 'blur' ) {
                    $field.data( 'error-state', false ).find( 'input, textarea' ).unbind( 'blur' );
                }
            }
        }
        $field.addClass( valid );
        return true;
    }
});

WebPro.Widget.addWidgetConstructorAsjQueryPlugin( 'wpForm', Form );

var initReportAbuseForm = function() {
    $.fn.serializeObject = function() {
        var o = {};
        var a = this.serializeArray();
        $.each( a, function() {
            if ( o[ this.name ] !== undefined ) {
                if ( !o[ this.name ].push ) {
                    o[ this.name ] = [ o[ this.name ] ];
                }
                o[ this.name ].push( this.value || '' );
            } else {
                o[ this.name ] = this.value || '';
            }
        });
        return o;
    };

    $( document.body ).on( 'luca-publication-viewer-ready', function() {
        var ReportAbuse = {};

        var $body = $( 'body' );
        var $doc = $( document );
        var $successBanner = $( '.js-report-success' );
        var $errorBanner = $( '.js-report-error' );
        var reportAbuseShowClass = 'show';
        var spinnerShowClass = 'show';
        var bannerShowClass = 'show';
        var animationEnd = 'animationend webkitAnimationEnd mozAnimationEnd MSAnimationEnd oAnimationEnd';
        var $reportDialog;
        var $reportAbuseLink;
        var $reportAbuseCloseCancel;
        var $reportAbuseForm;
        var $spinnerModal;

        $.fn.customClick = function( fn, thisArg ) {
            this.on( 'click', function( evt ) {
                evt.preventDefault();
                fn.call( thisArg, evt );
            });
        };

        var ReportAbuse = {
            swapOutForm: function() {
                var formMarkup = templates.report_abuse;

                var style = '<style type="text/css">' + templates[ 'report_abuse.css' ] + '</style>';

                // Undo event handlers that will still be active after the DOM removal;
                $( '.bumper-section' ).off( 'click', '.js-report-abuse' );
                $doc.off( 'keyup' );

                $( '.js-report-abuse-form' ).remove();
                $( '.js-report-abuse-dialog' ).remove();
                $( '.report-abuse-dialog' ).remove();

                // Swap out markup
                $body.append( formMarkup );
                $body.append( style );


                // Point vars at the new elements
                $reportDialog = $( '.js-report-abuse-dialog' );
                $reportAbuseLink = $( '.js-report-abuse' );
                $reportAbuseCloseCancel = $( '.js-report-abuse-close, .js-report-abuse-cancel' );
                $reportAbuseForm = $( '.js-report-abuse-form' );
                $spinnerModal = $( '.js-spinner-modal' );
            },

            init: function() {
                var self = this;
                self.swapOutForm();

                $doc.on( 'keyup', this.onKeyUp.bind( this ) );
                $( '.bumper-section, .spark-bumper-section' ).on( 'click', '.js-report-abuse', function( evt ) {
                    evt.preventDefault();
                    self.onReportAbuseClick( evt );
                });
                $reportAbuseCloseCancel.customClick( this.onCloseCancelClick, this );
                $reportAbuseForm.wpForm({
                    validationEvent: 'blur',
                    errorStateSensitivity: 'high',
                    formSubmittedClass: 'form-submitted',
                    // set to false to let custom submit handler actually post the form
                    ajaxSubmit: false,
                    onSubmit: this.onAbuseSubmit
                });
                $successBanner.on( animationEnd, this.onBannerAnimationEnd.bind( this ) );
                $errorBanner.on( animationEnd, this.onBannerAnimationEnd.bind( this ) );
            },

            onReportAbuseClick: function( evt ) {
                $reportDialog.addClass( reportAbuseShowClass );
            },

            onCloseCancelClick: function( evt ) {
                this.closeDialogs();
            },

            onKeyUp: function( evt ) {
                if ( evt.which == 27 ) {
                    this.escape();
                }
            },

            onAbuseSubmit: function( evt ) {
                var $this = $( this );
                evt.preventDefault();

                var hash = window.location.pathname;
                var data = $this.serializeObject();

                // If it is a /a/{hash_id} URL, use the Pub Server endpoint (need hash id -> asset_id)
                if ( hash.search ( /^\/a\// ) != -1 || hash.search( /^\/assets\// ) != -1 ) {
                    hash = hash.split( '/' )[ 2 ];
                    var url = 'https://' +
                        location.hostname +
                        '/' + hash +
                        '/report';
                } else {
                    // If it is a new /{hash_id} URL, go directly to CP (CP knows the hash_id as an alias)

                    var hostname = Luca.backendHostname;

                    if ( hash.search ( /^\/cp\// ) != -1 ) {
                        hash = hash.split( '/' )[ 2 ];
                    } else {
                        hash = hash.split( '/' )[ 1 ];
                    }

                    var url = 'https://' + hostname +
                        '/api/v2/slate/assets/' +
                        hash +
                        '/report';
                    data.date = new Date().toISOString();
                    data.language = 'en_US';
                    data.metadata = {
                        url: window.location.href
                    };
                }

                $.ajax({
                    type: 'POST',
                    url: url,
                    data: JSON.stringify( data ),
                    contentType: 'application/json',
                    processData: false,
                    beforeSend: function( xhr ) {
                        xhr.setRequestHeader( 'X-Api-Key', 'MarvelWeb1' );
                        $spinnerModal.addClass( spinnerShowClass );
                    }
                })
                .done( function( data, status, xhr ) {
                    $spinnerModal.removeClass( spinnerShowClass );
                    if ( status != 'success' ) {
                        $errorBanner.addClass( bannerShowClass );
                        ReportAbuse.closeDialogs();
                        return;
                    }

                    $successBanner.addClass( bannerShowClass );
                    ReportAbuse.closeDialogs();
                })
                .fail( function() {
                    $spinnerModal.removeClass( spinnerShowClass );
                    $errorBanner.addClass( bannerShowClass );
                    ReportAbuse.closeDialogs();
                })
            },

            onBannerAnimationEnd: function( evt ) {
                $successBanner.removeClass( bannerShowClass );
                $errorBanner.removeClass( bannerShowClass );
            },

            escape: function() {
                this.closeDialogs();
            },

            closeDialogs: function() {
                $reportDialog.removeClass( reportAbuseShowClass );
            }
        };

        ReportAbuse.init();
    });
};

var initBumper = function( url, trackingId ) {
    //$( '.bumper-section' ).remove();
    /*$( '.article' ).append( Mustache.render( templates.bumper, {
        getUrl: url + '?trackingId=' + trackingId
    }));*/
};

var initSparkBumper = function() {
    var template = isIOS() ? templates.spark_bumper_ios : templates.spark_bumper;

    //$( '.bumper-section' ).remove();
   // $( '.article' ).append( Mustache.render( template, {} ) );
    $( 'body' ).append( '<style type="text/css">' + templates[ 'spark_bumper.css' ] + '</style>' );
};

Luca.Experiments.registerExperiment({
    name: 'base',

    cohorts: {
        'base-bumper-new': function( version ) {
            if ( !sameDomainIframe() ) {
                topBar( 'reader_slate_topbar_createyourown', 'Mauricio' );
                initBumper( 'https://slate.adobe.com/welcome/', 'reader_slate_bumper_createyourown' );
            }

            if ( window.useNewBumper ) {
                initSparkBumper();
            } else {
                initBumper( 'https://slate.adobe.com/welcome/', 'reader_slate_bumper_createyourown' );
            }

            initReportAbuseForm();

            if ( iOSSample() ) {
                $( '.bumper-content-container .button' ).remove();
                $( '.spark-bumper-section .create-your-own.button' ).remove();

                $( '.bumper-section .logo, .spark-bumper-section .spark-logo.logo' ).on( 'click', function( evt ) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    return false;
                });
            }
        },
        'base-bumper-mobile': function( version ) {
            if ( window.useNewBumper ) {
                initSparkBumper();
            } else {
                initBumper( 'https://slate.adobe.com/welcome/', 'reader_slate_bumper_createyourown' );
            }

            initReportAbuseForm();

            if ( iOSSample() ) {
                $( '.bumper-content-container .button' ).remove();
                $( '.spark-bumper-section .create-your-own.button' ).remove();

                $( '.bumper-section .logo, .spark-bumper-section .spark-logo.logo' ).on( 'click', function( evt ) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    return false;
                });
            }
        }
    }
});

},{"../../dist/base/templates":1,"./spark-bumper":3,"mustache":4}],3:[function(require,module,exports){
Luca.registerSectionsArticleHandler( 'spark-bumper', $.extend( {}, Luca.GenericSectionArticleHandler, {
    _initialize: function( sectionEle, options ) {
        var $section = $( sectionEle );
        var sectionTimeline = $section.data( 'timeline' );

        var transform = Luca.vendorPrefix + 'transform';
        var transformOrigin = Luca.vendorPrefix + 'transform-origin';

        var $content = $section.find( '.bumper-content' );
        var $footer = $section.find( '.footer' );

        var $logo = $content.find( '.logo' );
        var $madeWith = $content.find( '.made-with' );
        var $sparkPage = $content.find( '.adobe-spark-page' );
        var $tagline = $content.find( '.tag-line' );

        var $button = $content.find( '.button' );
        var $learnMore = $content.find( '.learn-more.block' );

        var props = options.props;
        var isUnder = props.layer === -1;
        var sectionHeight = props.height;
        var halfHeight = sectionHeight >> 1;
        var quarterHeight = halfHeight >> 1;

        // Get the center of the area that contains the made-with, spark-page and logo.

        var mDim = this._getGeometry( $madeWith );
        var sDim = this._getGeometry( $sparkPage );
        var lDim = this._getGeometry( $logo );
        var tDim = this._getGeometry( $tagline );
        var bDim = this._getGeometry( $button );
        var lmDim = this._getGeometry( $learnMore );

        var centerX = ( Math.max( mDim.x2, sDim.x2, lDim.x2 ) - Math.min( mDim.x, sDim.x, lDim.x ) ) >> 1;
        var centerY = ( Math.max( mDim.y2, sDim.y2, lDim.y2 ) - Math.min( mDim.y, sDim.y, lDim.y ) ) >> 1;

        // The section that precedes the bumper can be over (uncover) or on the same
        // layer (pulled) as the bumper, we have to account for the difference in movement
        // of the section-view that can occur. To simplify things, we will generate our
        // parameters and animations with the assumption that the section is being "pulled"
        // into view. We'll animate the content container in the 'under' layer case so that
        // the content inside it looks like it is being pulled in, allowing us to the use
        // the exact same parameters and tweens in both cases.

        if ( isUnder ) {
            sectionTimeline.translateY( $content, 0, sectionHeight, sectionHeight + 'px', '0px' );
        }

        // Animate the scaling of the logo and made-with text.

        sectionTimeline.scale( $madeWith, 0, halfHeight, '0', '1' );
        sectionTimeline.translateY( $madeWith, 0, halfHeight, -centerY + 'px', '0px' );

        sectionTimeline.scale( $logo, 0, halfHeight, '0', '1' );
        sectionTimeline.translateY( $logo, 0, halfHeight, -centerY + 'px', '0px' );

        sectionTimeline.scale( $sparkPage, 0, halfHeight, '0', '1' );
        sectionTimeline.translateY( $sparkPage, 0, halfHeight, -centerY + 'px', '0px' );

        // Fade in the tagline, butotn and learn-more link.

        var tDY = Math.max( sDim.y2, lDim.y2 ) - tDim.y;
        var bDY = tDim.y2 - bDim.y + 4;
        var lmDY = tDim.y2 + bDim.height - lmDim.y + 4;

        sectionTimeline.translateY( $tagline, halfHeight, quarterHeight, tDY + 'px', '0px' );
        sectionTimeline.opacity( $tagline, halfHeight, quarterHeight, 0, 1 );

        sectionTimeline.translateY( $button, halfHeight + quarterHeight, quarterHeight, bDY + 'px', '0px' );
        sectionTimeline.opacity( $button, halfHeight + quarterHeight, quarterHeight, 0, 1 );

        sectionTimeline.translateY( $learnMore, halfHeight + quarterHeight, quarterHeight, lmDY + 'px', '0px' );
        sectionTimeline.opacity( $learnMore, halfHeight + quarterHeight, quarterHeight, 0, 1 );

        // The footer animates in a way that gives the appearance of moving slower than
        // the section. This gives the appearance of the section stretching, and some resistance
        // of the footer to come into view.

        if ( $footer.length > 0 ) {
            sectionTimeline.translateY( $footer, halfHeight, halfHeight, $footer[ 0 ].offsetHeight - ( isUnder ? 0 : halfHeight ) + 'px', '0px' );
        }

        // Initialize the elements we are animating so that they are in their
        // default positions and ready to go.

        $madeWith
            .css( transformOrigin, ( centerX - mDim.x ) + 'px ' + ( centerY - mDim.y ) + 'px' );

        $logo
            .css( transformOrigin, ( centerX - lDim.x ) + 'px ' + ( centerY - lDim.y ) + 'px' );

        $sparkPage
            .css( transformOrigin, ( centerX - sDim.x ) + 'px ' + ( centerY - sDim.y ) + 'px' );

        var tDY = Math.max( sDim.y2, lDim.y2 ) - tDim.y;
        var bDY = tDim.y2 - bDim.y + 4;
        var lmDY = tDim.y2 + bDim.height - lmDim.y + 4;

        $tagline
            .css( transform, 'translate3d(0,' + tDY + 'px,0)')
            .css( 'opacity', '0' );

        $button
            .css( transform, 'translate3d(0,' + bDY + 'px,0)')
            .css( 'opacity', '0' );

        $learnMore
            .css( transform, 'translate3d(0,' + lmDY + 'px,0)')
            .css( 'opacity', '0' );


        $footer.css( transform, 'translate3d(0,' + ( isUnder ? $footer[ 0 ].offsetHeight : 0 ) + 'px,0)');
    },

    _getGeometry: function( $ele ) {
        var ele = $ele && $ele[ 0 ],
            rect = { x: 0, y: 0, width: 0, height: 0, x2: 0, y2: 0 };

        if ( ele ) {
            rect.width = ele.offsetWidth;
            rect.height = ele.offsetHeight;
            rect.x = ele.offsetLeft;
            rect.y = ele.offsetTop;
            rect.x2 = rect.x + rect.width;
            rect.y2 = rect.y + rect.height;
        }

        return rect;
    }
}));

},{}],4:[function(require,module,exports){
/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */

/*global define: false Mustache: true*/

(function defineMustache (global, factory) {
  if (typeof exports === 'object' && exports && typeof exports.nodeName !== 'string') {
    factory(exports); // CommonJS
  } else if (typeof define === 'function' && define.amd) {
    define(['exports'], factory); // AMD
  } else {
    global.Mustache = {};
    factory(global.Mustache); // script, wsh, asp
  }
}(this, function mustacheFactory (mustache) {

  var objectToString = Object.prototype.toString;
  var isArray = Array.isArray || function isArrayPolyfill (object) {
    return objectToString.call(object) === '[object Array]';
  };

  function isFunction (object) {
    return typeof object === 'function';
  }

  /**
   * More correct typeof string handling array
   * which normally returns typeof 'object'
   */
  function typeStr (obj) {
    return isArray(obj) ? 'array' : typeof obj;
  }

  function escapeRegExp (string) {
    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
  }

  /**
   * Null safe way of checking whether or not an object,
   * including its prototype, has a given property
   */
  function hasProperty (obj, propName) {
    return obj != null && typeof obj === 'object' && (propName in obj);
  }

  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
  // See https://github.com/janl/mustache.js/issues/189
  var regExpTest = RegExp.prototype.test;
  function testRegExp (re, string) {
    return regExpTest.call(re, string);
  }

  var nonSpaceRe = /\S/;
  function isWhitespace (string) {
    return !testRegExp(nonSpaceRe, string);
  }

  var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };

  function escapeHtml (string) {
    return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap (s) {
      return entityMap[s];
    });
  }

  var whiteRe = /\s*/;
  var spaceRe = /\s+/;
  var equalsRe = /\s*=/;
  var curlyRe = /\s*\}/;
  var tagRe = /#|\^|\/|>|\{|&|=|!/;

  /**
   * Breaks up the given `template` string into a tree of tokens. If the `tags`
   * argument is given here it must be an array with two string values: the
   * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
   * course, the default is to use mustaches (i.e. mustache.tags).
   *
   * A token is an array with at least 4 elements. The first element is the
   * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
   * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
   * all text that appears outside a symbol this element is "text".
   *
   * The second element of a token is its "value". For mustache tags this is
   * whatever else was inside the tag besides the opening symbol. For text tokens
   * this is the text itself.
   *
   * The third and fourth elements of the token are the start and end indices,
   * respectively, of the token in the original template.
   *
   * Tokens that are the root node of a subtree contain two more elements: 1) an
   * array of tokens in the subtree and 2) the index in the original template at
   * which the closing tag for that section begins.
   */
  function parseTemplate (template, tags) {
    if (!template)
      return [];

    var sections = [];     // Stack to hold section tokens
    var tokens = [];       // Buffer to hold the tokens
    var spaces = [];       // Indices of whitespace tokens on the current line
    var hasTag = false;    // Is there a {{tag}} on the current line?
    var nonSpace = false;  // Is there a non-space char on the current line?

    // Strips all whitespace tokens array for the current line
    // if there was a {{#tag}} on it and otherwise only space.
    function stripSpace () {
      if (hasTag && !nonSpace) {
        while (spaces.length)
          delete tokens[spaces.pop()];
      } else {
        spaces = [];
      }

      hasTag = false;
      nonSpace = false;
    }

    var openingTagRe, closingTagRe, closingCurlyRe;
    function compileTags (tagsToCompile) {
      if (typeof tagsToCompile === 'string')
        tagsToCompile = tagsToCompile.split(spaceRe, 2);

      if (!isArray(tagsToCompile) || tagsToCompile.length !== 2)
        throw new Error('Invalid tags: ' + tagsToCompile);

      openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + '\\s*');
      closingTagRe = new RegExp('\\s*' + escapeRegExp(tagsToCompile[1]));
      closingCurlyRe = new RegExp('\\s*' + escapeRegExp('}' + tagsToCompile[1]));
    }

    compileTags(tags || mustache.tags);

    var scanner = new Scanner(template);

    var start, type, value, chr, token, openSection;
    while (!scanner.eos()) {
      start = scanner.pos;

      // Match any text between tags.
      value = scanner.scanUntil(openingTagRe);

      if (value) {
        for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
          chr = value.charAt(i);

          if (isWhitespace(chr)) {
            spaces.push(tokens.length);
          } else {
            nonSpace = true;
          }

          tokens.push([ 'text', chr, start, start + 1 ]);
          start += 1;

          // Check for whitespace on the current line.
          if (chr === '\n')
            stripSpace();
        }
      }

      // Match the opening tag.
      if (!scanner.scan(openingTagRe))
        break;

      hasTag = true;

      // Get the tag type.
      type = scanner.scan(tagRe) || 'name';
      scanner.scan(whiteRe);

      // Get the tag value.
      if (type === '=') {
        value = scanner.scanUntil(equalsRe);
        scanner.scan(equalsRe);
        scanner.scanUntil(closingTagRe);
      } else if (type === '{') {
        value = scanner.scanUntil(closingCurlyRe);
        scanner.scan(curlyRe);
        scanner.scanUntil(closingTagRe);
        type = '&';
      } else {
        value = scanner.scanUntil(closingTagRe);
      }

      // Match the closing tag.
      if (!scanner.scan(closingTagRe))
        throw new Error('Unclosed tag at ' + scanner.pos);

      token = [ type, value, start, scanner.pos ];
      tokens.push(token);

      if (type === '#' || type === '^') {
        sections.push(token);
      } else if (type === '/') {
        // Check section nesting.
        openSection = sections.pop();

        if (!openSection)
          throw new Error('Unopened section "' + value + '" at ' + start);

        if (openSection[1] !== value)
          throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
      } else if (type === 'name' || type === '{' || type === '&') {
        nonSpace = true;
      } else if (type === '=') {
        // Set the tags for the next time around.
        compileTags(value);
      }
    }

    // Make sure there are no open sections when we're done.
    openSection = sections.pop();

    if (openSection)
      throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);

    return nestTokens(squashTokens(tokens));
  }

  /**
   * Combines the values of consecutive text tokens in the given `tokens` array
   * to a single token.
   */
  function squashTokens (tokens) {
    var squashedTokens = [];

    var token, lastToken;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      token = tokens[i];

      if (token) {
        if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
          lastToken[1] += token[1];
          lastToken[3] = token[3];
        } else {
          squashedTokens.push(token);
          lastToken = token;
        }
      }
    }

    return squashedTokens;
  }

  /**
   * Forms the given array of `tokens` into a nested tree structure where
   * tokens that represent a section have two additional items: 1) an array of
   * all tokens that appear in that section and 2) the index in the original
   * template that represents the end of that section.
   */
  function nestTokens (tokens) {
    var nestedTokens = [];
    var collector = nestedTokens;
    var sections = [];

    var token, section;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      token = tokens[i];

      switch (token[0]) {
        case '#':
        case '^':
          collector.push(token);
          sections.push(token);
          collector = token[4] = [];
          break;
        case '/':
          section = sections.pop();
          section[5] = token[2];
          collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
          break;
        default:
          collector.push(token);
      }
    }

    return nestedTokens;
  }

  /**
   * A simple string scanner that is used by the template parser to find
   * tokens in template strings.
   */
  function Scanner (string) {
    this.string = string;
    this.tail = string;
    this.pos = 0;
  }

  /**
   * Returns `true` if the tail is empty (end of string).
   */
  Scanner.prototype.eos = function eos () {
    return this.tail === '';
  };

  /**
   * Tries to match the given regular expression at the current position.
   * Returns the matched text if it can match, the empty string otherwise.
   */
  Scanner.prototype.scan = function scan (re) {
    var match = this.tail.match(re);

    if (!match || match.index !== 0)
      return '';

    var string = match[0];

    this.tail = this.tail.substring(string.length);
    this.pos += string.length;

    return string;
  };

  /**
   * Skips all text until the given regular expression can be matched. Returns
   * the skipped string, which is the entire tail if no match can be made.
   */
  Scanner.prototype.scanUntil = function scanUntil (re) {
    var index = this.tail.search(re), match;

    switch (index) {
      case -1:
        match = this.tail;
        this.tail = '';
        break;
      case 0:
        match = '';
        break;
      default:
        match = this.tail.substring(0, index);
        this.tail = this.tail.substring(index);
    }

    this.pos += match.length;

    return match;
  };

  /**
   * Represents a rendering context by wrapping a view object and
   * maintaining a reference to the parent context.
   */
  function Context (view, parentContext) {
    this.view = view;
    this.cache = { '.': this.view };
    this.parent = parentContext;
  }

  /**
   * Creates a new context using the given view with this context
   * as the parent.
   */
  Context.prototype.push = function push (view) {
    return new Context(view, this);
  };

  /**
   * Returns the value of the given name in this context, traversing
   * up the context hierarchy if the value is absent in this context's view.
   */
  Context.prototype.lookup = function lookup (name) {
    var cache = this.cache;

    var value;
    if (cache.hasOwnProperty(name)) {
      value = cache[name];
    } else {
      var context = this, names, index, lookupHit = false;

      while (context) {
        if (name.indexOf('.') > 0) {
          value = context.view;
          names = name.split('.');
          index = 0;

          /**
           * Using the dot notion path in `name`, we descend through the
           * nested objects.
           *
           * To be certain that the lookup has been successful, we have to
           * check if the last object in the path actually has the property
           * we are looking for. We store the result in `lookupHit`.
           *
           * This is specially necessary for when the value has been set to
           * `undefined` and we want to avoid looking up parent contexts.
           **/
          while (value != null && index < names.length) {
            if (index === names.length - 1)
              lookupHit = hasProperty(value, names[index]);

            value = value[names[index++]];
          }
        } else {
          value = context.view[name];
          lookupHit = hasProperty(context.view, name);
        }

        if (lookupHit)
          break;

        context = context.parent;
      }

      cache[name] = value;
    }

    if (isFunction(value))
      value = value.call(this.view);

    return value;
  };

  /**
   * A Writer knows how to take a stream of tokens and render them to a
   * string, given a context. It also maintains a cache of templates to
   * avoid the need to parse the same template twice.
   */
  function Writer () {
    this.cache = {};
  }

  /**
   * Clears all cached templates in this writer.
   */
  Writer.prototype.clearCache = function clearCache () {
    this.cache = {};
  };

  /**
   * Parses and caches the given `template` and returns the array of tokens
   * that is generated from the parse.
   */
  Writer.prototype.parse = function parse (template, tags) {
    var cache = this.cache;
    var tokens = cache[template];

    if (tokens == null)
      tokens = cache[template] = parseTemplate(template, tags);

    return tokens;
  };

  /**
   * High-level method that is used to render the given `template` with
   * the given `view`.
   *
   * The optional `partials` argument may be an object that contains the
   * names and templates of partials that are used in the template. It may
   * also be a function that is used to load partial templates on the fly
   * that takes a single argument: the name of the partial.
   */
  Writer.prototype.render = function render (template, view, partials) {
    var tokens = this.parse(template);
    var context = (view instanceof Context) ? view : new Context(view);
    return this.renderTokens(tokens, context, partials, template);
  };

  /**
   * Low-level method that renders the given array of `tokens` using
   * the given `context` and `partials`.
   *
   * Note: The `originalTemplate` is only ever used to extract the portion
   * of the original template that was contained in a higher-order section.
   * If the template doesn't use higher-order sections, this argument may
   * be omitted.
   */
  Writer.prototype.renderTokens = function renderTokens (tokens, context, partials, originalTemplate) {
    var buffer = '';

    var token, symbol, value;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      value = undefined;
      token = tokens[i];
      symbol = token[0];

      if (symbol === '#') value = this.renderSection(token, context, partials, originalTemplate);
      else if (symbol === '^') value = this.renderInverted(token, context, partials, originalTemplate);
      else if (symbol === '>') value = this.renderPartial(token, context, partials, originalTemplate);
      else if (symbol === '&') value = this.unescapedValue(token, context);
      else if (symbol === 'name') value = this.escapedValue(token, context);
      else if (symbol === 'text') value = this.rawValue(token);

      if (value !== undefined)
        buffer += value;
    }

    return buffer;
  };

  Writer.prototype.renderSection = function renderSection (token, context, partials, originalTemplate) {
    var self = this;
    var buffer = '';
    var value = context.lookup(token[1]);

    // This function is used to render an arbitrary template
    // in the current context by higher-order sections.
    function subRender (template) {
      return self.render(template, context, partials);
    }

    if (!value) return;

    if (isArray(value)) {
      for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
        buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate);
      }
    } else if (typeof value === 'object' || typeof value === 'string' || typeof value === 'number') {
      buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate);
    } else if (isFunction(value)) {
      if (typeof originalTemplate !== 'string')
        throw new Error('Cannot use higher-order sections without the original template');

      // Extract the portion of the original template that the section contains.
      value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);

      if (value != null)
        buffer += value;
    } else {
      buffer += this.renderTokens(token[4], context, partials, originalTemplate);
    }
    return buffer;
  };

  Writer.prototype.renderInverted = function renderInverted (token, context, partials, originalTemplate) {
    var value = context.lookup(token[1]);

    // Use JavaScript's definition of falsy. Include empty arrays.
    // See https://github.com/janl/mustache.js/issues/186
    if (!value || (isArray(value) && value.length === 0))
      return this.renderTokens(token[4], context, partials, originalTemplate);
  };

  Writer.prototype.renderPartial = function renderPartial (token, context, partials) {
    if (!partials) return;

    var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
    if (value != null)
      return this.renderTokens(this.parse(value), context, partials, value);
  };

  Writer.prototype.unescapedValue = function unescapedValue (token, context) {
    var value = context.lookup(token[1]);
    if (value != null)
      return value;
  };

  Writer.prototype.escapedValue = function escapedValue (token, context) {
    var value = context.lookup(token[1]);
    if (value != null)
      return mustache.escape(value);
  };

  Writer.prototype.rawValue = function rawValue (token) {
    return token[1];
  };

  mustache.name = 'mustache.js';
  mustache.version = '2.2.1';
  mustache.tags = [ '{{', '}}' ];

  // All high-level mustache.* functions use this writer.
  var defaultWriter = new Writer();

  /**
   * Clears all cached templates in the default writer.
   */
  mustache.clearCache = function clearCache () {
    return defaultWriter.clearCache();
  };

  /**
   * Parses and caches the given template in the default writer and returns the
   * array of tokens it contains. Doing this ahead of time avoids the need to
   * parse templates on the fly as they are rendered.
   */
  mustache.parse = function parse (template, tags) {
    return defaultWriter.parse(template, tags);
  };

  /**
   * Renders the `template` with the given `view` and `partials` using the
   * default writer.
   */
  mustache.render = function render (template, view, partials) {
    if (typeof template !== 'string') {
      throw new TypeError('Invalid template! Template should be a "string" ' +
                          'but "' + typeStr(template) + '" was given as the first ' +
                          'argument for mustache#render(template, view, partials)');
    }

    return defaultWriter.render(template, view, partials);
  };

  // This is here for backwards compatibility with 0.4.x.,
  /*eslint-disable */ // eslint wants camel cased function name
  mustache.to_html = function to_html (template, view, partials, send) {
    /*eslint-enable*/

    var result = mustache.render(template, view, partials);

    if (isFunction(send)) {
      send(result);
    } else {
      return result;
    }
  };

  // Export the escaping function so that the user may override it.
  // See https://github.com/janl/mustache.js/issues/244
  mustache.escape = escapeHtml;

  // Export these mainly for testing, but also for advanced usage.
  mustache.Scanner = Scanner;
  mustache.Context = Context;
  mustache.Writer = Writer;

}));

},{}]},{},[2]);
