import { StringValidator } from "./Validation";

export const numberRegexp = /^[0-9]+$/;

class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
        return s.length === 5 && numberRegexp.test(s);
    }
}

export { ZipCodeValidator }
// 重复的模块，别名导出
export { ZipCodeValidator as mainValidator }