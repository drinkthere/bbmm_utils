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

const upgradeAccount = async () => {
    const result = await exchangeClient.upgradeAccount();
    console.log(result);
};

const getAccountInfo = async () => {
    const result = await exchangeClient.getAccountInfo();
    console.log(result);
};
const main = async () => {
    //await getAccountInfo();

    await upgradeAccount();
};
main();
