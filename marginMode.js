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

const setMarginMode = async (marginMode) => {
    const result = await exchangeClient.setMarginMode(marginMode);
    console.log(result);
};

const getCollateralInfo = async () => {
    const result = await exchangeClient.getCollateralInfo();
    console.log(result);
};

const batchSetCollateralCoin = async (coins) => {
    const result = await exchangeClient.batchSetCollateralCoin(coins);
    console.log(result);
};

const main = async () => {
    //await setMarginMode('REGULAR_MARGIN');
    //await getCollateralInfo()
    await batchSetCollateralCoin([
        { coin: "BTC", collateralSwitch: "ON" },
        { coin: "ETH", collateralSwitch: "ON" },
    ]);
};
main();
