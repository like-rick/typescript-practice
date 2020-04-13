// 接口初探
interface labelledValue {
    label: string,
}
function printLabel(labelObj: labelledValue): void {
    console.log(labelObj.label);
}

// 可选属性
interface squareValue{
    color?: string,
    size?: number,
    [propName: string]: any, // 索引签名？？？
}
function computeSquera(square: squareValue): {color: string, size: number}{
    let newSquare = {color: 'red', size: 400}

    if (square.color) {
        newSquare.color = square.color;
    }
    return newSquare;
}

// 只读属性
interface Point {
    readonly x: number,
    readonly y: number,
}
let p: Point = {x: 10, y: 20};
// p.x = 1;

// ReadOnlyArray 数组只读属性
let a: Array<number> = [1,2,3]
let b: ReadonlyArray<number> = a;
// b[0] = 2;

// 额外的检测属性
interface SquareConfig {
    color?: string,
    size?: number,
}
function getSquare(squareValue: SquareConfig): {color: string, size: number} {
    return {color: "string", size: 1}
}
let mySquare = getSquare({col: "12", size: 2} as SquareConfig);
let mySquare1 = getSquare(<SquareConfig>{col: "1"})

// 函数类型 只有一个参数列表和返回值类型的定义
interface SearchFun{
    (source: string, size: number): boolean,
}

let mySearch: SearchFun = function (source: string, size: number){return true}

// 索引类型 支持number,string 但是number索引的返回值必须是string索引返回值的子类型
interface NumberDictionary{
    [x: string]: string,
    // length: number,//error
    
}

// 只读索引
interface ReadonlyStringObj{
    readonly [x: string]: any,
    [y: number]: string,
}
let readonlyDic: ReadonlyStringObj = {1: "2", "2": "1"}
// readonlyDic["2"] = "2" 

