// 声明合并
// 声明合并是指编译器将针对同一个名字的连个独立声明合并为单一声明。
// 合并后的声明同时拥有原先两个声明的特性。任何数量的声明都可被合并。不局限于两个声明




// 基础概念
// ts中的声明会创建一下三种实体之一：命名空间，类型或值。

// 合并接口
// 合并的机制是把双方的成员放到一个同名的接口里
// 接口的非函数的成员应该是唯一的。如果他们不是唯一的，那么他们必须是相同的类型
// 对于函数成员，每个同名函数的声明都会被当做这个函数的一个重载
// 同时注意，当接口A与后来的接口A合并，后面的接口具有更高的优先级



// 合并命名空间
// 对于命名空间的合并，模块导出同名接口进行合并，构成单一命名空间内含合并后的接口
// 对于命名空间值的合并，如果当前存在给定名字的命名空间，那么后来的命名空间的导出成员会被加到已经存在的那个模块里
// 非导出成员仅在其原有的命名空间内可见，其他命名空间合并进来的成员无法访问非导出成员


// 命名空间与类和函数和枚举类型合并
// 命名空间可以与其他类型的声明进行合并，只要命名空间的定义符合将要合并类型的定义。
// 合并结果包含两者的声明类型。ts使用这个功能实现一些js里的设计模式

class Album {
    label: Album.AlbumLabel;
}
namespace Album {
    export class AlbumLabel {}
}

// 创建一个函数，扩展它增加一些属性
function buildLabel(name: string): string {
    return buildLabel.x + buildLabel.y;
}
namespace buildLabel {
    export let x = "";
    export let y = "hello";
}

// 命名空间用来货站枚举型
enum Color {
    red = 1,
    green = 2,
    bule = 3,
}
namespace Color {
    export function mixColor (colorName: string) {
        if (colorName == "y") {
            return Color.red + Color.green;
        }
    }
}

// 非法合并
// 类不能与其他类或者变量合并
















