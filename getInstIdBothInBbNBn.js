const path = require("path");
const { fileExists, writeStringToFile } = require("./utils/run");

const cfgFile = `./configs/config.json`;
if (!fileExists(cfgFile)) {
    log(`config file ${cfgFile} does not exits`);
    process.exit();
}
const configs = require(cfgFile);

const BybitClient = require("./clients/bybit");
const BinanceClient = require("./clients/binance");
const keyIndex = 0;
let options = {
    keyIndex,
};
const bybitClient = new BybitClient(options);
const binanceClient = new BinanceClient({
    APIKEY: "",
    APISECRET: "",
});
let bybitLinearConfigMap = {};
let bnFuturesAssetMap = {};
const directory = "./configs";
const getBybitAssetSet = async (category) => {
    const insts = await bybitClient.getInstruments(category);

    let assetsSet = new Set();
    for (let inst of insts) {
        var asset;
        if (category == "linear") {
            asset = inst.baseCoin;
            bybitLinearConfigMap[inst.instID] = inst;
        } else {
            asset = inst.baseCoin;
        }
        assetsSet.add(asset);
    }
    return assetsSet;
};

const getBinanceAssetsSet = async (instType) => {
    var result;
    let assetSet = new Set();
    if (instType == "FUTURES") {
        // 获取binance支持的futures
        result = await binanceClient.futuresInstruments();
    } else if (instType == "SPOT") {
        result = await binanceClient.spotInstruments();
    }

    for (let item of result) {
        assetSet.add(item.baseAsset);
    }
    return assetSet;
};

const formatBinanceFuturesAssets = (bnFuturesAssets) => {
    let assetSet = new Set();
    for (let asset of bnFuturesAssets) {
        const formattedAsset = asset.replace("1000", "");
        bnFuturesAssetMap[formattedAsset] = asset;
        assetSet.add(formattedAsset);
    }
    return assetSet;
};

function calculateOrderSize(
    price,
    decimals,
    minSize,
    contractValue,
    contractTicker
) {
    // 格式化价格，保留小数位数
    const formattedPrice = parseFloat(price.toFixed(decimals));

    // 计算下单张数
    let targetOrderSize = orderAmount / (formattedPrice * contractValue);

    // 确保下单张数为最小变动的整数倍
    targetOrderSize =
        Math.round(targetOrderSize / contractTicker) * contractTicker;

    // 确保下单张数不低于最小合约下单张数
    targetOrderSize = Math.max(targetOrderSize, minSize);

    return targetOrderSize;
}

const main = async () => {
    try {
        const linerInstSets = await getBybitAssetSet("linear");
        const spotInstSets = await getBybitAssetSet("spot");

        //获取binance支持的futures
        let bnFuturesAssets = await getBinanceAssetsSet("FUTURES");
        bnFuturesAssets = formatBinanceFuturesAssets(bnFuturesAssets);

        let bnSpotAssets = await getBinanceAssetsSet("SPOT");

        const bybitLinearInstrument = [];
        for (let asset of linerInstSets) {
            if (
                spotInstSets.has(asset) &&
                bnFuturesAssets.has(asset) &&
                bnSpotAssets.has(asset)
            ) {
                bybitLinearInstrument.push(`${asset}USDT`);
            }
        }
        console.log(bybitLinearInstrument, bybitLinearInstrument.length);
        let formattedJSON = JSON.stringify(bybitLinearInstrument, null, 4);
        const filePath = path.join(directory, "inst.json");
        writeStringToFile(filePath, formattedJSON);
    } catch (e) {
        console.error(e);
    }
};
main();
