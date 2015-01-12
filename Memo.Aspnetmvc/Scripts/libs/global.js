// Revealing Module Pattern 
// Javascript Namespace
// Unit Test, Jasmin
// prototype
"use strict";
var MEMO = MEMO || {};
MEMO.modules = MEMO.modules || {};
MEMO.pages = MEMO.modules || {};
MEMO.services = MEMO.services || {};
MEMO.common = MEMO.common || {};

var _global,
    memo_modernizr = {
        settings: {
            alertArea: 'alert',
            noLocalStorageMsg: 'Please use latest Chrome browser.',
        },
        // init all the modernizr check for memo app
        init: function() {
            _global = this.settings;

            if (!Modernizr.localstorage) {
                alert(_global.noLocalStorageMsg);
                document.getElementById(_global.alertArea).value = _global.noLocalStorageMsg;
            }

            this.bindEvents();
        },
        bindEvents: function() {

        },
    };
(function () {
    memo_modernizr.init();
})();

