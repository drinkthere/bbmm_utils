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

const updateSubAccountApiKey = async (apiKey, readOnly, ips, permissions) => {
    const result = await exchangeClient.updateSubAccountApiKey(
        apiKey,
        readOnly,
        ips,
        permissions
    );
    console.log(result);
};
const main = async () => {
    // const keyInfo = await getQueryApiKey()
    // console.log(keyInfo.apiKey)

    //  const uids = [
    //     369057709, 369058365, 369058424, 369058524, 369060435, 369058584,
    //     369058701, 369058772, 369059014, 369059116, 369059204, 369059308,
    //     369059392, 369059746, 369059807, 369059958, 369060043, 369060153,
    //     369060231, 369060338, 376282736, 376277944, 376284135, 376284154,
    //     376284183, 376284204, 376284229, 376284245, 376284376, 376284732,
    //     376284738, 376284751, 376284765, 376284770, 376284780, 376284795,
    //     376284827, 376284838, 376284845, 376284915, 376284929, 376284943,
    //     376284954, 376284969, 376284975, 376284986, 376284995, 376285008,
    //     376285024, 376285325, 376285336, 376285346, 376285363, 376285374,
    //     376285387, 376285407, 376285419, 376285428, 376285432, 376286555,
    //     376286564, 376286581, 376286595, 376286599, 376286609, 376286617,
    //     376286626, 376286643, 376286651, 376286778, 376286808, 376286817,
    //     376286833, 376286851, 376286873, 376286879, 376286901, 376286921,
    //     376286928, 376287057, 376287085, 376287955, 376287134, 376287145,
    //     376287163, 376287175, 376287194, 376287206, 376287221, 376287297,
    //     376287305, 376287309, 376287325, 376287353, 376287359, 376287368,
    //     376287381, 376287396, 376287405, 376287470, 376287482, 376287503,
    //     376287515, 376287522, 376287536, 376287543, 376287564, 376287577,
    //     376287591, 376287730, 376287744, 376287766, 376287774, 376287791,
    //     376287805, 376287821, 376287833, 376287850, 376287862, 376287945];
    // for (let uid of uids) {
    //     const subAccountsApiKeys = await listSubAccountApiKeys(uid)
    //     if (subAccountsApiKeys.length > 0) {
    //         for (let key of subAccountsApiKeys) {
    //             //console.log(key)
    //            console.log(`key=${key.apiKey}, note=${key.note}, ip=${key.ips}`)
    //         }
    //     } else {
    //         console.log('no apikeys')
    //     }
    //     await sleep(1000)
    // }

    // const uids = [
    //     369057709, 369058365, 369058424, 369058524, 369060435, 369058584,
    //     369058701, 369058772, 369059014, 369059116, 369059204, 369059308,
    //     369059392, 369059746, 369059807, 369059958, 369060043, 369060153,
    //     369060231, 369060338,
    // ];
    const uids = [
        376287730, 376287744, 376287766, 376287774, 376287791, 376287805,
        376287821, 376287833, 376287850, 376287862,
    ];

    // const uids = [
    //     369057709, 369058365, 369058424, 369058524, 369060435, 369058584,
    //     369058701, 369058772, 369059014, 369059116, 369059204, 369059308,
    //     369059392, 369059746, 369059807, 369059958, 369060043, 369060153,
    //     369060231, 369060338, 376282736, 376277944, 376284135, 376284154,
    //     376284183, 376284204, 376284229, 376284245, 376284376, 376284732,
    //     376284738, 376284751, 376284765, 376284770, 376284780, 376284795,
    //     376284827, 376284838, 376284845, 376284915, 376284929, 376284943,
    //     376284954, 376284969, 376284975, 376284986, 376284995, 376285008,
    //     376285024, 376285325, 376285336, 376285346, 376285363, 376285374,
    //     376285387, 376285407, 376285419, 376285428, 376285432, 376286555,
    //     376286564, 376286581, 376286595, 376286599, 376286609, 376286617,
    //     376286626, 376286643, 376286651, 376286778, 376286808, 376286817,
    //     376286833, 376286851, 376286873, 376286879, 376286901, 376286921,
    //     376286928, 376287057, 376287085, 376287955, 376287134, 376287145,
    //     376287163, 376287175, 376287194, 376287206, 376287221, 376287297,
    //     376287305, 376287309, 376287325, 376287353, 376287359, 376287368,
    //     376287381, 376287396, 376287405, 376287470, 376287482, 376287503,
    //     376287515, 376287522, 376287536, 376287543, 376287564, 376287577,
    //     376287591, 376287730, 376287744, 376287766, 376287774, 376287791,
    //     376287805, 376287821, 376287833, 376287850, 376287862, 376287945];
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
        const note = `bb11${i}-ro`;
        const result = await createSubAccountApiKeys(
            uid,
            note,
            1, // 1 for readyonly, o for readwrite
            "*", // '*', // ips.join(","),  * for no ip limit
            permissions
        );
        i++;
        console.log(`${result.note} ${result.apiKey} ${result.secret}`);
        await sleep(1000);
    }

    // const modifyKeys = ['46BarWlk2J0wFgDFN5', '8vK9dJQoSdZFTiFkhd', 'hE6sT4Pkp8qkZ6SopB', '5K3wqcom4h07JvNhTj','5ensfoSn9rn9vNrC5s',
    //     'BZENh9zL9S1eYGeS7Q','zgbVmkAtBZBFcYDuyE', 'eIspcT06f7x3ELo7QI', 'WeytNSiKDHi8OznNe0', 'oIyagkp7O0tcKKkSDJ']
    // const readOnly = 1
    // const permissions = {
    //     ContractTrade: ["Order", "Position"],
    //     Spot: ["SpotTrade"],
    //     Wallet: ["AccountTransfer", "SubMemberTransferList"],
    // };
    // const ips = '*'
    // for (let key of modifyKeys) {
    //     await updateSubAccountApiKey(key, readOnly, ips, permissions)
    //     await sleep(1000)
    // }

    // const expireKeys = ['QaMx2OK111EqxHOy52', 'X7yLPzmyp0sP36VJXE']
    // for (let key of expireKeys) {
    //     await deleteSubAccountApiKeys(key)
    //     await sleep(1000)
    // }
};
main();
