// ReturnType<T>
// 获取T类型(函数)对应的返回值类型
namespace UtilsReturnType{
    // 举例
    function foo(x: string | number): string | number { return 1 }
    type FooType = ReturnType<typeof foo>;  // string | number

    //ReturnType的实现
    type ReturnType1<T extends Function> = T extends () => infer R ? R  : any;
}