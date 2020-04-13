// 类的接口
interface ClockInterface{
    curTime: Date;
    setTime(d: Date): void
}

class Clock implements ClockInterface {
    curTime: Date
    setTime(d: Date): void{
        this.curTime = d;
    }
    constructor() {

    }
}

// 静态属性和实例属性的区别
// 当一个类实现了一个接口的时候，只会对其实例部分检查