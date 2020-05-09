namespace Validation {
    export interface StringValidator{
        isAcceptable(s: string): boolean;
    }
    export class ZipCodeValidator implements StringValidator {
        isAcceptable(s: string) {
            return true;
        }
    }
}

let c5 = Validation.ZipCodeValidator;


// 别名(简化命名空间的操作)


// 使用 import q = x.y.z 给常用对象起一个短的名字。
// 不要和用来加载模块的 import x = require("name") 语法弄混了
// 这里的语法是为指定的符号创建一个别名

namespace Shapes {
    export namespace Polygons {
        export class Triangle { }
        export class Square { }
    }
}
import polygons = Shapes.Polygons;
let sq = new polygons.Square(); // Same as "new Shapes.Polygons.Square()"
// 重要的是，对于值来讲， import会生成与原始符号不同的引用，所以改变别名的var值并不会影响原始变量的值。


// 使用其他的js库
// 外部命名空间
// 大部分程序库只提供少数的顶级对象，命名空间是用来表示他们的一个好办法













