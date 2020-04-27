
// boolean
let isDone : boolean = true;

// number 
let num: number = 1;
let binaryNum: number = 0b11;
let hexNum: number = 0xE2;
let octalNum: number = 0o723;

// string
let str: string = '我';

// array
let list: number[] = [1,2,3];
let listArr: Array<number> = [12,34];

// tuple 
let tuple: [string, number] = ['1',2];

// enum
enum Color{Red = 1, Green = 3, Black};
let c: number = Color.Red;
let colorName: string = Color[3];

// any 
let notSure: any = 4;
notSure.ifExited(); // okay, ifExited might exist in runtime;
notSure.toFixed();

let pretty: Object = 4;
// pretty.toFixed();  //Error: Property 'toFixed' doesn't exist on type 'Object'.

// void 
function returnNothing(): void{
    console.log("123");
}

// let voidValue: void = undefined || null;

// let n: number = null;

// never 
function catchError(): never{
    throw new Error('123')
}

// object 
declare function create(o: object): void;
create({1:1});
// create(null)
// create(undefined)

// 类型断言

let someValue: string = "dog";
let someNum: number = (<string>someValue).length;
let someNum1: number = (someValue as string).length;


