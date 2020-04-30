// 一个类的例子
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet(): string{
        return `hello ${this.greeting}`;
    }
}
let greet = new Greeter("world");


// 继承
class Animal {
    name: string;
    constructor(n: string) {
        this.name = n;
    }
    move(distance = 0): void{
        console.log(`${this.name} move ${distance}m`)
    }
}
class Snake extends Animal {

    constructor(name: string) {
        super(name);
    }

    move(distance = 5): void {
        console.log(`${this.name} move ${distance}m`)
    }
}
class Horse extends Animal {
    constructor(name: string) {
        super(name);
    }
    move(distance = 10): void {
        console.log(`${this.name} move ${distance}m`)
    }
}

let s = new Snake("snake");
let h: Animal = new Horse("horse");
s.move();
h.move(10);


// 类的类型判断
// private protected public
// ts使用结构性的类型系统，基于结构类型系统，在判断两个类的类型的时候，并不在乎它们是从哪里来的，只要他们包含的成员属性相同，就认为它们相同
// 但是当类中含有private和protected的时候，只有到private和protected的来源相同的时候，才判断它们两个类型是兼容的
// private 不能在派生类和实例化的实例中访问
namespace classTypeDecide{
    class Animal {
        private name: string;
        constructor(n: string) {
            this.name = n;
        }
    }
    class Snake extends Animal {
        constructor(n: string) {
            super(n);
            // console.log(this.name)
        }
    }
    // error
    // class Horse extends Animal {
    //     private name: string;
    //     constructor(n: string){
    //         super(n);
    //         this.name = n;
    //     }
    // }
}
// protected 在派生类中也可以被访问
namespace protectedProperty {
    class Person {
        protected name: string;
        constructor(n: string){
            this.name = n;
        }
    }
    class Employee extends Person {
        private department: string;
        constructor(n: string, department: string){
            super(n);
            this.department = department;
        }
        public getName(): string {
            return `hello, i ${this.name}, and i work in ${this.department}`;
        }
    }
    let e = new Employee("xiaoming", "123")
}

namespace constructProtected{
    class Person {
        protected name: string;
        // 只能被子类继承，不能被实例化
        protected constructor(n: string) {
            this.name = n;
        }
    }
    class Employee extends Person {
        protected name: string;
        constructor(n: string) {
            super(n);
        }
    }

    // let p = new Person("123"); 
}

// 存取器
// 可以拦截属性的读写操作
namespace getAndSet{
    let password = "secret"
    class Employee {
        private _fullName: string;
        get fullName(): string{
            return this._fullName
        }
        set fullName(newName: string) {
            if (password && password == "secret") {
                this._fullName = newName;
            } else {
                console.log("error")
            }
        }
    }
    let employee = new Employee();
    employee.fullName = '123'
}

// 类的静态属性
namespace staticProperty{

    interface design {
        x: number;
        y: number;
    }

    class Grid{
        static origin= <design>{x: 1, y: 0};
        calculateDisanceFromOrigin(point: design): number {
            let xDist = point.x - Grid.origin.x;
            let yDist = point.y - Grid.origin.y;
            return xDist + yDist;
        } 
    }
    let grid1 = new Grid();
}


// 抽象类
// 抽象类作为其他派生类的基类使用，一般不会被直接初始化，抽象类可以包含方法的实现细节
// abstract 可以定义抽象类中的抽象方法，和接口方法类似，两者都可以定义方法签名但是不能包含方法实现
namespace abstractClass {
    abstract class Department {
        public name: string;
        constructor(name: string) {this.name = name}
        printName(): string{
            return this.name;
        }
        abstract getName(name: string): void; // 必须被派生类实现
    }
    class Person extends Department {
        constructor(public name: string){
            super(name)
        }
        getName(name: string): void {}
    }

    // let d = new Department(); 不能对抽象类实例化
}

//保存类的类型
namespace keepClass {
    class Point {

    }
    // typeof 的意思是取 Point的类型
    let aliasPoint: typeof Point = Point;
    let p = new aliasPoint();
}

// 把类当做接口
// 类的定义会创建两个东西：实例属性和一个构造函数
namespace A {
    class Point {
        x: number;
        y: number;
    }
    interface Point3d extends Point {
        z: number;
    }
    let point3d: Point3d = {x: 1, y: 2, z: 3};
}


