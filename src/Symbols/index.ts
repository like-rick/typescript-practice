// Symbol是 es6中添加的内容，所以tsconfig.json配置中，target必须为es6

// Symbol 原生类型，不可改变且唯一
// 可以被用做对象属性的键
// const sym = Symbol();
// // let sym = Symbol(); 不可改变且唯一
// let obj = {
//     [sym]: "value"
// }
// console.log(obj[sym]);

// // 与计算出的属性名称相结合来声明对象的属性和类成员
// const getClassNameSymbol = Symbol();
// class C{
//     [getClassNameSymbol]() {
//         return "C";
//     }
// }
// let c12 = new C()[getClassNameSymbol]();

// 其他的Symbol  API

// Symbol.hasInstance
// a methed determine if a constructor object recongnize a objct as a constructor`s instance
// console.log(C[Symbol.hasInstance](c12) ); // 和instanceof 类似的作用

// Symbol.isConcatSpreadable
// let arr1 = [1,2,3], arr2 = [4,5,6];
// arr2[Symbol.isConcatSpreadable] = false;

// Symbol.iterator
// 被 for-of语句调用，返回对象默认迭代器
// 自定义迭代器
// let myIterable = {}
// myIterable[Symbol.iterator] = function * {
//     yield 1;
//     yield 2;
//     yield 3;
// }







