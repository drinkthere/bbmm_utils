const path = require("path");
const {
    getDecimals,
    deleteFilesInDirectory,
    writeStringToFile,
    fileExists,
} = require("./utils/run");

const cfgFile = `./configs/config.json`;
if (!fileExists(cfgFile)) {
    log(`config file ${cfgFile} does not exits`);
    process.exit();
}
const configs = require(cfgFile);
//let bybitLinearInsts = require("./configs/inst.json");

const BybitClient = require("./clients/bybit");
const BinanceClient = require("./clients/binance");
const keyIndex = 0;
let options = {
    keyIndex,
};
const bybitClient = new BybitClient(options);
let bybitLinearConfigMap = {};
let bybitLinearTickersMap = {};
const directory = "./mm-config";
let bb011Config = require("../bbmm/config/config-bb011.json");
let bb012Config = require("../bbmm/config/config-bb012.json");
let bb013Config = require("../bbmm/config/config-bb013.json");
let bb014Config = require("../bbmm/config/config-bb014.json");
let bb015Config = require("../bbmm/config/config-bb015.json");
let bb016Config = require("../bbmm/config/config-bb016.json");
let bb017Config = require("../bbmm/config/config-bb017.json");
let bb018Config = require("../bbmm/config/config-bb018.json");
let bb019Config = require("../bbmm/config/config-bb019.json");
let bb020Config = require("../bbmm/config/config-bb020.json");
let bb021Config = require("../bbmm/config/config-bb021.json");
let bb022Config = require("../bbmm/config/config-bb022.json");
let bb023Config = require("../bbmm/config/config-bb023.json");
let bb024Config = require("../bbmm/config/config-bb024.json");
let bb025Config = require("../bbmm/config/config-bb025.json");
let bb026Config = require("../bbmm/config/config-bb026.json");
let bb027Config = require("../bbmm/config/config-bb027.json");
let bb028Config = require("../bbmm/config/config-bb028.json");
let bb029Config = require("../bbmm/config/config-bb029.json");
let bb030Config = require("../bbmm/config/config-bb030.json");
let bb031Config = require("../bbmm/config/config-bb031.json");
let bb032Config = require("../bbmm/config/config-bb032.json");
let bb033Config = require("../bbmm/config/config-bb033.json");
let fbgbb008Config = require("../bbmm/config/config-fbgbb008.json");
let fbgbb009Config = require("../bbmm/config/config-fbgbb009.json");
let fbgbb010Config = require("../bbmm/config/config-fbgbb010.json");
// 定义参数=========================================================
const uPerOrderMap = {
    "config-bb011.json": 500,
    "config-bb012.json": 500,
    "config-bb013.json": 500,
    "config-bb014.json": 500,
    "config-bb015.json": 500,
    "config-bb016.json": 500,
    "config-bb017.json": 500,
    "config-bb018.json": 500,
    "config-bb019.json": 500,
    "config-bb020.json": 500,
    "config-bb021.json": 500,
    "config-bb022.json": 500,
    "config-bb023.json": 500,
    "config-bb024.json": 500,
    "config-bb025.json": 500,
    "config-bb026.json": 500,
    "config-bb027.json": 500,
    "config-bb028.json": 500,
    "config-bb029.json": 500,
    "config-bb030.json": 500,
    "config-bb031.json": 500,
    "config-bb032.json": 500,
    "config-bb033.json": 500,
    "config-fbgbb008.json": 1000,
    "config-fbgbb009.json": 1000,
    "config-fbgbb010.json": 1000,
};
const firstOrderMargin = 0.0005; // 第一单距离最大（小forBid）价格的距离
const firstOrderRangePercent = 0.0005;
const gapSizePercent = 0.0005;
const forgivePercentMap = {
    "config-bb011.json": 0.9992,
    "config-bb012.json": 0.9992,
    "config-bb013.json": 0.9992,
    "config-bb014.json": 0.9994,
    "config-bb015.json": 0.9994,
    "config-bb016.json": 0.9994,
    "config-bb017.json": 0.9996,
    "config-bb018.json": 0.9996,
    "config-bb019.json": 0.9996,
    "config-bb020.json": 0.9988,
    "config-bb021.json": 0.9988,
    "config-bb022.json": 0.9986,
    "config-bb023.json": 0.9986,
    "config-bb024.json": 0.9986,
    "config-bb025.json": 0.9992,
    "config-bb026.json": 0.9992,
    "config-bb027.json": 0.9992,
    "config-bb028.json": 0.9994,
    "config-bb029.json": 0.9994,
    "config-bb030.json": 0.9994,
    "config-bb031.json": 0.9996,
    "config-bb032.json": 0.9996,
    "config-bb033.json": 0.9996,
    "config-fbgbb008.json": 0.9992,
    "config-fbgbb009.json": 0.9992,
    "config-fbgbb010.json": 0.9992,
};
const tickerShift = 0.000025;
const maxOrderNum = 3;
const farOrderNum = 5; // 比maxOrderNum大一点就可以，避免浪费api
const volatilityE = 0.75;
const volatilityDMap = {
    "config-bb011.json": 4,
    "config-bb012.json": 4,
    "config-bb013.json": 4,
    "config-bb014.json": 4,
    "config-bb015.json": 4,
    "config-bb016.json": 4,
    "config-bb017.json": 4,
    "config-bb018.json": 4,
    "config-bb019.json": 4,
    "config-bb020.json": 4,
    "config-bb021.json": 4,
    "config-bb022.json": 4,
    "config-bb023.json": 4,
    "config-bb024.json": 4,
    "config-bb025.json": 4.5,
    "config-bb026.json": 4.5,
    "config-bb027.json": 4.5,
    "config-bb028.json": 4.5,
    "config-bb029.json": 4.5,
    "config-bb030.json": 4.5,
    "config-bb031.json": 4.5,
    "config-bb032.json": 4.5,
    "config-bb033.json": 4.5,
    "config-fbgbb008.json": 4,
    "config-fbgbb009.json": 4,
    "config-fbgbb010.json": 4,
};
const volatilityG = 2000;
const minimumTickerShiftMulti = 2; // 这里用的是倍数，不是原始配置文件中的绝对值，因为contractNum是计算出来的，所以用倍数比较好，相当于 2 * contractNumber
const maximumTickerShiftMulti = 8; // 这里用的是倍数，不是原始配置文件中的绝对值，因为contractNum是计算出来的，所以用倍数比较好，相当于 4 * contractNumber
const positionReduceFactorMulti = 2; // 这里用的是倍数，不是原始配置文件中的绝对值，因为contractNum是计算出来的，所以用倍数比较好，相当于 2 * contractNumber
const maxContractNumMulti = 50; // 这里用的是倍数，不是原始配置文件中的绝对值，因为contractNum是计算出来的，所以用倍数比较好，相当于 100 * contractNumber
const breakEvenX = 0.003;

const genBybitLinearTickersMap = async () => {
    bybitLinearTickersMap = await bybitClient.getLinearTickers();
};

const genBybitLinearMap = async () => {
    const insts = await bybitClient.getInstruments("linear");
    for (let inst of insts) {
        var asset;
        asset = inst.baseCoin;
        bybitLinearConfigMap[asset] = inst;
    }
};

function calculateContractNum(uPerorder, instInfo, tickerInfo) {
    const price = tickerInfo.askPrice; // ask价格高一些，用高的价格计算
    let qty = uPerorder / price;
    const minSize = instInfo.qtyTickSize;
    const minSizeStr = minSize.toString();
    const minSizeDecimalPlaces = minSizeStr.includes(".")
        ? minSizeStr.split(".")[1].length
        : 0;

    // 计算调整因子
    const factor = Math.pow(10, minSizeDecimalPlaces);

    // 四舍五入 qty 到指定的小数位数
    qty = Math.round(qty * factor) / factor;

    // 四舍五入到 minSize 的整数倍
    qty = Math.floor(qty / minSize) * minSize; // 向下取整到最近的 minSize 的整数倍

    // 确保 qty 至少为 minSize
    qty = Math.max(qty, minSize);
    decimals = getDecimals(minSize);
    return parseFloat(qty.toFixed(decimals));
    // // 如果 qty 是整数，返回整数
    // return qty % 1 === 0 ? Math.floor(qty) : qty;
}

const main = async () => {
    try {
        deleteFilesInDirectory(directory);
        await genBybitLinearTickersMap();
        await genBybitLinearMap();
        genConfigFile("config-bb011.json", bb011Config);
        genConfigFile("config-bb012.json", bb012Config);
        genConfigFile("config-bb013.json", bb013Config);
        genConfigFile("config-bb014.json", bb014Config);
        genConfigFile("config-bb015.json", bb015Config);
        genConfigFile("config-bb016.json", bb016Config);
        genConfigFile("config-bb017.json", bb017Config);
        genConfigFile("config-bb018.json", bb018Config);
        genConfigFile("config-bb019.json", bb019Config);
        genConfigFile("config-bb020.json", bb020Config);
        genConfigFile("config-bb021.json", bb021Config);
        genConfigFile("config-bb022.json", bb022Config);
        genConfigFile("config-bb023.json", bb023Config);
        genConfigFile("config-bb024.json", bb024Config);
        genConfigFile("config-bb025.json", bb025Config);
        genConfigFile("config-bb026.json", bb026Config);
        genConfigFile("config-bb027.json", bb027Config);
        genConfigFile("config-bb028.json", bb028Config);
        genConfigFile("config-bb029.json", bb029Config);
        genConfigFile("config-bb030.json", bb030Config);
        genConfigFile("config-bb031.json", bb031Config);
        genConfigFile("config-bb032.json", bb032Config);
        genConfigFile("config-bb033.json", bb033Config);
        genConfigFile("config-fbgbb008.json", fbgbb008Config);
        genConfigFile("config-fbgbb009.json", fbgbb009Config);
        genConfigFile("config-fbgbb010.json", fbgbb010Config);
    } catch (e) {
        console.error(e);
    }
};
const genConfigFile = (filename, configs) => {
    // let insts = [];
    // if (
    //     [
    //         "config-bb011.json",
    //         "config-bb014.json",
    //         "config-bb017.json",
    //     ].includes(filename)
    // ) {
    //     insts = bybitLinearInsts.slice(0, 50);
    // } else if (
    //     [
    //         "config-bb012.json",
    //         "config-bb015.json",
    //         "config-bb018.json",
    //     ].includes(filename)
    // ) {
    //     insts = bybitLinearInsts.slice(50, 100);
    // } else if (
    //     [
    //         "config-bb013.json",
    //         "config-bb016.json",
    //         "config-bb019.json",
    //     ].includes(filename)
    // ) {
    //     insts = bybitLinearInsts.slice(100);
    // }
    let insts = configs.InstIDs;
    instConfigs = {};
    for (let inst of insts) {
        const asset = inst.replace("USDT", "");
        const instInfo = bybitLinearConfigMap[asset];
        const tickerInfo = bybitLinearTickersMap[inst];
        const uPerOrder = uPerOrderMap[filename];
        const volatilityD = volatilityDMap[filename];
        const forgivePercent = forgivePercentMap[filename];
        const contractNum = calculateContractNum(
            uPerOrder,
            instInfo,
            tickerInfo
        );
        instConfigs[inst] = {
            ContractNum: contractNum,
            VolPerCont: 1,
            BaseAsset: asset,
            Leverage: 10,
            EffectiveNum: parseFloat(instInfo.qtyTickSize),
            Precision: [
                getDecimals(instInfo.priceTickSize),
                getDecimals(instInfo.qtyTickSize),
            ],
            FirstOrderMargin: firstOrderMargin,
            FirstOrderRangePercent: firstOrderRangePercent,
            GapSizePercent: gapSizePercent,
            ForgivePercent: forgivePercent,
            TickerShift: tickerShift,
            MaxOrderNum: maxOrderNum,
            FarOrderNum: farOrderNum,
            VolatilityE: volatilityE,
            VolatilityD: volatilityD,
            VolatilityG: volatilityG,
            MinimumTickerShift: minimumTickerShiftMulti * contractNum,
            MaximumTickerShift: maximumTickerShiftMulti * contractNum,
            PositionReduceFactor: positionReduceFactorMulti * contractNum,
            MaxContractNum: maxContractNumMulti * contractNum,
            BreakEvenX: breakEvenX,
        };
    }
    configs["InstIDConfigMap"] = instConfigs;
    configs["InstIDs"] = insts;
    let formattedJSON = JSON.stringify(configs, null, 4);
    const filePath = path.join(directory, filename);
    writeStringToFile(filePath, formattedJSON);
    console.log(`config file ${filename} generated in ${directory}`);
};
main();
