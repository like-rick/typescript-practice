/// <reference path="Validation.ts" />
// 文件之前存在依赖关系，加入引用标签来告诉编译器文件之间的关联
namespace Validation {
    const lettersRegexp = /^[A-Za-z]+$/;
    export class LettersOnlyValidator implements StringValidator {
        isAcceptable(s: string) {
            return lettersRegexp.test(s);
        }
    }
}