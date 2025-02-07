import * as dotenv from 'dotenv'
import type { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox-viem'
import * as tdly from '@tenderly/hardhat-tenderly'
tdly.setup({
  automaticVerifications: true,
})
dotenv.config()

const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY || ''

console.log('deployerPrivateKey', DEPLOYER_PRIVATE_KEY)

const infuraApiKey = process.env.INFURA_API_KEY || ''
const etherscanApiKey = process.env.ETHERSCAN_API_KEY || ''

const TENDERLY_PROJECT = process.env.TENDERLY_PROJECT || ''
const TENDERLY_USERNAME = process.env.TENDERLY_USERNAME || ''
const ENABLE_TENDERLY = process.env.ENABLE_TENDERLY || false
const TENDERLY_ACCESS_KEY = process.env.TENDERLY_ACCESS_KEY || ''

const config: HardhatUserConfig = {
  networks: {
    bsc: {
      chainId: 56,
      url: 'https://bsc-dataseed.binance.org/',
      accounts: [DEPLOYER_PRIVATE_KEY],
    },
    polygon: {
      chainId: 137,
      url: 'https://polygon-rpc.com/',
      accounts: [DEPLOYER_PRIVATE_KEY],
    },
    fantom: {
      chainId: 250,
      url: 'https://rpc.ftm.tools/',
      accounts: [DEPLOYER_PRIVATE_KEY],
    },
    ether: {
      chainId: 1,
      url: 'https://mainnet.infura.io/v3/' + infuraApiKey,
      accounts: [DEPLOYER_PRIVATE_KEY],
    },

    ftmtenderly: {
      chainId: 250,
      url:
        'https://virtual.fantom.rpc.tenderly.co/4a72a7ad-9a67-43f1-9864-ba2eb1e93186',
      accounts: [DEPLOYER_PRIVATE_KEY],
      allowUnlimitedContractSize: true,
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.8.28',
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
      {
        version: '0.8.24',
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
      {
        version: '0.8.20',
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
      {
        version: '0.8.10',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
          // viaIR: true,
        },
      },
      {
        version: '0.8.18',
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
      {
        version: '0.8.17',
        settings: {
          optimizer: {
            enabled: true,
            runs: 10000,
          },
        },
      },
      {
        version: '0.5.1',
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
      {
        version: '0.6.11',
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
      {
        version: '0.6.6',
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
    ],
  },
  mocha: {
    timeout: 4 * 60 * 1000,
  },
  ignition: {
    requiredConfirmations: 1,
  },
  etherscan: {
    apiKey: etherscanApiKey,
    customChains: [],
  },
  tenderly: {
    project: TENDERLY_PROJECT,
    username: TENDERLY_USERNAME,
    accessKey: TENDERLY_ACCESS_KEY,
    privateVerification: true,
  },
}

export default config
