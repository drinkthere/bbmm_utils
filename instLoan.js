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
    log("node getAccountInfo.js --account=xxx --symbol=yyy");
    process.exit();
}

const keyIndex = configs.keyIndexMap[account];

let options = {
    keyIndex,
};
const exchangeClient = new BybitClient(options);

const getInstLoanProduct = async () => {
    const product = await exchangeClient.getInstitutionalLendingProductInfo();
    for (let p of product) {
        for (let k of Object.keys(p)) {
            if (k == "USDTPerpetualLeverage") {
                console.log(k);
                for (let l of p[k]) {
                    console.log(l);
                }
            } else if (k == "USDCContractLeverage") {
                console.log(k);
                for (let l of p[k]) {
                    console.log(l);
                }
            } else {
                console.log(k, p[k]);
            }
        }
    }
};

const getInstLoanOrder = async () => {
    const product = await exchangeClient.getInstitutionalLendingLoanOrders();
    console.log(product);
};
const main = async () => {
    await getInstLoanProduct();
    //await getInstLoanOrder()
};
main();
