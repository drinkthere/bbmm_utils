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
    localAddress: "192.168.21.41",
};
const exchangeClient = new BybitClient(options);

const symbol = "XRPUSDT";
const size = "10";
const price = "1.2";

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
    // exchangeClient.initWsEventHandler({
    //     orders: orderUpdateHandler,
    // });
    let totalOrders = 0;
    try {
        // while (true) {
        //     const clientOrderId = genClientOrderId();
        //     const start = Date.now();
        //     // 下单
        //     console.log(`${clientOrderId} NEWSUBMIT ${Date.now()}`);
        //     const result = await exchangeClient.placeLinearOrder(
        //         "Buy",
        //         'POLUSDT',
        //         "20",
        //         '0.5',
        //         clientOrderId
        //     );
        //     console.log(`${clientOrderId} NEWSUBMITTED ${Date.now()}`);

        //     const { rateLimitApi, retCode } = result;
        //     // 如果没有剩余请求或者有错误代码，退出并打印信息
        //       if (rateLimitApi.remainingRequests === 0 || retCode !== 0) {
        //         console.log('Exiting due to rate limit or error in response:');
        //         console.log(rateLimitApi, retCode);
        //         break; // 退出循环
        //     } else {
        //         totalOrders++
        //     }

        //     // // console.log(`NEW ${Date.now()-start}`)
        //     // await sleep(100);
        //     // // 撤单
        //     // console.log(`${clientOrderId} CANCELSUBMIT ${Date.now()}`);
        //     // const cancelResult = await exchangeClient.cancelLinearOrder(symbol, clientOrderId);
        //     // console.log(cancelResult)
        //     // console.log(`${clientOrderId} CANCELSUBMITTED ${Date.now()}`);
        //     // await sleep(2000);
        // }

        console.time();
        const startTime = Date.now();
        const duration = 5000;
        while (true) {
            // 生成客户端订单 ID
            let cidMap = {
                cid1: genClientOrderId(),
                cid2: genClientOrderId(),
                cid3: genClientOrderId(),
                cid4: genClientOrderId(),
                cid5: genClientOrderId(),
                cid6: genClientOrderId(),
                cid7: genClientOrderId(),
                cid8: genClientOrderId(),
                cid9: genClientOrderId(),
                cid10: genClientOrderId(),
            };

            let orders = [];
            let cancelOrders = [];
            for (let i = 1; i <= 10; i++) {
                const key = `cid${i}`;
                orders.push({
                    symbol,
                    side: "Buy",
                    orderType: "Limit",
                    timeInForce: "PostOnly",
                    price,
                    qty: size,
                    orderLinkId: cidMap[key],
                });
                cancelOrders.push({
                    symbol,
                    orderLinkId: cidMap[key],
                });
            }

            // 批量下单
            const batchResult = await exchangeClient.batchPlaceLinearOrder(
                orders
            );

            // 检查剩余请求和返回状态
            const { rateLimitApi, retExtInfo } = batchResult;
            //console.log(batchResult)
            // 如果没有剩余请求或者有错误代码，退出并打印信息
            if (
                rateLimitApi.remainingRequests === 0 ||
                retExtInfo.list.some((info) => info.code !== 0)
            ) {
                console.log("Exiting due to rate limit or error in response:");
                console.log(rateLimitApi, retExtInfo.list);
                break; // 退出循环
            } else {
                console.log(
                    batchResult.retExtInfo.list.length,
                    "orders has been placed"
                );
                totalOrders = totalOrders + batchResult.retExtInfo.list.length;
            }
            console.log("create quota:", rateLimitApi.remainingRequests);
            exchangeClient.batchCancelLinearOrder(cancelOrders);
            // // 撤单
            // const batchCancelResult = await exchangeClient.batchCancelLinearOrder(cancelOrders);
            // // 检查剩余请求和返回状态
            // const cancelRateLimitApi = batchCancelResult['rateLimitApi']
            // const cancelRetExtInfo = batchCancelResult['retExtInfo']
            // // 如果没有剩余请求或者有错误代码，退出并打印信息
            // if (cancelRateLimitApi.remainingRequests === 0 || cancelRetExtInfo.list.some(info => info.code !== 0)) {
            //     console.log('Cancel Exiting due to rate limit or error in response:');
            //     console.log({ cancelRateLimitApi, cancelRetExtInfo });
            //     break; // 退出循环
            // }
            const currentTime = Date.now();
            const elapsedTime = currentTime - startTime;
            if (elapsedTime >= duration) {
                break;
            }
        }
        console.log(totalOrders, "orders has been created");
        console.timeEnd();
        process.exit();
    } catch (e) {
        console.error(e);
        console.timeEnd();
        console.log("get/post counts:", totalOrders * 3 * 2);
        process.exit();
    }
};
main();
