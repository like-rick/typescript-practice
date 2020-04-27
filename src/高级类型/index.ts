// 交叉类型
// 将多种类型mixins在一起，交叉类型同时具有所需所有类型的特性
namespace intersection{
    function extend<T, U>(first: T, second: U): T & U {
        let result = <T & U>{};
        for (let id in first) {
            result[id] = (<T & U>first)[id];
        }
        for (let id in second) {
            // if (!second.hasOwnProperty(id)) {
            //     // 
            //     result[id] = (<T & U>second)[id];
            // }
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


// null, undefined 类型

namespace NullType {

    let sn: string | null = 'bar';
    // 可选参数和可选属性
    // 使用strictNullChecks，可选参数会自动加上 | undefined
    // 类型保护和类型断言
    // 可以为null的类型是通过联合类型实现的，需要使用类型保护来去除null类型

    // 使用类型断言去除null，undefined，语法是添加!后缀

    function broken(name: string | null) : string{
        function postFix(epithet: string) {
            // return name.charAt(0) + ". the" + epithet; // error, name is possibly 'null'
            return name?.charAt(0) + ". the"
        }
        name = name || "Bob";
        return postFix("great");
    }
}

// 类型别名
namespace AliasType {
    // 起别名不会创建一个新的类型，只是创建了一个新的名字引用那个类型
    type Name = string;
    type NameResolver = () => string;
    type NameOrResolbe = Name | NameResolver;
    function getName(n: NameOrResolbe): Name {
        if (typeof n === 'string') {
            return n;
        } else {
            return n();
        }
    }

    // 类型别名也可以是泛型, 我们可以添加类型参数，并且在别名声明的右侧传入

    type Container<T> = { value: T };

    //使用类型别名在属性里引用自己
    type Tree<T> = {
        value: T;
        left: Tree<T>;
        right: Tree<T>;
    }

    // 与交叉类型一起使用，创建一些稀奇古怪的类型
    type LinkList<T> = T & {next: LinkList<T>};
    
    interface Person {
        name: string;
    }

    let people: LinkList<Person> = {
        name: "1",
        next: {
            name: "2",
            next: <LinkList<Person>>{}
        }
    };

    let s = people.name;
    let s1 = people.next.next.next.next.next.next.next.next.name;

    // 类型别名和接口的区别

    // 1.接口创建了一个新的名字，可以在任何地方使用。类型别名不创建名字
    // 2.类型别名不能被extends和implements，自己也不能extends和implements其他类。
    // 因为在软件中的对象应该对于扩展是开放的，对于修改是封闭的
    // 3.如果你无法通过接口来描述一个类型并且需要使用联合类型或者元组类型，这是通常使用类型别名

}




