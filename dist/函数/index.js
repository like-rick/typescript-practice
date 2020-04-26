// 普通函数的格式
// 可选参数，参数的默认值
// 剩余参数
function buildName(firstName) {
    var restOfName = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        restOfName[_i - 1] = arguments[_i];
    }
    return firstName + " " + restOfName.join(" ");
}
var employeeName = buildName('a', 'b', 'c');
// this 
var useThis;
(function (useThis) {
    var deck = {
        suits: ['hearts', 'spades', 'clubs'],
        cards: Array(52),
        create: function () {
            var _this = this;
            return function () {
                return _this.suits[1];
            };
        }
    };
})(useThis || (useThis = {}));
// this 参数在回调函数里
var thisInCallback;
(function (thisInCallback) {
    var Handler = /** @class */ (function () {
        function Handler() {
        }
        Handler.prototype.onClickBad = function () {
            this.info = '12';
        };
        return Handler;
    }());
    var h = new Handler();
    var uiElement;
    // uiElement.addClickListener(h.onClickBad);  // error
    // addClickListener中希望的this是void,而参数提供的是Handler
})(thisInCallback || (thisInCallback = {}));
// 函数 重载
var overLoad;
(function (overLoad) {
    var suits = ["hearts", "spades", "clubs", "diamonds"];
    function pickCard(x) {
        if (typeof x == 'object') {
            var pickCard_1 = Math.floor(Math.random() * x.length);
            return pickCard_1;
        }
        else if (typeof x == 'number') {
            var pickedSuit = Math.floor(x / 13);
            return { suit: suits[pickedSuit], card: x % 13 };
        }
    }
    var mkDeck = [
        { suit: "diamonds", card: 2 },
        { suit: "spades", card: 10 },
        { suit: "hearts", card: 2 },
    ];
    var pickedCard1 = mkDeck[pickCard(mkDeck)];
})(overLoad || (overLoad = {}));
