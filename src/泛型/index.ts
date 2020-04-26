function identity_1<T>(arg: T): T{
    return arg;
}

function identity_2<T>(arg: T[]): T[]{
    console.log(arg.length)
    return arg;
}

function identity_3<T>(arg: Array<T>): T[] {
    return arg;
}
// 传入所有参数，泛型类型和实参
let outPut = identity_1<string>("this is string type");
// 类型推断 只传入实参
let outPut_1 = identity_1("this is type");

// 泛型函数类型
let myIdentity : <T>(arg: T) => T = identity_1;

// 使用带有调用签名的对象字面量定义泛型函数
let myIdentity_1: {<T>(arg: T[]): T[]} = identity_3;

// 泛型接口
interface GenericIdentityFn {
    <T>(arg: T): T;
    x: number;
}

function identity_4<T>(arg: T): T {
    return arg;
}

let myIdentity_2: GenericIdentityFn = <GenericIdentityFn>identity_4;
myIdentity_2.x = 123;
console.log(myIdentity_2.x)

// 把泛型参数当做整个接口的一个参数
interface GenericIdentityFn_1<T> {
    (arg: T): T;
}

let myIdentity_3: GenericIdentityFn_1<number> = myIdentity_2;


// 泛型类
class GenericNumber<T> {
    private zeroValue: T;
    constructor(a: T){
        this.zeroValue = a;
    }
}

let number_1 = new GenericNumber<number>(1);

let string_1 = new GenericNumber<string>("1");

// 泛型约束
interface LengthWise {
    length: number;
}

function loggingIndentity<T extends LengthWise>(arg: T): number {
    return arg.length;
}

let logging_1 = loggingIndentity({length: 2});


// 在泛型约束中使用类型参数

// function getProperty<T, K>(obj: T, key: K) {
//     return obj[key];
// }

//在泛型中使用类类型

