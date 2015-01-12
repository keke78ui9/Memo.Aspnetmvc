describe("Test memoDataSvc.js", function () {

    beforeEach(function () {
        
    });

    it("memoDataSvc.js's DataSvc must be valid object", function () {
        
        expect(MEMO.services.memoDataSvc.getDataSvc()).toBeTruthy();
    });

    it("findById method will return valid data by id", function () {
        var data = [{ "id": 0, "memo": "test", "date": "2014-11-12T07:16:34.282Z" }, { "id": 1, "memo": "atest", "date": "2014-11-12T07:18:08.693Z" }, { "id": 2, "memo": "test", "date": "2014-11-18T07:35:28.500Z" }];
        var dataService =
        {
            get: data
        };
        MEMO.services.memoDataSvc.setDataSvc(dataService);
        expect(MEMO.services.memoDataSvc.getDataSvc()).toBeTruthy();
        expect(MEMO.services.memoDataSvc.findById(0)).toBe({ "id": 0, "memo": "test", "date": "2014-11-12T07:16:34.282Z" });
    });
});
