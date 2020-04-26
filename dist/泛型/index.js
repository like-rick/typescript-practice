function identity_1(arg) {
    return arg;
}
function identity_2(arg) {
    console.log(arg.length);
    return arg;
}
function identity_3(arg) {
    return arg;
}
// 传入所有参数，泛型类型和实参
var outPut = identity_1("this is string type");
// 类型推断 只传入实参
var outPut_1 = identity_1("this is type");
// 泛型函数类型
var myIdentity = identity_1;
// 使用带有调用签名的对象字面量定义泛型函数
var myIdentity_1 = identity_3;
function identity_4(arg) {
    return arg;
}
var myIdentity_2 = identity_4;
myIdentity_2.x = 123;
console.log(myIdentity_2.x);
var myIdentity_3 = myIdentity_2;
// 泛型类
var GenericNumber = /** @class */ (function () {
    function GenericNumber(a) {
        this.zeroValue = a;
    }
    return GenericNumber;
}());
var number_1 = new GenericNumber(1);
var string_1 = new GenericNumber("1");
function loggingIndentity(arg) {
    return arg.length;
}
var logging_1 = loggingIndentity({ length: 2 });
// 在泛型约束中使用类型参数
// function getProperty<T, K>(obj: T, key: K) {
//     return obj[key];
// }
//在泛型中使用类类型
