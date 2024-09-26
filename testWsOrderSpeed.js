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

const { account } = require("minimist")(process.argv.slice(2));
if (account == null) {
    log("node getAccountInfo.js --account=xxx");
    process.exit();
}

const keyIndex = configs.keyIndexMap[account];

let options = {
    keyIndex,
};
const exchangeClient = new BybitClient(options);

const symbol = "XRPUSDT";
const size = "10";
const price = "0.5";

const orderUpdateHandler = async (orders) => {
    for (let order of orders) {
        // 使用clientOrderId作为锁的key，避免并发引起的更新错误
        const clientOrderId = order.clientOrderId;
        if (["New"].includes(order.orderStatus) && order.symbol == symbol) {
            console.log(
                `${clientOrderId} NEW ${order.orderTime} ${Date.now()}`
            );
        } else if (
            ["Cancelled"].includes(order.orderStatus) &&
            order.symbol == symbol
        ) {
            console.log(
                `${clientOrderId} CANCELED ${order.orderTime} ${Date.now()}`
            );
        }
    }
};

const main = async () => {
    await exchangeClient.wsConnectTrade();
    exchangeClient.initWsEventHandler({
        orders: orderUpdateHandler,
    });
    exchangeClient.wsOrders();
    await sleep(3000);

    scheduleLoopTask(async () => {
        const clientOrderId = genClientOrderId();
        // 下单
        console.log(`${clientOrderId} NEWSUBMIT ${Date.now()}`);
        await exchangeClient.wsPlaceLinearOrder(
            symbol,
            "Buy",
            price,
            size,
            clientOrderId
        );
        console.log(`${clientOrderId} NEWSUBMITTED ${Date.now()}`);
        await sleep(1000);
        // 撤单
        console.log(`${clientOrderId} CANCELSUBMIT ${Date.now()}`);
        await exchangeClient.wsCancelLinearOrder(symbol, clientOrderId);
        console.log(`${clientOrderId} CANCELSUBMITTED ${Date.now()}`);
        await sleep(1 * 1000);
        process.exit();
    });
};
main();
