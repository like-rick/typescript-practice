// 使用枚举定义一下带名字的常量
// 数字枚举 字符串枚举
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 1] = "Up";
    Direction[Direction["Down"] = 2] = "Down";
    Direction[Direction["Left"] = 3] = "Left";
    Direction[Direction["Right"] = 4] = "Right";
})(Direction || (Direction = {}));
// 计算的常量枚举成员
var FileAccess;
(function (FileAccess) {
    FileAccess[FileAccess["None"] = 0] = "None";
    FileAccess[FileAccess["Read"] = 2] = "Read";
})(FileAccess || (FileAccess = {}));
// 非计算的常量枚举成员：字面量枚举成员
// 字面量枚举成员：1. 不带有初始值的常量枚举 2. 任何被初始化为字符串常量，数字常量的枚举元素
// 当所有枚举成员都拥有字面量枚举值的时候，枚举成员是一种自定义类型
var ShapeKind;
(function (ShapeKind) {
    ShapeKind[ShapeKind["Circle"] = 0] = "Circle";
    ShapeKind[ShapeKind["Square"] = 1] = "Square";
})(ShapeKind || (ShapeKind = {}));
var c1 = {
    kind: 1,
    // q: "1",
    radius: 1,
};
// 枚举类型变成了每一个枚举成员的联合，是一个联合类型
var Union;
(function (Union) {
    Union[Union["Cat"] = 0] = "Cat";
    Union[Union["Dog"] = 1] = "Dog";
})(Union || (Union = {}));
function f(x) {
    // error 
    // 先检查x是否不是Union.Cat。如果通过了这个检查，然后||就会发生短路效果
    // if 语句体的内容就会被执行，然而这个检查没有通过就只能是 Union.Cat.
    // 因此没有理由再去检查它是否是Union.Dog
    // if (x !== Union.Cat || x !==Union.Dog) {
    // }
}
// 反向映射
var Enum;
(function (Enum) {
    Enum["A"] = "a";
})(Enum || (Enum = {}));
// let a1 = Enum["a"];
var a2 = Enum.A;
var a4 = 1 /* A */;
