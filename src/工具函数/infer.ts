// infer的中文意思是推断，一般搭配泛型条件语句使用
// 所谓推断，就是你不用预先指定在泛型列表中，在运行时会自动判断，不过你得先预定义好整体结构
type Foo<T, U> = T extends {t: infer Test} ? (T extends U ? never : T) : string;
// 首先看extends后面的内容，{t: infer Test}可以看成是一个包含t属性的类型定义，
// 这个t属性的value类型通过infer进行推断后悔赋值给Test类型，如果泛型的实际参数符合{t: infer Test}的定义
// 那个返回的就是Test类型，否则默认给缺省的string类型

// 举例说明
type One = Foo<number, string>  // string,因为number不是一个包含t的对象类型
type Two = Foo<{t: boolean}, string> // boolean,因为泛型参数匹配上了，使用了infer对应的type
type Three = Foo<{a: number, t: () => void}, {a: number}> // () => void, 泛型定义是参数的子集，同样适配

// infer用来对满足的泛型类型进行子类型的抽取，有很多高级的泛型工具也巧妙的使用了这个方法