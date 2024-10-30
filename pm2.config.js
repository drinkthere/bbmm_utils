module.exports = {
    apps: [
        {
            name: "stat_bbmm_daphne1",
            script: "stat.js",
            args: "--account bb-daphne1",
            out_file: "logs/stat-bnmm-daphne1-out.log",
            error_file: "logs/stat-bnmm-daphne1-out.log",
        },
    ],
};
