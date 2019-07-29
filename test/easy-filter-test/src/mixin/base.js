import * as tslib_1 from "tslib";
import { Vue, Component } from 'vue-property-decorator';
var Base = /** @class */ (function (_super) {
    tslib_1.__extends(Base, _super);
    function Base() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Base.prototype.beforeCreate = function () {
        if (window.loadMoreThanOnce) {
            window.location.reload();
        }
    };
    Base.prototype.setLoad = function () {
        window.loadMoreThanOnce = true;
    };
    Base = tslib_1.__decorate([
        Component
    ], Base);
    return Base;
}(Vue));
export default Base;
//# sourceMappingURL=base.js.map