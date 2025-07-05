// SPDX-FileCopyrightText: 2023 XWiki CryptPad Team <contact@cryptpad.org> and contributors
//
// SPDX-License-Identifier: AGPL-3.0-or-later

(() => {
const factory = (AppConfig = {}, Messages= {}) => {
    var Feedback = {};

    Feedback.setCustomize = data => {
        Messages = data.Messages;
        AppConfig = data.AppConfig;
    };

    Feedback.init = function (state) {
        Feedback.state = state;
    };

    var randomToken = function () {
        return Math.random().toString(16).replace(/0./, '');
    };
    var ajax = function (url, cb) {
        var http = new XMLHttpRequest();
        http.open('HEAD', url);
        http.onreadystatechange = function() {
            if (this.readyState === this.DONE) {
                if (cb) { cb(); }
            }
        };
        http.send();
    };
    Feedback.send = function (action, force, cb) {
        if (typeof(cb) !== 'function') { cb = function () {}; }
        if (AppConfig.disableFeedback) { return void cb(); }
        if (!action) { return void cb(); }
        if (force !== true) {
            if (!Feedback.state) { return void cb(); }
        }

        var href = '/common/feedback.html?' + action + '=' + randomToken();
        ajax(href, cb);
    };

    Feedback.reportAppUsage = function () {
        var pattern = window.location.pathname.split('/')
            .filter(function (x) { return x; }).join('.');
        if (/^#\/1\/view\//.test(window.location.hash)) {
            Feedback.send(pattern + '_VIEW');
        } else {
            Feedback.send(pattern);
        }
    };

    Feedback.reportScreenDimensions = function () {
        var h = window.innerHeight;
        var w = window.innerWidth;
        Feedback.send('DIMENSIONS:' + h + 'x' + w);
    };
    Feedback.reportLanguage = function () {
        if (!Messages) { return; }
        Feedback.send('LANG_' + Messages._languageUsed);
    };


    return Feedback;
};

if (typeof(module) !== 'undefined' && module.exports) {
    // Code from customize can't be laoded directly in the build
    module.exports = factory(undefined, undefined);
} else if ((typeof(define) !== 'undefined' && define !== null) && (define.amd !== null)) {
    define([
        '/customize/application_config.js',
        '/customize/messages.js'
    ], factory);
} else {
    // unsupported initialization
}

})();
