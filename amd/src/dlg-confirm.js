// Put this file in path/to/plugin/amd/src
// You can call it anything you like
define(['jquery', 'core/ajax', 'core/templates'],
    function ($, Ajax, Templates) {
        var init = function () {
            console.log("Confirm dialog inicializado");
        }
        const confirm = (title, message, yesCallback, noCallback, args) => {
            try {
                isValidParams(title, message, yesCallback, noCallback);
                updateElements(title, message, yesCallback, noCallback, args);
            } catch (error) {
                console.log(error.name + ": " + error.message);
            }
        };
        const close = () => {
            removeModal();
        };
        function removeModal() {
            const elem = document.getElementById("dlg-confirm");
            elem.parentNode.removeChild(elem);
        }
        function updateElements(title, message, yesCallback, noCallback, args) {
            Templates.renderForPromise('mod_pmbquiz/utils/dlgconfirm', {})
                .then(({ html, js }) => {
                    Templates.appendNodeContents('body', html, js);
                    const btnClose = document.getElementById("dlg-confirm-close");
                    btnClose.addEventListener("click", removeModal, false);
                    document.getElementById("dlg-confirm-label").innerHTML = title;
                    document.getElementById("dlg-confirm-message").innerHTML = message;
                    const btnOk = document.getElementById("dlg-confirm-ok");
                    btnOk.addEventListener("click", yesCallback.bind(this, args), false);
                    btnOk.addEventListener("click", close, false);
                    const btnCancel = document.getElementById("dlg-confirm-cancel");
                    btnCancel.addEventListener("click", noCallback, false);
                    btnCancel.addEventListener("click", close, false);
                }).catch(ex => displayException(ex));

        }
        function isValidParams(title, message, yesCallback, noCallback) {
            if (title === undefined) throw new Error("Título da mensagem indefinido!");
            if (message === undefined) throw new Error("Mensagem indefinida!");
            if (yesCallback === undefined)
                throw new Error("Yes callback is undefined!");
            if (typeof yesCallback !== "function")
                throw new Error("Yes callback is not function!");
            if (noCallback === undefined) throw new Error("No callback is undefined!");
            if (typeof noCallback !== "function")
                throw new Error("No callback is not function!");
        }
        return {
            init: init,
            confirm: confirm
        };
    });