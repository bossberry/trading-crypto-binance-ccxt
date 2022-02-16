const ccxt = require ('ccxt');
const API_KEY = process.env.API_KEY;
const SECRET_KEY = process.env.SECRET_KEY;

const exchangeId = 'binance';
const exchangeClass = ccxt[exchangeId];
const exchange = new exchangeClass ({'apiKey': API_KEY, 'secret': SECRET_KEY,});


async function getAllOpenOrders(symbol) {
    const order = await exchange.fetchOpenOrders(symbol.trim().toUpperCase());
    return order;
}

async function getPriceBySymbol(symbol) {
    const order = await exchange.fetchTicker(symbol);
    return order;        
}

async function createOrder(symbol, side, amount, price) {
    const result = await exchange.createLimitOrder(symbol, side, amount, price);
    console.log(result.status);
}

async function cancelOrderBySymbol(symbol) {
    try {
        const id = await getIdOrderBySymbol(symbol);
        const result = await exchange.cancelOrder(id, symbol)
        console.log(result.status);
    } catch (error) {
        console.log('Nothing order for symbol')
        return false
    }
}

async function getIdOrderBySymbol(symbol) {
    const order = await exchange.fetchOpenOrders(symbol);
    return order[order.length -1].id;
}

module.exports = {
    getAllOpenOrders,
    getPriceBySymbol,
    createOrder,
    cancelOrderBySymbol,
    getIdOrderBySymbol
}