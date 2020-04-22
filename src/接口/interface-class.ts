// 类类型
// 实现接口
interface ClockInterface{
    currentTime: Date;
    setTime(d: Date): void;
}

class Clock implements ClockInterface {
    currentTime: Date;
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(){}
}

// 静态部分与实例部分
// 类实现接口的时候只对实例类型检查，constructor属于静态类型，不在检查范围内，因此会报错
// 所以我们应该直接操作类的静态类型
interface ClockConstructor{
    // new (hour: number, minute: number): void;
}

class Clock1 implements ClockConstructor{
    constructor(hour: number, minute: number){}
}

// 
namespace implementsConstructor{

    // 正常的接口类型
    interface ClockInterface {
        kick(): void;
        // (): void;
    }

    // 接口函数类型
    interface ClockConstructor {
        new (h: number, m: number): ClockInterface;
    }

    function createClock(clock: ClockConstructor, h: number, m: number): ClockInterface {
        return new clock(h,m)
    }

    class DigitalClock implements ClockInterface {
        kick() {
            console.log("this is DigitalClock class");
        }
        constructor(h: number, m: number){}
    }

    class AnalogClock implements ClockInterface {
        kick() {
            console.log("this is AnalogClock class");
        }
        constructor(h: number, m: number){}
    }

    let digital = createClock(DigitalClock, 1, 2);
    let analog = createClock(AnalogClock, 1, 2);

}

// 接口继承
namespace SingleImplement{
    interface Shape {
        color: string;
    }
    interface Square extends Shape {
        size: number;
    }

    // let S: Square;
    //or
    let S = <Square>{};
    S.color = "2";
    S.size = 1;
}

namespace mutipleImplement {
    interface Shape {
        color: string;
    }
    interface Pen {
        length: number;
    }
    interface Square extends Shape, Pen {
        size: number;
    }

    let S = <Square>{};
    S.length = 1;
}

// 接口的混合类型
// 举例: 一个接口既可以同时作为函数类型，也可以带有其他属性
namespace MixType {
    interface Counter {
        (start: number): string;
        interval: number,
        set(): number;
    }
    function getCounter(): Counter {
        let c = <Counter>function (start) { return "1"};
        c.interval = 1;
        c.set = function () {return 1}
        return c;
    }
    let c = getCounter();
    c(10);
    c.set();
    console.log(c.interval)
}

// 接口继承类
// 接口会继承类中的所有成员，但是不包括实现，这就意味着接口类型只能被这个类或者这个类的子类实现
namespace interfaceExendsClass {
    class Control {
        private state: number;
    }
    interface SelectableControl extends Control {
        select(): void;
    }
    class Button extends Control implements SelectableControl {
        select(): void {}
    }
    // 
    // class TextBox implements SelectableControl {
    //     select(): void{};
    //     state: number;
    // }
}

