const { RestClientV5, WebsocketClient } = require("bybit-api");
const { v4: uuidv4 } = require("uuid");
const { sleep } = require("../utils/run");
const { genClientOrderId } = require("../utils/common");

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
        config["key"] = apiKeyArr[keyIndex];
        config["secret"] = apiSecretArr[keyIndex];
        if (options.intranet) {
            config["baseUrl"] =
                "https://4y3rm6qs8pzu2iwk28yq74hyxftwbcib.bybit.com";
            config["wsBaseUrl"] =
                "wss://z6f8wpdq5grrtyo6cgd26quu6y3jjtmx.bybit-aws.com";
        }

        if (options.localAddress != "") {
            config["localAddress"] = options.localAddress;
        }
        //console.log(config);
        let restConfig = Object.assign(config, {
            recv_window: 10000,
            parseAPIRateLimits: true,
        });
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

    async getCollateralInfo() {
        const resp = await this.client.getCollateralInfo();
        if (resp.retCode === 0) {
            return resp.result.list;
        } else {
            console.error("getCollateralInfo FAILED, error: ", resp);
            return [];
        }
    }

    async batchSetCollateralCoin(coins) {
        const resp = await this.client.batchSetCollateralCoin({
            request: coins,
        });
        if (resp.retCode === 0) {
            return resp.result.list;
        } else {
            console.error("batchSetCollateralCoin FAILED, error: ", resp);
            return [];
        }
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

    async getInstruments(category) {
        const resp = await this.client.getInstrumentsInfo({
            category,
        });
        if (resp.retCode === 0) {
            return resp.result.list
                .filter(
                    (item) =>
                        item.status == "Trading" &&
                        item.quoteCoin == "USDT" &&
                        !item.symbol.startsWith("100")
                )
                .map((item) => {
                    return {
                        instID: item.symbol,
                        baseCoin: item.baseCoin,
                        quoteCoin: item.quoteCoin,
                        priceTickSize: item.priceFilter.tickSize,
                        qtyTickSize: item.lotSizeFilter.qtyStep,
                        maxLmtAmt: item.lotSizeFilter.postOnlyMaxOrderQty,
                    };
                });
        } else {
            console.error("getInstruments FAILED, error: ", resp);
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
        let allOrders = [];
        let cursor = ""; // 初始游标
        let limit = 50; // 每页获取的订单数量

        do {
            const resp = await this.client.getActiveOrders({
                category: "linear",
                settleCoin: "USDT",
                limit,
                cursor,
            });
            // 检查响应中的订单数据
            if (resp && resp.retCode === 0 && resp.result.list.length > 0) {
                allOrders = allOrders.concat(resp.result.list); // 将当前页的订单添加到总订单列表
            }

            // 更新游标
            cursor = resp.result.nextPageCursor; // 获取下一页的游标
        } while (cursor); // 当还有游标时继续循环

        return allOrders;
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
            return resp;
        } else {
            console.error("placeLinearOrder FAILED, error: ", resp);
            return [];
        }
    }

    async batchPlaceLinearOrder(orders) {
        const resp = await this.client.batchSubmitOrders("linear", orders);
        if (resp.retCode === 0) {
            return resp;
        } else {
            console.error("batchPlaceLinearOrder FAILED, error: ", resp);
            return [];
        }
    }

    async cancelLinearOrder(symbol, orderLinkId) {
        let params = {
            category: "linear",
            symbol,
            orderLinkId,
        };

        const resp = await this.client.cancelOrder(params);
        if (resp.retCode === 0) {
            return resp;
        } else {
            console.error("cancelLinearOrder FAILED, error: ", resp);
            return [];
        }
    }

    async batchCancelLinearOrder(orders) {
        const resp = await this.client.batchCancelOrders("linear", orders);
        if (resp.retCode === 0) {
            return resp;
        } else {
            console.error("batchCancelLinearOrder FAILED, error: ", resp);
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

    async uniTransferAsset(
        transferId,
        coin,
        amount,
        fromMemberId,
        toMemberId,
        fromAccountType,
        toAccountType
    ) {
        const resp = await this.client.createUniversalTransfer(
            transferId,
            coin,
            amount,
            fromMemberId,
            toMemberId,
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

    async setMarginMode(marginMode) {
        const resp = await this.client.setMarginMode(marginMode);
        if (resp.retCode === 0) {
            return resp.result;
        } else {
            console.error("setMarginMode FAILED, error: ", resp);
            return [];
        }
    }

    async getAccountInfo() {
        const resp = await this.client.getAccountInfo();
        if (resp.retCode === 0) {
            return resp.result;
        } else {
            console.error("listSubAccount FAILED, error: ", resp);
            return [];
        }
    }

    async upgradeAccount(username, memberType = 1) {
        const resp = await this.client.upgradeToUnifiedAccount({});
        if (resp.retCode === 0) {
            return resp.result;
        } else {
            console.error("upgradeAccount FAILED, error: ", resp);
            return [];
        }
    }

    async listSubAccount() {
        const resp = await this.client.getSubUIDList();
        if (resp.retCode === 0) {
            return resp.result;
        } else {
            console.error("listSubAccount FAILED, error: ", resp);
            return [];
        }
    }

    async createSubAccount(username, note) {
        const resp = await this.client.createSubMember({
            username,
            memberType: 1,
            isUta: true,
            note,
        });
        if (resp.retCode === 0) {
            return resp.result;
        } else {
            console.error("createSubAccount FAILED, error: ", resp);
            return [];
        }
    }

    async getQueryApiKey() {
        const resp = await this.client.getQueryApiKey();
        if (resp.retCode === 0) {
            return resp.result;
        } else {
            console.error("getQueryApiKey FAILED, error: ", resp);
            return [];
        }
    }

    async listSubAccountApiKeys(subMemberId) {
        const resp = await this.client.getSubAccountAllApiKeys({ subMemberId });
        if (resp.retCode === 0) {
            return resp.result.result;
        } else {
            console.error("listSubAccountApiKeys FAILED, error: ", resp);
            return [];
        }
    }

    async createSubAccountApiKey(subuid, note, readOnly, ips, permissions) {
        const resp = await this.client.createSubUIDAPIKey({
            subuid,
            note,
            readOnly,
            ips,
            permissions,
        });
        if (resp.retCode === 0) {
            return resp.result;
        } else {
            console.error("createSubAccountApiKey FAILED, error: ", resp);
            return [];
        }
    }

    async deleteSubAccountApiKey(apiKey) {
        const resp = await this.client.deleteSubApiKey({ apikey: apiKey });
        console.log(resp);
        if (resp.retCode === 0) {
            return resp.result;
        } else {
            console.error("deleteSubAccountApiKey FAILED, error: ", resp);
            return [];
        }
    }

    async updateSubAccountApiKey(apiKey, readOnly, ips, permissions) {
        const resp = await this.client.updateSubApiKey({
            apikey: apiKey,
            readOnly,
            ips,
            permissions,
        });
        console.log(resp);
        if (resp.retCode === 0) {
            return resp.result;
        } else {
            console.error("updateSubAccountApiKey FAILED, error: ", resp);
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

    async wsConnectTrade() {
        return this.wsClient.connectTrade();
    }

    async wsPlaceLinearOrder(symbol, side, price, qty, orderLinkId) {
        const reqId = genClientOrderId();
        const orders = [
            {
                category: "linear",
                symbol,
                side,
                price,
                qty,
                orderLinkId: orderLinkId,
                orderType: "Limit",
                timeInForce: "PostOnly",
            },
        ];
        return await this.wsClient.wsPlaceOrders(
            reqId,
            "linear",
            "order.create",
            orders
        );
    }

    async wsCancelLinearOrder(symbol, orderLinkId) {
        const reqId = genClientOrderId();
        const orders = [
            {
                category: "linear",
                symbol,
                orderLinkId: orderLinkId,
            },
        ];
        return await this.wsClient.wsCancelOrders(
            reqId,
            "linear",
            "order.cancel",
            orders
        );
    }
}
module.exports = BybitClient;
