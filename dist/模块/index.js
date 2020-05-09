"use strict";
// 关于术语的说明
// 内部模块 => 命名空间，外部模块 => 模块
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberReg = /^[0-9]+$/;
var ZipCodeValidator = /** @class */ (function () {
    function ZipCodeValidator() {
    }
    ZipCodeValidator.prototype.isAcceptable = function (s) {
        return s.length === 5 && exports.numberReg.test(s);
    };
    return ZipCodeValidator;
}());
exports.ZipCodeValidator = ZipCodeValidator;
// 导入
// 具有副作用的导入模块
// 尽管不推荐这么做，一个模块会设置一些全局状态供其他模块使用，这些模块可能没有任何的导出或用户根本不关注它的导出
// 使用下面的方法来导入这类模块
require("./ZipCodeValidator");
var condition = true;
if (condition) {
    var ZipCodeValidator_1 = require("./ZipCodeValidator");
    var validator = new ZipCodeValidator_1();
}
