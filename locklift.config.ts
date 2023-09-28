import { LockliftConfig } from "locklift";
import { FactorySource } from "./build/factorySource";
import * as dotenv from "dotenv";
dotenv.config();

declare global {
    const locklift: import("locklift").Locklift<FactorySource>;
}

const config: LockliftConfig = {
    compiler: {
        // Specify path to your TON-Solidity-Compiler
        // path: "/mnt/o/projects/broxus/TON-Solidity-Compiler/build/solc/solc",

        // Or specify version of compiler
        version: "0.61.2",

        // Specify config for extarnal contracts as in exapmple
        externalContracts: {
            "node_modules/@broxus/tip3/build": ["TokenRoot", "TokenWallet"],
            precompiled: ["Index", "IndexBasis"],
        },
    },
    linker: {
        // Specify path to your stdlib
        // lib: "/mnt/o/projects/broxus/TON-Solidity-Compiler/lib/stdlib_sol.tvm",
        // // Specify path to your Linker
        // path: "/mnt/o/projects/broxus/TVM-linker/target/release/tvm_linker",

        // Or specify version of linker
        version: "0.15.48",
    },
    networks: {
        local: {
            // Specify connection settings for https://github.com/broxus/everscale-standalone-client/
            connection: {
                id: 1,
                group: "localnet",
                type: "graphql",
                data: {
                    endpoints: [process.env.LOCAL_NETWORK_ENDPOINT ?? ""],
                    latencyDetectionInterval: 1000,
                    local: true,
                },
            },
            // This giver is default local-node giverV2
            giver: {
                // Check if you need provide custom giver
                address: process.env.LOCAL_GIVER_ADDRESS ?? "",
                key: process.env.LOCAL_GIVER_KEY ?? "",
            },
            tracing: {
                endpoint: process.env.LOCAL_NETWORK_ENDPOINT ?? "",
            },
            keys: {
                // Use everdev to generate your phrase
                // !!! Never commit it in your repos !!!
                phrase: process.env.LOCAL_PHRASE,
                amount: 20,
            },
        },
        venom_testnet: {
            connection: {
                id: 1000,
                type: "jrpc",
                group: "dev",
                data: {
                    endpoint: process.env.VENOM_TESTNET_RPC_NETWORK_ENDPOINT ?? "",
                },
            },
            giver: {
                address: process.env.VENOM_TESTNET_GIVER_ADDRESS ?? "",
                phrase: process.env.VENOM_TESTNET_GIVER_PHRASE ?? "",
                accountId: 0,
            },
            tracing: {
                endpoint: process.env.VENOM_TESTNET_GQL_NETWORK_ENDPOINT ?? "",
            },
            keys: {
                // Use everdev to generate your phrase
                // !!! Never commit it in your repos !!!
                phrase: process.env.VENOM_TESTNET_PHRASE,
                amount: 20,
            },
        },
        main: {
            connection: {
                id: 1,
                type: "graphql",
                group: "main",
                data: {
                    endpoints: [process.env.MAINNET_NETWORK_ENDPOINT ?? ""],
                    latencyDetectionInterval: 1000,
                    local: false,
                },
            },
            giver: {
                address: process.env.MAINNET_GIVER_ADDRESS ?? "",
                key: process.env.MAINNET_GIVER_KEY ?? "",
            },
            tracing: { endpoint: process.env.MAINNET_NETWORK_ENDPOINT ?? "" },
            keys: {
                phrase: process.env.MAINNET_PHRASE,
                amount: 20,
            },
        },
    },
    mocha: {
        timeout: 2000000,
    },
};

export default config;
