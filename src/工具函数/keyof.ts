// keyof 是取 interface 的键，而且 keyof 取到键后会保存为联合类型。
type A = string
interface C {
    name: string
}
type B = keyof C

namespace XXX{
    let x = "hello" as const;
    type X = typeof x; // type X = "hello"
    let a: X = 'hello'
    let y = [10, 20] as const;
    type Y = typeof y; // type Y = readonly [10, 20]
    
    let z = { text: "hello" } as const;
    type Z = typeof z; // let z: { readonly text: "hello"; }
    type mapType0<T> = {
        [k in keyof T]: T[k]
      }
      const o = {
        a: 1,
        b: '2'
    }
    
    type unArray<T> = T extends (infer U)[] ? U : T;

    let ac = [1,2,'3'];

    let ab: unArray<typeof ac> = 's';
    type ParamType<T> = T extends (param: infer P) => any ? P : T;
}

