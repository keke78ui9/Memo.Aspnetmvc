"use strict";
MEMO.services.memoDataSvc = (function (dataSvc) {

    var _options;

    (function() {
        _options = {
            dataKey_listMemo: 'list_memo',
            dataKey_newMemo: ''
        };
    })();

    /*
    // contructor
    var memoDataSvc = function () {

    };

    memoDataSvc.prototype = (function () {
        var _svc = {
            constructor: memoDataSvc
        };

        return _svc;
    }());
    */

    // move this to other place
    var extend = function (a, b) {
        for (var key in b) {
            if (b.hasOwnProperty(key)) {
                a[key] = b[key];
            };
        }
    };

    var _changeOption = function(options) {
        return extend(_options, options);
    };

    var _listMemoData = dataSvc.get(_options.dataKey_listMemo);

    var _removeById = function(memoId) {
        if (!_listMemoData) {
            return;
        }

        var newListMemo = [];
        _listMemoData.forEach(function(row) {
            if (row.id != memoId) {
                newListMemo.push(row);
            }
        });
        dataSvc.save(_options.dataKey_listMemo, newListMemo);
        _listMemoData = newListMemo;
        return newListMemo;
    };

    var _removeAll = function () {
        dataSvc.remove(_options.dataKey_listMemo);
    };

    var _newMemoData = dataSvc.get(_options.dataKey_newMemo);

    var _findById = function(id) {
        if (!_listMemoData) {
            return;
        }

        var _row;
        _listMemoData.forEach(function(row) {
            if (row.id == id) {
                _row = row;
            }
        });
        return _row;
    };

    var _updateById = function(id, memoText) {
        if (!_listMemoData) {
            return;
        }

        _listMemoData.forEach(function(row) {
            if (row.id == id) {
                row.memo = memoText;
            }
        });

        dataSvc.save(_options.dataKey_listMemo, _listMemoData);
    };

    var memoDataService = {
        changeOpt: _changeOption,
        allMemoData: _listMemoData,
        newMemoData: _newMemoData,
        removeById: _removeById,
        removeAll: _removeAll,
        /*
         * Get momo record by unique key id
         * @param {id} momo key id
         */
        findById: _findById,
        /*
        * update record by unique key id & memo text
        * @param {id} momo key id
        * @param {momoText} momo text, will be update
        */
        updateById: _updateById
        // BEGIN TEST INTERFACE
        ,
        setDataSvc: function(testDataSvc) {
            dataSvc = testDataSvc;
            _newMemoData = dataSvc.get;
        },
        getDataSvc: function() {
            return dataSvc;
        }
        // END TEST INTERFACE
    };

    return memoDataService;
})(MEMO.services.dataStorageSvc);