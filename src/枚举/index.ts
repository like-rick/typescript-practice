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
// 当所有枚举成员都拥有字面量枚举值的时候，枚举成员是一种自定义类型

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
    // q: "1",
    radius: 1,
}


// 枚举类型变成了每一个枚举成员的联合，是一个联合类型

enum Union {
    Cat,
    Dog,
}

function f(x: Union) {
    // error 
    // 先检查x是否不是Union.Cat。如果通过了这个检查，然后||就会发生短路效果
    // if 语句体的内容就会被执行，然而这个检查没有通过就只能是 Union.Cat.
    // 因此没有理由再去检查它是否是Union.Dog
    // if (x !== Union.Cat || x !==Union.Dog) {

    // }
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