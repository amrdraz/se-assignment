

describe("getElementByIndexElseRandom", function() {
    var arayy = [26 , 6, 19, 95];
    it("random elem", function() {
            var res= qjs.getElementByIndexElseRandom(arayy);
            expect(arayy).to.include(res);
    });
    it("return element at 0", function() {
        var res= qjs.getElementByIndexElseRandom(arr,0)
         res.should.equal(1);
    });
    it("last one", function() {
       var res= qjs.getElementByIndexElseRandom(arr,arr.length-1)
       res.should.equal(5);
    });
});
