const BybitClient = require("./clients/bybit");
const { v4: uuidv4 } = require("uuid");
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

const closePositions = async () => {
    scheduleLoopTask(async () => {
        // 获取tickers
        const tickerMap = await exchangeClient.getLinearTickers();

        // 获取position
        let positions = await exchangeClient.getLinearPositions();
        positions = positions.filter((i) => i.size != 0);

        let i = 0;
        if (positions != null && positions.length > 0) {
            for (let position of positions) {
                await exchangeClient.cancelAllLinearOrders(position.symbol);
                i++;

                const ticker = tickerMap[position.symbol];
                if (ticker == null) {
                    log(`${position.symbol}'s ticker is null`);
                    continue;
                }
                console.log(
                    `postion ${position.symbol} ${position.side} ${position.size}, ticker:`,
                    ticker
                );

                if (position.side == "Buy") {
                    await exchangeClient.placeLinearOrder(
                        "Sell",
                        position.symbol,
                        position.size,
                        ticker.askPrice.toString(),
                        genClientOrderId()
                    );
                } else if (position.side == "Sell") {
                    await exchangeClient.placeLinearOrder(
                        "Buy",
                        position.symbol,
                        position.size,
                        ticker.bidPrice,
                        genClientOrderId()
                    );
                }
                await sleep(500);
            }
        }
        console.log(`still ${i} positions need to be close`);
        await sleep(20 * 1000);
    });
};

const main = async () => {
    closePositions();
};
main();
