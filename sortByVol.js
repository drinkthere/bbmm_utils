const path = require("path");
const {
    getDecimals,
    deleteFilesInDirectory,
    writeStringToFile,
    fileExists,
    sleep,
} = require("./utils/run");

let bybitLinearInsts = [
    "1INCHUSDT",
    "AAVEUSDT",
    "ACHUSDT",
    "ADAUSDT",
    "AEVOUSDT",
    "AGLDUSDT",
    "ALGOUSDT",
    "ALTUSDT",
    "ANKRUSDT",
    "APEUSDT",
    "APTUSDT",
    "ARBUSDT",
    "ARKMUSDT",
    "ARUSDT",
    "ATOMUSDT",
    "AVAXUSDT",
    "AXLUSDT",
    "AXSUSDT",
    "BATUSDT",
    "BBUSDT",
    "BCHUSDT",
    "BICOUSDT",
    "BLURUSDT",
    "BNBUSDT",
    "BOMEUSDT",
    "C98USDT",
    "CAKEUSDT",
    "CATIUSDT",
    "CELOUSDT",
    "CHZUSDT",
    "COMPUSDT",
    "CRVUSDT",
    "CYBERUSDT",
    "DOGEUSDT",
    "DOGSUSDT",
    "DOTUSDT",
    "DYDXUSDT",
    "DYMUSDT",
    "EGLDUSDT",
    "EIGENUSDT",
    "ENAUSDT",
    "ENJUSDT",
    "ENSUSDT",
    "EOSUSDT",
    "ETCUSDT",
    "ETHFIUSDT",
    "FILUSDT",
    "FLOWUSDT",
    "FTMUSDT",
    "FXSUSDT",
    "GALAUSDT",
    "GMTUSDT",
    "GMXUSDT",
    "GRTUSDT",
    "HBARUSDT",
    "HFTUSDT",
    "HMSTRUSDT",
    "HOOKUSDT",
    "ICPUSDT",
    "IDUSDT",
    "IMXUSDT",
    "INJUSDT",
    "IOUSDT",
    "JASMYUSDT",
    "JTOUSDT",
    "JUPUSDT",
    "KAVAUSDT",
    "KDAUSDT",
    "KSMUSDT",
    "LDOUSDT",
    "LEVERUSDT",
    "LINKUSDT",
    "LRCUSDT",
    "LTCUSDT",
    "MAGICUSDT",
    "MANAUSDT",
    "MANTAUSDT",
    "MASKUSDT",
    "MEMEUSDT",
    "MINAUSDT",
    "MKRUSDT",
    "MOVRUSDT",
    "NEARUSDT",
    "NOTUSDT",
    "OMNIUSDT",
    "ONEUSDT",
    "OPUSDT",
    "ORDIUSDT",
    "PENDLEUSDT",
    "PEOPLEUSDT",
    "PERPUSDT",
    "PNUTUSDT",
    "POLUSDT",
    "PORTALUSDT",
    "PYTHUSDT",
    "QNTUSDT",
    "RDNTUSDT",
    "RENDERUSDT",
    "ROSEUSDT",
    "RUNEUSDT",
    "RVNUSDT",
    "SANDUSDT",
    "SCRUSDT",
    "SEIUSDT",
    "SNXUSDT",
    "SOLUSDT",
    "SSVUSDT",
    "STGUSDT",
    "STRKUSDT",
    "STXUSDT",
    "SUIUSDT",
    "SUSHIUSDT",
    "THETAUSDT",
    "TIAUSDT",
    "TNSRUSDT",
    "TONUSDT",
    "TRXUSDT",
    "TWTUSDT",
    "UMAUSDT",
    "UNIUSDT",
    "VANRYUSDT",
    "WIFUSDT",
    "WLDUSDT",
    "WOOUSDT",
    "WUSDT",
    "XAIUSDT",
    "XLMUSDT",
    "XRPUSDT",
    "XTZUSDT",
    "YFIUSDT",
    "ZENUSDT",
    "ZILUSDT",
    "ZKUSDT",
    "ZROUSDT",
    "ZRXUSDT",
];

const BybitClient = require("./clients/bybit");
const keyIndex = 0;
let options = {
    keyIndex,
};
const bybitClient = new BybitClient(options);

const main = async () => {
    try {
        let volumeArr = [];
        for (symbol of bybitLinearInsts) {
            let vol = 0;
            const klines = await bybitClient.getKline("linear", symbol, "D", 7);
            if (klines.length > 0) {
                for (let kl of klines) {
                    vol += parseFloat(kl[6]);
                }
            }
            volumeArr.push({ symbol, vol });
            await sleep(100);
        }
        const sortedData = volumeArr.sort((a, b) => b.vol - a.vol);
        console.log(sortedData);
        const topN = 100;
        let i = 0;
        let symbols = [];
        for (let d of sortedData) {
            if (i < topN) {
                symbols.push(d.symbol);
                i++;
            } else {
                break;
            }
        }
        // 分成奇数行和偶数行
        const oddLines = symbols.filter((_, index) => index % 2 === 0); // 奇数行
        const evenLines = symbols.filter((_, index) => index % 2 !== 0); // 偶数行

        // 合并排序结果
        const sortedSymbols = [...oddLines, ...evenLines];
        console.log(sortedSymbols);
    } catch (e) {
        console.error(e);
    }
};
main();
