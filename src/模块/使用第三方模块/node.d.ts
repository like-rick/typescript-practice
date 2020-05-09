// 我们可以使用export声明来为每一个模块都定义一个  .d.ts文件，但是最好还是写在一个大的 .d.ts文件里。

declare module "url" {
    export interface Url{
        protocol?: string;
        hostname?: string;
        pathname?: string;
    }
    export function parse(urlStr: string, parseQueryString?: any, slashesDenoteHost?: any): Url;
}

declare module "path" {
    export function normalize(p: string): string;
    export function join(...paths: any[]): string;
    export let sep: string;
}

// 外部模块简写
declare module "hot-new-module"


// 模块声明通配符
// 某些模块加载器如AMD支持导入非javascript的内容，它们通常会使用一个前缀或后缀来表示特殊的加载语法
// 使用模块通配符
declare module "*!text" {
    const content: string;
    export default content;
}
declare module "json!*" {
    const value: string;
    export default value;
}
// 导入
// import fileContent from "./xyz.txt!text";
// import data from "json!http://example.com/data.json";
// console.log(data, fileContent);

// 具有副作用的导入
// 一些模块会设置一些全局变量供其他模块使用，这些模块可能没有任何导出或用户根本就不关注它的导出
// import "./my-module.js"


// 创建模块结构指导
// 尽可能在顶层导出
// 用户应该更容易的使用你模块导出的内容，嵌套层次过多会变得难以处理
// 从你的模块中导出一个命名空间就是一个增加嵌套的例子，虽然命名空间有时候有他们的用处，但是在使用模块的时候
// 他们额外的增加了一层，这对用户来说不是很方便，而是多余的。
// 对用户来说最理想的是，他们可以随意命名导入模块的类型，并且不需要多余的(.) 来找到相关对象









