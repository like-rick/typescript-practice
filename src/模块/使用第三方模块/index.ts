/// <reference path="node.d.ts"/>
import * as URL from "url";
let myUrl = URL.parse("http://www.typescriptlang.org");

// 简写模块导出的类型将是any
import { x, y } from "hot-new-module";
x(y);