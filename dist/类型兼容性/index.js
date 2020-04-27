// ts使用基于结构类型的类型兼容性，结构类型是一种只使用成员来描述类型的方式，它正好与名义类型形成对比
// 在基于名义类型的类型系统中，数据类型的兼容性或等价性是通过明确的声明或类型的名称来决定的
var typeAdopt;
(function (typeAdopt) {
    var Person = /** @class */ (function () {
        function Person() {
        }
        return Person;
    }());
    var p;
    // ok, because of structural typing
    p = new Person();
})(typeAdopt || (typeAdopt = {}));
// 关于可靠性的注意事项，允许某些在编译阶段无法确认其安全性的操作
// ts结构类型系统基本规则，对于基本类型或者对象类型，若x要兼容y，y至少具有与x相同的属性
var typeAdopt_1;
(function (typeAdopt_1) {
    var x;
    var y = { name: "alice", location: "china" };
    x = y; // 
})(typeAdopt_1 || (typeAdopt_1 = {}));
// 比较两个函数
// 允许忽略参数，因为在js的函数调用中忽略额外的参数是非常常见的
// 和基本类型和对象类型相反
var typeAdopt_2;
(function (typeAdopt_2) {
    // 参数列表
    var x = function (a) { return 0; };
    var y = function (b, s) { return 0; };
    // x = y; // error
    y = x;
    // 返回值
    var m = function () { return ({ name: "lisi" }); };
    var n = function () { return ({ name: "zhangsan", location: "ay" }); };
    m = n; // ok
    // n = m; // error
})(typeAdopt_2 || (typeAdopt_2 = {}));
// 函数参数类型双向协定
// 当比较函数参数类型的时候，只有源函数参数能够赋值给目标参数，或者反过来时，才能成功。
// 这是不稳定的，因为调用者可能传入了更精确类型信息的函数，而调用这个传入的函数的时候却使用了不是那个精确的类型信息
// 例如 function a(s: Snake){} function b(s: Animal)
// 也就是目标函数的参数可能是源函数参数的子类或者子集
// 在定义函数的时候是用宏观的定义，在调用函数的时候使用更细力度的调用
var typeAdopt_3;
(function (typeAdopt_3) {
    var EventType;
    (function (EventType) {
        EventType[EventType["Mouse"] = 0] = "Mouse";
        EventType[EventType["KeyBoard"] = 1] = "KeyBoard";
    })(EventType || (EventType = {}));
    ;
    function listenEvent(eventType, handler) {
        //调用的时候使用了EventType
    }
    // 传入了更精确的的Mouse事件和mouseEvent // allow
    listenEvent(EventType.Mouse, function (e) { return console.log(e.x + ',' + e.y); });
    listenEvent(EventType.Mouse, function (e) { return console.log(e.x) + ',' + e.y; });
    // disallow
    // listenEvent(EventType.Mouse, (e: number) => console.log(e))
    // 可选参数和剩余参数
    function invokeLater(args, callback) {
    }
    invokeLater([1, 2], function (x, y) { return console.log(x, y); });
    invokeLater([1, 2], function (x, y) { return console.log(x, y); });
})(typeAdopt_3 || (typeAdopt_3 = {}));
// 函数重载
// 对于有重载的函数，源函数的每一个重载都要在目标函数上找到对应的函数签名，这确保了目标函数可以再所有的源函数可以调用的地方调用
var typeAdopt_4;
(function (typeAdopt_4) {
    // 枚举 
    var Status;
    (function (Status) {
        Status[Status["Ready"] = 0] = "Ready";
        Status[Status["Waiting"] = 1] = "Waiting";
    })(Status || (Status = {}));
    ;
    var Color;
    (function (Color) {
        Color[Color["Red"] = 0] = "Red";
        Color[Color["Blue"] = 1] = "Blue";
        Color[Color["Green"] = 2] = "Green";
    })(Color || (Color = {}));
    ;
    var status = Status.Ready;
    var x;
    var y = {};
    x = y; // ok, 类型参数只影响使用其作为类型一部分的结果类型
    var m;
    var n;
    // m = n ; //error 类型参数只影响使用其作为类型一部分的结果类型
    var identity = function (x) {
        return x;
    };
    var reverse = function (x) {
        return x;
    };
    // 对于没有指明泛型类型的泛型参数的时候，会把所有泛型参数当成any
    identity = reverse; // ok
    // ts中有两种兼容性：子类型和赋值
})(typeAdopt_4 || (typeAdopt_4 = {}));
