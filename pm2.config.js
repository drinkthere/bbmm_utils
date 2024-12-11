module.exports = {
    apps: [
        {
            name: "monit_bb_tf",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 7 node monit-zmq.js --tf bybit"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/monit-bybit-tf-out.log",
            error_file: "/data/will/bbmm/monit-bybit-tf-error.log",
        },
        {
            name: "monit_bn_tf",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node monit-zmq.js --tf binance"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/monit-binance-tf-out.log",
            error_file: "/data/will/bbmm/monit-binance-tf-error.log",
        },
        {
            name: "stat_bbmm_daphne1",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb-daphne1"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-daphne1-out.log",
            error_file: "/data/will/bbmm/stat-bnmm-daphne1-error.log",
        },
        {
            name: "stat_bbmm_daphne2",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb-daphne2"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-daphne2-out.log",
            error_file: "/data/will/bbmm/stat-bnmm-daphne2-error.log",
        },
        {
            name: "stat_bbmm_daphne3",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb-daphne3"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-daphne3-out.log",
            error_file: "/data/will/bbmm/stat-bnmm-daphne3-error.log",
        },
        {
            name: "stat_bbmm_daphne4",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb-daphne4"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-daphne4-out.log",
            error_file: "/data/will/bbmm/stat-bnmm-daphne4-error.log",
        },
        {
            name: "stat_bbmm_bb001",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb001"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb001-out.log",
            error_file: "/data/will/bbmm/stat-bnmm-bb001-error.log",
        },
        {
            name: "stat_bbmm_bb002",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb002"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb002-out.log",
            error_file: "/data/will/bbmm/stat-bnmm-bb002-error.log",
        },
        {
            name: "stat_bbmm_bb003",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb003"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb003-out.log",
            error_file: "/data/will/bbmm/stat-bnmm-bb003-error.log",
        },
        {
            name: "stat_bbmm_bb004",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb004"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb004-out.log",
            error_file: "/data/will/bbmm/stat-bnmm-bb004-error.log",
        },
        {
            name: "stat_bbmm_bb005",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb005"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb005-out.log",
            error_file: "/data/will/bbmm/stat-bnmm-bb005-error.log",
        },
        {
            name: "stat_bbmm_bb006",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb006"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb006-out.log",
            error_file: "/data/will/bbmm/stat-bnmm-bb006-error.log",
        },
        {
            name: "stat_bbmm_bb007",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb007"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb007-out.log",
            error_file: "/data/will/bbmm/stat-bnmm-bb007-error.log",
        },
        {
            name: "stat_bbmm_bb008",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb008"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb008-out.log",
            error_file: "/data/will/bbmm/stat-bnmm-bb008-error.log",
        },
        {
            name: "stat_bbmm_bb009",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb009"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb009-out.log",
            error_file: "/data/will/bbmm/stat-bnmm-bb009-error.log",
        },
        {
            name: "stat_bbmm_bb010",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb010"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb010-out.log",
            error_file: "/data/will/bbmm/stat-bnmm-bb010-error.log",
        },
        {
            name: "stat_bbmm_bb011",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb011"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb011-out.log",
            error_file: "/data/will/bbmm/stat-bnmm-bb011-error.log",
        },
        {
            name: "stat_bbmm_bb012",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb012"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb012-out.log",
            error_file: "/data/will/bbmm/stat-bnmm-bb012-error.log",
        },
        {
            name: "stat_bbmm_bb013",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb013"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb013-out.log",
            error_file: "/data/will/bbmm/stat-bnmm-bb013-error.log",
        },
        {
            name: "stat_bbmm_bb014",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb014"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb014-out.log",
            error_file: "/data/will/bbmm/stat-bnmm-bb014-error.log",
        },
        {
            name: "stat_bbmm_bb015",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb015"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb015-out.log",
            error_file: "/data/will/bbmm/stat-bnmm-bb015-error.log",
        },
        {
            name: "stat_bbmm_bb016",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb016"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb016-out.log",
            error_file: "/data/will/bbmm/stat-bnmm-bb016-error.log",
        },
        {
            name: "stat_bbmm_bb017",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb017"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb017-out.log",
            error_file: "/data/will/bbmm/stat-bnmm-bb017-error.log",
        },
        {
            name: "stat_bbmm_bb018",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb018"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb018-out.log",
            error_file: "/data/will/bbmm/stat-bnmm-bb018-error.log",
        },
        {
            name: "stat_bbmm_bb019",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb019"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb019-out.log",
            error_file: "/data/will/bbmm/stat-bnmm-bb019-error.log",
        },
        {
            name: "stat_bbmm_bb020",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb020"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb020-out.log",
            error_file: "/data/will/bbmm/stat-bnmm-bb020-error.log",
        },
        {
            name: "stat_bbmm_bb021",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb021"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb021-out.log",
            error_file: "/data/will/bbmm/stat-bnmm-bb021-error.log",
        },
        {
            name: "stat_bbmm_bb022",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb022"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb022-out.log",
            error_file: "/data/will/bbmm/stat-bnmm-bb022-error.log",
        },
        {
            name: "stat_bbmm_bb023",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb023"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb023-out.log",
            error_file: "/data/will/bbmm/stat-bnmm-bb023-error.log",
        },
        {
            name: "stat_bbmm_bb024",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb024"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb024-out.log",
            error_file: "/data/will/bbmm/stat-bnmm-bb024-error.log",
        },
        {
            name: "stat_bbmm_bb025",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb025"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb025-out.log",
            error_file: "/data/will/bbmm/stat-bnmm-bb025-error.log",
        },
        {
            name: "stat_bbmm_bb026",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb026"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb026-out.log",
            error_file: "/data/will/bbmm/stat-bnmm-bb026-error.log",
        },
        {
            name: "stat_bbmm_bb027",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb027"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb027-out.log",
            error_file: "/data/will/bbmm/stat-bnmm-bb027-error.log",
        },
        {
            name: "stat_bbmm_bb028",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb028"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb028-out.log",
            error_file: "/data/will/bbmm/stat-bnmm-bb028-error.log",
        },
        {
            name: "stat_bbmm_bb029",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb029"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb029-out.log",
            error_file: "/data/will/bbmm/stat-bnmm-bb029-error.log",
        },
        {
            name: "stat_bbmm_bb030",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb030"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb030-out.log",
            error_file: "/data/will/bbmm/stat-bnmm-bb030-error.log",
        },
        {
            name: "stat_bbmm_bb031",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb031"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb031-out.log",
            error_file: "/data/will/bbmm/stat-bnmm-bb031-error.log",
        },
        {
            name: "stat_bbmm_bb032",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb032"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb032-out.log",
            error_file: "/data/will/bbmm/stat-bnmm-bb032-error.log",
        },
        {
            name: "stat_bbmm_bb033",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb033"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb033-out.log",
            error_file: "/data/will/bbmm/stat-bnmm-bb033-error.log",
        },
        {
            name: "stat_bbmm_fbgbb001",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account fbgbb001"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-fbgbb001-out.log",
            error_file: "/data/will/bbmm/stat-bnmm-fbgbb001-error.log",
        },
        {
            name: "stat_bbmm_fbgbb002",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account fbgbb002"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-fbgbb002-out.log",
            error_file: "/data/will/bbmm/stat-bnmm-fbgbb002-error.log",
        },
        {
            name: "stat_bbmm_fbgbb003",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account fbgbb003"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-fbgbb003-out.log",
            error_file: "/data/will/bbmm/stat-bnmm-fbgbb003-error.log",
        },
        {
            name: "stat_bbmm_fbgbb004",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account fbgbb004"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-fbgbb004-out.log",
            error_file: "/data/will/bbmm/stat-bnmm-fbgbb004-error.log",
        },
        {
            name: "stat_bbmm_fbgbb005",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account fbgbb005"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-fbgbb005-out.log",
            error_file: "/data/will/bbmm/stat-bnmm-fbgbb005-error.log",
        },
        {
            name: "stat_bbmm_fbgbb006",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account fbgbb006"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-fbgbb006-out.log",
            error_file: "/data/will/bbmm/stat-bnmm-fbgbb006-error.log",
        },
        {
            name: "stat_bbmm_fbgbb007",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account fbgbb007"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-fbgbb007-out.log",
            error_file: "/data/will/bbmm/stat-bnmm-fbgbb007-error.log",
        },
        {
            name: "stat_bbmm_fbgbb008",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account fbgbb008"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-fbgbb008-out.log",
            error_file: "/data/will/bbmm/stat-bnmm-fbgbb008-error.log",
        },
        {
            name: "stat_bbmm_fbgbb009",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account fbgbb009"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-fbgbb009-out.log",
            error_file: "/data/will/bbmm/stat-bnmm-fbgbb009-error.log",
        },
        {
            name: "stat_bbmm_fbgbb010",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account fbgbb010"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-fbgbb010-out.log",
            error_file: "/data/will/bbmm/stat-bnmm-fbgbb010-error.log",
        },
    ],
};
