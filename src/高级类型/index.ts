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
    // 使用类型谓词，相当于返回的是一个boolean值
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

    // 字符串字面量类型
    // 允许你指定字符串必须是固定值，与联合类型，类型保护和类型别名可以很好地配合，可以实现类似枚举类型的字符串
    type Easing = "ease-in" | "ease-out" | "ease-in-out";
    class UIElement {
        animate(dx: number, dy: number, ease: Easing): void {
            if (ease === "ease-in") {

            } else if (ease === "ease-in-out") {
                
            } else if (ease === "ease-out") {

            } else {

            }
        }
    }
    let button = new UIElement();
    // button.animate(1,2,"213"); // error ,  
    button.animate(1,2,"ease-out");

    // 字符串字面量用于区分重载
    function createElement(tagName: "img"): HTMLImageElement;
    function createElement(tagName: "a"): HTMLAnchorElement;
    // more overloads
    function createElement(tagName: string): Element {
       return document.createElement(tagName)
    }

    // 数字字面量类型
    // ....


    // 枚举成员类型
    // 当每个枚举成员都是字面量初始化的时候，枚举成员是具有类型的, 所有枚举成员组成的联合类型
    
    // 合并单例类型(可辨识)，联合类型(联合)，类型保护和类型别名创建一个 可辨识联合的高级模式，也叫做标签联合或代数数据类型
    
    interface Square{
        kind: "square";
        size: number;
    }
    interface Rectangle{
        kind: "rectangle";
        height: number;
        width: number;
    }
    interface Circle{
        kind: "circle";
        radius: number;
    }
    interface Triangle{
        kind: "triangle";
        size: number;
    }
    type Shape = Square | Rectangle | Circle | Triangle; // 联合

    // 完整性检查，当Shape添加新类型的时候，area函数需要做完整性检查
    function area_1(s: Shape): number | undefined{
        switch(s.kind) {
            case "square": return s.size * s.size;
            case "rectangle": return s.height * s.width;
            case "circle": return Math.PI * s.radius ** 2;
        }
    }

    // 使用never类型，在编译阶段进行完整性检查
    function assertNever(x: never): never {
        throw new Error("Unexpected object: " + x);
    }
    function area_2(s: Shape) {
        switch(s.kind) {
            case "square": return s.size * s.size;
            case "rectangle": return s.height * s.width;
            case "circle": return Math.PI * s.radius ** 2;
            // 这里assertNever检查s是否是never类型，即为所有可能情况后剩下的类型
            // 如果你忘记了某个case，这里就会报错，这会更加明显的提示你，去添加未添加的case
            case "triangle": return s.size;
            default: return assertNever(s);
        }
    }

    // 多态的this类型
    // 多态的this类型表示的是某个包含类或接口的子类型，能很容易的表现连贯性

    // 计算器例子，每个操作之后都返回this类型
    class BasicCalculator {
        public constructor (protected value: number = 0) {}
        public add(operand: number): this {
            this.value += operand;
            return this;
        }
        public multiply(operand: number): this {
            this.value *= operand;
            return this;
        }
        public currentValue(): number {
            return this.value;
        }
    }

    let calc = new BasicCalculator(2).add(3).multiply(2).currentValue();

    // 由于这个类使用了this类型，所以继承它的时候，可以直接使用之前的方法
    
    class ScientificCalculator extends BasicCalculator {
        constructor(value = 0) {
            super(value);
        }
        public sin(): this{
            this.value = Math.sin(this.value);
            return this;
        }
    }
    let sv = new ScientificCalculator(2).multiply(5).sin().currentValue();
}

// 索引类型
// 使用索引类型，编译器就能够检查使用了动态属性名的代码
namespace IndexType {
    // 从javascript的对象中选取一个属性的子集
    `js
        function pluck(o, names) {
            return names.map(n => o[n]);
        }
    `
    function pluck<T, K extends keyof T> (o: T, names: K[]): T[K][] {
        return names.map(n => o[n])
    }
    interface Person {
        name: string;
        age: number;
    }
    let p: Person = {
        name: "jarid",
        age: 35,
    }
    let s: Array<string> = pluck(p, ['name']);
    let s1: string[] = pluck(p, ["name"])
    // keyof 索引类型查询操作符
    // keyof T 的结果为T上的已知公共属性名的联合
    // 索引类型查询
    let personProps: keyof Person;  // 'name' | 'age'
    // T[K] 索引访问操作符，类型语法反应了表达式语法
    // 索引类型访问
    function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
        return o[name];
    }
    // 索引类型和字符串索引签名交互
    interface Map<T> {
        [key: string]: T;
    }
    // 如果你有一个带有字符串索引签名的类型，那么keyof T会是string。并且T[string]为索引签名的类型
    let keys: keyof Map<number>;  //string
    let value: Map<number>['foo']; //number
}

// 映射类型
// 从旧类型中创建新类型的一种方式 映射类型
// 在映射类型里，新类型以相同的形式去转换旧类型里的每一个属性
namespace ReflectType {
    interface Person {
        name: string;
        age: number;
    }
    // interface PersonPartial {
    //     name?: string;
    //     age?: number;
    // }
    interface PersonReadonly {
        readonly name: string;
        readonly age: number;
    }
    type Readonly<T> = {
        readonly [P in keyof T]: T[P];
    }
    type Partial<T> = {
        [P in keyof T]? :T[P];
    }

    type PersonPartial = Partial<Person>;
    type ReadonlyPerson = Readonly<Person>;

    type Keys = 'option1' | 'option2'
    type Flags = {[K in Keys]: boolean};
    // type FLags = {
    //     option1: boolean;
    //     option2: boolean;
    // }

    type NullablePerson = {[P in keyof Person]: Person[P] | null}
    type Partial_1 = {[P in keyof Person]: Person[P]}

    type Nullable<T> = {[P in keyof T]: T[P] | null}
    type Partial_2<T> = {[P in keyof T]: T[P]}

}




