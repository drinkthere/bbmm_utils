const { RestClientV5, WebsocketClient } = require("bybit-api");
const { v4: uuidv4 } = require("uuid");
const { sleep } = require("../utils/run");

// 加载.env文件
const dotenv = require("dotenv");
dotenv.config();

const apiKeyArr = process.env.BYBIT_API_KEY.split(",");
const apiSecretArr = process.env.BYBIT_API_SECRET.split(",");

class BybitClient {
    constructor(options = {}) {
        let config = {};

        let keyIndex = 0;
        if (options.keyIndex) {
            keyIndex = options.keyIndex;
        }
        // 初始化Binance client
        config["key"] = apiKeyArr[keyIndex];
        config["secret"] = apiSecretArr[keyIndex];

        let restConfig = Object.assign(config, { recv_window: 10000 });
        this.client = new RestClientV5(restConfig);

        let wsConfig = Object.assign(config, { market: "v5" });
        const logger = {
            silly: (...params) => {},
            debug: (...params) => {},
            notice: (...params) => {},
            info: (...params) => {},
            warning: (...params) => {},
            error: (...params) => {},

            //silly: (...params) => console.log("silly", ...params),
        };
        this.wsClient = new WebsocketClient(wsConfig, logger);
    }

    async getLinearTickers() {
        const resp = await this.client.getTickers({
            category: "linear",
        });
        if (resp.retCode === 0) {
            return resp.result.list.reduce((map, item) => {
                map[item.symbol] = {
                    bidPrice: parseFloat(item.bid1Price),
                    askPrice: parseFloat(item.ask1Price),
                };
                return map;
            }, {});
        } else {
            console.error("getLinearBalances FAILED, error: ", resp);
            return [];
        }
    }

    async getPortfolioAccountBalances() {
        const resp = await this.client.getWalletBalance({
            accountType: "UNIFIED",
        });
        if (resp.retCode === 0) {
            return resp.result.list;
        } else {
            console.error("getLinearBalances FAILED, error: ", resp);
            return [];
        }
    }

    async getFundingAccountBalances() {
        const resp = await this.client.getAllCoinsBalance({
            accountType: "FUND",
        });

        if (resp.retCode === 0) {
            return resp.result.balance;
        } else {
            console.error("getFundingAccountBalances FAILED, error: ", resp);
            return [];
        }
    }

    async getLinearPositions() {
        const resp = await this.client.getPositionInfo({
            category: "linear",
            settleCoin: "USDT",
        });
        if (resp.retCode === 0) {
            return resp.result.list;
        } else {
            console.error("getLinearPositions FAILED, error: ", resp);
            return [];
        }
    }

    async getLinearOpenOrders() {
        const resp = await this.client.getActiveOrders({
            category: "linear",
            settleCoin: "USDT",
        });
        if (resp.retCode === 0) {
            return resp.result.list;
        } else {
            console.error("getLinearOpenOrders FAILED, error: ", resp);
            return [];
        }
    }

    async placeLinearOrder(side, symbol, size, price, orderLinkId) {
        const resp = await this.client.submitOrder({
            category: "linear",
            symbol,
            side,
            orderType: "Limit",
            timeInForce: "PostOnly",
            price,
            qty: size,
            orderLinkId,
        });
        if (resp.retCode === 0) {
            return resp.result;
        } else {
            console.error("placeLinearOrder FAILED, error: ", resp);
            return [];
        }
    }

    async cancelAllLinearOrders(symbol) {
        let params = {
            category: "linear",
        };
        if (symbol != "") {
            params = Object.assign(params, { symbol });
        } else {
            params = Object.assign(params, { settleCoin: "USDT" });
        }
        const resp = await this.client.cancelAllOrders(params);
        if (resp.retCode === 0) {
            return resp.result.list;
        } else {
            console.error("cancelAllLinearOrders FAILED, error: ", resp);
            return [];
        }
    }

    async getLinearCommissionRate(symbol) {
        const resp = await this.client.getFeeRate({
            category: "linear",
            symbol: symbol,
        });

        if (resp.retCode === 0) {
            const info = resp.result.list;
            if (info.length > 0) {
                return info[0];
            } else {
                console.error(
                    "getLinearCommissionRate resp empty, list: ",
                    resp.result.list
                );
                return [];
            }
        } else {
            console.error("getLinearCommissionRate FAILED, error: ", resp);
            return [];
        }
    }

    async transferAsset(
        transferId,
        coin,
        amount,
        fromAccountType,
        toAccountType
    ) {
        const resp = await this.client.createInternalTransfer(
            transferId,
            coin,
            amount,
            fromAccountType,
            toAccountType
        );
        if (resp.retCode === 0) {
            return resp.result;
        } else {
            console.error("transferAsset FAILED, error: ", resp);
            return [];
        }
    }

    initWsEventHandler(handlers) {
        this.handlers = handlers;
        // Listen to events coming from websockets. This is the primary data source
        this.wsClient.on("update", (event) => {
            if (event.topic == "order") {
                try {
                    const handler = this.handlers["orders"];
                    if (handler != null) {
                        const stdOrders = this._formatOrders(event.data);
                        handler(stdOrders);
                    }
                } catch (e) {
                    console.error(e);
                }
            } else {
                console.log(event);
            }
        });

        // Optional: Listen to raw error events. Recommended.
        this.wsClient.on("error", (err) => {
            console.error("error", err);
        });
    }

    _formatOrders(orders) {
        let finalOrders = [];
        orders.forEach((o) => {
            let order = {
                symbol: o.symbol,
                clientOrderId: o.orderLinkId,
                side: o.side,
                price: parseFloat(o.price),
                filledPrice: o.avgPrice != "" ? parseFloat(o.avgPrice) : 0,
                orderStatus: o.orderStatus,
                filledQuantity: parseFloat(o.cumExecQty),
                filledNotional: parseFloat(o.cumExecValue),
                isMaker: o.timeInForce == "PostOnly" ? 1 : 0,
                orderTime: parseInt(o.updatedTime),
            };
            finalOrders.push(order);
        });
        return finalOrders;
    }

    async wsOrders() {
        await this.wsClient.subscribeV5("order", "linear", true);
    }
}
module.exports = BybitClient;
