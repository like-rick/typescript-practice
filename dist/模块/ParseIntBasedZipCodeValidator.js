"use strict";
// 扩展其他模块，并且只导出那个模块的部分内容
// 重新导出功能并不会在当前模块导入那个模块或定义一个新的局部变量
Object.defineProperty(exports, "__esModule", { value: true });
var ParseIntBasedZipCodeValidator = /** @class */ (function () {
    function ParseIntBasedZipCodeValidator() {
    }
    ParseIntBasedZipCodeValidator.prototype.isAcceptable = function (s) {
        return s.length === 5 && parseInt(s).toString() === s;
    };
    return ParseIntBasedZipCodeValidator;
}());
exports.ParseIntBasedZipCodeValidator = ParseIntBasedZipCodeValidator;
// 导出原先的验证器但做了重命名
var ZipCodeValidator_1 = require("./ZipCodeValidator");
exports.RegExpBasedZipCodeValidator = ZipCodeValidator_1.ZipCodeValidator;
