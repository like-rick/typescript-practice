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
// 导出
// export = 和 import = require()
// commonjs和AMD的环境中都有一个exports变量，这个变量包含了一个模块所有导出内容
// commonjs 和 AMD的exports都可以被赋值一个对象，这种情况下其作用就类似于es6语法里的默认导出
// 服务端 commonjs exports / module.exports / require
// 前端   es6  import / export / export default
// 
