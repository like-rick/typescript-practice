// 模块解析
// 相对导入和非相对导入


// nodejs如何解析模块
// 相对路径导入，假设有一个文件路径为 /root/src/moduleA.js 包含了一个导入 var x = require("./moduleB");
// nodejs以下面的顺序解析这个导入
// 1. 检查 /root/src/moduleB.js 文件是否存在
// 2. 检查 /root/src/moduleB目录是否包含一个package.json文件，且package.json文件指定了一个 "main"模块，
// 如果发现有main模块，就会引用main模块的内容
// 3. 检查 /root/src/moduleB目录是否包含一个index.js文件，这个文件会被隐式地当做那个文件夹下面的 "main"模块

// 非相对路径导入 var x = require("moduleB")
// 会在node_modules中向上依次查找这个模块


// ts如何解析模块
// 模仿node运行时的模块解析，在逻辑解析的基础上增加了.ts .tsx .d.ts，同时package.json中使用types来表示main的功能



// 附加的模块解析标记
// baseUrl 影响 非相对导入的路径
// 路径映射 paths是相对于baseUrl进行解析的
// rootDirs 指定待编译的虚拟目录，可以是一个list，每当编译器在某一rootDirs的子目录下发现了相对模块导入，它就尝试从每一个rootDirs导入
// traceResolution 跟踪模块的解析过程

// 为什么在exclude列表里的模块还会被编译器使用?




