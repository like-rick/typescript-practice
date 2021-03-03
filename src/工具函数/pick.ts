// Pick<T, K>
// 此工具的作用是将 T 类型中的 K 键列表提取出来，生成新的子键值对类型。


namespace UtilsPick{
    type Animal = {
        name: string,
        age: number,
        eat: () => number,
    }
    const bird: Pick<Animal, 'name' | 'age'> = {name: 'bird', age: 1};
    
    //Pick的实现
    type Pick1<T, K extends keyof T> = {
        [P in K]: T[P]
    }
}