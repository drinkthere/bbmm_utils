"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeTerminateWs =
    exports.neverGuard =
    exports.WS_ERROR_ENUM =
    exports.getUsdcWsKeyForTopic =
    exports.getMaxTopicsPerSubscribeEvent =
    exports.getWsUrl =
    exports.getWsKeyForTopic =
    exports.isPrivateWsTopic =
    exports.PUBLIC_WS_KEYS =
    exports.WS_AUTH_ON_CONNECT_KEYS =
    exports.WS_KEY_MAP =
    exports.WS_BASE_URL_MAP =
        void 0;
exports.WS_BASE_URL_MAP = {
    inverse: {
        public: {
            livenet: "wss://stream.bybit.com/realtime",
            testnet: "wss://stream-testnet.bybit.com/realtime",
        },
        private: {
            livenet: "wss://stream.bybit.com/realtime",
            testnet: "wss://stream-testnet.bybit.com/realtime",
        },
    },
    linear: {
        public: {
            livenet: "wss://stream.bybit.com/realtime_public",
            livenet2: "wss://stream.bytick.com/realtime_public",
            testnet: "wss://stream-testnet.bybit.com/realtime_public",
        },
        private: {
            livenet: "wss://stream.bybit.com/realtime_private",
            livenet2: "wss://stream.bytick.com/realtime_private",
            testnet: "wss://stream-testnet.bybit.com/realtime_private",
        },
    },
    spot: {
        public: {
            livenet: "wss://stream.bybit.com/spot/quote/ws/v1",
            livenet2: "wss://stream.bybit.com/spot/quote/ws/v2",
            testnet: "wss://stream-testnet.bybit.com/spot/quote/ws/v1",
            testnet2: "wss://stream-testnet.bybit.com/spot/quote/ws/v2",
        },
        private: {
            livenet: "wss://stream.bybit.com/spot/ws",
            testnet: "wss://stream-testnet.bybit.com/spot/ws",
        },
    },
    spotv3: {
        public: {
            livenet: "wss://stream.bybit.com/spot/public/v3",
            testnet: "wss://stream-testnet.bybit.com/spot/public/v3",
        },
        private: {
            livenet: "wss://stream.bybit.com/spot/private/v3",
            testnet: "wss://stream-testnet.bybit.com/spot/private/v3",
        },
    },
    usdcOption: {
        public: {
            livenet: "wss://stream.bybit.com/trade/option/usdc/public/v1",
            livenet2: "wss://stream.bytick.com/trade/option/usdc/public/v1",
            testnet:
                "wss://stream-testnet.bybit.com/trade/option/usdc/public/v1",
        },
        private: {
            livenet: "wss://stream.bybit.com/trade/option/usdc/private/v1",
            livenet2: "wss://stream.bytick.com/trade/option/usdc/private/v1",
            testnet:
                "wss://stream-testnet.bybit.com/trade/option/usdc/private/v1",
        },
    },
    usdcPerp: {
        public: {
            livenet: "wss://stream.bybit.com/perpetual/ws/v1/realtime_public",
            livenet2: "wss://stream.bytick.com/perpetual/ws/v1/realtime_public",
            testnet:
                "wss://stream-testnet.bybit.com/perpetual/ws/v1/realtime_public",
        },
        private: {
            livenet: "wss://stream.bybit.com/trade/option/usdc/private/v1",
            livenet2: "wss://stream.bytick.com/trade/option/usdc/private/v1",
            testnet:
                "wss://stream-testnet.bybit.com/trade/option/usdc/private/v1",
        },
    },
    unifiedOption: {
        public: {
            livenet: "wss://stream.bybit.com/option/usdc/public/v3",
            testnet: "wss://stream-testnet.bybit.com/option/usdc/public/v3",
        },
        private: {
            livenet: "wss://stream.bybit.com/unified/private/v3",
            testnet: "wss://stream-testnet.bybit.com/unified/private/v3",
        },
    },
    unifiedPerp: {
        public: {
            livenet: "useBaseSpecificEndpoint",
            testnet: "useBaseSpecificEndpoint",
        },
        private: {
            livenet: "wss://stream.bybit.com/unified/private/v3",
            testnet: "wss://stream-testnet.bybit.com/unified/private/v3",
        },
    },
    unifiedPerpUSDT: {
        public: {
            livenet: "wss://stream.bybit.com/contract/usdt/public/v3",
            testnet: "wss://stream-testnet.bybit.com/contract/usdt/public/v3",
        },
    },
    unifiedPerpUSDC: {
        public: {
            livenet: "wss://stream.bybit.com/contract/usdc/public/v3",
            testnet: "wss://stream-testnet.bybit.com/contract/usdc/public/v3",
        },
    },
    contractUSDT: {
        public: {
            livenet: "wss://stream.bybit.com/contract/usdt/public/v3",
            testnet: "wss://stream-testnet.bybit.com/contract/usdt/public/v3",
        },
        private: {
            livenet: "wss://stream.bybit.com/contract/private/v3",
            testnet: "wss://stream-testnet.bybit.com/contract/private/v3",
        },
    },
    contractInverse: {
        public: {
            livenet: "wss://stream.bybit.com/contract/inverse/public/v3",
            testnet:
                "wss://stream-testnet.bybit.com/contract/inverse/public/v3",
        },
        private: {
            livenet: "wss://stream.bybit.com/contract/private/v3",
            testnet: "wss://stream-testnet.bybit.com/contract/private/v3",
        },
    },
    v5: {
        public: {
            livenet:
                "public topics are routed internally via the public wskeys",
            testnet:
                "public topics are routed internally via the public wskeys",
        },
        private: {
            livenet: "wss://stream.bybit.com/v5/private",
            testnet: "wss://stream-testnet.bybit.com/v5/private",
        },
        trade: {
            livenet: "wss://stream.bybit.com/v5/trade",
            testnet: "wss://stream-testnet.bybit.com/v5/trade",
        },
    },
    v5SpotPublic: {
        public: {
            livenet: "wss://stream.bybit.com/v5/public/spot",
            testnet: "wss://stream-testnet.bybit.com/v5/public/spot",
        },
    },
    v5LinearPublic: {
        public: {
            livenet: "wss://stream.bybit.com/v5/public/linear",
            testnet: "wss://stream-testnet.bybit.com/v5/public/linear",
        },
    },
    v5InversePublic: {
        public: {
            livenet: "wss://stream.bybit.com/v5/public/inverse",
            testnet: "wss://stream-testnet.bybit.com/v5/public/inverse",
        },
    },
    v5OptionPublic: {
        public: {
            livenet: "wss://stream.bybit.com/v5/public/option",
            testnet: "wss://stream-testnet.bybit.com/v5/public/option",
        },
    },
};
exports.WS_KEY_MAP = {
    inverse: "inverse",
    linearPrivate: "linearPrivate",
    linearPublic: "linearPublic",
    spotPrivate: "spotPrivate",
    spotPublic: "spotPublic",
    spotV3Private: "spotV3Private",
    spotV3Public: "spotV3Public",
    usdcOptionPrivate: "usdcOptionPrivate",
    usdcOptionPublic: "usdcOptionPublic",
    usdcPerpPrivate: "usdcPerpPrivate",
    usdcPerpPublic: "usdcPerpPublic",
    unifiedPrivate: "unifiedPrivate",
    unifiedOptionPublic: "unifiedOptionPublic",
    unifiedPerpUSDTPublic: "unifiedPerpUSDTPublic",
    unifiedPerpUSDCPublic: "unifiedPerpUSDCPublic",
    contractUSDTPublic: "contractUSDTPublic",
    contractUSDTPrivate: "contractUSDTPrivate",
    contractInversePublic: "contractInversePublic",
    contractInversePrivate: "contractInversePrivate",
    v5SpotPublic: "v5SpotPublic",
    v5LinearPublic: "v5LinearPublic",
    v5InversePublic: "v5InversePublic",
    v5OptionPublic: "v5OptionPublic",
    v5Private: "v5Private",
    v5Trade: "v5Trade",
};
exports.WS_AUTH_ON_CONNECT_KEYS = [
    exports.WS_KEY_MAP.spotV3Private,
    exports.WS_KEY_MAP.usdcOptionPrivate,
    exports.WS_KEY_MAP.usdcPerpPrivate,
    exports.WS_KEY_MAP.unifiedPrivate,
    exports.WS_KEY_MAP.contractUSDTPrivate,
    exports.WS_KEY_MAP.contractInversePrivate,
    exports.WS_KEY_MAP.v5Private,
    exports.WS_KEY_MAP.v5Trade,
];
exports.PUBLIC_WS_KEYS = [
    exports.WS_KEY_MAP.linearPublic,
    exports.WS_KEY_MAP.spotPublic,
    exports.WS_KEY_MAP.spotV3Public,
    exports.WS_KEY_MAP.usdcOptionPublic,
    exports.WS_KEY_MAP.usdcPerpPublic,
    exports.WS_KEY_MAP.unifiedOptionPublic,
    exports.WS_KEY_MAP.unifiedPerpUSDTPublic,
    exports.WS_KEY_MAP.unifiedPerpUSDCPublic,
    exports.WS_KEY_MAP.contractUSDTPublic,
    exports.WS_KEY_MAP.contractInversePublic,
    exports.WS_KEY_MAP.v5SpotPublic,
    exports.WS_KEY_MAP.v5LinearPublic,
    exports.WS_KEY_MAP.v5InversePublic,
    exports.WS_KEY_MAP.v5OptionPublic,
];
/** Used to automatically determine if a sub request should be to the public or private ws (when there's two) */
const PRIVATE_TOPICS = [
    "stop_order",
    "outboundAccountInfo",
    "executionReport",
    "ticketInfo",
    // copy trading apis
    "copyTradePosition",
    "copyTradeOrder",
    "copyTradeExecution",
    "copyTradeWallet",
    // usdc options
    "user.openapi.option.position",
    "user.openapi.option.trade",
    "user.order",
    "user.openapi.option.order",
    "user.service",
    "user.openapi.greeks",
    "user.mmp.event",
    // usdc perps
    "user.openapi.perp.position",
    "user.openapi.perp.trade",
    "user.openapi.perp.order",
    "user.service",
    // unified margin
    "user.position.unifiedAccount",
    "user.execution.unifiedAccount",
    "user.order.unifiedAccount",
    "user.wallet.unifiedAccount",
    "user.greeks.unifiedAccount",
    // contract v3
    "user.position.contractAccount",
    "user.execution.contractAccount",
    "user.order.contractAccount",
    "user.wallet.contractAccount",
    // v5
    "position",
    "execution",
    "order",
    "wallet",
    "greeks",
    // v5 trade
    "order.create",
    "order.cancel",
];
function isPrivateWsTopic(topic) {
    return PRIVATE_TOPICS.includes(topic);
}
exports.isPrivateWsTopic = isPrivateWsTopic;
function getWsKeyForTopic(market, topic, isPrivate, category) {
    const isPrivateTopic = isPrivate === true || PRIVATE_TOPICS.includes(topic);
    switch (market) {
        case "inverse": {
            return exports.WS_KEY_MAP.inverse;
        }
        case "linear": {
            return isPrivateTopic
                ? exports.WS_KEY_MAP.linearPrivate
                : exports.WS_KEY_MAP.linearPublic;
        }
        case "spot": {
            return isPrivateTopic
                ? exports.WS_KEY_MAP.spotPrivate
                : exports.WS_KEY_MAP.spotPublic;
        }
        case "spotv3": {
            return isPrivateTopic
                ? exports.WS_KEY_MAP.spotV3Private
                : exports.WS_KEY_MAP.spotV3Public;
        }
        case "usdcOption": {
            return isPrivateTopic
                ? exports.WS_KEY_MAP.usdcOptionPrivate
                : exports.WS_KEY_MAP.usdcOptionPublic;
        }
        case "usdcPerp": {
            return isPrivateTopic
                ? exports.WS_KEY_MAP.usdcPerpPrivate
                : exports.WS_KEY_MAP.usdcPerpPublic;
        }
        case "unifiedOption": {
            return isPrivateTopic
                ? exports.WS_KEY_MAP.unifiedPrivate
                : exports.WS_KEY_MAP.unifiedOptionPublic;
        }
        case "unifiedPerp": {
            if (isPrivateTopic) {
                return exports.WS_KEY_MAP.unifiedPrivate;
            }
            const upperTopic = topic.toUpperCase();
            if (upperTopic.indexOf("USDT") !== -1) {
                return exports.WS_KEY_MAP.unifiedPerpUSDTPublic;
            }
            if (
                upperTopic.indexOf("USDC") !== -1 ||
                upperTopic.indexOf("PERP") !== -1
            ) {
                return exports.WS_KEY_MAP.unifiedPerpUSDCPublic;
            }
            throw new Error(
                `Failed to determine wskey for unified perps topic: "${topic}"`
            );
        }
        case "contractInverse": {
            return isPrivateTopic
                ? exports.WS_KEY_MAP.contractInversePrivate
                : exports.WS_KEY_MAP.contractInversePublic;
        }
        case "contractUSDT": {
            return isPrivateTopic
                ? exports.WS_KEY_MAP.contractUSDTPrivate
                : exports.WS_KEY_MAP.contractUSDTPublic;
        }
        case "v5": {
            if (isPrivateTopic) {
                if (topic == "order.create" || topic == "order.cancel") {
                    return exports.WS_KEY_MAP.v5Trade;
                }
                return exports.WS_KEY_MAP.v5Private;
            }
            switch (category) {
                case "spot": {
                    return exports.WS_KEY_MAP.v5SpotPublic;
                }
                case "linear": {
                    return exports.WS_KEY_MAP.v5LinearPublic;
                }
                case "inverse": {
                    return exports.WS_KEY_MAP.v5InversePublic;
                }
                case "option": {
                    return exports.WS_KEY_MAP.v5OptionPublic;
                }
                case undefined: {
                    throw new Error("Category cannot be undefined");
                }
                default: {
                    throw neverGuard(
                        category,
                        "getWsKeyForTopic(v5): Unhandled v5 category"
                    );
                }
            }
        }
        default: {
            throw neverGuard(market, "getWsKeyForTopic(): Unhandled market");
        }
    }
}
exports.getWsKeyForTopic = getWsKeyForTopic;
function getWsUrl(wsKey, wsClientOptions, logger) {
    const wsUrl = wsClientOptions.wsUrl;
    if (wsUrl) {
        return wsUrl;
    }
    // https://bybit-exchange.github.io/docs/v5/demo
    const isDemoTrading = wsClientOptions.demoTrading;
    if (isDemoTrading) {
        return "wss://stream-demo.bybit.com/v5/private";
    }
    const isTestnet = wsClientOptions.testnet;
    const networkKey = isTestnet ? "testnet" : "livenet";
    switch (wsKey) {
        case exports.WS_KEY_MAP.linearPublic: {
            return postGetWsUrl(exports.WS_BASE_URL_MAP.linear.public[networkKey], wsClientOptions.wsBaseUrl);
        }
        case exports.WS_KEY_MAP.linearPrivate: {
            return postGetWsUrl(exports.WS_BASE_URL_MAP.linear.private[networkKey], wsClientOptions.wsBaseUrl);
        }
        case exports.WS_KEY_MAP.spotPublic: {
            return postGetWsUrl(exports.WS_BASE_URL_MAP.spot.public[networkKey], wsClientOptions.wsBaseUrl);
        }
        case exports.WS_KEY_MAP.spotPrivate: {
            return postGetWsUrl(exports.WS_BASE_URL_MAP.spot.private[networkKey], wsClientOptions.wsBaseUrl);
        }
        case exports.WS_KEY_MAP.spotV3Public: {
            return postGetWsUrl(exports.WS_BASE_URL_MAP.spotv3.public[networkKey], wsClientOptions.wsBaseUrl);
        }
        case exports.WS_KEY_MAP.spotV3Private: {
            return postGetWsUrl(exports.WS_BASE_URL_MAP.spotv3.private[networkKey], wsClientOptions.wsBaseUrl);
        }
        case exports.WS_KEY_MAP.inverse: {
            // private and public are on the same WS connection
            return postGetWsUrl(exports.WS_BASE_URL_MAP.inverse.public[networkKey], wsClientOptions.wsBaseUrl);
        }
        case exports.WS_KEY_MAP.usdcOptionPublic: {
            return postGetWsUrl(exports.WS_BASE_URL_MAP.usdcOption.public[networkKey], wsClientOptions.wsBaseUrl);
        }
        case exports.WS_KEY_MAP.usdcOptionPrivate: {
            return postGetWsUrl(exports.WS_BASE_URL_MAP.usdcOption.private[networkKey], wsClientOptions.wsBaseUrl);
        }
        case exports.WS_KEY_MAP.usdcPerpPublic: {
            return postGetWsUrl(exports.WS_BASE_URL_MAP.usdcPerp.public[networkKey], wsClientOptions.wsBaseUrl);
        }
        case exports.WS_KEY_MAP.usdcPerpPrivate: {
            return postGetWsUrl(exports.WS_BASE_URL_MAP.usdcPerp.private[networkKey], wsClientOptions.wsBaseUrl);
        }
        case exports.WS_KEY_MAP.unifiedOptionPublic: {
            return postGetWsUrl(exports.WS_BASE_URL_MAP.unifiedOption.public[networkKey], wsClientOptions.wsBaseUrl);
        }
        case exports.WS_KEY_MAP.unifiedPerpUSDTPublic: {
            return postGetWsUrl(exports.WS_BASE_URL_MAP.unifiedPerpUSDT.public[networkKey], wsClientOptions.wsBaseUrl);
        }
        case exports.WS_KEY_MAP.unifiedPerpUSDCPublic: {
            return postGetWsUrl(exports.WS_BASE_URL_MAP.unifiedPerpUSDC.public[networkKey], wsClientOptions.wsBaseUrl);
        }
        case exports.WS_KEY_MAP.unifiedPrivate: {
            return postGetWsUrl(exports.WS_BASE_URL_MAP.unifiedPerp.private[networkKey], wsClientOptions.wsBaseUrl);
        }
        case exports.WS_KEY_MAP.contractInversePrivate: {
            return postGetWsUrl(exports.WS_BASE_URL_MAP.contractInverse.private[networkKey], wsClientOptions.wsBaseUrl);
        }
        case exports.WS_KEY_MAP.contractInversePublic: {
            return postGetWsUrl(exports.WS_BASE_URL_MAP.contractInverse.public[networkKey], wsClientOptions.wsBaseUrl);
        }
        case exports.WS_KEY_MAP.contractUSDTPrivate: {
            return postGetWsUrl(exports.WS_BASE_URL_MAP.contractUSDT.private[networkKey], wsClientOptions.wsBaseUrl);
        }
        case exports.WS_KEY_MAP.contractUSDTPublic: {
            return postGetWsUrl(exports.WS_BASE_URL_MAP.contractUSDT.public[networkKey], wsClientOptions.wsBaseUrl);
        }
        case exports.WS_KEY_MAP.v5Private: {
            return postGetWsUrl(exports.WS_BASE_URL_MAP.v5.private[networkKey], wsClientOptions.wsBaseUrl);
        }
        case exports.WS_KEY_MAP.v5Trade: {
            return postGetWsUrl(exports.WS_BASE_URL_MAP.v5.trade[networkKey], wsClientOptions.wsBaseUrl);
        }
        case exports.WS_KEY_MAP.v5SpotPublic: {
            return postGetWsUrl(exports.WS_BASE_URL_MAP.v5SpotPublic.public[networkKey], wsClientOptions.wsBaseUrl);
        }
        case exports.WS_KEY_MAP.v5LinearPublic: {
            return postGetWsUrl(exports.WS_BASE_URL_MAP.v5LinearPublic.public[networkKey], wsClientOptions.wsBaseUrl);
        }
        case exports.WS_KEY_MAP.v5InversePublic: {
            return postGetWsUrl(exports.WS_BASE_URL_MAP.v5InversePublic.public[networkKey], wsClientOptions.wsBaseUrl);
        }
        case exports.WS_KEY_MAP.v5OptionPublic: {
            return postGetWsUrl(exports.WS_BASE_URL_MAP.v5OptionPublic.public[networkKey], wsClientOptions.wsBaseUrl);
        }
        default: {
            logger.error("getWsUrl(): Unhandled wsKey: ", {
                category: "bybit-ws",
                wsKey,
            });
            throw neverGuard(wsKey, "getWsUrl(): Unhandled wsKey");
        }
    }
}

function postGetWsUrl(url, intranetWsUrl) {
    if (intranetWsUrl == "" || intranetWsUrl == undefined) {
        return url
    }
    
    
    const oldUrl = "wss://stream.bybit.com";
    return url.replace(new RegExp(oldUrl, 'g'), intranetWsUrl);
}
exports.getWsUrl = getWsUrl;
function getMaxTopicsPerSubscribeEvent(market, wsKey) {
    const topicsPerEventSpot = 10;
    switch (market) {
        case "inverse":
        case "linear":
        case "usdcOption":
        case "usdcPerp":
        case "unifiedOption":
        case "unifiedPerp":
        case "spot":
        case "contractInverse":
        case "contractUSDT":
        case "v5": {
            if (wsKey === exports.WS_KEY_MAP.v5SpotPublic) {
                return topicsPerEventSpot;
            }
            return null;
        }
        case "spotv3": {
            return topicsPerEventSpot;
        }
        default: {
            throw neverGuard(market, "getWsKeyForTopic(): Unhandled market");
        }
    }
}
exports.getMaxTopicsPerSubscribeEvent = getMaxTopicsPerSubscribeEvent;
function getUsdcWsKeyForTopic(topic, subGroup) {
    const isPrivateTopic = PRIVATE_TOPICS.includes(topic);
    if (subGroup === "option") {
        return isPrivateTopic
            ? exports.WS_KEY_MAP.usdcOptionPrivate
            : exports.WS_KEY_MAP.usdcOptionPublic;
    }
    return isPrivateTopic
        ? exports.WS_KEY_MAP.usdcOptionPrivate
        : exports.WS_KEY_MAP.usdcOptionPublic;
    // return isPrivateTopic
    //   ? WS_KEY_MAP.usdcPerpPrivate
    //   : WS_KEY_MAP.usdcPerpPublic;
}
exports.getUsdcWsKeyForTopic = getUsdcWsKeyForTopic;
exports.WS_ERROR_ENUM = {
    NOT_AUTHENTICATED_SPOT_V3: "-1004",
    API_ERROR_GENERIC: "10001",
    API_SIGN_AUTH_FAILED: "10003",
    USDC_OPTION_AUTH_FAILED: "3303006",
};
function neverGuard(x, msg) {
    return new Error(`Unhandled value exception "x", ${msg}`);
}
exports.neverGuard = neverGuard;
/**
 * #305: ws.terminate() is undefined in browsers.
 * This only works in node.js, not in browsers.
 * Does nothing if `ws` is undefined.
 */
function safeTerminateWs(ws) {
    // #305: ws.terminate() undefined in browsers
    if (ws && typeof ws["terminate"] === "function") {
        ws.terminate();
    }
}
exports.safeTerminateWs = safeTerminateWs;
//# sourceMappingURL=websocket-util.js.map
