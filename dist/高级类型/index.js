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
    // 使用类型谓词，相当于返回的是一个boolean值
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
var AliasType;
(function (AliasType) {
    function getName(n) {
        if (typeof n === 'string') {
            return n;
        }
        else {
            return n();
        }
    }
    var people = {
        name: "1",
        next: {
            name: "2",
            next: {}
        }
    };
    var s = people.name;
    var s1 = people.next.next.next.next.next.next.next.next.name;
    var UIElement = /** @class */ (function () {
        function UIElement() {
        }
        UIElement.prototype.animate = function (dx, dy, ease) {
            if (ease === "ease-in") {
            }
            else if (ease === "ease-in-out") {
            }
            else if (ease === "ease-out") {
            }
            else {
            }
        };
        return UIElement;
    }());
    var button = new UIElement();
    // button.animate(1,2,"213"); // error ,  
    button.animate(1, 2, "ease-out");
    // more overloads
    function createElement(tagName) {
        return document.createElement(tagName);
    }
    // 完整性检查，当Shape添加新类型的时候，area函数需要做完整性检查
    function area_1(s) {
        switch (s.kind) {
            case "square": return s.size * s.size;
            case "rectangle": return s.height * s.width;
            case "circle": return Math.PI * Math.pow(s.radius, 2);
        }
    }
    // 使用never类型，在编译阶段进行完整性检查
    function assertNever(x) {
        throw new Error("Unexpected object: " + x);
    }
    function area_2(s) {
        switch (s.kind) {
            case "square": return s.size * s.size;
            case "rectangle": return s.height * s.width;
            case "circle": return Math.PI * Math.pow(s.radius, 2);
            // 这里assertNever检查s是否是never类型，即为所有可能情况后剩下的类型
            // 如果你忘记了某个case，这里就会报错，这会更加明显的提示你，去添加未添加的case
            case "triangle": return s.size;
            default: return assertNever(s);
        }
    }
    // 多态的this类型
    // 多态的this类型表示的是某个包含类或接口的子类型，能很容易的表现连贯性
    // 计算器例子，每个操作之后都返回this类型
    var BasicCalculator = /** @class */ (function () {
        function BasicCalculator(value) {
            if (value === void 0) { value = 0; }
            this.value = value;
        }
        BasicCalculator.prototype.add = function (operand) {
            this.value += operand;
            return this;
        };
        BasicCalculator.prototype.multiply = function (operand) {
            this.value *= operand;
            return this;
        };
        BasicCalculator.prototype.currentValue = function () {
            return this.value;
        };
        return BasicCalculator;
    }());
    var calc = new BasicCalculator(2).add(3).multiply(2).currentValue();
    console.log(calc);
})(AliasType || (AliasType = {}));
