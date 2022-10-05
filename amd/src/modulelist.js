// Put this file in path/to/plugin/amd/src
// You can call it anything you like

define(['jquery', 'block_custommodules/utils', 'mod_pmbquiz/dlg-confirm'],
    function ($, Utils, dlgconfirm) {
        var init = function () {

        }
        $('.delete').on('click', function (event) {
            event.preventDefault();
            $btn = $(this);
            var moduleid = $btn.data('moduleid');
            var title = "Deseja remover este módulo ?";
            var message = "Não será possivel recupera-lo";
            dlgconfirm.confirm(title, message, excluirModulo, cancel, [moduleid, $btn]);
        });
        function cancel(params) {

        }
        function excluirModulo(args) {
            const moduleid = args[0];
            const $btn = args[1];

            if (moduleid === undefined || moduleid === "" || moduleid === null) return;

            try {
                var methodname = 'block_custommodules_delete_module';
                var data = { moduleid: moduleid };
                var promises = Utils.ajaxCall(methodname, data);
                promises[0].then(function (data) {
                    console.log(data);
                    var title = 'Excluído!';
                    var text = 'Módulo ' + moduleid + ' excluído.';
                    $btn.parent().parent().remove();
                    var $hidden = $("#hd-url");
                    window.location.replace($hidden.val());
                });
            } catch (e) {
                console.log(e.message);
            }
        }
        return {
            init: init
        };
    });