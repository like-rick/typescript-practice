import * as React  from "react";
// ts具有三种jsx模式，perserve，react，react-native。这些模式只在代码生成阶段起作用，类型就检查不受影响
// 在perserve模式下生成的代码中会保留jsx供以后的转换操作使用，例如Babel,另外输出文件会带有jsx扩展名
// react模式会生成 React.createElement,使用前不需要进行转换操作
// react-native相当于perserve，它也保留了所有jsx，但输出文件的扩展名是.js

// 类型检查
// 为了理解jsx的类型检查，你必须首先理解固有元素与基于值的元素之间的区别。
// 固有元素，系统环境自带的标签，比如div, span ,
// 基于值的元素，也就是自定义组件
// 1. 对于react，固有元素会生成字符串   React.createElement("div"),然而由你自定义的组件却不会生成
// 2. 传入jsx元素里的属性类型的查找方式不同。固有属性本身就支持，然而自定义组件会自己去指定它们具有那个属性


// 固有元素
// 固有元素使用特殊的接口 JSX.IntrinsicElements 来查找，默认地，如果这个接口没有指定，会全部通过，不会固有元素进行类型检查
// 然而如果这个接口存在，那么固有元素的名字要在JSX.IntrinsicELements接口属性里查找
// global在模块内部扩展全局变量
declare global {
    namespace JSX {
        interface IntrinsicElements {
            foo: {bar?: boolean}
        }
        // interface ElementClass {
        //     render: any;
        // }
    }
}
<div />

// 基于值的元素
// 会简单的在它所在的作用域里按标识符查找

// 无状态组件
// 组件被定为js函数，它的第一个参数是props对象。ts会强制它的返回值可以赋值给JSX.Element
interface FooProp {
    name: string;
    x: number;
    y: number;
}
declare function AnotherComponent(prop: {name: string}): JSX.Element;

function ComponentFoo (prop: FooProp) {
    return <AnotherComponent name={prop.name}/>
}

const Button = (props: {value: string}, context: {color: string}) => <button></button>

function getButton(props: FooProp) {
    return <Button value={props.name}/>
}

// 重载
interface ClickableProps {
    children: JSX.Element[] | JSX.Element;
}

interface HomeProps extends ClickableProps {
    home: JSX.Element;
}

interface SideProps extends ClickableProps {
    side: JSX.Element | string;
}
function MainButton(prop: HomeProps): JSX.Element;
function MainButton(prop: SideProps): JSX.Element;
function MainButton(prop: any): JSX.Element {
    if (prop.side) {
        return <button />
    } else if (prop.home) {
        return <a />
    }
    return <></>;
}

// 类组件
// 定义类组件的类型，先弄懂两个术语： 元素类的类型和元素实例的类型
// 现在有<Expr />,元素类的类型为Expr的类型
// 一旦建立起了类类型，实例类型有类构造器或调用签名的返回值联合构成

class MyComponent{
    render() {}
}
// 使用构造签名
let myComponent = new MyComponent();
// 元素类的类型 => MyComponent
// 元素实例的类型 => { redner: () => void }

function MyFactoryFunction() {
    return {
    render: () => {
    }
    }
}
// 使用调用签名
var myComponent_1 = MyFactoryFunction();
// 元素类的类型 => MyFactoryFunction
// 元素实例的类型 => { render: () => void }

//元素的实例类型很有趣，因为它必须赋值给JSX.ElementClass或抛出一个错误。 
//默认的JSX.ElementClass为{}，但是它可以被扩展用来限制JSX的类型以符合相应的接口。



class MyComponent_2 {
    render() {}
}
function MyFactoryFunction_2() {
    return { render: () => {} }
}

{/* <MyComponent_2 />; // 正确 */}
{/* <MyFactoryFunction_2 />; // 正确 */}

class NotAValidComponent {}
function NotAValidFactoryFunction() {
    return {};
}

{/* <NotAValidComponent />; // 错误 */}
{/* <NotAValidFactoryFunction />; // 错误 */}
<foo />