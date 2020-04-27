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
// 枚举成员是一种自定义类型
var ShapeKind;
(function (ShapeKind) {
    ShapeKind[ShapeKind["Circle"] = 0] = "Circle";
    ShapeKind[ShapeKind["Square"] = 1] = "Square";
})(ShapeKind || (ShapeKind = {}));
var c1 = {
    kind: 1,
    radius: 1,
};
// 反向映射
var Enum;
(function (Enum) {
    Enum["A"] = "a";
})(Enum || (Enum = {}));
// let a1 = Enum["a"];
var a2 = Enum.A;
var a4 = 1 /* A */;
