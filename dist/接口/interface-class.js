var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Clock = /** @class */ (function () {
    function Clock() {
    }
    Clock.prototype.setTime = function (d) {
        this.currentTime = d;
    };
    return Clock;
}());
var Clock1 = /** @class */ (function () {
    function Clock1(hour, minute) {
    }
    return Clock1;
}());
// 
var implementsConstructor;
(function (implementsConstructor) {
    function createClock(clock, h, m) {
        return new clock(h, m);
    }
    var DigitalClock = /** @class */ (function () {
        function DigitalClock(h, m) {
        }
        DigitalClock.prototype.kick = function () {
            console.log("this is DigitalClock class");
        };
        return DigitalClock;
    }());
    var AnalogClock = /** @class */ (function () {
        function AnalogClock(h, m) {
        }
        AnalogClock.prototype.kick = function () {
            console.log("this is AnalogClock class");
        };
        return AnalogClock;
    }());
    var digital = createClock(DigitalClock, 1, 2);
    var analog = createClock(AnalogClock, 1, 2);
})(implementsConstructor || (implementsConstructor = {}));
// 接口继承
var SingleImplement;
(function (SingleImplement) {
    // let S: Square;
    //or
    var S = {};
    S.color = "2";
    S.size = 1;
})(SingleImplement || (SingleImplement = {}));
var mutipleImplement;
(function (mutipleImplement) {
    var S = {};
    S.length = 1;
})(mutipleImplement || (mutipleImplement = {}));
// 接口的混合类型
// 举例: 一个接口既可以同时作为函数类型，也可以带有其他属性
var MixType;
(function (MixType) {
    function getCounter() {
        var c = function (start) { return "1"; };
        c.interval = 1;
        c.set = function () { return 1; };
        return c;
    }
    var c = getCounter();
    c(10);
    c.set();
    console.log(c.interval);
})(MixType || (MixType = {}));
// 接口继承类
// 接口会继承类中的所有成员，但是不包括实现，这就意味着接口类型只能被这个类或者这个类的子类实现
var interfaceExendsClass;
(function (interfaceExendsClass) {
    var Control = /** @class */ (function () {
        function Control() {
        }
        return Control;
    }());
    var Button = /** @class */ (function (_super) {
        __extends(Button, _super);
        function Button() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Button.prototype.select = function () { };
        return Button;
    }(Control));
    // 
    // class TextBox implements SelectableControl {
    //     select(): void{};
    //     state: number;
    // }
})(interfaceExendsClass || (interfaceExendsClass = {}));
