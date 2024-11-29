module.exports = {
    apps: [
        {
            name: "stat_bbmm_daphne1",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb-daphne1"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-daphne1-out.log",
            error_file: "/data/will/bbmm//stat-bnmm-daphne1-error.log",
        },
        {
            name: "stat_bbmm_daphne2",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb-daphne2"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm//stat-bnmm-daphne2-out.log",
            error_file: "/data/will/bbmm//stat-bnmm-daphne2-error.log",
        },
        {
            name: "stat_bbmm_daphne3",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb-daphne3"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm//stat-bnmm-daphne3-out.log",
            error_file: "/data/will/bbmm//stat-bnmm-daphne3-error.log",
        },
        {
            name: "stat_bbmm_daphne4",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb-daphne4"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm//stat-bnmm-daphne4-out.log",
            error_file: "/data/will/bbmm//stat-bnmm-daphne4-error.log",
        },
        {
            name: "stat_bbmm_bb001",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb001"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb001-out.log",
            error_file: "/data/will/bbmm//stat-bnmm-bb001-error.log",
        },
        {
            name: "stat_bbmm_bb002",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb002"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb002-out.log",
            error_file: "/data/will/bbmm//stat-bnmm-bb002-error.log",
        },
        {
            name: "stat_bbmm_bb003",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb003"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb003-out.log",
            error_file: "/data/will/bbmm//stat-bnmm-bb003-error.log",
        },
        {
            name: "stat_bbmm_bb004",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb004"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb004-out.log",
            error_file: "/data/will/bbmm//stat-bnmm-bb004-error.log",
        },
        {
            name: "stat_bbmm_bb005",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb005"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb005-out.log",
            error_file: "/data/will/bbmm//stat-bnmm-bb005-error.log",
        },
        {
            name: "stat_bbmm_bb006",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb006"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb006-out.log",
            error_file: "/data/will/bbmm//stat-bnmm-bb006-error.log",
        },
        {
            name: "stat_bbmm_bb007",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb007"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb007-out.log",
            error_file: "/data/will/bbmm//stat-bnmm-bb007-error.log",
        },
        {
            name: "stat_bbmm_bb008",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb008"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb008-out.log",
            error_file: "/data/will/bbmm//stat-bnmm-bb008-error.log",
        },
        {
            name: "stat_bbmm_bb009",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb009"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb009-out.log",
            error_file: "/data/will/bbmm//stat-bnmm-bb009-error.log",
        },
        {
            name: "stat_bbmm_bb010",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb010"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb010-out.log",
            error_file: "/data/will/bbmm//stat-bnmm-bb010-error.log",
        },
        {
            name: "stat_bbmm_bb011",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb011"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb011-out.log",
            error_file: "/data/will/bbmm//stat-bnmm-bb011-error.log",
        },
        {
            name: "stat_bbmm_bb012",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb012"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb012-out.log",
            error_file: "/data/will/bbmm//stat-bnmm-bb012-error.log",
        },
        {
            name: "stat_bbmm_bb013",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb013"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb013-out.log",
            error_file: "/data/will/bbmm//stat-bnmm-bb013-error.log",
        },
        {
            name: "stat_bbmm_bb014",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb014"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb014-out.log",
            error_file: "/data/will/bbmm//stat-bnmm-bb014-error.log",
        },
        {
            name: "stat_bbmm_bb015",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb015"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb015-out.log",
            error_file: "/data/will/bbmm//stat-bnmm-bb015-error.log",
        },
        {
            name: "stat_bbmm_bb016",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb016"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb016-out.log",
            error_file: "/data/will/bbmm//stat-bnmm-bb016-error.log",
        },
        {
            name: "stat_bbmm_bb017",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb017"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb017-out.log",
            error_file: "/data/will/bbmm//stat-bnmm-bb017-error.log",
        },
        {
            name: "stat_bbmm_bb018",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb018"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb018-out.log",
            error_file: "/data/will/bbmm//stat-bnmm-bb018-error.log",
        },
        {
            name: "stat_bbmm_bb019",
            script: "/bin/bash", // 使用 Bash 作为解释器
            args: '-c "taskset -c 0 node stat.js --account bb019"', // 传递给 bash 的完整命令
            out_file: "/data/will/bbmm/stat-bnmm-bb019-out.log",
            error_file: "/data/will/bbmm//stat-bnmm-bb019-error.log",
        },
    ],
};
