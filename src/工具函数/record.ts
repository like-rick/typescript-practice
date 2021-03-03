// Record<K, T>
// 将K中的所有属性值转化为T类型，我们常用它来申请一个普通的object对象
// 申请记录一个对象，其中键是K类型(string, number, symbol)，值是T类型
namespace UtilsRecord{
    type Animal = {
        age: number,
    }
    let a : Record<number, string> = {1: 'b'}

    // Record的实现
    type Record1<K extends keyof any, T> = {
        [key in K] : T
    }
    // keyof any对应的类型为 number | string | symbol，也就是可以做对象键的类型集合
}
