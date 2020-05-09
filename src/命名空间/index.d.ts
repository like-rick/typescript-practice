
// 外部命名空间
// 通常在 .d.ts里面声明

declare namespace D3{
    export interface Event{
        isAcceptable(s: string): boolean;

    }
}

declare var d3: D3.Event;