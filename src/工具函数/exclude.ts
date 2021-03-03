// Exclude<T, U>
// 在T类型中，去除T类型和U类型的交集，返回剩余的部分


namespace UtilsExclude{
    type T1 = Exclude1<'a' | 'b' | 'c', 'a' | 'b'>  // c
    type T2 = Exclude<string | number | (() => void), Function>; // string | number
    type T3 = Exclude1<{a: number, t: () => void}, {a: number}>
    type T4 = Exclude1<{a: number}, {a: number, t: () => void}>

    //Exclude的实现 
    type Exclude1<T, U> = T extends U ? number : string
    // 注意这里的extends返回的T是原来T中和U无交集的属性，返回的U是原来T中和U有交集的属性，而任何属性联合never都是自身
    // 
}