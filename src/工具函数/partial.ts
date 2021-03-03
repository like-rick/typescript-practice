// partial的作用就是将泛型中的全部属性变为可选
// 举例
namespace UtilsPartial{
    type Animal = {
        name: string,
        category: string,
        age: number,
        eat: () => number,
    }
    type PartOfAnimal= Partial<Animal>;

    
    // partial的实现
    type Partial1<T> = {
        [P in keyof T]? :T[P];
    }
}