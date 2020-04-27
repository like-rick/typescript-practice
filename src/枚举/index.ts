// 使用枚举定义一下带名字的常量
// 数字枚举 字符串枚举
enum Direction {
    Up = 1,
    Down,
    Left,
    Right,
}

// 计算的常量枚举成员
enum FileAccess {
    None,
    Read = 1 << 1, // compute constant 
}

// 非计算的常量枚举成员：字面量枚举成员
// 字面量枚举成员：1. 不带有初始值的常量枚举 2. 任何被初始化为字符串常量，数字常量的枚举元素
// 枚举成员是一种自定义类型

enum ShapeKind {
    Circle,
    Square,
}

interface Circle {
    kind: ShapeKind.Circle;
    radius: number;
}

interface Square {
    kind: ShapeKind.Square;
    sideLength: number;
}

let c1: Circle = {
    kind: 1,
    radius: 1,
}

// 反向映射

enum Enum {
    A = "a",
}

// let a1 = Enum["a"];
let a2 = Enum.A;

//const 枚举


const enum Enum1 {
    A = 1,
    B = A * 2
}
let a4 = Enum1.A;