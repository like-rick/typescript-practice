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










