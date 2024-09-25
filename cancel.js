const BybitClient = require("./clients/bybit");
const { sleep, fileExists } = require("./utils/run");
const { log } = require("./utils/log");
const cfgFile = `./configs/config.json`;
if (!fileExists(cfgFile)) {
    log(`config file ${cfgFile} does not exits`);
    process.exit();
}
const configs = require(cfgFile);

const { account, symbol } = require("minimist")(process.argv.slice(2));
if (account == null) {
    log("node getAccountInfo.js --account=xxx --symbol=yyy");
    process.exit();
}

const keyIndex = configs.keyIndexMap[account];

let options = {
    keyIndex,
};
const exchangeClient = new BybitClient(options);

const cancelOrders = async () => {
    const canceledOrders = await exchangeClient.cancelAllLinearOrders(symbol);
    if (canceledOrders && canceledOrders.length > 0) {
        for (let order of canceledOrders) {
            console.log(
                `oid:${order.orderId}, cid:${order.orderLinkId} has been canceled`
            );
        }
    }
};
const main = async () => {
    await cancelOrders();
};
main();
