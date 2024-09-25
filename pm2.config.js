module.exports = {
    apps: [
        {
            name: "stat_bbmm_will",
            script: "stat.js",
            args: "--account will",
            out_file: "logs/stat-bnmm-will-out.log",
            error_file: "logs/stat-bnmm-will-out.log",
        },
    ],
};
