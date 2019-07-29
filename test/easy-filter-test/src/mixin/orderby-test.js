import * as tslib_1 from "tslib";
import Base from './base';
import { Component } from 'vue-property-decorator';
var OrderByTest = /** @class */ (function (_super) {
    tslib_1.__extends(OrderByTest, _super);
    function OrderByTest() {
        var _this = _super.call(this) || this;
        _this.elementClass = '';
        _this.reverse = false;
        _this.sortAttr = 'name';
        var paramsString = window.location.href.split('?')[1];
        if (paramsString && paramsString.length) {
            var params_1 = {};
            paramsString.split('&').forEach(function (item) {
                var paramsItem = item.split('=');
                params_1[paramsItem[0]] = paramsItem[1];
            });
            _this.reverse = params_1.reverse === 'true';
            _this.sortAttr = ((_this.reverse ? '' : '-') + params_1.sortAttr) || 'name';
        }
        return _this;
    }
    OrderByTest.prototype.test = function () {
        return;
    };
    OrderByTest.prototype.changeAttr = function (val) {
        this.reverse = !this.reverse;
        this.sortAttr = (this.reverse ? '' : '-') + val;
        var params = {
            reverse: this.reverse,
            sortAttr: val
        };
        var query = '?';
        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                query += key + '=' + params[key] + '&';
            }
        }
        query = query.substring(0, query.length - 1);
        window.location.href = window.location.href.split('?')[0] + '?' + query;
        window.location.reload();
    };
    OrderByTest.prototype.mounted = function () {
        if (window.loadMoreThanOnce) {
            return;
        }
        this.test();
        window.mocha.run();
        this.setLoad();
    };
    OrderByTest = tslib_1.__decorate([
        Component
    ], OrderByTest);
    return OrderByTest;
}(Base));
export default OrderByTest;
//# sourceMappingURL=orderby-test.js.map