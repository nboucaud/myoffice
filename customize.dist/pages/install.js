// SPDX-FileCopyrightText: 2023 XWiki CryptPad Team <contact@cryptpad.org> and contributors
//
// SPDX-License-Identifier: AGPL-3.0-or-later

define([
    '/api/config',
    'jquery',
    '/common/hyperscript.js',
    '/common/common-interface.js',
    '/customize/messages.js',
    '/customize/pages.js'
], function (Config, $, h, UI, Msg, Pages) {
    Config.adminKeys = [];
    return function () {
        // Redirect to drive if this instance already has admins
        if (Array.isArray(Config.adminKeys) && Config.adminKeys.length) {
            document.location.href = '/drive/';
            return;
        }

        document.title = Msg.install_header;

        var frame = function (content) {
            return [
                h('div#cp-main', [
                    //Pages.infopageTopbar(),
                    h('div.container.cp-container', [
                        h('div.row.cp-page-title', h('h1', Msg.install_header)),
                    ].concat(content)),
                    Pages.infopageFooter(),
                ]),
            ];
        };

        return frame([
            h('div.row.cp-register-det', [
                h('div#data.hidden.col-md-6', [
                    h('h2', Msg.register_notes_title),
                    Pages.setHTML(h('div.cp-register-notes'), Msg.install_notes)
                ]),
                h('div.cp-reg-form.col-md-6', [
                    h('div#userForm.form-group.hidden', [
                        h('div.cp-register-instance', [
                            Msg.install_instance,
                        ]),
                        h('input.form-control#installtoken', {
                            type: 'text',
                            placeholder: Msg.install_token
                        }),
                        h('input.form-control#username', {
                            type: 'text',
                            autocomplete: 'off',
                            autocorrect: 'off',
                            autocapitalize: 'off',
                            spellcheck: false,
                            placeholder: Msg.login_username,
                            autofocus: true,
                        }),
                        h('input.form-control#password', {
                            type: 'password',
                            placeholder: Msg.login_password,
                        }),
                        h('input.form-control#password-confirm', {
                            type: 'password',
                            placeholder: Msg.login_confirm,
                        }),
                        /*h('div.checkbox-container', [
                            UI.createCheckbox('import-recent', Msg.register_importRecent, true)
                        ]),*/
                        h('button#register', Msg.install_launch)
                    ])
                ]),
            ])
        ]);
    };

});

