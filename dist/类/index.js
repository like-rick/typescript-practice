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
// 一个类的例子
var Greeter = /** @class */ (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "hello " + this.greeting;
    };
    return Greeter;
}());
var greet = new Greeter("world");
// 继承
var Animal = /** @class */ (function () {
    function Animal(n) {
        this.name = n;
    }
    Animal.prototype.move = function (distance) {
        if (distance === void 0) { distance = 0; }
        console.log(this.name + " move " + distance + "m");
    };
    return Animal;
}());
var Snake = /** @class */ (function (_super) {
    __extends(Snake, _super);
    function Snake(name) {
        return _super.call(this, name) || this;
    }
    Snake.prototype.move = function (distance) {
        if (distance === void 0) { distance = 5; }
        console.log(this.name + " move " + distance + "m");
    };
    return Snake;
}(Animal));
var Horse = /** @class */ (function (_super) {
    __extends(Horse, _super);
    function Horse(name) {
        return _super.call(this, name) || this;
    }
    Horse.prototype.move = function (distance) {
        if (distance === void 0) { distance = 10; }
        console.log(this.name + " move " + distance + "m");
    };
    return Horse;
}(Animal));
var s = new Snake("snake");
var h = new Horse("horse");
s.move();
h.move(10);
// 类的类型判断
// private protected public
// ts使用结构性的类型系统，在判断两个类的类型的时候，并不在乎它们是从哪里来的，只要他们包含的成员属性相同，就认为它们相同
// 但是当类中含有private和protected的时候，只有到private和protected的来源相同的时候，才判断它们两个类型是兼容的
// private 不能在派生类和实例化的实例中访问
var classTypeDecide;
(function (classTypeDecide) {
    var Animal = /** @class */ (function () {
        function Animal(n) {
            this.name = n;
        }
        return Animal;
    }());
    var Snake = /** @class */ (function (_super) {
        __extends(Snake, _super);
        function Snake(n) {
            return _super.call(this, n) || this;
            // console.log(this.name)
        }
        return Snake;
    }(Animal));
    // error
    // class Horse extends Animal {
    //     private name: string;
    //     constructor(n: string){
    //         super(n);
    //         this.name = n;
    //     }
    // }
})(classTypeDecide || (classTypeDecide = {}));
// protected 在派生类中也可以被访问
var protectedProperty;
(function (protectedProperty) {
    var Person = /** @class */ (function () {
        function Person(n) {
            this.name = n;
        }
        return Person;
    }());
    var Employee = /** @class */ (function (_super) {
        __extends(Employee, _super);
        function Employee(n, department) {
            var _this = _super.call(this, n) || this;
            _this.department = department;
            return _this;
        }
        Employee.prototype.getName = function () {
            return "hello, i " + this.name + ", and i work in " + this.department;
        };
        return Employee;
    }(Person));
    var e = new Employee("xiaoming", "123");
})(protectedProperty || (protectedProperty = {}));
var constructProtected;
(function (constructProtected) {
    var Person = /** @class */ (function () {
        // 只能被子类继承，不能被实例化
        function Person(n) {
            this.name = n;
        }
        return Person;
    }());
    var Employee = /** @class */ (function (_super) {
        __extends(Employee, _super);
        function Employee(n) {
            return _super.call(this, n) || this;
        }
        return Employee;
    }(Person));
    // let p = new Person("123"); 
})(constructProtected || (constructProtected = {}));
// 存取器
// 可以拦截属性的读写操作
var getAndSet;
(function (getAndSet) {
    var password = "secret";
    var Employee = /** @class */ (function () {
        function Employee() {
        }
        Object.defineProperty(Employee.prototype, "fullName", {
            get: function () {
                return this._fullName;
            },
            set: function (newName) {
                if (password && password == "secret") {
                    this._fullName = newName;
                }
                else {
                    console.log("error");
                }
            },
            enumerable: true,
            configurable: true
        });
        return Employee;
    }());
    var employee = new Employee();
    employee.fullName = '123';
})(getAndSet || (getAndSet = {}));
// 类的静态属性
var staticProperty;
(function (staticProperty) {
    var Grid = /** @class */ (function () {
        function Grid() {
        }
        Grid.prototype.calculateDisanceFromOrigin = function (point) {
            var xDist = point.x - Grid.origin.x;
            var yDist = point.y - Grid.origin.y;
            return xDist + yDist;
        };
        Grid.origin = { x: 1, y: 0 };
        return Grid;
    }());
    var grid1 = new Grid();
})(staticProperty || (staticProperty = {}));
// 抽象类
// 抽象类作为其他派生类的基类使用，一般不会被直接初始化，抽象类可以包含方法的实现细节
// abstract 可以定义抽象类中的抽象方法，和接口方法类似，两者都可以定义方法签名但是不能包含方法实现
var abstractClass;
(function (abstractClass) {
    var Department = /** @class */ (function () {
        function Department(name) {
            this.name = name;
        }
        Department.prototype.printName = function () {
            return this.name;
        };
        return Department;
    }());
    var Person = /** @class */ (function (_super) {
        __extends(Person, _super);
        function Person(name) {
            var _this = _super.call(this, name) || this;
            _this.name = name;
            return _this;
        }
        Person.prototype.getName = function (name) { };
        return Person;
    }(Department));
    // let d = new Department(); 不能对抽象类实例化
})(abstractClass || (abstractClass = {}));
//保存类的类型
var keepClass;
(function (keepClass) {
    var Point = /** @class */ (function () {
        function Point() {
        }
        return Point;
    }());
    // typeof 的意思是去 Point的类型
    var aliasPoint = Point;
    var p = new aliasPoint();
})(keepClass || (keepClass = {}));
// 把类当做接口
// 类的定义会创建两个东西：实例属性和一个构造函数
var A;
(function (A) {
    var Point = /** @class */ (function () {
        function Point() {
        }
        return Point;
    }());
    var point3d = { x: 1, y: 2, z: 3 };
})(A || (A = {}));
