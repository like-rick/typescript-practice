// 额外的特性支持标注或修改类及成员
// 能够被声明在 类，方法，访问符，属性或者参数上


// @expression这种形式，expression求值后必须为一个函数，在运行是调用，被装饰的信息作为参数传入


// 装饰器组合，多个装饰器应用在一个声明上， 它们的求值方式与复合函数相似
// @f @g x 
// 求值等同于 f(g(x))
function f1() {
    console.log("f(): evaluated");
    return function (target: any, propertyKey: string, desc: PropertyDescriptor) {
        console.log("f(): called");
    }
}
function g() {
    console.log("g(): evaluated");
    return function (target: any, propertyKey: string, desc: PropertyDescriptor) {
        // target： 被装饰的目标对象 {construct: C1,}
        // propertyKey: 被装饰的方法名字 methed
        // desc: 被装饰方法的属性表示符 
        console.log("g(): called")
    }
}

// 当多个装饰器应用在一个声明上的时，会进行如下步骤的操作
// 1. 由上到下对装饰器表达式求值
// 2. 求值的结果会被当做函数，由下到上依次调用
class C1 {
    @f1()
    @g()
    methed() {console.log("method(): called")}
}
// result
// f(): evaluated
// g(): evaluated
// method(): called
// g(): called
// f(): called

// f(g(methed()))

// 装饰器求值
// 类中不同声明上的装饰器将按照以下规定的顺序应用
// 1. 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每一个实例成员
// 2. 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每一个静态成员
// 3. 参数装饰器应用到构造函数
// 4. 类装饰器应用到类



// 类装饰器
// 紧靠着类声明，应用于构造函数，可以用来监视，修改或替换类定义。不能用在声明文件中(.d.ts)，也不能用在任何外部上下文中
// 会在运行时当做函数被调用，类的构造函数作为其唯一的参数
// 如果类装饰器返回一个值，它会使用提供的构造函数来替换类的声明
// 类装饰器应用到类
function sealed() {
    console.log("现在开始装饰constructor了")
    return function (construct:  Function) {
        Object.seal(construct);
        Object.seal(construct.prototype)
    }
}

@sealed()
class Greeter_1 {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
}
// 下面是一个重载构造函数的例子
function classDecorator<T extends {new(...args: any[]): {}}>(constructor: T) { 
    console.log(constructor)
    return class extends constructor {
        newProperty = "new property";
        hello = "override";
        getHello() {
            return this.hello;
        }
    }
}
@classDecorator
class Greeter_2 {
    public property: string = "property";
    public hello: string = "hello";
    constructor(m:string) {
        this.hello = m;
        console.log(arguments.length)
    }
}

console.log(new Greeter_2("world"))

// 方法装饰器
// 声明在一个方法声明之前，会被应用到方法的属性描述符上，可以用来监视，修改或者替换方法定义。
// 不能用在声明文件(.d.ts)上，重载或者任何外部上下文中
// 方法装饰器表达式会在运营时当做函数被调用，传入下列3个参数：
// 1. 对于静态成员(静态成员变量static，构造函数)来说是类的构造函数，对于实例成员是类的原型对象
// 2. 成员的名字
// 3. 成员的属性描述符

// 如果方法装饰器返回一个值，它会被用做方法的属性描述符
// 方法装饰器应用到类的实例成员上,
// eg.

function enumerable(value: boolean) {
    // target对于实例成员来说，是类的原型对象
    return function <T extends {}>(target: T, propertyKey: string, desc: PropertyDescriptor) {
        desc.enumerable = value;
        return desc; // 如果这里有返回值，会被应用于属性描述符上
    }
}
class Greeter_3{
    greeting: string = "greeting";
    constructor(m: string) {
        this.greeting = m;
    }
    @enumerable(false)
    greet() {
        return "hello," + this.greeting;
    }
}


// 访问器装饰器
// 声明在一个访问器的声明之前，应用于访问器的属性描述符并且可以用来监视，修改或替换一个访问器的定义
// 访问器装饰器不能应用在声明文件中(.d.ts),或者任何外部上下文中

// ts不允许同时装饰一个成员的 get和set访问器，一个成员的所有装饰必须应用在文档顺序的第一个访问器上。
// 访问器装饰器表达式在运行的时候会传入3个值
// 1. 对于静态成员来说是类的构造函数(<T extends Function>)，对于实例成员来说是类的原型对象(<T extends {}>)
// 2. 成员的名字
// 3. 成员的属性描述符

// 如果访问器属性返回一个值，它会被用做方法的属性描述符

function configable(value: boolean) {
    return function <T extends {}>(target: T, propertyKey: string, desc: PropertyDescriptor) {
        desc.configurable = value;
        return desc;
    }
}

class Point{
    private _x: number;
    private _y: number;
    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }
    @configable(false)
    // 不能同时应用于访问器成员的set和get属性访问符
    get x1(): number{
        return this._x;
    }
    @configable(true)
    get y1(): number {
        return this._y;
    }
}

