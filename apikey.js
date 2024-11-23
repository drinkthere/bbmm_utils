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

const listSubAccountApiKeys = async (subMemberId) => {
    const data = await exchangeClient.listSubAccountApiKeys(subMemberId);
    if (data.length == 0) {
        return [];
    } else {
        return data;
    }
};

const getQueryApiKey = async () => {
    return await exchangeClient.getQueryApiKey();
};

const createSubAccountApiKeys = async (
    subuid,
    note,
    readOnly,
    ips,
    permissions
) => {
    return await exchangeClient.createSubAccountApiKey(
        subuid,
        note,
        readOnly,
        ips,
        permissions
    );
};

const deleteSubAccountApiKeys = async (apiKey) => {
    const result = await exchangeClient.deleteSubAccountApiKey(apiKey);
    console.log(result);
};
const main = async () => {
    // const keyInfo = await getQueryApiKey()
    // console.log(keyInfo.apiKey)

    // const uids = [369057709, 369058365, 369058424, 369058524, 369060435, 369058584, 369058701, 369058772, 369059014,
    //     369059116, 369059204, 369059308, 369059392, 369059746, 369059807, 369059958, 369060043, 369060153, 369060231, 369060338]
    // for (let uid of uids) {
    //     const subAccountsApiKeys = await listSubAccountApiKeys(uid)
    //     if (subAccountsApiKeys.length > 0) {
    //         for (let key of subAccountsApiKeys) {
    //             console.log(`key=${key.apiKey}, note=${key.note}, ip=${key.ips}`)
    //         }
    //     } else {
    //         console.log('no apikeys')
    //     }
    //     await sleep(1000)
    // }

    const uids = [
        369057709, 369058365, 369058424, 369058524, 369060435, 369058584,
        369058701, 369058772, 369059014, 369059116, 369059204, 369059308,
        369059392, 369059746, 369059807, 369059958, 369060043, 369060153,
        369060231, 369060338,
    ];
    const ips = [
        "122.248.248.190",
        "52.76.20.39",
        "3.1.2.22",
        "18.139.136.246",
        "18.140.216.149",
        "3.1.48.249",
        "54.151.139.149",
        "13.213.86.219",
        "47.128.183.234",
        "52.77.4.230",
    ];

    const permissions = {
        ContractTrade: ["Order", "Position"],
        Spot: ["SpotTrade"],
        Wallet: ["AccountTransfer", "SubMemberTransferList"],
    };

    let i = 0;
    for (let uid of uids) {
        const note = `bb00${i}-rw`;
        const result = await createSubAccountApiKeys(
            uid,
            note,
            0,
            ips.join(","),
            permissions
        );
        i++;
        console.log(`${result.note} ${result.apiKey} ${result.secret}`);
        await sleep(1000);
    }

    // const expireKeys = ['xUCNzipFOJea9OJUeU', 'Mljq3om0KwKgwWj0mO', '9C44NZczWoQSP1VFOL', 'qxg9J51qkmbEGvJrwZ', 'tdg9sovoTJxF9ZKoo0',
    //     'XI3txHzUE8FkvfOgja', 't1v0RptFce3ZMXrC9m', 'IbIGeafG1NNeyJBTiL', 'GoUO3925VxMmqzDKNj', 'ybiJoQS7rkBzZkGSQS',
    //     '73aT9Kke00YQRAlPk2', 'hya7BE2DAxkhQd89O3', 'RXltiZuxYQ3HYmyoXq', 'GrV9FmvF463N4iD0RN', '2dqlHPnZZvZwgwv8Z3',
    //     '8SBB9419JlE4LhGjyo', 'HUvxgDIcCrq4RDYkIK', '6g78n2xLYN4g6oA1ss', 'ckGaLdqVdqNka6fdXg', 'EwOXSlDEm3dg0hXiKz'
    // ]
    // for (let key of expireKeys) {
    //     await deleteSubAccountApiKeys(key)
    //     await sleep(1000)
    // }
};
main();
