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
// 交叉类型
// 将多种类型mixins在一起，交叉类型同时具有所需所有类型的特性
var intersection;
(function (intersection) {
    function extend(first, second) {
        var result = {};
        for (var id in first) {
            result[id] = first[id];
        }
        for (var id in second) {
            // if (!second.hasOwnProperty(id)) {
            //     // 
            //     result[id] = (<T & U>second)[id];
            // }
        }
        return result;
    }
    var Person = /** @class */ (function () {
        function Person(name) {
            this.name = name;
        }
        return Person;
    }());
    var Loggable = /** @class */ (function () {
        function Loggable() {
        }
        return Loggable;
    }());
    var ConsoleLogger = /** @class */ (function (_super) {
        __extends(ConsoleLogger, _super);
        function ConsoleLogger() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ConsoleLogger.prototype.log = function () {
        };
        return ConsoleLogger;
    }(Loggable));
    var jim = extend(new Person("lisi"), new ConsoleLogger());
    var n1 = jim.name;
    jim.log();
})(intersection || (intersection = {}));
// 联合类型
// 备选项类型中的一个类型
var UnionType;
(function (UnionType) {
    // typeof 类型保护
    // 利用联合类型写padLeft
    function isNumber(x) {
        return typeof x === 'number';
    }
    function isString(x) {
        return typeof x === 'string';
    }
    function padLeft(value, padding) {
        if (isNumber(padding)) {
            return Array(padding + 1).join(" ") + value;
        }
        if (isString(padding)) {
            return padding + value;
        }
    }
    // typeof v  === 'typeName'
    // typeName 必须是基础类型 number, string, boolean, symbol
    function padLeft_1(value, padding) {
        if (typeof padding === 'number') {
            return Array(padding + 1).join(" ") + value;
        }
        if (typeof padding === 'string') {
            return padding + value;
        }
    }
    var SpaceRepeatingPadder = /** @class */ (function () {
        function SpaceRepeatingPadder(numSpace) {
            this.numSpace = numSpace;
        }
        ;
        SpaceRepeatingPadder.prototype.getPaddingString = function () {
            return Array(this.numSpace).join(" ");
        };
        return SpaceRepeatingPadder;
    }());
    var StringPadder = /** @class */ (function () {
        function StringPadder(value) {
            this.value = value;
        }
        StringPadder.prototype.getPaddingString = function () {
            return this.value;
        };
        return StringPadder;
    }());
    function getRandomPadder() {
        return Math.random() < 0.5 ?
            new SpaceRepeatingPadder(4) :
            new StringPadder("  ");
    }
    var padder_1 = getRandomPadder();
    if (padder_1 instanceof SpaceRepeatingPadder) {
        padder_1; // 类型细化为'SpaceRepeatingPadder'
    }
    if (padder_1 instanceof StringPadder) {
        padder_1; // 类型细化为'StringPadder'
    }
    function getSmallPet() {
        var rs = {};
        return rs;
    }
    var pet = getSmallPet();
    pet.layEggs(); // ok
    // pet.fly(); // error, we can only get the properties of both types all have;
    // 类型保护与类型区分
    // 类型断言
    if (pet.swim) {
        pet.swim();
    }
    else {
        pet.fly();
    }
    // 上面的类型保护，需要多次使用类型断言
    // 用户自定义的类型保护 ??? 没太明白
    // 类型谓词 parameterName is type 
    function isFish(pet) {
        return pet.swim !== undefined;
    }
    if (isFish(pet)) {
        pet.swim();
    }
    else {
        pet.fly();
    }
})(UnionType || (UnionType = {}));
// null, undefined 类型
var NullType;
(function (NullType) {
    var sn = 'bar';
    // 可选参数和可选属性
    // 使用strictNullChecks，可选参数会自动加上 | undefined
    // 类型保护和类型断言
    // 可以为null的类型是通过联合类型实现的，需要使用类型保护来去除null类型
    // 使用类型断言去除null，undefined，语法是添加!后缀
    function broken(name) {
        function postFix(epithet) {
            // return name.charAt(0) + ". the" + epithet; // error, name is possibly 'null'
            return (name === null || name === void 0 ? void 0 : name.charAt(0)) + ". the";
        }
        name = name || "Bob";
        return postFix("great");
    }
})(NullType || (NullType = {}));
// 类型别名
var AlisType;
(function (AlisType) {
    function getName(n) {
        if (typeof n === 'string') {
            return n;
        }
        else {
            return n();
        }
    }
})(AlisType || (AlisType = {}));
