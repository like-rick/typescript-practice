// 额外的特性支持标注或修改类及成员
// 能够被声明在 类，方法，访问符，属性或者参数上
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// @expression这种形式，expression求值后必须为一个函数，在运行是调用，被装饰的信息作为参数传入
// 装饰器组合，多个装饰器应用在一个声明上， 它们的求值方式与复合函数相似
// @f @g x 
// 求值等同于 f(g(x))
function f1() {
    console.log("f(): evaluated");
    return function (target, propertyKey, desc) {
        console.log("f(): called");
    };
}
function g() {
    console.log("g(): evaluated");
    return function (target, propertyKey, desc) {
        // target： 被装饰的目标对象 {construct: C1,}
        // propertyKey: 被装饰的方法名字 methed
        // desc: 被装饰方法的属性表示符 
        console.log("g(): called");
    };
}
// 当多个装饰器应用在一个声明上的时，会进行如下步骤的操作
// 1. 由上到下对装饰器表达式求值
// 2. 求值的结果会被当做函数，由下到上依次调用
var C1 = /** @class */ (function () {
    function C1() {
    }
    C1.prototype.methed = function () { console.log("method(): called"); };
    __decorate([
        f1(),
        g()
    ], C1.prototype, "methed", null);
    return C1;
}());
// result
// f(): evaluated
// g(): evaluated
// method(): called
// g(): called
// f(): called
// f(g(methed()))
// 装饰器求值
// 类中不同声明上的装饰器将按照以下规定的顺序应用
// 1. 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每一个实例成员
// 2. 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每一个静态成员
// 3. 参数装饰器应用到构造函数
// 4. 类装饰器应用到类
// 类装饰器
// 紧靠着类声明，应用于构造函数，可以用来监视，修改或替换类定义。不能用在声明文件中(.d.ts)，也不能用在任何外部上下文中
// 会在运行时当做函数被调用，类的构造函数作为其唯一的参数
// 如果累装饰器返回一个值，它会使用提供的构造函数来替换类的声明
function sealed() {
    console.log("现在开始装饰constructor了");
    return function (construct) {
        Object.seal(construct);
        Object.seal(construct.prototype);
    };
}
var Greeter_1 = /** @class */ (function () {
    function Greeter_1(message) {
        this.greeting = message;
    }
    Greeter_1 = __decorate([
        sealed()
    ], Greeter_1);
    return Greeter_1;
}());
// 下面是一个重载构造函数的例子
function classDecorator(constructor) {
    console.log(constructor);
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.newProperty = "new property";
            _this.hello = "override";
            return _this;
        }
        class_1.prototype.getHello = function () {
            return this.hello;
        };
        return class_1;
    }(constructor));
}
var Greeter_2 = /** @class */ (function () {
    function Greeter_2(m) {
        this.property = "property";
        this.hello = "hello";
        this.hello = m;
        console.log(arguments.length);
    }
    Greeter_2 = __decorate([
        classDecorator
    ], Greeter_2);
    return Greeter_2;
}());
console.log(new Greeter_2("world"));
