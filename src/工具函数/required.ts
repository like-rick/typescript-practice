// Required<T>
// 可以将类型T中的所有属性变为必选项

namespace UtilsRequired{
    type Animal = {
        age?: string,
        name?: string,
    }
    const a: Required<Animal> = {age: '1', name: '2'};

    // Requried的实现
    type Required1<T> = {
        [P in keyof T]-?: T[P]
    }
}