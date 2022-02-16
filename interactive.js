const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const properties = [
    {
        name: 'symbol',
        validator: /^[a-zA-Z\s-]+$/,
        warning: 'Symbol must be only letters, spaces, or dashes'
    },
    {
        name: 'direction',
        validator: /\b(?:b|s)\b/,
        warning: 'typing b or s'
    },
    {
        name: 'price',
        validator: /[+-]?([0-9]*[.])?[0-9]+/,
        warning: 'floating number'
    }
];

const seperateLine = '#########################################################################\n';
const greetingMessage = 'Hello, Welcome to interactive tool via Binance API.\nPlease select below.\n';
const choice1 = '1. List symbol that open orders\n'
const choice2 = '2. Buy or Sell crypto in your spot\n'
const choice3 = '3. Check a crypto price\n'
const choice4 = '4. Cancel orders by symbol\n'
const endChoice = '[type your choice 1,2,3,4]\n'
const choiceList = `${choice1}${choice2}${choice3}${choice4}${endChoice}`;

async function openQuestionForInteractive () {
    return await new Promise(resolve => {
        rl.question(`${seperateLine}${greetingMessage}${choiceList}`, resolve)
    });
}

async function questionSymbol () {
    return await new Promise(resolve => {
        rl.question(`Type symbol name [EX: BTCUSDT]: `, resolve)
    });
}

async function questionPrice () {
    const answer = await new Promise(resolve => {
        rl.question(`Type price to open order [EX: 60000]: `, (resolve))
    });
    if(isNumeric(answer)) {
        return answer;
    } else {
        await questionPrice();
    }  
}

async function questionAmount () {
    const answer = await new Promise(resolve => {
        rl.question(`Type amount to open order, minimun 10[EX: 100]: `, resolve);
    });
    console.log(parseFloat(answer))
    if(isNumeric(answer) && parseFloat(answer) >= 10) {
        return answer;
    } else {
        await questionAmount();
    }
}

async function questionDirection () {
    const answer = await new Promise((resolve) => {
        rl.question(`Type direction,Buy or Sell[EX: B/S]: `, resolve)
    });
    const answerFormat = answer.trim().toLowerCase();
    if(answerFormat === 'buy' || answerFormat === 'b') {
        return 'buy';
    }else if(answerFormat === 'sell' || answerFormat === 's') {
        return 'sell';
    } else {
        await questionDirection();
    }
}

function isNumeric(num){
    return !isNaN(num)
}

function closeInteractive () {
    rl.on('close', function () {
        console.log('\nBYE BYE !!!');
        process.exit(0);
    });
}

module.exports = {
    openQuestionForInteractive,
    questionSymbol,
    questionDirection,
    questionPrice,
    questionAmount,
    closeInteractive
};