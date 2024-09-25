const BybitClient = require("./clients/bybit");
const { fileExists } = require("./utils/run");
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
const transferAsset = async () => {
    const coin = "USDT";
    const amount = "20";
    const result = await exchangeClient.transferAsset(
        genClientOrderId(),
        coin,
        amount,
        "UNIFIED",
        "FUND"
    );
    console.log(result.status);
};

const main = async () => {
    transferAsset();
};
main();
