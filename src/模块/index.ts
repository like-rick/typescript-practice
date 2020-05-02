// 关于术语的说明
// 内部模块 => 命名空间，外部模块 => 模块

// 模块在其自身的作用域里执行，而不是在全局作用域里。意味着定义一个模块里的变量，函数，类等等在模块外部是不可见的
// 除非明确地使用export形式导出他们
// 模块是自声明的；两个模块之间是通过在文件级别上使用imports和exports建立的
// 模块使用模块加载器去导入其他模块，在运行时，模块加载器的作用是在执行此模块代码前驱查找并执行这个模块的所有依赖

// nodejs => commonjs      web => require.js

// 导出

// 导出声明
// 任何声明（比如：变量，函数，类，类型别名或接口）都能通过添加export关键字导出

export interface StringValidator {
    isAcceptable(s: string): boolean;
}

export const numberReg = /^[0-9]+$/;

export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
        return s.length === 5 && numberReg.test(s);
    }
}


// 导入

// 具有副作用的导入模块
// 尽管不推荐这么做，一个模块会设置一些全局状态供其他模块使用，这些模块可能没有任何的导出或用户根本不关注它的导出
// 使用下面的方法来导入这类模块
import "./ZipCodeValidator"


// 导出

// export = 和 import = require()
// commonjs和AMD的环境中都有一个exports变量，这个变量包含了一个模块所有导出内容
// commonjs 和 AMD的exports都可以被赋值一个对象，这种情况下其作用就类似于es6语法里的默认导出
// 服务端 commonjs exports / module.exports / require
// 前端   es6  import / export / export default


// 可选的模块加载和其他高级加载场景
// 只在某种条件下才加载某个模块，使用下面的方法实现它和其他高级加载场景，可以直接调用模块加载器并且保证类型完全
// 编译器会检测是否每一个模块都会在生成的javascript中用到，如果一个模块标识符只在类型注解部分使用，并且完全没有在
// 表达式中使用时，就不会生成require代码。省略掉没有用到的引用对性能提升是很有益的，并同时提供了选择加载模块的能力











