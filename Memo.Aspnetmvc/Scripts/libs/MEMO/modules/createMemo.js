"use strict";
MEMO.modules.createMemo = (function (dataSvc, utility) {
    var _options;
    (function() {
        _options = {
            maxText: 1000,
            memoText: "textId",
            button: {
                submit:"submit-button",
                clear: "clear-button"
            },
            newMemoKey: 'new_memo',
            listMemoKey: 'list_memo',
            alertArea: "error",
            messageArea: "message",
            info: "info",
            validationRequireErrorMsg: 'Require Input Field!'
        };
    })();
    
    var getMaxId = function(xObject) {
        if (!xObject) {
            return 0;
        }
        var length = xObject.length;
        return length++;
    };

    var createNewMemo = function () {

        var memoVal = document.getElementById(_options.memoText).value;

        //_gaq.push(['_trackEvent', 'Memo', 'clicked submit', 'clicked submit button' + memoVal]);

        document.getElementById(_options.alertArea).style.display = "none";
        if (!memoVal) {
            document.getElementById(_options.alertArea).style.display = "block";
            document.getElementById(_options.alertArea).value = "";
            document.getElementById(_options.alertArea).value = _options.validationRequireErrorMsg;

            return;
        }

        var listItems = JSON.parse(localStorage.getItem(_options.listMemoKey));

        var newList = [];
        var now = new Date();

        var memoObj =
            {
                'id': getMaxId(listItems),
                'memo': memoVal,
                'date': now.toLocaleDateString() + " " + now.toLocaleTimeString()
            };
        newList.push(memoObj);
        var memoJson = JSON.stringify(newList);
        localStorage.setItem(_options.newMemoKey, memoJson);

        var itemArrary = [];
        if (!listItems) {
            itemArrary.push(memoObj);
        } else {
            listItems.push(memoObj);
            itemArrary = listItems;
        }

        localStorage.setItem(_options.listMemoKey, JSON.stringify(itemArrary));

        var successResultMsg = "Your new memo has added as <strong>" + memoObj.memo + "</strong> at " + memoObj.date;

        document.getElementById(_options.messageArea).style.display = "block";
        document.getElementById(_options.messageArea).value = successResultMsg;
        document.getElementById(_options.info).style.display = "block";
        document.getElementById(_options.memoText).value = "";
    };

    var clearMemoField = function () {
        document.getElementById(_options.memoText).value = "";
        document.getElementById(_options.messageArea).style.display = "none";
        document.getElementById(_options.alertArea).style.display = "none";
    };

    var bindEvents = function (){
        document.getElementById(_options.button.submit).onclick = createNewMemo;
        document.getElementById(_options.button.clear).onclick = clearMemoField;
    };

    var _changeOptions = function (options) {
        return utility.extend(_options, options);
    };
    var createMemoModule = {
        init: bindEvents,
        changeOpt: _changeOptions
        // BEGIN TEST INTERFACE
        ,
        getMaxId: getMaxId
        // END TEST INTERFACE
    };
    return createMemoModule;
})(MEMO.services.dataStorageSvc, MEMO.common.utilities);
