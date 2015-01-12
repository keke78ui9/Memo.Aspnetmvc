describe("Test createMemoSpec.js", function () {

    beforeEach(function () {

    });

    it("getMaxId empty value should be return zero index", function () {
        var empty = [];
        expect(MEMO.modules.createMemo.getMaxId(empty)).toBe(0);
    });

    it("getMaxId value list should be add one, start from zero index.", function () {
        var list = ["a", "b", "c"];        
        expect(MEMO.modules.createMemo.getMaxId(list)).toBe(3);
    });
});
