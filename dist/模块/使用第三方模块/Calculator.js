"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Calculator = /** @class */ (function () {
    function Calculator() {
        this.memory = 0;
        this.operator = "+";
        this.current = 0; // 处理两位数的十位
    }
    Calculator.prototype.handleChar = function (char) {
        if (char === "=") {
            this.evaluate();
            return;
        }
        else {
            var value = this.processDigit(char, this.current);
            if (value !== undefined) {
                // 当前char是数字
                this.current = value;
                return;
            }
            else {
                // 当前char是操作符
                var value_1 = this.processOperator(char);
                if (value_1 !== undefined) {
                    this.evaluate();
                    this.operator = value_1;
                    return;
                }
            }
        }
        throw new Error("Unsupporte input " + char);
    };
    Calculator.prototype.processDigit = function (digit, currentValue) {
        if (digit >= "0" && digit <= "9") {
            return currentValue * 10 + (digit.charCodeAt(0) - "0".charCodeAt(0));
        }
        else {
            return undefined;
        }
    };
    Calculator.prototype.processOperator = function (operator) {
        if (["+", "-", "*", "/"].indexOf(operator) >= 0) {
            return operator;
        }
        return undefined;
    };
    Calculator.prototype.getResult = function () {
        return this.memory;
    };
    Calculator.prototype.evaluate = function () {
        if (this.operator !== "") {
            // 当前操作符是值操作符
            this.memory = this.evaluateOperator(this.operator, this.memory, this.current);
        }
        else {
            // 处理两位数
            this.memory = this.current;
        }
        this.current = 0;
    };
    Calculator.prototype.evaluateOperator = function (operator, left, right) {
        switch (operator) {
            case "+": return left + right;
            case "-": return left - right;
            case "*": return left * right;
            case "/": return left / right;
            default: throw Error("please input corret signal");
        }
    };
    return Calculator;
}());
exports.Calculator = Calculator;
function test(c, input) {
    for (var i = 0; i < input.length; i++) {
        c.handleChar(input[i]);
    }
    console.log("result if " + input + " is " + c.getResult());
}
exports.test = test;
