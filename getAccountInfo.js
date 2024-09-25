const BybitClient = require("./clients/bybit");
const { sleep, fileExists } = require("./utils/run");
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

const main = async () => {
    try {
        const balances = await exchangeClient.getPortfolioAccountBalances();
        let lbalanceLen = 0;
        console.log("Wallet Balance:");
        if (balances && balances.length > 0) {
            for (let bal of balances) {
                for (let coinInfo of bal.coin) {
                    if (coinInfo.walletBalance != "0") {
                        lbalanceLen++;
                        console.log(coinInfo.coin, coinInfo.walletBalance);
                    }
                }
            }
            if (lbalanceLen == 0) {
                console.log(`No balance`);
            }
        } else {
            console.log(`No balance`);
        }
        console.log();

        const fundingbalances =
            await exchangeClient.getFundingAccountBalances();
        console.log("Funding Account Balance:");
        if (fundingbalances && fundingbalances.length > 0) {
            for (let bal of fundingbalances) {
                if (bal.transferBalance != 0) {
                    console.log(bal.coin, bal.transferBalance);
                }
            }
        } else {
            console.log(`No balance`);
        }
        console.log();

        console.log("Current Linear Postions:");
        const positions = await exchangeClient.getLinearPositions();
        let positionLen = 0;
        if (positions && positions.length > 0) {
            for (let pos of positions) {
                if (pos.size != 0) {
                    positionLen++;
                    let size = pos.side == "Sell" ? -pos.size : pos.size;
                    console.log(
                        pos.symbol,
                        size,
                        `rPnl:${pos.curRealisedPnl}`,
                        `uPnl:${pos.unrealisedPnl}`
                    );
                }
            }
            console.log("position length:", positionLen);
        } else {
            console.log("No position");
        }
        console.log();

        console.log("Linear Open Orders:");
        const openOrders = await exchangeClient.getLinearOpenOrders();
        if (openOrders && openOrders.length > 0) {
            for (let order of openOrders) {
                console.log(
                    order.symbol,
                    order.orderLinkId,
                    order.side,
                    order.price,
                    order.qty
                );
            }
            console.log("orders length:", openOrders.length);
        } else {
            console.log("No orders");
        }
        console.log();

        const fcommissionRate = await exchangeClient.getLinearCommissionRate(
            "BTCUSDT"
        );
        console.log(`Linear Commission Rate: ${fcommissionRate.makerFeeRate}`);
        console.log();
    } catch (e) {
        console.error(e);
    }
};
main();
