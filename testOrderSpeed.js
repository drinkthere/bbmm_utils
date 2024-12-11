const BybitClient = require("./clients/bybit");
const { sleep, fileExists, scheduleLoopTask } = require("./utils/run");
const { genClientOrderId } = require("./utils/common");
const { log } = require("./utils/log");
const cfgFile = `./configs/config.json`;
if (!fileExists(cfgFile)) {
    log(`config file ${cfgFile} does not exits`);
    process.exit();
}
const configs = require(cfgFile);

let { account, intranet } = require("minimist")(process.argv.slice(2));
if (account == null) {
    log("node getAccountInfo.js --account=xxx");
    process.exit();
}
intranet = intranet == "true" ? true : false;
const keyIndex = configs.keyIndexMap[account];

let options = {
    keyIndex,
    intranet,
};
const exchangeClient = new BybitClient(options);

const symbols = [
    {
        symbol: "1INCHUSDT",
        size: "30",
        price: "0.4",
    },
    {
        symbol: "AAVEUSDT",
        size: "0.05",
        price: "250",
    },
    {
        symbol: "ADAUSDT",
        size: "15",
        price: "0.9",
    },
    {
        symbol: "APTUSDT",
        size: "1",
        price: "11",
    },
    {
        symbol: "ARBUSDT",
        size: "15",
        price: "0.9",
    },
    {
        symbol: "ATOMUSDT",
        size: "2",
        price: "7.5",
    },
    {
        symbol: "AVAXUSDT",
        size: "0.5",
        price: "40",
    },
    {
        symbol: "BNBUSDT",
        size: "0.02",
        price: "650",
    },
    {
        symbol: "COMPUSDT",
        size: "0.15",
        price: "85",
    },
    {
        symbol: "CRVUSDT",
        size: "15",
        price: "0.9",
    },
    {
        symbol: "DOGEUSDT",
        size: "40",
        price: "0.3",
    },
    {
        symbol: "DYDXUSDT",
        size: "10",
        price: "1.8",
    },
    {
        symbol: "EIGENUSDT",
        size: "3",
        price: "4",
    },
    {
        symbol: "ENJUSDT",
        size: "50",
        price: "0.25",
    },
    {
        symbol: "EOSUSDT",
        size: "15",
        price: "1",
    },
    {
        symbol: "ETCUSDT",
        size: "0.5",
        price: "25",
    },
    {
        symbol: "FILUSDT",
        size: "2",
        price: "5",
    },
    {
        symbol: "FTMUSDT",
        size: "15",
        price: "1",
    },
    {
        symbol: "AAVEUSDT",
        size: "0.05",
        price: "250",
    },
    {
        symbol: "GMTUSDT",
        size: "100",
        price: "0.16",
    },
];

const orderUpdateHandler = async (orders) => {
    for (let order of orders) {
        if (["BTCUSDT", "ETHUSDT"].includes(order.symbol)) {
            continue;
        }
        // 使用clientOrderId作为锁的key，避免并发引起的更新错误
        const clientOrderId = order.clientOrderId;
        if (["New"].includes(order.orderStatus)) {
            console.log(
                `${clientOrderId} ${order.symbol} NEW ${order.orderTime} ${Date.now()}`
            );
        } else if (["Cancelled"].includes(order.orderStatus)) {
            console.log(
                `${clientOrderId} ${order.symbol} CANCELED ${order.orderTime} ${Date.now()}`
            );
        }
    }
};

const main = async () => {
    exchangeClient.initWsEventHandler({
        orders: orderUpdateHandler,
    });
    exchangeClient.wsOrders();

    const limit = 100;

    for (let symbolInfo of symbols) {
        let i = 0;

        while (i < limit) {
            i++;
            const symbol = symbolInfo.symbol;
            const clientOrderId = genClientOrderId();
            const start = Date.now();

            // 下单
            console.log(`${clientOrderId} ${symbol} NEWSUBMIT ${Date.now()}`);
            await exchangeClient.placeLinearOrder(
                "Buy",
                symbol,
                symbolInfo.size,
                symbolInfo.price,
                clientOrderId
            );
            console.log(
                `${clientOrderId} ${symbol} NEWSUBMITTED ${Date.now()}`
            );
            await sleep(500);

            // 撤单
            console.log(
                `${clientOrderId} ${symbol} CANCELSUBMIT ${Date.now()}`
            );
            await exchangeClient.cancelLinearOrder(symbol, clientOrderId);
            console.log(
                `${clientOrderId} ${symbol} CANCELSUBMITTED ${Date.now()}`
            );
            await sleep(1000);
        }
    }
};
main();
