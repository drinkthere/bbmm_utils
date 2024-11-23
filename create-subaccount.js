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

const listSubAccount = async () => {
    const data = await exchangeClient.listSubAccount();
    if (data.length == 0) {
        return [];
    } else {
        return data.subMembers;
    }
};

const createSubAccount = async () => {
    const result = await exchangeClient.createSubAccount("bbdcs001", 1);
    console.log(result);
};
const main = async () => {
    const subaccounts = await listSubAccount();
    console.log(`There are ${subaccounts.length} sub-account`);
    if (subaccounts.length > 0) {
        for (let sub of subaccounts) {
            //console.log(sub)
            console.log(
                `uid=${sub.uid} remark=${sub.remark} accountMode=${sub.accountMode} username=${sub.username}`
            );
        }
    }
    // await createSubAccount();
};
main();
