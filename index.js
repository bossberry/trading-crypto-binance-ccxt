require('dotenv').config();

const interactive = require('./interactive');
const binance = require('./binance')

init();

async function init () {
    const choice = await interactive.openQuestionForInteractive();
    if(choice === '1') {
        const symbol = await interactive.questionSymbol();
        const orderList = await binance.getAllOpenOrders(symbol);
        if(orderList.length === 0) {
            console.log(`=======>Nothing ${symbol.trim().toUpperCase()} open orders`);
        } else {
            console.log('=======>',orderList);
        }
    } else if(choice === '2') {
        const symbol = await interactive.questionSymbol();
        const direction = await interactive.questionDirection();
        const price = await interactive.questionPrice();
        const amount = await interactive.questionAmount();
        const order = await binance.createOrder(symbol.trim().toUpperCase(), direction, amount, price);
        console.log('=======>order:', order);
    } else if(choice === '3') {
        const symbol = await interactive.questionSymbol();
        const order = await binance.getPriceBySymbol(symbol.trim().toUpperCase());
        console.log(`=======>${symbol.trim().toUpperCase()} last price : ${order.last}`);
    }  else if(choice === '4') {
        const symbol = await interactive.questionSymbol();
        const orderList = await binance.cancelOrderBySymbol(symbol.trim().toUpperCase());
    }else {
      console.log(`Your options are unavailable..`);
      init()
    }
    init();
}