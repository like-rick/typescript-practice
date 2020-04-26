// 普通函数的格式
// 可选参数，参数的默认值

// 剩余参数
function buildName(firstName: string, ...restOfName: string[]){
    return firstName + " " + restOfName.join(" ");
}
let employeeName = buildName('a', 'b', 'c')


// this 
namespace useThis {
    let deck = {
        suits: ['hearts', 'spades', 'clubs'],
        cards: Array(52),
        create: function () {
            return () => {
                return this.suits[1];
            }
        }
    }
}


// this 参数在回调函数里


namespace thisInCallback{

    interface UIElement {
        addClickListener(onClick: (this: void) => void): void
    }

    class Handler {
        info: string;
        onClickBad(this: Handler) {
            this.info = '12';
        }
    }

    let h = new Handler();

    let uiElement: UIElement;

    // uiElement.addClickListener(h.onClickBad);  // error
    // addClickListener中希望的this是void,而参数提供的是Handler
}

// 函数 重载

namespace overLoad{

    let suits =  ["hearts", "spades", "clubs", "diamonds"];

    // 把最精确的定义放在前面
    function pickCard(x: {suit: string; card: number}[]): number;
    function pickCard(x: number): {suit: string; card: number};
    function pickCard(x: any): any {
        if (typeof x == 'object') {
            let pickCard = Math.floor(Math.random() * x.length);
            return pickCard;
        } else if (typeof x == 'number') {
            let pickedSuit = Math.floor(x / 13);
            return { suit: suits[pickedSuit], card: x % 13 }
        }
    }

    let mkDeck = [
        {suit: "diamonds", card: 2},
        {suit: "spades", card: 10},
        {suit: "hearts", card: 2},
    ]

    let pickedCard1 = mkDeck[pickCard(mkDeck)]

}


