/// <reference path="Validation.ts" />
var Validation;
(function (Validation) {
    var numberRegexp = /^[0-9]+$/;
    var ZipCodeValidator_1 = /** @class */ (function () {
        function ZipCodeValidator_1() {
        }
        ZipCodeValidator_1.prototype.isAcceptable = function (s) {
            return s.length === 5 && numberRegexp.test(s);
        };
        return ZipCodeValidator_1;
    }());
    Validation.ZipCodeValidator_1 = ZipCodeValidator_1;
})(Validation || (Validation = {}));
