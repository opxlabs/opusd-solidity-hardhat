import * as dotenv from 'dotenv'
import type { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox-viem'
import * as tdly from '@tenderly/hardhat-tenderly'
dotenv.config()

const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY || ''

console.log('deployerPrivateKey', DEPLOYER_PRIVATE_KEY)

const infuraApiKey = process.env.INFURA_API_KEY || ''
const etherscanApiKey = process.env.ETHERSCAN_API_KEY || ''

const TENDERLY_PROJECT = process.env.TENDERLY_PROJECT || ''
const TENDERLY_USERNAME = process.env.TENDERLY_USERNAME || ''
const ENABLE_TENDERLY: boolean = Boolean(process.env.ENABLE_TENDERLY) || false

const config: HardhatUserConfig = {
  networks: {
    ftmtenderly: {
      chainId: 250,
      url:
        'https://virtual.fantom.rpc.tenderly.co/8b62585f-5eec-48f0-98c0-a1f8dc5aaf8d',
      accounts: [DEPLOYER_PRIVATE_KEY],
      allowUnlimitedContractSize: true,
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
}

if (ENABLE_TENDERLY) {
  config.tenderly = {
    project: TENDERLY_PROJECT,
    username: TENDERLY_USERNAME,
    privateVerification: false,
  }
}
export default config
