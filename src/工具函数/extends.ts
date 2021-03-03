// extends的作用
namespace UtilsExtends{
    // 1. 泛型约束
    // 基本形式：泛型名 extends 类型
    // 举例1
    function sum<T extends number>(value: T[]): number{
        let count = 0;
        value.forEach(v => count += v);
        return count;
    }
    // 举例2: 也可以用在多个泛型参数的情况
    function pick<T, U extends keyof T>(){}
    // 这里限制了U一定是T的key类型中的子集


    // 2.泛型条件
    // 基本形式：T extends U ? X : Y
    // 这里便不限制T一定要是U的子类型，如果是U的子类型，则将T定义为X类型，否则定义为Y类型，最后返回T
    // 生成的结果是分配式的
    // 举个例子，如果我们把 X 换成 T，如此形式：T extends U? T: never。
    // 此时返回的 T，是满足原来的 T 中包含 U 的部分，可以理解为 T 和 U 的交集。
    // 举个例子，如果我们把 Y 换成 T，如此形式：T extends U? never: T
    // 返回的 T 是原来的 T 中和 U 无交集的属性，而任何属性联合 never 都是自身
    
}
