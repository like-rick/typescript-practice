//当一个对象实现了Symbol.iterable的时候，我们认为它是可迭代的
// for...of会遍历迭代的对象，调用对象上的Symbol.iterable方法


// for...in 迭代是对对象的键的迭代，可以操作任何对象，提供了一种查看对象属性的方法
// for...of  迭代是对对象键对应的值的迭代



// 生成目标是es5或es3的时候，迭代器只允许在Array类型上使用。即使其他类型实现了Symbol.iterable，使用也会报错



