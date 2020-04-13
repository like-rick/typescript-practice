// boolean
var isDone = true;
// number 
var num = 1;
var binaryNum = 3;
var hexNum = 0xE2;
var octalNum = 467;
// string
var str = '我';
// array
var list = [1, 2, 3];
var listArr = [12, 34];
// tuple 
var tuple = ['1', 2];
// enum
var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 3] = "Green";
    Color[Color["Black"] = 4] = "Black";
})(Color || (Color = {}));
;
var c = Color.Red;
var colorName = Color[3];
// any 
var notSure = 4;
notSure.ifExited(); // okay, ifExited might exist in runtime;
notSure.toFixed();
var pretty = 4;
// pretty.toFixed();  //Error: Property 'toFixed' doesn't exist on type 'Object'.
// void 
function returnNothing() {
    console.log("123");
}
var voidValue = undefined || null;
var n = null;
// never 
function catchError() {
    throw new Error('123');
}
create({ 1: 1 });
create(null);
create(undefined);
// 类型断言
var someValue = "dog";
var someNum = someValue.length;
var someNum1 = someValue.length;
