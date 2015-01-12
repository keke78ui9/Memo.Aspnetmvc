MEMO.modules.listMemo = (function (memoDataSvc, dataSvc, utility) {
    var _opts;


    var initialize = function () {
        if (!memoDataSvc.allMemoData) {

        }
    };


    var _clearAll = function () {
        memoDataSvc.removeAll();
        document.getElementById(_opts.selector.idName.memoListId).innerHTML = "";

      

    };


    (function () {
        _opts = {
            updateButton: "memoUpdate",
            memoListTemplate: "memoTmplRow",
            uptArea_memoText: "memoTxt",
            update_memoId_datakey: "uptMemo",
            selector: {
                idName: {
                    memoListTemplate: "memoTmplRow",
                    memoListId: "memoTmplTarget"
                },
                className: {
                    deleteButton: "memoDelete"
                },
                modalActive: "active"
            },
            modal:{
                updateView: "updateMemoModal",
                deleteView: "memoModal"
            },
            templ: {
                start: "{",
                end: "}"
            }
        };

        document.getElementsByClassName(_opts.updateButton).onclick = _updateMemo;
        document.getElementsByClassName("no-update").onclick = _noUpdate;
        document.getElementById("clear").onclick = _clearAll;

        initialize();
    })();

    var _noUpdate = function () {
        _closeModal();
    };

    var _closeModal = function (tmplView) {
        document.getElementById(tmplView || _opts.modal.updateView).classList.remove(_opts.selector.modalActive);
    };

    var _openModal = function (tmplView, text) {
        var modalPara = {};

        if (text) {
            document.getElementById(tmplView || _opts.modal.updateView).classList.add(_opts.selector.modalActive);
            document.getElementById("modal-content").value = text;
        }
    };

    var _displayUpdateMemo = function (control) {
        _openModal();
        var memoId = control.dataset.id;
        var memoObj = memoDataSvc.findById(memoId);
        document.getElementById(_opts.uptArea_memoText).value = memoObj.memo;
        dataSvc.addUpdate(_opts.update_memoId_datakey, memoId);
    };

    var _updateMemo = function () {
        _closeModal();
        var id = dataSvc.get(_opts.update_memoId_datakey);
        var memo = document.getElementById(_opts.uptArea_memoText).value;
        memoDataSvc.updateById(id, memo);
        listAllMemo();
    };

    var deleteMemo = function (control) {
        var memoId = control.dataset.id;
        var memoList = memoDataSvc.removeById(memoId);
        updateMemoListTemplate(memoList);
        _openModal(_opts.modal.deleteView);
        setTimeout(function ()
        {
            _closeModal(_opts.modal.deleteView);
        }, 2000);
    };

    var listAllMemo = function () {
        var memoList = memoDataSvc.allMemoData;
        updateMemoListTemplate(memoList);
    };

    var updateMemoListTemplate = function(dataList) {
        if (dataList) {
            document.getElementById(_opts.selector.idName.memoListId).innerHTML = "";
            dataList.forEach(function (row) {
                var template = document.getElementById(_opts.selector.idName.memoListTemplate).innerHTML;
                var replacedTemp = "";

                var idTemp = _opts.templ.start + utility.propertyName(row, row.id) + _opts.templ.end;
                var memoTemp = _opts.templ.start + utility.propertyName(row, row.memo) + _opts.templ.end;
                var dateTemp = _opts.templ.start + utility.propertyName(row, row.date) + _opts.templ.end;

                replacedTemp = template.replace(new RegExp(idTemp, 'g'), row.id)
                    .replace(new RegExp(memoTemp, 'g'), row.memo)
                    .replace(new RegExp(dateTemp, 'g'), row.date);

                document.getElementById(_opts.selector.idName.memoListId).innerHTML +=
                    replacedTemp;

            });
        }
        else {
            document.getElementById(_opts.selector.idName.memoListId).innerHTML = "";
        }
    };

    var changeOption = function (options) {
        return utility.extend(_opts, options);
    };

    var _getOption = function() {
        return _opts;
    };

    return {
        update: _updateMemo,
        displayUpdateArea: _displayUpdateMemo,
        deleteBtn: deleteMemo,
        listAllMemo: listAllMemo,
        changeOpt: changeOption,
        getOpt: _getOption
};
})(MEMO.services.memoDataSvc, MEMO.services.dataStorageSvc, MEMO.common.utilities);
