/*
 * This file contains the code to implement the pre-requisites page for setup
 */

requirejs.config({
    enforceDefine: false,
    paths: {
        'text': './contrib/text'
    }
});

define([
        'jquery',
        'underscore',
        'common/CustomPages/AppSetupPages/CheckPrerequisites',
        'splunk_app_windows_infrastructure/WinfraConstants'
        ],
        function(
            $,
            _,
            CheckPrerequisites,
            WinfraConstants
            )
{   
    var pre_requisites_page = {
        addPageParts: function(parentEl) {
            var that = this;
            
            $('.next-button').addClass('disabled');
            
            CheckPrerequisites.render(
                WinfraConstants.getAppRestId(),
                {
                    'checkSplunkVersion': '6.6.0',
                    'checkTAWindowsVersion': '4.8.3 or 4.8.4',
                    'checkSALdapSearchVersion': '2.1.7',
                    'checkRequiredUserRole': 'winfra-admin'
                },
                parentEl,
                this._updatePageStatus
                );
        },
        
        getPageLabel: function() {
            return 'Prerequisites';
        },
        
        getNextLabel: function() {
            return 'Next';
        },

        validateNext: function() {
            return this.isPageValid();
        },
        
        _updatePageStatus: function(prereqsSatisfied) {
            if (prereqsSatisfied) {
                $('.next-button').removeClass('disabled');
            }
        },
        
        isPageValid: function() {
            CheckPrerequisites.arePrereqsSatisfied();
        }
    };
    
    return pre_requisites_page;
});