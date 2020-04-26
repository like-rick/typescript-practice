// 交叉类型
// 将多种类型mixins在一起，交叉类型同时具有所需所有类型的特性
namespace intersection{
    function extend<T, U>(first: T, second: U): T & U {
        let result = <T & U>{};
        for (let id in first) {
            result[id] = (<T & U>first)[id];
        }
        for (let id in second) {
            if (!second.hasOwnProperty(id)) {
                result[id] = (<T & U>second)[id];
            }
        }
        return result;
    }
    class Person {
        constructor(public name: string){}
    }
    abstract class Loggable {
        abstract log(): void;
    }
    class ConsoleLogger extends Loggable {
        log(): void {
            
        }
    }
    let jim = extend(new Person("lisi"), new ConsoleLogger());
    let n1 = jim.name;
    jim.log();
}

// 联合类型
// 备选项类型中的一个类型
namespace UnionType {
    // typeof 类型保护
    // 利用联合类型写padLeft
    function isNumber(x: any): x is number {
        return typeof x === 'number';
    }
    function isString(x: any): x is string {
        return typeof x === 'string'
    }
    function padLeft(value: string, padding: number | string) {
        if (isNumber(padding)) {
            return Array(padding + 1).join(" ") + value;
        }
        if (isString(padding)) {
            return padding + value;
        }
    }
    // typeof v  === 'typeName'
    // typeName 必须是基础类型 number, string, boolean, symbol
    function padLeft_1(value: string, padding: number | string) {
        if (typeof padding === 'number') {
            return Array(padding + 1).join(" ") + value;
        }
        if (typeof padding === 'string') {
            return padding + value;
        }
    }

    // instanceof 类型保护
    // 通过构造函数来细化类型

    interface Padder {
        getPaddingString(): string;
    }
    class SpaceRepeatingPadder implements Padder {
        constructor(private numSpace: number){};
        getPaddingString() {
            return Array(this.numSpace).join(" ");
        }
    }
    class StringPadder implements Padder {
        constructor(private value: string) { }
        getPaddingString() {
            return this.value;
        }
    }
    function getRandomPadder() {
        return Math.random() < 0.5 ?
            new SpaceRepeatingPadder(4) :
            new StringPadder("  ");
    }
    let padder_1 : Padder = getRandomPadder();
    if (padder_1 instanceof SpaceRepeatingPadder) {
        padder_1; // 类型细化为'SpaceRepeatingPadder'
    }
    if (padder_1 instanceof StringPadder) {
        padder_1; // 类型细化为'StringPadder'
    }


    // 如果一个值是联合类型，我们只能访问这个联合类型中共有的属性
    interface Bird{
        fly(): void;
        layEggs(): void;
    }
    interface Fish {
        swim(): void;
        layEggs(): void;
    }
    function getSmallPet(): Fish | Bird {
        let rs: Bird = <Bird> {};
        return rs;
    }
    let pet = getSmallPet();
    pet.layEggs(); // ok
    // pet.fly(); // error, we can only get the properties of both types all have;

    // 类型保护与类型区分
    // 类型断言
    if ((<Fish>pet).swim) {
        (<Fish>pet).swim();
    } else {
        (<Bird>pet).fly();
    }
    // 上面的类型保护，需要多次使用类型断言

    // 用户自定义的类型保护 ??? 没太明白
    // 类型谓词 parameterName is type 
    function isFish(pet: Bird | Fish): pet is Fish {
        return (<Fish>pet).swim !== undefined;
    }
    if (isFish(pet)) {
        pet.swim();
    } else {
        pet.fly();
    }

}




