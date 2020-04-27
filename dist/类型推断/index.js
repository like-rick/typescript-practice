// 类型推断发成在初始化成员变量和成员， 设置默认参数值和决定函数返回值的时候
// 最佳通用类型
//类型推断会从候选类型中找出最匹配的通用类型
var x = [1, 2, null];
//此时的候选类型是 number, null，最终的通用类型取自于候选类型
// 当无法推断通用类型的时候
// let zoo = [new Rhino(), new Elephant(), new Snake()];
// 需要明确指出类型
// let zoo: Animal[] = [new Rhino(), new Elephant(), new Snake()];
// 如果没有明确指出，类型推断为 (Rhino | Elephant | Snake)[] 联合类型
//上下文类型
// 类型推断的相反方向，会发生在表达式类型与所处的位置相关的时候
// window.onmousedown = function (mouseEvent) {
//     // 从window.onmousedown函数的类型推断mouseEvent的类型
//     console.log(mouseEvent.button)
// }
// 上下文类型推断的使用情况：
// 函数的参数，赋值表达式的右边，类型断言，对象成员和数组字面量和返回语句
// 上下文类型也会做最佳类型判断，如：
// function createZoo(): Animal[] {
//     return [new Rhino(), new Snake()];
// }
