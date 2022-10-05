// Put this file in path/to/plugin/amd/src
// You can call it anything you like

define(['jquery', 'core/ajax'],
    function ($, Ajax) {

        var init = function () {
            console.log("utils inicializado");
        }
        var ajaxCall = function (methodname, data) {
            return Ajax.call([{
                methodname: methodname,
                args: data,
                fail: function (data) {
                    throw (data);
                }
            }]);
        }
        return {
            init: init,
            ajaxCall: ajaxCall
        };
    });