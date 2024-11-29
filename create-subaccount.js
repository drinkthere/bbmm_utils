const BybitClient = require("./clients/bybit");
const { sleep, fileExists } = require("./utils/run");
const { log } = require("./utils/log");
const { genClientOrderId } = require("./utils/common");
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

const createSubAccount = async (accountName, note) => {
    const result = await exchangeClient.createSubAccount(accountName, note);
    console.log(result);
};

const main = async () => {
    // const subaccounts = await listSubAccount();
    // console.log(`There are ${subaccounts.length} sub-account`);
    // if (subaccounts.length > 0) {
    //     for (let sub of subaccounts) {
    //         //console.log(sub)
    //         console.log(
    //             `uid=${sub.uid} remark=${sub.remark} accountMode=${sub.accountMode} username=${sub.username}`
    //         );
    //     }
    // }

    // for (let i = 0; i <= 9; i++) {
    //     uid = genClientOrderId().slice(0, 11)
    //     const accountName = `Bybit${uid}`
    //     const note = `bb12${i}`
    //     //console.log(accountName, note)
    //     await createSubAccount(accountName, note);
    //     await sleep(1000)
    // }
    await createSubAccount("Bybit04f1403ac98", "bb082");
};
main();
