// ts使用基于结构类型的类型兼容性，结构类型是一种只使用成员来描述类型的方式，它正好与名义类型形成对比
// 在基于名义类型的类型系统中，数据类型的兼容性或等价性是通过明确的声明或类型的名称来决定的
namespace typeAdopt {
    interface Named{
        name: string,
    }
    class Person {
        name: string;
    }
    let p: Named;
    // ok, because of structural typing
    p = new Person();
}

// 关于可靠性的注意事项，允许某些在编译阶段无法确认其安全性的操作
// ts结构类型系统基本规则，对于基本类型或者对象类型，若x要兼容y，y至少具有与x相同的属性
namespace typeAdopt_1 {
    interface Named {
        name: string;
    }
    let x: Named;
    let y = { name: "alice", location: "china" };
    x = y; // 
}

// 比较两个函数
// 允许忽略参数，因为在js的函数调用中忽略额外的参数是非常常见的
// 和基本类型和对象类型相反
namespace typeAdopt_2 {
    // 参数列表
    let x = (a: Number) => 0;
    let y = (b: Number, s: string) => 0;
    // x = y; // error
    y = x;

    // 返回值
    let m = () => ({name: "lisi"});
    let n = () => ({name: "zhangsan", location: "ay"});
    m = n; // ok
    // n = m; // error
}

// 函数参数类型双向协定
// 当比较函数参数类型的时候，只有源函数参数能够赋值给目标参数，或者反过来时，才能成功。
// 这是不稳定的，因为调用者可能传入了更精确类型信息的函数，而调用这个传入的函数的时候却使用了不是那个精确的类型信息
// 例如 function a(s: Snake){} function b(s: Animal)
// 也就是目标函数的参数可能是源函数参数的子类或者子集
// 在定义函数的时候是用宏观的定义，在调用函数的时候使用更细力度的调用
namespace typeAdopt_3{
    enum EventType { Mouse, KeyBoard };
    interface Event {
        timestamp: number;
    }
    interface MouseEvent extends Event {
        x: number;
        y: number;
    }

    interface KeyEvent extends Event {
        keyCode: number;
    }

    function listenEvent(eventType: EventType, handler: (n: Event) => void) {
        //调用的时候使用了EventType
    }

    // 传入了更精确的的Mouse事件和mouseEvent // allow
    listenEvent(EventType.Mouse, (e: MouseEvent) => console.log(e.x + ',' + e.y));
    listenEvent(EventType.Mouse, (e: Event) => console.log((<MouseEvent>e).x) + ',' + (<MouseEvent>e).y)

    // disallow
    // listenEvent(EventType.Mouse, (e: number) => console.log(e))

    // 可选参数和剩余参数
    function invokeLater(args: any[], callback: (...args: any[]) => void){

    }

    invokeLater([1,2], (x,y) => console.log(x,y))

    invokeLater([1,2], (x?,y?) => console.log(x,y))

}

// 函数重载
// 对于有重载的函数，源函数的每一个重载都要在目标函数上找到对应的函数签名，这确保了目标函数可以再所有的源函数可以调用的地方调用
namespace typeAdopt_4 {
     // 枚举 
     enum Status { Ready, Waiting };
     enum Color {Red, Blue, Green};

     let status = Status.Ready;
    //  status = Color.Blue; // 不同枚举类型之间是不兼容的

    // 类
    // 类有实例部分和静态部分，比较两个类的时候只会比较实例部分
    // 私有成员和受保护成员影响类的兼容性，当目标类型包含一个私有成员，源类型也应该有一个和目标类型来自同一个类的私有成员



    // 泛型
    // ts是结构类型系统，类型参数只影响使用其作为类型一部分的结果类型
    interface Empty<T> {}

    let x: Empty<number>;
    let y: Empty<string>;

    x = y; // ok, 类型参数只影响使用其作为类型一部分的结果类型

    interface NoEmpty<T> {
        name: T;
    }

    let m: NoEmpty<number>;
    let n: NoEmpty<string>;

    // m = n ; //error 类型参数只影响使用其作为类型一部分的结果类型


    let identity = function<T>(x: T): T {
        return x;
    }
    let reverse = function<U>(x: U): U {
        return x;
    }
    // 对于没有指明泛型类型的泛型参数的时候，会把所有泛型参数当成any
    identity = reverse; // ok

    // ts中有两种兼容性：子类型和赋值
}


