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
    const coin = "ETH";
    const amount = "80";
    const result = await exchangeClient.transferAsset(
        genClientOrderId(),
        coin,
        amount,
        "FUND",
        "UNIFIED"
    );
    console.log(result.status);
};

const uniTransferAsset = async () => {
    // const coin = "USDT";
    // const amount = "20";
    // const fromMemberId = 369060435
    // const toMemberId = 369060338
    // const result = await exchangeClient.uniTransferAsset(
    //     genClientOrderId(),
    //     coin,
    //     amount,
    //     fromMemberId,
    //     toMemberId,
    //     "UNIFIED",
    //     "UNIFIED"
    // );

    // // account type
    // // CONTRACT 反向合約帳戶 统一账户1.0有，2.0只有下面两个
    // // FUND 資金帳戶
    // // UNIFIED 统一账户
    // console.log(result.status);

    const result = await transferAsset();
    console.log(result);
};

const main = async () => {
    //transferAsset();
    await uniTransferAsset();
};
main();
