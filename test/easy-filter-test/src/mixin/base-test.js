import * as tslib_1 from "tslib";
import Base from './base';
import { Component } from 'vue-property-decorator';
var Test = /** @class */ (function (_super) {
    tslib_1.__extends(Test, _super);
    function Test() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.functionName = '';
        _this.testCases = [];
        return _this;
    }
    Test.prototype.checkout = function (item) {
        window.it(item.description, function () {
            var text = document.querySelector("." + item.className).textContent.trim();
            if (text !== item.result) {
                throw new Error('错误结果为' + text);
            }
        });
    };
    Test.prototype.mounted = function () {
        var _this = this;
        window.describe("\u6D4B\u8BD5 " + this.functionName, function () {
            _this.testCases.forEach(function (item) {
                if (item.doNotCheck) {
                    return;
                }
                _this.checkout(item);
            });
        });
        window.mocha.run();
        this.setLoad();
    };
    Test = tslib_1.__decorate([
        Component
    ], Test);
    return Test;
}(Base));
export default Test;
//# sourceMappingURL=base-test.js.map