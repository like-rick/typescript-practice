type Operator = "+" | "-" | "*" | "/" | "";



export class Calculator {
    private memory: number = 0;
    private operator: Operator = "+";
    private current: number = 0; // 处理两位数的十位
    public handleChar(char: string): void{
        if (char === "=") {
            this.evaluate();
            return;
        } else {
            let value = this.processDigit(char, this.current);
            if (value !== undefined) {
                // 当前char是数字
                this.current = value;
                return;
            } else {
                // 当前char是操作符
                let value = this.processOperator(<Operator>char);
                if (value !== undefined) {
                    this.evaluate();
                    this.operator = <Operator>value;
                    return;
                }
            }
        }
        throw new Error(`Unsupporte input ${char}`)
    }
    protected processDigit(digit: string, currentValue: number): number | undefined{
        if (digit >= "0" && digit <= "9") {
            return currentValue * 10 + (digit.charCodeAt(0) - "0".charCodeAt(0))
        } else {
            return undefined;
        }
    } 
    protected processOperator(operator: Operator): string | undefined{
        if (["+", "-", "*", "/"].indexOf(operator) >= 0) {
            return operator;
        }
        return undefined;
    }
    public getResult(): number {
        return this.memory;
    }
    private evaluate() {
        if (this.operator !== "") {
            // 当前操作符是值操作符
            this.memory = this.evaluateOperator(this.operator, this.memory, this.current);
        } else {
            // 处理两位数
            this.memory = this.current;
        }
        this.current = 0;
    }
    protected evaluateOperator(operator: Operator, left: number, right: number): number {
        switch(operator){
            case "+": return left + right;
            case "-": return left - right;
            case "*": return left * right;
            case "/": return left / right;
            default: throw Error("please input corret signal");
        }
    }
}
export function test (c: Calculator, input: string) {
    for (let i = 0; i < input.length; i++) {
        c.handleChar(input[i]);
    }
    console.log(`result if ${input} is ${c.getResult()}`)
}


