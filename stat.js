const AsyncLock = require("async-lock");
const StatOrderService = require("./services/statOrder");
const TgService = require("./services/tg.js");
const BybitClient = require("./clients/bybit");
const { sleep, fileExists, scheduleLoopTask } = require("./utils/run");
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

// 初始化同步锁
const lock = new AsyncLock();

// 初始化stat order service
const statOrderService = new StatOrderService();
const tgService = new TgService();
let noOrders = 0;
let maxNoOrdersTimes = 5;

const orderUpdateHandler = async (orders) => {
    for (let order of orders) {
        // 使用clientOrderId作为锁的key，避免并发引起的更新错误
        const clientOrderId = order.clientOrderId;
        await lock.acquire(clientOrderId, async () => {
            if (["Filled"].includes(order.orderStatus)) {
                console.log(order);
                const symbol = order.symbol;
                const side = order.side;
                const quantity = order.filledQuantity;
                const amount = quantity;
                const price = order.filledPrice;
                const notional = order.filledNotional;

                const msg = `${account} ${clientOrderId} ${symbol} ${side} ${order.orderStatus} ${amount}@${price} ${notional}`;
                log(msg);

                // 将订单写入数据库
                await statOrderService.saveOrder(`tb_order_${account}`, {
                    symbol,
                    side,
                    quantity,
                    amount,
                    price,
                    notional,
                });
            }
        });
    }
};

const scheduleStatProfit = () => {
    scheduleLoopTask(async () => {
        try {
            const tickersMap = await exchangeClient.getLinearTickers();
            const accountBalance =
                await exchangeClient.getPortfolioAccountBalances();

            const coinBalances = accountBalance[0]["coin"];
            let usdtBalanceArr = coinBalances
                .filter((item) => item.coin == "USDT")
                .map(
                    (item) =>
                        parseFloat(item.walletBalance) +
                        parseFloat(item.unrealisedPnl)
                );
            const usdtBalance =
                usdtBalanceArr.length == 0 ? 0 : parseFloat(usdtBalanceArr[0]);

            let tradingBalance = coinBalances.reduce((total, item) => {
                let bal = 0;
                if (item.coin == "USDT") {
                    bal =
                        parseFloat(item.walletBalance) +
                        parseFloat(item.unrealisedPnl);
                } else {
                    if (parseFloat(item.walletBalance) > 0) {
                        bal =
                            parseFloat(
                                tickersMap[item.coin + "USDT"]["bidPrice"]
                            ) *
                            (parseFloat(item.walletBalance) +
                                parseFloat(item.unrealisedPnl));
                    }
                }
                return total + bal;
            }, 0);

            const fundingBalanceArr =
                await exchangeClient.getFundingAccountBalances();
            let fundingBalance = fundingBalanceArr.reduce((total, item) => {
                let bal = 0;
                if (item.coin == "USDT") {
                    bal = parseFloat(item.walletBalance);
                } else {
                    if (parseFloat(item.walletBalance) > 0) {
                        bal =
                            parseFloat(
                                tickersMap[item.asset + "USDT"]["bidPrice"]
                            ) * parseFloat(item.walletBalance);
                    }
                }
                return total + bal;
            }, 0);
            log(
                `tradingBalance=${tradingBalance}, fundingBalance=${fundingBalance}`
            );

            const positions = await exchangeClient.getLinearPositions();
            let notionalBTCETH = 0;
            let notionalOther = 0;
            let positionsNum = 0;
            if (positions != null) {
                for (let position of positions) {
                    if (position.size != 0) {
                        let notional =
                            position.side == "Buy"
                                ? parseFloat(position.positionValue)
                                : -parseFloat(position.positionValue);
                        positionsNum++;
                        if (["ETHUSDT", "BTCUSDT"].includes(position.symbol)) {
                            notionalBTCETH += notional;
                        } else {
                            notionalOther += notional;
                        }
                    }
                }
            }
            const notionalAll = notionalBTCETH + notionalOther;
            let msg = `${account} USDTBalance=${usdtBalance.toFixed(
                2
            )}|PositionDeltaWithBTCETH=${notionalBTCETH.toFixed(
                2
            )}|PositionDeltaWithoutBTCETH$=${notionalOther.toFixed(
                2
            )}|PositionDeltaAll=${notionalAll.toFixed(
                2
            )}|PositionCount=${positionsNum}`;
            log(msg);

            // 获取margin ratio
            const mmRate = parseFloat(accountBalance[0]["accountMMRate"]);
            let marginRatio = mmRate > 0 ? 1 / mmRate : 999;

            // 获取openorders数量
            let buyOrdersNum = 0;
            let sellOrdersNum = 0;
            const orders = await exchangeClient.getLinearOpenOrders();
            if (orders && orders.length > 2) {
                for (let order of orders) {
                    if (parseFloat(order.qty) != 0) {
                        if (order.side == "Buy") {
                            buyOrdersNum++;
                        } else {
                            sellOrdersNum++;
                        }
                    }
                }
                noOrders = 0;
                maxNoOrdersTimes = 5;
            } else {
                noOrders++;
                if (noOrders >= maxNoOrdersTimes) {
                    // 报警
                    tgService.sendMsg(`${account} orders numbers warning`);
                    noOrders = 0;
                    maxNoOrdersTimes = 2 * maxNoOrdersTimes;
                }
            }

            const ordersNum = buyOrdersNum + sellOrdersNum;
            console.log(
                `The num of open orders is ${ordersNum}(B:${buyOrdersNum}|S:${sellOrdersNum})`
            );

            // 将订单写入数据库
            await statOrderService.saveBalance({
                account,
                usdt_balance: usdtBalance.toFixed(2),
                trading_balance: tradingBalance.toFixed(2),
                funding_balance: fundingBalance.toFixed(2),
                btc_eth_delta: notionalBTCETH.toFixed(2),
                other_delta: notionalOther.toFixed(2),
                total_delta: notionalAll.toFixed(2),
                margin_ratio: marginRatio.toFixed(2),
                orders_num: ordersNum,
                position_count: positionsNum,
            });
        } catch (e) {
            console.error(e);
        }
        await sleep(120 * 1000);
    });
};

const main = async () => {
    // exchangeClient.initWsEventHandler({
    //     orders: orderUpdateHandler,
    // });
    // exchangeClient.wsOrders();
    scheduleStatProfit();
};
main();
