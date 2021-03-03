// Omit<T, K>
// 适用于键值对对象的 Exclude，它会去除类型 T 中包含 K 的键值对。

namespace UtilsOmit{
    type Animal = {
        name: string,
        age: number,
        sex: string
    }
    const OmitAnimal: Omit<Animal, 'name' | 'age'> = {sex: '1'}

    // Omit的实现
    type Omit1<T, K> = Pick<T, Exclude<keyof T, K>>

}